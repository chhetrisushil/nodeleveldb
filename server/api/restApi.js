var bcrypt				 = require('bcrypt-nodejs');

module.exports = function (server, db) {
	server.get('/api', function (req, res) {
		var temp = [];
		db.general.find({}, function (err, rows) {
			res.send(rows.map(function (item) {return {name: item.name};}));
		});
	});

	server.post('/login', function (req, res) {
		db.users.find({$where: function () {
			var retVal = (this['user-name'] === req.body['user-name']
					&& bcrypt.compareSync(req.body['user-password'], this['user-password']));

			return retVal;
		}}, function (err, user) {
			var msg = 'Could not locate the user';
			if (err) {
				msg = 'Error location user!!!';
			}

			if (user.length) {
				msg = 'User located with username: '+req.body['user-name'];
			}

			res.send(msg);
		});
	});

	server.post('/register', function (req, res) {
		//first check if it exists
		db.users.find({'user-name': req.body['user-name']}, function (err, user) {
			if (user.length) {
				//checking if encrypted password matches or not
				console.log('checking if encrypted password matches or not: ', bcrypt.compareSync(req.body['user-password'], user[0]['user-password']));
				res.send('exits');
			} else {
				bcrypt.hash(req.body['user-password'], null, null, function (err, hash) {
					if (err) {
						res.send('error occured while encrypting');
						return;
					}

					db.users.insert({'user-name': req.body['user-name'], 'user-password': hash}, function (err, doc) {
						var msg = 'Add successful!!!';
						if (err) {
							msg = 'error occured while adding the user';
						}

						res.send(msg);
					});

				});
			}
		});
	});
};