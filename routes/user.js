$(document).ready(function() {
    
	//The read-more/read-less functionality

    $("#read-more").on('click', function() {
    	$(this).hide();

    	$("#more-info").show();
    });


    $("#read-less").on('click', function() {
    	$("#more-info").hide();
    	$("#read-more").show();
    })

});