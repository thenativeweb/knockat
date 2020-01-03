import net from 'net';
import { retry } from 'retry-ignore-abort';

export interface KnockOptions {
  retries?: number;
}

const knock = {
  retries: 60,
  async at (host: string, port: number, options: KnockOptions = {}): Promise<void> {
    const optionsWithDefaults = {
      retries: options.retries ?? this.retries
    };

    await retry(async (): Promise<void> =>
      new Promise((resolve, reject): void => {
        const client = net.connect(port, host);

        client.setTimeout(2 * 1000);

        let onConnect: () => void,
            onError: (err: Error) => void;

        const unsubscribe = function (): void {
          client.end();
          client.destroy();

          client.removeListener('connect', onConnect);
          client.removeListener('error', onError);
        };

        onConnect = function (): void {
          unsubscribe();
          resolve();
        };

        onError = function (err: Error): void {
          unsubscribe();
          reject(err);
        };

        client.on('connect', onConnect);
        client.on('error', onError);
      }),
    {
      retries: optionsWithDefaults.retries,
      factor: 1,
      minTimeout: 2 * 1000,
      maxTimeout: 2 * 1000
    });
  }
};

export { knock };
