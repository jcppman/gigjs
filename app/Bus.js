import EventEmitter from 'eventemitter2';
import io from 'socket.io-client';

const socket = io();

const bus = new EventEmitter({
  wildcard: true,
});

bus.toServer = (...args) => {
  socket.emit(...args);
};

bus.on('*', function onEvent(msg, doBroadcast = true) {
  if (doBroadcast) {
    socket.emit('broadcast', this.event, msg);
  }
});

socket.on('broadcast', (event, msg) => {
  bus.emit(event, msg, false);
});

socket.on('loaded', () => {
  bus.emit('loaded', null, false);
});

socket.on('loading', () => {
  bus.emit('loading', null, false);
});

export default bus;
