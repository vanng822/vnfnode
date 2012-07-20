var isObject = function(testObj) {
	return typeof testObj == 'object';
}
var overrideProperty = module.exports.overrideProperty = function(obj, prop, value) {
	if(!obj.hasOwnProperty(prop)) {
		obj[prop] = value;
		return;
	}
	/* deep override only when matching type object */
	if(isObject(value) && isObject(obj[prop])) {
		overrideObject(obj[prop], value);
		return;
	}
	obj[prop] = value;
};
var overrideObject = module.exports.overrideObject = function(obj) {
	var i, prop, len, source;
	for( i = 1, len = arguments.length; i < len; i++) {
		source = arguments[i];
		for(prop in source) {
			overrideProperty(obj, prop, source[prop]);
		}
	};
	return obj;
};
var Config = function(files, path) {
	var self = this;
	files.forEach(function(filename) {
		if(path) {
			filename = path + '/' + filename
		}
		var config = require(filename);
		self = overrideObject(self, config);
	});
};

module.exports.Config = Config;

/** Implement later
 var scanConfig = module.exports.scanDirConfig = function(path) {
 var config = new Config();
 if(!fs.existsSync(path)) {
 throw new Error('Path does not exists');
 }

 var files = readdirSync(path);

 files.forEach(function(filename) {
 if(path.extname(filename) == '.js') {
 addConfig(config, filename, path);
 }
 });
 };
 */