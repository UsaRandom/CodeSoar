

/// <reference path='MessageRoom.ts'/>
/// <reference path='../common/messages/JoinRequestMessage.ts'/>


module CodeSoar.Server {
	
export class MessageServer {
	
	constructor(io : any) {

		this.m_io = io;
		this.m_rooms = new Array(100);


	}

	public Setup() {
		//When a connection is received.

		var self = this;

		this.m_io.sockets.on('connection', function (socket) {

		    //On join
		    socket.on('join', function(data: any) {
				var joinMsg : CodeSoar.Common.Messages.JoinRequestMessage = new CodeSoar.Common.Messages.JoinRequestMessage(data);
				var room : CodeSoar.Server.MessageRoom;

				//expand the message.
				joinMsg.Expand();


				//if the room exists...
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

	}


	public OnRoomEmpty(room : CodeSoar.Server.MessageRoom) {
		delete this.m_rooms[room.DocID];
	}


	private m_io : any;
	private m_rooms : CodeSoar.Server.MessageRoom[];

}


}