#!/bin/env node
var PORT = process.env.OPENSHIFT_INTERNAL_PORT || 8080;
var IPADDRESS = process.env.OPENSHIFT_INTERNAL_IP || '127.0.0.1';

var express = require('express');
var server;
var io;
var app;

// Setup a very simple express application.
app = express();
// The root path should serve the client HTML.
app.get('/', function(req, res) {
    res.sendfile(req);
});



// Our express application functions as our main listener for HTTP requests
// in this example which is why we don't just invoke listen on the app object.
server = require('http').createServer(app);
server.listen(PORT, IPADDRESS);


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

        var nickToUse = data.nick;
        var nickAddition = 1;
        var nickTaken = false;
        var canGrabControl = true;
        //generate a good nick & check to see if someone has control, very quick-to-code solution
        do
        {
            nickTaken = false;
            if (nickAddition != 1) {
                nickToUse = data.nick + nickAddition;
            }
            for (var i = 0; i < io.sockets.clients(String(data.room)).length; i++)
            { 
                var otherNick = io.sockets.clients(String(data.room))[i].userobj.getNick();
                var otherHasControl = io.sockets.clients(data.room)[i].userobj.getHasControl();
                if (nickToUse == otherNick) {
                    nickTaken = true;
                }
                if (otherHasControl) {
                    canGrabControl = false;
                }
            }

            nickAddition++;
        } while (nickTaken);
        
        user = new User(String(data.room), nickToUse);

        socket.userobj = user;
        
        user.hasControl = canGrabControl;
        socket.join(data.room);
        

        //tell everyone a user joined.
        socket.broadcast.to(user.getRoom()).emit('user-joined', {
            nick: nickToUse
        });

        socket.emit('control', {hasControl: canGrabControl, atConnection: true});
    });
    
    //forward change events
    socket.on('change', function(data) {
        console.log(data);
        socket.broadcast.to(user.room).emit('change', data);

    });

    //simple chat
    socket.on('chat', function(data) {
        socket.broadcast.to(String(user.room)).emit('msg', {
            nick: socket.userobj.nick,
            msg: data.msg
        });
    });
    
    // Set up listeners on the server side.
    socket.once('disconnect', function() {
        // Respond if the client side voluntarily disconnects, but respond
        // only once. It appears that disconnecting will fire more disconnect
        // messages, whether from the client or server. So respond once and
        // only once for each client.
    //    socket.broadcast.to(user.room).emit('user-left', {
     //       nick: user.nick
      //  });
      //  disconnectSocket();
    });
});
