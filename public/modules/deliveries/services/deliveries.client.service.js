'use strict';

class DeliveriesService {
    constructor($http) {
        this.$http = $http;
    }

    findFirst(token) {
        return this.$http.get('/api/v1/deliveries/first', {headers: {'Authorization': 'Basic ' + token}});
    }

    // @ngInject
    static factory($http) {
        return new DeliveriesService($http);
    }
}

angular.module('deliveries').service('DeliveriesService', DeliveriesService.factory);
