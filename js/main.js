'use strict';

$(document).ready(function() {
    var startPosition, endPosition;

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
            var route = [{id: startPosition, moves: [startPosition]}];
            var end = objects[endPosition];
            var foundEnd = false;

            while (foundEnd === false) {
                var idPoint = route[i].id;
                objects[idPoint].siblings.forEach(function (sibling) {
                    if ((route[i].moves.some(function (item) {return sibling === item}) === false) && (foundEnd === false)) {
                        var object = {};
                        object.id = sibling;
                        object.moves = route[i].moves.slice();
                        object.moves.push(sibling);
                        route.push(object);
                        if (object.id === end.id) {
                            foundEnd = true;
                        }
                    }
                });
                i++;
            }
            console.info('Twoja trasa z: '+objects[startPosition].name+' do: '+objects[endPosition].name);
            route[route.length - 1].moves.forEach(function(move){
                console.log(objects[move].name);
            });
        }
    })
});