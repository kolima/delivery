'use strict';

class HeaderController {
	// @ngInject
	constructor($location, jwtHelper, AuthFactory, $translatePartialLoader, $translate) {
		this.$location = $location;
		this.jwt = jwtHelper;
		this.authFactory = AuthFactory;
		this.$translatePartialLoader = $translatePartialLoader;
		this.$translate = $translate;

		// call methods
		this.$translatePartialLoader.addPart('login');
		this.$translate.refresh();
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

	changeLanguage(langKey) {
		this.$translate.use(langKey);
	};
}

angular.module('core').controller('HeaderController', HeaderController);
