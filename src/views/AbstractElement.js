/**
 * 所有元素的抽象类
 * 封装共同的方法
 * 多态的方法需要子类继承重写，但是先定义出来
 */

define([
  'underscore',
  'buildClass',
  'AbstractView',
  'AbstractUIModel'], function (_, bC, AV, UIModel) {
  return AV.extend({

    initialize: function ($super, options) {
      options = _.defaults({}, options, {

        // 元素类别 [必传] 0:页 1:文本 2:图片
        category: 0,

        // 宽 [必传]
        width: 0,

        // 高 [必传]
        height: 0,

        // 位置 [必传]
        position: {
          left: 0,
          top: 0
        },

        // 背景颜色 [必传]
        backgroundColor: '#fff',

        // 背景图片 [必传]
        backgroundImage: '',

        // 动画 [必传]
        animate: {
          animationName: 'fadeIn',
          // 动画持续时间，秒为单位
          animationDuration: 2,
          animationTimingFunction: 'ease',
          animationDelay: 0
        },

        // 字体大小
        fontSize: 14,

        // 字体颜色
        color: '#666',

        // 不透明度
        fontOpacity: 1,

        // 垂直对其方式
        vAlign: 'center',

        // 水平对其方式
        tAlign: 'center',

        // 字之间间隙
        spacingLetter: 0

      });

      // 布局抽象
      this.layoutUIModel = new UIModel(
        _.pick(
          options,
          ['width', 'height', 'position']
        )
      );

      // 外观抽象
      // 需在不同的子类中重写
      this.appearanceUIModel = null;

      // 动画属性
      this.animateUIModel = new UIModel(options.animate);

      // 设置布局属性变化的处理方法
      this.setLayoutChange();

      // 设置外观属性变化的处理方法
      this.setAppearanceChange();
    },

    /**
     * 设置多个订阅属性变化的方法
     */
    _setSingleAttrChangeMethods: function (model, methodMap) {
      _.each(
        methodMap,
         _.bind(function (attr, method) {
          this.listenTo(model, 'change:' + attr, method)
        }, this)
      );
    },

    setLayoutChange: function () {
      this._setSingleAttrChangeMethods(this.basicUIModel, {
        'width': this.renderLayout('width'),
        'height': this.renderLayout('height'),
        'left': this.renderLayout('left'),
        'top': this.renderLayout('top')
      });
    },

    setAppearanceChange: function () {

    },

    /**
     * 布局属性发生变化时接收方法
     */
    renderLayout: function (attr) {
      return function (model, changedValue) {

      }
    },

    /**
     * 外观属性发生变化时调用
     */
    renderAppearance: function (attr) {
      return function (model, changedValue) {

      }
    },

    /***
     *** 交互
     *** 包括拖拽、图片上传等
    ***/

    /**
     * 拖拽
    */
    drag: function () {

    },

    /**
     * 图片上传
     */
    upload: function () {

    }

  });
});
