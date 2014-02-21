

module CodeSoar.Common {
	
//Utility class
export class Util {

	
	//Gets UTC+0 time in milliseconds since 1970/01/01
	public static GetTimestamp() : number {
		var d : Date = new Date();
		return d.getTime() + (d.getTimezoneOffset() * 60000);
	}

	//Mixes the two provided colors and returns the resulting color.
	public static MixColors(firstColor, secondColor) {

		var result = 0;

		//get red
		result = Math.floor(0.5*((firstColor & 0x00FF0000) >>> 16) + 0.5*((secondColor & 0x00FF0000) >>> 16)) << 16;

		//get green
		result += Math.floor(0.5*((firstColor & 0x0000FF00) >>> 8) + 0.5*((secondColor & 0x0000FF00) >>> 8)) << 8;

		//get blue
		result += Math.floor(0.5*(firstColor & 0x000000FF) + 0.5*(secondColor & 0x000000FF));

		return result;
	}

}

}