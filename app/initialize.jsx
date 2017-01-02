import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client'; // eslint-disable-line import/no-extraneous-dependencies
import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.querySelector('#app'));
});


const socket = io();
window.mysocket = socket;
socket.on('message', (msg) => {
  console.log(msg);
});
socket.on('loaded', () => {
  console.log('everyone is ready!');
});
socket.on('loading', () => {
  console.log('someone is not ready');
});
