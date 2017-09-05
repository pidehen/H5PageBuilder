define(['underscore', 'AbstractView', 'text!component/Message/Message.html'], function (_, AV, messageTemp) {
  return AV.extend({
    initialize: function ($super, options) {
      options = _.defaults(options, {
        className: 'message',   // 不传
        animationType: 'fade',  // 不传
        callbacks: {            // 不传
          fadeIn: function () {
            setTimeout((function () {
              this.fadeOut();
            }).bind(this), this.duration)
          },
          fadeOut: function () {
            this.remove();
          }
        },
        text: '', // 必传
        duration: 3000, // 可传
        speed: 'slow'  // 可传
      });

      $super(options);

      this.text = options.text;
      this.duration = options.duration;
      this.template = _.template(messageTemp);

      this.render();
      this.setElAnimationProp();
      this._defer('fadeIn');
    },

    remove: function ($super) {
      $super();

      this.constructor.ins = null;
      return this;
    },

    render: function () {
      this.$el.html(this.template({ text: this.text })).appendTo(this.$parent);
    }
  })
});
