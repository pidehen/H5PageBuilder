define(['underscore', 'buildClass'], function (_, bC) {
  function s4() {
    const rand = (1 + Math.random()) * 0x10000;
    return (rand | 0).toString(16).substring(1);
  }

  function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  return bC({
    initialize: function (name, dataKey) {
      var store;

      this.name = name;
      this.dataKey = dataKey;

      store = JSON.parse(this._getItem(this.name));
      this.records = store || [];
    },

    create: function (model) {
      var data = model[this.dataKey];

      this.records.push(data);
      this._setItem(this.name, JSON.stringify(this.records));
    },

    find: function (index) {
      var context = this;
      index != null || (index = 0);

      return this.records[index];
    },

    _localStorage: function () {
      return window.localStorage;
    },

    _getItem: function (key) {
      return this._localStorage().getItem(key);
    },

    _setItem: function (key, value) {
      this._localStorage().setItem(key, value);
    }
  });
});
