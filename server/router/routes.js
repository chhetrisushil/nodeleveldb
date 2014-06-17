var fs					 = require('fs');

module.exports = function (server) {
	// serve index.html
	server.get('/', function (req, res, next) {
		res.render('index.html');
	});

	//serve sign-up page
	server.get('/sign-up', function (req, res, next) {
		res.render('register.html');
	});
};
