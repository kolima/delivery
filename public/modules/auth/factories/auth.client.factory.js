/**
 * Created by britishd on 21.01.16.
 */

'use strict';

class AuthFactory {
	constructor(localStorageService) {
		this.localStorage = localStorageService;
		this.isAuthenticated = this.getTokenFromLocalStorage() ? true : false;
		this.userInformation = {};

	}

	setTokenInLocalStorage(token) {
		return this.localStorage.set("authToken", token);
	}

	getTokenFromLocalStorage() {
		return this.localStorage.get('authToken');
	}

	userIsAuthenticated() {
		this.isAuthenticated = true;
	}

	userIsUnauthorized() {
		this.isAuthenticated = false;
	}

	setUserInformation(data) {
		this.userInformation = data;
	}

	clearUserInfromation() {
		this.userInformation = {};
	}

	// @ngInject
	static factory(localStorageService) {
		return new AuthFactory(localStorageService);
	}
}

angular.module('auth').factory('AuthFactory', AuthFactory.factory);


