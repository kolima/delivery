/**
 * Created by britishd on 21.01.16.
 */
'use strict';

var models = require('../../config/sequelize');
var jwt = require('jsonwebtoken');
var config = require('../../config/config').config;


function createToken(user) {
	return jwt.sign(user, config.secret);
}

exports.register = function (req, res, next) {
	let token = createToken(req.body.email);
	models.users.create(req.body)
		.then((response) => {
			let returnObject = {
				user: response.dataValues,
				token: token
			};
			return res.status(200).send(returnObject);
		})
		.catch((err) => {
			console.log(err.message);
			next(err.message);
		});
};

exports.login = function (req, res, next) {
	models.users.findOne({
		where: {
			login: req.body.login
		}
	}).then((person) => {
		if (person) {
			if (person.dataValues.password === req.body.password) {
				let token = createToken(person.dataValues.email);
				let returnObject = {
					user: person.dataValues,
					token: token
				};
				return res.status(200).send(returnObject);
			} else {
				let returnObject = {
					message: 'Password is not correct'
				};
				return res.status(401).send(returnObject);
			}
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
