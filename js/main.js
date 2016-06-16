'use strict';
var startPosition, endPosition;
var walkingRoute = [];
var walkingRoute2 = [];

$(document).ready(function() {
    

    $('#btnShowMeTheWay').on('click',function(){

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
            console.info('Twoja trasa z: '+objects[startPosition].name+' do: '+objects[endPosition].name);
            walkingRoute2 = walkingRoute[walkingRoute.length - 1].moves;
        }
    })
});