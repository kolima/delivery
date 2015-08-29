'use strict';

class DeliveriesController {
    // @ngInject
    constructor($window) {
        this.$window = $window;
        this.init();


    }

    init() {
        if (this.$window.mapIsLoaded) {
            this.initGoogleMap();
        } else {
            this.$window.initMap = this.initGoogleMap.bind(this);
        }
    }

    initGoogleMap() {
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: {lat: 37.77, lng: -122.447}
        });
        directionsDisplay.setMap(map);

        this.$window.mapIsLoaded = true;
        this.calculateAndDisplayRoute(directionsService, directionsDisplay);
    }

    calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
            origin: {lat: 37.77, lng: -122.447},
            destination: {lat: 37.768, lng: -122.511},

            travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            } else {
                conosle.error('Directions request failed due to ' + status);
            }
        });
    }
}

angular.module('deliveries').controller('DeliveriesController', DeliveriesController);
