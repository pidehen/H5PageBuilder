define(['underscore', 'AbstractView'], function (_, AV) {
  return AV.extend({
    events: {
      'click': 'handleClose'
    },

    initialize: function ($super, options) {
      options || (options = {});
      options = _.defaults(options, {
        className: 'mask',  // 不传
        animationType: 'fade', // 不传
        speed: 'slow', // 不传
        callbacks: {  // 不传
          fadeOut: function () {
            this.remove();
          }
        },
        attributes: { // 不传
          style: 'opacity:0;position:fixed;left:0;right:0;top:0;bottom:0;width:100%;height:100%;z-index:8888;background:rgba(55,55,55,.6);'
        },
        closable: true,  // 可传
        messageCenter: null // 必传
      });

      $super(options);

      this.closable = options.closable;
      this.messageCenter = options.messageCenter;

      this.render();
      this.setElAnimationProp();
      this._defer('fadeIn');
    },

    handleClose: function () {
      this.messageCenter.trigger('closeMask');
    },

    close: function () {
      this.closable && this.fadeOut();
    },

    remove: function ($super) {
      $super();

      this.constructor.ins = null;
      return this;
    },

    render: function () {
      this.$el.appendTo(this.$parent);
    }
  });
});
