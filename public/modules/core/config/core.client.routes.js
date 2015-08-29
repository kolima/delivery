'use strict';

class CoreRoutes {
	constructor($urlRouterProvider, $stateProvider) {
		this.$urlRouterProvider = $urlRouterProvider;
		this.$stateProvider = $stateProvider;
		this.init();
	}

	init() {
		this.$stateProvider
			.state('dashboard', {
				url: '/',
				controller: 'DashboardController',
				controllerAs: 'vm',
				templateUrl: '/modules/core/views/dashboard.client.view.html'
			});
		this.$urlRouterProvider.otherwise('/');
	}

	// @ngInject
	static factory($urlRouterProvider, $stateProvider){
		return new CoreRoutes($urlRouterProvider, $stateProvider);
	}
}

angular.module('core').config(CoreRoutes.factory);

