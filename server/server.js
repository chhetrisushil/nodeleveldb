var application_root 		 = __dirname,
	express              	 = require('express'),
	server               	 = express(),
	db			 = require('./database/database.js'),
	bodyParser           	 = require('body-parser'),
	methodOverride       	 = require('method-override'),
	errorHandler		 = require('express-error-handler'),
	routes			 = require('./router/routes.js'),
	restApi			 = require('./api/restApi.js'),
	ejs			 = require('ejs'),
	path			 = require('path');

server.use(bodyParser());
server.use(methodOverride());
server.use(errorHandler({ dumpExceptions: true, showStack: true }));
server.use(express.static('client/static/'));
server.set('views', path.join(application_root, '..', '/client'));
server.engine('html', ejs.renderFile);
		
//setup page routes
routes(server);

//setup rest apis
restApi(server, db);

server.listen(3000, 'nodene');
