'use strict';

class ContactUsRoutes {
	constructor($stateProvider) {
		this.$stateProvider = $stateProvider;
		this.init();
	}

	init() {
		this.$stateProvider
			.state('sidebar.contactUs', {
				url: '/contact-us',
				controller: 'ContactUsController',
				controllerAs: 'vm',
				templateUrl: '/modules/contact-us/views/contact-us.client.view.html'
			});
	}

	// @ngInject
	static factory($stateProvider){
		return new ContactUsRoutes($stateProvider);
	}
}

angular.module('core').config(ContactUsRoutes.factory);
