$ ->

app = app or {}

class TodoList extends Backbone.Collection

	model : app.Todo

	localStorage: new Backbone.LocalStorage('todos-backbone')

	completed: ->
		@filter( todo )

	remaining: ->
		@without.apply( this, @completed())

	nextOrder: ->
		return 1 if not @length
		return @last().get('order') + 1

	comparator: (todo) ->
		return todo.get('order')


