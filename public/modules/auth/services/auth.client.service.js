/**
 * Created by britishd on 21.01.16.
 */

'use strict';

class AuthService {
	constructor($http, localStorageService) {
		this.$http = $http;
		this.localStorage = localStorageService;
		this.isAuthenticated = false;
	}

	register(data) {
		return this.$http.post('/api/auth/register', data);
	}

	login(data) {
		return this.$http.post('/api/auth/login', data);
	}

	getTokenFromLocalStorage() {
		return this.localStorage.get('authToken');
	}

	// @ngInject
	static factory($http, localStorageService) {
		return new AuthService($http, localStorageService);
	}
}

angular.module('auth').service('AuthService', AuthService.factory);


