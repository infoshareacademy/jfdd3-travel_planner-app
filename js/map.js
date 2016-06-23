'use strict';

var map, infowindow, directionsService, directionsDisplay;
var waypts, startPosition, endPosition;
var walkingRouteForGoogle = [];


function initRoute() {



    calculateAndDisplayRoute(directionsService, directionsDisplay);


    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        waypts = [];
        for (var i = 1; i < walkingRouteForGoogle.length-1; i++) {
            waypts.push({
                location: ""+ objects[walkingRouteForGoogle[i]].position[0] + "," + objects[walkingRouteForGoogle[i]].position[1],
                stopover: true
            });
        }
    }

    directionsService.route({
        origin: "" + objects[startPosition].position[0] + ","  +  objects[startPosition].position[1],
        destination: "" + objects[endPosition].position[0] + ","  +  objects[endPosition].position[1],
        // origin: "" + objects[startPosition].position[0] + ","  +  objects[startPosition].position[1],
        // destination: "" + objects[endPosition].position[0] + "," + objects[endPosition].position[1],
        waypoints: waypts,
        // optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.WALKING
    }, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            // this part print out route steps

        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
    // czyszczenie tablic po wyliczeniu tablic
    waypts = [];
    walkingRouteForGoogle = [];
}









