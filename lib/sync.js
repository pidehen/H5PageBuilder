define(['underscore', 'buildClass', 'backbone', 'Store'], function (_, bC, Bb, Store) {
  var sync = Bb.ajaxSync || Bb.sync;

  if (!Bb.ajaxSync) {
    Bb.ajaxSync = Bb.sync;
  }

  Bb.sync = function (method, model, options) {
    if (method !== 'read' && method !== 'create') {
      return sync.apply(this, arguments);
    }

    options || (options = {});

    // 是否支持jsonp跨域
    if (window.isJSONP) {
      options = _.extend({}, options, {
        dataType: 'jsonp',
        jsonp: 'callback'
      });
    }

    var context = this;
    var success = options.success;
    var error = options.error;
    var cache = options.cache;
    var cacheName = options.cacheName;
    var pageSize = options.pageSize;
    var store, resp;

    if (cache) {
      store = new Store(cacheName, 'data');

      if (method === 'read') {
        resp = store.find(pageSize);

        // 如果是第一次请求
        if (!resp || !resp.length) {
          options.data = { pageSize: pageSize };
          options.success = function (res) {
            store.create(res);
            success.call(context, res);
          };
          options.error = function (_, textStatus) {
            alert(textStatus);
            error.call(context, arguments);
          };

          return Bb.ajaxSync.call(context, method, model, options);
        } else {
          success.call(context, { data: resp });
        }
      }
    } else {
      options.error = function (_, textStatus) {
        alert(textStatus);
        error.call(context, arguments);
      }

      return Bb.ajaxSync.call(context, method, model, options);
    }
  };
});
