/**
 * Created by britishd on 21.01.16.
 */
'use strict';

class AuthRoutes {
	constructor($stateProvider, $locationProvider, localStorageServiceProvider) {
		this.$stateProvider = $stateProvider;
		localStorageServiceProvider
			.setPrefix('auth')
			.setNotify(true, true);
		this.init();
		this.$$locationProvider = $locationProvider
		this.$$locationProvider.html5Mode(true);
	};

	init() {
		this.$stateProvider
			.state('register', {
				url: '/register',
				controller: 'AuthRegisterController',
				controllerAs: 'vm',
				templateUrl: '/modules/auth/views/auth.register.client.view.html',
				data: {
					shouldUnauthorized: true
				}
			})
			.state('login', {
				url: '/login',
				controller: 'AuthLoginController',
				controllerAs: 'vm',
				templateUrl: '/modules/auth/views/auth.login.client.view.html',
				data: {
					shouldUnauthorized: true
				}
			})
			.state('logout', {
				url: '/logout',
				controller: 'AuthLogoutController'
			})
	};

	static factory($stateProvider, $locationProvider, localStorageServiceProvider) {
		return new AuthRoutes($stateProvider, $locationProvider, localStorageServiceProvider);
	};
}
;

angular.module('auth').config(AuthRoutes.factory);
