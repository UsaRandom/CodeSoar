//#!/bin/env node

/// <reference path="Config.ts"/>
/// <reference path="MessageServer.ts"/>

declare var __dirname;
declare var require;

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("EXPLOSION!!! Node NOT Exiting...");
});

//required modules
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , mongo = require('mongodb');

//setup mongodb
var dbServer = new mongo.Server(CodeSoar.Server.Config.Get().MONGODB_HOST,
								CodeSoar.Server.Config.Get().MONGODB_PORT);

var db = new mongo.Db(CodeSoar.Server.Config.Get().MONGODB_DB_NAME,
					  dbServer, {auto_reconnect: true, w:1});

//open connection to mongodb and authenticate ourselves.
db.open(function(err, db) {

	if (err)
		throw err;

	db.authenticate(CodeSoar.Server.Config.Get().MONGODB_USERNAME,
					CodeSoar.Server.Config.Get().MONGODB_PASSWORD,
					function (err, result) {

						if (err)
							throw err;

					});

});

//Setup Docs and Changes collections for mongodb
var docsDb;
var changesDb;

db.createCollection('docs');
db.createCollection('changes');

function getCollection(name,callback) {
  db.collection(name, function(error, collection) {
    if( error ) callback(error);
    else callback(null, collection);
  });
};

getCollection('docs',function(err, collection) {
    if (err)
        throw err;
    docsDb = collection;
});
getCollection('changes',function(err, collection) {
    if (err)
        throw err;
    changesDb = collection;
});




//Used for generating 'unique' ids. 
function generateUUID(length) {
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





//setup express

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


//static page routes
app.get('/', routes.home);
app.get('/help', routes.help);
app.get('/about', routes.about);
app.get('/home', routes.home);

//document view route
app.get('/view/:document', function(req, res) {

	//look for the given document in the docs collection.
	//new hotness
	docsDb.findOne ({docID: req.params.document}, function(err, doc) {

		if (err)
			throw err;

		if (!doc) {
			routes.fourOhFour(req, res);
		} else {
			res.render('editor', { title: 'CodeSoar',
								   src: doc.sourcecode,
								   docid: req.params.document,
								   language: doc.language,
								   SOCKET_HOST: CodeSoar.Server.Config.Get().SOCKETIO_HOST });
		}
	});


    /*
    //Old and busted.
    docs.find({docID: req.params.document}, function(err,documents) {
        documents.each(function (err, doc) {
            console.log("Load doc err: "+err);
               console.log(doc);
        if(!doc) {
            routes.fourOhFour(req, res);
        }
        else {
            res.render('editor', {title: 'CodeSoar', src: doc.sourcecode, docid: req.params.document, language: doc.language});
        }

    });
    });
	*/
});


//request to create a document
app.post("/create", function(req, res) {

    //req.body.src
    //req.body.language

    var newDocID = '';
    do
    {
        newDocID = generateUUID(20);
    }while(docsDb.find({docID: newDocID}).count(function(e, cnt) { return cnt; }) > 0);



    docsDb.insert({docID: newDocID, sourcecode: req.body.src, language: req.body.language}, {safe: true}, function(err, records){});

    res.send(newDocID);

});


//404
app.use(function(req, res, next){

    //check if document exists from req.

    routes.fourOhFour(req, res);
});


//start listening for http traffic.
var server = require('http').createServer(app);
server.listen(CodeSoar.Server.Config.Get().APP_PORT, CodeSoar.Server.Config.Get().APP_IP);

//start socketio
var io = require('socket.io').listen(server);
//set to use websockets
io.configure(function(){
    io.set("transports", ["websocket"]);
});


var msgServ : CodeSoar.Server.MessageServer;

msgServ = new CodeSoar.Server.MessageServer(io);

msgServ.Setup();