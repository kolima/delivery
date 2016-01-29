/**
 * Created by britishd on 28.01.16.
 */

'use strict';

class UserRoutes {
	constructor($urlRouterProvider, $stateProvider, $locationProvider) {
		this.$urlRouterProvider = $urlRouterProvider;
		this.$stateProvider = $stateProvider;
		this.init();
		this.$$locationProvider = $locationProvider
		this.$$locationProvider.html5Mode(true);
	}

	init() {
		this.$stateProvider
			.state('sidebar.profile', {
				url: '/profile',
				controller: 'AuthProfileController',
				controllerAs : 'vm',
				templateUrl: '/modules/user/views/user.profile.client.view.html',

			})
		this.$urlRouterProvider.otherwise('/');
	}

	// @ngInject
	static factory($urlRouterProvider, $stateProvider, $locationProvider) {
		return new UserRoutes($urlRouterProvider, $stateProvider, $locationProvider);
	}
}

angular.module('core').config(UserRoutes.factory);

