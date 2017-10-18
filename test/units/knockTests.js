'use strict';

var http = require('http');

var assert = require('assertthat');

var knock = require('../../lib/knock');

suite('knock', function () {
  test('is an object.', function (done) {
    assert.that(knock).is.ofType('object');
    done();
  });

  suite('at', function () {
    this.timeout(3 * 1000);

    test('is a function.', function (done) {
      assert.that(knock.at).is.ofType('function');
      done();
    });

    test('returns an error if host is not reachable.', function (done) {
      knock.at('localhost', 3000, { retries: 1 }, function (err) {
        assert.that(err).is.not.null();
        done();
      });
    });

    test('does not return an error if host is reachable.', function (done) {
      http.createServer(function () {}).listen(3001, function () {
        knock.at('localhost', 3001, function (err) {
          assert.that(err).is.null();
          done();
        });
      });
    });

    test('waits until a host becomes reachable.', function (done) {
      knock.at('localhost', 3002, function (err) {
        assert.that(err).is.null();
        done();
      });

      setTimeout(function () {
        http.createServer(function () {}).listen(3002);
      }, 1 * 1000);
    });
  });
});
