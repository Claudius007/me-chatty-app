var express = require("express"),
  app = express(),
  server = require("http").createServer(app),
  io = require("socket.io").listen(server);

//port
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Server running..." + port);

//page routing
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//connection to websocket
io.sockets.on('connection', function (socket) {
  console.log('Socket Connected...');

  // Send Message
  socket.on('send message', function (data) {
    io.sockets.emit('new message', {
      msg: data
    });
  });
});