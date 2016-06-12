var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 54.348536, lng: 18.653224},
        zoom: 17
    });

    var infowindow = new google.maps.InfoWindow;


    var marker, i;

    for (i = 0; i < objects.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(objects[i].position[0], objects[i].position[1]),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(objects[i].name);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}