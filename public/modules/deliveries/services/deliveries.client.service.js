'use strict';

class DeliveriesService {
    constructor($http) {
        this.$http = $http;
    }

    findFirst() {
        return this.$http.get('/api/v1/deliveries/first');
    }

    // @ngInject
    static factory($http) {
        return new DeliveriesService($http);
    }
}

angular.module('deliveries').service('DeliveriesService', DeliveriesService.factory);