define(['underscore', 'jquery', 'backbone', 'text!component/Loading/Loading.html'], function (_, $, Bb, loadingTemp) {
  return Bb.View.extend({

    className: 'loading',

    template: _.template(loadingTemp),

    initialize: function (options) {
      this.$parent = $(options.$parent || document);
      this.render();
    },

    render: function () {
      this.$el.html(this.template()).appendTo(this.$parent);
    }
  });
});
