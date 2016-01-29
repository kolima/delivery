/**
 * Created by britishd on 22.01.16.
 */

//@ngInject
angular.module('core').run(
	function ($rootScope, $state, $location, $cookies, AuthFactory, $translate) {
		let authFactory = AuthFactory;
		let whiteList = ['login', 'register'];
		$rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
			let cookieToken = $cookies.get('token');
			if (!cookieToken) {
				if (whiteList.indexOf(toState.name) == -1 && !authFactory.isAuthenticated) {
					e.preventDefault();
					$location.path('/login');
				}
				if (whiteList.indexOf(toState.name) != -1 && authFactory.isAuthenticated) {
					e.preventDefault();
				}
			} else {
				authFactory.setTokenInLocalStorage(cookieToken);
				$cookies.remove('token');
				e.preventDefault();
				$state.go('sidebar.dashboard');
			}
		});
		//$rootScope.$on('$translatePartialLoaderStructureChanged', function () {
		//	$translate.refresh();
		//});
	});
