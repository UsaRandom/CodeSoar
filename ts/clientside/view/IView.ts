
/// <reference path="../../common/User.ts"/>

module CodeSoar.Client.View {

export interface IView {

	User : CodeSoar.Common.User;
	BomID : string;
	Editor : any;
	Update(data:any): void;
	Remove(): void;


}


}