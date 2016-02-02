'use strict';

class DashboardController {
	// @ngInject
	constructor($location, ContactUsService, AuthFactory) {
		this.$location = $location;
		this.contactUsService = ContactUsService;
		this.authFactory = AuthFactory;
		this.init();
	}

	init() {
		let token = this.authFactory.getTokenFromLocalStorage();
		this.contactUsService.count(token).then((result) => {
			this.contactUs = result.data;
		}, (err) => {
			this.$location.path('/login');
		});

	};
}

angular.module('core').controller('DashboardController', DashboardController);
