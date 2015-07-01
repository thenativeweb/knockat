'use strict';

var net = require('net');

var retry = require('retry');

var knock = {};

knock.retries = 60;

knock.at = function (host, port, options, callback) {
  var operation;

  if (!callback) {
    callback = options;
    options = undefined;
  }

  options = options || {};
  options.retries = options.retries || knock.retries;

  operation = retry.operation({
    retries: options.retries,
    factor: 1,
    minTimeout: 2 * 1000,
    maxTimeout: 2 * 1000
  });

  operation.attempt(function () {
    var client = net.connect(port, host);

    client.setTimeout(2 * 1000);

    client.once('error', function (err) {
      client.end();
      client.destroy();
      client.removeAllListeners();
      if (operation.retry(err)) {
        return;
      }
      callback(err ? operation.mainError() : null);
    });

    client.once('connect', function () {
      client.end();
      client.destroy();
      client.removeAllListeners();
      callback(null);
    });
  });
};

module.exports = knock;
