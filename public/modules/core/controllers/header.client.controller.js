'use strict';

class HeaderController {
	// @ngInject
	constructor($scope, AuthFactory) {
		this.authFactory = AuthFactory;
		this.$scope = $scope;
	}
}

angular.module('core').controller('HeaderController', HeaderController);
