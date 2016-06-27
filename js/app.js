(function(){
    var app = angular.module('travelApp', []);

    app.controller('TravelCtrl', function ($scope) {

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


    });
})();

