var html = {
	__namespace__: 'html',
	escape : function(html) {
		return String(html).replace(/&(?!\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	},
	meta : function(attributes) {
		var html = [], i, len, keys;
		html.push('<meta ');
		if (attributes) {
			keys = Object.keys(attributes);
			for (i = 0, len = keys.length; i < len; i++) {
				html.push(keys[i] + '="' + this.escape(attributes[keys[i]]) + '" ');
			}
		}
		html.push('/>');
		return html.join('');
	},
	link : function(attributes) {
		var html = [], i, len, keys;
		html.push('<link ');
		if (attributes) {
			keys = Object.keys(attributes);
			for (i = 0, len = keys.length; i < len; i++) {
				html.push(keys[i] + '="' + this.escape(attributes[keys[i]]) + '" ');
			}
		}
		html.push('/>');
		return html.join('');
	},
	title : function(text) {
		return '<title>' + this.escape(text) + '</title>';
	}
};

module.exports = html;
