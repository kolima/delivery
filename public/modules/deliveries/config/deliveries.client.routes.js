'use strict';

class DeliveriesRoutes {
    constructor($stateProvider, $locationProvider) {
        this.$stateProvider = $stateProvider;
        this.init();
		this.$$locationProvider = $locationProvider
		this.$$locationProvider.html5Mode(true);
    }

    init() {
        this.$stateProvider
            .state('sidebar.deliveries', {
                url: '/deliveries',
                controller: 'DeliveriesController',
                controllerAs: 'vm',
                templateUrl: '/modules/deliveries/views/list-deliveries.client.view.html'
            });
    }

    // @ngInject
    static factory($stateProvider, $locationProvider){
        return new DeliveriesRoutes($stateProvider, $locationProvider);
    }
}

angular.module('deliveries').config(DeliveriesRoutes.factory);
