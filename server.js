#!/bin/env node
var PORT = process.env.OPENSHIFT_NODEJS_PORT || 8000;
var IPADDRESS = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

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
        

        //tell everyone a user joined.
        socket.broadcast.to(user.getRoom()).emit('user-joined', {
            nick: nickToUse
        });

        socket.emit('join', {hasControl: user.hasControl, users: currentUsers, controller: controllingUser, realNick: nickToUse });
    });









    
    //forward change events
    socket.on('change', function(data) {
        socket.broadcast.to(user.room).emit('change', data);

    });








    //on control request
    socket.on('controlRequest', function(data) {

        var controllingClient;
        var controlIsOpen = true;

        for (var i=0; i < io.sockets.clients(socket.userObj.getRoom()).Length; i++) {
            if(io.sockets.clients(socket.userObj.getRoom())[i].userObj.getHasControl()) {
                controlIsOpen = false;
                controllingClient = io.sockets.clients(socket.userObj.getRoom())[i];
            }
        }

        if (controlIsOpen) {
            io.sockets.in(socket.userObj.getRoom()).emit('control-taken', {
                nick: socket.userObj.getNick()
            });
        } else {
            io.sockets.clients(socket.userObj.getRoom())[i].emit('control-requested', {
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

        //notify everyone a user left and whether they had control or not
       io.sockets.in(user.getRoom()).emit('user-left', {
            nick: user.getNick(),
            controlOpen: user.getHasControl()
        });

    });
});
