'use strict';
var startPosition, endPosition;
var walkingRoute = [];
var walkingRoute2 = [];


$(document).ready(function() {

    function hoverIn() {
        $('.abcRioButton').css({'backgroundColor': 'rgb(238, 186, 76)', 'box-shadow': 'none'});
    };

    function hoverOut() {
        $('.abcRioButton').css({'backgroundColor': 'rgb(35, 181, 178)'});
    };

    setTimeout(function(){
        $('.abcRioButtonLightBlue').css({'backgroundColor': 'rgb(35, 181, 178)', 'color': 'white', 'border-radius': '.25rem', 'box-shadow': 'none'});
    },500);

    setTimeout(function() {
        $('.abcRioButton').hover(hoverIn, hoverOut);

    },500);

    //setTimeout(function) {
    //    $('.abcRioButton').hover
    //}


    $('#intro').on('click', function () {
        introJs().start();
    });

});