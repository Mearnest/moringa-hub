
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var tempData = require('./public/javascripts/createBaseJsonData.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/home', function(req, res) {
    //NOTE - this will come from db
    res.send(tempData.makeInitialHeaderJson());  
});

app.get('/study', function(req, res) {
    //NOTE - this will come from db
    res.send(tempData.makeStudyJson());
});

app.get('/user', function(req, res) {
    //NOTE - this will come from db
    res.send(tempData.makeUserProfileJson());
});

app.get('/updates', function(req, res) {
    //NOTE - this will come from db
    res.send(tempData.makeStudyUpdatesJson());
});

app.get('/results', function(req, res) {
    //NOTE - this will come from db
    res.send(tempData.makeResultsJson());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
