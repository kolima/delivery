'use strict';

class PricesRoutes {
    constructor($stateProvider) {
        this.$stateProvider = $stateProvider;
        this.init();
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
    static factory($stateProvider){
        return new PricesRoutes($stateProvider);
    }
}

angular.module('prices').config(PricesRoutes.factory);
