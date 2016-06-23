(function(){
    var app = angular.module('travelApp', []);
    app.controller('buttonsCtrl',funcButtonCtrl);
    app.controller('mainCtrl', funcMainCtrl);
    app.directive('navbar',showNavbar);
    app.directive('tiles',showTiles);



    /* app controller for navigation buttons */
    function funcButtonCtrl($scope) {
        var bc = this;
        startMap();
        bc.monuments = objects;
        bc.views = ['Mapa','Kafelki'];
        bc.startPoint = 'Punkt startowy';
        bc.endPoint = 'Punkt końcowy';
        bc.currView = 'Zmień widok';
        bc.setStart = function(id,val){
            bc.startPoint = objects[id].name;
            bc.startId = id;
            if (val) {$scope.$apply(function(){bc.startPoint});}
            $('#dropS').trigger("sortreceive", [{item: $('#'+id)}]);
        };
        bc.setEnd = function(id,val){
            bc.endPoint = objects[id].name;
            bc.endId = id;
            if (val) {$scope.$apply(function(){bc.endPoint});}
            $('#dropE').trigger("sortreceive", [{item: $('#'+id)}]);
        };
        bc.setView = function(view) {
            bc.currView = view;
            if (view === bc.views[0]) {
                startMap();
            } else if (view === bc.views[1]){
                startTiles();
            }
        };

        bc.showWay = function () {
            if ((bc.startPoint !== 'Punkt startowy') && (bc.endPoint !== 'Punkt końcowy') && (bc.startPoint !== bc.endPoint)) {

                var i = 0;
                startPosition = bc.startId;
                endPosition = bc.endId;
                var walkingRoute = [{id: bc.startId, moves: [bc.startId]}];
                var end = objects[bc.endId];
                var foundEnd = false;

                while (foundEnd === false) {
                    var idPoint = walkingRoute[i].id;
                    objects[idPoint].siblings.forEach(function (sibling) {
                        if ((walkingRoute[i].moves.some(function (item) {
                                return sibling === item
                            }) === false) && (foundEnd === false)) {
                            var object = {};
                            object.id = sibling;
                            object.moves = walkingRoute[i].moves.slice();
                            object.moves.push(sibling);
                            walkingRoute.push(object);
                            if (object.id === end.id) {
                                foundEnd = true;
                            }
                        }
                    });
                    i++;
                }
                walkingRouteForGoogle = walkingRoute[walkingRoute.length - 1].moves;
                initRoute();
            }
        };
    setTimeout(function(){
        $('#dropS').sortable({
            items: "> .card",
            receive: function (event,ui) {
                $('#dropS').find('.dropplace').remove();
                if ($('#dropS').find('.card').length > 1) {
                    $('#dropS').find('.card').eq(1).remove()
                }
                bc.setStart($(ui.item).attr('id'),true);
            }
        });
        $('#dropS').on('sortreceive', function (event,item) {
            $('#dropS').children().remove();
            $('#dropS').append($(item.item).clone());
        });
        $('#dropE').sortable({
            items: "> .card",
            receive: function (event,ui) {
                $('#dropE').find('.dropplace').remove();
                if ($('#dropE').find('.card').length > 1) {
                    $('#dropE').find('.card').eq(1).remove()
                }
                bc.setEnd($(ui.item).attr('id'),true);
            }
        });
        $('#dropE').on('sortreceive', function (event,item) {
            $('#dropE').children().remove();
            $('#dropE').append($(item.item).clone());
        });
    },0);

        function startMap(){
            bc.showMap = true;
        }
        function startTiles() {
            bc.showMap = false;
            setTimeout(function () {
                $('#drag').bxSlider({
                    slideWidth: 180,
                    minSlides: 2,
                    maxSlides: Math.floor(screen.width / 180),
                    moveSlides: 1,
                    slideMargin: 20
                });
            }, 0);
            
            objects.forEach(function (monument) {
                $('#' + monument.id).draggable({
                    connectToSortable: "#dropS, #dropE",
                    helper: "clone",
                    revert: "invalid"
                });
            });
        }
    }

    /* app controller for main content */
    function funcMainCtrl($scope,$window){
        var mc = this;
        mc.showMonumentInfo = function(id){
            $('#infoWindow').css({'width': '75%', 'height': '75%', 'overflow': 'auto','visibility': 'visible'});
            $('h5', '#infoWindow').text(objects[id].name);
            $('p', '#infoWindow').text(objects[id].description);
            $('img', '#infoWindow').attr('src',objects[id].url);
        };
        mc.showInfoWindow = function(){
            $('#infoWindow').css({'width': '0', 'height': '0'});
            setTimeout(function(){$('#infoWindow').css({'visibility': 'hidden'})},1000)
        };

        var markers = [];
        var bounds = new google.maps.LatLngBounds();

        $window.map = new google.maps.Map(document.getElementById('map'), {
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
        map.fitBounds(bounds);

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
                '<div class="infoWindowButtons"> ' +
                '<button type="button" class="btn btn-primary infoWindowBtnStart" ng-click="bc.setStart(0)"> ' +
                "Początek trasy" + '</button>' +
                '<button type="button" class="btn btn-primary infoWindowBtnEnd" ng-click="bc.setEnd(0)">' +
                "Koniec trasy" + '</button>' +
                '</div>' +
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


                    // //adds toggle bounce to marker on click
                    // if (marker.getAnimation() !== null) {
                    //     marker.setAnimation(null);
                    // } else {
                    //     marker.setAnimation(google.maps.Animation.BOUNCE);
                    // }
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

    function showNavbar() {
        return {
            restrict: 'E',
            templateUrl: 'navbar.html'
        }
    }

    function showTiles(){
        return {
            restrict: 'E',
            templateUrl: 'tiles.html'
            }
        }
})();