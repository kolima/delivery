/**
 * Created by britishd on 29.01.16.
 */

'use strict';

module.exports = function (app) {
	var prices =  require('../controllers/prices.server.controller.js');

	app.route('/api/v1/prices/get')
		.get(prices.getAllPrices);

	app.route('/api/v1/prices/add')
		.post(prices.addPrice);

	app.route('/api/v1/prices/update')
		.put(prices.updatePrice);

	app.route('/api/v1/prices/delete')
		.delete(prices.deletePrice);
};
