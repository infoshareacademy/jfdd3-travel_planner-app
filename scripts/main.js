function calculateDistance(firstPoint, secondPoint){
    return Math.sqrt(Math.pow((firstPoint[0] - secondPoint[0])*112.23, 2) + Math.pow((firstPoint[1] - secondPoint[1])*65.522, 2))
}

objects.forEach(function(monument) {
    $('body').append($('<div>').text(monument.name))
});
$('form').on('submit', function(event) {
    event.preventDefault();
    var positionStart, positionEnd, indexOfStart, indexOfEnd;
    var shortestRoute = 100;
    objects.forEach(function(object) {
        if (object.name == $('#start').val()) {
            positionStart = object.position;
            indexOfStart = objects.indexOf(object);
        }
    });
    objects.forEach(function(object) {
        if (object.name == $('#end').val()) {
            positionEnd = object.position;
            indexOfEnd = objects.indexOf(object);
        }
    });
    console.log(positionStart);
    console.log(positionEnd);
    var distance;
    if ($('#0-way:checked').length === 1) {
        distance = calculateDistance(positionStart,positionEnd);
        console.log((distance).toFixed(3)+' km');
    }
    if ($('#1-way:checked').length === 1) {
        var waypoint;
        objects.forEach(function(object,index) {
            if ((index !== indexOfStart) && (index !== indexOfEnd)){
                var distance1 = calculateDistance(positionStart,object.position);
                var distance2 = calculateDistance(object.position,positionEnd);
                distance = distance1 + distance2;
                if (distance < shortestRoute) {
                    shortestRoute = distance;
                    waypoint = object;
                }
            }
        });
        console.log((distance).toFixed(3)+' km przez: '+waypoint.name);
    }
    if ($('#2-way:checked').length ===1) {
        var waypoint1, waypoint2;
        objects.forEach(function(object,index) {
            if ((index !== indexOfStart) && (index !== indexOfEnd)){
                objects.forEach(function(object2,index2) {
                    if ((index2 !== indexOfStart) && (index2 !== indexOfEnd) && (index2 !== index)) {
                        var distance1 = calculateDistance(positionStart,object.position);
                        var distance2 = calculateDistance(object.position, object2.position);
                        var distance3 = calculateDistance(object2.position,positionEnd);
                        distance = distance1 + distance2 + distance3;
                        if (distance < shortestRoute) {
                            shortestRoute = distance;
                            waypoint1 = object;
                            waypoint2 = object2;
                        }
                    }
                })
            }
        });
        console.log((distance).toFixed(3)+' km przez: '+waypoint1.name+', a następnie: '+waypoint2.name);
    }
});