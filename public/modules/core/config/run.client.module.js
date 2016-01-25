/**
 * Created by britishd on 22.01.16.
 */

//@ngInject
angular.module('core').run(
	function ($rootScope, $state, $location, AuthFactory) {
		let authFactory = AuthFactory;
		let whiteList = ['login', 'register'];
		$rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
			console.log(toState);
			console.log(authFactory.isAuthenticated);
			if (whiteList.indexOf(toState.name) == -1 && !authFactory.isAuthenticated) {
				e.preventDefault();
				$state.go('login');
			}
			if (whiteList.indexOf(toState.name) != -1 && authFactory.isAuthenticated) {
				e.preventDefault();
			}
		});
	});
