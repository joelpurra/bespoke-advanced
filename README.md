[![Build Status](https://secure.travis-ci.org/joelpurra/bespoke-advanced.png?branch=master)](https://travis-ci.org/joelpurra/bespoke-advanced) [![Coverage Status](https://coveralls.io/repos/joelpurra/bespoke-advanced/badge.png)](https://coveralls.io/r/joelpurra/bespoke-advanced)

# [bespoke-advanced](https://github.com/joelpurra/bespoke-advanced)

**Check out the [presentation/demo.](https://joelpurra.github.io/bespoke-advanced/demo/)**

Auto advance slides on a timer in [bespoke.js][bespoke.js], started and stopped with the <kbd>A</kbd> key.

## Download

Download the [production version][min] or the [development version][max], or use a [package manager](#package-managers).

[min]: https://raw.github.com/joelpurra/bespoke-advanced/master/dist/bespoke-advanced.min.js
[max]: https://raw.github.com/joelpurra/bespoke-advanced/master/dist/bespoke-advanced.js

## Usage

This plugin is shipped in a [UMD format](https://github.com/umdjs/umd), meaning that it is available as a CommonJS/AMD module or browser global.

For example, when using CommonJS modules:

```js
var bespoke = require('bespoke'),
  advanced = require('bespoke-advanced');

bespoke.from('#presentation', [
  advanced()
]);
```

When using browser globals:

```js
bespoke.from('#presentation', [
  bespoke.plugins.advanced()
]);
```

- Key <kbd>A</kbd>: start and stop auto advancing.

## Options

These are the defaults, which you can override.
For example, when using CommonJS modules:

```js
var bespoke = require('bespoke'),
  advanced = require('bespoke-advanced');

bespoke.from('#presentation', [
  advanced({
      interval: 3000, // Time between advances in milliseconds
      key: 0x41 // (65) "A" key.
    })
]);
```

When using browser globals:

```js
bespoke.from('#presentation', [
  bespoke.plugins.advanced({
      interval: 3000, // Time between advances in milliseconds
      key: 0x41 // (65) "A" key.
    })
]);
```


## Package managers

### npm

```bash
$ npm install bespoke-advanced
```

### Bower

```bash
$ bower install bespoke-advanced
```

## Credits

[Mark Dalgleish](https://markdalgleish.com/) for [bespoke.js][bespoke.js] and related tools. This plugin was built with [generator-bespokeplugin](https://github.com/markdalgleish/generator-bespokeplugin).

Ed Schipul, [eschipul on flickr](https://secure.flickr.com/photos/eschipul/), for his photo [river boat in the mist](https://secure.flickr.com/photos/eschipul/3133923970/) ([CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)). My recompressed version is also released under CC BY-SA 2.0.

My best friend, [bespoke-convenient](https://github.com/joelpurra/bespoke-convenient), for continued support - through good and bad times. You mah bro, bro.


## License

Copyright (c) 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, [Joel Purra](https://joelpurra.com/) All rights reserved.

When using bespoke-advanced, comply to the [MIT license](https://joelpurra.mit-license.org/2013-2014). Please see the LICENSE file for details, and the [MIT License on Wikipedia](https://en.wikipedia.org/wiki/MIT_License).

[bespoke.js]: https://github.com/markdalgleish/bespoke.js
[default-events]: https://github.com/markdalgleish/bespoke.js#events
