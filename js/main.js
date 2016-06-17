'use strict';
var startPosition, endPosition;
var walkingRoute = [];
var walkingRoute2 = [];

$(document).ready(function() {

    $('#kafle').hide();

    $('#changeView').on('click', function(){
    if ($('#changeViewsdsd').text() === 'Mapa') {
        $('#map').show();
        $('#kafle').hide();
        $('.cont').css({'overflow': 'hidden'});
        $('#infoWindow').css({'width': '0', 'height': '0'});
        if ($('#routeWindow').data('show')) {$('#routeWindow').css({'width': '25%', 'height': '40%'});}
    } else {
        $('#map').hide();
        $('#kafle').show();
        $('.cont').css({'overflow': 'auto'});
        $('#routeWindow').css({'width': '0', 'height': '0'});
    }
    });

    $('#btnShowMeTheWay').on('click', function () {

        objects.forEach(function(object){
           if ($('#startPointDropdownMenu').text() === object.name) {
               startPosition = object.id;
           }
            if ($('#endPointDropdownMenu').text() === object.name) {
                endPosition = object.id;
            }
        });

        if (startPosition !== endPosition) {

            var i = 0;
            walkingRoute = [{id: startPosition, moves: [startPosition]}];
            var end = objects[endPosition];
            var foundEnd = false;

            while (foundEnd === false) {
                var idPoint = walkingRoute[i].id;
                objects[idPoint].siblings.forEach(function (sibling) {
                    if ((walkingRoute[i].moves.some(function (item) {return sibling === item}) === false) && (foundEnd === false)) {
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
            walkingRoute2 = walkingRoute[walkingRoute.length - 1].moves;
        }
    });

    (function() {
        objects.forEach(function (object) {
            var $img = $('<img>').attr('src',object.url);
            var $img1 = $('<div>').addClass('infoMarker');
            var $p = $('<p>').addClass('card-text').text(object.name);
            var $h4 = $('<h5>').addClass('card-title').text(object.name);
            var $div3 = $('<div>').addClass('card-block').append($p);
            var $div2 = $('<div>').addClass('card-block').append($h4);
            var $div = $('<div>').addClass('card').attr('id',object.id);
            $div.append($img1).append($img).append($div2).append($div3);
            $('#kafle').append($div);
        });
    })();

    $('.card').on('click', function(){
        $('#infoWindow').css({'width': '75%', 'height': '75%', 'overflow': 'auto'});
        $('h5', '#infoWindow').text(objects[$(this).attr('id')].name);
        $('p', '#infoWindow').text(objects[$(this).attr('id')].description);
        $('img', '#infoWindow').attr('src',objects[$(this).attr('id')].url);

    });

    $('span', '#infoWindow').on('click', function(){
        $('#infoWindow').css({'width': '0', 'height': '0'});
    });

    $('span', '#routeWindow').on('click', function(){
        $('#routeWindow').css({'width': '0', 'height': '0'});
    });

    $('#btnStartInfo').on('click', function() {
        $('#startPointDropdownMenu').text($('#infoWindow').find('h5').text());
    });

    $('#btnEndInfo').on('click', function() {
        $('#endPointDropdownMenu').text($('#infoWindow').find('h5').text());
    })

});