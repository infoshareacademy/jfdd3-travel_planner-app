'use strict';
var app = angular.module('travelPlanner',[]);
app.controller('changeView', changeviewmode);

function changeviewmode($scope){
    $scope.showMap = true;
    $scope.changeViewMode = function(boolean){
       $scope.showMap = boolean;
    };
}