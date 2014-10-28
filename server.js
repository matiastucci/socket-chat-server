var app   = require('express')();
var http  = require('http').Server(app);
var io    = require('socket.io')(http);

var port  = process.env.PORT || 8080;

app.get('/', function(req, res){
  res.send('welcome to my chat server');
});

io.on('connection', function(socket){

  var username = '';

  socket.on('new user', function(newUsername){
    username = newUsername;
    io.emit('new user', newUsername);
  });

  socket.on('chat message', function(msg,username){
    var response = {
      content: msg,
      username:username
    };
    io.emit('chat message', response);
  });

  socket.on('disconnect', function(){
    io.emit('user disconnected',username);
  });

});

http.listen(port, function(){
  console.log('listening on *:'+port);
});