/**
 * Created by britishd on 28.01.16.
 */
'use strict';
module.exports = function (app) {

	var user = require('../../app/controllers/user.server.controller');

	app.route('/api/user/reset')
		.put(user.reset);
};
