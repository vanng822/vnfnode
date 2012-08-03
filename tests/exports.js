var vnf = require('../index.js');

var vows = require('vows');
var assert = require('assert');

vows.describe('Testing of exporting modules').addBatch({
	'count exported libs' : function() {
		assert.equal(Object.keys(vnf).length, 4);
	},
	'html exported' : function() {
		assert.ok(vnf.hasOwnProperty('html'));
		assert.deepEqual(Object.keys(vnf.html), ['escape', 'meta', 'link', 'title']);
	},
	'mobile exported' : function() {
		assert.ok(vnf.hasOwnProperty('mobile'));
		assert.deepEqual(Object.keys(vnf.mobile), ['detect']);
	},
	'config exported' : function() {
		assert.ok(vnf.hasOwnProperty('config'));
		assert.deepEqual(Object.keys(vnf.config), ['Config', 'overrideObject', 'overrideProperty', 'ini2json', 'json2ini']);
	},
	'http exported' : function() {
		assert.ok(vnf.hasOwnProperty('http'));
		assert.deepEqual(Object.keys(vnf.http), ['emptyGif']);
	}
}).export(module);
