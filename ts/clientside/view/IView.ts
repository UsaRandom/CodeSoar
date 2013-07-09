
/// <reference path="../../common/User.ts"/>

module CodeSoar.Client.View {

export interface IView {

	Editor : any;
	Update(data?:any): void;
	Remove(): void;


}


}