'use strict';

class ContactUsController {
	// @ngInject
	constructor($location, ContactUsService, AuthService) {
		this.$location = $location;
		this.contactUsService = ContactUsService;
		this.authService = AuthService;
		this.contactUs = {};
	}


	sendContactUs() {
		let token = this.authService.getTokenFromLocalStorage();
		if (token) {
			this.contactUsService.create(this.contactUs, token).then(() => {
				this.$location.path('/');
			});
		} else {
			this.$location.path('/login');
		}
	}
}

angular.module('contactUs').controller('ContactUsController', ContactUsController);
