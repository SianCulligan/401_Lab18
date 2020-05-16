'use strict';

const io = require('socket.io')(3000);
const cspsIO = io.of('/csps');

io.on('connection', (socket) => {
  console.log('Received connection from', socket.id);
});

cspsIO.on('connection', (socket) => {
  console.log('Received csps connection from', socket.id);

  socket.on('join', (payload) => {
    socket.join(payload);
  });
  //listen for pickup and log something
  socket.on('pickup', (payload) => {
    console.log(payload);
    //driver needs this info
    cspsIO.to('driver').emit('pickup', payload);
  });

  socket.on('delivered', (payload) => {
    cspsIO.to(payload.store).emit('delivered', payload);
  });
});

