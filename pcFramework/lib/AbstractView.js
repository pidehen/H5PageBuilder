/**
 * View抽象类
 * 主要实现页面的一些常用的功能
 * 比如：
 * 1)、只允许一个对象(单例)
 * 2)、出场动画(默认swipe、swipeReverse)，还有fadeIn、fadeOut
 * 3)、约束开发人员只能委托事件到根对象
 * 4)、支持懒加载、预加载等页面操作
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'backboneTouch',
  'buildClass',
  'Loading'], function ($, _, _1, Backbone, buildClass, LoadingView) {

  return buildClass(_.extend({}, Backbone.View.prototype, {

    /**
     * @constructor
     * 传递和传给Backbone.View一样的参数
     */
    initialize: function (options) {
      // 防止Backbone.View构造方法中的调用对象的initialize导致的溢出
      this.initialize = function () {};
      Backbone.View.call(this, options);
      options || (options = {});

      // 父jquery对象
      this.$parent = _.isUndefined(options.$parent) ? $(document.body) : $(options.$parent);

      // 是否开启出场动画
      this.hasAnimation = _.isUndefined(options.hasAnimation) ? true : !!options.hasAnimation;

      // 动画类型
      this.animationType = _.isUndefined(options.animationType) ? 'transverse' : options.animationType;

      // 动画完成后的回调对象
      this.callbacks = _.isUndefined(options.callbacks) ? {} : options.callbacks;

      // 消息中心
      this.messageCenter = _.isUndefined(options.messageCenter) ? {} : options.messageCenter;

      // 通信事件集合
      this.messages = _.isUndefined(options.messages) ? [] : options.messages;

      // 当前触发动画的方法名，用来到回调对象中查找需要调用的回调方法
      this.currCallMethodName = '';

      // 绑定animationend事件
      this.bindAnimationEndEvent();

      // 加载图标组件
      this.loadingView = null;
    },

    render: function () {
      // 渲染loadingView
      this.loadingView = new LoadingView({
        $parent: this.$el
      });
    },

    hide: function () {
      this.$el.hide();
    },

    show: function () {
      this.$el.show();
    },

    removeLoadingView: function () {
      this.loadingView.remove();
    },

    /**
     * 绑定CSS3动画事件(animationEnd)结束后处理程序，为了等元素动画后调用回调
     */
    bindAnimationEndEvent: function () {
      var currStyle = this.el.style;
      var eventName = currStyle.animation != null ? 'animationend' : 'webkitAnimationEnd';

      this.$el.on(eventName, (function () {
        var method = this.callbacks[this.currCallMethodName];
        method && method.call(this);
      }).bind(this));
    },

    /**
     * 设置元素动画样式
     */
    setElAnimationClass: function () {
      this.$el.addClass(this.animationType);
    },

    /**
     * 开始位移
     *
     * @param { String } x 水平位移
     * @param { String } y 垂直位移
     */
    // _transverseTo: function (x, y) {
    //   !_.isUndefined(x) || (x = 0);
    //   !_.isUndefined(y) || (y = 0);
    //
    //   this.$el.css({
    //     'transform': 'translate3d('+ x +', '+ y +', 0)'
    //   });
    // },

    /**
     * 开始不透明度变化
     * @param { Number } opacity 不透明度
    */
    _fadeTo: function (opacity) {
      !_.isUndefined(opacity) || (opacity = 1);

      this.$el.css({
        opacity: opacity
      });
    },

    /**
     * 水平切屏动画
    */
    // _transverse: function (value, hasReverse) {
    //   if (!this.$el.length || !this.hasAnimation)
    //     return;
    //
    //   // 设置对应的动画回调函数对象的key
    //   this.currCallMethodName = hasReverse ? 'transverseReverse' : 'transverse';
    //
    //   // 设置终止位置
    //   this._transverseTo(value);
    // },

    /**
     * 不透明动画
     */
    _fade: function (hasReverse) {
      if (!this.$el.length || !this.hasAnimation)
        return;

      this.currCallMethodName = hasReverse ? 'fadeOut' : 'fadeIn';
      this._fadeTo(hasReverse ? 0 : void 0);
    },

    /**
     * 水平切屏动画
     */
    transverse: function (start, end) {
      var className = 'transverse-' + start + '-' + 'to' + '-' + end;

      this.currCallMethodName = $.camelCase(className);
      this.$el
        .removeClass(function (_, oldClassName) {
          return oldClassName.slice(oldClassName.indexOf('transverse'))
        })
        .addClass(className);
    },

    /**
     * 当前停留在哪个水平动画上
     */
     hasTransverse: function (type) {
       return this.$el.hasClass('transverse-from-' + type);
     },

    // /**
    //  * 水平反向切屏动画（从左往右）
    //  */
    // transverseReverse: function (value) {
    //   this._transverse(value || '100%', true);
    // },

    /**
     * 淡入动画
     */
    fadeIn: function () {
      this._fade();
    },

    /**
     * 淡出动画
     */
    fadeOut: function () {
      this._fade(true);
    },

    /**
     * 图片懒加载
     * @param { Number } sight 可视化高度
     * @param { Event } ev 滚动事件对象
     */
    lazyload: function (sight, ev) {
      this.$('.lazyload').each(function (_, imgEl) {
        // 首先判断没有加载过
        // 并且判断在可视区
        if (!($(imgEl).data('loading')) && hasSight(imgEl)) {
          loadImg(imgEl);
          imgEl.setAttribute('data-loading', true);
        }
      });

      // 检测图片元素是否在可视区域
      function hasSight(imgEl) {
        var top = imgEl.getBoundingClientRect().top;

        return top <= sight + parseInt(imgEl.offsetHeight) / 2;
      }

      // 未加载的图片元素加载图片，设置加载过图片的元素标识
      function loadImg (imgEl) {
        var dataSrc = imgEl.dataset.src;
        imgEl.src = dataSrc;
      }
    },

    /**
     * 数据按需加载
     *
     * @param { String } collectionName collection名
     * @param { Number } index 数据集合的索引(当前页)
     * @param { Function } success 请求数据或读取缓存数据成功回调
     */
    neededload: function (collectionName, index, success) {
      this[collectionName].fetch({
        // collection 格式化数据结果
        parse: true,

        // 开启localStorage缓存数据
        cache: true,

        // 缓存存储名
        cacheName: collectionName,

        // 当前页
        pageSize: index || 0,

        success: $.proxy(success, this),

        error: $.proxy(this.removeLoadingView, this)
      })
    }
  }), {

    /**
     * 实例
     */
    ins: null,

    /**
     * 创建单例
     */
    createInstance: function (options) {
      if (!this.ins) {
        this.ins = new this(options);
      }

      return this.ins;
    }
  });
});
