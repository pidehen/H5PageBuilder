'use strict';

;(function () {
  var device = window.navigator.appVersion;
  var androidRE = /android/i;
  var iphoneRE = /iphone/i;

  var MobileAdapter = buildClass({
    initialize: function initialize(forecast) {
      this.forecast = forecast;
      this.isAndroid = androidRE.test(device);
      this.isIPhone = iphoneRE.test(device);
      this.setMetaEle();
      this.adapter();
    },
    setMetaEle: function setMetaEle() {
      var metaEl = document.createElement('meta');
      var content = 'initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no';
      metaEl.setAttribute('name', 'viewport');
      metaEl.setAttribute('content', content);

      document.documentElement.firstElementChild.appendChild(metaEl);
    },
    adapter: function adapter() {
      var actual = window.innerWidth;
      var rem = (actual / this.forecast).toFixed(2) * 100;
      document.documentElement.style.fontSize = rem + 'px';
    }
  });

  window.mobileAdapter = function (forecast) {
    return new MobileAdapter(forecast);
  };
})();
