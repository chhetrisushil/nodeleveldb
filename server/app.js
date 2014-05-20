var application_root 		 = __dirname,
		express              = require('express'),
		server               = express(),
		DataStore            = require('nedb'),
		db                   = new DataStore({filename: 'db', autoload: true}),
		path                 = require('path'),
		bodyParser           = require('body-parser'),
		methodOverride       = require('method-override'),
		errorHandler				 = require('express-error-handler');

server.use(bodyParser());
server.use(methodOverride());
server.use(errorHandler({ dumpExceptions: true, showStack: true }));
		
server.get('/', function (req, res) {
	var temp = [];
	db.find({}, function (err, rows) {
		res.send(rows.map(function (item) {return {name: item.name};}));
	});
});
		
server.listen(3000, 'nodene');