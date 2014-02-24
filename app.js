
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
app.set('view engine', 'ejs');
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

app.get('/', function(req, res) {
    res.render('index.html');
});
//app.get('/users', user.list);

app.get('/home', function(req, res) {
    //NOTE - this will come from db
    if(req.xhr) {
        res.send(tempData.makeInitialHeaderJson());  
    }
    else {
        var data = tempData.makeInitialHeaderJson();
        data = JSON.stringify(data);
        res.render('index', { title: 'Home', data: data, loadView: 'createContent["home"]("container");' });
    }
});

app.get('/study', function(req, res) {
    //NOTE - this will come from db
    if(req.xhr) {
        res.send(tempData.makeStudyJson());
    }
     else {
        var data = tempData.makeStudyJson();
        data = JSON.stringify(data);
        res.render('index', { title: 'Study', data: data, loadView: 'createContent["study"]("container");' });
    }
});

app.get('/user', function(req, res) {
    //NOTE - this will come from db
    if(req.xhr) {
        res.send(tempData.makeUserProfileJson());
    }
    else {
        var data = tempData.makeUserProfileJson();
        data = JSON.stringify(data);
        res.render('index', { title: 'User', data: data, loadView: 'createContent["user"]("container");' });
    }
});

app.get('/user/:id', function(req, res) {
    //NOTE - this will come from db
    var id = req.params.id;

    if(req.xhr) {
        res.send(tempData.makeUserProfileJson(id));
    }
    else {
        var data = tempData.makeUserProfileJson(id);
        data = JSON.stringify(data);
        res.render('index', { title: 'User', data: data, loadView: 'createContent["user"]("container", ' + id + ');' });
    }
});

app.get('/updates', function(req, res) {
    //NOTE - this will come from db
    if(req.xhr) {
        res.send(tempData.makeStudyUpdatesJson());
    }
    else {
        var data = tempData.makeStudyUpdatesJson();
        data = JSON.stringify(data);
        res.render('index', { title: 'Updates', data: data, loadView: 'createContent["updates"]("container");' });
    }
});

app.get('/updates/:id', function(req, res) {
    //NOTE - this will come from db
    var id = req.params.id;

    if(req.xhr) {
        res.send(tempData.makeStudyUpdatesJson(id));
    }
    else {
        var data = tempData.makeStudyUpdatesJson(id);
        data = JSON.stringify(data);
        res.render('index', { title: 'Updates', data: data, loadView: 'createContent["updates"]("container", ' + id + ');' });
    }
});

app.get('/results', function(req, res) {
    //NOTE - this will come from db
    if(req.xhr) {
        res.send(tempData.makeResultsJson());
    }
    else {
        var data = tempData.makeResultsJson();
        data = JSON.stringify(data);
        var showAll = true;
        res.render('index', { title: 'Results', data: data, loadView: 'createContent["results"]("container", ' + showAll + ');' });
    }
});

//The 404 Route (ALWAYS Keep this as the last route)
//app.get('*', function(req, res){
//  res.send('Page Not Found', 404);
//});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
