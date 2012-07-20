var html = {
	__namespace__: 'html',
	escape : function(html) {
		return String(html).replace(/&(?!\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	},
	meta : function(attributes) {
		var html = [];
		html.push('<meta ');
		if (attributes) {
			for (var attr in attributes) {
				html.push(attr + '="' + this.escape(attributes[attr]) + '" ');
			}
		}
		html.push('/>');
		return html.join('');
	},
	link : function(attributes) {
		var html = [];
		html.push('<link ');
		if (attributes) {
			for (var attr in attributes) {
				html.push(attr + '="' + this.escape(attributes[attr]) + '" ');
			}
		}
		html.push('/>');
		return html.join('');
	},
	title : function(text) {
		return '<title>' + text + '</title>';
	}
};

module.exports = html;
