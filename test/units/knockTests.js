'use strict';

const http = require('http');

const assert = require('assertthat');

const knock = require('../../lib/knock');

suite('knock', () => {
  test('is an object.', done => {
    assert.that(knock).is.ofType('object');
    done();
  });

  suite('at', function () {
    this.timeout(3 * 1000);

    test('is a function.', done => {
      assert.that(knock.at).is.ofType('function');
      done();
    });

    suite('promise', () => {
      test('returns an error if host is not reachable.', async () => {
        assert.that(async () => {
          await knock.at('localhost', 3000, { retries: 1 });
        }).is.throwingAsync();
      });

      test('does not return an error if host is reachable.', done => {
        http.createServer().listen(3003, async () => {
          await knock.at('localhost', 3003);

          done();
        });
      });

      test('waits until a host becomes reachable.', async () => {
        setTimeout(() => {
          http.createServer().listen(3004);
        }, 1 * 1000);

        await knock.at('localhost', 3004);
      });
    });
  });
});
