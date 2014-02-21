

module CodeSoar.Common.Messages {

//ALOT of thought went into this :p
export interface IMessage {

	//Shrinks this message for better bandwidth
	Shrink();

	//Expands this message for ease of programming/editor integration
	Expand();

	//Returns this message as a string in JSON format, shrunk or expanded.
	ToJSON();

	//Returns an editor usable object
	ToObject();



}
}
	