var DataStore            = require('nedb'),
	db                   = {};

db.users = new DataStore({filename: 'users', autoload: true});
db.general = new DataStore({filename: 'db', autoload: true});

module.exports = db;