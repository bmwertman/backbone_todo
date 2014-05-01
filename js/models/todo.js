$ ->

	class Todo extends Backbone.Model

		defaults:
			title: ''
			completed: false

		toggle: ->
			@save({ completed: not @get('completed') })
