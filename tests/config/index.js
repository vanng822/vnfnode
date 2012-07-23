var config = require('../../lib/config.js');

var vows = require('vows');
var assert = require('assert');

vows.describe().addBatch({
	'testOverrideProperty' : function() {
		var obj = {
			http : {
				'host' : '127.0.0.1',
				'port' : 8000
			},
			stat : 0
		};
		config.overrideProperty(obj, 'stat', 1);
		assert.deepEqual(obj, {
			http : {
				'host' : '127.0.0.1',
				'port' : 8000
			},
			stat : 1
		});
	},
	'testOverrideObject' : function() {
		var obj = {
			http : {
				host : '127.0.0.1',
				port : 8000
			},
			stat : 0
		};
		config.overrideObject(obj, {
			http : {
				port : 3000
			}
		});
		assert.deepEqual(obj, {
			http : {
				'host' : '127.0.0.1',
				'port' : 3000
			},
			stat : 0
		});
	},
	'testConfig' : function() {
		var c = new config.Config(['all.js', 'production.js'], __dirname + '/data');
		assert.deepEqual(c, {
			'host' : '127.0.0.1',
			'port' : 8000
		});
	}
}).export(module);
