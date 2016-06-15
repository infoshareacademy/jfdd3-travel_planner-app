'use strict';

var map;
var infowindow;
var markers = [];

function initMap() {
    var bounds = new google.maps.LatLngBounds();

    map = new google.maps.Map(document.getElementById('map'));

    infowindow = new google.maps.InfoWindow({
        pixelOffset: new google.maps.Size(-25, 0),
        maxWidth: 342
    });

    google.maps.event.addListener(infowindow, 'domready', function () {
        $('.info_content').closest('.gm-style-iw').parent().addClass('custom-iw');
        $(".gm-style-iw").next("div").css({
            opacity: '1', // by default the close button has an opacity of 0.7
            right: '38px', top: '3px', // button repositioning
            border: '7px solid #48b5e9', // increasing button border and new color
            'border-radius': '13px', // circular effect
            'box-shadow': '0 0 5px #3990B9' // 3D effect to highlight the button
        });

    });

    var marker, i;
    var infoWindowContent = [];


    // Automatically center the map, fitting all markers on the screen
    map.fitBounds(bounds);

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
        this.setZoom(16);
        google.maps.event.removeListener(boundsListener);
    });

    for (i = 0; i < objects.length; i++) {
        infoWindowContent.push(
            '<div class="info_content">' +
            '<h3>' + objects[i].name + '</h3>' +
            '<div class="infoWindowButtons"> ' +
            '<button type="button" class="btn btn-primary infoWindowBtnStart" id="' + objects[i].name + '"> ' +
            "Początek trasy" + '</button>' +
            '<button type="button" class="btn btn-primary infoWindowBtnEnd" id="' + objects[i].name + '">' +
            "Koniec trasy" + '</button>' +
            '</div>' +
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
            $('info-content').closest('.gm-style-iw').parent().addClass('custom-iw');
            return function () {
                infowindow.setContent(infoWindowContent[i]);
                infowindow.open(map, marker);


                //change button text in top menu
                $('.infoWindowBtnStart').on('click', function () {
                    $('#startPointDropdownMenu').text($(this).attr('id'));
                });
                $('.infoWindowBtnEnd').on('click', function () {
                    $('#endPointDropdownMenu').text($(this).attr('id'));
                });

                //adds toggle bounce to marker on click
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
            }
        })(marker, i));
        //Add new marker to list of markers (to keep track of them)
        markers.push(marker);
    }
}





