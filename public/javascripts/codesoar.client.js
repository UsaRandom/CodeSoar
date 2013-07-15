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
        var CodeSoarSession = (function () {
            function CodeSoarSession(docId, languageName) {
                this.Users = Array(0);
                this.ExeClients = Array(0);
                this.EditNumber = 0;
                this.DocID = docId;
            }
            CodeSoarSession.prototype.ContainsUser = function (user) {
                return this.IndexOfUser(user) != -1;
            };

            CodeSoarSession.prototype.IndexOfUser = function (user) {
                for (var i = 0; i < this.Users.length; i++) {
                    if (this.Users[i] != null && this.Users[i].Name == user.Name) {
                        return i;
                    }
                }
                return -1;
            };

            CodeSoarSession.prototype.AddUser = function (user) {
                if (this.ContainsUser(user))
                    return;

                for (var i = 0; i < this.Users.length; i++) {
                    if (this.Users[i] == null) {
                        this.Users[i] = user;
                        return;
                    }
                }

                this.Users.length = this.Users.length + 1;
                this.Users[this.Users.length + 1] = user;
            };

            CodeSoarSession.prototype.RemoveUser = function (user) {
                var idx = this.IndexOfUser(user);

                if (idx == -1)
                    return;

                this.Users[idx] = null;
            };
            return CodeSoarSession;
        })();
        Common.CodeSoarSession = CodeSoarSession;
    })(CodeSoar.Common || (CodeSoar.Common = {}));
    var Common = CodeSoar.Common;
})(CodeSoar || (CodeSoar = {}));
var CodeSoar;
(function (CodeSoar) {
    (function (Client) {
        (function (View) {
            var Cursor = (function () {
                function Cursor() {
                    this.row = 0;
                    this.col = 0;
                    this.m_id = CodeSoar.Client.View.Cursor.id++;
                }
                Cursor.prototype.Update = function (data) {
                    if (typeof data != 'undefined') {
                        this.row = data.r;
                        this.col = data.c;
                    }

                    this.Paint();
                };

                Cursor.prototype.Paint = function () {
                    if ($("#" + this.m_id).length == 0) {
                        $("#codesoar_cursor-layer").append('<div id="' + this.m_id + '"></div>');
                    }

                    var docPos = this.Editor.getSession().documentToScreenPosition(this.row, this.col);

                    $("#" + this.m_id).css({
                        'height': '15px',
                        'top': 15 * (docPos.row) + 'px',
                        'left': 4 + (6 * docPos.column) + 'px',
                        'width': '6px',
                        'z-index': 4,
                        'position': 'absolute',
                        '-moz-box-sizing': 'border-box',
                        '-webkit-box-sizing': 'border-box',
                        'box-sizing': 'border-box',
                        'border-left': '2px solid red'
                    });
                };

                Cursor.prototype.Remove = function () {
                    $("#" + this.m_id).remove();
                };

                Cursor.id = 0;
                return Cursor;
            })();
            View.Cursor = Cursor;
        })(Client.View || (Client.View = {}));
        var View = Client.View;
    })(CodeSoar.Client || (CodeSoar.Client = {}));
    var Client = CodeSoar.Client;
})(CodeSoar || (CodeSoar = {}));
var CodeSoar;
(function (CodeSoar) {
    (function (Client) {
        (function (View) {
            var Selection = (function () {
                function Selection() {
                    this.startRow = 0;
                    this.endRow = 0;
                    this.startCol = 0;
                    this.endCol = 0;
                    this.m_id = CodeSoar.Client.View.Selection.id++;
                }
                Selection.prototype.Update = function (data) {
                    if (typeof data != 'undefined') {
                        this.m_data = data;
                        this.startRow = data.s[0].s.r;
                        this.startCol = data.s[0].s.c;
                        this.endRow = data.s[0].e.r;
                        this.endCol = data.s[0].e.c;
                    }

                    this.Paint();
                };

                Selection.prototype.Paint = function () {
                    for (var i = 0; i < this.m_data.s.length; i++) {
                    }

                    var startPos = this.Editor.getSession().documentToScreenPosition(this.startRow, this.startCol);
                    var endPos = this.Editor.getSession().documentToScreenPosition(this.endRow, this.endCol);

                    if (startPos.row != endPos.row) {
                    } else {
                        if (startPos.column == endPos.column) {
                            return;
                        }

                        if ($("#" + this.m_id + "_single").length == 0) {
                            $("#codesoar_marker-layer").append('<div id="' + this.m_id + '_single"></div>');
                        }

                        $("#" + this.m_id + '_single').css({
                            'height': '15px',
                            'top': 15 * (startPos.row) + 'px',
                            'left': 4 + (6 * Math.min(startPos.column, endPos.column)) + 'px',
                            'width': 6 * Math.abs(startPos.column - endPos.column) + 'px',
                            'z-index': 5,
                            'position': 'absolute',
                            'background': 'rgb(241, 199, 179)'
                        });
                    }
                };

                Selection.prototype.Remove = function () {
                    if ($("#" + this.m_id + '_single').length == 0) {
                        $("#" + this.m_id + '_single').remove();
                    }
                };

                Selection.id = 0;
                return Selection;
            })();
            View.Selection = Selection;
        })(Client.View || (Client.View = {}));
        var View = Client.View;
    })(CodeSoar.Client || (CodeSoar.Client = {}));
    var Client = CodeSoar.Client;
})(CodeSoar || (CodeSoar = {}));
var CodeSoar;
(function (CodeSoar) {
    (function (Common) {
        var Collection = (function () {
            function Collection() {
                this.m_objs = Array(0);
            }
            Collection.prototype.GetAllObjects = function () {
                var objs = new Array(0);

                for (var i = 0; i < this.m_objs.length; i++) {
                    if (this.m_objs[i] != null && typeof this.m_objs[i] != 'undefined') {
                        objs.length = objs.length + 1;
                        objs[objs.length - 1] = this.m_objs[i];
                    }
                }

                return objs;
            };

            Collection.prototype.Add = function (obj) {
                for (var i = 0; i < this.m_objs.length; i++) {
                    if (this.m_objs[i] == null) {
                        this.m_objs[i] = obj;

                        return;
                    }
                }

                this.m_objs.length = this.m_objs.length + 1;
                this.m_objs[this.m_objs.length - 1] = obj;
            };

            Collection.prototype.Contains = function (obj, compare) {
                for (var i = 0; i < this.m_objs.length; i++) {
                    if (compare(obj, this.m_objs[i])) {
                        return true;
                    }
                }
                return false;
            };

            Collection.prototype.Get = function (where) {
                for (var i = 0; i < this.m_objs.length; i++) {
                    if (where(this.m_objs[i])) {
                        return this.m_objs[i];
                    }
                }

                return null;
            };

            Collection.prototype.Remove = function (obj, compare) {
                for (var i = 0; i < this.m_objs.length; i++) {
                    if (this.m_objs[i] == obj) {
                        this.m_objs[i] = null;

                        return;
                    }
                }
            };
            return Collection;
        })();
        Common.Collection = Collection;
    })(CodeSoar.Common || (CodeSoar.Common = {}));
    var Common = CodeSoar.Common;
})(CodeSoar || (CodeSoar = {}));
var CodeSoar;
(function (CodeSoar) {
    (function (Client) {
        (function (View) {
            var Renderer = (function () {
                function Renderer(ec) {
                    this.userHtmlPrototype = '<li class="user" id=""><span>  userNick</span></li>';
                    this.Users = new CodeSoar.Common.Collection();
                    this.m_ec = ec;

                    $('<div class="ace_layer" id="codesoar_marker-layer"></div>').insertBefore('.ace_marker-layer:first');
                    $('<div class="ace_layer" style="z-index: 4;" id="codesoar_cursor-layer"></div>').insertAfter('.ace_cursor-layer');
                }
                Renderer.prototype.Render = function () {
                    var users = this.Users.GetAllObjects();

                    for (var i = 0; i < users.length; i++) {
                        users[i].selectionRenderer.Paint();
                        users[i].cursorRenderer.Paint();
                    }
                };

                Renderer.prototype.Init = function () {
                    $("#users > ul").append('<li class="user you" id="user_self"><span>  ' + this.m_ec.UserName + '</span></li>');
                };

                Renderer.prototype.AddUser = function (user) {
                    if (this.Users.Contains(user, CodeSoar.Common.User.Compare)) {
                        return;
                    }

                    user.selectionRenderer = new View.Selection();
                    user.cursorRenderer = new View.Cursor();
                    user.selectionRenderer.Editor = this.m_ec.Editor;
                    user.cursorRenderer.Editor = this.m_ec.Editor;

                    this.Users.Add(user);

                    $("#users > ul").append('<li class="user" id="user_' + user.uId + '"><span>  ' + user.Name + '</span></li>');
                };

                Renderer.prototype.RemoveUser = function (user) {
                    user.selectionRenderer.Remove();
                    user.cursorRenderer.Remove();

                    this.Users.Remove(user, CodeSoar.Common.User.Compare);

                    $('#user_' + user.uId).remove();
                };
                return Renderer;
            })();
            View.Renderer = Renderer;
        })(Client.View || (Client.View = {}));
        var View = Client.View;
    })(CodeSoar.Client || (CodeSoar.Client = {}));
    var Client = CodeSoar.Client;
})(CodeSoar || (CodeSoar = {}));
var CodeSoar;
(function (CodeSoar) {
    (function (Common) {
        var CircularStack = (function () {
            function CircularStack(size) {
                if (size < 2) {
                    throw "CircularStack size must be at least 2";
                }

                this.m_stack = Array(size);
                this.m_index = 0;
                this.m_count = 0;
            }
            CircularStack.prototype.Push = function (obj) {
                if (this.m_index == this.m_stack.length - 1) {
                    this.m_index = 0;
                } else {
                    this.m_index++;
                }

                this.m_stack[this.m_index] = obj;

                if (this.m_count != this.m_stack.length) {
                    this.m_count++;
                }
            };

            CircularStack.prototype.Pop = function () {
                if (this.m_count == 0) {
                    return null;
                }

                if (this.m_index == 0) {
                    this.m_count--;

                    var obj = this.m_stack[this.m_index];

                    this.m_stack[this.m_index] = null;

                    if (this.m_count == 0) {
                        return obj;
                    }

                    this.m_index = this.m_stack.length - 1;

                    return obj;
                }

                if (this.m_count == 1) {
                    this.m_count--;

                    var obj = this.m_stack[this.m_index];

                    this.m_stack[this.m_index] = null;

                    this.m_index = 0;

                    return obj;
                }

                this.m_count--;

                var obj = this.m_stack[this.m_index];

                this.m_stack[this.m_index] = null;

                this.m_index--;

                return obj;
            };

            CircularStack.prototype.Count = function () {
                return this.m_count;
            };

            CircularStack.prototype.IndexOf = function (obj, compare) {
                for (var i = 0; i < this.m_stack.length; i++) {
                    if (compare(obj, this.m_stack[i])) {
                        return i;
                    }
                }
                return -1;
            };

            CircularStack.prototype.Contains = function (obj, compare) {
                return this.IndexOf(obj, compare) != -1;
            };

            CircularStack.prototype.Grow = function (size) {
                if (size <= this.m_stack.length) {
                    return;
                }

                var newStack = Array(size);

                var obj = null;

                for (var i = 0; (obj = this.Pop()) != null; i++) {
                    newStack[i] = obj;
                }

                this.m_stack = newStack;

                if (this.m_count != 0) {
                    this.m_index = this.m_count - 1;
                } else {
                    this.m_index = 0;
                }
            };

            CircularStack.prototype.Peek = function () {
                if (typeof this.m_stack[this.m_index] == 'undefined') {
                    return null;
                }

                return this.m_stack[this.m_index];
            };

            CircularStack.prototype.ToArray = function () {
                return this.m_stack;
            };
            return CircularStack;
        })();
        Common.CircularStack = CircularStack;
    })(CodeSoar.Common || (CodeSoar.Common = {}));
    var Common = CodeSoar.Common;
})(CodeSoar || (CodeSoar = {}));
var CodeSoar;
(function (CodeSoar) {
    (function (Common) {
        (function (Messages) {
            var IncludeTextMessage = (function () {
                function IncludeTextMessage(data) {
                    this.m_shrunk = false;
                    this.m_data = data;

                    if (typeof this.m_data.a != "undefined") {
                        this.m_shrunk = true;
                    }
                }
                IncludeTextMessage.prototype.Shrink = function () {
                    if (this.m_shrunk) {
                        return;
                    }

                    this.m_data.a = 'it';
                    this.m_data.sr = this.m_data.range.start.row;
                    this.m_data.sc = this.m_data.range.start.column;
                    this.m_data.er = this.m_data.range.end.row;
                    this.m_data.ec = this.m_data.range.end.column;
                    this.m_data.t = this.m_data.text;

                    delete this.m_data.action;
                    delete this.m_data.range;
                    delete this.m_data.text;
                };

                IncludeTextMessage.prototype.Expand = function () {
                    if (!this.m_shrunk) {
                        return;
                    }

                    this.m_data.action = "insertText";
                    this.m_data.range = {
                        end: {
                            column: this.m_data.ec,
                            row: this.m_data.er
                        },
                        start: {
                            column: this.m_data.sc,
                            row: this.m_data.sr
                        }
                    };
                    this.m_data.text = this.m_data.t;

                    delete this.m_data.a;
                    delete this.m_data.sr;
                    delete this.m_data.sc;
                    delete this.m_data.er;
                    delete this.m_data.ec;
                    delete this.m_data.t;
                };

                IncludeTextMessage.prototype.ToJSON = function () {
                    return JSON.stringify(this.m_data);
                };

                IncludeTextMessage.prototype.ToObject = function () {
                    return this.m_data;
                };
                return IncludeTextMessage;
            })();
            Messages.IncludeTextMessage = IncludeTextMessage;
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
            var InsertLinesMessage = (function () {
                function InsertLinesMessage(data) {
                    this.m_shrunk = false;
                    this.m_data = data;

                    if (typeof this.m_data.a != "undefined") {
                        this.m_shrunk = true;
                    }
                }
                InsertLinesMessage.prototype.Shrink = function () {
                    if (this.m_shrunk) {
                        return;
                    }

                    this.m_data.a = 'il';
                    this.m_data.sr = this.m_data.range.start.row;
                    this.m_data.sc = this.m_data.range.start.column;
                    this.m_data.er = this.m_data.range.end.row;
                    this.m_data.ec = this.m_data.range.end.column;

                    delete this.m_data.action;
                    delete this.m_data.range;
                };

                InsertLinesMessage.prototype.Expand = function () {
                    if (!this.m_shrunk) {
                        return;
                    }

                    this.m_data.action = "insertLines";
                    this.m_data.range = {
                        end: {
                            column: this.m_data.ec,
                            row: this.m_data.er
                        },
                        start: {
                            column: this.m_data.sc,
                            row: this.m_data.sr
                        }
                    };

                    delete this.m_data.a;
                    delete this.m_data.sr;
                    delete this.m_data.sc;
                    delete this.m_data.er;
                    delete this.m_data.ec;
                };

                InsertLinesMessage.prototype.ToJSON = function () {
                    return JSON.stringify(this.m_data);
                };

                InsertLinesMessage.prototype.ToObject = function () {
                    return this.m_data;
                };
                return InsertLinesMessage;
            })();
            Messages.InsertLinesMessage = InsertLinesMessage;
        })(Common.Messages || (Common.Messages = {}));
        var Messages = Common.Messages;
    })(CodeSoar.Common || (CodeSoar.Common = {}));
    var Common = CodeSoar.Common;
})(CodeSoar || (CodeSoar = {}));
var CodeSoar;
(function (CodeSoar) {
    (function (Common) {
        (function (Messages) {
            var RemoveLinesMessage = (function () {
                function RemoveLinesMessage(data) {
                    this.m_shrunk = false;
                    this.m_data = data;

                    if (typeof this.m_data.a != "undefined") {
                        this.m_shrunk = true;
                    }
                }
                RemoveLinesMessage.prototype.Shrink = function () {
                    if (this.m_shrunk) {
                        return;
                    }

                    this.m_data.a = 'rl';
                    this.m_data.sr = this.m_data.range.start.row;
                    this.m_data.sc = this.m_data.range.start.column;
                    this.m_data.er = this.m_data.range.end.row;
                    this.m_data.ec = this.m_data.range.end.column;

                    delete this.m_data.action;
                    delete this.m_data.range;
                };

                RemoveLinesMessage.prototype.Expand = function () {
                    if (!this.m_shrunk) {
                        return;
                    }

                    this.m_data.action = "removeLines";
                    this.m_data.range = {
                        end: {
                            column: this.m_data.ec,
                            row: this.m_data.er
                        },
                        start: {
                            column: this.m_data.sc,
                            row: this.m_data.sr
                        }
                    };

                    delete this.m_data.a;
                    delete this.m_data.sr;
                    delete this.m_data.sc;
                    delete this.m_data.er;
                    delete this.m_data.ec;
                };

                RemoveLinesMessage.prototype.ToJSON = function () {
                    return JSON.stringify(this.m_data);
                };

                RemoveLinesMessage.prototype.ToObject = function () {
                    return this.m_data;
                };
                return RemoveLinesMessage;
            })();
            Messages.RemoveLinesMessage = RemoveLinesMessage;
        })(Common.Messages || (Common.Messages = {}));
        var Messages = Common.Messages;
    })(CodeSoar.Common || (CodeSoar.Common = {}));
    var Common = CodeSoar.Common;
})(CodeSoar || (CodeSoar = {}));
var CodeSoar;
(function (CodeSoar) {
    (function (Common) {
        (function (Messages) {
            var RemoveTextMessage = (function () {
                function RemoveTextMessage(data) {
                    this.m_shrunk = false;
                    this.m_data = data;

                    if (typeof this.m_data.a != "undefined") {
                        this.m_shrunk = true;
                    }
                }
                RemoveTextMessage.prototype.Shrink = function () {
                    if (this.m_shrunk) {
                        return;
                    }

                    this.m_data.a = 'rt';
                    this.m_data.sr = this.m_data.range.start.row;
                    this.m_data.sc = this.m_data.range.start.column;
                    this.m_data.er = this.m_data.range.end.row;
                    this.m_data.ec = this.m_data.range.end.column;
                    this.m_data.t = this.m_data.text;

                    delete this.m_data.action;
                    delete this.m_data.range;
                    delete this.m_data.text;
                };

                RemoveTextMessage.prototype.Expand = function () {
                    if (!this.m_shrunk) {
                        return;
                    }

                    this.m_data.action = "removeText";
                    this.m_data.range = {
                        end: {
                            column: this.m_data.ec,
                            row: this.m_data.er
                        },
                        start: {
                            column: this.m_data.sc,
                            row: this.m_data.sr
                        }
                    };
                    this.m_data.text = this.m_data.t;

                    delete this.m_data.a;
                    delete this.m_data.sr;
                    delete this.m_data.sc;
                    delete this.m_data.er;
                    delete this.m_data.ec;
                    delete this.m_data.t;
                };

                RemoveTextMessage.prototype.ToJSON = function () {
                    return JSON.stringify(this.m_data);
                };

                RemoveTextMessage.prototype.ToObject = function () {
                    return this.m_data;
                };
                return RemoveTextMessage;
            })();
            Messages.RemoveTextMessage = RemoveTextMessage;
        })(Common.Messages || (Common.Messages = {}));
        var Messages = Common.Messages;
    })(CodeSoar.Common || (CodeSoar.Common = {}));
    var Common = CodeSoar.Common;
})(CodeSoar || (CodeSoar = {}));
var CodeSoar;
(function (CodeSoar) {
    (function (Common) {
        (function (Messages) {
            var EditMessageFactory = (function () {
                function EditMessageFactory() {
                }
                EditMessageFactory.BuildEditMessage = function (data) {
                    if (typeof data == "string") {
                        data = JSON.parse(data);
                    }

                    if (typeof data.a != "undefined") {
                        if (data.a == "it") {
                            return new Messages.IncludeTextMessage(data);
                        } else if (data.a == "rt") {
                            return new Messages.RemoveTextMessage(data);
                        } else if (data.a == "rl") {
                            return new Messages.RemoveLinesMessage(data);
                        } else if (data.a == "il") {
                            return new Messages.InsertLinesMessage(data);
                        }
                    } else {
                        if (data.action == "insertText") {
                            return new Messages.IncludeTextMessage(data);
                        } else if (data.action == "removeText") {
                            return new Messages.RemoveTextMessage(data);
                        } else if (data.action == "removeLines") {
                            return new Messages.RemoveLinesMessage(data);
                        } else if (data.action == "insertLines") {
                            return new Messages.InsertLinesMessage(data);
                        }
                    }
                    throw "Unknown edit message type!";
                };
                return EditMessageFactory;
            })();
            Messages.EditMessageFactory = EditMessageFactory;
        })(Common.Messages || (Common.Messages = {}));
        var Messages = Common.Messages;
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
    (function (Client) {
        var EditorController = (function () {
            function EditorController() {
                this.m_syncMode = false;
                this.m_lastEdit = null;
            }
            EditorController.prototype.Setup = function (session, editor) {
                this.Session = session;
                this.Editor = editor;

                this.Editor.setReadOnly(true);

                this.EditorSession = editor.getSession();
                this.EditorDocument = this.EditorSession.getDocument();

                var self = this;

                this.Renderer = new CodeSoar.Client.View.Renderer(self);

                this.Socket = io.connect(SOCKET_HOST);

                this.Socket.on('join', function (data) {
                    self.Editor.setReadOnly(false);

                    self.UserID = data.uId;
                    self.UserName = data.n;

                    console.log(data.u);
                    if (typeof data.u != 'undefined') {
                        console.log('found users to add');
                        for (var i = 0; i < data.u.length; i++) {
                            var usr = new CodeSoar.Common.User();

                            usr.uId = data.u[i].uId;
                            usr.Name = data.u[i].Name;
                            if (data.u[i].s)
                                usr.Selection = data.u[i].s;
                            if (data.u[i].c)
                                usr.Cursor = data.u[i].c;

                            self.Renderer.AddUser(usr);
                        }
                    }

                    $("#editor").css("visibility", "visible");

                    self.Renderer.Init();
                    self.Renderer.Render();
                });

                this.Socket.on('user-joined', function (data) {
                    var usr = new CodeSoar.Common.User();

                    usr.uId = data.uId;
                    usr.Name = data.n;

                    self.Renderer.AddUser(usr);
                });

                this.Socket.on('user-left', function (data) {
                    var usr = new CodeSoar.Common.User();

                    usr.uId = data.uId;

                    self.Renderer.RemoveUser(usr);

                    self.Renderer.Render();
                });

                this.Socket.on('user-cursor-change', function (data) {
                    var usr = self.Renderer.Users.Get(function (a) {
                        if (typeof a == 'undefined' || a == null) {
                            return false;
                        }
                        if (a.uId == data.uId) {
                            return true;
                        }
                        return false;
                    });

                    usr.cursorRenderer.Update(data);
                });

                this.Socket.on('user-selection-change', function (data) {
                    var usr = self.Renderer.Users.Get(function (a) {
                        if (typeof a == 'undefined' || a == null) {
                            return false;
                        }
                        if (a.uId == data.uId) {
                            return true;
                        }
                        return false;
                    });

                    usr.selectionRenderer.Update(data);
                });

                this.Socket.on('user-message', function (data) {
                    var usr = self.Renderer.Users.Get(function (a) {
                        if (typeof a == 'undefined' || a == null) {
                            return false;
                        }
                        if (a.uId == data.uId) {
                            return true;
                        }
                        return false;
                    });

                    $("#chatMsgs").append('<li class="msg"><strong>' + usr.Name + ': </strong>' + data + '</li>');
                });

                this.Socket.on('user-edit', function (data) {
                    var dataClone = clone(data);

                    var msg = CodeSoar.Common.Messages.EditMessageFactory.BuildEditMessage(dataClone);

                    msg.Expand();

                    self.EditorDocument.applyDeltas([msg.ToObject()], true);

                    self.Renderer.Render();
                });

                this.EditorSession.on('change', function (data) {
                    if (data.data.ignore) {
                        return;
                    }

                    var dataClone = clone(data);

                    dataClone.ts = Date.now();

                    delete dataClone.data.ignore;

                    var msg = CodeSoar.Common.Messages.EditMessageFactory.BuildEditMessage(dataClone.data);

                    msg.Shrink();

                    self.Socket.emit('edit', msg.ToJSON());

                    self.Renderer.Render();
                });

                this.EditorSession.on('changeScrollTop', function (val) {
                    self.Renderer.Render();
                });

                this.EditorSession.on('changeScrollLeft', function (val) {
                    self.Renderer.Render();
                });

                this.EditorSession.on('changeCursor', function (data) {
                    var dataClone = clone(self.Editor.getCursorPosition());

                    var msg = new CodeSoar.Common.Messages.CursorMessage(dataClone);

                    msg.Shrink();

                    self.Socket.emit('cursor-change', msg);
                });

                this.EditorSession.selection.on('changeSelection', function (data) {
                    var msg = {};

                    var selection = self.EditorSession.selection;

                    msg.s = [];
                    if (selection.inMultiSelectMode) {
                        for (var i = 0; i < selection.ranges.length; i++) {
                            msg.s[i] = {
                                s: {
                                    c: selection.ranges[i].start.column,
                                    r: selection.ranges[i].start.row
                                },
                                e: {
                                    c: selection.ranges[i].end.column,
                                    r: selection.ranges[i].end.row
                                }
                            };
                        }
                    } else {
                        msg.s[0] = {
                            s: {
                                c: selection.anchor.column,
                                r: selection.anchor.row
                            },
                            e: {
                                c: selection.lead.column,
                                r: selection.lead.row
                            }
                        };
                    }

                    self.Socket.emit('selection-change', msg);

                    self.Renderer.Render();
                });

                this.Editor.on("focus", function () {
                });

                this.Editor.on("blur", function () {
                });

                $("#chatText").bind('keypress', function (e) {
                    if ((e.keyCode || e.which) == 13) {
                        if ($("#chatText").val() != '') {
                            self.Socket.emit('message', $("#chatText").val());
                            $("#chatMsgs").append('<li class="msg"><strong>' + self.UserName + ': </strong>' + $("#chatText").val() + '</li>');

                            $("#chatText").val('');
                        }
                    }
                });

                $("#darkBtn").click(function () {
                    if ($("#darkBtn").hasClass("active")) {
                        return;
                    } else {
                        self.Editor.setTheme("ace/theme/twilight");
                    }
                });

                $("#lightBtn").click(function () {
                    if ($("#lightBtn").hasClass("active")) {
                        return;
                    } else {
                        self.Editor.setTheme("");
                    }
                });

                var updateContainer = function () {
                    $("#chatContainer").height($(document).height() - $("#users").height() - parseInt($("#users").css("margin-top")) - $("#controls").height() - parseInt($("#controls").css("margin-top")) - $(".user").length - $("#chatText").height() - $("#chatText").height() - 4);
                    $("#chat").height($("#chatContainer").height() - $("#chatText").height());
                };

                $(window).resize(function () {
                    updateContainer();
                });

                updateContainer();

                this.Socket.emit('join', { docID: this.Session.DocID, name: $("#nickInput").val() });
            };
            return EditorController;
        })();
        Client.EditorController = EditorController;
    })(CodeSoar.Client || (CodeSoar.Client = {}));
    var Client = CodeSoar.Client;
})(CodeSoar || (CodeSoar = {}));
Anchor = ace.require('ace/anchor').Anchor;
ARange = ace.require('ace/range').Range;

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

var editorControllerInstance;

var CodeSoarClient;
(function (CodeSoarClient) {
    CodeSoarClient.Init = function (docID, language, config) {
        SOCKET_HOST = config.SOCKET_HOST;

        var editor = ace.edit("editor");
        editor.getSession().setMode("ace/mode/" + language);

        $("#displayNameModal").on('hide', function () {
            var session = new CodeSoar.Common.CodeSoarSession(docID, language);

            editorControllerInstance = new CodeSoar.Client.EditorController();
            editorControllerInstance.Setup(session, editor);
        });
        $("#displayNameModal").modal('show');
    };
})(CodeSoarClient || (CodeSoarClient = {}));
