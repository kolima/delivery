/**
 * Created by britishd on 28.01.16.
 */
'use strict';
var models = require('../../config/sequelize');
var config = require('../../config/config').config;
var encodePasswordToHashWithSalt = require('../../config/passwords').encodePasswordToHashWithSalt;

exports.reset = function (request, response, next) {
	models.users.findOne({
		where: {
			reset_token: request.body.reset_token
		}
	}).then((person) => {
		if (person) {
			encodePasswordToHashWithSalt(request.body.oldPassword, person.dataValues.salt).then((oldPassword) => {
				console.log(oldPassword.hash);
				if (oldPassword.hash === person.dataValues.password) {
					if (request.body.newPassword === request.body.passwordRepeat) {
						encodePasswordToHashWithSalt(request.body.newPassword, person.dataValues.salt).then((newPassword) => {
							models.users.update({
								password: newPassword.hash
							}, {
								where: {
									reset_token: request.body.reset_token
								}
							}).then((callback) => {
								if (callback) {
									let returnObject = {
										message: 'You successful change password!'
									};
									return response.status(200).send(returnObject);
								} else {
									let returnObject = {
										message: 'Sorry, can not change you password!'
									};
									return response.status(401).send(returnObject);
								}

							});
						});
					} else {
						let returnObject = {
							message: 'New passwords not same!!!'
						};
						return response.status(401).send(returnObject);
					}
				} else {
					let returnObject = {
						message: 'Enter correct old password'
					};
					return response.status(401).send(returnObject);
				}
			});
		} else {
			let returnObject = {
				message: 'Wrong login or email!'
			};
			return response.status(401).send(returnObject);
		}
	});
};
