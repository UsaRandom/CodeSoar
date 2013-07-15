

/// <reference path="Selection.ts"/>
/// <reference path="Cursor.ts"/>
/// <reference path="../../common/User.ts"/>
/// <reference path="../../common/Collection.ts"/>

module CodeSoar.Client.View {
	
export class Renderer {
	
	constructor(ec : CodeSoar.Client.EditorController) {
		this.m_ec = ec;


		//Add CodeSoar display layers to editor.
		$('<div class="ace_layer" id="codesoar_marker-layer"></div>').insertBefore('.ace_marker-layer:first');
		$('<div class="ace_layer" style="z-index: 4;" id="codesoar_cursor-layer"></div>').insertAfter('.ace_cursor-layer');

	}


	public Render() {

		//renders everything
		var users : CodeSoar.Common.User[] = this.Users.GetAllObjects();

		for(var i = 0; i < users.length; i++) {

			users[i].selectionRenderer.Paint();
			users[i].cursorRenderer.Paint();

		}

	}


	public Init() {


		$("#users > ul").append('<li class="user you" id="user_self"><span>  '+this.m_ec.UserName+'</span></li>');

	}

	public AddUser (user : CodeSoar.Common.User) {

		if (this.Users.Contains(user, CodeSoar.Common.User.Compare)) {
			return;
		}

		user.selectionRenderer = new Selection();
		user.cursorRenderer = new Cursor();
		user.selectionRenderer.Editor = this.m_ec.Editor;
		user.cursorRenderer.Editor = this.m_ec.Editor;
		
		this.Users.Add(user);

		$("#users > ul").append('<li class="user" id="user_'+user.uId+'"><span>  '+user.Name+'</span></li>');


	}


	public RemoveUser (user: CodeSoar.Common.User) {

		user.selectionRenderer.Remove();
		user.cursorRenderer.Remove();

		this.Users.Remove(user, CodeSoar.Common.User.Compare);

		//remove user
		$('#user_'+user.uId).remove();

	}


	private m_ec : CodeSoar.Client.EditorController;

  	private userHtmlPrototype : string = '<li class="user" id=""><span>  userNick</span></li>';

	public Users : CodeSoar.Common.Collection<CodeSoar.Common.User> = new CodeSoar.Common.Collection<CodeSoar.Common.User>();

}


}