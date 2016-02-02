/**
 * Created by britishd on 29.01.16.
 */
'use strict';

var models = require('../../config/sequelize');
var config = require('../../config/config').config;


exports.getAllPrices = (request, response, next) => {
	models.prices.findAll()
		.then((dbRes) => {
			console.log(dbRes[0].dataValues);
			return response.status(200).send(dbRes[0].dataValues);
		})
		.catch((error) => {
			return response.status(400).send(error);
		});
};

exports.addPrice = (request, res, next) => {
	models.prices.create(request.body)
		.then((dbRes) => {
			return res.status(200).send({message: 'Staff is added'});
		})
		.catch((error) => {
			return res.status(400).send(error);
		});
};

exports.updatePrice = (request, response, next) => {
	console.log("update prize");
};

exports.deletePrice = (request, respose, next) => {
	console.log(" delete prize");
};
