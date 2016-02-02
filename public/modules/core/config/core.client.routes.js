'use strict';

class CoreRoutes {
	constructor($urlRouterProvider, $stateProvider, $translateProvider) {
		this.$urlRouterProvider = $urlRouterProvider;
		this.$stateProvider = $stateProvider;
		this.$translateProvider = $translateProvider
		this.init();
		this.$translateProvider.useCookieStorage();
		this.$translateProvider.useUrlLoader('/api/i18n/lang')
		this.$translateProvider.preferredLanguage('en');
	}

	init() {
		this.$stateProvider
			.state('sidebar', {
				abstract: true,
				templateUrl: '/modules/core/views/sidebar.client.view.html'
			})
			.state('sidebar.dashboard', {
				url: '/',
				controller: 'DashboardController',
				controllerAs: 'vm',
				templateUrl: '/modules/core/views/dashboard.client.view.html'
			})
		this.$urlRouterProvider.otherwise('/');
	}

	// @ngInject
	static factory($urlRouterProvider, $stateProvider, $translateProvider) {
		return new CoreRoutes($urlRouterProvider, $stateProvider, $translateProvider);
	}
}

angular.module('core').config(CoreRoutes.factory);

