objects.forEach(function(monument) {
    $('body').append($('<div>').text(monument.name))
});
$('form').on('submit', function(event) {
    event.preventDefault();
    var positionStart, positionEnd;
    objects.forEach(function(object) {
        if (object.name == $('#start').val()) {
            positionStart = object.position;
        }
    });
    objects.forEach(function(object) {
        if (object.name == $('#end').val()) {
            positionEnd = object.position;
        }
    });
    console.log(positionStart);
    console.log(positionEnd);
    if ($('#0-way:checked').length ===1) {
        var distance = Math.sqrt(Math.pow(positionStart[0] - positionEnd[0], 2) + Math.pow(positionStart[1] - positionEnd[1], 2));
        console.log(distance);
    }
    if ($('#1-way:checked').length ===1) {
        var distance = Math.sqrt(Math.pow(positionStart[0] - positionEnd[0], 2) + Math.pow(positionStart[1] - positionEnd[1], 2));
        console.log(distance);
    }
    if ($('#2-way:checked').length ===1) {
        var distance = Math.sqrt(Math.pow(positionStart[0] - positionEnd[0], 2) + Math.pow(positionStart[1] - positionEnd[1], 2));
        console.log(distance);
    }
});