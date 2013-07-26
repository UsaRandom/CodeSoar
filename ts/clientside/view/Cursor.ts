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
		this.m_id = CodeSoar.Client.View.Cursor.id++;
	}


	public Update(data? : any) : void {

		if (typeof data != 'undefined') {
			this.row = data.r;
			this.col = data.c;
		}

		this.Paint();
		
	}


	private Paint() : void {

		//if cursor div doesn't exists
		if ($("#"+this.m_id+"_cursor").length == 0) {

			$("#codesoar_cursor-layer").append('<div id="'+this.m_id+'"></div>');
			
		}



		//get 'REAL' position [codefold adjustments, tabs, etc.]
		var docPos = this.Editor.getSession().documentToScreenPosition(this.row, this.col);


		$("#"+this.m_id+"_cursor").css({
			'height': '15px',
			'top': 15 * (docPos.row) + 'px',
			'left': 4 + (6 * docPos.column) + 'px',
			'width': '6px',
			'z-index': 4,
			'position': 'absolute',
			'-moz-box-sizing': 'border-box',
			'-webkit-box-sizing': 'border-box',
			'box-sizing': 'border-box',
			'border-left': '2px solid red'
		});


	}

	public Remove() : void {
		//go away
		$("#"+this.m_id).remove();
	}

	private m_id : number;
	private row : number = 0;
	private col : number = 0;
	static id : number = 0;

	public Editor : any;
}
}