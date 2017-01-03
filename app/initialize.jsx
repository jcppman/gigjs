import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import App from './components/App';
import Resource from './components/Resource';
import setup from './setup.config';
import bus from './bus';

document.addEventListener('DOMContentLoaded', () => {
  const {
    interfaces,
    scenes,
  } = setup;

  const route = location.pathname.replace(/\//g, '') || 'control';
  const view = interfaces[route] || '';

  ReactDOM.render(<App scenes={scenes} view={view} />, document.querySelector('#app'));
});

Resource.allResourcesLoaded().then(() => {
  bus.toServer('loaded');
});

bus.on('loaded', () => {
  console.log('everyone is loaded');
});

bus.on('loading', () => {
  console.log('someone is loading');
});
