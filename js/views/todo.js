app = app || {}

class TodoView extends Backbone.View

	tagName: 'li'

	template: _.template $('#item-template').html()

	events:
		'dblclick label': 'edit'
		'keypress .edit': 'updateOnEnter'
		'blur .edit': 'close'

	initialize: ->
		this.ListenTo @model, 'change', @render

	render: =>
		@$ el.html @template( @model.toJSON() )
		@$ input = @$ '.edt'
		return this

	edit: =>
		@$ el.addClass('editing')
		@$ input.focus()

	close: =>
		value = @$ input.val().trim()

		if value
			@model.save({ title: value })

		@$ el.removeClass('editing')

	updateOnEnter: (e) =>
		if e.which == ENTER_KEY
			this.close()