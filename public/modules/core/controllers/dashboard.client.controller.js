'use strict';

class DashboardController {
	// @ngInject
	constructor(ContactUsService) {
		this.contactUsService = ContactUsService;
		this.init();
	}

	init() {
		this.contactUsService.count().then((result) => {
			this.contactUs = result.data;
		});
	}
}

angular.module('core').controller('DashboardController', DashboardController);
