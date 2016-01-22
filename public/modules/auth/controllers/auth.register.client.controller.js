/**
 * Created by britishd on 21.01.16.
 */
'use strict';

class AuthRegisterController {
	//@ngInject
	constructor($location, localStorageService, AuthService, AuthFactory) {
		this.$location = $location;
		this.localStorage = localStorageService;
		this.authService = AuthService;
		this.authFactory = AuthFactory;
		this.registerUser = {};
	};

	setTokenInLocalStorage(token) {
		return this.localStorage.set("authToken", token);
	};

	sendRegisterData() {
		this.authService.register(this.registerUser).then((response) => {
			this.userData = response.data;
			this.setTokenInLocalStorage(this.userData.token);
			this.authFactory.userIsAuthenticated();
			this.authFactory.setUserInformation(this.userData);
			this.$location.path('/')
		});
	};
}

angular.module('auth').controller('AuthRegisterController', AuthRegisterController);


