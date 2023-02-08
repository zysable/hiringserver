const {Server} = require('socket.io');
const chatController = require('./chatcontroller')
module.exports = server => {
  const io = new Server(server, {
    cors: {
      origin: true,
      credentials: true
    }
  });
  io.on('connection', socket => {
    console.log('a user connected');
    socket.on('sendMsg', data => {
      chatController.getChatMsg(data, io);
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};