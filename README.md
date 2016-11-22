# Dynamic import support in acorn

This is plugin for [Acorn](http://marijnhaverbeke.nl/acorn/) - a tiny, fast JavaScript parser, written completely in JavaScript.

For more information, check out the [proposal repo](https://github.com/tc39/proposal-dynamic-import).

## Usage

You can use this module directly in order to get Acorn instance with plugin installed:

```javascript
var acorn = require('acorn-dynamic-import');
```

Or you can use `inject.js` for injecting plugin into your own version of Acorn like this:

```javascript
var acorn = require('acorn-dynamic-import/inject')(require('./custom-acorn'));
```

Then, use the `plugins` option whenever you need to support dynamicImport while parsing:

```javascript
var ast = acorn.parse(code, {
  plugins: { dynamicImport: true }
});
```
## License

This plugin is issued under the [MIT license](./LICENSE).

With <3 by UXtemple.
