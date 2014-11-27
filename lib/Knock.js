'use strict';

var net = require('net');

var Knock = function () {
  this.shouldKnock = true;

  this.maximallyKnockFor = 2 * 60 * 1000;
  this.timeBetweenKnocks = 2 * 1000;
};

Knock.prototype.at = function (host, port, callback) {
  var that = this;

  setTimeout(function () {
    that.shouldKnock = false;
    callback(new Error('Waited too long.'));
  }, that.maximallyKnockFor);

  that.ping(host, port, callback);
};

Knock.prototype.ping = function (host, port, callback) {
  var that = this;

  var client = net.connect(port, host);

  client.setTimeout(that.timeBetweenKnocks, function () {
    client.removeAllListeners();
    if (that.shouldKnock) {
      that.ping(host, port, callback);
    }
  });

  client.once('error', function () {
    client.removeAllListeners();
    setTimeout(function () {
      if (that.shouldKnock) {
        that.ping(host, port, callback);
      }
    }, that.timeBetweenKnocks);
  });

  client.once('connect', function () {
    that.shouldKnock = false;
    client.removeAllListeners();
    callback(null);
  });
};

module.exports = Knock;
