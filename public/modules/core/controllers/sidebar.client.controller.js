'use strict';

class SidebarController {
	// @ngInject
	constructor($state) {
		this.$state = $state;
	}
}

angular.module('core').controller('SidebarController', SidebarController);
