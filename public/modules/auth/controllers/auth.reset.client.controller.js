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
		this.reset.email = this.authFactory.userInformation.email;
		this.authService.reset(this.reset).then((response) => {
			let message = response.data.message;
			this.localStorage.clearAll();
			this.authFactory.userIsUnauthorized();
			this.authFactory.clearUserInfromation();
			this.$location.path('/login');
		})
	}
}

angular.module('auth').controller('AuthResetController', AuthResetController);


