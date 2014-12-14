var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var geocoder;
var marker;
var infowindow;

/**
 * Init map settings, such as zoom and starter position
 */
function initialize() {

    var mapOptions = {
        zoom:12,
        center: champs
    }
    map = new google.maps.Map(document.getElementById("mapCanvas"), mapOptions);
    
    geocoder = new google.maps.Geocoder();
    directionsDisplay = new google.maps.DirectionsRenderer();
    var champs = new google.maps.LatLng(48.8485035, 2.5940315);
    
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
function codeAddress() {
    infowindow.close();
    marker.setVisible(false);
    var address = document.getElementById("address").value;
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
            alert('Geocode was not successful for the following reason: ' + status);
            window.location.href = "index.html";
        }
    });
}

/**
 * Find a route
 */
function calcRoute() {
    infowindow.close();
    marker.setVisible(false);
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        } else {
            alert('Direction was not successful for the following reason: ' + status);
            window.location.href = "index.html";
        }
    });
}

/**
 * Load google map
 */
google.maps.event.addDomListener(window, 'load', initialize);

