/*

Selection
 -user : User
 -update()
 -id : str
 -remove()

*/

/// <reference path="IView.ts"/>
/// <reference path="../../common/User.ts"/>


module CodeSoar.Client.View {


export class Selection implements CodeSoar.Client.View.IView {

	constructor (editor : any) {
		this.Editor = editor;
	}


	public Update(data : any) : void {
			
		//DocPoint, DocPoint
		

	}

	public Remove() : void {
		
	}


	

	public Editor : any;
}
}