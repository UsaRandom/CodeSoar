

$(document).ready(function(){
    //Document Ready
    //
    //JS Magic
    var language = "javascript";

    var editor = ace.edit("editor_demo");
    editor.getSession().setMode("ace/mode/javascript");

    $("#language_select").change(function () {
    	$("#language_select option:selected").each(function () {
    		language = $(this).attr("data-att");
    		editor.getSession().setMode("ace/mode/"+language);
    	});
    });

    $("#go_btn").click(function () {
    	var  noErrors = true;
    	
    	if (noErrors)
    	{

    		$.post ("/create",
    		{

    			language : language,
    			src : editor.getSession().getDocument().getValue()
    		}
    		).done(function(data) {
    			window.location = "/view/"+data;

    		}).fail(function(err) {

    			alert(err);

    		});
    	}
    });

});