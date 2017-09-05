define(['underscore', 'backbone', 'buildClass'], function (_, Bb, bC) {
  var mustProps = _.omit(Bb.Model.prototype, ['save', 'fetch', 'sync', 'destroy']);

  return bC(_.extend(mustProps, {
    initialize: function (attributes, options) {
      this.initialize = function () {};

      Bb.Model.call(this, attributes, options);
    }
  }));
});
