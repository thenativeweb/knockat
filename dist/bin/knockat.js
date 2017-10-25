#!/usr/bin/env node


'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var knock = require('../knock');

var host = process.argv[2],
    port = process.argv[3] - 0;

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
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