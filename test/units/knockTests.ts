import assert from 'assertthat';
import http from 'http';
import knock from '../../lib/knock';

suite('knock', (): void => {
  test('is an object.', async (): Promise<void> => {
    assert.that(knock).is.ofType('object');
  });

  suite('at', function (): void {
    this.timeout(3 * 1000);

    suite('promise', (): void => {
      test('returns an error if host is not reachable.', async (): Promise<void> => {
        await assert.that(async (): Promise<void> => {
          await knock.at('localhost', 3000, { retries: 1 });
        }).is.throwingAsync();
      });

      test('does not return an error if host is reachable.', async (): Promise<void> => {
        http.createServer().listen(3003, async (): Promise<void> => {
          await knock.at('localhost', 3003);
        });
      });

      test('waits until a host becomes reachable.', async (): Promise<void> => {
        setTimeout((): void => {
          http.createServer().listen(3004);
        }, 1 * 1000);

        await knock.at('localhost', 3004);
      });
    });
  });
});
