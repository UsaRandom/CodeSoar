/*

EditorController
 .-codeSoarSession : CodeSoarSession
 .-exeClient : ExeClient
 .-editor : AceEditor
 .-onSocketEdit(evt)
 .-onSocketMessage(evt)
 .-OnSocketEditorFocusChange(evt)
 .-onSocketCursorChange(evt)
 .-onSocketSelectionChange(evt)
 .-onSocketActiveLineChange(evt)
 .-OnSocketJoined(evt)
 .-OnSocketLeft(evt)
 .-onSocketScroll(evt)
 -sendEdit()
 -sendMessage()
 -sendScrollChange()
 -sendSelectionChange()
 -sendActiveLineChange()
 -sendEditorFocusLost()
 -sendCursorChange()
 -sendExeRequest()
 -setAutoExe(data)
 .-user : User //The user of this session

*/

/// <reference path="./view/Cursor.ts"/>
/// <reference path="./view/Selection.ts"/>
/// <reference path="./view/Renderer.ts"/>
/// <reference path="../common/User.ts"/>
/// <reference path="../common/IExeClient.ts"/>
/// <reference path="../common/CodeSoarSession.ts"/>
/// <reference path="../common/CircularStack.ts"/>
/// <reference path="../common/messages/EditMessageFactory.ts"/>
/// <reference path="../common/messages/CursorMessage.ts"/>
/// <reference path="../common/messages/IMessage.ts"/>
/// <reference path="../common/Util.ts"/>

module CodeSoar.Client {


export class EditorController {


	public Setup (session : CodeSoar.Common.CodeSoarSession,
				  editor : any) {

		this.Session = session;
		this.Editor = editor;


		//set readonly till we are connected.
		this.Editor.setReadOnly(true);

		this.EditorSession = editor.getSession();
		this.EditorDocument = this.EditorSession.getDocument();



		//reference to this EditorController
		var self = this;

		//create renderer.
		this.Renderer = new CodeSoar.Client.View.Renderer(self);


		//connect to websocket
		this.Socket = io.connect(SOCKET_HOST);

		//setup socket events.
		this.Socket.on('join', function(data) {

			self.Editor.setReadOnly(false);

			//data { uId: #, n: "name"}
			self.UserID = data.uId;
			self.UserName = data.n;

			console.log(data.u);
			if (typeof data.u != 'undefined') {
				console.log('found users to add');
				for(var i = 0; i < data.u.length; i++) {
					var usr : CodeSoar.Common.User = new CodeSoar.Common.User();

					usr.uId = data.u[i].uId;
					usr.Name = data.u[i].Name;
					if (data.u[i].s)
						usr.Selection = data.u[i].s;
					if (data.u[i].c)
						usr.Cursor = data.u[i].c;

					self.Renderer.AddUser(usr);

				}
			}

		    //set editor to visible
		    $("#editor").css("visibility", "visible");

		    self.Renderer.Init();
			self.Renderer.Render();

		});
		

		this.Socket.on('user-joined', function(data) {


			//add user to user list
			//uId: socket.uId, n: socket.User.Name

			var usr : CodeSoar.Common.User = new CodeSoar.Common.User();

			usr.uId = data.uId;
			usr.Name = data.n;

			self.Renderer.AddUser(usr);

			//self.Renderer.Render();
		});


		this.Socket.on('user-left', function(data) {

			//remove user from user list
			//
			//remove all user-related info, except messages and current edits.

			var usr : CodeSoar.Common.User = new CodeSoar.Common.User();

			usr.uId = data.uId;

			self.Renderer.RemoveUser(usr);

			self.Renderer.Render();
		});


		this.Socket.on('user-cursor-change', function(data) {

			//update where the given users cursor is located.
			var usr : CodeSoar.Common.User = self.Renderer.Users.Get(function(a : CodeSoar.Common.User) {
				if (typeof a == 'undefined' || a == null) {
					return false;
				}
				if (a.uId == data.uId) {
					return true;
				}
				return false;
			});

			usr.cursorRenderer.Update(data);

			//self.Renderer.Render();
		});
		

		//Selection change
		this.Socket.on('user-selection-change', function(data) {
			
			//Update the given users selection
			//update where the given users cursor is located.
			var usr : CodeSoar.Common.User = self.Renderer.Users.Get(function(a : CodeSoar.Common.User) {
				if (typeof a == 'undefined' || a == null) {
					return false;
				}
				if (a.uId == data.uId) {
					return true;
				}
				return false;
			});

			usr.selectionRenderer.Update(data);
			//self.Renderer.Render();
		});



		this.Socket.on('user-message', function(data) {
			
			//fetch actual user's name	
			var usr : CodeSoar.Common.User = self.Renderer.Users.Get(function(a : CodeSoar.Common.User) {
				if (typeof a == 'undefined' || a == null) {
					return false;
				}
				if (a.uId == data.uId) {
					return true;
				}
				return false;
			});

			$("#chatMsgs").append('<li class="msg"><strong>'+usr.Name+': </strong>'+data+'</li>');

		});


		//On other user's edit.
		this.Socket.on('user-edit', function(data) {

			//clone the data object.
			var dataClone = clone(data);

			//build the edit message from provided data.
			var msg : CodeSoar.Common.Messages.IMessage = CodeSoar.Common.Messages.EditMessageFactory.BuildEditMessage(dataClone);

			//expand the message so it can be used with the editor
			msg.Expand();

			//TODO: Sync stuff.

			//apply the change.
			self.EditorDocument.applyDeltas([msg.ToObject()], true);


			self.Renderer.Render();

		});


		//Not worrying about this just now...
		//this.Socket.on('user-language-change', this.OnSocketLanguageChange);


		//On edit
		this.EditorSession.on('change', function(data) {

			//do we ignore this?
			if (data.data.ignore) {
				return;
			}
			
			//clone data object
			var dataClone = clone(data);

			//add timestamp
			dataClone.ts = Date.now();

			//remove ignore attribute
			delete dataClone.data.ignore;

			//create message to send off to server.
			var msg : CodeSoar.Common.Messages.IMessage = CodeSoar.Common.Messages.EditMessageFactory.BuildEditMessage(dataClone.data);

			//srink the message
			msg.Shrink();

			//send the edit to the other users.
			self.Socket.emit('edit', msg.ToJSON());


			self.Renderer.Render();

		});

		this.EditorSession.on('changeScrollTop', function(val) {

			//val = editorSession.$scrollTop.

			//Renderer selections/cursors/etc.

			self.Renderer.Render();

		});

		this.EditorSession.on('changeScrollLeft', function(val) {

			//val = editorSession.$scrollLeft.

			//Renderer selections/cursors/etc.

			self.Renderer.Render();
		});
		
		this.EditorSession.selection.on('changeCursor', function(data) {
		

			//clone data object
			var dataClone = clone(self.Editor.getCursorPosition());

			//build the cursor message from provided data.
			var msg : CodeSoar.Common.Messages.IMessage = new CodeSoar.Common.Messages.CursorMessage(dataClone);

			//shrink
			msg.Shrink();

			//send off cursor change message
			self.Socket.emit('cursor-change', msg);
		});

		this.EditorSession.selection.on('changeSelection', function(data) {

			var msg : any = {};

			var selection : any = self.EditorSession.selection;

			msg.s = [];
			if (selection.inMultiSelectMode) {
				for (var i = 0; i < selection.ranges.length; i++) {
					msg.s[i] = {
						//start
						s : {
							//column
							c : selection.ranges[i].start.column,
							//row
							r : selection.ranges[i].start.row
						},
						//end
						e :{
							//column
							c : selection.ranges[i].end.column,
							//row
							r : selection.ranges[i].end.row
						}

					};
				}
			} else {

				msg.s[0] = {
					//start
					s : {
						//column
						c : selection.anchor.column,
						//row
						r : selection.anchor.row
					},
					//end
					e :{
						//column
						c : selection.lead.column,
						//row
						r : selection.lead.row
					}

				};
			}


			//send off selection change message
			self.Socket.emit('selection-change', msg);


			self.Renderer.Render();

		});

		//fired when the editor gains focus.
		this.Editor.on("focus", function() {

			//do nothing for now...

		});

		//fired when the editor looses focus.
		this.Editor.on("blur", function() {

			//do nothing for now...

		});



		//setup undo/redo events because apparently these don't count as 'changes' to the document
		//in this silly version... w/e

		//document.addEventListener("EditorRedoEvent", this.OnRedo, false);
		//document.addEventListener("EditorUndoEvent", this.OnUndo, false);

		//UI Control
		$("#chatText").bind('keypress', function (e) {
		    if ((e.keyCode || e.which) == 13) {
				if ($("#chatText").val() != '') {
		        	self.Socket.emit('message', $("#chatText").val());
					$("#chatMsgs").append('<li class="msg"><strong>'+self.UserName+': </strong>'+$("#chatText").val()+'</li>');
		      	
		        	$("#chatText").val('');

				}
	    	}
		});

		$("#darkBtn").click(function() {
			if ($("#darkBtn").hasClass("active")) {
				return;
				} else {
					self.Editor.setTheme("ace/theme/twilight");

					//Set themes for user's

				}
		});

		$("#lightBtn").click(function() {
			if ($("#lightBtn").hasClass("active")) {
				return;
				} else {
					self.Editor.setTheme("");

					//Set themes for user's

				}
		});


		var updateContainer = function() {
			$("#chatContainer").height($(document).height() - $("#users").height() - parseInt($("#users").css("margin-top")) - $("#controls").height() - parseInt($("#controls").css("margin-top")) - $(".user").length -$("#chatText").height() - $("#chatText").height() - 4);
			$("#chat").height($("#chatContainer").height() - $("#chatText").height());
		};

		$(window).resize(function() {
		    updateContainer();
		});

		updateContainer();




		//This starts the session.
		//
		//request to join document room, using name provided by user.
		this.Socket.emit('join', { docID: this.Session.DocID, name: $("#nickInput").val() });

	}





	public Renderer : CodeSoar.Client.View.Renderer;
	public Session : CodeSoar.Common.CodeSoarSession;
	public ExeClient : CodeSoar.Common.IExeClient;
	public User : CodeSoar.Common.User;
	public Editor : any;
	public EditorSession : any;
	public EditorDocument : any;

	public UserID : number;
	public UserName : string;

	private m_syncMode : boolean = false;
	private m_lastEdit : any = null;
	public Socket : any;
}
}