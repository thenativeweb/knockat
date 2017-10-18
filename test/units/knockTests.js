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

    suite('callback', () => {
      test('returns an error if host is not reachable.', done => {
        knock.at('localhost', 3000, { retries: 1 }, err => {
          assert.that(err).is.not.null();
          done();
        });
      });

      test('does not return an error if host is reachable.', done => {
        http.createServer().listen(3001, () => {
          knock.at('localhost', 3001, err => {
            assert.that(err).is.null();
            done();
          });
        });
      });

      test('waits until a host becomes reachable.', done => {
        knock.at('localhost', 3002, err => {
          assert.that(err).is.null();
          done();
        });

        setTimeout(() => {
          http.createServer().listen(3002);
        }, 1 * 1000);
      });
    });

    suite('promise', () => {
      test('returns an error if host is not reachable.', async () => {
        try {
          await knock.at('localhost', 3000, { retries: 1 });
          throw new Error('Should not succeed');
        } catch (err) {
          assert.that(err).is.not.null();
        }
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
