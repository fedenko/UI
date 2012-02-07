/* Code based on the V3 API Google Maps. Written By Mwea. */
/* English Version */
var destMap = {
    map : null, //the google map
	marker : null,
    directionsService : null, //service that provides directions to get to our destination
    directionsDisplay : null, //rendeder that draws directions on map
    destinationName : null,
    geocoder : null,
		
    initialize: function(address,lat,lng,desc) {
	var city  = new google.maps.LatLng(lat,lng); //Coordinate the destination address.
	
	var myOptions = {
	    zoom: 13,
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	    center: city 
	};
    
	destMap.map = new google.maps.Map(document.getElementById("map"), myOptions);
	destMap.marker = new google.maps.Marker({position: city,map : destMap.map,title:desc}); //Description of the destination address  /*To change*/
	destMap.directionsDisplay = new google.maps.DirectionsRenderer();
	destMap.directionsDisplay.setMap(destMap.map);
	destMap.directionsDisplay.setPanel(document.getElementById("route"));

	destMap.directionsService = new google.maps.DirectionsService();    

	destMap.geocoder = new google.maps.Geocoder(); 
    },

    initiate_geolocation: function() {
	
	if (navigator.geolocation) {
	    // HTML5 GeoLocation
	    function getLocation(position) {
		destMap.geocode({
		    "lat": position.coords.latitude,
		    "lng": position.coords.longitude
		});
	    }
	    navigator.geolocation.getCurrentPosition(getLocation, destMap.error);
	} else {
	    // Google AJAX API fallback GeoLocation
	    if (typeof google == 'object') {
		if (google.loader.ClientLocation) {
		    destMap.geocode({
			"lat": google.loader.ClientLocation.latitude, 
			"lng": google.loader.ClientLocation.longitude
		    });
		}
	    }
	}
    },
 
    geocode : function(l) {
	latLng = new google.maps.LatLng(l.lat, l.lng);

	destMap.geocoder.geocode( { 'latLng': latLng }, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
		console.log(results[0].formatted_address);
		document.getElementById('start').value = results[0].formatted_address;
	    } else {
		alert("Geocode was not successful for the following reason: " + status);
	    }
	});
    },
	
    route : function(l)
    {
	var request = {
	    origin: document.getElementById('start').value,
	    destination: document.getElementById('end').value,
	    travelMode: google.maps.DirectionsTravelMode.DRIVING
	};

	destMap.directionsService.route(request, function(result, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
		destMap.directionsDisplay.setDirections(result);
	    }
		else if (status == google.maps.DirectionsStatus.NOT_FOUND) {
			alert("No corresponding geographic location could be found for the specified address. This may be due to a recent address, or incorrect.");
		}
	});  
    },


    error : function(e)
    {
	switch(e.code) 
	{
	case e.TIMEOUT:
	    alert ('Timeout'); 
	    break;
	case e.POSITION_UNAVAILABLE:
	    alert ('Position unavailable');
	    break;
	case e.PERMISSION_DENIED:
	    alert ('Permission denied.');
	    break;
	case e.UNKNOWN_ERROR:
	    alert ('Unknown error');
	    break;
	}
    }


};

