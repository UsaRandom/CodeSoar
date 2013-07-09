#!/bin/env node
var PORT = process.env.OPENSHIFT_NODEJS_PORT || 8000;
var IPADDRESS = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var express = require('express');
var server;
var io;
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db;
var dbServer = new mongo.Server(/*process.env.OPENSHIFT_MONGODB_DB_HOST*/'localhost', parseInt(/*process.env.OPENSHIFT_MONGODB_DB_PORT*/27017));
var db = new Db(/*process.env.OPENSHIFT_APP_NAME*/'codesoar', dbServer, {auto_reconnect: true, w:1});
 
var app = express();
var docs = {};
var changesDb ={};


db.open(function(err, db){
      if(err){ throw err };
      db.authenticate(/*process.env.OPENSHIFT_MONGODB_DB_USERNAME*/'dev', /*process.env.OPENSHIFT_MONGODB_DB_PASSWORD*/'pass',  function(err, res){
        if(err){ throw err };
      });
    });


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
    docs = collection;
});


getCollection('changes',function(err, collection) {
    if (err)
        throw err;
    changesDb = collection;
});

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
        console.log("about to call find for js");
        docs.find({docID: req.params.document}, function(err,docs) {
                console.log("js find err :" + err);
        docs.each(function (err, doc) {
                console.log("js each err:"+err);
               console.log(doc);
        if(!doc) {
            routes.fourOhFour(req, res);
        }
        else {
            res.format({ 'application/javascript': function(){
            res.render('editorJS', {title: 'CodeSoar', docID: req.params.document, language: doc.language});
            }});
        }

    });
    });
});

//request to create a document
app.post("/create", function(req, res) {

    //req.body.src
    //req.body.language

    var newDocID = '';
    console.log("creating");
    do
    {
        newDocID = generateDocID(20);
        console.log("about to call find");
    }while(docs.find({docID: newDocID}).count(function(e, cnt) { return cnt; }) > 0);



    console.log("about to call insert");
    docs.insert({docID: newDocID, sourcecode: req.body.src, language: req.body.language}, {safe: true}, function(err, records){
    console.log("Record added as "+records[0]._id);
});
    res.send(newDocID);

});

app.get('/view/:document', function(req, res) {
    
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

});

app.use(function(req, res, next){

    //check if document exists from req.

    routes.fourOhFour(req, res);
});

// Our express application functions as our main listener for HTTP requests
// in this example which is why we don't just invoke listen on the app object.
server = require('http').createServer(app);
server.listen(/*process.env.OPENSHIFT_INTERNAL_PORT*/80  || 8080, /*process.env.OPENSHIFT_INTERNAL_IP*/'127.0.0.1');


// socket.io augments our existing HTTP server instance.
io = require('socket.io').listen(server);
io.configure(function(){
    io.set("transports", ["websocket"]);
});
//entries typescript for annoyingly confusing javascript syntax
var User = (function () {
    function User(roomToJoin, nickToUse) {
        this.room = roomToJoin;
        this.hasControl = false;
        this.nick = nickToUse;
        this.controlRequested = false;
    }
    User.prototype.getNick = function () {
        return this.nick;
    };
    User.prototype.getRoom = function () {
        return this.room;
    };
    User.prototype.getHasControl = function () {
        return this.hasControl;
    };
    return User;
})();
io.sockets.on('connection', function (socket) {
    
    var user;
    //join a room
    socket.on('join', function(data) {

        if (data.nick == '') {
            data.nick = "Anonymous";
        }
        var nickToUse = data.nick;
        var nickAddition = 1;
        var nickTaken = false;
        var canGrabControl = true;
        var currentUsers = [];
        var controllingUser = "";

        nickToUse = nickToUse.substring(0, 20);
        //generate a good nick & check to see if someone has control, very quick-to-code solution
        do
        {
            nickTaken = false;

            for (var i = 0; i < io.sockets.clients(String(data.room)).length; i++)
            { 

                currentUsers[i] = io.sockets.clients(data.room)[i].userObj.getNick();
                var otherNick = io.sockets.clients(String(data.room))[i].userObj.getNick();
                var otherHasControl = io.sockets.clients(data.room)[i].userObj.getHasControl();
                if (nickToUse == otherNick) {
                    nickTaken = true;
                }
                if (otherHasControl) {
                    canGrabControl = false;
                    controllingUser = io.sockets.clients(data.room)[i].userObj.getNick();
                }
            }

            if(nickTaken) {
                nickToUse = data.nick + nickAddition;
            }

            nickAddition++;
        } while (nickTaken);
        
        user = new User(String(data.room), nickToUse);

        socket.userObj = user;
        
        if (io.sockets.clients(data.room).length == 0) {
            user.hasControl = true;
            controllingUser = user.getNick();
        }
        socket.join(data.room);
        console.log("about to call find!");
        changesDb.find({docID: data.room}, function(err,changesMade) {
            console.log("first: " +err);
            changesMade.each(function (err2, change) {
                    if(change)
                         {
                    socket.emit('update', change.change);
                    }
            });

        //tell everyone a user joined.
        socket.broadcast.to(user.getRoom()).emit('user-joined', {
            nick: nickToUse
        });

      
             socket.emit('join', {hasControl: user.hasControl, users: currentUsers, controller: controllingUser, realNick: nickToUse});
        });

    });









    
    //forward change events
    socket.on('change', function(data) {
        socket.broadcast.to(user.room).emit('change', data);

        changesDb.insert({docID: user.room, change: data}, {w:0});

    });




    socket.on('give-control', function(data) {
        
        var clientToGive = null;

        for (var i=0; i < io.sockets.clients(socket.userObj.getRoom()).length; i++) {

            if(io.sockets.clients(socket.userObj.getRoom())[i].userObj.getNick() == data.nick) {
                clientToGive = io.sockets.clients(socket.userObj.getRoom())[i];
            }

        }

        if (clientToGive) {

            for (var i=0; i < io.sockets.clients(socket.userObj.getRoom()).length; i++) {
                io.sockets.clients(socket.userObj.getRoom())[i].userObj.hasControl = false;
                io.sockets.clients(socket.userObj.getRoom())[i].userObj.controlRequested = false
            }

            clientToGive.userObj.hasControl = true;
            io.sockets.in(socket.userObj.getRoom()).emit('control-taken', {
                nick: clientToGive.userObj.getNick()
            });
        }

    });




    //on control request
    socket.on('control-request', function() {

        if (socket.userObj.controlRequested) {
            return;
        }


        var controllingClient;
        var controlIsOpen = true;

        for (var i=0; i < io.sockets.clients(socket.userObj.getRoom()).length; i++) {
            if(io.sockets.clients(socket.userObj.getRoom())[i].userObj.getHasControl()) {
                controlIsOpen = false;
                controllingClient = io.sockets.clients(socket.userObj.getRoom())[i];
            }
        }

        if (controlIsOpen) {

            for (var i=0; i < io.sockets.clients(socket.userObj.getRoom()).length; i++) {
                io.sockets.clients(socket.userObj.getRoom())[i].userObj.hasControl = false;
                io.sockets.clients(socket.userObj.getRoom())[i].userObj.controlRequested = false
            }
            socket.userObj.hasControl = true;
            io.sockets.in(socket.userObj.getRoom()).emit('control-taken', {
                nick: socket.userObj.getNick()
            });

        } else {

            socket.userObj.controlRequested = true;
            controllingClient.emit('control-requested', {
                nick: socket.userObj.getNick()
            });
        }

    });












    //simple chat
    socket.on('chat', function(data) {
        io.sockets.in(String(socket.userObj.getRoom())).emit('msg', {
            nick: socket.userObj.getNick(),
            msg: data
        });
    });










    
    // Set up listeners on the server side.
    socket.once('disconnect', function() {

        try
        {
            if(socket.userObj.getHasControl()) {
                for (var i=0; i < io.sockets.clients(socket.userObj.getRoom()).length; i++) {
                    io.sockets.clients(socket.userObj.getRoom())[i].userObj.controlRequested = false;
                }
            }
            //notify everyone a user left and whether they had control or not
            io.sockets.in(socket.userObj.getRoom()).emit('user-left', {
                nick: socket.userObj.getNick(),
                controlOpen: socket.userObj.getHasControl()
            });
        }
        catch (err) {
            console.log(err);
        }
    });
});
