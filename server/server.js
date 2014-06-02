var application_root 		 = __dirname,
	express              	 = require('express'),
	server               	 = express(),
	db					 	 = require('./database.js'),
	bodyParser           	 = require('body-parser'),
	methodOverride       	 = require('method-override'),
	errorHandler		 	 = require('express-error-handler'),
	routes				 	 = require('./routes.js'),
	restApi				 	 = require('./restApi.js');

server.use(bodyParser());
server.use(methodOverride());
server.use(errorHandler({ dumpExceptions: true, showStack: true }));
server.use(express.static('client/static/'));
		
//setup page routes
routes(server);

//setup rest apis
restApi(server, db);

server.listen(3000, 'nodene');