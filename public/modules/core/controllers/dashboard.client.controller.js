'use strict';

class DashboardController {
	// @ngInject
	constructor($location, ContactUsService, AuthService) {
		this.$location = $location;
		this.contactUsService = ContactUsService;
		this.authService = AuthService;
		this.init();
	}

	init() {
		let token = this.authService.getTokenFromLocalStorage();
		if (token) {
			this.contactUsService.count(token).then((result) => {
				this.contactUs = result.data;
			}, (err) => {
				this.$location.path('/login');
			});
		} else {
			this.$location.path('/login');
		}
	};
}

angular.module('core').controller('DashboardController', DashboardController);
