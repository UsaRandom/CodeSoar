

/// <reference path="../common/User.ts"/>
/// <reference path="../common/messages/JoinRequestMessage.ts"/>



module CodeSoar.Server {
	
export class MessageRoom {
	

	constructor(docID: string, onEmpty : Function) {

		this.DocID = docID;
		this.m_onEmpty = onEmpty;

	}

	public OnJoin(socket : any, joinMsg : CodeSoar.Common.Messages.JoinRequestMessage) {

		var self : any = this;

		socket.join(self.DocID);

		//new socket is joining, setup other message handlers.

		//User's cursor changed.
	    socket.on('cursor-change', function(data) {
	    
	    	socket.broadcast.to(self.DocID).emit('user-cursor-change', data);
	    });

	    //User's selection changed.
	    socket.on('selection-change', function(data) {
	    
	    	socket.broadcast.to(self.DocID).emit('user-selection-change', data);
	    });

	    //User sends a message.
	    socket.on('message', function(data) {

	    	socket.broadcast.to(self.DocID).emit('user-message', data);

	    });

	    //User edits document.
	    socket.on('edit', function(data) {
	    	//don't broadcast to everyone...
	    	//socket.broadcast.to(self.DocID).emit()

	    	socket.broadcast.to(self.DocID).emit('user-edit', data);
	    });

	    //Disconnect handler, no params
	    socket.once('disconnect', function() {

			if (self.GetUserCount() == 0) {
				self.m_onEmpty(self);
			} else {
				io.sockets.in(self.DocID).emit('user-left', {
					Name: socket.user.Name
				});	
			}

	    });


       socket.emit('join');
     



	}


	//Gets the user objects in this room.
	public GetUsers() {

		var users : any = new Array(this.GetUserCount());
		var socketClients : any = io.sockets.clients(this.DocID);

		for(var i = 0; i < socketClients.length; i++) {

			if(typeof socketClients[i].userObj != 'undefined' &&
			   socketClients[i].userObj != null) {

				users.push(socketClients[i].userObj);

			} else {
				console.log("Empty User Object");
			}

		}
		return users;
	}


	public GetUserCount() : number {

		return io.sockets.clients(this.DocID).length;

	}


	public DocID : string;

	private m_onEmpty : Function;

}


}