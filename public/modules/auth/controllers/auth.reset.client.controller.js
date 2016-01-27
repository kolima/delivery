/**
 * Created by britishd on 27.01.16.
 */
'use strict';

class AuthResetController {
	//@ngInject
	constructor($location,  AuthService, AuthFactory) {
		this.$location = $location;
		this.authService = AuthService;
		this.authFactory = AuthFactory;
		this.reset = {};
	};

	resetPassword() {
		console.log("reset");
	}
}

angular.module('auth').controller('AuthResetController', AuthResetController);


