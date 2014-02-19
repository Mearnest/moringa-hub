
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

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
    res.send('{"header":"Moringa Hub Prototype","subHeader":"This is the main body</h4>","bigNotice":"Add stuff on document ready."}');  
});

app.get('/user', function(req, res) {
    //NOTE - this will come from db
    res.send('{"name":"Mark Olson","city":"Mexico SD","state":"","country":"Mexico","organization":"Universidad Nacional Autonama de Mexico","email":"","researchInterests":["Moringa","Protein","Trees shaped like broccoli"],"currentStudies":["Effects of Moringa oleifera leaves on cattle’s daily milk production"],"pastStudies":["A test of social marketing the dietary use of Moringa oleifera leaves among rual people in Orissa, India"]}');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
