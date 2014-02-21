/*

EditStyle
 -cursorColor
 -lineColor
 -selectionColor        ??? or
// -selectionOutlineColor ??? or both?

*/

module CodeSoar.Common {

export class EditStyle {

	//
	// Creates a new instance of the EditStyle class.
	//
	constructor (cursorColor: number, lineColor: number, selectionColor: number) {

		this.CursorColor = cursorColor;
		this.LineColor = lineColor;
		this.SelectionColor = selectionColor;

	}

	public CursorColor : number;
	public LineColor : number;
	public SelectionColor : number;

}

}