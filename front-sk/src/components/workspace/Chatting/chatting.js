var io = require('socket.io');
var socket = io.connect("http://70.12.246.89:8210", {
    transports: ["websocket"]
  });

io.on('connection', (socket) => {
    console.log("Hello Connected");
})