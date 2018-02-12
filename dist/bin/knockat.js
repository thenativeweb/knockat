#!/usr/bin/env node


'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var knock = require('../knock');

var host = process.argv[2],
    port = process.argv[3] - 0;

(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return knock.at(host, port);

        case 3:

          /* eslint-disable no-process-exit */
          process.exit(0);
          /* eslint-enable no-process-exit */
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context['catch'](0);
          return _context.abrupt('return', process.exit(1));

        case 9:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined, [[0, 6]]);
}))();