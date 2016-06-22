(function(){
    var app = angular.module('travelApp', []);
    app.controller('buttonsCtrl',funcButtonCtrl);
    app.controller('mainCtrl', funcMainCtrl);
    app.directive('navbar',showNavbar);
    app.directive('map',showMap);
    app.directive('tiles',showTiles);


    /* app controller for navigation buttons */
    function funcButtonCtrl() {
        var bc = this;
        bc.showMap = true;
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
            view === 'Mapa' ? bc.showMap = true : bc.showMap=false;
        };

    }

    /* app controller for main content */
    function funcMainCtrl(){
        var mc = this;
    }

    function showNavbar() {
        return {
            restrict: 'E',
            templateUrl: 'navbar.html'
        }
    }

    function showMap(){
       return {
           restrict: 'E',
           templateUrl: 'map.html'
       }
    }

    function showTiles(){
        return {
            restrict: 'E',
            templateUrl: 'tiles.html'
        }
    }
})();