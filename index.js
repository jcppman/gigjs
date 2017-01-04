require('./server/app')(3333, 'public', () => {
  console.log('listening to port 3333');
});

