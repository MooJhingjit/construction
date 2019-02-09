let io = require('socket.io')();
const socketStartUp = function (server) {
    io.attach(server);
    io.on('connection', function (socket) {
      socket.on('UPDATE_ORDERING', function(data) {
        // console.log('UPDATE_PRODUCT')
        io.emit('UPDATE_ORDERING')
      });
      socket.on('UPDATE_ORDERING_STATUS', function(data) {
        io.emit('UPDATE_ORDERING_STATUS')
      });
    })
}
module.exports = {socketStartUp};