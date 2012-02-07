<?php
	if ( !$module_settings ) {
		require( "settings.php" );
	}
	
	function page_load( $page, $class = false ) {
		if ( $class ) {
			return file_get_contents( dirname( __FILE__ ) . "/pages/" . $class . "/" . $page . ".php" );
		} else {
			return file_get_contents( dirname( __FILE__ ) . "/pages/" . $page . ".php" );
		}
	}
	
	$module_page = true;
?>