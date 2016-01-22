/**
 * Created by britishd on 22.01.16.
 */

angular.module('core').run(['$rootScope', '$location', 'AuthFactory',
	function ($rootScope, $location, AuthFactory) {
		let authFactory = AuthFactory;
		console.log(authFactory)
		$rootScope.$on('$stateChangeStart', function (e, to) {
			if (to.data && to.data.shouldUnauthorized && authFactory.isAuthenticated) {
				e.preventDefault();
				$location.path('/');
			}
		})
	}]);
