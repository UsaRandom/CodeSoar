

/// <reference path="../common/User.ts"/>
/// <reference path="../common/messages/JoinRequestMessage.ts"/>

/// <reference path="../common/messages/CursorMessage.ts"/>



module CodeSoar.Server {
	
export class MessageRoom {
	

	constructor(docID: string, onEmpty : Function) {

		this.DocID = docID;
		this.m_onEmpty = onEmpty;

	}

	public OnJoin(socket : any, joinMsg : CodeSoar.Common.Messages.JoinRequestMessage) {

		var self : any = this;

		socket.User = new CodeSoar.Common.User();
		socket.uId = this.m_id++;
		
		
		//Build a good name...
		var nameToUse : string = joinMsg.ToObject().name;

		if (nameToUse == '') {
			nameToUse = 'Anonymous';
		}

		var nameAddition : number = 0;
		var nameTaken : boolean = false;
		var otherUsers = Array(0);
		var otherUserCnt : number = 0;

		if (io.sockets.clients(this.DocID).length != 0) {
			
			var socketClients : any = io.sockets.clients(this.DocID);
			
			for(var i = 0; i < socketClients.length; i++) {
				if (socketClients[i].uId != socket.uId) {
					if (socketClients[i].User.Name.toLowerCase() == nameToUse.toLowerCase()) {
						nameTaken = true;
					}
					otherUsers.length = otherUsers.length + 1;
					otherUsers[otherUserCnt++] = { uId: socketClients[i].uId,n: socketClients[i].User.Name };
				}
			}

			while(nameTaken) {
				nameTaken = false;
				nameAddition++;
				var nameTemp : string = nameToUse+nameAddition;
				for(var i = 0; i < socketClients.length; i++) {
					if (socketClients[i].uId != socket.uId &&
						socketClients[i].User.Name.toLowerCase() == nameTemp.toLowerCase()) {
						nameTaken = true;
					}
				}
			}

		} 		

		//unique name
		socket.User.Name = nameAddition == 0 ? nameToUse : nameToUse+nameAddition;


		socket.join(self.DocID);


		//new socket is joining, setup other message handlers.

		//User's cursor changed.
	    socket.on('cursor-change', function(data) {


			//clone data object
			var dataClone = clone(data);

	    	//build the cursor message from provided data.
			var msg : CodeSoar.Common.Messages.IMessage = new CodeSoar.Common.Messages.CursorMessage(dataClone);

			//expand
			msg.Expand();

			//set uid
	    	data.uId = socket.uId;

	    	//update users cursor data
	    	socket.User.Cursor = msg.ToObject();

	    	//broadcast cursor change
	    	socket.broadcast.to(self.DocID).emit('user-cursor-change', data);
	    });

	    //User's selection changed.
	    socket.on('selection-change', function(data) {

	    	data.uId = socket.uId;
	    	socket.broadcast.to(self.DocID).emit('user-selection-change', data);
	    });

	    //User sends a message.
	    socket.on('message', function(data) {
	    	data.uId = socket.uId;
	    	socket.broadcast.to(self.DocID).emit('user-message', data);

	    });

	    //User edits document.
	    socket.on('edit', function(data) {
	    	//don't broadcast to everyone...
	    	//socket.broadcast.to(self.DocID).emit()
	    	data.uId = socket.uId;
	    	socket.broadcast.to(self.DocID).emit('user-edit', data);
	    });

	    //Disconnect handler, no params
	    socket.once('disconnect', function() {

			if (self.GetUserCount() == 0) {
				self.m_onEmpty(self);
			} else {
				io.sockets.in(self.DocID).emit('user-left', {
					uId: socket.uId
				});	
			}

	    });

	    //give socket its name and id
    	socket.emit('join', {uId: socket.uId, n: socket.User.Name, u: otherUsers});
     	//tell everyone this user joined.
    	socket.broadcast.to(this.DocID).emit("user-joined", {uId: socket.uId, n: socket.User.Name});


	}


	//Gets the user objects in this room.
	public GetUsers() {

		var users : any = new Array(0);
		var socketClients : any = io.sockets.clients(this.DocID);

		for(var i = 0; i < socketClients.length; i++) {

			if(typeof socketClients[i].User != 'undefined' &&
			   socketClients[i].User != null) {

				users.push(socketClients[i].User);

			} else {
				console.log("Empty User Object");
			}

		}
		return users;
	}


	public GetUserCount() : number {

		return io.sockets.clients(this.DocID).length;

	}

	private m_id : number = 0;

	public DocID : string;

	private m_onEmpty : Function;

}


}