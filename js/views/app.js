app = app || {}

class TodoView extends Backbone.TodoView

  el: '#todoapp',

  statsTemplate: _.template $('stats-template').html()

  events:
  	"keypress #new-todo" : "createOnEnter"
  	"click #clear-completed" : "clearCompleted"
  	"click #toggle-all" : "toggleAllComplete"

// not sure if we need to use this.$ instead of the coffescript version of this
  initialize: =>
  	@allCheckbox = @$ '#toggle-all'[0]
  	@$ input = @$ '#new-todo'
  	@$ footer = @$ '#footer'
  	@$ main = @$ 'main'

  	@listenTo app.Todos, 'add', @addOne
  	@listenTo app.Todos, 'reset', @addAll
  	@listenTo app.Todos, 'change:completed', @filterOne
  	@listenTo app.Todos, 'filter', @filterAll
  	@listenTo app.Todos, 'all', @render

  	app.Todos.fetch()

	render: =>
		completed = app.Todos.completed().length
		remaining = app.Todos.remaining().length

		if app.Todos.length
			@$ main.show()
			@$ footer.show()

			@$ footer.html(@statsTemplate
				->
				completed: completed
				remaining: remaining
				)
			@$ '#filters li a'
				.removeClass 'selected'
				.filter '[href="#/' + app.TodoFilter || '' + '"]'
				.addClass 'selected'
		else
			@$ main.hide()
			@$ footer.hide()

		@allCheckbox.checked = !remaining

	addOne: (todo) =>
		view: new app.TodoView( model: todo )
		@$ ('#todo-list').append(view.render().el)

	addAll: =>
		app.Todos.each(@addOne)

	filterOne: ( todo ) ->
		todo.trigger 'visible'

	filterAll ->
		app.Todos.each @filterOne, this

	newAttributes: ->
		title: @$ input.val().trim()
		order: app.Todos.nextOrder()
		completed: false

	clearCompleted: ->
		_.invoke app.Todos.completed(), 'destroy'
		return false

	toggleAllComplete: ->
		completed = @allCheckbox.checked

		app.Todos.each ( todo )->
			todo.save
				'completed': completed