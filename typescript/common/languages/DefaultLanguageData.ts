/*

DefaultLanguageData : ILanguageData

*/

/// <reference path="ILanguageData.ts"/>

module CodeSoar.Common.Languages {

export class DefaultLanguageData implements ILanguageData {

	public HasExeClient : boolean = false;
	public AutoExeCapable : boolean = false;

}

}