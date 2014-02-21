
/// <reference path="IView.ts"/>
/// <reference path="../../common/User.ts"/>


module CodeSoar.Client.View {

//TODO: Test the hell out of this.
export class ViewCollection<T extends IView> {

/*
	public GetViewsByUser(user : CodeSoar.Common.User) : T[] {
		
		var views : T[] = new Array<T>(0);

		//loop through array of views
		for (var i = 0; i < this.m_views.length; i++) {
			
			//check if this index's view has the same user
			if (this.m_views[i] != null && this.m_views[i].User.Name == user.Name) {

				views.length = views.length + 1;
				views[views.length] = this.m_views[i];

			}
		}

		return views;
	}
*/

	public AddView(view : T) : void {
		
		//loop through array of views
		for (var i = 0; i < this.m_views.length; i++) {
			
			//check if this index is null
			if (this.m_views[i] == null) {

				this.m_views[i] = view;

				//We are done here.
				return;
			}
		}

		//No empty slots, add extra space to array
		//Then put the new view there.
		//
		//... This scares me...
		this.m_views.length = this.m_views.length + 1;
		this.m_views[this.m_views.length] = view;
	}


	public RemoveView(view : T) : void {

		//loop through array of views
		for (var i = 0; i < this.m_views.length; i++) {
			
			//check if this index has the provided view
			if (this.m_views[i] == view) {

				this.m_views[i] = null;

				//We are done here.
				return;
			}
		}

	}

	private m_views : T[] = Array<T>(0)


}


}