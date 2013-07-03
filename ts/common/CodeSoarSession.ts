/*

CodeSoarSession
 -docId
 -users[]
 -exeClients[]
 -languageName
 -languageData
 -changeId [limit of about 9 quadrillion edits per document... choose next words carefully]

*/

/// <reference path="User.ts"/>
/// <reference path="IExeClient.ts"/>
/// <reference path="languages/ILanguageData.ts"/>
/// <reference path="languages/HtmlLanguageData.ts"/>
/// <reference path="languages/DefaultLanguageData.ts"/>

module CodeSoar.Common {

export class CodeSoarSession {

	//
	// Creates a new instance of the CodeSoarSession class.
	//
	constructor (docId : string, languageName : string) {

		this.DocID = docId;
		this.LanguageName = languageName;


		//TODO: this should probably be somewhere else...

		//Get LanguageData object for provided language
		switch (languageName.toLowerCase()) {

			case 'html':
				this.LanguageData = new CodeSoar.Common.Languages.HtmlLanguageData();
				break;

			default:
				this.LanguageData = new CodeSoar.Common.Languages.DefaultLanguageData();
				break;
		}
	}
	

	public DocID : string;
	public Users : CodeSoar.Common.User[] = [];
	public ExeClients : CodeSoar.Common.IExeClient[] = [];
	public LanguageName : string;
	public LanguageData : CodeSoar.Common.Languages.ILanguageData;
	public ChangeID : number = 0;

}

}