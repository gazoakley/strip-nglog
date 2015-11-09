# strip-nglog

> Strip `$log` statements from JavaScript code

Useful for making sure you didn't leave any logging in production code.


## Usage

```
$ npm install --save gazoakley/strip-nglog
```

```js
const stripNgLog = require('strip-nglog');

stripNgLog('function foo(){$log.debug("foo");}').toString();
//=> 'function foo(){void 0;}'
```


### API

## stripNgLog(input)

Returns the modified [Esprima AST](http://esprima.org) which can be used to make additional modifications.

Call `.toString()` to get the stringified output.

To prevent any side-effects, `$log.*` is replaced with `void 0` instead of being stripped.

### input

Type: `string`, `object`

Pass in a string of JavaScript code or a [Esprima compatible AST](http://esprima.org).


## CLI

```
$ npm install --global strip-nglog
```

```
$ strip-nglog --help

  Usage
    $ strip-nglog <input file> > <output file>
    $ cat <input file> | strip-nglog > <output file>

  Example
    $ strip-nglog src/app.js > dist/app.js
    $ cat src/app.js | strip-nglog > dist/app.js
```


## License

MIT © [Gareth Oakley](http://gazoakley.com)
MIT © [Sindre Sorhus](http://sindresorhus.com)
