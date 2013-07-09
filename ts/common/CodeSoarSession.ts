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


	//Checks whether or not the given user belongs to this session.
	public ContainsUser (user : CodeSoar.Common.User) : boolean {

		return this.IndexOfUser(user) != -1;

	}

	//Gets the index of the requested user. If the user doesn't
	//exist in this session, -1 is returned.
	public IndexOfUser (user : CodeSoar.Common.User) : number {

		for (var i = 0; i < this.Users.length; i++) {
			if (this.Users[i] != null && this.Users[i].Name == user.Name) {
				return i;
			}
		}
		return -1;
	}

	//Adds the given user to this session. If the user is already a
	//member of this session, it is not re-added.
	public AddUser (user : CodeSoar.Common.User) : void {

		if (this.ContainsUser(user))
			return;

		for (var i = 0; i < this.Users.length; i++) {
			if (this.Users[i] == null) {
				this.Users[i] = user;
				return;
			}
		}

		this.Users.length = this.Users.length + 1;
		this.Users[this.Users.length+1] = user;
	}

	//Removes the given user from this session. If the user was already removed,
	//or doesn't exist in this session, nothing happens.
	public RemoveUser(user : CodeSoar.Common.User) : void {

		var idx : number = this.IndexOfUser(user);

		if (idx == -1)
			return;

		this.Users[idx] = null;

	}
	

	public DocID : string;
	public Users : CodeSoar.Common.User[] = Array(0);
	public ExeClients : CodeSoar.Common.IExeClient[] = Array(0);
	public LanguageName : string;
	public LanguageData : CodeSoar.Common.Languages.ILanguageData;
	public EditNumber : number = 0;

}

}