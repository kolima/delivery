'use strict';

var models = require('./sequelize');

function defaultDeliveries() {
    var point = { type: 'Point', coordinates: [37.77,-122.447] };

    return models.deliveries.count().then(function (result) {
        if (result) return true;

        return models.deliveries.create({
            location: point
        }).then(function () {
            console.log('Successfully create first delivery');
        });
    });
}



module.exports = function () {
    defaultDeliveries();
};