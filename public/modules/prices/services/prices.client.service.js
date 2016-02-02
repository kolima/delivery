/**
 * Created by britishd on 29.01.16.
 */
'use strict';


class PricesService {
	constructor($http) {
		this.$http = $http;
	};

	get(token) {
		return this.$http.get('/api/v1/prices/get',  {headers: {'Authorization': 'Basic ' + token}});
	};

	save(data, token) {
		return this.$http.post('/api/v1/prices/add', data, {headers: {'Authorization': 'Basic ' + token}})
	}

	// @ngInject
	static factory($http) {
		return new PricesService($http);
	};
}

angular.module('prices').service('PricesService', PricesService.factory);
