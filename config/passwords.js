/**
 * Created by britishd on 28.01.16.
 */

'use strict';

var crypto = require('crypto');

module.exports.createHashAndSaltPassword = function (password) {
	let promise = new Promise((resolve, reject) => {
		crypto.randomBytes(128, function (err, salt) {
			if (err) {
				reject(err);
			}
			salt = salt.toString('hex');
			crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, hash) => {
				if (err) {
					reject(err);
				}
				resolve({
					salt: salt,
					hash: hash.toString('hex')
				});
			});
		});
	});
	return promise;
};

module.exports.encodePasswordToHashWithSalt = function(password, salt) {
	let promise = new Promise((resolve, reject) => {
		crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, hash) => {
			if (err) {
				reject(err);
			}
			resolve({
				hash: hash.toString('hex')
			});
		});
	});
	return promise;
};
