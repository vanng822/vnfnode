var fs = require('fs');

var isObject = function(testObj) {
	return typeof testObj == 'object';
}
var overrideProperty = function(obj, prop, value) {
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
var overrideObject = function(obj) {
	var i, prop, len, source;
	for( i = 1, len = arguments.length; i < len; i++) {
		source = arguments[i];
		for(prop in source) {
			overrideProperty(obj, prop, source[prop]);
		}
	}
};
var ini2json = function(filename, callback) {
	fs.readFile(filename, 'utf8', function(err, data) {

		var root = {}, lines, currentSection, lineNo = 0;
		if(err) {
			callback(err, null);
			return;
		}
		lines = data.split("\n");
		lines.forEach(function(line) {
			var i, len, props, section, obj = (currentSection) ? root[currentSection] : root;
			lineNo++;
			line = line.trim();
			/* ; and # is comments */
			if(line && line[0] != ';' && line[0] != '#') {
				if(( section = line.match(/^\[(.+)\]$/))) {
					if (currentSection) {
						/* new section; reset obj to root */
						obj = root;
					}
					currentSection = section[1];
					obj[currentSection] = {};
					
					return;
				}
				line = line.split('=');
				if(line.length < 2) {
					callback(new Error('Error parsing config at line: ' + lineNo), null);
					return;
				}
				props = line[0].trim().split('.');
				
				value = line.slice(1).join('=').trim();
				for( i = 0, len = props.length - 1; i < len; i++) {
					if(!obj[props[i]]) {
						obj[props[i]] = {};
					}
					obj = obj[props[i]];
				}
				
				obj[props[i]] = unescapeIniValue(value);
			}
		});
		callback(null, root);
	});
};

var unescapeIniValue = function(value) {
	return String(value).replace(/\\t/g, "\t").replace(/\\n/g, "\n").replace(/\\r/g, "\r");
}

var escapeIniValue = function(value) {
	return String(value).replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r");
}
var json2ini = function(obj) {
	var kv = [];
	json2iniIterate('', '', obj, function(err, key, value) {
		if(err) {
			console.log(err);
			return;
		}
		kv.push(key + '=' + escapeIniValue(value));
	});
	return kv.join("\n");
};
var json2iniIterate = function(prekey, key, value, donecb) {
	prekey = prekey ? prekey + '.' + key : key;
	if(isObject(value)) {
		Object.keys(value).forEach(function(prop) {
			json2iniIterate(prekey, prop, value[prop], donecb);
		});
		return;
	}
	donecb(null, prekey, value);
};
var Config = function(files, path) {
	var self = this;
	files.forEach(function(filename) {
		if(path) {
			filename = path + '/' + filename
		}
		var config = require(filename);
		overrideObject(self, config);
	});
};

module.exports = {
	__namespace__ : 'config',
	Config : Config,
	overrideObject : overrideObject,
	overrideProperty : overrideProperty,
	ini2json : ini2json,
	json2ini : json2ini
};

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