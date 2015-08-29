'use strict';

var config = require('./config'),
	path = require('path'),
	_ = require('lodash');

exports.setModels = function (db) {
	var models = {}, model;

	// Globbing model files
	config.getGlobbedFiles('./app/models/**/*.js').forEach(function (modelPath) {
		model = db.import(path.resolve(modelPath));

		models[model.name] = model;
	});

	models.sequelize = db;

	// Associate in models
	Object.keys(models).forEach(function (name) {
		if ('associate' in models[name]) {
			models[name].associate(models);
		}
	});

	return _.extend(exports, models);
};

