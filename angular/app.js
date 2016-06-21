(function(){
    var app = angular.module('travelApp', []);
    app.controller('buttonsCtrl',funcButtonCtrl);
    app.controller('mainCtrl', funcTravelCtrl);
    app.directive('navbar',showNavbar);
    app.directive('map',showMap);
    app.directive('tiles',showTiles);


    function funcButtonCtrl($scope) {
        $scope.monuments = objects;
        $scope.expandButtonStart = function() {
            console.log('aaa');
        }
    }

    function funcTravelCtrl($scope){

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