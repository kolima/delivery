'use strict';

class DeliveriesController {
    // @ngInject
    constructor($window, DeliveriesService) {
        this.$window = $window;
        this.deliveriesService = DeliveriesService;
        this.init();


    }

    init() {
        this.deliveriesService.findFirst().then((result) => {
            if (this.$window.mapIsLoaded) {
                this.initGoogleMap(result.data);
            } else {
                this.$window.initMap = this.initGoogleMap.bind(this, result.data);
            }
        });

    }

    initGoogleMap(data) {
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: {lat: data.location.coordinates[0], lng: data.location.coordinates[1]}
        });
        directionsDisplay.setMap(map);

        this.$window.mapIsLoaded = true;
        this.calculateAndDisplayRoute(directionsService, directionsDisplay, data);
    }

    calculateAndDisplayRoute(directionsService, directionsDisplay, data) {
        directionsService.route({
            origin: {lat: data.location.coordinates[0], lng: data.location.coordinates[1]},
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
