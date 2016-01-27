/**
 * Created by britishd on 21.01.16.
 */
'use strict';

var models = require('../../config/sequelize');
var config = require('../../config/config').config;
var tokens = require('../../config/tokens');
var OAuth = require('oauth').OAuth2;
var FB = require('fb');
var resetPasswordMail = require('../../config/mailer').resetPasswordMail;
var crypto = require('crypto');

let oa = new OAuth(config.appId, config.appSecret, '', 'https://www.facebook.com/dialog/oauth', 'https://graph.facebook.com/v2.3/oauth/access_token', null);


function createHashAndSaltPassword(password) {
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
}

function encodePasswordToHashWithSalt(password, salt) {
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
}

function facebookInsert(user, token) {
	let promise = new Promise(function (resolve, reject) {
		let timePassword = Math.random().toString(36).slice(2);
		createHashAndSaltPassword(timePassword).then((data) => {
			var facebookUser = {
				login: user.email,
				password: data.hash,
				salt: data.salt,
				username: user.name,
				email: user.email,
				facebook_id: user.id,
				facebook_access_token: token,
				reset_token: Math.random().toString(36).slice(2)
			};
			models.users.findOrCreate({where: {email: facebookUser.email}, defaults: facebookUser})
				.spread((user, created) => {
					let result = user.get({plain: true});
					if (created) {
						resetPasswordMail({email: result.email, password: timePassword, name: result.username, reset_token : facebookUser.reset_token });
					}
					let userToken = tokens.createToken({
						login: result.login,
						username: result.username,
						email: result.email
					});
					resolve(userToken);
				}).catch((err) => {
				reject(err);
			});
		});
	});
	return promise;
}


exports.register = function (req, res, next) {
	createHashAndSaltPassword(req.body.password).then((data) => {
		console.log(data);
		req.body.password = data.hash;
		req.body.salt = data.salt;
		req.body.reset_token = Math.random().toString(36).slice(2);
		models.users.create(req.body)
			.then((response) => {


				let dataToSent = {
					login: response.dataValues.login,
					username: response.dataValues.username,
					email: response.dataValues.email
				};
				response.dataValues.token = tokens.createToken(dataToSent);
				dataToSent.token = response.dataValues.token;
				return res.status(200).send(dataToSent);
			})
			.catch((err) => {
				switch (err.message) {
					case 'Validation error':
						return res.status(409).send(err.errors[0].message);
					default :
						return res.status(400).send(err.errors[0].message);
				}
			});
	});
};

exports.login = function (req, res, next) {
	models.users.findOne({
		where: {
			login: req.body.login
		}
	}).then((person) => {
		console.log(person);
		if (person) {
			encodePasswordToHashWithSalt(req.body.password, person.dataValues.salt).then((data) => {
				if (person.dataValues.password === data.hash) {
					let dataToSent = {
						login: person.dataValues.login,
						username: person.dataValues.username,
						email: person.dataValues.email
					};
					person.dataValues.token = tokens.createToken(dataToSent);
					dataToSent.token = person.dataValues.token;
					return res.status(200).send(dataToSent);
				} else {
					let returnObject = {
						message: 'Password is not correct'
					};
					return res.status(401).send(returnObject);
				}
			});
		} else {
			let returnObject = {
				message: 'Wrong login!'
			};
			return res.status(401).send(returnObject);
		}
	}).catch((err) => {
		console.log(err.message);
		next(err.message);
		return res.sendStatus(404);
	});
};

exports.facebookLogin = function (req, res, next) {
	var authURL = oa.getAuthorizeUrl({
		redirect_uri: 'http://localhost:3000/api/auth/facebook/callback',
		scope: ['email']
	});
	res.redirect(authURL);
};

exports.facebookCallback = function (request, response, next) {
	oa.getOAuthAccessToken(request.query.code, {
		redirect_uri: 'http://localhost:3000/api/auth/facebook/callback'
	}, function (e, access_token, refresh_token, results) {
		if (e) {
			console.log(e);
		} else if (results.error) {
			console.log(results);
		}
		else {
			FB.api('/me', {fields: ['id', 'name', 'email'], access_token: access_token}, function (res) {
				if (!res || res.error) {
					console.log(!res ? 'error occurred' : res.error);
					return;
				}
				facebookInsert(res, access_token).then(function (token) {
					response.cookie('token', token);
					response.redirect('/');
				}, function (err) {
					switch (err) {
						case 'Validation error':
							return response.status(409).send(err.errors[0].message);
						default :
							return response.status(400).send(err.errors[0].message);
					}
				});
			});
		}
	});
};

exports.reset = function () {
	console.log("hello");
};
