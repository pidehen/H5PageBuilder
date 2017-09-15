/**
 * 文本元素类
 * 属性有字体大小/颜色/不透明度/垂直|水平对其方式/字之间的间隙
 */

define(['underscore', 'AbstractUIModel', './AbstractElement'], function (_, UIModel, AE) {

  return AE.extend({

    initialize: function ($super, options) {
      options = _.defaults({}, options, { width: 200, height: 30 });

      $super(options);

      // 数据抽象
      this.fontUIModel = new UIModel(
        _.pick(
          options,
          [ 'fontSize', 'color', 'fontOpacity', 'vAlign', 'tAlign', 'spacingLetter' ]
        )
      );

      this.setModelChangeMethods(this.fontUIModel, {
        'fontSize':
      });

    },

    renderLayout: function (attr) {
      return function () {

      }
    },

  });

});
