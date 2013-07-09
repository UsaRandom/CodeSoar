var CodeSoar;
(function (CodeSoar) {
    (function (Common) {
        var EditStyle = (function () {
            function EditStyle(cursorColor, lineColor, selectionColor) {
                this.CursorColor = cursorColor;
                this.LineColor = lineColor;
                this.SelectionColor = selectionColor;
            }
            return EditStyle;
        })();
        Common.EditStyle = EditStyle;
    })(CodeSoar.Common || (CodeSoar.Common = {}));
    var Common = CodeSoar.Common;
})(CodeSoar || (CodeSoar = {}));
