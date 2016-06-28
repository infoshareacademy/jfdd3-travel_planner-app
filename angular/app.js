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
        startMap();
        bc.showIntro = true;
        bc.showRoute = false;
        bc.showWaypoints = false;
        bc.descriptionShow = false;
        bc.views = ['Mapa','Kafelki'];
        bc.startPoint = 'Punkt startowy';
        bc.endPoint = 'Punkt końcowy';
        bc.currView = 'Zmień widok';

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
                    $('#intro').text('Wystąpił problem z aplikacją. Spróbuj ponownie później.')
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

        $scope.signedIn = false;
        $scope.signOut = signOut;

        function onSignIn(googleUser) {
            var profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
            $scope.signedIn = true;
            $scope.$apply();
            console.log($scope.signedIn);
        }

        window.onSignIn = onSignIn;

        function signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
                $scope.signedIn = false;
                $scope.$apply();
                console.log($scope.signedIn);
            });
        }

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
                bc.showRoute = true;
                $('#map').css({'width': '75%'});
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
                            var $card = $('#' + card).clone().removeClass('card slider').addClass('miniCard').attr('id', '');
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
            }
        };

        $timeout(function(){
            $('#dropS').sortable({
                items: "> .card",
                receive: function (event,ui) {
                    $('#dropS').find('.dropplace').remove();
                    if ($('#dropS').find('.card').length > 1) {
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
                    $('#dropE').find('.dropplace').remove();
                    if ($('#dropE').find('.card').length > 1) {
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