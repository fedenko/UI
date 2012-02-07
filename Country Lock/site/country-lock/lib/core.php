<?php
	// Load our utilities...
	// require( "util.php" );
	
	// Grab the clients browser data and explode the language out of it.
	$country = explode( ",", $_SERVER[ "HTTP_ACCEPT_LANGUAGE" ] );
	$country = strtolower( $country[ 0 ] );
	
	// Check our type of restriction
	if ( $type == "blacklist" ) {
		// Search the string for the clients country.
		if ( strstr( $countries, $country ) ) {
			// If anything is found, block the client.
			header( "Location: http://" . $_SERVER[ "SERVER_NAME" ] . "/country-lock/block.php" );
		}
	} else {
		// If we are whitelisting, make an exception:
		// Search the string for the clients country.
		if ( !strstr( $countries, $country ) ) {
			// If anything is found, block the client.
			header( "Location: http://" . $_SERVER[ "SERVER_NAME" ] . "/country-lock/block.php" );
		}
	}
?>