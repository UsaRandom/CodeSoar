var CodeSoar;
(function (CodeSoar) {
    (function (Server) {
        var Config = (function () {
            function Config(socketHost, mongodbUser, mongodbPass, mongodbHost, mongodbPort, mongodbName, appPort, appIP, nodePort, nodeIP) {
                this.SOCKETIO_HOST = socketHost;
                this.MONGODB_USERNAME = mongodbUser;
                this.MONGODB_PASSWORD = mongodbPass;
                this.MONGODB_HOST = mongodbHost;
                this.MONGODB_PORT = mongodbPort;
                this.MONGODB_DB_NAME = mongodbName;
                this.APP_PORT = appPort;
                this.APP_IP = appIP;
                this.NODEJS_PORT = nodePort;
                this.NODEJS_IP = nodeIP;
            }
            Config.Get = function () {
                return CodeSoar.Server.Config._PROD;
            };

            Config._DEV = new Config("http://localhost", "dev", "pass", "localhost", 27017, "codesoar", 80, '127.0.0.1', 8000, '127.0.0.1');

            Config._PROD = new Config("codesoar-nodejshost.rhcloud.com:8000", process.env.OPENSHIFT_MONGODB_DB_USERNAME || "", process.env.OPENSHIFT_MONGODB_DB_PASSWORD || "", process.env.OPENSHIFT_MONGODB_DB_HOST || "", parseInt(process.env.OPENSHIFT_MONGODB_DB_PORT) || 0, process.env.OPENSHIFT_APP_NAME || "", parseInt(process.env.OPENSHIFT_INTERNAL_PORT) || 8080, process.env.OPENSHIFT_INTERNAL_IP || "", parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 8000, process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
            return Config;
        })();
        Server.Config = Config;
    })(CodeSoar.Server || (CodeSoar.Server = {}));
    var Server = CodeSoar.Server;
})(CodeSoar || (CodeSoar = {}));
var CodeSoar;
(function (CodeSoar) {
    (function (Common) {
        var User = (function () {
            function User() {
                this.uId = 0;
                this.Name = "Anonymous";
                this.Selection = null;
                this.Cursor = null;
            }
            User.Compare = function (a, b) {
                if (typeof a == 'undefined' || typeof b == 'undefined' || a == null || b == null) {
                    return false;
                }

                return a.uId == b.uId;
            };
            return User;
        })();
        Common.User = User;
    })(CodeSoar.Common || (CodeSoar.Common = {}));
    var Common = CodeSoar.Common;
})(CodeSoar || (CodeSoar = {}));
var CodeSoar;
(function (CodeSoar) {
    (function (Common) {
        (function (Messages) {
            var JoinRequestMessage = (function () {
                function JoinRequestMessage(data) {
                    this.m_shrunk = false;
                    this.m_data = data;

                    if (typeof this.m_data.n != "undefined") {
                        this.m_shrunk = true;
                    }
                }
                JoinRequestMessage.prototype.Shrink = function () {
                    if (this.m_shrunk) {
                        return;
                    }

                    this.m_data.n = this.m_data.Name;
                    this.m_data.d = this.m_data.DocID;

                    delete this.m_data.Name;
                    delete this.m_data.DocID;

                    this.m_shrunk = true;
                };

                JoinRequestMessage.prototype.Expand = function () {
                    if (!this.m_shrunk) {
                        return;
                    }

                    this.m_data.Name = this.m_data.n;
                    this.m_data.DocID = this.m_data.d;

                    delete this.m_data.n;
                    delete this.m_data.d;

                    this.m_shrunk = false;
                };

                JoinRequestMessage.prototype.ToJSON = function () {
                    return JSON.stringify(this.m_data);
                };

                JoinRequestMessage.prototype.ToObject = function () {
                    return this.m_data;
                };
                return JoinRequestMessage;
            })();
            Messages.JoinRequestMessage = JoinRequestMessage;
        })(Common.Messages || (Common.Messages = {}));
        var Messages = Common.Messages;
    })(CodeSoar.Common || (CodeSoar.Common = {}));
    var Common = CodeSoar.Common;
})(CodeSoar || (CodeSoar = {}));
var CodeSoar;
(function (CodeSoar) {
    (function (Common) {
        var Util = (function () {
            function Util() {
            }
            Util.GetTimestamp = function () {
                var d = new Date();
                return d.getTime() + (d.getTimezoneOffset() * 60000);
            };

            Util.MixColors = function (firstColor, secondColor) {
                var result = 0;

                result = Math.floor(0.5 * ((firstColor & 0x00FF0000) >>> 16) + 0.5 * ((secondColor & 0x00FF0000) >>> 16)) << 16;

                result += Math.floor(0.5 * ((firstColor & 0x0000FF00) >>> 8) + 0.5 * ((secondColor & 0x0000FF00) >>> 8)) << 8;

                result += Math.floor(0.5 * (firstColor & 0x000000FF) + 0.5 * (secondColor & 0x000000FF));

                return result;
            };
            return Util;
        })();
        Common.Util = Util;
    })(CodeSoar.Common || (CodeSoar.Common = {}));
    var Common = CodeSoar.Common;
})(CodeSoar || (CodeSoar = {}));
var CodeSoar;
(function (CodeSoar) {
    (function (Common) {
        (function (Messages) {
            var CursorMessage = (function () {
                function CursorMessage(data) {
                    this.m_shrunk = false;
                    this.m_data = data;

                    if (typeof this.m_data.r != "undefined") {
                        this.m_shrunk = true;
                    }
                }
                CursorMessage.prototype.Shrink = function () {
                    if (this.m_shrunk) {
                        return;
                    }

                    this.m_data.r = this.m_data.row;
                    this.m_data.c = this.m_data.column;

                    delete this.m_data.row;
                    delete this.m_data.column;
                };

                CursorMessage.prototype.Expand = function () {
                    if (!this.m_shrunk) {
                        return;
                    }

                    this.m_data.row = this.m_data.r;
                    this.m_data.column = this.m_data.c;

                    delete this.m_data.r;
                    delete this.m_data.c;
                };

                CursorMessage.prototype.ToJSON = function () {
                    return JSON.stringify(this.m_data);
                };

                CursorMessage.prototype.ToObject = function () {
                    return this.m_data;
                };
                return CursorMessage;
            })();
            Messages.CursorMessage = CursorMessage;
        })(Common.Messages || (Common.Messages = {}));
        var Messages = Common.Messages;
    })(CodeSoar.Common || (CodeSoar.Common = {}));
    var Common = CodeSoar.Common;
})(CodeSoar || (CodeSoar = {}));
var CodeSoar;
(function (CodeSoar) {
    (function (Server) {
        var MessageRoom = (function () {
            function MessageRoom(docID, onEmpty) {
                this.m_id = 0;
                this.DocID = docID;
                this.m_onEmpty = onEmpty;
            }
            MessageRoom.prototype.OnJoin = function (socket, joinMsg) {
                var self = this;

                socket.User = new CodeSoar.Common.User();
                socket.uId = this.m_id++;

                var nameToUse = joinMsg.ToObject().name;

                if (nameToUse == '') {
                    nameToUse = 'Anonymous';
                }

                var nameAddition = 0;
                var nameTaken = false;
                var otherUsers = Array(0);
                var otherUserCnt = 0;

                if (io.sockets.clients(this.DocID).length != 0) {
                    var socketClients = io.sockets.clients(this.DocID);

                    for (var i = 0; i < socketClients.length; i++) {
                        if (socketClients[i].uId != socket.uId) {
                            if (socketClients[i].User.Name.toLowerCase() == nameToUse.toLowerCase()) {
                                nameTaken = true;
                            }
                            otherUsers.length = otherUsers.length + 1;
                            otherUsers[otherUserCnt++] = { uId: socketClients[i].uId, n: socketClients[i].User.Name };
                        }
                    }

                    while (nameTaken) {
                        nameTaken = false;
                        nameAddition++;
                        var nameTemp = nameToUse + nameAddition;
                        for (var i = 0; i < socketClients.length; i++) {
                            if (socketClients[i].uId != socket.uId && socketClients[i].User.Name.toLowerCase() == nameTemp.toLowerCase()) {
                                nameTaken = true;
                            }
                        }
                    }
                }

                socket.User.Name = nameAddition == 0 ? nameToUse : nameToUse + nameAddition;

                socket.join(self.DocID);

                socket.on('cursor-change', function (data) {
                    var dataClone = clone(data);

                    var msg = new CodeSoar.Common.Messages.CursorMessage(dataClone);

                    msg.Expand();

                    data.uId = socket.uId;

                    socket.User.Cursor = msg.ToObject();

                    socket.broadcast.to(self.DocID).emit('user-cursor-change', data);
                });

                socket.on('selection-change', function (data) {
                    data.uId = socket.uId;
                    socket.broadcast.to(self.DocID).emit('user-selection-change', data);
                });

                socket.on('message', function (data) {
                    data.uId = socket.uId;
                    socket.broadcast.to(self.DocID).emit('user-message', data);
                });

                socket.on('edit', function (data) {
                    data.uId = socket.uId;
                    socket.broadcast.to(self.DocID).emit('user-edit', data);
                });

                socket.once('disconnect', function () {
                    if (self.GetUserCount() == 0) {
                        self.m_onEmpty(self);
                    } else {
                        io.sockets.in(self.DocID).emit('user-left', {
                            uId: socket.uId
                        });
                    }
                });

                socket.emit('join', { uId: socket.uId, n: socket.User.Name, u: otherUsers });

                socket.broadcast.to(this.DocID).emit("user-joined", { uId: socket.uId, n: socket.User.Name });
            };

            MessageRoom.prototype.GetUsers = function () {
                var users = new Array(0);
                var socketClients = io.sockets.clients(this.DocID);

                for (var i = 0; i < socketClients.length; i++) {
                    if (typeof socketClients[i].User != 'undefined' && socketClients[i].User != null) {
                        users.push(socketClients[i].User);
                    } else {
                        console.log("Empty User Object");
                    }
                }
                return users;
            };

            MessageRoom.prototype.GetUserCount = function () {
                return io.sockets.clients(this.DocID).length;
            };
            return MessageRoom;
        })();
        Server.MessageRoom = MessageRoom;
    })(CodeSoar.Server || (CodeSoar.Server = {}));
    var Server = CodeSoar.Server;
})(CodeSoar || (CodeSoar = {}));
var CodeSoar;
(function (CodeSoar) {
    (function (Server) {
        var MessageServer = (function () {
            function MessageServer(io) {
                this.m_io = io;
                this.m_rooms = new Array(100);
            }
            MessageServer.prototype.Setup = function () {
                var self = this;

                this.m_io.sockets.on('connection', function (socket) {
                    socket.on('join', function (data) {
                        var joinMsg = new CodeSoar.Common.Messages.JoinRequestMessage(data);
                        var room;

                        joinMsg.Expand();

                        if (joinMsg.ToObject().DocID in self.m_rooms) {
                            room = self.m_rooms[joinMsg.ToObject().DocID];

                            if (room != undefined && room != null) {
                                room.OnJoin(socket, joinMsg);
                                return;
                            }
                        }

                        room = new CodeSoar.Server.MessageRoom(joinMsg.ToObject().DocID, self.OnRoomEmpty);

                        self.m_rooms[joinMsg.ToObject().DocID] = room;

                        room.OnJoin(socket, joinMsg);
                    });
                });
            };

            MessageServer.prototype.OnRoomEmpty = function (room) {
                delete this.m_rooms[room.DocID];
            };
            return MessageServer;
        })();
        Server.MessageServer = MessageServer;
    })(CodeSoar.Server || (CodeSoar.Server = {}));
    var Server = CodeSoar.Server;
})(CodeSoar || (CodeSoar = {}));
clone = function (obj) {
    if (null == obj || "object" != typeof obj)
        return obj;

    var copy;

    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr))
                copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
};

var express = require('express'), routes = require('./routes'), http = require('http'), path = require('path'), mongo = require('mongodb');

var dbServer = new mongo.Server(CodeSoar.Server.Config.Get().MONGODB_HOST, CodeSoar.Server.Config.Get().MONGODB_PORT);

var db = new mongo.Db(CodeSoar.Server.Config.Get().MONGODB_DB_NAME, dbServer, { auto_reconnect: true, w: 1 });

db.open(function (err, db) {
    if (err)
        throw err;

    db.authenticate(CodeSoar.Server.Config.Get().MONGODB_USERNAME, CodeSoar.Server.Config.Get().MONGODB_PASSWORD, function (err, result) {
        if (err)
            throw err;
    });
});

var docsDb;
var changesDb;

db.createCollection('docs');
db.createCollection('changes');

function getCollection(name, callback) {
    db.collection(name, function (error, collection) {
        if (error)
            callback(error); else
            callback(null, collection);
    });
}
;

getCollection('docs', function (err, collection) {
    if (err)
        throw err;
    docsDb = collection;
});
getCollection('changes', function (err, collection) {
    if (err)
        throw err;
    changesDb = collection;
});

function generateUUID(length) {
    var chars = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9'
    ];
    var uuid = '';
    for (var i = 0; i < length; i++) {
        uuid += chars[Math.floor((Math.random() * chars.length))];
    }
    return uuid;
}

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.home);
app.get('/help', routes.help);
app.get('/about', routes.about);
app.get('/home', routes.home);

app.get('/view/:document', function (req, res) {
    docsDb.findOne({ docID: req.params.document }, function (err, doc) {
        if (err)
            throw err;

        if (!doc) {
            routes.fourOhFour(req, res);
        } else {
            res.render('editor', {
                title: 'CodeSoar',
                src: doc.sourcecode,
                docid: req.params.document,
                language: doc.language,
                SOCKET_HOST: CodeSoar.Server.Config.Get().SOCKETIO_HOST
            });
        }
    });
});

app.post("/create", function (req, res) {
    var newDocID = '';
    do {
        newDocID = generateUUID(20);
    } while(docsDb.find({ docID: newDocID }).count(function (e, cnt) {
        return cnt;
    }) > 0);

    docsDb.insert({ docID: newDocID, sourcecode: req.body.src, language: req.body.language }, { safe: true }, function (err, records) {
    });

    res.send(newDocID);
});

app.use(function (req, res, next) {
    routes.fourOhFour(req, res);
});

var server = require('http').createServer(app);
server.listen(CodeSoar.Server.Config.Get().APP_PORT, CodeSoar.Server.Config.Get().APP_IP);

var io = require('socket.io').listen(server);

io.configure(function () {
    io.set("transports", ["websocket"]);
});

var msgServ;

msgServ = new CodeSoar.Server.MessageServer(io);

msgServ.Setup();
