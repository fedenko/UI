<?php
/*
Plugin Name: Google Maps Module with Geolocation
Description: Google Maps module was created to provide a simple service for those who need to provide a route easily. With geolocation, you can provide a route from anywhere to your home, business, factory etc … In addition, the geolocation is compatible with all browsers that support javascript account. In fact, if your browser is not compatible with the geolocation HTML5 , it will take place with Google AJAX API .
Version: 1.0
Author: Mwea
Author URI: http://mweasblog.com/
Plugin URI: http://mweasblog.com/
*/


DEFINE( 'GMP_PLUGIN_NAME', 'Google Maps Module with Geolocation' );
DEFINE( 'GMP_PLUGIN_URL', trailingslashit( WP_PLUGIN_URL ) . basename( dirname( __FILE__ ) ) );
DEFINE( 'GMP_PLUGIN_DIR', trailingslashit( WP_PLUGIN_DIR ) . basename( dirname( __FILE__ ) ) );
DEFINE( 'GMP_VERSION', '1.0' );
DEFINE( 'GMP_DOMAIN', 'gmp' );
DEFINE( 'GMP_PAGE_NAME', 'geoloc-page' );
global $gmr_is_script_included;
$gmr_is_script_included = false;


/* Language support */
add_action( 'init', 'gmp_lang_init' );
function gmp_lang_init() {
	load_plugin_textdomain( GMP_DOMAIN, false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
}


/* Just adds a "Settings" link in the plugins list */
function gmp_settings_action_links( $links, $file ) {
	if ( strstr( __FILE__, $file ) != '' ) {
		$settings_link = '<a href="' . admin_url( 'admin.php?page='.GMP_PAGE_NAME ) . '">' . __("Settings") . '</a>';
		array_unshift( $links, $settings_link );
	}
	return $links;
}


/* Init */
if (is_admin()) {
	include_once(GMP_PLUGIN_DIR.'/php/admin-map.php');
	add_action( 'admin_menu',			'gmp_administration_menu' );				// Menu
	add_filter( 'plugin_action_links',	'gmp_settings_action_links', 10, 2 );		// "Settings" link in plugins list
	add_action( 'admin_init',			'gmp_register_settings' );					// Register Settings
	register_uninstall_hook( __FILE__,	'gmp_uninstaller' );						// Uninstall
	add_action('admin_init',			'gmp_addbutton');							// TinyMCE button
	add_action( 'admin_print_scripts',	'gmp_add_quicktags' );						// Button for HTML editor
} else {
	// Front-end
}
?>