/**
 * Created by britishd on 29.01.16.
 */
'use strict';

var path = require('path');

exports.getLoginEn = (req, res, next) => {
	let p = path.join(__dirname, '../../config/i18n/login', req.query.lang + '.json');
	res.sendFile(p);
};
