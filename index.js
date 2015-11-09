'use strict';
var rocambole = require('rocambole');
var stripNgLog = require('rocambole-strip-nglog');

// esprima@2.1 introduces a "handler" property on TryStatement, so we would
// loop the same node twice (see jquery/esprima/issues/1031 and #264)
rocambole.BYPASS_RECURSION.handler = true;

module.exports = function (src) {
	return rocambole.moonwalk(src, function (node) {
		stripNgLog(node);
	});
};
