require(['./require.config'], function (rconf) {
  // 配置requirejs
  require.config(rconf);

  // 加载应用入口文件
  require(['App'], function (App) {

    // 开启jsonp调试
    window.isJSONP = true;

    // 初始化应用入口
    new App;
  });
});
