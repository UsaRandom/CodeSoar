/*

Cursor
 -user : User //represents anothers users cursor
 -setBlinking()
 -update()
 -id : str
 -remove()
 -editor

*/

/// <reference path="IView.ts"/>
/// <reference path="../../common/User.ts"/>

module CodeSoar.Client.View {


export class Cursor implements CodeSoar.Client.View.IView {

	constructor () {

	}


	public Update(data : any) : void {

	}

	public Remove() : void {

	}

	public User : CodeSoar.Common.User;
	public Blinking : boolean;
	public BomID : string;
	public Editor : any;
}
}