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
/// <reference path="./view/ActiveLine.ts"/>
/// <reference path="./view/ViewCollection.ts"/>
/// <reference path="../common/User.ts"/>
/// <reference path="../common/IExeClient.ts"/>
/// <reference path="../common/CodeSoarSession.ts"/>
/// <reference path="../common/CircularStack.ts"/>
/// <reference path="../common/messages/EditMessageFactory.ts"/>
/// <reference path="../common/messages/IMessage.ts"/>
/// <reference path="../common/Util.ts"/>

module CodeSoar.Client {


export class EditorController {


	public Setup (session : CodeSoar.Common.CodeSoarSession,
				  editor : any) {

		this.Session = session;
		this.Editor = editor;

		console.log(editor);
		console.log(this.Editor);

		//set readonly till we are connected.
		this.Editor.setReadOnly(true);

		this.EditorSession = editor.getSession();
		this.EditorDocument = this.EditorSession.getDocument();

		//connect to websocket
		console.log(SOCKET_HOST);
		this.m_socket = io.connect(SOCKET_HOST);

		var self = this;

		//setup socket events.
		this.m_socket.on('join', function(data) {

			self.Editor.setReadOnly(false);


		      //set editor to visible
		      $("#editor").css("visibility", "visible");

		});
		this.m_socket.on('user-joined', this.OnSocketJoined);
		this.m_socket.on('user-left', this.OnSocketLeft);
		this.m_socket.on('user-cursor-change', this.OnSocketCursorChange);
		this.m_socket.on('user-selection-change', this.OnSocketSelectionChange);
		this.m_socket.on('user-message', this.OnSocketMessage);
		this.m_socket.on('user-edit', function(data) {

			var dataClone = clone(data);

			//build the edit message from provided data.
			var msg : CodeSoar.Common.Messages.IMessage = CodeSoar.Common.Messages.EditMessageFactory.BuildEditMessage(dataClone);

			//Do some magic, strip socket stuff, send off to OnEdit()

			msg.Expand();


			console.log('User-Edit msg rec: ' + msg.ToJSON());
			self.EditorDocument.applyDeltas([msg.ToObject()], true);

		});
	//	this.m_socket.on('user-language-change', this.OnSocketLanguageChange);

		//setup editor events.
		this.EditorSession.on('change', function(data) {

			if (data.data.ignore) {



				return;
			}
			

			var dataClone = clone(data);

			console.log(dataClone);

			delete dataClone.data.ignore;

			var msg : CodeSoar.Common.Messages.IMessage = CodeSoar.Common.Messages.EditMessageFactory.BuildEditMessage(dataClone.data);

			msg.Shrink();
			//send the edit to the other users.
			self.m_socket.emit('edit', msg.ToJSON());

		});
		this.EditorSession.on('changeScrollTop', this.OnVerticalScroll);
		this.EditorSession.on('changeScrollLeft', this.OnHorizontalScroll);
		this.EditorSession.on('changeCursor', this.OnCursorChange);
		this.EditorSession.on('changeSelection', this.OnSelectionChange);


		//Custom events

		//setup undo/redo events because apparently these don't count as 'changes' to the document
		//in this silly version... w/e
		document.addEventListener("EditorRedoEvent", this.OnRedo, false);
		document.addEventListener("EditorUndoEvent", this.OnUndo, false);



		//request to join document room, using name provided by user.
		this.m_socket.emit('join', { docID: this.Session.DocID, name: $("#nickInput").val() });


		//fixes minor issues with right chat container.
		//
		//This will probably be changed.
		var updateContainer = function() {
			$("#chatContainer").height($(document).height() - $("#users").height() - parseInt($("#users").css("margin-top")) - $("#controls").height() - parseInt($("#controls").css("margin-top")) - $(".user").length -$("#chatText").height() - $("#chatText").height() - 4);
			$("#chat").height($("#chatContainer").height() - $("#chatText").height());
		};

			$(window).resize(function() {
		    updateContainer();
		});

		updateContainer();


	}




	//Event when we are allowed to join the document.
	private OnJoin(data : any) {

		/*
			data = {
					
					Users : [ {userdef}, {userdef}, etc...],
					SuggestedLanguage : '',
					Name : ""
			}

		*/


//		//Populate users into session.
//		for(var i = 0; i < data.Users.length; i++) {
	//		this.Session.AddUser(CodeSoar.Common.User.FromJSON(data.Users[i]));
	//	}

	//	this.User = new CodeSoar.Common.User (this.m_socket);
	//	this.User.Name = data.Name;
//
		//TODO: Get a better number for this stack!
	//	this.m_editStack = new CodeSoar.Common.CircularStack<CodeSoar.Client.Edit>(100);

	}


	//Event when a new user joins the document.
	private OnSocketJoined(data : any) {

	//	this.Session.AddUser(CodeSoar.Common.User.FromJSON(data));

	}


	//Event when a user leaves the document.
	private OnSocketLeft(data : any) {

		//remove user from session list.
	//	this.Session.RemoveUser(CodeSoar.Common.User.FromJSON(data));


		//TODO: remove users selections/activeline/cursor

	}


	//Event when another user manipulates thier cursor.
	private OnSocketCursorChange(data : any) {

		/*
			data = {
				
			}
		*/

	}


	//Event when another user changes their selection.
	private OnSocketSelectionChange(data : any) {



	}


	//Event when another user sends a chat message.
	private OnSocketMessage(data : any) {

		/*
	
			


		*/

	}

	//Event when another user changes to a language other than
	//what THIS user has the editor set to.
	private OnSocketLanguageChange (data: any) {


	}


	//Event thrown when another user changes the document.
	private OnSocketEdit(data : any) {


	}



	//Handler for when the editor notifies us of a change to the document.
	private OnEdit(data: any) {

/*
		if (this.m_syncMode) {

			//edits during sync mode go in the buffer for review during sync finalization.			

			return;
		}
*/
	//	//add timestamp
		//data.data.ts = CodeSoar.Common.Util.GetTimestamp();

		//create new edit object.
	//	var edit : CodeSoar.Client.Edit = new CodeSoar.Client.Edit(this.EditorDocument, data.data,
	//															   CodeSoar.Common.Util.GetTimestamp());

		/*
		//check to see if newer edits already were pushed
		var isNotNewestEdit = this.m_editStack.Contains(edit, function(a : Edit, b : Edit) {
			return a.Timestamp < b.Timestamp;
		}));


		if (isNotNewestEdit) {

			console.log("Edit failed newest test, need to sync?");

			//Put editor into 'sync mode' [SetReadOnly, new edits from socket go to sorted queue]
			//this.m_syncMode = true;
			//this.Editor.setReadOnly(true);

			//Set an 'ace Anchor' at the beginning and end of each edit after
			//this new one. So if there are new lines, extra text that moves things, etc,
			//we will have a good chance of retaining all edits as valid. [as long as they don't delete the whole doc]



		}

		//push edit to edit stack.
		this.m_editStack.Push(edit);

		*/

	}


	//handler for redo's [they don' fire the 'change' event]
	private OnRedo (data : any) {
		//data.data.ignore = true;
		this.OnEdit(data);
	}

	//handler for undo's [they don't fire the 'change' event]
	private OnUndo (data : any) {
	//	data.data.ignore = true;
		this.OnEdit(data);
	}

	//handler for Vertical scrolling events
	private OnVerticalScroll(scrollTop : number) {


	}


	//handler for Horizontal scrolling events
	private OnHorizontalScroll(scrollLeft : number) {


	}


	//handler for cursor change events
	private OnCursorChange() {

		//get cursor position
		var cursorPos : any = this.EditorSession.getCursor();

		//cursorPos = { row: ##, column: ##};

	}


	private OnSelectionChange() {

		var selection : any = this.EditorSession.selection;



		if (selection.inMultiSelectMode) {
			//check if we have multiple selection ranges

			//loop through the selection.ranges array.



			//selectionRange object def
			//
			/*

				[0] : {
					cursor: {
						column: 19,
						row: 3
					},
					end: {
						column: 3,
						row: 5
					},
					start: {
						column: 19,
						row: 3
					}
				},
				[1] ....


			*/

			//Send off multi selection message

			return;
		}

		//Not in multi select

		var startPos = { column: selection.anchor.column, row: selection.anchor.row};
		var endPos = { column : selection.lead.column, row: selection.lead.row};

		//send of new selection message.

	}




	public Session : CodeSoar.Common.CodeSoarSession;
	public ExeClient : CodeSoar.Common.IExeClient;
	public User : CodeSoar.Common.User;
	public Editor : any;
	public EditorSession : any;
	public EditorDocument : any;

	private m_syncMode : boolean = false;
	private m_lastEdit : any = null;
//	private m_recentEdits : CodeSoar.Common.CircularStack<CodeSoar.Client.Edit>;
//	private m_editBuffer : CodeSoar.Common.CircularStack<CodeSoar.Client.Edit>;
	private m_socket : any;
	private m_cursors : CodeSoar.Client.View.ViewCollection<CodeSoar.Client.View.Cursor>;
	private m_selections : CodeSoar.Client.View.ViewCollection<CodeSoar.Client.View.Selection>;
	private m_activelines : CodeSoar.Client.View.ViewCollection<CodeSoar.Client.View.ActiveLine>;

}
}