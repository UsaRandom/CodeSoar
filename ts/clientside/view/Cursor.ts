/*

Cursor
 -user : User //represents anothers users cursor
 -setBlinking()
 -update()
 -id : str
 -remove()
 -editor

*/

/// <reference path="../../common/User.ts"/>

module CodeSoar.Client.View {


export class Cursor {

	constructor () {

	}


	update() {

	}

	remove() {

	}

	public User : CodeSoar.Common.User;
	public Blinking : boolean;
	public BomID : string;
	public Editor : any;
}
}