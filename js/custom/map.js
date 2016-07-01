'use strict';

var map, infowindow, directionsService, directionsDisplay;
var objects, waypts, startPosition, endPosition;
var walkingRouteForGoogle = [];

function initMap(){
    var markers = [];
    var bounds = new google.maps.LatLngBounds();

    map = new google.maps.Map(document.getElementById('map'), {
        disableDefaultUI: true
    });


    infowindow = new google.maps.InfoWindow({
        pixelOffset: new google.maps.Size(-25, 0),
        maxWidth: 392
    });


    google.maps.event.addListener(infowindow, 'domready', function () {
        $('.info_content').closest('.gm-style-iw').parent().addClass('custom-iw');
    });

    var marker, i;
    var infoWindowContent = [];


// Automatically center the map, fitting all markers on the screen
    setTimeout(function() {
        map.fitBounds(bounds);
    },100);


// Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
        this.setZoom(17);
        google.maps.event.removeListener(boundsListener);
    });

    for (i = 0; i < objects.length; i++) {
        infoWindowContent.push(
            '<div class="info_content">' +
            '<h3>' + objects[i].name + '</h3>' +
            '<img src=' + objects[i].url + '>' +
            '<p>' + objects[i].description + '</p>' +
            '</div>'
        );
    }


    for (i = 0; i < objects.length; i++) {

        var image = {
            url: 'images/marker.png',
            size: new google.maps.Size(110, 180),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(10, 80),
            scaledSize: new google.maps.Size(55, 90)
        };

        var position = new google.maps.LatLng(objects[i].position[0], objects[i].position[1]);
        bounds.extend(position);


        marker = new google.maps.Marker({
            position: position,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: image
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(infoWindowContent[i]);
                infowindow.open(map, marker);
            }
        })(marker, i));
        //Add new marker to list of markers (to keep track of them)
        markers.push(marker);
    }

    //direction services
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    //set direction service for map
    directionsDisplay.setMap(map);
}

function initRoute(callbackToShowWay) {

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
        waypoints: waypts,
        travelMode: google.maps.TravelMode.WALKING
    }, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            callbackToShowWay(response);

        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
    // czyszczenie tablic po wyliczeniu tablic
    waypts = [];
}










