var CodeSoar;
(function (CodeSoar) {
    (function (Common) {
        var CircularStack = (function () {
            function CircularStack(size) {
                if (size < 2) {
                    throw "CircularStack size must be at least 2";
                }

                this.m_stack = Array(size);
                this.m_index = 0;
                this.m_count = 0;
            }
            CircularStack.prototype.Push = function (obj) {
                if (this.m_index == this.m_stack.length - 1) {
                    this.m_index = 0;
                } else {
                    this.m_index++;
                }

                this.m_stack[this.m_index] = obj;

                if (this.m_count != this.m_stack.length) {
                    this.m_count++;
                }
            };

            CircularStack.prototype.Pop = function () {
                if (this.m_count == 0) {
                    return null;
                }

                if (this.m_index == 0) {
                    this.m_count--;

                    var obj = this.m_stack[this.m_index];

                    this.m_stack[this.m_index] = null;

                    if (this.m_count == 0) {
                        return obj;
                    }

                    this.m_index = this.m_stack.length - 1;

                    return obj;
                }

                if (this.m_count == 1) {
                    this.m_count--;

                    var obj = this.m_stack[this.m_index];

                    this.m_stack[this.m_index] = null;

                    this.m_index = 0;

                    return obj;
                }

                this.m_count--;

                var obj = this.m_stack[this.m_index];

                this.m_stack[this.m_index] = null;

                this.m_index--;

                return obj;
            };

            CircularStack.prototype.Count = function () {
                return this.m_count;
            };

            CircularStack.prototype.IndexOf = function (obj, compare) {
                for (var i = 0; i < this.m_stack.length; i++) {
                    if (compare(obj, this.m_stack[i])) {
                        return i;
                    }
                }
                return -1;
            };

            CircularStack.prototype.Contains = function (obj, compare) {
                return this.IndexOf(obj, compare) != -1;
            };

            CircularStack.prototype.Grow = function (size) {
                if (size <= this.m_stack.length) {
                    return;
                }

                var newStack = Array(size);

                var obj = null;

                for (var i = 0; (obj = this.Pop()) != null; i++) {
                    newStack[i] = obj;
                }

                this.m_stack = newStack;

                if (this.m_count != 0) {
                    this.m_index = this.m_count - 1;
                } else {
                    this.m_index = 0;
                }
            };

            CircularStack.prototype.Peek = function () {
                if (typeof this.m_stack[this.m_index] == 'undefined') {
                    return null;
                }

                return this.m_stack[this.m_index];
            };
            return CircularStack;
        })();
        Common.CircularStack = CircularStack;
    })(CodeSoar.Common || (CodeSoar.Common = {}));
    var Common = CodeSoar.Common;
})(CodeSoar || (CodeSoar = {}));
