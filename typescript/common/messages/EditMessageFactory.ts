

/// <reference path="IncludeTextMessage.ts"/>
/// <reference path="InsertLinesMessage.ts"/>
/// <reference path="RemoveLinesMessage.ts"/>
/// <reference path="RemoveTextMessage.ts"/>
/// <reference path="IMessage.ts"/>

module CodeSoar.Common.Messages {

export class EditMessageFactory {

	public static BuildEditMessage(data: any) : CodeSoar.Common.Messages.IMessage {

		if (typeof data == "string") {
			data = JSON.parse(data);
		}

		//check shrunk text first...
		if (typeof data.a != "undefined") {
			if (data.a == "it") {
				return new IncludeTextMessage(data);
			} else if (data.a == "rt") {
				return new RemoveTextMessage(data);
			} else if (data.a == "rl") {
				return new RemoveLinesMessage(data);
			} else if (data.a == "il") {
				return new InsertLinesMessage(data);
			}
		} else {
			if (data.action == "insertText") {
				return new IncludeTextMessage(data);
			} else if (data.action == "removeText") {
				return new RemoveTextMessage(data);
			} else if (data.action == "removeLines") {
				return new RemoveLinesMessage(data);
			} else if (data.action == "insertLines") {
				return new InsertLinesMessage(data);
			}
		}
		throw "Unknown edit message type!";
	}

}
}
	