$(document).ready(function(){

  var sendPosts = function(message){
    $.ajax({
    url: 'http://127.0.0.1:3000',
    type: 'POST',
    data: message,
    contentType: 'text/plain',
    success: function (data) {
      console.log(data);
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};

  var getPosts = function(){
    
    $.ajax({
      url: 'http://127.0.0.1:3000',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        // console.log(data);
        displayPosts(data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  };

  var displayPosts = function(data){
    console.log(data);
    console.log(typeof data);
    console.log(typeof data[0]);
    // var parsedData = JSON.parse(data[0]);
    var messages = [];
    var roomNames = {};
    var rooms = [];
    // console.log(typeof data);
    for (var i = 0; i < data.length; i++) {
      //populating room name object
      if(data[i]['roomname']){
        roomNames[data[i]['roomname']] = true;
      }
      var username = data[i]['username'];
      var text = data[i]['text'];
      if(username !== undefined || text !== undefined){
        messages.push('<p class = "'+ data[i]['roomname'] +'">' + data[i]['roomname'] + username + ': ' + text+ '</p>');
      }
    }

    for(var keys in roomNames){
      rooms.push("<li>"+keys+"</li>");
    }
    $('.posts').prepend(messages);
    $('.rooms ul').html(rooms);
    var currentRoom = $('#currentRoom').text();
    if(currentRoom){
      $('p[class!='+ currentRoom +']').hide();
    }
  };

  var validateData = function(data){
    if(typeof data === 'string'){
      if(data.charAt(0) === '<'){
        return false;
      }else{
        return true;
      }
    }

  };

  var newUser;
 $('#joined').on('click',function(){
    newUser = $('#name').val();
    $('.enterName').hide();
    $('#userName').append('<h3>'+ newUser + '</h3>');
    $('.enterMessage').show();
  });

  $('#send').on('click',function(){
    var message = $('#message').val();
    var messageObj = {
      username: newUser,
      text: message,
      roomname: $('#currentRoom').text() || undefined
    };
    sendPosts(JSON.stringify(messageObj));

    console.log(JSON.stringify(messageObj));
  });

  $('.rooms ul').on('click', 'li', function(){
    console.log($(this).text());
    $('#currentRoom').text($(this).text()).show();
    $('.rooms ul').hide();
    $('.newRoom').hide();
    $('#back').show();
    var currentRoomName = $(this).text();
    $('p').each(function(currentRoomName){
      if(!$(this).hasClass(currentRoomName)){
        $(this).hide();
      }
    });
  });

  $('#back').on('click', function(){
    $('#currentRoom').text('').hide();
    $('.rooms ul').show();
    $('#back').hide();
    $('.newRoom').show();
    $('p').show();
  });

  $('#create').on('click', function(){
    $('#currentRoom').text($('#newRoom').val());
   $('.rooms ul').hide();
    $('.newRoom').hide();
    $('#back').show();

  });

  getPosts();

  setTimeout(getPosts, 15000)

});