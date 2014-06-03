var curDir 		 				 = __dirname,
		path 							 = require('path'),
		DataStore          = require('nedb'),
		db                 = {};

db.users = new DataStore({filename: path.join(curDir, '/users'), autoload: true});
db.general = new DataStore({filename: path.join(curDir, '/users'), autoload: true});

module.exports = db;