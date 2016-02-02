'use strict';

class SidebarController {
	// @ngInject
	constructor($state, AuthFactory) {
		this.$state = $state;
		this.authFactory = AuthFactory;
	}
}

angular.module('core').controller('SidebarController', SidebarController);
