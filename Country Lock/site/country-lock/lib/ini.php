<?php
	function write_ini_file( $assoc_arr, $path ) { 
		$content = ""; 

		foreach ( $assoc_arr as $key => $elem ) { 
			$content .= "[" . $key . "]\n"; 
			foreach ( $elem as $key2 => $elem2 ) { 
				$content .= $key2 . " = \"" . $elem2 . "\"\n"; 
			} 
		} 

		if ( !$handle = fopen( $path, 'w' ) ) { 
			return false; 
		} 
		if ( !fwrite( $handle, $content ) ) { 
			return false; 
		}   
		fclose( $handle ); 
		return true; 
	}
	
	function write_ini_settings( $array ) {
		write_ini_file( $array, dirname( __FILE__ ) . "/cfg/settings.ini" );
	}
	
	function read_ini_settings( ) {
		return parse_ini_file( dirname( __FILE__ ) . "/cfg/settings.ini", true );
	}
	
	$module_ini = true;
?>