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


			this.m_data = data;
			this.startRow = data.s[0].s.r;
			this.startCol = data.s[0].s.c;
			this.endRow = data.s[0].e.r;
			this.endCol = data.s[0].e.c;
		}

		this.Paint();

	}

	private Paint() : void {


		//no multi selects just yet
	//	for(var i = 0; i < this.m_data.s.length; i++) {


	//	}

		this.Remove();

		var startPos = this.Editor.getSession().documentToScreenPosition(this.startRow, this.startCol);
		var endPos = this.Editor.getSession().documentToScreenPosition(this.endRow, this.endCol);


		//check if selecting more than one line...
		if (startPos.row != endPos.row) {
			

			var rowCnt : number = Math.abs(startPos.row - endPos.row);

			//top
			$("#codesoar_marker-layer").append('<div id="'+this.m_id+'_top"></div>');

			//mid (only if greater than two)
			if(rowCnt >= 2)
				$("#codesoar_marker-layer").append('<div id="'+this.m_id+'_mid"></div>');

			//bot
			$("#codesoar_marker-layer").append('<div id="'+this.m_id+'_bot"></div>');

			var flipped : bool = true;
			if(startPos.row < endPos.row)
				flipped = false;



			if (!flipped) {

				$("#"+this.m_id+'_top').css({
					'height': '15px',
					'top': 15 * (startPos.row) + 'px',
					'left': 4 + (6 * startPos.column) + 'px',
					'right': '0',
					'z-index': 5,
					'position': 'absolute',
					'background': 'rgb(241, 199, 179)'
				});

				$("#"+this.m_id+'_bot').css({
					'height': '15px',
					'top': 15 * (endPos.row) + 'px',
					'left': '4px',
					'width': 6 * endPos.column + 'px',
					'z-index': 5,
					'position': 'absolute',
					'background': 'rgb(241, 199, 179)'
				});
			} else {
				$("#"+this.m_id+'_bot').css({
					'height': '15px',
					'top': 15 * (startPos.row) + 'px',
					'left': '4px',
					'width': 6 * startPos.column + 'px',
					'z-index': 5,
					'position': 'absolute',
					'background': 'rgb(241, 199, 179)'
				});

				$("#"+this.m_id+'_top').css({
					'height': '15px',
					'top': 15 * (endPos.row) + 'px',
					'left': 4 + (6 * endPos.column) + 'px',
					'right': '0',
					'z-index': 5,
					'position': 'absolute',
					'background': 'rgb(241, 199, 179)'
				});
			}
			
			if(rowCnt >= 2)
			{
				$("#"+this.m_id+'_mid').css({
					'height': 15 * (rowCnt-1)+  'px',
					'top': 15 * (Math.min(startPos.row, endPos.row) + 1) + 'px',
					'left': '4px', //may be need to be just 4
					'right': '0',
					'z-index': 5,
					'position': 'absolute',
					'background': 'rgb(241, 199, 179)'
				});

			}

		} else {
			//only one line selected...

			if (startPos.column == endPos.column) {
				//nothing selected... or whole line... idk.
				return;
			}

			if ($("#"+this.m_id+"_single").length == 0) {
				$("#codesoar_marker-layer").append('<div id="'+this.m_id+'_single"></div>');
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

		if($("#"+this.m_id+'_single').length != 0) {
			$("#"+this.m_id+'_single').remove();
		}

		if($("#"+this.m_id+'_top').length != 0) {
			$("#"+this.m_id+'_top').remove();
		}

		if($("#"+this.m_id+'_mid').length != 0) {
			$("#"+this.m_id+'_mid').remove();
		}

		if($("#"+this.m_id+'_bot').length != 0) {
			$("#"+this.m_id+'_bot').remove();
		}

		
	}



	private m_id : number;

	private m_data : any;

	private startRow : number = 0;
	private endRow : number = 0;
	private startCol : number = 0;
	private endCol : number = 0;

	static id : number = 0;
	public Editor : any;
}
}