/**
 * Created by Chris on 14/06/2016.
 */
'use strict';

function generateStartMenu() {
objects.forEach(function(item) {
    $('#startDropped').append($('<button>').addClass('dropdown-item start-item').text(item.name));
});
}


function generateEndMenu() {
    objects.forEach(function(item) {
        $('#endDropped').append($('<button>').addClass('dropdown-item end-item').text(item.name));
    });
};

generateEndMenu();
generateStartMenu();

$('.start-item').on('click', function (event) {
    $('#startPointDropdownMenu').text($(this).text());
});


$('.end-item').on('click', function (event) {
    $('#endPointDropdownMenu').text($(this).text());

});


