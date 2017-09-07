define([
  'underscore',
  'AbstractView',
  'Mask',
  'MessageCenter',
  'text!component/ConfirmModal/ConfirmModal.html'], function (_, AV, Mask, MessageCenter, confirmModalTemp) {
    return AV.extend({
      events: {
        'click .btn-cancel': 'handleCancel',
        'click .btn-ok': 'handleOk'
      },

      initialize: function ($super, options) {
        options = _.defaults(options, {
          className: 'confirm-modal',  // 不传
          animationType: 'fade',       // 不传
          speed: 'slow',               // 不传
          callbacks: {                 // 不传
            fadeOut: function () {
              this.remove();
            }
          },
          content: '',                 // 必传
          okText: '确认',              // 可传
          cancelText: '取消',          // 可传
          maskClosable: true          // 可传
        });
        $super(options);

        this.content = options.content;
        this.okText = options.okText;
        this.cancelText = options.cancelText;
        this.maskClosable = options.maskClosable;
        this.template = _.template(confirmModalTemp);
        this.maskView = null;

        this.messageCenter = new MessageCenter().on('closeMask', (function () {
          this.maskView.close();
          this.fadeOut();
        }).bind(this));

        this.render();
        this.setElAnimationProp();
        this._defer('fadeIn');
      },

      handleOk: function () {
        this.handleCancel();
        this.trigger('ok', this);
      },

      handleCancel: function () {
        this.messageCenter.trigger('closeMask');
      },

      remove: function ($super) {
        $super();

        this.constructor.ins = null;
        return this;
      },

      render: function () {
        this.maskView = Mask.createInstance({ messageCenter: this.messageCenter });

        this.$el.html(
          this.template(
            {
              content: this.content,
              okText: this.okText,
              cancelText: this.cancelText
            }
          )
        ).appendTo(this.$parent);
      }
    });
  });
