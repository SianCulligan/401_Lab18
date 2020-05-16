'use strict';

const faker = require('faker');
const sioc = require('socket.io-client');
const socket = sioc.connect('http://localhost:3000');


setInterval(() => {
  let message = faker.random.word();
  socket.emit('pickup', message);
}, 5000);

socket.on('pickup-heard', (payload) => {
  console.log('picked up order', payload.orderID);
});

socket.on('delivery-heard', (payload) => {
  console.log('delivered order', payload.orderID);
});

socket.on('flower-shop', (payload) => {
  console.log('Payload', payload);
});













// const net = require('net');
// const socket = new net.Socket();

// socket.connect({port: 3000, host: 'localhost'}, () => {
//   console.log(`Driver is now connected to TCP Socket Server!`);
// });


// //this prints "Picked up order ###" to driver.js
// socket.on('data', (payload) =>  {
// // console.log('got', JSON.parse(payload.toString()));
//   let parsed = JSON.parse(payload.toString());

//   if (parsed.event === 'pickup'){
//     setTimeout(() => {
//       let newPayload = { event: 'in-transit', order: parsed.order };
//       console.log('Picked up order ', parsed.order.id);
//       socket.write(JSON.stringify(newPayload));
//     }, 1000);
//   }

//   if (parsed.event === 'in-transit') {
//     setTimeout (() => {
//       let newPayload = { event: 'delivered', order: parsed.order };
//       console.log('Delivered order', parsed.order.id);
//       socket.write(JSON.stringify(newPayload));
//     }, 3000);
//   }});