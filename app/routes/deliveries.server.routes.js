'use strict';

module.exports = function (app) {

    var deliveries = require('../../app/controllers/deliveries.server.controller');

    app.route('/api/v1/deliveries/first')
        .get(deliveries.findFirst);

};