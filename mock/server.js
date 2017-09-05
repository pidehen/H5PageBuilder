var app = require('express')();
var Mock = require('mockjs');

function s4() {
  const rand = (1 + Math.random()) * 0x10000;
  return (rand | 0).toString(16).substring(1);
}

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
var i = 1;

// 获取所有文章
app.get('/api/articles', function (req, res) {
  var currPage = req.query.page;
  var callback = req.query.callback;
  var data = Mock.mock({
    'data|10': [{
      'id|+1': i,
      'title': 'Django源码中的metaclass使用是如何兼容Python2和Python3的',
      'category': 'Python',
      'create_time': '2017-06-09 06:53',
      'content_html': 'Django源码中的metaclass使用是如何兼容Python2和Python3的'
    }]
  });
  i += 10;

  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  res.end(callback + '('+ JSON.stringify(data) +')');
});

app.listen(7878, function () {
  console.log('server is started');
});
