#!/usr/bin/env node

import knock from '../knock';

const host = process.argv[2],
      port = Number(process.argv[3]);

/* eslint-disable @typescript-eslint/no-floating-promises */
(async (): Promise<void> => {
  try {
    await knock.at(host, port);

    /* eslint-disable no-process-exit */
    process.exit(0);
    /* eslint-enable no-process-exit */
  } catch {
    /* eslint-disable no-process-exit */
    return process.exit(1);
    /* eslint-enable no-process-exit */
  }
})();
/* eslint-enable @typescript-eslint/no-floating-promises */
