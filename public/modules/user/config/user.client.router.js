/**
 * Created by britishd on 28.01.16.
 */

'use strict';

class UserRoutes {
	constructor($urlRouterProvider, $stateProvider) {
		this.$urlRouterProvider = $urlRouterProvider;
		this.$stateProvider = $stateProvider;
		this.init();

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
	static factory($urlRouterProvider, $stateProvider) {
		return new UserRoutes($urlRouterProvider, $stateProvider);
	}
}

angular.module('core').config(UserRoutes.factory);

