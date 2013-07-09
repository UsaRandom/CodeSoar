

module CodeSoar.Common {
	
//Utility class
export class Util {

	
	//Gets UTC+0 time in milliseconds since 1970/01/01
	public static GetTimestamp() : number {
		var d : Date = new Date();
		return d.getTime() + (d.getTimezoneOffset() * 60000);
	}

}

}