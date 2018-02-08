'use strict';

require('babel-polyfill');

var net = require('net');

var retry = require('retry');

var knock = {};

knock.retries = 60;

knock.at = function (host, port, options) {
  options = options || {};
  options.retries = options.retries || knock.retries;

  return new Promise(function (resolve, reject) {
    var operation = retry.operation({
      retries: options.retries,
      factor: 1,
      minTimeout: 2 * 1000,
      maxTimeout: 2 * 1000
    });

    operation.attempt(function () {
      var client = net.connect(port, host);

      client.setTimeout(2 * 1000);

      var onConnect = void 0,
          onError = void 0;

      var unsubscribe = function unsubscribe() {
        client.end();
        client.destroy();

        client.removeListener('connect', onConnect);
        client.removeListener('error', onError);
      };

      onConnect = function onConnect() {
        unsubscribe();
        resolve(null);
      };

      onError = function onError(err) {
        unsubscribe();

        if (operation.retry(err)) {
          return;
        }

        reject(err ? operation.mainError() : null);
      };

      client.on('connect', onConnect);
      client.on('error', onError);
    });
  });
};

module.exports = knock;