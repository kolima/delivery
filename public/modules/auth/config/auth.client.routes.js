/**
 * Created by britishd on 21.01.16.
 */
'use strict';

class AuthRoutes {
	constructor($stateProvider, localStorageServiceProvider) {
		this.$stateProvider = $stateProvider;
		localStorageServiceProvider
			.setPrefix('auth')
			.setNotify(true, true);
		this.init();

	};

	init() {
		this.$stateProvider
			.state('register', {
				url: '/register',
				controller: 'AuthRegisterController',
				controllerAs: 'vm',
				templateUrl: '/modules/auth/views/auth.register.client.view.html'
			})
			.state('login', {
				url: '/login',
				controller: 'AuthLoginController',
				controllerAs: 'vm',
				templateUrl: '/modules/auth/views/auth.login.client.view.html'
			})
			.state('logout', {
				url: '/logout',
				controller: 'AuthLogoutController'
			});
	};

	static factory($stateProvider, localStorageServiceProvider) {
		return new AuthRoutes($stateProvider, localStorageServiceProvider);
	};
}
;

angular.module('auth').config(AuthRoutes.factory);
