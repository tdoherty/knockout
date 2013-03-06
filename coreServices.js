var http = require('http'),
  config = require('./config');

function doProxy(method, url, callBack) {
  console.log('preparing request to ' + url);
  var qs = config.options.apiQueryString;
  qs = qs.replace('{0}', config.options.apiToken).replace('{1}', config.options.apiUserToken);
  url = config.options.apiBaseURL + url;
  url += (url.indexOf('?') !== -1 ? '&' : '?') + qs;

  console.log(url);
  var u = require('url').parse(url),
    remote_client = http.createClient(80, u['host']),
    request = remote_client.request(method, u['pathname'] + '?' + u['query'], {'host':u['host'], 'user-agent':'node.js'});

  console.log('request made');

  request.addListener('response', function (response) {
    var body = '';
    response.setEncoding('utf8');

    response.addListener('data', function (chunk) {
      body += chunk;
      console.log('chunk received');
    });

    response.addListener('end', function () {
      callBack(body);
    });
  });

  request.end();
}

exports.doProxy = doProxy;