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


	static Compare(a : CodeSoar.Common.User, b : CodeSoar.Common.User) : boolean {

		if (typeof a == 'undefined' || typeof b == 'undefined' ||
			a == null || b == null) {
			return false;
		}

		return a.uId == b.uId;

	}
	

	public uId : number = 0;
	public Name : string = "Anonymous";
	public Selection : any = null;
	public Cursor : any = null;

	public selectionRenderer : any;
	public cursorRenderer : any;
}

}