
/// <reference path="IMessage.ts"/>

module CodeSoar.Common.Messages {

export class JoinRequestMessage implements CodeSoar.Common.Messages.IMessage {

	constructor (data: any) {
		this.m_data = data;

		//check if this was pre-shrunk.
		if (typeof this.m_data.n != "undefined") {
			this.m_shrunk = true;
		}
	}


	//Shrinks this message for better bandwidth
	public Shrink() {

		//if already shrunk, ignore.
		if (this.m_shrunk) {
			return;
		}

		this.m_data.n = this.m_data.Name;
		this.m_data.d = this.m_data.DocID;


		delete this.m_data.Name;
		delete this.m_data.DocID;

		this.m_shrunk = true;
	}

	//Expands this message for ease of programming/editor integration
	public Expand() {

		//if already expanded, ignore.
		if (!this.m_shrunk) {
			return;
		}


		this.m_data.Name = this.m_data.n;
		this.m_data.DocID = this.m_data.d;


		delete this.m_data.n;
		delete this.m_data.d;

		this.m_shrunk = false;
	}

	//Returns this message as a string in JSON format, shrunk or expanded.
	public ToJSON() {
		return JSON.stringify(this.m_data);

	}

	//Returns an editor usable object
	public ToObject() {
		return this.m_data;
	}


	private m_shrunk : boolean = false;
	private m_data : any;
}
}
	