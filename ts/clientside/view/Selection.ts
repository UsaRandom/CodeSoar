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

	constructor () {
		this.m_id = CodeSoar.Client.View.Selection.id++;
	}


	public Update(data? : any) : void {
			
		
		if (typeof data != 'undefined') {
			this.startRow = data.s.r;
			this.startCol = data.s.c;
			this.endRow = data.e.r;
			this.endCol = data.e.c;
		}

		this.Paint();

	}

	private Paint() : void {

		var startPos = this.Editor.getSession().documentToScreenPosition(this.startRow, this.startCol);
		var endPos = this.Editor.getSession().documentToScreenPosition(this.endRow, this.endCol);


		//check if selecting more than one line...
		if (startPos.row != endPos.row) {

		} else {
			//only one line selected...

			if (startPos.column == endPos.column) {
				//nothing selected... or whole line... idk.
				return;
			}

			if ($("#"+this.m_id+"_single").length == 0) {
				$("#editor .ace_marker-layer:first").append('<div id="'+this.m_id+'_single"></div>');
			}


			//get 'REAL' position [codefold adjustments, tabs, etc.]

			$("#"+this.m_id+'_single').css({
				'height': '15px',
				'top': 15 * (startPos.row) + 'px',
				'left': 4 + (6 * Math.min(startPos.column, endPos.column)) + 'px',
				'width': 6 * Math.abs(startPos.column - endPos.column) + 'px',
				'z-index': 5,
				'position': 'absolute',
				'background': 'rgb(241, 199, 179)'
			});
		}

	}


	public Remove() : void {

	}



	private m_id : number;

	private startRow : number;
	private endRow : number;
	private startCol : number;
	private endCol : number;

	static id : number = 0;
	public Editor : any;
}
}