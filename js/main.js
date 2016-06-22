'use strict';
var startPosition, endPosition;
var walkingRoute = [];
var walkingRoute2 = [];

$(document).ready(function() {

    

/*    $('#changeView').on('click', function(){
    if ($('#changeViewsdsd').text() === 'Mapa') {
        $('main').css({'height': '95%'});
        $('.cont').css({'overflow': 'hidden'});
        $('#infoWindow').css({'width': '0', 'height': '0'});
    } else if ($('#changeViewsdsd').text() === 'Kafelki'){
        $('main').css({'height': ''});
        $('.cont').css({'overflow': 'inherit'});
        
    }
    });*/

    $('#btnShowMeTheWay').on('click', function () {

        objects.forEach(function(object){
           if ($('#startPointDropdownMenu').text() === object.name) {
               startPosition = object.id;
           }
            if ($('#endPointDropdownMenu').text() === object.name) {
                endPosition = object.id;
            }
        });

        if ((startPosition !== undefined) && (endPosition !== undefined) &&(startPosition !== endPosition)) {

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
            $('#routeWindow').css({'width': '25%', 'height': '40%'}).data('show',true).find('p').remove();
            walkingRoute2.forEach(function(item){
                $('#routeWindow').append($('<p>').text(objects[item].name));
            });
            $('main').css({'height': '95%'});
            $('.cont').css({'overflow': 'hidden'});
            initRoute();
            $('#changeViewsdsd').text('Mapa');
        }
    });

    $('#btnStartInfo').on('click', function() {
        $('#startPointDropdownMenu').text($('#infoWindow').find('h5').text());
    });

    $('#btnEndInfo').on('click', function() {
        $('#endPointDropdownMenu').text($('#infoWindow').find('h5').text());
    });

    


});