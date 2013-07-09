
/// <reference path="IMessage.ts"/>

module CodeSoar.Common.Messages {



//not going to rename the lines property, not worth it
export class RemoveLinesMessage implements CodeSoar.Common.Messages.IMessage {

	constructor (data: any) {
		this.m_data = data;

		//check if this was pre-shrunk.
		if (typeof this.m_data.a != "undefined") {
			this.m_shrunk = true;
		}
	}



	//Shrinks this message for better bandwidth
	public Shrink() {

		//if already shrunk, ignore.
		if (this.m_shrunk) {
			return;
		}

		//Might help reduce bandwidth footprint... idk by how much, but every bit helps! :p
		this.m_data.a = 'rl';
		this.m_data.sr = this.m_data.range.start.row;
		this.m_data.sc = this.m_data.range.start.column;
		this.m_data.er = this.m_data.range.end.row;
		this.m_data.ec = this.m_data.range.end.column;


		//remove expensive stuff
		delete this.m_data.action;
		delete this.m_data.range;

	}

	//Expands this message for ease of programming/editor integration
	public Expand() {

		//if already expanded, ignore.
		if (!this.m_shrunk) {
			return;
		}

		//EXPAND I SAY
		this.m_data.action = "removeLines";
		this.m_data.range = {
			end : {
				column : this.m_data.ec,
				row : this.m_data.er
			},
			start: {
				column: this.m_data.sc,
				row: this.m_data.sr
			}
		}
		//remove script kiddie headache
		delete this.m_data.a;
		delete this.m_data.sr;
		delete this.m_data.sc;
		delete this.m_data.er;
		delete this.m_data.ec;

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
	