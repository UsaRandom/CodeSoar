
/// <reference path="IMessage.ts"/>

/// <reference path="../Util.ts"/>

module CodeSoar.Common.Messages {

export class CursorMessage implements CodeSoar.Common.Messages.IMessage {

	constructor (data: any) {
		this.m_data = data;

		//check if this was pre-shrunk.
		if (typeof this.m_data.r != "undefined") {
			this.m_shrunk = true;
		}
	}



	//Shrinks this message for better bandwidth
	public Shrink() {

		//if already shrunk, ignore.
		if (this.m_shrunk) {
			return;
		}


		this.m_data.r = this.m_data.row;
		this.m_data.c = this.m_data.column; 

		delete this.m_data.row;
		delete this.m_data.column;

	}

	//Expands this message for ease of programming/editor integration
	public Expand() {

		//if already expanded, ignore.
		if (!this.m_shrunk) {
			return;
		}

		this.m_data.row = this.m_data.r;
		this.m_data.column = this.m_data.c; 

		delete this.m_data.r;
		delete this.m_data.c;

	}

	//Returns this message as a string in JSON format, shrunk or expanded.
	public ToJSON() {
		return JSON.stringify(this.m_data);

	}
	//Returns an editor usable object
	public ToObject() {
		return this.m_data;
	}


	private m_data : any;
	private m_shrunk : boolean = false;
}
}
	