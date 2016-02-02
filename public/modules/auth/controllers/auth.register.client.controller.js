/**
 * Created by britishd on 21.01.16.
 */
'use strict';

class AuthRegisterController {
	//@ngInject
	constructor($location, AuthService, AuthFactory) {
		this.$location = $location;
		this.authService = AuthService;
		this.authFactory = AuthFactory;
		this.registerUser = {};
	};

	sendRegisterData() {
		this.authService.register(this.registerUser).then((response) => {
			this.userData = response.data;
			this.authFactory.setTokenInLocalStorage(this.userData.token);
			this.authFactory.userIsAuthenticated();
			this.authFactory.setUserInformation(this.userData);
			this.$location.path('/')
		});
	};
}

angular.module('auth').controller('AuthRegisterController', AuthRegisterController);


