var vnf = require('../index.js');

var vows = require('vows');
var assert = require('assert');

vows.describe('Testing of exporting modules').addBatch({
	'count exported libs' : function() {
		assert.equal(Object.keys(vnf).length, 3);
	},
	'html exported' : function() {
		assert.ok(vnf.hasOwnProperty('html'));
		assert.deepEqual(Object.keys(vnf.html), ['escape', 'meta', 'link', 'title']);
	},
	'config exported' : function() {
		assert.ok(vnf.hasOwnProperty('config'));
		assert.deepEqual(Object.keys(vnf.config), ['Config', 'overrideObject', 'overrideProperty', 'ini2json', 'json2ini']);
	},
	'http exported' : function() {
		assert.ok(vnf.hasOwnProperty('http'));
		assert.deepEqual(Object.keys(vnf.http), ['mobileDetect', 'emptyGif']);
	}
}).export(module);
