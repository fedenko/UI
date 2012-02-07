<?php


/* Administration Menu */
function gmp_administration_menu() {
	add_submenu_page( 'options-general.php', GMP_PLUGIN_NAME, 'Map Routes', 'manage_options', GMP_PAGE_NAME, 'geoloc_page' );
}


/* Register Settings */
function gmp_register_settings() {
	register_setting( 'gmp-settings', '_gmp_geoloc', 'gmp_satanize' );
}


/* Satanize Settings and get coordinates */
function gmp_satanize($settings) {

	if (is_array($settings) && count($settings)) {
		// First, get coordinates
		if (isset($settings['api_key']) && $settings['api_key'] && isset($settings['address']) && $settings['address']) {
			include_once(GMP_PLUGIN_DIR.'/php/geoloc-include.php');
			$obj = new googleHelper($settings['api_key']);
			$coords = $obj->getCoordinates($settings['address']);
			if (is_array($coords) && count($coords)) {
				foreach($coords as $key => $coord) {
					if ($coord)
						$settings[$key] = esc_attr($coord);
						
				} 
			}
		}
		// Return all
		return $settings;
	}

}


/* When unistall the plugin */
function gmp_uninstaller() {
	delete_option( '_gmp_geoloc' );
}


/* Settings page */
function geoloc_page() {
	$g = '_gmp_geoloc';
	$settings = get_option($g);
	$address = $settings['address'];
	$lat = $settings['lat'];
	$long = $settings['long'];
	echo "<strong>get_option('_gmp_geoloc') donne :</strong><br/>"; print_r($settings);
	?>
<div class="wrap">

	<div id="icon-<?php echo GMP_PAGE_NAME; ?>" class="icon32" style="background:url(<?php echo GMP_PLUGIN_URL; ?>/images/plugin.png) 50% 50% no-repeat;"><br/></div>
	<h2><?php echo esc_html( GMP_PLUGIN_NAME ); ?></h2>
	<form name="gmp-form" method="post" action="options.php" id="gmp-form">
		<?php
		settings_fields( 'gmp-settings' );
		?>
		<h3><?php _e('Add Location', GMP_DOMAIN); ?></h3>
        <table class="form-table" summary="<?php _e('Add Location', GMP_DOMAIN); ?>">
            <tr valign="top">
                <th scope="row"><label for="address"><?php _e('Address'); ?></label></th>
                <td>
                	<input type="text" id="address" size="62" name="<?php echo $g; ?>[address]" value="<?php echo isset($settings['address']) ? esc_attr($settings['address']) : ''; ?>"/><br />
                	<span class="description"><?php _e('Hint: Submit the full location: number, street, city, country. For big cities and famous places, the country is optional. &laquo;&#160;Bastille Paris&#160;&raquo; or &laquo;&#160;Opera Sydney&#160;&raquo; will work.', GMP_DOMAIN); ?></span>
                </td>
            </tr>
            <tr valign="top">
                <th scope="row"><label for="title"><?php _e('Title'); ?></label></th>
                <td><input id="title" type="text" size="62" name="<?php echo $g; ?>[title]" value="<?php echo isset($settings['title']) ? esc_attr($settings['title']) : ''; ?>" /></td>
            </tr>
            <tr valign="top">
                <th><label for="desc"><?php _e('Description', GMP_DOMAIN); ?></label></th>
                <td><textarea id="desc" rows="5" cols="55" name="<?php echo $g; ?>[description]"><?php echo isset($settings['description']) ? esc_textarea($settings['description']) : ''; ?></textarea></td>
            </tr>
        </table>

		<h3><?php _e('Google Maps Settings', GMP_DOMAIN); ?></h3>
        <table class="form-table" summary="<?php _e('Google Maps Settings', GMP_DOMAIN); ?>">
            <tr valign="top">
                <th scope="row"><label for="geoloc-api-key"><?php _e('Enter API Key', GMP_DOMAIN); ?></label></th>
                <td>
                	<input id="geoloc-api-key" type="text" size="102" name="<?php echo $g; ?>[api_key]" value="<?php echo isset($settings['api_key']) ? esc_attr($settings['api_key']) : ''; ?>" />
                	<?php
                	if ( !(isset($settings['api_key']) && $settings['api_key']) )
                		echo '<p>'.sprintf(__('If you don&#8217;t have a Google Maps API Key, %1$sclick here%2$s.', GMP_DOMAIN), '<a target="_blank" href="http://www.google.com/apis/maps/signup.html">', '</a>').'</p>';
                	?>
                </td>
            </tr>
            <tr valign="top">
                <th scope="row">
                    <?php _e('Give back a link to the Author', GMP_DOMAIN); ?>
                </th>
                <td>
                    <label>
                    	<input type="checkbox" value="1" name="<?php echo $g; ?>[link_back]" <?php echo isset($settings['link_back']) && $settings['link_back'] ? ' checked="checked"' : '' ; ?>/>
                    	<?php
                    	$fe_link = sprintf(__('WordPress Plugin by %s', GMP_DOMAIN), '<a title="WordPress Plugin" href="http://mweasblog.com/">Mwea</a>');
                    	printf(__('Shows a link saying &laquo;&#160;%s&#160;&raquo; below Map.', GMP_DOMAIN), $fe_link);
                    	echo ' <span class="description">'.__('If unchecked, then no link will be displayed.', GMP_DOMAIN).'</span>';
                    	?>
                    </label><br/>
                    <label>
                    	<input type="checkbox" value="1" name="<?php echo $g; ?>[link_back_hidden]" <?php echo isset($settings['link_back']) && $settings['link_back_hidden'] ? ' checked="checked"' : '' ; ?> />
                    	<?php
                    	_e('Link is there, but hidden.', GMP_DOMAIN);
                    	echo ' <span class="description">'.__('Will not work if the above checkbox is not checked.', GMP_DOMAIN).'</span>';
                    	?>
                    </label>
                </td>
            </tr>
            <tr valign="top">
                <td></td>
                <td class="submit"><input type="submit" name="submit" class="button-primary" value="<?php _e("Save Changes"); ?>" /></td>
            </tr>
        </table>
    </form>
</div>
<?php
}

/* Tiny MCE button */
function gmp_addbutton() {
	if ( !current_user_can('edit_posts') && !current_user_can('edit_pages') )
		return;

	if ( get_user_option('rich_editing') == 'true') {
		add_filter('mce_external_plugins',	'gmp_mce_register');
		add_filter('mce_buttons',			'gmp_add_mce_button');
	}
}

function gmp_mce_register($plugin_array) {
	$plugin_array['gmp'] = GMP_PLUGIN_URL . '/js/editor_plugin.js';
	return $plugin_array;
}

function gmp_add_mce_button($buttons) {
	array_push($buttons, 'separator', 'gmp');
	return $buttons;
}


/* HTML editor button */
function gmp_add_quicktags() {
	if ( (basename($_SERVER['SCRIPT_FILENAME']) == 'post.php' && isset($_GET['action']) && $_GET['action'] == 'edit') || basename($_SERVER['SCRIPT_FILENAME']) == 'post-new.php' )
		wp_enqueue_script( 'gmp-quicktag', GMP_PLUGIN_URL . '/js/quicktag.js', array( 'quicktags' ) );
}

/* Geoloc shortcode */
function sc_geoloc($atts, $content = null) {
	return 
<<<HTML
	<div id="map-container" onload="destMap.initialize({$lat} ,{$long} );">	
				<link rel="stylesheet" href="http://localhost/wordpress/wp-content/plugins/geoloc/css/style.css" type="text/css" media="screen">
				<link rel="stylesheet" href="http://localhost/wordpress/wp-content/plugins/geoloc/css/map.css" type="text/css" media="screen">
				
				<script src="http://maps.google.com/maps/api/js?sensor=true"></script> 
				<script src="http://www.google.com/jsapi"></script> 
				<script src="http://localhost/wordpress/wp-content/plugins/geoloc/js/map.js"></script>
				<div class="article">
						<div id="form">
						<form>
							<table class="iti" border="0" width="696">
								<tbody>
									<tr valign="top">									
										<td align="right" class="1" >
											<label for="start" class="1-1" >Start :</label>
										</td>
										<td  align="left">
											<input  id="start" name="from" class="90" type="text" />
										</td>
										<td class="2 40"  align="right" valign="middle">
											<input class="get" onclick="destMap.initiate_geolocation();" type="button" value="Find my address" />
										</td>									
									</tr>
									<tr>
										<td align="right" class="3" >
											<label for="end">End :</label>
										</td>
										<td align="left">
											<input id="end" name="to" readonly="readonly" class="90" type="text" value="{$address}" />
										</td>
										<td class="4 40" align="right">
											<input class="get" onclick="destMap.route();" type="button" value="Itinerary" />
										</td>
									</tr>
								</tbody>
							</table>
						</form>
							<div id="contentmap">
								<div id="map"></div> 
								<div id="route"></div>
								<div class="clearix"></div>
							</div> 
						</div>
				</div>			
	</div>		
HTML;
}

add_shortcode("geoloc", "sc_geoloc");

?>