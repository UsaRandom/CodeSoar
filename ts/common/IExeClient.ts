/*

IExeClient
 -id
 -user
 -setAutoExe
 -execute

*/


/// <reference path="User.ts"/>

module CodeSoar.Common {

export interface IExeClient {


	SetAutoExecute (autoExe: boolean);
	Execute ();

	ID : number;
	User : CodeSoar.Common.User;

	
}

}