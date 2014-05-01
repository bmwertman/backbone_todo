$ ->

class TodoList extends Backbone.Collection

	model : Todo

	localStorage: new Store('todos-backbone')

	completed: ->
		@filter( todo )

	remaining: ->
		@without.apply( this, @completed())

	nextOrder: ->
		return 1 if !@length
		return @last().get('order') + 1

	comparator: (todo) ->
		return todo.get('order')


