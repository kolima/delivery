'use strict';

/**
 * Module dependencies.
 */

var models = require('../../config/sequelize');

exports.findFirst = function (req, res, next) {
    models.deliveries.findOne()
        .then(function (result) {
            return res.json(result);
        })
        .catch(function (err) {
            next(err.message);
        });
};