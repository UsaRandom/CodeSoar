

//attach an anchor to each edit
//this is nice for document sync.
declare var Anchor;
//Ranges would be nice too
declare var ARange;

module CodeSoar.Client {
	
export class Edit {


	constructor (doc: any, delta: any, timestamp: number) {

		this.Delta = delta;
		this.Timestamp = timestamp;

		//Setup range
		this.EditRange = new ARange(delta.range.start.row, delta.range.start.column,
									delta.range.end.row, delta.range.end.column);

		//Setup anchors
		this.StartAnchor = new Anchor(doc, delta.range.start.row, delta.range.start.column);
		this.EndAnchor = new Anchor(doc, delta.range.end.row, delta.range.end.column);

	}

	//resets the anchors to the default position.
	//this will disable AnchorEvents.
	public ResetAnchors () {

		this.DisableAnchorEvents();

		this.StartAnchor.setPosition(delta.range.start.row, delta.range.start.column);
		this.EndAnchor.setPosition(delta.range.end.row, delta.range.end.column);

	}


	//recalculates the the edit range.
	public RecalculateRange() {
		

		var startPos : any = this.StartAnchor.getPosition();
		var endPos : any = this.EndAnchor.getPosition();

		this.EditRange = new ARange(startPos.row, startPos.column,
									endPos.row, endPos.column);

	}

	//checks to see if the provided edit's range intersects with this
	//edits range.
	public IntersectsEdit (edit: Edit) : boolean {

		return this.EditRange.intersects(edit.EditRange);

	}



	//Only one listener at a time please :)
	public EnableAnchorEvents(handler: Function) {
		
		var _self : Edit = this;

		this.DisableAnchorEvents();

		this.AnchorEventsSetup = true;

		this.m_anchorHandler = handler;

		//Subscribe to anchor events, add a self to data, and anchor name.
		this.StartAnchor.on('change', function(e) {

			_self.m_anchorHandler({Edit: _self, AnchorName: 'StartAnchor', AnchorEvent: e});

		});

		this.EndAnchor.on('change', function(e) {

			_self.m_anchorHandler({Edit: _self, AnchorName: 'EndAnchor', AnchorEvent: e});

		});
	}


	public DisableAnchorEvents() {

		//remove old listeners.
		this.StartAnchor.detach();
		this.EndAnchor.detach();

		this.AnchorEventsSetup = false;
		this.m_anchorHandler = null;


	}




	public Timestamp : number;
	public Delta : any;
	public StartAnchor : any;
	public EndAnchor : any;
	public EditRange : any;
	public AnchorEventsSetup : boolean = false;

	private m_anchorHandler : Function;

}

}