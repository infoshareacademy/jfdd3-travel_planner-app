(function(){
    var app = angular.module('travelApp', []);
    app.controller('buttonsCtrl',funcButtonCtrl);
    app.directive('navbar',showNavbar);
    app.directive('tiles',showTiles);
    app.filter('lengthFormat',funcLengthFilter);
    app.filter('dateFormat',funcDateFilter);

    /* app controller for navigation buttons */
    function funcButtonCtrl($scope,$timeout) {
        var bc = this;
        bc.showMap = true;
        bc.showIntro = true;
        bc.showRoute = false;
        bc.showWaypoints = false;
        bc.descriptionShow = false;
        bc.signedIn = false;
        bc.views = ['Mapa','Kafelki'];
        bc.startPoint = 'Punkt startowy';
        bc.endPoint = 'Punkt końcowy';
        bc.currView = 'Zmień widok';
        //global var for user's id token from Google
        var profileId;
        //url to API
        var url = 'https://mysterious-taiga-39537.herokuapp.com/api/userData';
        // array for storing/updating local storage data
        var savedRoutes;
        // array holding currently viewed route
        var routeToSave;


        window.gmapReady = function(){

            var options = {
                "async": true,
                "crossDomain": true,
                "url": "json/monumentsData.json",
                "method": "GET"
            };

            $.ajax(options)
                .done(function (data) {
                    showResponse(data);
                })
                .fail(function () {
                    $('#intro').append($('<p>').text('Wystąpił problem z aplikacją. Spróbuj ponownie później.'));
                });

            function showResponse(data) {
                bc.monuments = data;
                objects = data;
                bc.showIntro = false;
                $timeout(function () {
                    introJs().start();
                    bc.showIntro = false;
                    initMap();
                },0);
            }
        };


        window.onSignIn = function(googleUser) {
            var profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.

            //  Get user id token and store it in global variable
            // profileId = googleUser.getAuthResponse().id_token;
            profileId = profile.getEmail();
            console.log(profileId);

            console.log('Name: ' + profile.getName());
            bc.name = profile.getName().split(' ')[0];
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
            $scope.$apply(bc.signedIn = true);
            console.log(bc.signedIn);

            //  get last searched route using API
              getFromRemoteAPI();


        };




        bc.onSignOut = function() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
                $scope.$apply(bc.signedIn = false);
                console.log(bc.signedIn);
            });
        };




        bc.setStart = function(id,val){
            bc.startPoint = objects[id].name;
            bc.startId = id;
            if (val) {$scope.$apply(function(){bc.startPoint});}
            $('#dropS').trigger("sortreceive", [{item: $('#'+id)}]);
            $('#waypointsCards').children().remove();
        };
        bc.setEnd = function(id,val){
            bc.endPoint = objects[id].name;
            bc.endId = id;
            if (val) {$scope.$apply(function(){bc.endPoint});}
            $('#dropE').trigger("sortreceive", [{item: $('#'+id)}]);
            $('#waypointsCards').children().remove();
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
                bc.showRoute = true;
                $('#waypointsCards').children().remove();
                if (bc.currView === bc.views[1]) {
                    bc.setView('Mapa');
                }
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
                if (walkingRouteForGoogle.length > 2) {
                    bc.showWaypoints = true;
                    walkingRouteForGoogle.forEach(function (card, index) {
                        if (index !== 0 && index !== walkingRouteForGoogle.length - 1) {
                            var $card = $('<div>').addClass('miniCard').append($('<img>').attr('src',bc.monuments[card].url)).append($('<h5>').text(bc.monuments[card].name));
                            $card.find('.infoMarker').remove();
                            $('#waypointsCards').append($card);

                        }
                    });
                } else {
                    bc.showWaypoints = false;
                    $('#waypointsCards').children().remove();
                }
                bc.route = walkingRouteForGoogle;
                initRoute(function (result) {
                    bc.distance = result.routes[0].legs.reduce(function (prev, curr) {
                        return prev + curr.distance.value;
                    }, 0);
                    bc.duration = result.routes[0].legs.reduce(function (prev, curr) {
                        return prev + curr.duration.value;
                    }, 0);
                    $scope.$apply(function () {
                        bc.distance;
                        bc.duration;
                    });

                });

                /*    save route to local storage */
                saveToLocalStorage();
                postToRemoteAPI();
            }

            function saveToLocalStorage() {
                // array for storing/updating local storage data
                savedRoutes = [];
                // array holding currently viewed route
                routeToSave = bc.route;
                // if local storage isn't empty do:
                if(localStorage.length !== 0) {
                    // parse JSON array of objects to an array
                    savedRoutes = JSON.parse(localStorage.savedRoutes);
                    // iterate through array, check if logged user is same ase  user in local storage and add new route
                    for (var j = 0; j < savedRoutes.length; j++) {
                        // if profileId in object is equal to current user google id token
                        if (profileId === savedRoutes[j].userId) {
                            // push currently viewed route to logged in user's route array
                            savedRoutes[j].route.push(routeToSave);
                            // send whole array of objects back to local storage overwriting what's there
                            localStorage.setItem("savedRoutes", JSON.stringify(savedRoutes));
                        }
                    }
                } else {
                    //  if local storage is empty send current user id token and currently viewed route to local storage
                    localStorage.setItem('savedRoutes', JSON.stringify([{userId: profileId, route: [routeToSave] }]));
                }
            }
        };

        // self explanatory...
        function getFromRemoteAPI() {
           return $.ajax({
                type: 'GET',
                url: url,
                dataType: 'json',
                async: true,
                success: function(result, status) {
                    console.info("Get from API: " + status);
                    var downloadedRoutes = result.filter(function (element) {
                        return element.profileId === profileId;
                    });
                    // TODO wylap bledy i inne pierdoly
                    // tu odpal wyswietlenie ostatnio wyszukanej trasy
                    if(downloadedRoutes.length >0) {
                    var lastRoute = downloadedRoutes[downloadedRoutes.length-1].route;
                    bc.setStart(lastRoute[0],true);
                    bc.setEnd(lastRoute[lastRoute.length -1], true);
                    bc.showWay();
                    }
                },
                error: function(error) {
                    console.error(error);
                }
            });
        }

        function postToRemoteAPI() {
            $.ajax({
                type: 'POST',
                url: url,
                contentType: 'application/json',
                data: JSON.stringify({profileId: profileId, route: routeToSave }),
                success: function(result, status) {
                    console.info("Post to API: " + status)
                },
                error: function(error) {
                    console.error(error);
                }
            });
        }

        bc.deleteRoute = function(){
            bc.showRoute = false;
            bc.startPoint = 'Punkt startowy';
            bc.endPoint = 'Punkt końcowy';
            $('#dropS').children().remove();
            $('#dropE').children().remove();
            $('#dropS').append($('<div>').addClass('dropplace').text('Przeciągnij element, który chcesz ustawić jako punkt startowy'));
            $('#dropE').append($('<div>').addClass('dropplace').text('Przeciągnij element, który chcesz ustawić jako punkt końcowy'));
            $('#waypointsCards').children().remove();
            $('#map').css({'width': '100%'});
            directionsDisplay.setMap(null);
            directionsDisplay = new google.maps.DirectionsRenderer;
            directionsDisplay.setMap(map);
        };

        $timeout(function(){
            $('#dropS').sortable({
                items: "> .card",
                receive: function (event,ui) {
                    if ($('#dropS').children().length > 1) {
                        $('#dropS').find('.card').eq(1).remove()
                    }
                    $('#waypointsCards').children().remove();
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
                    if ($('#dropE').children().length > 1) {
                        $('#dropE').find('.card').eq(1).remove()
                    }
                    $('#waypointsCards').children().remove();
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
            $('body').css({'overflow-y': 'hidden'});
        }
        function startTiles() {
            bc.showMap = false;
            $('body').css({'overflow-y': 'auto'});
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

        bc.showMonumentInfo = function(id){
            bc.descriptionShow = true;
            var $desc = $('#monumentDescription');
            $desc.find('img').attr('src',bc.monuments[id].url);
            $desc.find('h5').text(bc.monuments[id].name);
            $desc.find('p').text(bc.monuments[id].description);
        }

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

    function funcLengthFilter(){
        return function(length) {
            if (length>= 1000){
                var int = Math.floor(length/1000);
                length = int +' km. '+ (length-int*1000)+' m.';
            } else {
                length = length+' m.'
            }
            return length;
        }
    }

    function funcDateFilter(){
        return function(duration) {
            if (duration >= 60){
                var int = Math.floor(duration/60);
                duration = int +' min. '+ (duration-int*60)+' sek.';
            } else {
                duration = duration+' sek.'
            }
            return duration;
        }
    }


})();