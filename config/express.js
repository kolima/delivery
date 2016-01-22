'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
	morgan = require('morgan'),
	logger = require('./logger'),
	bodyParser = require('body-parser'),
	compression = require('compression'),
	methodOverride = require('method-override'),
	helmet = require('helmet'),
	flash = require('connect-flash'),
	config = require('./config'),
	_ = require('lodash'),
	consolidate = require('consolidate'),
	cookieParser = require('cookie-parser'),
	path = require('path'),
	jwt = require('jsonwebtoken');


module.exports = function (models) {
	// Initialize express app
	var app = express();

	// Setting application local variables
	app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;
	app.locals.jsLibFiles = config.getJavaScriptLibAssets();
	app.locals.jsFiles = config.getJavaScriptAssets();
	app.locals.cssFiles = config.getCSSAssets();
	app.locals.compiler = config.compiler;

	app.use('/api/v1/', function (req, res, next) {
		if (req.headers.authorization) {
			let token = req.headers.authorization.split(' ');
			console.log(token);
			jwt.verify(token[1], config.config.secret, function (err, decoded) {
				console.log(err);
				if (err)
					return res.status(400).send({message: 'Some problem!'});
				if (!decoded)
					return res.status(401).send({message: 'You a not authorize!'});
				else
					next();
			});
		} else {
			return res.status(401).send({message: 'You a not authorize!'});
		}

	});


	// Passing the request url to environment locals
	app.use(function (req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// Should be placed before express.static
	app.use(compression({
		// only compress files for the following content types
		filter: function (req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		// zlib option for compression level
		level: 3
	}));

	// Showing stack errors
	app.set('showStackError', true);

	// Set swig as the template engine
	app.engine('server.view.html', consolidate[config.templateEngine]);

	// Set views path and view engine
	app.set('view engine', 'server.view.html');
	app.set('views', './app/views');

	// Enable logger (morgan)
	app.use(morgan(logger.getLogFormat(), logger.getLogOptions()));

	// Environment dependent middleware
	if (process.env.NODE_ENV === 'development') {
		// Disable views cache
		app.set('view cache', false);
	} else if (process.env.NODE_ENV === 'production') {
		app.locals.cache = 'memory';
	}

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Use helmet to secure Express headers
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
	app.disable('x-powered-by');

	// cookies parse
	app.use(cookieParser());


	// Setting the app router and static folder
	app.use(express.static(path.resolve('./public')));


	// connect flash for flash messages
	app.use(flash());

	// Globbing routing files
	config.getGlobbedFiles('./app/routes/**/*.js').forEach(function (routePath) {
		require(path.resolve(routePath))(app);
	});

	// The handle of errors
	app.use(function (err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

		if (err instanceof Error) {
			// Log it
			console.error(err.stack);

			// Error page
			return res.status(500).send({
				error: err.stack.toString().split('\n')[0]
			});
		} else {
			return res.status(400).send({error: err});
		}
	});

	// Assume 404 since no middleware responded
	app.use(function (req, res) {
		res.status(404).send({
			url: req.originalUrl,
			error: 'Not Found'
		});
	});

	// Return Express server instance
	return app;
};
