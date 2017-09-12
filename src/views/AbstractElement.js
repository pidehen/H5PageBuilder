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

        // 类别 0:页 1:文本 2:图片 [必传]
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
        }

      });

      // 基础属性
      this.basicUIModel = new UIModel(
        _.pick(options, ['category', 'width', 'height', 'position', 'backgroundColor', 'backgroundImage'])
      );

      // 动画属性
      this.animateUIModel = new UIModel(options.animate);

      // 接收基础属性变化的方法
      this._setModelChangeMethods(this.basicUIModel, {
        'width': this._renderLayout('width'),
        'height': this._renderLayout('height'),
        'left': this._renderLayout('left'),
        'top': this._renderLayout('top')
      });
    },

    /**
     * 设置多个订阅属性变化的方法
     */
    _setModelChangeMethods: function (model, methodMap) {
      _.each(
        methodMap,
         _.bind(function (attr, method) {
          this.listenTo(model, 'change:' + attr, method)
        }, this)
      );
    },

    /**
     * 布局属性发生变化时调用
     */
    _renderLayout: function (attr) {
      return function (model, changedValue) {
        
      }
    },

    /**
     * 外观属性发生变化时调用
     */
    _renderAppearance: function (attr) {
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
