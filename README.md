# Dynamic import support in acorn

This is plugin for [Acorn](http://marijnhaverbeke.nl/acorn/) - a tiny, fast JavaScript parser, written completely in JavaScript.

For more information, check out the [proposal repo](https://github.com/tc39/proposal-dynamic-import).

## Usage

Importing this module gives you a plugin that can be used to extend an Acorn parser:

```js
import Parser from 'acorn';
import dynamicImport from 'acorn-dynamic-import';

Parser.extend(dynamicImport).parse('import("something");');
```

To use the updated walk functionality, you can require the walk extension, to get a copy of Acorn's walk module with support for dynamic import nodes:

```js
import walk from 'acorn-dynamic-import/lib/walk';
// or...
const dynamicImportWalk = require('acorn-dynamic-import/lib/walk').default;
```

Or you can use the injectable version for injecting the new walk functionality into your own version of Acorn like this:

```js
import { inject } from 'acorn-dynamic-import/lib/walk';
import acornWalk from 'acorn/dist/walk';

const walk = inject(acornWalk);
``` 

## License

This plugin is issued under the [MIT license](./LICENSE).
