// require.js配置文件

define(function () {

  // 常用api模块路径
  var apiPath = 'pcFramework/api/';

  // 第三方模块基础路径
  var venderPath = 'pcFramework/vender/';

  // 自定义类库路径
  var libPath = 'pcFramework/lib/';

  // 自定义组件路径
  var componentPath = 'pcFramework/component/';

  // 静态资源路径
  var staticPath = 'pcFramework/static/';

  return {
    baseUrl: './',

    paths: {
      // 异步加载模板
      text: venderPath + 'require.text',

      // 异步加载CSS
      css: venderPath + 'require.css',

      jquery: venderPath + 'zepto',

      underscore: venderPath + 'underscore',

      backbone: venderPath + 'backbone',

      backboneTouch: venderPath + 'backbone.touch',

      mobileAdapter: libPath + 'mobileAdapter',

      buildClass: libPath + 'buildClass',

      sync: libPath + 'sync',

      Store: libPath + 'Store',

      AbstractView: libPath + 'AbstractView',

      AbstractUIModel: libPath + 'AbstractUIModel',

      MessageCenter: libPath + 'MessageCenter',

      route: apiPath + 'route',

      App: 'src/app',

      /* 自定义的一些组件 */
      // 提交按钮，包括发送ajax
      SubmitButton: componentPath + 'SubmitButton/SubmitButton',

      // 全局提示框
      Message: componentPath + 'Message/Message',

      // 询问对话框
      ConfirmModal: componentPath + 'ConfirmModal/ConfirmModal',

      // 遮罩
      Mask: componentPath + 'Mask/Mask',

      // 加载图标
      Loading: componentPath + 'Loading/Loading'
    },

    shim: {
      jquery: {
        exports: '$'
      },

      underscore: {
        exports: '_'
      },

      backbone: {
        deps: ['jquery', 'underscore'],
        exports: 'Backbone'
      },

      mobileAdapter: {
        deps: ['buildClass'],
        exports: 'mobileAdapter'
      },

      buildClass: {
        exports: 'buildClass'
      },

      SubmitButton: {
        deps: ['css!'+ componentPath +'SubmitButton/SubmitButton.css']
      },

      Message: {
        deps: ['css!' + componentPath + 'Message/Message.css']
      },

      ConfirmModal: {
        deps: ['css!' + componentPath + 'ConfirmModal/ConfirmModal.css']
      },

      Loading: {
        deps: ['css!'+ componentPath +'Loading/Loading.css']
      },

      App: {
        deps: [
          'css!' + staticPath + 'css/reset.css',
          'css!' + staticPath + 'css/animate.css',
          'css!' + staticPath + 'css/layout.css'
        ]
      }
    }
  };
});
