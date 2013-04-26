
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db;
var db = new Db('docs',new Server('localhost', 27017), {w: 1, auto_reconnect: true});
 
var app = express();











//Generates a fairly random doc ID
function generateDocID(length) {
	

	var chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
		        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
		        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
		        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
		        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	var uuid = '';



	for(var i=0; i < length; i++) {
		uuid += chars[Math.floor((Math.random()*chars.length))];
	}

	return uuid;


}





// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.home);
app.get('/help', routes.help);
app.get('/about', routes.about);
app.get('/home', routes.home);

app.get('/javascripts/:language/:document', function(req, res) {
	//req.params.language
	//req.params.document
});

//request to create a document
app.post("/create", function(req, res) {

	//req.body.src
	//req.body.lan

	var newDocID = '';

	do
	{
		newDocID = generateDocID(20);

	}while(db.collection('docs').find({docID: newDocID}).count() > 0);

	db.collection('docs').insert({docID: newDocID, src: req.body.src, lan: req.body.lan}, { w: 0 });

	res.send(newDocID);

});

app.get('/view/:document', function(req, res) {
	
	var doc = db.collection('docs').find({docID: req.params.document});

	if(doc == {}) {
		routes.fourOhFour(req, res);
	}
	else {
		res.render('editor', {title: 'CodeSoar', src: doc.src, docid: req.params.document, lan: doc.lan});
	}


});

app.use(function(req, res, next){

	//check if document exists from req.

  	routes.fourOhFour(req, res);
});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
