var vows = require('vows');
var assert = require('assert');
var html = require('../../lib/html.js');

vows.describe('Html functions test suite').addBatch({
	testEscape : function() {
		assert.equal(html.escape('testing & " > or < '), 'testing &amp; &quot; &gt; or &lt; ');
	},
	testTitle : function() {
		assert.equal(html.title('Testing'), '<title>Testing</title>');
	},
	testMeta : function() {
		assert.equal(html.meta({
			name : "description",
			content : "this is meta tag"
		}), '<meta name="description" content="this is meta tag" />');
	},
	testLink : function() {
		assert.equal(html.link({
			rel : "stylesheet",
			href : "/some.css"
		}), '<link rel="stylesheet" href="/some.css" />');
	}
}).export(module);
