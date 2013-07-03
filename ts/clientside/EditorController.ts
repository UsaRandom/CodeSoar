/*

EditorController
 -codeSoarSession : CodeSoarSession
 -exeClient : ExeClient
 -editor : AceEditor
 -onEdit(evt)
 -onMessage(evt)
 -onCursorChange(evt)
 -onSelectionChange(evt)
 -onActiveLineChange(evt)
 -onUserJoined(evt)
 -onUserLeft(evt)
 -onScroll(evt)
 -sendEdit()
 -sendMessage()
 -sendScrollChange()
 -sendSelectionChange()
 -sendActiveLineChange()
 -sendCursorChange()
 -sendExeRequest()
 -setAutoExe(data)
 -user : User //The user of this session

*/

/// <reference path="./View/Cursor.ts"/>

/// <reference path="../../common/User.ts"/>


module CodeSoar.Client {


export class EditorController {

	constructor () {
		
	}


	public User : CodeSoar.Common.User;
	public Editor : any;
}
}