var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var geocoder;

/**
 * Init map settings, such as zoom and starter position
 */
function initialize() {
    geocoder = new google.maps.Geocoder();
    directionsDisplay = new google.maps.DirectionsRenderer();
    var champs = new google.maps.LatLng(48.8485035, 2.5940315);
    var mapOptions = {
        zoom:12,
        center: champs
    }
    map = new google.maps.Map(document.getElementById("mapCanvas"), mapOptions);
    directionsDisplay.setMap(map);
}

/**
 * Find an address
 */
function codeAddress() {
    var address = document.getElementById("address").value;
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

/**
 * Find a route
 */
function calcRoute() {
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    });
}

/**
 * Load google map
 */
google.maps.event.addDomListener(window, 'load', initialize);

