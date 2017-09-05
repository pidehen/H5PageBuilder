require(['require.config'], function (rconf) {
  // 配置requirejs
  require.config(rconf);

  // 加载应用入口文件
  require(['mobileAdapter', 'App'], function (mobileAdapter, App) {
    // 移动端适配
    mobileAdapter(640);

    // 开启jsonp调试
    window.isJSONP = true;

    // 初始化应用入口
    new App;
  });
});
