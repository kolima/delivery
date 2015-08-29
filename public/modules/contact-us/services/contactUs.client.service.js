'use strict';

class ContactUsService {
    constructor($http) {
        this.$http = $http;
    }

    create(data) {
        return this.$http.post('/api/v1/contact-us', data);
    }

    count() {
        return this.$http.get('/api/v1/contact-us/count');
    }

    // @ngInject
    static factory($http) {
        return new ContactUsService($http);
    }
}

angular.module('contactUs').service('ContactUsService', ContactUsService.factory);
