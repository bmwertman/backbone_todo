
app = app || {}

class AppView extends Backbone.View
  el: "#todoapp"
  statsTemplate: _.template($("#stats-template").html())
  events:
    "keypress #new-todo": "createOnEnter"
    "click #clear-completed": "clearCompleted"
    "click #toggle-all": "toggleAllComplete"

  initialize: ->
    @allCheckbox = @$("#toggle-all")[0]
    @$input = @$("#new-todo")
    @$footer = @$("#footer")
    @$main = @$("#main")
    @listenTo app.Todos, "add", @addOne
    @listenTo app.Todos, "reset", @addAll
    @listenTo app.Todos, "change:completed", @filterOne
    @listenTo app.Todos, "filter", @filterAll
    @listenTo app.Todos, "all", @render
    app.Todos.fetch()
    return

  render: ->
    completed = app.Todos.completed().length
    remaining = app.Todos.remaining().length
    if app.Todos.length
      @$main.show()
      @$footer.show()
      @$footer.html @statsTemplate(
        completed: completed
        remaining: remaining
      )
      @$("#filters li a").removeClass("selected").filter("[href=\"#/" + (app.TodoFilter or "") + "\"]").addClass "selected"
    else
      @$main.hide()
      @$footer.hide()
    @allCheckbox.checked = not remaining
    return

  addOne: (todo) ->
    view = new app.TodoView(model: todo)
    $("#todo-list").append view.render().el
    return

  addAll: ->
    @$("#todo-list").html ""
    app.Todos.each @addOne, this
    return

  filterOne: (todo) ->
    todo.trigger "visible"
    return

  filterAll: ->
    app.Todos.each @filterOne, this
    return

  newAttributes: ->
    title: @$input.val().trim()
    order: app.Todos.nextOrder()
    completed: false

  createOnEnter: (event) ->
    return  if event.which isnt ENTER_KEY or not @$input.val().trim()
    app.Todos.create @newAttributes()
    @$input.val ""
    return

  clearCompleted: ->
    _.invoke app.Todos.completed(), "destroy"
    false

  toggleAllComplete: ->
    completed = @allCheckbox.checked
    app.Todos.each (todo) ->
      todo.save completed: completed
      return

    return