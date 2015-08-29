'use strict';

class ContactUsController {
	// @ngInject
	constructor(ContactUsService, $location) {
		this.contactUsService = ContactUsService;
		this.$location = $location;
		this.contactUs = {};
	}


	sendContactUs() {
		this.contactUsService.create(this.contactUs).then(() => {
			this.$location.path('/');
		});
	}
}

angular.module('contactUs').controller('ContactUsController', ContactUsController);
