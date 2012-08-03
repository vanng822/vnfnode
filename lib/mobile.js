/* for expressjs */
var detect = function() {
	return function(req, res, next) {
		if(req.headers.hasOwnProperty("user-agent") && /android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(req.headers["user-agent"])) {
			res.local('isMobile', true);
		} else {
			res.local('isMobile', false);
		}
		next();
	};
};

module.exports = {
	__namespace__:'http',
	mobileDetect : detect
};