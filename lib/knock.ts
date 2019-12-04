import net from 'net';
import retry from 'retry';

export interface KnockOptions {
  retries?: number;
}

const knock = {
  retries: 60,
  async at (host: string, port: number, options: KnockOptions = {}): Promise<void> {
    const optionsWithDefaults = {
      retries: options.retries ?? this.retries
    };

    return new Promise((resolve, reject): void => {
      const operation = retry.operation({
        retries: optionsWithDefaults.retries,
        factor: 1,
        minTimeout: 2 * 1000,
        maxTimeout: 2 * 1000
      });

      operation.attempt((): void => {
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

          if (operation.retry(err)) {
            return;
          }

          reject(operation.mainError());
        };

        client.on('connect', onConnect);
        client.on('error', onError);
      });
    });
  }
};

export { knock };
