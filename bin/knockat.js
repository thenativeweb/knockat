#!/usr/bin/env node

'use strict';

var knock = require('../lib/knock');

var host = process.argv[2],
    port = process.argv[3] - 0;

knock.at(host, port, function (err) {
  if (err) {
    /*eslint-disable no-process-exit*/
    return process.exit(1);
    /*eslint-enable no-process-exit*/
  }

  /*eslint-disable no-process-exit*/
  process.exit(0);
  /*eslint-enable no-process-exit*/
});