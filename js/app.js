(function(){
    var app = angular.module('travelApp', ['ngToast']);
    app.controller('travelCtrl', funcTravelCtrl);

        function funcTravelCtrl($scope, ngToast){
            ngToast.create('a toast message...');
    }
})();