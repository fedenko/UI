<?php
	if ( !$module_ini ) {
		require( "ini.php" );
	}
	$_version = "1.4b";
	
	$update_file = fopen( "http://www.colzdragon.com/updates/country-lock.dat", "r" );
	$_ini_update_version = fread( $update_file, 4 );
	fclose( $update_file );
	
	if ( $_ini_update_version != $_version ) {
		$_ini_update = true;
	}
	
	if ( file_exists( dirname( __FILE__ ) . "/cfg/settings.ini" ) ) {
		$file = read_ini_settings( );
		
		$_ini_setup = $file[ "settings" ][ "setup" ];
		$_ini_path = $file[ "settings" ][ "path" ];
		$_ini_http_path = $file[ "settings" ][ "http_path" ];
		$_ini_password = $file[ "settings" ][ "password" ];
		if ( file_exists( dirname( __FILE__ ) . "/install.php" ) ) {
			$_ini_install_exists = true;
		}
	} else {
		$_ini_setup = false;
	}
	
	$module_settings = true;
?>