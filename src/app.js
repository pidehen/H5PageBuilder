define(['jquery', 'buildClass', 'route'], function ($, bC, route) {
  return bC({

    initialize: function () {
      // 开启路由监听
      route({
        '': 'index',
      }, {
        index: $.proxy(this.index, this)
      });
    },

    index: function () {
      alert('sss');
    }
  });
});
