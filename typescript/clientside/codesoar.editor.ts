//This is the initializer javascript for the clientside editor.


/// <reference path="../common/User.ts"/>
/// <reference path="../common/CodeSoarSession.ts"/>

/// <reference path="./EditorController.ts"/>

declare var ace;
declare var io;
declare var $;


declare var SOCKET_HOST;
declare var Anchor;
declare var ARange;
Anchor = ace.require('ace/anchor').Anchor;
ARange  = ace.require('ace/range').Range;

declare var clone;

clone = function(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    var copy : any;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

var editorControllerInstance;

var CodeSoarClient;
(function (CodeSoarClient) {
    CodeSoarClient.Init = function (docID, language, config) {

    					SOCKET_HOST = config.SOCKET_HOST;

    					//start editor
		   				var editor = ace.edit("editor");
		   				editor.getSession().setMode("ace/mode/"+language);

		   				//Ask for name, then start the EditorController.
  						$("#displayNameModal").on('hide', function() {

  							var session = new CodeSoar.Common.CodeSoarSession(docID, language);

  							editorControllerInstance = new CodeSoar.Client.EditorController();
  							editorControllerInstance.Setup(session, editor);

  						});
  						$("#displayNameModal").modal('show');

  			
		   			}
})(CodeSoarClient || (CodeSoarClient = {}));