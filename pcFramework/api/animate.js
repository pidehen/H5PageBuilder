/**
 * JS动画
 *
 * 动画流畅度在于避免频繁重复Layout、reflow、repaint和设置正确的帧频(每秒执行的动作数)
 * 设置正确的帧数做法
 * 在定义函数中比较当前待执行的时间戳和上一次执行的时间戳的差值是否小于16(最佳的帧数)
 * 如果是大于16，那么就立即执行
 * 如果小于16，那么将这差值设置为执行时间
 * 包括定义动画的载体函数和各个动画的业务方法
*/

define(function (bC) {
  var keys = ['webkitRequestAnimationFrame', 'requestAnimationFrame'],
      cancelKeys = ['webkitCancelAnimationFrame', 'cancelAnimationFrame'],
      durationMap = {
        fast: 200,
        slow: 600,
        default: 400
      },
      rafName, raf, clearRaf;

  /**
   * 检测是否支持RAF函数
   * 支持返回函数名的兼容写法
   *
   * @param { Array } keys 各个兼容的函数名集合
   * @return { String|Boolean }
   */
  function getRafSummary (keys) {
    var names = keys.filter(function (item) { return !!window[key]; });

    return names ? names.pop() : false;
  }

  /**
   * 驼峰转 "-" 试
   */
  function dasherize(str) {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
  }

  /**
   * 获取元素的属性的初始值
   *
   * @param { HTMLElement } el 元素
   * @param { Array } props 改变的CSS属性名
   * @param { Object }
   */
  function getElPropMap (el, props) {
    var ret = {},
        currStyle = el.style,
        temp;

    props.forEach(function (propName) {
      temp = parseFloat(currStyle[propName] == '' || currStyle[propName] == null
        ? document.defaultView.getComputedStyle(el, null).getPropertyValue(propName)
        : currStyle[propName]);
      ret[ propName ] = isNaN(temp) ? 0 : temp;
    });

    return ret;
  }

  /**
   * 动画的载体函数
   * 使用requestAnimationFrame执行动画弥补了setTimeout丢帧
   */
  raf = ( rafName = getRafSummary(keys) ) ? window[ rafName ] : (function () {
    var lastTime = 0;

    return function (callback) {
      var currTime = +new Date,
          deltaTime = Math.max( 0, 16 - (currTime - lastTime) );

      lastTime = currTime + deltaTime;

      setTimeout(callback, deltaTime);
    };
  })();

  clearRaf = ( rafName = getRafSummary(cancelKeys) ) ? window[ rafName ] : (function () {
    return function (timeoutId) {
      clearTimeout(timeoutId);
    }
  })();

  return function (el, props, duration, callback) {
    var currPropMap = getElPropMap(el, Object.keys(props)),
        count = Object.keys(props).length,
        index = 0,
        speedMap = {},
        value, timer, temp, isIncrease;

    duration = typeof duration === 'string'
      ? durationMap[ duration ]
      : durationMap[ 'default' ];

    for (var prop in currPropMap) {
      props[ prop ] = parseFloat(props[ prop ]);
      temp = currPropMap[prop] - parseFloat(props[prop]);
      value = parseFloat(((Math.abs(temp) / duration) * 16).toFixed(2));
      speedMap[ prop ] = temp < 0 ? value : -value;
    }

    function animation () {
      for (var prop in props) {
        if (speedMap[ prop ] < 0) {
          if (currPropMap[ prop ] <= props[ prop ]) {
            index++;
            continue;
          }

        } else {
          if (currPropMap[ prop ] >= props[ prop ]) {
            index++;
            continue;
          }
        }

        currPropMap[ prop ] += speedMap[ prop ];
        el.style[ dasherize(prop) ] = prop === 'opacity' ? currPropMap[ prop ] : currPropMap[ prop ] + 'px';
      }

      if (index === count) {
        clearRaf(timer);
        return;
      }

      timer = raf(animation);
    }

    raf(animation);
  };
});
