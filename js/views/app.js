app = app || {}

class TodoView extends Backbone.TodoView

  el: '#todoapp',

  template: _.template( $('stats-template').html() )

// not sure if we need to use this.$ instead of the coffescript version of this
  initialize: =>
  	@allCheckbox = @$('#toggle-all')[0]
  	@$input = @$('#new-todo')
  	@$footer = @$('#footer')
  	@$main = @$('main')

  	@listenTo(app.Todos, 'add', @addOne)
  	@listenTo(app.Todos, 'reset', @addAll)
