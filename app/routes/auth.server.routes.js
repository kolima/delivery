/**
 * Created by britishd on 21.01.16.
 */
'use strict';

module.exports = function (app) {

	var auth = require('../../app/controllers/auth.server.controller');

	app.route('/api/auth/register')
		.post(auth.register);

	app.route('/api/auth/login')
		.post(auth.login);

	app.route('/auth/facebook')
		.get(auth.facebookLogin);

	app.route('/api/auth/facebook/callback')
		.get(auth.facebookCallback);

	app.route('/api/auth/reset')
		.put(auth.reset);
};
