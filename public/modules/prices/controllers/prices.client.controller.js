'use strict';

class PricesController {
	// @ngInject
	constructor(PricesService, AuthFactory) {
		// init inject variables
		this.pricesService = PricesService;
		this.authFactory = AuthFactory;
		// init custom variables
		this.allStaff = [];
		this.message = '';
		this.token = this.authFactory.getTokenFromLocalStorage();

		// call methods
		this.init();
	}

	init() {
		console.log(this.token);
		this.pricesService.get(this.token)
			.then((data) => {
				console.log(data.data.length);
				if (!data.data.length) {
					this.message = 'Sorry, you do not have any staff!';
				}
			}, (error) => {
				this.message = error.message
			});
	};

	addStaff() {
		let newStaff = {
			type: "New staff",
			price: "Price",
			isEdit: false
		};
		this.allStaff.push(newStaff);
	};

	edit(index) {
		this.allStaff[index].isEdit = true;
	};

	add(index) {
		this.allStaff[index].isEdit = false;
		delete this.allStaff[index].isEdit;
		if (this.allStaff[index].id) {
			console.log("i am have id");
		} else {
			console.log("i am new one!")
			this.pricesService.save(this.allStaff[index], this.token)
				.then((data) => {
					console.log(data);
				}, (error) => {
					console.log(error);
				});
		}

	};
}

angular.module('prices').controller('PricesController', PricesController);
