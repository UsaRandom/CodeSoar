$(document).ready(function () {

  jQuery.fx.off = true;

  String.prototype.replaceAll = function(search, replace)
  {
    //if replace is null, return original string otherwise it will
    //replace search string with 'undefined'.
    if(!replace) 
      return this;

    return this.replace(new RegExp('[' + search + ']', 'g'), replace);
  };

  var codeSoar = {};
  codeSoar.htmlPrototypes = {};

  //data-content = "UserNick has request control of the document"
  codeSoar.htmlPrototypes.ControlRequestNotification = '<a href="#" class="docReq"  data-toggle="popover" data-user="userNick" data-placement="left" data-content="userNick has request control of the document." title="" data-original-title="Control Request"><i class="icon-exclamation-sign"></i></a>';

  //add data-id="userNick" to li tag
  codeSoar.htmlPrototypes.User = '<li class="user" data-user="userNick"><span>  userNick</span></li>';

  //add data-user to 'a' tag
  codeSoar.htmlPrototypes.GiveControlButton = '<a href="#" title="Give Control" class="pull-right giveCtrlBtn" data-user="userNick"><i class="icon-share"></a></i>';

  codeSoar.hasControl = true;

  /*
   *********************************************
    REPLACE PHP VALUES
    ********************************************
  */
  codeSoar.docID = "#{docID}";

  codeSoar.editor = ace.edit("editor");
  codeSoar.editor.getSession().setMode("ace/mode/#{language}");


  //adds a user to the user list
  codeSoar.addUser = function(userNick) {

    var newUserHtmlStr = codeSoar.htmlPrototypes.User;

    newUserHtmlStr = newUserHtmlStr.replace(/userNick/g, userNick);


    $("#users > ul").append(newUserHtmlStr);

    //if this client has control, add super powers
    if (codeSoar.hasControl && userNick != codeSoar.nick) {
      var giveCtrlBtn = codeSoar.htmlPrototypes.GiveControlButton;

      giveCtrlBtn = giveCtrlBtn.replace(/userNick/g, userNick);

      (".user[data-user="+userNick+"]").append(giveCtrlBtn);
      codeSoar.setupGiveControllButtons();
    }

    //if self, apply (you) span
    if (userNick == codeSoar.nick) {
      $('.user[data-user='+codeSoar.nick+"]").addClass('you');
    }


  };


  codeSoar.setupGiveControllButtons = function() {
    $(".giveCtrlBtn").click(function() {
      var userToGive = $(this).attr('data-user');

      socket.emit('give-control', { nick: userToGive });
    });
  };

  //remove a user from the user list.
  codeSoar.removeUser = function(userNick) {
    $(".user[data-user="+userNick+"]").remove();
  };

  codeSoar.addMessage = function(userNick, userMsg) {
    $("#chatMsgs").append('<li class="msg"><strong>'+userNick+': </strong>'+userMsg+'</li>');
  };

  codeSoar.controlRequested = function(userNick) {
    var popoverObj = codeSoar.htmlPrototypes.ControlRequestNotification;


    popoverObj = popoverObj.replace(/userNick/g, userNick);

    $(".user[data-user="+userNick+"] > span").prepend(popoverObj);

    $(".docReq[data-user="+userNick+"]").popover({html: true, trigger: 'manual', container: '#editor'}).click(function(e) {
      $(this).popover('show');

      setTimeout(function() {
        $(".docReq[data-user="+userNick+"]").popover('hide');
      }, 3500);

    });

    $(".docReq[data-user="+userNick+"]").popover('show');

    setTimeout(function() {
       $(".docReq[data-user="+userNick+"]").popover('hide');
    }, 3500);
  };

  codeSoar.setController = function(userNick) {

    $(".popover").remove();
    //remove user decorations
    $(".user > span > span").remove();

    $(".user > span > a").remove();
    $(".user > a").remove();

    codeSoar.hasControl = false;

    if (userNick == codeSoar.nick) {
      codeSoar.hasControl = true;
      codeSoar.disableControlRequest();

      $(".user").each(function() {

        var thisUsersNick = $(this).attr("data-user");

        if(thisUsersNick != codeSoar.nick){

        var giveCtrlBtn = codeSoar.htmlPrototypes.GiveControlButton;

        giveCtrlBtn = giveCtrlBtn.replace(/userNick/g, thisUsersNick);

        $(this).append(giveCtrlBtn);

        codeSoar.setupGiveControllButtons();

        }
      });
    } else {
      codeSoar.enableControlRequest();
    }


    codeSoar.applyControl();

    //set user to be controller
    $(".user[data-user="+userNick+"] > span").append('  <span class="badge badge-inverse"><i class="icon-pencil icon-white"></i></span>');
  };

  codeSoar.enableControlRequest = function() {
    $("#requestCtrlBtn").removeClass("disabled");
  };

  codeSoar.disableControlRequest = function() {
    $("#requestCtrlBtn").addClass("disabled");
  };

  codeSoar.applyControl = function() {
    if (this.hasControl) {

      codeSoar.editor.setReadOnly(false);
    }
    else
    {

      codeSoar.editor.setReadOnly(true);

    }
  };

  codeSoar.nick = '';


  var socket;

  codeSoar.setup = function() {


    socket = io.connect("codesoar-nodejshost.rhcloud.com:8000");
    socket.emit('join', { room: codeSoar.docID, nick: $("#nickInput").val() });



    //user joined
    socket.on('user-joined', function(data) {
      //data: {nick: 'usersNick'}
      codeSoar.addUser(data.nick);
    });


    socket.on('user-left', function(data) {
      //data: {nick: 'userNick', controlOpen: true/false}

      codeSoar.removeUser(data.nick);

      if (data.controlOpen) {
        codeSoar.enableControlRequest();
      }

    });


    socket.on('join', function(data) {

      codeSoar.nick = data.realNick;
      codeSoar.hasControl = data.hasControl;

      //add self to list of users
      codeSoar.addUser(codeSoar.nick);

      //add other users in room
      $.each(data.users, function(index, value) {
        codeSoar.addUser(value);
      });

      if(data.hasControl) {
        $(".user[data-user="+codeSoar.nick+"] > span").append('  <span class="badge badge-inverse"><i class="icon-pencil icon-white"></i></span>');
      }
      else {
        $(".user[data-user="+data.controller+"] > span").append('  <span class="badge badge-inverse"><i class="icon-pencil icon-white"></i></span>');
      }
      codeSoar.applyControl();

      if(!codeSoar.hasControl) {
        codeSoar.enableControlRequest();
      }

      //set editor to visible
      $("#editor").css("visibility", "visible");

      updateContainer();

    });

    socket.on('msg', function(data) {

      codeSoar.addMessage(data.nick, data.msg);
      //   $("#chat").scrollTop() + $("#chat").height();
      //$('#chat').scrollTop($('#chat').height());
      $("#chat").animate({scrollTop: $("#chat").prop("scrollHeight") - $("#chat").height()}, 0);
    });


    socket.on('control-taken', function(data) {
      codeSoar.setController(data.nick);
    });

    socket.on('control-requested', function(data) {
      codeSoar.controlRequested(data.nick);
    });


    socket.on('change', function(data) {
      if (!codeSoar.hasControl) {
        codeSoar.editor.getSession().getDocument().applyDeltas([JSON.parse(data)]);
      }
      else {
        //huh?
        alert("need to refactor some, out of synch");
      }
    });

  }


  $("#displayNameModal").on('hide', codeSoar.setup);


  $("#displayNameModal").modal('show');


  codeSoar.editor.getSession().on('change', function(data) {
    if (codeSoar.hasControl) {
      socket.emit('change', JSON.stringify(data.data));
    }
  });


  updateContainer();

  $(window).resize(function() {
    updateContainer();
  });

  $("#chatText").bind('keypress', function (e) {
    if ((e.keyCode || e.which) == 13) {
      if ($("#chatText").val() != '') {
        socket.emit('chat', $("#chatText").val());

        $("#chatText").val('');
      }
    }
  });

  $("#requestCtrlBtn").click(function() {
  if($(this).hasClass("disabled")) {
  return;
  }
  socket.emit('control-request');
  });


  // function postChange()

  function updateContainer() {
  $("#chatContainer").height($(document).height() - $("#users").height() - parseInt($("#users").css("margin-top")) - $("#controls").height() - parseInt($("#controls").css("margin-top")) - $(".user").length -$("#chatText").height() - $("#chatText").height() - 4);

    //  $("#chatText").css("left", $("#editor").width());

    $("#chat").height($("#chatContainer").height() - $("#chatText").height());

    //note, $(".user").length is subject to change
  }

});
