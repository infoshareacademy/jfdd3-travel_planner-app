var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 54.348545, lng: 18.6510408},
        zoom: 17
    });


    var marker = new google.maps.Marker({
        position: {lat: 54.348545, lng: 18.6510408},
        map: map,
        title: 'Hello World!'
    });
}