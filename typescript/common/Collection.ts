

module CodeSoar.Common {

export class Collection<T> {


	public GetAllObjects() : T[] {
		
		var objs : T[] = new Array<T>(0);

		//loop through array of objs
		for (var i = 0; i < this.m_objs.length; i++) {
		
			if (this.m_objs[i] != null && 
				typeof this.m_objs[i] != 'undefined') {

				objs.length = objs.length + 1;
				objs[objs.length-1] = this.m_objs[i];
	
			}
		}

		return objs;
	}

	public Add(obj : T) : void {
		
		//loop through array of objs
		for (var i = 0; i < this.m_objs.length; i++) {
			
			//check if this index is null
			if (this.m_objs[i] == null) {

				this.m_objs[i] = obj;

				//We are done here.
				return;
			}
		}

		//No empty slots, add extra space to array
		//Then put the new obj there.
		//
		//... This scares me...
		this.m_objs.length = this.m_objs.length + 1;
		this.m_objs[this.m_objs.length-1] = obj;
	}

	//check if this contains the given element.
	public Contains (obj : T, compare: (a: T, b: T) => boolean) : boolean {

		for(var i = 0; i < this.m_objs.length; i++) {

			if (compare(obj, this.m_objs[i])) {
				return true;
			}

		}
		return false;
	}


	public Get(where: (a:T) => boolean) : T {


		for (var i = 0; i < this.m_objs.length; i++) {


			if (where(this.m_objs[i])) {
				return this.m_objs[i];
			}

		}

		return null;

	}


	public Remove(obj : T, compare: (a: T, b: T) => boolean) : void {

		//loop through array of objs
		for (var i = 0; i < this.m_objs.length; i++) {
			
			//check if this index has the provided obj
			if (this.m_objs[i] == obj) {

				this.m_objs[i] = null;

				//We are done here.
				return;
			}
		}

	}

	private m_objs : T[] = Array<T>(0);


}


}