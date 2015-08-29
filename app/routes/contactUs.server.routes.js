'use strict';

module.exports = function (app) {

    var contactUs = require('../../app/controllers/contactUs.server.controller');

    app.route('/api/v1/contact-us')
        .post(contactUs.create);

    app.route('/api/v1/contact-us/count')
        .get(contactUs.count);
};
