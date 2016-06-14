/**
 * Created by Chris on 14/06/2016.
 */
'use strict';

function generateStartMenu() {
objects.forEach(function(item) {
    $('#startDropped').append($('<button>').addClass('dropdown-item').text(item.name));
    console.log(item.name)
});
}


function generateEndMenu() {
    objects.forEach(function(item) {
        $('#endDropped').append($('<button>').addClass('dropdown-item').text(item.name));
        console.log(item.name)
    });
};


generateEndMenu();
generateStartMenu();


