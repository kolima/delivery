/**
 * Created by britishd on 28.01.16.
 */
'use strict';

class AuthProfileController {
	//@ngInject
	constructor($location, $timeout, UserService, AuthFactory) {
		this.$location = $location;
		this.$timeout = $timeout
		this.userService = UserService;
		this.authFactory = AuthFactory;
		this.reset = {};
		this.isChangePassword = false;
		this.successOnReset = false;
		this.errorOnReset = false;
	};

	toogleChangeForm() {
		this.isChangePassword = this.isChangePassword ? false : true;
	};

	resetPassword() {
		this.reset.reset_token = this.authFactory.userInformation.reset_token;
		this.userService.reset(this.reset).then((response) => {
			this.resetMessage = response.data.message;
			this.successOnReset = true;
			this.reset = {};
			this.$timeout(() => {
				this.successOnReset = false;
				this.resetMessage = '';
			}, 5000);
		}, (error)=> {
			this.resetMessage = error.data.message;
			this.errorOnReset = true;
			this.reset = {};
			this.$timeout(() => {
				this.errorOnReset = false;
				this.resetMessage = '';
			}, 5000);
		})
	}
}

angular.module('auth').controller('AuthProfileController', AuthProfileController);


