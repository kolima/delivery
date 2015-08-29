'use strict';

/**
 * Module dependencies.
 */

var models = require('../../config/sequelize');

exports.create = function (req, res, next) {
    models.contactUs.create(req.body)
        .then(function (contactUs) {
            return res.sendStatus(200);
        })
        .catch(function (err) {
            next(err.message);
        });
};

exports.count = function(req, res, next) {
    models.contactUs.count()
        .then(function (count) {
            return res.json({count: count});
        })
        .catch(function (err) {
            next(err.message);
        });
};
