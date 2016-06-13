/** Created by Lukasz on 2016-06-07.
 */
$(document).ready(function () {
    var places = [
        {
            name: 'Fontanna Neptuna',
            coordinates: {lat: 54.3485481, lng: 18.6510408}
        },
        {
            name: 'Żuraw Gadński',
            coordinates: {lat: 54.3505653, lng: 18.6553181}
        },
        {
            name: 'Twierdza Wisłoujście',
            coordinates: {lat: 54.3958477, lng: 18.6769724}
        },
        {
            name: 'Westerplatte',
            coordinates: {lat: 54.4067082, lng: 18.6658734}
        }
    ];

    var coordinates = $.map(places, function (n) {

        return n.coordinates;
    });

    var randomPlaces = [];
    var markers = [];
    var map;

    function generateStartingPoints() {
        for (var i = 0; i < 2; i += 1) {

            var startingPoints = coordinates[Math.round(Math.random() * (coordinates.length - 1))];
            coordinates.splice(coordinates.indexOf(startingPoints), 1); // index of item to be removed, 1 number of elements to remove
                 randomPlaces.push(startingPoints);
        }

    }

    // function initMap() {
    //     var myLatLng = {lat: 54.3466531, lng: 18.6483953};
    //
    //     var map = new google.maps.Map(document.getElementById('map'), {
    //         zoom: 11,
    //         center: myLatLng
    //     });
    //
    // }

    function initialize() {
        var mapProp = {
            center: new google.maps.LatLng(54.3466531, 18.6483953),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
         map = new google.maps.Map(document.getElementById("googleMap"), mapProp);


    }

    function drop(){
        //clearMarkers();
        for(var i = 0; i< randomPlaces.length; i += 1) {
            addMarkerTimeOut(randomPlaces[i], (i + 1) * 500);
        }
    }

    function addMarkerTimeOut(position, timeout) {
        window.setTimeout(function(){
            markers.push(new google.maps.Marker({
                position: position,
                map: map,
                animation: google.maps.Animation.DROP
            }));
        },timeout);
    }

    google.maps.event.addDomListener(window, 'load', initialize);
    generateStartingPoints();
    drop();

   // console.log(places);
    console.log(coordinates);
    console.log(randomPlaces);









});

