var config = require('../../lib/config.js');

var vows = require('vows');
var assert = require('assert');

vows.describe('Configuration test suite').addBatch({
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
}).addBatch({
	'ini2json' : {
		topic : function() {
			config.ini2json(__dirname + '/data/config.ini', this.callback);
		},
		'should return an object of' : function(err, obj) {
			assert.ok(!err);
			
			assert.deepEqual(obj, {
				http : {
					host : '127.0.0.1',
					port : '3000'
				},
				db : {
					host : 'localhost',
					port : '3069'
				},
				translation : {
					NEXT : 'next',
					NEWLINE : "test\ntesting"
				}
			});
		}
	},
	'json2ini' : function() {
		assert.equal(config.json2ini({
			test : {
				t : 1,
				t2 : 2,
				t3 : {
					s : 2,
					s2 : "testing\ntsting\ntesting"
				}
			},
			test2 : 2
		}), "test.t=1\ntest.t2=2\ntest.t3.s=2\ntest.t3.s2=testing\\ntsting\\ntesting\ntest2=2");
	},
	'jsonArray2ini' : function() {
		assert.equal(config.json2ini({
			test :[
			10, 20, 40, 80, 160
			],
			test2 : ['testing','test']
		}), "test.0=10\ntest.1=20\ntest.2=40\ntest.3=80\ntest.4=160\ntest2.0=testing\ntest2.1=test");
	}
}).export(module);
