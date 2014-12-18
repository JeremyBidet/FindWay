var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var geocoder;
var marker;
var infowindow;
var markerArray = [];
var stepDisplay;

/**
 * Init map settings, such as zoom and starter position
 */
function initialize() {

    var champs = new google.maps.LatLng(48.8485035, 2.5940315);
    var mapOptions = {
        zoom: 12,
        center: champs
    };
    map = new google.maps.Map(document.getElementById("mapCanvas"), mapOptions);
    
    geocoder = new google.maps.Geocoder();
    var rendererOptions = {
        map: map
    };
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    stepDisplay = new google.maps.InfoWindow();
    
    /** Autocomplete **/
    var place = $('#address');
    var route = { start : $('#start'), end : $('#end') };
    var autocomplete = {
        _place : new google.maps.places.Autocomplete(place),
        _start : new google.maps.places.Autocomplete(route.start),
        _end : new google.maps.places.Autocomplete(route.end)
    };
    autocomplete._place.bindTo('bounds', map);
    autocomplete._start.bindTo('bounds', map);
    autocomplete._end.bindTo('bounds', map);
    
    infowindow = new google.maps.InfoWindow();
    marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    directionsDisplay.setMap(map);
}

/**
 * Find an address
 */
function codeAddress(place) {
    infowindow.close();
    marker.setVisible(false);
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }
    // Now, clear the array itself.
    markerArray = [];
    directionsDisplay.setMap(null);
    var address = document.getElementById(place).value;
    geocoder.geocode( { 'address': address }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            marker.setPosition(results[0].geometry.location);
            marker.setVisible(true);
        } else {
            alert("Lieu introuvable :\nvérifier votre adresse de recherche !");
        }
    });
}

/**
 * Find a route
 */
function calcRoute(_start, _end) {
    infowindow.close();
    marker.setVisible(false);
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }
    directionsDisplay.setMap(null);
    markerArray = [];
    var start = document.getElementById(_start).value;
    var end = document.getElementById(_end).value;
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setMap(map);
            directionsDisplay.setDirections(response);
            showSteps(response);
        } else {
            alert("Itinéraire introuvable :\nvérifier vos adresse de départ et de destination !");
        }
    });
}

function showSteps(directionResult) {
    var myRoute = directionResult.routes[0].legs[0];

    for (var i = 0; i < myRoute.steps.length; i++) {
        var marker = new google.maps.Marker({
            position: myRoute.steps[i].start_location,
            map: map
        });
        attachInstructionText(marker, myRoute.steps[i].instructions);
        markerArray[i] = marker;
    }
}

function attachInstructionText(marker, text) {
    google.maps.event.addListener(marker, 'click', function() {
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
    });
}

/**
 * Load google map
 */
google.maps.event.addDomListener(window, 'load', initialize);

