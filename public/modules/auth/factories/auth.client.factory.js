/**
 * Created by britishd on 21.01.16.
 */

'use strict';

class AuthFactory {
	constructor() {
		this.isAuthenticated = false;
		this.userInformation = {};
	}

	userIsAuthenticated() {
		console.log("userIsAuthenticated");
		this.isAuthenticated = true;
	}

	userIsUnauthorized() {
		console.log("userIsUnauthorized");
		this.isAuthenticated = false;
	}

	setUserInformation(data) {
		this.userInformation = data;
		console.log("setUserInformation  : ", this.userInformation);
	}

	clearUserInfromation() {
		this.userInformation = {};
		console.log("setUserInformation  : ", this.userInformation);
	}

	// @ngInject
	static factory() {
		return new AuthFactory();
	}
}

angular.module('auth').factory('AuthFactory', AuthFactory.factory);


