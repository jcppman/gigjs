const Path = require('path');
const Http = require('http');
const express = require('express');
const morgan = require('morgan');
const socketIo = require('socket.io');
const staticServe = require('serve-static');
const fallback = require('express-history-api-fallback');
const now = require('lodash/now');
const keys = require('lodash/keys');

module.exports = function AppServer(port, path, callback) {
  // setup static
  const app = express();
  app
    .use(morgan('combined'))
    .use(staticServe(path, {
      fallthrough: true,
    }))
    .use(staticServe(Path.resolve('gig'), {
      fallthrough: true,
    }))
    .use(fallback(Path.resolve(path, 'index.html')));

  const server = Http.Server(app);

  // setup socket
  const loading = {};
  const io = socketIo(server);
  io
    .on('connection', (socket) => {
      loading[socket.id] = true;
      io.emit('loading', now());

      socket.on('message', (msg) => {
        io.emit('message', msg);
      });
      socket.on('loaded', () => {
        delete loading[socket.id];
        if (!keys(loading).length) {
          io.emit('loaded', now());
        }
      });
      socket.on('disconnect', () => {
        delete loading[socket.id];
        if (!keys(loading).length) {
          io.emit('loaded', now());
        }
      });
    });

  server.listen(port, callback);
};

