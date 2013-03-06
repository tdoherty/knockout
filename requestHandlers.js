var url = require("url"),
  coreServices = require('./coreServices');


function merchantInfo(req, res, callBack) {
  var resource = url.parse(req.url).pathname;
  console.log('resource = ' + resource);
  coreServices.doProxy('GET', resource, function (content) {
    callBack(content);
  });
}

function contactInfo(req, res, callBack) {
  var resource = url.parse(req.url).pathname + '?fieldencryptionlevel=2';
  console.log('resource = ' + resource);
  coreServices.doProxy('GET', resource, function (content) {
    callBack(content);
  });
}

function principalInfo(req, res, callBack) {
  var resource = url.parse(req.url).pathname + '?fieldencryptionlevel=2';
  console.log('resource = ' + resource);
  coreServices.doProxy('GET', resource, function (content) {
    callBack(content);
  });
}
exports.merchantInfo = merchantInfo;
exports.contactInfo = contactInfo;
exports.principalInfo = principalInfo;