/*

User
 -name
 -docId
// -canEdit //limit number of editors? if not we don't need.
 -editStyle
 -isActive
 -exeClient
 -scroll
 -selectionData
 -cursorData
 -activeLine
 -socket
 -editNumber

*/


/// <reference path="EditStyle.ts"/>

module CodeSoar.Common {

export class User {

	//
	// Creates a new instance of the User class.
	//
	constructor (docId: string, editStyle: EditStyle, socket: any, editNumber: number) {

		this.DocID = docId;
		this.EditStyle = editStyle;
		this.Socket = socket.
		this.EditNumber = editNumber;

	}

	public DocID : string;
	public Name : string = "Anonymous";
	//public CanEdit : boolean = false;
	public EditStyle : CodeSoar.Common.EditStyle;
	public IsActive : boolean = false;
	public ExeClient : CodeSoar.Common.IExeClient = null;
	public Scroll : number = 0;
	public SelectionData : any = null;
	public CursorData : any = null;
	public ActiveLine : number = 0;
	public Socket : any;
	public EditNumber : number;
}

}