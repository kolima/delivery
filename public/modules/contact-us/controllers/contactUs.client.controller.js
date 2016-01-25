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
		this.contactUsService.create(this.contactUs, token).then(() => {
			this.$location.path('/');
		});

	}
}

angular.module('contactUs').controller('ContactUsController', ContactUsController);
