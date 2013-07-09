var CodeSoar;
(function (CodeSoar) {
    (function (Common) {
        var User = (function () {
            function User() {
                this.Name = "Anonymous";
                this.SelectionData = null;
                this.CursorData = null;
            }
            return User;
        })();
        Common.User = User;
    })(CodeSoar.Common || (CodeSoar.Common = {}));
    var Common = CodeSoar.Common;
})(CodeSoar || (CodeSoar = {}));
var CodeSoar;
(function (CodeSoar) {
    (function (Common) {
        (function (Languages) {
            var HtmlLanguageData = (function () {
                function HtmlLanguageData() {
                    this.HasExeClient = true;
                    this.AutoExeCapable = true;
                }
                return HtmlLanguageData;
            })();
            Languages.HtmlLanguageData = HtmlLanguageData;
        })(Common.Languages || (Common.Languages = {}));
        var Languages = Common.Languages;
    })(CodeSoar.Common || (CodeSoar.Common = {}));
    var Common = CodeSoar.Common;
})(CodeSoar || (CodeSoar = {}));
var CodeSoar;
(function (CodeSoar) {
    (function (Common) {
        (function (Languages) {
            var DefaultLanguageData = (function () {
                function DefaultLanguageData() {
                    this.HasExeClient = false;
                    this.AutoExeCapable = false;
                }
                return DefaultLanguageData;
            })();
            Languages.DefaultLanguageData = DefaultLanguageData;
        })(Common.Languages || (Common.Languages = {}));
        var Languages = Common.Languages;
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
                this.LanguageName = languageName;

                switch (languageName.toLowerCase()) {
                    case 'html':
                        this.LanguageData = new CodeSoar.Common.Languages.HtmlLanguageData();
                        break;

                    default:
                        this.LanguageData = new CodeSoar.Common.Languages.DefaultLanguageData();
                        break;
                }
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
                }
                Cursor.prototype.Update = function (data) {
                };

                Cursor.prototype.Remove = function () {
                };
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
                }
                Selection.prototype.Update = function (data) {
                };

                Selection.prototype.Remove = function () {
                };
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
    (function (Client) {
        (function (View) {
            var ActiveLine = (function () {
                function ActiveLine() {
                }
                ActiveLine.prototype.Update = function (data) {
                };

                ActiveLine.prototype.Remove = function () {
                };
                return ActiveLine;
            })();
            View.ActiveLine = ActiveLine;
        })(Client.View || (Client.View = {}));
        var View = Client.View;
    })(CodeSoar.Client || (CodeSoar.Client = {}));
    var Client = CodeSoar.Client;
})(CodeSoar || (CodeSoar = {}));
var CodeSoar;
(function (CodeSoar) {
    (function (Client) {
        (function (View) {
            var ViewCollection = (function () {
                function ViewCollection() {
                    this.m_views = Array(0);
                }
                ViewCollection.prototype.GetViewsByUser = function (user) {
                    var views = new Array(0);

                    for (var i = 0; i < this.m_views.length; i++) {
                        if (this.m_views[i] != null && this.m_views[i].User.Name == user.Name) {
                            views.length = views.length + 1;
                            views[views.length] = this.m_views[i];
                        }
                    }

                    return views;
                };

                ViewCollection.prototype.AddView = function (view) {
                    for (var i = 0; i < this.m_views.length; i++) {
                        if (this.m_views[i] == null) {
                            this.m_views[i] = view;

                            return;
                        }
                    }

                    this.m_views.length = this.m_views.length + 1;
                    this.m_views[this.m_views.length] = view;
                };

                ViewCollection.prototype.RemoveView = function (view) {
                    for (var i = 0; i < this.m_views.length; i++) {
                        if (this.m_views[i] == view) {
                            this.m_views[i] = null;

                            return;
                        }
                    }
                };
                return ViewCollection;
            })();
            View.ViewCollection = ViewCollection;
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

                    this.m_data.action = "includeText";
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
                        if (data.action == "includeText") {
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

                console.log(SOCKET_HOST);
                this.m_socket = io.connect(SOCKET_HOST);

                this.m_socket.on('join', this.OnJoin);
                this.m_socket.on('user-joined', this.OnSocketJoined);
                this.m_socket.on('user-left', this.OnSocketLeft);
                this.m_socket.on('user-cursor-change', this.OnSocketCursorChange);
                this.m_socket.on('user-selection-change', this.OnSocketSelectionChange);
                this.m_socket.on('user-message', this.OnSocketMessage);
                this.m_socket.on('user-edit', this.OnSocketEdit);

                this.EditorSession.on('change', this.OnEdit);
                this.EditorSession.on('changeScrollTop', this.OnVerticalScroll);
                this.EditorSession.on('changeScrollLeft', this.OnHorizontalScroll);
                this.EditorSession.on('changeCursor', this.OnCursorChange);
                this.EditorSession.on('changeSelection', this.OnSelectionChange);

                document.addEventListener("EditorRedoEvent", this.OnRedo, false);
                document.addEventListener("EditorUndoEvent", this.OnUndo, false);

                this.m_socket.emit('join', { docID: this.Session.DocID, name: $("#nickInput").val() });

                var updateContainer = function () {
                    $("#chatContainer").height($(document).height() - $("#users").height() - parseInt($("#users").css("margin-top")) - $("#controls").height() - parseInt($("#controls").css("margin-top")) - $(".user").length - $("#chatText").height() - $("#chatText").height() - 4);
                    $("#chat").height($("#chatContainer").height() - $("#chatText").height());
                };

                $(window).resize(function () {
                    updateContainer();
                });

                updateContainer();
            };

            EditorController.prototype.OnJoin = function (data) {
                this.Editor.setReadonly(false);
            };

            EditorController.prototype.OnSocketJoined = function (data) {
            };

            EditorController.prototype.OnSocketLeft = function (data) {
            };

            EditorController.prototype.OnSocketCursorChange = function (data) {
            };

            EditorController.prototype.OnSocketSelectionChange = function (data) {
            };

            EditorController.prototype.OnSocketMessage = function (data) {
            };

            EditorController.prototype.OnSocketLanguageChange = function (data) {
            };

            EditorController.prototype.OnSocketEdit = function (data) {
                var msg = CodeSoar.Common.Messages.EditMessageFactory.BuildEditMessage(data);

                this.EditorDocument.applyDeltas([data.delta], true);
            };

            EditorController.prototype.OnEdit = function (data) {
                if (data.data.ignore) {
                    return;
                }

                delete data.data.ignore;

                var msg = CodeSoar.Common.Messages.EditMessageFactory.BuildEditMessage(data.data);

                msg.Shrink();

                this.m_socket.emit('edit', msg.ToJSON());
            };

            EditorController.prototype.OnRedo = function (data) {
                this.OnEdit(data);
            };

            EditorController.prototype.OnUndo = function (data) {
                this.OnEdit(data);
            };

            EditorController.prototype.OnVerticalScroll = function (scrollTop) {
            };

            EditorController.prototype.OnHorizontalScroll = function (scrollLeft) {
            };

            EditorController.prototype.OnCursorChange = function () {
                var cursorPos = this.EditorSession.getCursor();
            };

            EditorController.prototype.OnSelectionChange = function () {
                var selection = this.EditorSession.selection;

                if (selection.inMultiSelectMode) {
                    return;
                }

                var startPos = { column: selection.anchor.column, row: selection.anchor.row };
                var endPos = { column: selection.lead.column, row: selection.lead.row };
            };
            return EditorController;
        })();
        Client.EditorController = EditorController;
    })(CodeSoar.Client || (CodeSoar.Client = {}));
    var Client = CodeSoar.Client;
})(CodeSoar || (CodeSoar = {}));
Anchor = ace.require('ace/anchor').Anchor;
ARange = ace.require('ace/range').Range;

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
