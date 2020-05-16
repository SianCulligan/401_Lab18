'use strict';

const io = require('socket.io-client');
const driverSocket = io.connect('http://localhost:3000/csps');

driverSocket.emit('join', 'driver');

driverSocket.on('pickup', (payload) => {
  console.log('picked up order', payload.orderId);
  setTimeout(() => {
    driverSocket.emit('in-transit', payload.orderId);
    console.log('in-transit',  payload.orderId);

    setTimeout(() => {
      //1035
      driverSocket.emit('delivered', payload);
    }, 3000);
  }, 1000);
});