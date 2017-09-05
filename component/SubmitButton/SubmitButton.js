define(['underscore', 'AbstractView', 'AbstractUIModel', 'text!component/SubmitButton/SubmitButton.html'], function (_, AV, UIModel, sbTemp) {
  return AV.extend({
    events: {
      'click': 'handleSubmit'
    },

    initialize: function ($super, options) {
      options = _.defaults(options, {
        tagName: 'button',
        className: 'btn-submit',
        text: '提交',
        loading: false,
        style: {
          color: '#fff',
          backgroundColor: '#108ee9',
          borderColor: '#108ee9'
        },
        messageCenter: {} // 必传
      });
      $super(options);

      this.hasAnimation = false;
      this.template = _.template(sbTemp);
      this.uiModel = new UIModel({
        text: options.text,
        loading: options.loading
      });

      // loading状态变化，单独对单个元素操作
      this.listenTo(this.uiModel, 'change:loading', this.renderLoading.bind(this));

      // 设置样式
      this.setStyle(options.style);

      this.render(this.uiModel);
    },

    setStyle: function (style) {
      this.$el.css(style);
    },

    render: function (model) {
      this.$el.toggleClass('loading', model.get('loading'))
        .html(this.template(model.toJSON()))
        .appendTo(this.$parent);
    },

    renderLoading: function (_, loading) {
      this.$el.toggleClass('loading', loading);
    },

    handleSubmit: function () {
      var loading = this.uiModel.get('loading');

      if (loading)
        return;

      this.uiModel.set('loading', true);
    }
  });
});
