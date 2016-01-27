/**
 * Created by britishd on 27.01.16.
 */
'use strict';

var jwt = require('jsonwebtoken');
var config = require('./config').config;

module.exports.createToken = function (user) {
	return jwt.sign(user, config.secret);
};
