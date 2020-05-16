'use strict';

const io = require('socket.io-client');
const faker = require('faker');
const flowerSocket =  io.connect('http://localhost:3000/csps');
const candySocket =  io.connect('http://localhost:3000/csps');


flowerSocket.emit('join', 'flower-shop');

candySocket.emit('join', 'candy-shop');

flowerSocket.on('delivered', (payload) => {
    console.log('Flower Shop Says: Thank you for delivering', payload.orderId);
});

candySocket.on('delivered', (payload) => {
    console.log('Candy Shop Says: Thank you for delivering', payload.orderId);
});

setInterval(() => {
    let order = {
      store: 'flower-shop',
      id: faker.random.uuid(),
      customer: faker.name.firstName() + ' ' + faker.name.lastName(),
      address: faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.state(),
    };
    flowerSocket.emit('pickup', order);
}, 5000);

setTimeout(() => {
setInterval(() => {
    let order = {
        store: 'candy-shop',
        id: faker.random.uuid(),
        customer: faker.name.firstName() + ' ' + faker.name.lastName(),
        address: faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.state(),
      };
      candySocket.emit('pickup', order);
}, 5000);
}, 1100);

