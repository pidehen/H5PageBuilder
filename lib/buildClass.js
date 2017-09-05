/**
 * 实现js面向对象
 */

;(function (win, undefined) {
  var superRE = /\$super/;

  // 如果在方法中出现了$super参数名
  // 需要传入$super为父类原型
  function resetProtoMethod (proto) {
    var ret = {};

    if (proto != null && Object.getPrototypeOf(proto) === Object.prototype) {
      for (var key in proto) {
        var method = proto[key];

        if (typeof method === 'function' && superRE.test(method.toString())) {
          ret[key] = (function (sourceMethod, methodName) {
            return function () {
              var args = Array.prototype.slice.call(arguments);
              var superMethod = this.constructor.__super__[methodName];
              args.unshift(superMethod.bind(this));

              sourceMethod.apply(this, args);
            };
          })(method, key);
        } else {
          ret[key] = method;
        }
      }
    }

    return ret;
  }

  // 拷贝对象
  function copy (target, source, isDefault) {
    isDefault || (isDefault = false);

    var type = typeof source;

    if (type === 'object' || type === 'function') {
      for (var key in source) {
        if (!isDefault || (target[key] == null && isNaN(target[key]))) {
          target[key] = source[key];
        }
      }
    }

    return target;
  }

  function setProps (target) {
    var sources = Array.prototype.slice.call(arguments, 1);

    for (var i = 0, len = sources.length; i < len; i++) {
      copy(target, sources[i]);
    }

    return target;
  }

  /**
   * 创建类
   * @param { Object } proto  原型 属性|方法
   * @param { Object } static 静态 属性|方法
   * @return { Function }
   */
  win.buildClass = function (proto, static) {
    var Target = proto.initialize || function () {};

    Target.prototype = Object.create(proto);
    Target.prototype.constructor = Target;

    setProps(Target, buildClass, static);

    return Target;
  };

  /**
   * 创建子类
   * @param { Object } proto  原型 属性|方法
   * @param { Object } static 静态 属性|方法
   * @return { Function }
   */
  win.buildClass.extend = function (proto, static) {
    var Parent, Child, proto;

    Parent = this;
    Child = proto && proto.initialize
      ? resetProtoMethod({ initialize: proto.initialize }).initialize
      : function () { Parent.apply(this, arguments) };
    proto = setProps({}, Parent.prototype, resetProtoMethod(proto));
    Child.prototype = Object.create(proto);
    Child.prototype.constructor = Child;
    Child.__super__ = Parent.prototype;

    setProps(Child, Parent, static);

    return Child;
  };
})(window);
