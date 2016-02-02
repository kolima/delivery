/**
 * Created by britishd on 28.01.16.
 */

'use strict';

class UserService {
	constructor($http, localStorageService) {
		this.$http = $http;
		this.localStorage = localStorageService;
	}

	reset(data) {
		return this.$http.put('/api/user/reset', data);
	}

	// @ngInject
	static factory($http, localStorageService) {
		return new UserService($http, localStorageService);
	}
}

angular.module('auth').service('UserService', UserService.factory);


