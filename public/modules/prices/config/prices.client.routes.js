'use strict';

class PricesRoutes {
    constructor($stateProvider, $locationProvider) {
        this.$stateProvider = $stateProvider;
        this.init();
		this.$$locationProvider = $locationProvider
		this.$$locationProvider.html5Mode(true);
    }

    init() {
        this.$stateProvider
            .state('sidebar.prices', {
                url: '/prices',
                controller: 'PricesController',
                controllerAs: 'vm',
                templateUrl: '/modules/prices/views/list-prices.client.view.html'
            });
    }

    // @ngInject
    static factory($stateProvider, $locationProvider){
        return new PricesRoutes($stateProvider, $locationProvider);
    }
}

angular.module('prices').config(PricesRoutes.factory);
