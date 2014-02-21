

module CodeSoar.Common {
    

export class CircularStack<T> {

	constructor(size: number) {

		if (size < 2) {
			throw "CircularStack size must be at least 2";
		}

		this.m_stack = Array<T>(size);
		this.m_index = 0;
		this.m_count = 0;
	}


	//Pushes an item in the stack. If the stack is full,
	//the next object to be popped will be removed to make room.
	public Push(obj:  T) : void {

		//figure out new index
		if (this.m_index == this.m_stack.length - 1) {
			this.m_index = 0;
		} else {
			this.m_index++;
		}

		this.m_stack[this.m_index] = obj;

		if (this.m_count != this.m_stack.length) {
			this.m_count++;
		}
	}


	//Removes the object from the top of the stack
	//and returns it to the caller.
	public Pop() : T {

		//return null if we are empty.
		if (this.m_count == 0) {
			return null;
		}

		//check to see if we are at the 0th index and
		//we have some objects in the stack.
		if (this.m_index == 0) {

			//reduce count
			this.m_count--;

			//fetch object to return
			var obj : T = this.m_stack[this.m_index];

			//set value at current index to null.
			this.m_stack[this.m_index] = null;

			//if we have no other objects in the stack
			//then we are done here.
			if (this.m_count == 0) {
				return obj;
			}

			//still other items in the stack, move index
			//to the very end of the array.
			this.m_index = this.m_stack.length-1;

			//return object
			return obj;
		}

		//this just makes sure if we remove the only item and
		//the index isn't at 0 after that, we put it there.
		//
		//OCD, yes... I know.
		if (this.m_count == 1) {

			//reduce count
			this.m_count--;

			//fetch object to return
			var obj : T = this.m_stack[this.m_index];

			//set value at current index to null.
			this.m_stack[this.m_index] = null;

			//set current index to zero
			this.m_index = 0;

			//return object.
			return obj;
		}

		//All other nice cases without OCD tendencies.

		//reduce count
		this.m_count--;

		//fetch object to return
		var obj : T = this.m_stack[this.m_index];

		//set value at current index to null.
		this.m_stack[this.m_index] = null;

		this.m_index--;

		return obj;
	}




	//Gets the number of objects in this CircularStack.
	public Count() : number {
		return this.m_count;
	}


	//Finds the first index of an object which
	//passes the provided compare function. If no
	//object is found, -1 is returned.
	private IndexOf(obj: T, compare : (a: T, b: T)=>number) : number {

		for(var i = 0; i < this.m_stack.length; i++) {
			if (compare(obj, this.m_stack[i])) {
				return i;
			}
		}
		return -1;
	}

	//checks to see if the given object passes this comparison.
	public Contains(obj: T, compare : (a: T, b: T)=>number) : boolean {

		return this.IndexOf(obj, compare) != -1;

	}

	public Grow(size: number) : void {

		if (size <= this.m_stack.length) {
			return;
		}

		//Easy solution... I'm lazy this morning.

		var newStack : T[] = Array<T>(size);

		var obj : T = null;

		for (var i = 0; (obj = this.Pop()) != null; i++) {
			newStack[i] = obj;
		}

		this.m_stack = newStack;

		if (this.m_count != 0) {
			this.m_index = this.m_count - 1;
		} else {
			this.m_index = 0; //I don't think this is necessary.
		}


	}

	public Peek() : T {

		//check for empty stack
		if (typeof this.m_stack[this.m_index] == 'undefined') {
			return null;
		}

		
		return this.m_stack[this.m_index];
	}


	public ToArray() : T[] {

		return this.m_stack;

	}




	private m_stack : T[];

	private m_count : number;
	private m_index : number;
}

}