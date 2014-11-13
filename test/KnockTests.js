'use strict';

var http = require('http');

var assert = require('node-assertthat');

var Knock = require('../lib/Knock');

suite('Knock', function () {
  test('is a function.', function (done) {
    assert.that(Knock, is.ofType('function'));
    done();
  });

  test('returns an object.', function (done) {
    assert.that(new Knock(), is.ofType('object'));
    done();
  });

  suite('at', function () {
    test('is a function.', function (done) {
      var knock = new Knock();
      assert.that(knock.at, is.ofType('function'));
      done();
    });

    test('returns an error if host is not reachable.', function (done) {
      var knock = new Knock();
      knock.maximallyKnockFor = 1 * 1000;
      knock.at('localhost', 3000, function (err) {
        assert.that(err, is.not.null());
        done();
      });
    });

    test('does not return an error if host is reachable.', function (done) {
      var knock = new Knock();
      http.createServer(function () {}).listen(3001, function () {
        knock.at('localhost', 3001, function (err) {
          assert.that(err, is.null());
          done();
        });
      });
    });

    test('waits until a host becomes reachable.', function (done) {
      var knock = new Knock();
      this.timeout(3 * 1000);
      knock.at('localhost', 3002, function (err) {
        assert.that(err, is.null());
        done();
      });

      setTimeout(function () {
        http.createServer(function () {}).listen(3002);
      }, 1 * 1000);
    });
  });
});
