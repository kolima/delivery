/**
 * Created by britishd on 21.01.16.
 */
'use strict';

class AuthLogoutController {
	//@ngInject
	constructor($location, localStorageService, AuthService, AuthFactory) {
		this.$location = $location;
		this.localStorage = localStorageService;
		this.authService = AuthService;
		this.authFactory = AuthFactory;
		this.logout();
	};

	logout() {
		this.authService.isAuthenticated = false;
		this.localStorage.clearAll();
		this.authFactory.userIsUnauthorized();
		this.authFactory.clearUserInfromation();
		this.$location.path('/login');
	};
}

angular.module('auth').controller('AuthLogoutController', AuthLogoutController);


