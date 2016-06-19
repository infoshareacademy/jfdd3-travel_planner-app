'use strict';
var startPosition, endPosition;
var walkingRoute = [];
var walkingRoute2 = [];
var ul;
var li_items;
var li_number;
var image_number = 0;
var slider_width = 0;
var image_width;
var current = 0;

$(document).ready(function() {

    $('#map').hide();



    $('#dropS').sortable({
        items: "> .card",
        receive: function () {
            $('#dropS').find('.dropplace').hide();
            if ($('#dropS').find('.card').length > 1) {$('#dropS').find('.card').eq(1).remove()}
            $('#startPointDropdownMenu').text($('#dropS').find('.card-title').text());
        }
    });
    $('#dropE').sortable({
        revert: true,
        items: "> .card",
        receive: function() {
            $('#dropE').find('.dropplace').hide();
            if ($('#dropE').find('.card').length > 1) {$('#dropE').find('.card').eq(1).remove()}
            $('#endPointDropdownMenu').text($('#dropE').find('.card-title').text());
        }
    });


    $('#changeView').on('click', function(){
    if ($('#changeViewsdsd').text() === 'Mapa') {
        $('#map').show();
        if (map === undefined) {initiMap();}
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

    var createCards = function() {
        objects.forEach(function (object) {
            var $img = $('<img>').attr('src',object.url);
            var $img1 = $('<div>').addClass('infoMarker');
            var $p = $('<p>').addClass('card-text').text(object.name);
            var $h4 = $('<h5>').addClass('card-title').text(object.name);
            var $div3 = $('<div>').addClass('card-block').append($p);
            var $div2 = $('<div>').addClass('card-block').append($h4);
            var $div = $('<div>').addClass('card slider').attr('id',object.id);
            $div.append($img1).append($img).append($div2).append($div3);
            $('#drag').append($div);
            $div.draggable({
                connectToSortable: "#dropS, #dropE",
                helper: "clone",
                revert: "invalid"
            });
        });
    };



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
    });
    createCards();
    $('#drag').bxSlider({
        slideWidth: 180,
        minSlides: 2,
        maxSlides: Math.floor(screen.width/180),
        moveSlides: 1,
        slideMargin: 20
    });
    $('.card').on('click', function(){
        $('#infoWindow').css({'width': '75%', 'height': '75%', 'overflow': 'auto'});
        $('h5', '#infoWindow').text(objects[$(this).attr('id')].name);
        $('p', '#infoWindow').text(objects[$(this).attr('id')].description);
        $('img', '#infoWindow').attr('src',objects[$(this).attr('id')].url);

    });
});