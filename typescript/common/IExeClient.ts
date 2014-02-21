/*

IExeClient
 -id
 -user
 -setAutoExe
 -execute

This exists so we can have different execution clients for different langauges, or multiple
execution clients for the same language.

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