var app = require("express")();
//app = express(),
var server = require("http").createServer(app),
  io = require("socket.io").listen(server);

  usernames = [];

//port
var port = process.env.PORT || 3000;
server.listen(port);
console.log("Server running..." + port);

//page routing
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//connection to websocket
io.sockets.on('connection', function (socket) {
  console.log('Socket Connected...');
  //add username
  socket.on('add user', function (data, callback) {
    if (usernames.indexOf(data) != -1) {
      callback(false)
    }
    else {
      callback(true)
      socket.username = data
      usernames.push(socket.username)
      updateUsernames()
    }
    
    //function to update usernames 
    // this function is responsible for displaying usernames on the sidebar
    function updateUsernames() {
      io.sockets.emit('usernames', usernames)
    }
  });
  // Send Message
  socket.on('send message', function (data) {
    io.sockets.emit('new message', {
      msg: data
    });
  
  });
  // function to handle disconnect event
  socket.on('disconnect', function (data) {
    if (!socket.username) {
      return;
    }
    usernames.splice(usernames.indexOf(socket.username), 1);
    updateUsernames();
  }); 
});