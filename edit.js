var CodeSoar;
(function (CodeSoar) {
    (function (Client) {
        var Edit = (function () {
            function Edit(doc, delta, timestamp) {
                this.m_anchorEventsSetup = false;
                this.Delta = delta;
                this.Timestamp = timestamp;

                this.EditRange = new ARange(doc, delta.range.start.row, delta.range.start.column, delta.range.end.row, delta.range.end.column);

                this.StartAnchor = new Anchor(doc, delta.range.start.row, delta.range.start.column);
                this.EndAnchor = new Anchor(doc, delta.range.end.row, delta.range.end.column);
            }
            Edit.prototype.EnableAnchorEvents = function (handler) {
                var _self = this;

                this.StartAnchor.detach();
                this.EndAnchor.detach();

                this.m_anchorHandler = handler;

                this.StartAnchor.on('change', function (e) {
                    _self.m_anchorHandler({ Edit: _self, AnchorName: 'StartAnchor', AnchorEvent: e });
                });

                this.EndAnchor.on('change', function (e) {
                    _self.m_anchorHandler({ Edit: _self, AnchorName: 'EndAnchor', AnchorEvent: e });
                });
            };

            Edit.prototype.DisableAnchorEvents = function () {
                this.StartAnchor.detach();
                this.EndAnchor.detach();

                this.m_anchorHandler = null;
            };
            return Edit;
        })();
        Client.Edit = Edit;
    })(CodeSoar.Client || (CodeSoar.Client = {}));
    var Client = CodeSoar.Client;
})(CodeSoar || (CodeSoar = {}));
