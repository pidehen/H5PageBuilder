/**
 * 客户端(浏览器)存储器
 * 使用localStorage进行存储
 */

define(['buildClass'], function (bC) {
  function serialize (obj) {
    return JSON.stringify && JSON.stringify(obj);
  }

  function deserialize (str) {
    return JSON.parse && JSON.parse(str);
  }

  function s4() {
    const rand = (1 + Math.random()) * 0x10000;
    return (rand | 0).toString(16).substring(1);
  }

  function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  return bC({

    /**
     * @constructor
     * @param { String } name 存储名
     * @param { Number } expires 存储时间，单位为秒
     */
    initialize: function (name, expires) {
      this.name = name;
      this.expires = expires * 1000;
      this.serialize = serialize;
      this.deserialize = deserialize;
      this.record = this._getItem() || {};
    },

    _localStorage: function () {
      return window.localStorage;
    },

    _itemKey: function (id) {
      return id ? this.name + '-' + id : this.name;
    },

    _getItem: function (key) {
      return this.deserialize(this._localStorage().getItem(this._itemKey(key)));
    },

    _setItem: function (key, obj) {
      if (typeof key !== 'string') {
        obj = key;
        key = '';
      }

      this._localStorage().setItem(this._itemKey(key), this.serialize(obj));
    },

    _isExpired: function () {
      var currTime = Date.now();
      var setTime = this.record.expires;

      return !setTime || currTime - setTime > this.expires;
    },

    findById: function (id) {
      var ret;

      // 缓存没过期
      if (!this._isExpired()) {
        ret = this.findAll().filter(function (model) {
          return model.id === id;
        }).pop();
      }

      return ret;
    },

    findAll: function () {
      var res;

      if (!this._isExpired()) {
        res = this.record.ids.map((function (id) {
          return this._getItem(id);
        }).bind(this));
      }

      return res;
    },

    save: function (obj) {
      var i, length, temp;
      obj instanceof Array || (obj = [ obj ]);

      for (i = 0, length = obj.length; i < length; i++) {
        temp = obj[i];

        if (temp.id == null) {
          temp.id = guid();
        }

        this.setItem(temp.id, temp);
      }

      if (!this.record.expires) {
        this.record.expires = Date.now();
      }

      this.record.data.push.apply(this.record.data, obj);
      this.setItem(this.record.data);
    }
  });
});
