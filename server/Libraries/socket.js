let io = require('socket.io')();
const socketStartUp = function (server) {
    io.attach(server);
    io.on('connection', function (socket) {
      socket.on('UPDATE_ORDERING', function(data) {
        // console.log('UPDATE_PRODUCT')
        io.emit('UPDATE_ORDERING')
      });
      // socket.on('UPDATE_NOTIFICATION', function(data) {
      //   io.emit('UPDATE_NOTIFICATION')
      // });
    })
}
module.exports = {socketStartUp};