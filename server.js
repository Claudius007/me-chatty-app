var express = require('express'),
    app = express(),
    server = require('https').createServer(app),
    io = require('socket.io').listen(server);

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Server running...' + port)

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')

});