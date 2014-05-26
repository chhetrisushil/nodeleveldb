var application_root 		 = __dirname,
		express              = require('express'),
		server               = express(),
		DataStore            = require('nedb'),
		db                   = {},
		path                 = require('path'),
		bodyParser           = require('body-parser'),
		methodOverride       = require('method-override'),
		errorHandler		 = require('express-error-handler'),
		fs					 = require('fs'),
		bcrypt				 = require('bcrypt-nodejs');

db.users = new DataStore({filename: 'users', autoload: true});
db.general = new DataStore({filename: 'db', autoload: true});

server.use(bodyParser());
server.use(methodOverride());
server.use(errorHandler({ dumpExceptions: true, showStack: true }));
server.use(express.static('client/static/'));
		
server.get('/api', function (req, res) {
	var temp = [];
	db.general.find({}, function (err, rows) {
		res.send(rows.map(function (item) {return {name: item.name};}));
	});
});

// server index.html
server.get('/', function (req, res, next) {
	fs.readFile('client/index.html', function (err, data) {
		data = data.toString();
		res.send(data);
	});
});

server.post('/login', function (req, res) {
	//first check if it exists
	db.users.find({'user-name': req.body['user-name']}, function (err, user) {
		if (user.length) {
			bcrypt.compare(req.body['user-password'], user[0]['user-password'], function (err, res) {console.log(err, res);});
			res.send('exits');
		} else {
			bcrypt.hash(req.body['user-password'], null, null, function (err, hash) {
				if (err) {
					res.send('error occured while encrypting');
					return;
				}

				db.users.insert({'user-name': req.body['user-name'], 'user-password': hash}, function (err, doc) {
					if (err) {
						res.send('error occured while adding the user');
						return;
					}

					res.send('Add successful!!!');
				});

			});
		}
	});
});

server.listen(3000, 'nodene');