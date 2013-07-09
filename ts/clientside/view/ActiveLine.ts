/*

ActiveLine
 -user : User
 -update()
 -id : str
 -remove()

*/

/// <reference path="IView.ts"/>
/// <reference path="../../common/User.ts"/>

module CodeSoar.Client.View {


export class ActiveLine implements CodeSoar.Client.View.IView {

	constructor () {

	}


	public Update(data? : any) : void {

	}

	public Remove() : void {

	}

	public User : CodeSoar.Common.User;
	public BomID : string;
	public Editor : any;
}
}