var fs					 = require('fs');

module.exports = function (server) {
	// serve index.html
	server.get('/', function (req, res, next) {
		fs.readFile('client/index.html', function (err, data) {
			data = data.toString();
			res.send(data);
		});
	});

	//serve sign-up page
	server.get('/sign-up', function (req, res, next) {
		fs.readFile('client/register.html', function (err, data) {
			data = data.toString();
			res.send(data);
		});
	});
};