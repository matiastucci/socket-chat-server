var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('chat server');
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

http.listen(3000, function(){
  console.log('listening on *:3000');
});