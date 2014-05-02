app = app || {}

class Workspace extends Backbone.Router
  routes:
    "*filter": "setFilter"

  setFilter: (param) ->

    # Set the current filter to be used
    # Trigger a collection filter event, causing hiding/unhiding // of Todo view items
    window.app.Todos.trigger "filter"
    return

app.TodoRouter = new Workspace()
Backbone.history.start()