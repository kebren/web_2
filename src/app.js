const { createServer } = require('http');
const { existsSync, mkdirSync } = require('fs');

const { host, port } = require('./config');
const app = require('./server');
const { testConnection, prepareDatabase } = require('./db');

const server = createServer(app);

function start() {
  server.listen(+port, host, () => console.log(`Server listening on ${host}:${port}`));
}

function stop(callback) {
  server.close((err) => {
    if (err) {
      console.error(err, 'Failed to close server!');
      callback(err);
      return;
    }

    console.log('Server has been stopped.');
    callback();
  });
}

function enableGracefulExit() {
  const exitHandler = (error) => {
    if (error) console.error(error);

    console.log('Graceful stopping...');
    stop(() => {
      process.exit();
    });
  };

  process.on('SIGINT', exitHandler);
  process.on('SIGTERM', exitHandler);

  process.on('SIGUSR1', exitHandler);
  process.on('SIGUSR2', exitHandler);

  process.on('uncaugthException', exitHandler);
  process.on('unhandledRejection', exitHandler);
}

async function boot() {
  enableGracefulExit();
  await testConnection();
  if (!existsSync('./src/server/public/images')) mkdirSync('./src/server/public/images');
  await prepareDatabase();
  start();
}

boot();
