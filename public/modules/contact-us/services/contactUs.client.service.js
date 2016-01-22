'use strict';

class ContactUsService {
	constructor($http) {
		this.$http = $http;
	}

	create(data, token) {
		return this.$http.post('/api/v1/contact-us', data,  {headers: {'Authorization': 'Basic ' + token}});
	}

	count(token) {
		return this.$http.get('/api/v1/contact-us/count', {headers: {'Authorization': 'Basic ' + token}});
	}

	// @ngInject
	static factory($http) {
		return new ContactUsService($http);
	}
}

angular.module('contactUs').service('ContactUsService', ContactUsService.factory);
