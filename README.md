[![Build Status](https://secure.travis-ci.org/joelpurra/bespoke-advanced.png?branch=master)](https://travis-ci.org/joelpurra/bespoke-advanced)

# bespoke-advanced

Auto advance slides on a timer in [bespoke.js][bespoke.js], started and stopped with the <kbd>A</kbd> key.

## Download

Download the [production version][min] or the [development version][max], or use a [package manager](#package-managers).

[min]: https://raw.github.com/joelpurra/bespoke-advanced/master/dist/bespoke-advanced.min.js
[max]: https://raw.github.com/joelpurra/bespoke-advanced/master/dist/bespoke-advanced.js

## Usage

First, include `bespoke.js`, `bespoke-convenient.js` and `bespoke-advanced.js` in your page.

Then, simply include the plugin when instantiating your presentation.

```js
bespoke.horizontal.from('article', {
  advanced: true
});
```

- Key <kbd>A</kbd>: start and stop auto advancing.

## Options

These are the defaults, which you can override.

```js
bespoke.horizontal.from('article', {
  advanced: {
      interval: 3000, // Time between advances in milliseconds
      key: 0x41 // (65) "A" key.
    }
});
```



## Package managers

### Bower

```bash
$ bower install bespoke-advanced
```

### npm

```bash
$ npm install bespoke-advanced
```

The bespoke-advanced npm package is designed for use with [browserify](http://browserify.org/), e.g.

```js
require('bespoke');
require('bespoke-convenient');
require('bespoke-advanced');
```

## Credits

[Mark Dalgleish](http://markdalgleish.com/) for [bespoke.js][bespoke.js] and related tools. This plugin was built with [generator-bespokeplugin](https://github.com/markdalgleish/generator-bespokeplugin).

Ed Schipul, [eschipul on flickr](https://secure.flickr.com/photos/eschipul/), for his photo [river boat in the mist](https://secure.flickr.com/photos/eschipul/3133923970/) ([CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)). My recompressed version is also released under CC BY-SA 2.0.

My best friend, [bespoke-convenient](https://github.com/joelpurra/bespoke-convenient), for continued support - through good and bad times. You mah bro, bro.


## License

Copyright (c) 2013, [Joel Purra](http://joelpurra.com/) All rights reserved.

When using bespoke-advanced, comply to the [MIT license](http://joelpurra.mit-license.org/2013). Please see the LICENSE file for details, and the [MIT License on Wikipedia](http://en.wikipedia.org/wiki/MIT_License).

[bespoke.js]: https://github.com/markdalgleish/bespoke.js
[default-events]: https://github.com/markdalgleish/bespoke.js#events


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/joelpurra/bespoke-advanced/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

