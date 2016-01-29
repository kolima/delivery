'use strict';

class ContactUsRoutes {
	constructor($stateProvider, $locationProvider) {
		this.$stateProvider = $stateProvider;
		this.init();
		this.$$locationProvider = $locationProvider
		this.$$locationProvider.html5Mode(true);
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
	static factory($stateProvider, $locationProvider){
		return new ContactUsRoutes($stateProvider, $locationProvider);
	}
}

angular.module('core').config(ContactUsRoutes.factory);
