'use strict';

const sio = require('socket.io');
const server = sio(3000);
// const net = require('net');
// const server = net.createServer();

// let socketPool = [];
// let port = process.env.PORT || 3000;

// server.listen(port, () => {
//   console.log('Server is up & running on port', port);
// });
server.on('connection', (socket) => {
  console.log('Received connection from', socket.id);
  socket.join('flower-shop');
  
  socket.on('pickup', (payload) => {
    console.log('pickup', payload.toLowerCase(),);
    server.emit('pickup', logger);
  });
});

const messagesServer = server.of('/messages');
messagesServer.on('connection', (socket) => {
  socket.join('flower-shop');

  // socket.on('delivered', (payload) => {
  //   console.log('MESSAGES SHOUT', payload.toUpperCase(), '!');
  //   messagesServer.emit('shout-heard', payload);
  //   messagesServer
  //     .to('flower-shop')
  //     .emit('room-secret', 'secret');
  // });
});






const logger = (payload) => {
  // console.log('got', JSON.parse(payload.toString()));
  let parsed = JSON.parse(payload.toString());
  // for(let i = 0; i < socketPool.length; i++) {
  //   let socket = socketPool[i];
  //   socket.write(payload);
  // }
  
  if(parsed.event === 'pickup') {
    console.log('pickup');
    console.log('- Time: ', new Date());
    console.log('- Store: ', parsed.order.store);
    console.log('- Order ID: ', parsed.order.id);
    console.log('- Customer: ', parsed.order.name);
    console.log('- Address: ', parsed.order.address);
  }

  if (parsed.event === 'in-transit') {
    console.log('In transid, order ', parsed.order.id);
  }
  if (parsed.event === 'Delivered') {
    console.log('Delivered order ', parsed.order.id);
  }
};

// server.on('connection', (socket) => {
//   //socket pool
//   console.log('Received connection from', socket.address());
//   socketPool.push(socket);
//   socket.on('data', (logger));
// });
