'use strict';

require('babel-polyfill');

const net = require('net');

const retry = require('retry');

const knock = {};

knock.retries = 60;

knock.at = function (host, port, options) {
  options = options || {};
  options.retries = options.retries || knock.retries;

  return new Promise((resolve, reject) => {
    const operation = retry.operation({
      retries: options.retries,
      factor: 1,
      minTimeout: 2 * 1000,
      maxTimeout: 2 * 1000
    });

    operation.attempt(() => {
      const client = net.connect(port, host);

      client.setTimeout(2 * 1000);

      client.once('error', err => {
        client.end();
        client.destroy();
        client.removeAllListeners();
        if (operation.retry(err)) {
          return;
        }

        reject(err ? operation.mainError() : null);
      });

      client.once('connect', () => {
        client.end();
        client.destroy();
        client.removeAllListeners();
        resolve(null);
      });
    });
  });
};

module.exports = knock;
