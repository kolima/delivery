/**
 * Created by britishd on 21.01.16.
 */
'use strict';

class AuthLoginController {
	//@ngInject
	constructor($location,  AuthService, AuthFactory) {
		this.$location = $location;
		this.authService = AuthService;
		this.authFactory = AuthFactory;
		this.loginUser = {};
	};

	sendLoginData() {
		this.authService.login(this.loginUser).then((response) => {
			this.userData = response.data;
			this.authFactory.setTokenInLocalStorage(this.userData.token);
			this.authFactory.userIsAuthenticated();
			this.authFactory.setUserInformation(this.userData);
			this.$location.path('/');
		});
	};
}

angular.module('auth').controller('AuthLoginController', AuthLoginController);


