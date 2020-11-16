import { assert } from 'assertthat';
import http from 'http';
import { knock } from '../../lib/knock';

suite('knock', (): void => {
  test('is an object.', async (): Promise<void> => {
    assert.that(knock).is.ofType('object');
  });

  suite('at', function (): void {
    this.timeout(3_000);

    suite('promise', (): void => {
      test('returns an error if host is not reachable.', async (): Promise<void> => {
        await assert.that(async (): Promise<void> => {
          await knock.at('localhost', 3_000, { retries: 1 });
        }).is.throwingAsync();
      });

      test('does not return an error if host is reachable.', async (): Promise<void> => {
        http.createServer().listen(3_003, async (): Promise<void> => {
          await knock.at('localhost', 3_003);
        });
      });

      test('waits until a host becomes reachable.', async (): Promise<void> => {
        setTimeout((): void => {
          http.createServer().listen(3_004);
        }, 1_000);

        await knock.at('localhost', 3_004);
      });
    });
  });
});
