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



module CodeSoar.Common {

export class User {

	//
	// Creates a new instance of the User class.
	//
	constructor () {



	}



	public Name : string = "Anonymous";
	public SelectionData : any = null;
	public CursorData : any = null;
}

}