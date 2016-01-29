'use strict';

class ContactUsController {
	// @ngInject
	constructor($location, ContactUsService, AuthFactory) {
		this.$location = $location;
		this.contactUsService = ContactUsService;
		this.authFactory = AuthFactory;
		this.contactUs = {};
	}


	sendContactUs() {
		let token = this.authFactory.getTokenFromLocalStorage();
		this.contactUsService.create(this.contactUs, token).then(() => {
			this.$location.path('/');
		});

	}
}

angular.module('contactUs').controller('ContactUsController', ContactUsController);
