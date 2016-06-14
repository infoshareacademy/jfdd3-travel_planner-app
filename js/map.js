var map;


function initMap() {
    var bounds = new google.maps.LatLngBounds();

    map = new google.maps.Map(document.getElementById('map'));

    var infowindow = new google.maps.InfoWindow;


    var marker, i;
    var infoWindowContent = [];

    for (i = 0; i < objects.length; i++) {
                infoWindowContent.push('<div class="info_content">' +
                '<h3>' + objects[i].name + '</h3>' +
                '</br>' +
                '<img src=' + objects[i].url +  '>' +
                '<button type="button" class="infoWindowBtnStart" id="'+objects[i].name+'"> ' +
                "Początek trasy" + '</button>' + 
                '<button type="button" class="infoWindowBtnEnd" id="'+objects[i].name+'">' +
                "Koniec trasy" + '</button>' +
                '<p>' + objects[i].description + '</p>' + '</div>');
        }


    for (i = 0; i < objects.length; i++) {


            var position = new google.maps.LatLng(objects[i].position[0], objects[i].position[1]);
            bounds.extend(position);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                animation: google.maps.Animation.DROP
            });



        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(infoWindowContent[i]);
                infowindow.open(map, marker);
                $('.infoWindowBtnStart').on('click', function(){
                    $('#startPointDropdownMenu').text($(this).attr('id'));
                });
                $('.infoWindowBtnEnd').on('click', function(){
                    $('#endPointDropdownMenu').text($(this).attr('id'));
                });
            }
        })(marker, i));

        // Automatically center the map, fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(16);
        google.maps.event.removeListener(boundsListener);
    });
}