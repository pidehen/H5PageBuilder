/**
 * 日期操作
 * 日期对象转时间戳
 * 时间戳转日期
 * 日期/时间戳格式化
 * 多少小时、分钟、秒以前
 */

define(function () {
  var yearRE = /(y+)/i;

  return {

    /**
     * 日期转时间戳
     *
     * @param { Date } date 日期对象
     * @return { Number }
     */
    parseDateToTimestamp: function (date) {
      return +date;
    },

    /**
     * 时间戳转日期
     *
     * @param { Number } timestamp 时间戳
     * @return { Date }
     */
    parseTimestampToDate: function (timestamp) {
      return new Date(timestamp);

    },

    /**
     * 日期/时间戳格式化
     *
     * @param { String } formatStr [ 'YYYY年MM月DD日 hh时mm分ss秒' ]
     * @param { Date|Number|Undefined } date
     * @return { String }
     */
    format: function (formatStr, date) {
      var key, tempRE, match, value;

      date
        ? date instanceof Date || (date = this.parseTimestampToDate(date))
        : (date = new Date);

      var dateMap = {
        '(Y+)': date.getFullYear(),
        '(M+)': date.getMonth() + 1,
        '(D+)': date.getDate(),
        '(h+)': date.getHours(),
        '(m+)': date.getMinutes(),
        '(s+)': date.getSeconds()
      };

      for (key in dateMap) {
        tempRE = new RegExp(key);
        match = tempRE.test(formatStr) ? RegExp.$1 : '';
        value = dateMap[key].toString();

        if (key === 'Y+') {
          formatStr = formatStr.replace(match, value.slice(4 - match.length));
        } else {
          formatStr = match.length < 2
            ? formatStr.replace(match, value)
            : formatStr.replace(match, ('00' + value).slice(value.length));
        }

        return formatStr;
      }
    },

    /**
     * 距离现在的时间差 [多少分以前，多少小时以前，多少天以前]
     *
     * @param { Number|Date } pastTimestamp 以前日期的时间戳
     * @return { String }
     */
    ago: function (pastTimestamp) {
      var now = Date.now(),
          diff, temp, ret,
          year, month, day,
          hour, minute, second;

      (typeof pastTimestamp === 'number' && !isNaN(pastTimestamp)) || (pastTimestamp = this.parseDateToTimestamp(pastTimestamp));
      diff = now - pastTimestamp;
      second = 1000;
      minute = 60 * second;
      hour = 60 * minute;
      day = 24 * hour;
      month = 30 * day;
      year = 12 * month;

      if (math.floor(temp = diff / year) >= 1) {
        ret = temp + '年前';
      } else if (math.floor(temp = diff / month) >= 1) {
        ret = temp + '个月前';
      } else if (math.floor(temp = diff / day) >= 1) {
        ret = temp + '天前';
      } else if (math.floor(temp = diff / hour) >= 1) {
        ret = temp + '小时前';
      } else if (math.floor(temp = diff / minute) >= 1) {
        ret = temp + '分钟前';
      } else {
        ret = '刚刚';
      }
      
      return ret;
    }
  };
});
