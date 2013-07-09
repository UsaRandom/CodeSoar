var CodeSoar;
(function (CodeSoar) {
    (function (Common) {
        var User = (function () {
            function User(docId, editStyle, socket, editNumber) {
                this.Name = "Anonymous";
                this.IsActive = false;
                this.ExeClient = null;
                this.Scroll = 0;
                this.SelectionData = null;
                this.CursorData = null;
                this.ActiveLine = 0;
                this.DocID = docId;
                this.EditStyle = editStyle;
                this.Socket = socket.this.EditNumber = editNumber;
            }
            return User;
        })();
        Common.User = User;
    })(CodeSoar.Common || (CodeSoar.Common = {}));
    var Common = CodeSoar.Common;
})(CodeSoar || (CodeSoar = {}));
