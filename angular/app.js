(function(){
    var app = angular.module('travelApp', []);
    app.controller('buttonsCtrl',funcButtonCtrl);
    app.controller('mainCtrl', funcMainCtrl);
    app.directive('navbar',showNavbar);
    app.directive('tiles',showTiles);


    /* app controller for navigation buttons */
    function funcButtonCtrl() {
        var bc = this;
        startMap();
        bc.monuments = objects;
        bc.views = ['Mapa','Kafelki'];
        bc.startPoint = 'Punkt startowy';
        bc.endPoint = 'Punkt końcowy';
        bc.currView = 'Zmień widok';
        bc.setStart = function(place){
            bc.startPoint = place;
        };
        bc.setEnd = function(place){
            bc.endPoint = place;
        };
        bc.setView = function(view) {
            bc.currView = view;
            if (view === bc.views[0]) {
                startMap();
            } else if (view === bc.views[1]){
                startTiles();
            }
        };
        function startMap(){
            bc.showMap = true;
        }
        function startTiles(){
            bc.showMap = false;
            setTimeout(function() {
                $('#drag').bxSlider({
                    slideWidth: 180,
                    minSlides: 2,
                    maxSlides: Math.floor(screen.width / 180),
                    moveSlides: 1,
                    slideMargin: 20
                });
            },0);
            $('#dropS').sortable({
                items: "> .card",
                receive: function () {
                    $('#dropS').find('.dropplace').hide();
                    if ($('#dropS').find('.card').length > 1) {$('#dropS').find('.card').eq(1).remove()}
                    $('#startPointDropdownMenu').text($('#dropS').find('.card-title').text());
                }
            });
            $('#dropE').sortable({
                revert: true,
                items: "> .card",
                receive: function() {
                    $('#dropE').find('.dropplace').hide();
                    if ($('#dropE').find('.card').length > 1) {$('#dropE').find('.card').eq(1).remove()}
                    $('#endPointDropdownMenu').text($('#dropE').find('.card-title').text());
                }
            });
            objects.forEach(function(monument){
                $('#'+monument.id).draggable({
                    connectToSortable: "#dropS, #dropE",
                    helper: "clone",
                    revert: "invalid"
                });
            });
        }
    }

    /* app controller for main content */
    function funcMainCtrl(){
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
})();