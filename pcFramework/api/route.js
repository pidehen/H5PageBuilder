define(['underscore', 'backbone'], function (_, Bb) {
  var Router = Bb.Router.extend({

    initialize: function (routeMap, methodMap) {
      this.routes = routeMap;
      _.extend(this, methodMap);

      this._bindRoutes();
    }

  });

  return function (routeMap, methodMap) {
    new Router(routeMap, methodMap);
    Bb.history.start();
  }
});
