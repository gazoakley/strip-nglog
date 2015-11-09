'use strict';
var assert = require('assert');
var stripDebug = require('./');

it('should strip $log statement', function () {
	assert.equal(stripDebug('function test(){$log.debug("foo");}').toString(), 'function test(){void 0;}');
	assert.equal(stripDebug('var test = () => $log.debug("foo");').toString(), 'var test = () => void 0;');
	assert.equal(stripDebug('"use strict";$log.debug("foo");foo()').toString(), '"use strict";void 0;foo()');
	assert.equal(stripDebug('if($log){$log.debug("foo", "bar");}').toString(), 'if($log){void 0;}');
	assert.equal(stripDebug('foo && $log.debug("foo");').toString(), 'foo && void 0;');
	assert.equal(stripDebug('if (foo) $log.debug("foo")\nnextLine();').toString(), 'if (foo) void 0\nnextLine();');
});

it('should never strip away non-debugging code', function () {
	var t = 'var test = {\n    getReadSections: function(){\n        var readSections = window.localStorage.getItem(\'storyReadSections\') || \'[]\';\n        return JSON.parse(readSections);\n    }\n};';
	assert.equal(stripDebug(t).toString(), t);
});

it('shouldn\'t leak memory', function () {
	assert.doesNotThrow(function () {
		stripDebug('var obj = null; try { obj = \'something\'; } catch (e) { $log.warn(\'NOPE!\'); }').toString();
	});
});
