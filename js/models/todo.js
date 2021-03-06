// Generated by CoffeeScript 1.7.1
(function() {
  var Todo, app,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app = app || {};

  Todo = (function(_super) {
    __extends(Todo, _super);

    function Todo() {
      return Todo.__super__.constructor.apply(this, arguments);
    }

    Todo.prototype.defaults = {
      title: "",
      completed: false
    };

    Todo.prototype.toggle = function() {
      this.save({
        completed: !this.get("completed")
      });
    };

    return Todo;

  })(Backbone.Model);

}).call(this);
