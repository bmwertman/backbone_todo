// Generated by CoffeeScript 1.7.1
(function() {
  var TodoView, app,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app = app || {};

  TodoView = (function(_super) {
    __extends(TodoView, _super);

    function TodoView() {
      this.updateOnEnter = __bind(this.updateOnEnter, this);
      this.close = __bind(this.close, this);
      this.edit = __bind(this.edit, this);
      this.render = __bind(this.render, this);
      return TodoView.__super__.constructor.apply(this, arguments);
    }

    TodoView.prototype.tagName = 'li';

    TodoView.prototype.template = _.template($('#item-template').html());

    TodoView.prototype.events = {
      'dblclick label': 'edit',
      'keypress .edit': 'updateOnEnter',
      'blur .edit': 'close'
    };

    TodoView.prototype.initialize = function() {
      return this.ListenTo(this.model, 'change', this.render);
    };

    TodoView.prototype.render = function() {
      var input;
      this.$(el.html(this.template(this.model.toJSON())));
      this.$(input = this.$('.edt'));
      return this;
    };

    TodoView.prototype.edit = function() {
      this.$(el.addClass('editing'));
      return this.$(input.focus());
    };

    TodoView.prototype.close = function() {
      var value;
      value = this.$(input.val().trim());
      if (value) {
        this.model.save({
          title: value
        });
      }
      return this.$(el.removeClass('editing'));
    };

    TodoView.prototype.updateOnEnter = function(e) {
      if (e.which === ENTER_KEY) {
        return this.close();
      }
    };

    return TodoView;

  })(Backbone.View);

}).call(this);
