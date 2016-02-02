'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	glob = require('glob'),
	nodemailer = require('nodemailer');

/**
 * Load app configurations
 */
module.exports = _.extend(
	require('./env/all'),
	require('./env/' + process.env.NODE_ENV) || {}
);

module.exports.config = {
	secret : 'thisissecretkeyforjwt',
	appId : '180484802312797',
	appSecret : '4ab3941afe264f96655c4c01db306dd8',
	passwordSecret : 'ThisIsSecretForHashUsersPasswords'
};

module.exports.transporter = nodemailer.createTransport({
	service : 'Gmail',
	auth: {
		user: 'compomatic.dev@gmail.com',
		pass: '1qaZXsw2',
	}
});

/**
 * Get files by glob patterns
 */
module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {
	// For context switching
	var _this = this;

	// URL paths regex
	var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

	// The output array
	var output = [];

	// If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
	if (_.isArray(globPatterns)) {
		globPatterns.forEach(function(globPattern) {
			output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
		});
	} else if (_.isString(globPatterns)) {
		if (urlRegex.test(globPatterns)) {
			output.push(globPatterns);
		} else {
			glob(globPatterns, {
				sync: true
			}, function(err, files) {
				if (removeRoot) {
					files = files.map(function(file) {
						return file.replace(removeRoot, '');
					});
				}

				output = _.union(output, files);
			});
		}
	}

	return output;
};

/**
 * Get the modules JavaScript files
 */
module.exports.getJavaScriptLibAssets = function(includeTests) {
	var output = this.getGlobbedFiles(this.assets.lib.js, 'public/');

	// To include tests
	if (includeTests) {
		output = _.union(output, this.getGlobbedFiles(this.assets.tests));
	}

	return output;
};
/**
 * Get the modules JavaScript files
 */
module.exports.getJavaScriptAssets = function(includeTests) {
	var output = this.getGlobbedFiles(this.assets.js, 'public/');

	// To include tests
	if (includeTests) {
		output = _.union(output, this.getGlobbedFiles(this.assets.tests));
	}

	return output;
};

/**
 * Get the modules CSS files
 */
module.exports.getCSSAssets = function() {
	var output = this.getGlobbedFiles(this.assets.lib.css.concat(this.assets.css), 'public/');
	return output;
};
