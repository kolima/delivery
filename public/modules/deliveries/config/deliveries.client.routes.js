'use strict';

class DeliveriesRoutes {
    constructor($stateProvider) {
        this.$stateProvider = $stateProvider;
        this.init();
    }

    init() {
        this.$stateProvider
            .state('deliveries', {
                url: '/deliveries',
                controller: 'DeliveriesController',
                controllerAs: 'vm',
                templateUrl: '/modules/deliveries/views/list-deliveries.client.view.html'
            });
    }

    // @ngInject
    static factory($stateProvider){
        return new DeliveriesRoutes($stateProvider);
    }
}

angular.module('deliveries').config(DeliveriesRoutes.factory);