# knockat

knockat waits until a host is reachable.

## Installation

### As CLI

    $ npm install -g knockat

### In Node.js

    $ npm install knockat

## Quick start

When you run knockat (either as CLI or using Node.js), it uses the following algorithm to detect whether the given is host is reachable.

- If the host is reachable, the module returns immediately.
- If the host is not reachable, knockat retries to reach the host every two seconds.
- If the host is not reachable within two minutes, knockat fails.

### As CLI

Run `knockat` and provide the host as well as the port you want to knock at as parameters.

    $ knockat localhost 3000

If the host is reachable, knockat returns with exit code `0`, otherwise with exit code `1`.

### In Node.js

First you need to add a reference to knockat in your application.

```javascript
var knock = require('knockat');
```

Then, call its `at` function and provide the host as well as the port you want to knock at.

```javascript
knock.at('localhost', 3000, function (err) {
  // ...
});
```

If the host is reachable, the callback gets called with `null`, otherwise with an error.

## Running the build

This module can be built using [Grunt](http://gruntjs.com/). Besides running the tests, this also analyses the code. To run Grunt, go to the folder where you have installed knockat and run `grunt`. You need to have [grunt-cli](https://github.com/gruntjs/grunt-cli) installed.

    $ grunt

## License

The MIT License (MIT)
Copyright (c) 2014-2015 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
