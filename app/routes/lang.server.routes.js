/**
 * Created by britishd on 29.01.16.
 */
'use strict';
module.exports = function (app) {

	var lang = require('../../app/controllers/lang.server.controller');

	app.route('/api/i18n/lang')
		.get(lang.getLoginEn);

};
