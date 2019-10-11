# knockat

knockat waits until a host is reachable.

## Status

| Category         | Status                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Version          | [![npm](https://img.shields.io/npm/v/knockat)](https://www.npmjs.com/package/knockat)                                                      |
| Dependencies     | ![David](https://img.shields.io/david/thenativeweb/knockat)                                                                                |
| Dev dependencies | ![David](https://img.shields.io/david/dev/thenativeweb/knockat)                                                                            |
| Build            | [![CircleCI](https://img.shields.io/circleci/build/github/thenativeweb/knockat)](https://circleci.com/gh/thenativeweb/knockat/tree/master) |
| License          | ![GitHub](https://img.shields.io/github/license/thenativeweb/knockat)                                                                      |

## Installation

### As CLI

```shell
$ npm install -g knockat
```

### In Node.js

```shell
$ npm install knockat
```

## Quick start

When you run knockat (either as CLI or using Node.js), it uses the following algorithm to detect whether the given host is reachable.

- If the host is reachable, the module returns immediately.
- If the host is not reachable, knockat retries to reach the host every two seconds.
- If the host is not reachable within 60 retries, knockat fails.

### As CLI

Run `knockat` and provide the host as well as the port you want to knock at as parameters.

```shell
$ knockat localhost 3000
```

If the host is reachable, knockat returns with exit code `0`, otherwise with exit code `1`.

### In Node.js

First you need to add a reference to knockat in your application.

```javascript
const knock = require('knockat').default;
```

If you use TypeScript, use the following code instead:

```typescript
import knock from 'knockat';
```

Then, call its `at` function and provide the host as well as the port you want to knock at.

```javascript
await knock.at('localhost', 3000);
```

Once the host is reachable, the `at` function returns. If the host is not reachable permanently, it throws an exception.

#### Changing the number of retries

If you want to use a different number of retries you basically have two options. You can either set a new default value or set a value for a specific request.

To set a new default value set the `retries` property.

```javascript
knock.retries = 100;
```

If you only want to set this value for a specific request, provide an options object with a `retries` property.

```javascript
await knock.at('localhost', 3000, { retries: 100 });
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```
