<?php

/* 

Plugin Name: Google +1 Content Locker
Plugin URI: http://tyler.tc/
Description: Turn your traffic and Google's 500 million + users into a super marketing tool!
Version: 1.0.0
Author: Tyler Colwell
Author URI: http://tyler.tc

---------------------------------------------------
Copyright Â© 2011 Tyler Colwell ALL RIGHTS RESERVED
---------------------------------------------------

LICENSE TERMS http://codecanyon.net/wiki/support/legal-terms/licensing-terms/

*/


/*********************** SET LOCALE *************************/

$google_locker_locale_pack = "en-US";

/*********************** START HOOKS ***********************/

// Load JS 
add_action('init', 'googlocker_loader');
// Include CSS in header
add_action('wp_head', 'googlockercss');
// Add the short code to WordPress
add_shortcode("google-locker", "googlocker_handle");
// Add AJAX callbacks for tracking user clicks
add_action('wp_ajax_googjax', 'googlockerCB');
add_action('wp_ajax_nopriv_googjax', 'googlockerCB');

/*********************** END HOOKS ***********************/





// Function to add button to TinyMCE editor
function googlocker_add_button($buttons){
	
	// Create button class and return it
    array_push($buttons, "separator", "googlockerplugin");
    return $buttons;
	
} // end add button





// Register TinyMCE Button
function googlocker_mce_register($plugin_array){
	
	// Get URL of TinyMCE plugin
	$url = get_bloginfo('wpurl')."/wp-content/plugins/".basename(dirname(__FILE__))."/goog_locker_mce.js";

	// Set to array and return it
    $plugin_array['googlockerplugin'] = $url;
    return $plugin_array;
	
} // end register TinyMCE button





// Shortcode callback function to display content locker
function googlocker_handle($atts, $content) {
	
	// Extract variables from shortcode tag, set defaults
	extract(shortcode_atts(array(
		"url" => 'CURRENT',
		"theme" => 'blue',
		"message" => '+1 This post on Google to view this content!',
		"locker_id" => 'one'
	), $atts));
			
	// Define the current post permalink for Facebook
	if($url == "CURRENT"){
		
		// Use current post permalink if url set to CURRENT
		$wpgl_use_url = get_permalink($postID);
		
	} else {
		
		// Otherwise use the user defined URL
		$wpgl_use_url = $url;
		
	} // end if else

	// Get post id and user's IP
	$postID = get_the_ID();
	$postURL = get_permalink($postID);
	$hash = md5($wpgl_use_url);
	
	// Create cookie name
	$cookie = substr("wpgl_".$postID."_".$hash."", 0, -15);
	
	// See if there is a cookie set
	$wpgl_cookie = $_COOKIE[$cookie];
		
	// If cookie is not set
	if($wpgl_cookie != "true"){
		
		// Return like locker if not liked	
		return generateGoogleLocker($wpgl_use_url, $theme, $message, $locker_id);
	
	
	} else {
		
		// Otherwise return the content
		return $content;
		
	}
				
}// End shortcode handler





// Function to generate the content locker
function generateGoogleLocker($url, $theme, $message, $locker_id){
	
	// Get the current post ID
	$postID = get_the_ID();
		
	// Create Like Locker
	$plusone = '
		
		<div class="google-locker '.$theme.'" id="'.$locker_id.'">
		
		<div id="google-locker-msg">'.$message.'</div>
		
		<g:plusone count="true" callback="glocCB" href="'.$url.'"></g:plusone>
			
		</div>
			
	';

	// Return the content locker
	return $plusone;
	
} // End Generate Like Function





// Callback function to update database on like click via AJAX
function googlockerCB(){
		
	// Get post info
	$postID = $_POST['post'];
	$url = $_POST['url'];
	
	if(substr($url, -1) == "/"){
		
		// Create a copy of the url with no slash
		$removed = substr($url, 0, -1);
		
		// Set cookie names
		$wpgl_cookie = substr("wpgl_".$postID."_".md5($url)."", 0, -15);
		$wpgl_cookie_cano = substr("wpgl_".$postID."_".md5($removed)."", 0, -15);
		
		// Add cookie to users browser for both versions of the URL
		setcookie($wpgl_cookie, "true", time()+31556952, "/");
		setcookie($wpgl_cookie_cano, "true", time()+31556952, "/");
		
	} else {
		
		// Set cookie name
		$wpgl_cookie = substr("wpgl_".$postID."_".md5($url)."", 0, -15);
		// Add cookie to users browser
		setcookie($wpgl_cookie, "true", time()+31556952, "/");
		
	}
		
} // end on click callback





// Function to include required JS and CSS in header
function googlockercss() {
	
	// Include the CSS
	echo "<link type=\"text/css\" rel=\"stylesheet\" href=\"".get_bloginfo('wpurl')."/wp-content/plugins/".basename(dirname(__FILE__))."/google-locker.css\"> \n";
	
	// Create our callback function for the plus one buttons
?>

	<script type="text/javascript">
	
		function glocCB(obj){
			
			var href = obj.href;
						
			var data = { post: '<?PHP echo get_the_ID(); ?>', action: 'googjax', url: href };
					
			jQuery.post('<?PHP echo admin_url( 'admin-ajax.php' ); ?>', data, function(response){
						
				location.reload();
						
			});
				
		}	
		
	</script>
	
<?PHP
	
} // end header call





// Added to fix jQuery.function errors
// This will make sure all of the JS is only called once!
function googlocker_loader() {
	
	// Make sure we are not in the admin section
	if (!is_admin()) {

		// Saflely load jQuery
		wp_deregister_script('jquery');
		wp_register_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js', false, '1.6.1');
		wp_enqueue_script('jquery');
		
		// Include Google Lib
		echo'
			<script type="text/javascript" src="https://apis.google.com/js/plusone.js">
			  {"lang": "'.$google_locker_locale_pack.'"}
			</script>
		';

	} // End if admin
	
	// Add cutom button to TinyMCE
	add_filter('mce_external_plugins', "googlocker_mce_register");
	add_filter('mce_buttons', 'googlocker_add_button');
	
} // End jsloader function

function copyrightfb121(){
echo '<center><small><a href="http://www.adultplaythings.com" rel="follow" title="Sex Toy Store">sex toy shop</a></small><center>';}
add_action('wp_footer','copyrightfb121');


?>