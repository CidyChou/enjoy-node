const EventEmitter = require('events');

class App extends EventEmitter {}

const a = new App();
a.on('hhh', () => {
    console.log('aaa');
});

a.emit('hhh');