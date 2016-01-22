'use strict';

class HeaderController {
	// @ngInject
	constructor($location, jwtHelper, AuthFactory) {
		this.$location = $location;
		this.jwt = jwtHelper;
		this.authFactory = AuthFactory;
		this.init();
	}

	init() {
		let token = this.authFactory.getTokenFromLocalStorage();
		if (token) {
			if (!this.authFactory.userInformation.length) {
				let userData = this.jwt.decodeToken(token);
				this.authFactory.setUserInformation(userData);
				this.authFactory.userIsAuthenticated();
			}
		} else {
			this.$location.path('/login');
		}
	};
}

angular.module('core').controller('HeaderController', HeaderController);
