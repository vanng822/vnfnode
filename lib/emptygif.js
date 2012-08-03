
function emptyGif(req, res) {
	res.setHeader('Content-Type', 'image/gif');
	res.send(new Buffer('R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', 'base64'));
}

module.exports = {
	__namespace__: 'http',
	emptyGif : emptyGif
};
