// My SocketStream app

var express = require('express')
  , http = require('http')
  , ss = require('socketstream')
  , security = require('./server/middleware/security');

// Define a single-page client
ss.client.define('main', {
  view: 'app.html',
  css:  ['libs', 'app.styl'],
  code: ['libs', 'app'],
  tmpl: '*'
});

ss.client.define('admin', {
  view: 'app.html',
  css: ['libs', 'app.styl'],
  code: ['libs', 'app'],
  tmpl: '*'
});

// Code Formatters
ss.client.formatters.add(require('ss-stylus'));

// Use server-side compiled Hogan (Mustache) templates. Others engines available
ss.client.templateEngine.use(require('ss-hogan'));

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env == 'production') ss.client.packAssets();

var app = express.createServer(
	express.bodyParser(),
	express.static(__dirname + "/client/static"),
	ss.http.middleware
);

app.get('/', function(req, res) {
	res.serveClient('main');
});

app.get('/admin', security.authenticated(), function(req, res) {
	res.serveClient('main');
});

app.listen(3000);

// Start SocketStream
ss.start(app);