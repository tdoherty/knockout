var express = require('express'),
  app = express.createServer(),
  requestHandlers = require("./requestHandlers");

//app.use('/', express.static(__dirname + '/Views/Home/Index.html'));
app.use('/Content', express.static(__dirname + '/Content'));
app.use('/Scripts', express.static(__dirname + '/Scripts'));
app.use('/images', express.static(__dirname + '/Images'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/Views/Home/Index.html')
});

app.get('/merchants/:mid/merchantinfo', function (req, res) {
  requestHandlers.merchantInfo(req, res, function (content) {
    res.send(content);
  })
});

app.get('/merchants/:mid/contactinfo', function (req, res) {
  requestHandlers.contactInfo(req, res, function (content) {
    res.send(content);
  })
});

app.get('/merchants/:mid/principles', function (req, res) {
  requestHandlers.principalInfo(req, res, function (content) {
    res.send(content);
  })
});

app.listen(3001);

