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
        displayPosts(data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  };
  var latestID = 0;
  var displayPosts = function(data){
    var messages = [];
    
    for (var i = 0; i < data.length; i++) {
      if(data[i]['messageId'] > latestID){
        var username = data[i]['username'];
        var text = data[i]['text'];
        if(username !== undefined || text !== undefined){
          messages.push('<p>' + username + ': ' + text+ '</p>');
        }
        latestID = data[i]['messageId'];
      }
    }

    $('.posts').prepend(messages);
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
      messageId: 1,
      username: newUser,
      text: message,
    };
      sendPosts(JSON.stringify(messageObj));
  });

  $('#back').on('click', function(){
    $('#currentRoom').text('').hide();
    $('.rooms ul').show();
    $('#back').hide();
    $('.newRoom').show();
    $('p').show();
  });

  getPosts();
  setInterval(getPosts, 4000)

});