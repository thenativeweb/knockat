'use strict';

const net = require('net');

const retry = require('retry');

const knock = {};

knock.retries = 60;

const knockAt = function (host, port, options) {
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

knock.at = function (host, port, options, callback) {
  if (!callback) {
    if (typeof options === 'function') {
      callback = options;
      options = undefined;
    }
  }

  options = options || {};
  options.retries = options.retries || knock.retries;

  if (callback) {
    knockAt(host, port, options).
      then(() => callback(null)).
      catch(err => callback(err));
  } else {
    return knockAt(host, port, options);
  }
};

module.exports = knock;
