
var vnf = require('../index.js');

var vows = require('vows');
var assert = require('assert');

vows.describe('Testing of exporting modules')
	.addBatch({
		'count exported features' : function() {
			assert.equal(Object.keys(vnf).length, 5);
		},
		'html exported' : function() {
			assert.ok(vnf.hasOwnProperty('html'));
		}
	}).export(module);
