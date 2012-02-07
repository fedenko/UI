<?php
	if ( !$module_settings ) {
		require( "settings.php" );
	}
	
	if ( $_COOKIE[ "cl_session" ] == $_ini_password ) {
		if ( file_exists( "install.php" ) ) {
			unlink( "install.php" );
		}
		header( "Location: " . $_SERVER[ "HTTP_REFERER" ] );
	} else {
		header( "Location: " . $_ini_http_path . "/lib/admin/" );
	}
?>