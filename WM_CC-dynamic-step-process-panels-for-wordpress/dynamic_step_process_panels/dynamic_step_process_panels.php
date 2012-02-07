<?php
/*
Plugin Name: Dynamic Step Process Panels
Plugin URI: http://dynamicstepprocesspanelswordpress.quanticalabs.com
Description: Dynamic Step Process Panels is a lightweight plugin for WordPress. It allows that any content can be represented in any number of tabs / steps.
Author: QuanticaLabs
Version: 2.0
*/

//activate plugin
function dspp_activate()
{
}
register_activation_hook( __FILE__, 'dspp_activate');
//deactivate plugin
function dspp_deactivate()
{
}
register_deactivation_hook( __FILE__, 'dspp_deactivate');

//admin
if(is_admin())
{
	function dspp_admin_init()
	{
		wp_register_script('dspp_admin', WP_PLUGIN_URL . '/dynamic_step_process_panels/js/dspp_admin.js', array(), "1.0");
	}
	add_action('admin_init', 'dspp_admin_init');

	function dspp_admin_print_scripts()
	{
		wp_enqueue_script('jquery');
		wp_enqueue_script('dspp_admin');
	}
	function dspp_admin_menu()
	{	
		$page = add_options_page('Dynamic Step Process Panels', 'Dynamic Step Process Panels', 'administrator', 'dspp_admin', 'dspp_admin_page');
		add_action('admin_print_scripts-' . $page, 'dspp_admin_print_scripts');
	}
	add_action('admin_menu', 'dspp_admin_menu');
	
	function dspp_stripslashes_deep($value)
	{
		$value = is_array($value) ?
					array_map('stripslashes_deep', $value) :
					stripslashes($value);

		return $value;
	}
	function dspp_ajax_get_settings()
	{
		echo json_encode(dspp_stripslashes_deep(get_option('dspp_shortcode_settings_' . $_POST["id"])));
		exit();
	}
	add_action('wp_ajax_get_settings', 'dspp_ajax_get_settings');
	
	function dspp_admin_page()
	{
		$error = "";
		if($_POST["action"]=="save")
		{
			if($_POST["shortcodeId"]!="")
			{
				for($i=0; $i<count($_POST["step_title"]); $i++)
				{
					if($_POST["step_title"][$i]=="")
						$_POST["step_title"][$i] = "&nbsp;";
					if($_POST["step_content"][$i]=="")
						$_POST["step_content"][$i] = "&nbsp;";
				}
				$dspp_options = array(
					"kind" => $_POST["kind"],
					"style" => $_POST["style"],
					"firstselected" => $_POST["firstSelected"],
					"icons" => $_POST["icons"],
					"imgfolder" => $_POST["imgFolder"],
					"chooseagain" => $_POST["chooseAgain"],
					"nextprevbuttons" => $_POST["nextPrevButtons"],
					"nextprevbuttonsposition" => $_POST["nextPrevButtonsPosition"],
					"nextbuttontitle" => $_POST["nextButtonTitle"],
					"prevbuttontitle" => $_POST["prevButtonTitle"],
					"fadespeed" => $_POST["fadeSpeed"],
					"event" => $_POST["event"],
					"packed" => $_POST["packed"],
					"jquery" => $_POST["jQuery"],
					"aspopup" => $_POST["asPopup"],
					"beforeload" => $_POST["beforeLoad"],
					"onload" => $_POST["onLoad"],
					"onopen" => $_POST["onOpen"],
					"afteropen" => $_POST["afterOpen"],
					"onhoverin" => $_POST["onHoverIn"],
					"onhoverout" => $_POST["onHoverOut"],
					"onopenpopup" => $_POST["onOpenPopup"],
					"onclosepopup" => $_POST["onClosePopup"],
					"paneltag" => $_POST["panel_tag"],
					"panelid" => $_POST["panel_id"],
					"panelclass" => $_POST["panel_class"],
					"panelstyle" => $_POST["panel_style"],
					"panelaction" => $_POST["panel_action"],
					"panelmethod" => $_POST["panel_method"],
					"stepscount" => $_POST["stepsCount"],
					"title" => $_POST["step_title"],
					"tag" => $_POST["step_tag"],
					"href" => $_POST["step_href"],
					"class" => $_POST["step_class"],
					"label" => $_POST["step_label"],
					"content" => $_POST["step_content"],
					"contentfromfile" => $_POST["step_content_from_file"],
					"contenttag" => $_POST["step_content_tag"],
					"contentid" => $_POST["step_content_id"],
					"contentclass" => $_POST["step_content_class"]
				);
				//add if not exist or update if exist
				$updated = true;
				if(!get_option('dspp_shortcode_settings_' . $_POST["shortcodeId"]))
					$updated = false;
				update_option('dspp_shortcode_settings_' . $_POST["shortcodeId"], $dspp_options);
				$message .= "Settings saved!" . ($updated ? " (overwritten)" : "");
				$message .= "<br />Use <pre>[dspp id='" . $_POST["shortcodeId"] . "']</pre> shortcode to put process panel on your page.";
			}
			else
			{
				$error .= "Please fill 'Shortcode id' field!";
			}
		}
		$allOptions = get_alloptions();
		$dsppAllShortcodeIds = array();
		foreach($allOptions as $key => $value)
		{
			if(substr($key, 0, 23)=="dspp_shortcode_settings")
				$dsppAllShortcodeIds[] = $key;
		}
		//sort shortcode ids
		sort($dsppAllShortcodeIds);
		?>
		<div class="wrap">
			<div class="icon32" id="icon-options-general"><br></div>
			<h2>Dynamic Step Process Panels settings</h2>
		</div>
		<?php
		if($error!="" || $message!="")
		{
		?>
		<div class="<?php echo ($message!="" ? "updated" : "error"); ?> settings-error"> 
			<p>
				<strong style="line-height: 150%;">
					<?php echo ($message!="" ? $message : $error); ?>
				</strong>
			</p>
		</div>
		<?php
		}
		?>
		<form action="<?php echo $_SERVER['REQUEST_URI']; ?>" method="post" id="dspp_settings">
			<table class="form-table">
				<tbody>
					<?php
					if(count($dsppAllShortcodeIds))
					{
					?>
					<tr valign="top">
						<th scope="row">
							<label for="editShortcodeId">Choose shortcode id</label>
						</th>
						<td>
							<select name="editShortcodeId" id="editShortcodeId">
								<option value="-1">choose...</option>
								<?php
									for($i=0; $i<count($dsppAllShortcodeIds); $i++)
										echo "<option value='$dsppAllShortcodeIds[$i]'>" . substr($dsppAllShortcodeIds[$i], 24) . "</option>";
								?>
							</select>
							<span id="ajax_loader" style="display: none;"><img style="margin-bottom: -3px;" src="<?php echo WP_PLUGIN_URL; ?>/dynamic_step_process_panels/img/ajax-loader.gif" /></span>
							<span class="description">Choose the shortcode id for editing</span>
						</td>
					</tr>
					<?php
					}
					?>
					<tr valign="top">
						<th scope="row">
							<label for="shortcodeId">Or create new shortcode id</label>
						</th>
						<td>
							<input type="text" class="regular-text" value="" id="shortcodeId" name="shortcodeId">
							<span class="description">Unique identifier for dspp shortcode. Don't use special characters.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="kind">Type</label>
						</th>
						<td>
							<select name="kind" id="kind">
								<option value="stepByStep">stepByStep</option>
								<option value="freeChoice">freeChoice</option>
							</select>
							<span class="description">Specifies the behaviour of the steps panel. Parameter stepByStep forces the user to open steps one after another. Parameter freeChoice allow free choice.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="style">Style</label>
						</th>
						<td>
							<select name="style" id="style">
								<option value="green-blue">green-blue</option>
								<option value="green-gray">green-gray</option>
								<option value="green-maroon">green-maroon</option>
								<option value="green-orange">green-orange</option>
								<option value="blue-gray">blue-gray</option>
								<option value="blue-green">blue-green</option>
								<option value="blue-maroon">blue-maroon</option>
								<option value="blue-orange">blue-orange</option>
								<option value="maroon-blue">maroon-blue</option>
								<option value="maroon-gray">maroon-gray</option>
								<option value="maroon-green">maroon-green</option>
								<option value="maroon-orange">maroon-orange</option>
								<option value="orange-blue">orange-blue</option>
								<option value="orange-gray">orange-gray</option>
								<option value="orange-green">orange-green</option>
								<option value="orange-maroon">orange-maroon</option>
							</select>
							<span class="description">Specifies the coloristic version of the step panel.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="firstselected">First selected</label>
						</th>
						<td>
							<select name="firstSelected" id="firstselected">
								<option value="true">true</option>
								<option value="false">false</option>
							</select>
							<span class="description">Specifies that the first step is open on start or not.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="icons">Icons</label>
						</th>
						<td>
							<select name="icons" id="icons">
								<option value="true">true</option>
								<option value="false">false</option>
							</select>
							<span class="description">Specifies that the icons under the step labels shows or not.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="imgfolder">Images folder</label>
						</th>
						<td>
							<input type="text" class="regular-text" value="wp-content/plugins/dynamic_step_process_panels/img" id="imgfolder" name="imgFolder">
							<span class="description">Specifies the path to folder which contains the sprite_with_icons.png, sprite_without_icons.png and sprite_buttons.png images.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="chooseagain">Choose again</label>
						</th>
						<td>
							<select name="chooseAgain" id="chooseagain">
								<option value="true">true</option>
								<option value="false">false</option>
							</select>
							<span class="description">Specifies that the step can be chosen again.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="nextprevbuttons">Next and previous buttons</label>
						</th>
						<td>
							<select name="nextPrevButtons" id="nextprevbuttons">
								<option value="true">true</option>
								<option value="false">false</option>
							</select>
							<span class="description">Specifies that the next and previous buttons will show.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="nextprevbuttonsposition">Next and previous buttons position</label>
						</th>
						<td>
							<select name="nextPrevButtonsPosition" id="nextprevbuttonsposition">
								<option value="bottom">bottom</option>
								<option value="top">top</option>
							</select>
							<span class="description">Specifies the next and previous buttons position.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="nextbuttontitle">Next button title</label>
						</th>
						<td>
							<input type="text" class="regular-text" value="Next step" id="nextbuttontitle" name="nextButtonTitle">
							<span class="description">Specifies the next button caption.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="prevbuttontitle">Next button title</label>
						</th>
						<td>
							<input type="text" class="regular-text" value="Previous step" id="prevbuttontitle" name="prevButtonTitle">
							<span class="description">Specifies the previous button caption.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="fadespeed">Fade effect speed</label>
						</th>
						<td>
							<input type="text" class="regular-text" value="1000" id="fadespeed" name="fadeSpeed">
							<span class="description">Specifies the fade effect speed (in miliseconds) when the step is changed. Set to 0 if you want to disable effect.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="event">Event</label>
						</th>
						<td>
							<select name="event" id="event">
								<option value="click">click</option>
								<option value="mouseover">mouseover</option>
							</select>
							<span class="description">Specifies the type of event to be used for open step content.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="beforeload">beforeLoad event</label>
						</th>
						<td>
							<textarea cols="50" rows="5" id="beforeload" class="large-text code" name="beforeLoad">function(){}</textarea>
							<span class="description">This event is triggered before step panel will be initialized.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="onload">onLoad event</label>
						</th>
						<td>
							<textarea cols="50" rows="5" id="onload" class="large-text code" name="onLoad">function(){}</textarea>
							<span class="description">This event is triggered after step panel has been initialized.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="onopen">onOpen event</label>
						</th>
						<td>
							<textarea cols="50" rows="5" id="onopen" class="large-text code" name="onOpen">function(event, step, content, stepNumber){}</textarea>
							<span class="description">This event is triggered before opening step content.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="afteropen">afterOpen event</label>
						</th>
						<td>
							<textarea cols="50" rows="5" id="afteropen" class="large-text code" name="afterOpen">function(event, step, content, stepNumber){}</textarea>
							<span class="description">This event is triggered after opening step content.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="onhoverin">onHoverIn event</label>
						</th>
						<td>
							<textarea cols="50" rows="5" id="onhoverin" class="large-text code" name="onHoverIn">function(event, step, stepNumber){}</textarea>
							<span class="description">This event is triggered when step is hovered.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="onhoverout">onHoverOut event</label>
						</th>
						<td>
							<textarea cols="50" rows="5" id="onhoverout" class="large-text code" name="onHoverOut">function(event, step, stepNumber){}</textarea>
							<span class="description">This event is triggered when step hover is out.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="onopenpopup">onOpenPopup event</label>
						</th>
						<td>
							<textarea cols="50" rows="5" id="onopenpopup" class="large-text code" name="onOpenPopup">function(event, button, panel){}</textarea>
							<span class="description">This event is triggered before opening process panel displayed as a popup.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="onclosepopup">onClosePopup event</label>
						</th>
						<td>
							<textarea cols="50" rows="5" id="onclosepopup" class="large-text code" name="onClosePopup">function(event, button, panel){}</textarea>
							<span class="description">This event is triggered after opening process panel displayed as a popup.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="packed">Packed</label>
						</th>
						<td>
							<select name="packed" id="packed">
								<option value="true">true</option>
								<option value="false">false</option>
							</select>
							<span class="description">If set to true, the packed version of javascript will be loaded (jquery.processPanel.packed.js). If set to false, scripts will be loaded separately and won't be packed (jquery-1.4.2.min.js, jquery.processPanel.js).</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="jquery">jQuery</label>
						</th>
						<td>
							<select name="jQuery" id="jquery">
								<option value="true">true</option>
								<option value="false">false</option>
							</select>
							<span class="description">It works only when parameter packed is set to false. If set to true jquery-1.4.2.min.js will be loaded. If set to false jquery-1.4.2.min.js won't be loaded.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="aspopup">Displayed as a popup</label>
						</th>
						<td>
							<select name="asPopup" id="aspopup">
								<option value="yes">yes</option>
								<option value="no" selected="selected">no</option>
							</select>
							<span class="description">Specifies that the panel will be displayed as a popup or not. <span style="font-weight: bold;">If you've choosen 'yes' please put this link on your page &lt;a href="#<span id="panelidhint">processPanel</span>-popup"&gt;open popup&lt;/a&gt;. When you gonna click on it, the popup will open.</span></span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="paneltag">Panel tag</label>
						</th>
						<td>
							<input type="text" class="regular-text" value="div" id="paneltag" name="panel_tag">
							<span class="description">Defines the html tag of the steps panel node.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="panelid">Panel id</label>
						</th>
						<td>
							<input type="text" class="regular-text" value="processPanel" id="panelid" name="panel_id">
							<span class="description">Defines the id attribute of the steps panel.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="panelclass">Panel class</label>
						</th>
						<td>
							<input type="text" class="regular-text" value="dspp_panel" id="panelclass" name="panel_class">
							<span class="description">Defines the class attribute of the steps panel.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="panelstyle">Panel style</label>
						</th>
						<td>
							<input type="text" class="regular-text" value="" id="panelstyle" name="panel_style">
							<span class="description">Defines the style attribute of the steps panel. Using this parameter you can define inline styles for the panel.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="panelaction">Panel action</label>
						</th>
						<td>
							<input type="text" class="regular-text" value="" id="panelaction" name="panel_action">
							<span class="description">Defines the action attribute of the steps panel, when it is used as a form (panel tag field value = form).</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="panelmethod">Panel method</label>
						</th>
						<td>
							<select name="panel_method" id="panelmethod">
								<option value="post">post</option>
								<option value="get">get</option>
							</select>
							<span class="description">Defines the method attribute of the steps panel, when it is used as a form (panel tag field value = form).</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row">
							<label for="stepscount">Number of steps</label>
						</th>
						<td>
							<input type="text" class="regular-text" value="3" id="stepscount" name="stepsCount" maxlength="2">
							<span class="description">Specifies the number of steps in panel.</span>
						</td>
					</tr>
					<tr valign="top">
						<th scope="row" colspan="2" style="padding: 0px;" id="steps_settings">
							<table class="form-table" id="dspp_table_content1">
								<tr valign="top">
									<th scope="row" colspan="2" style="font-weight: bold;">
										Step 1 settings:
									</th>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="title1">Title</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="" id="title1" name="step_title[]">
										<span class="description">Defines the title of the step.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="tag1">Tag</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="a" id="tag1" name="step_tag[]">
										<span class="description">Defines the html tag of the step node.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="href1">Href</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="#content1" id="href1" name="step_href[]">
										<span class="description">Defines the href attribute of the step.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="class1">Class</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="" id="class1" name="step_class[]">
										<span class="description">Defines the class attribute of the step.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="label1">Label</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="" id="label1" name="step_label[]">
										<span class="description">Defines the label attribute of the step.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="content1">Content</label>
									</th>
									<td>
										<textarea cols="50" rows="10" id="content1" class="large-text code" name="step_content[]"></textarea>
										<span class="description">HTML step content.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="contentfromfile1">Content from file</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="" id="contentfromfile1" name="step_content_from_file[]" />
										<span class="description">Specify the file from which content will be loaded via AJAX. If you specify this parameter, html step content will be ignored.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="contenttag1">Content tag</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="div" id="contenttag1" name="step_content_tag[]">
										<span class="description">Defines the html tag of the step content node.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="contentid1">Content id</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="content1" id="contentid1" name="step_content_id[]">
										<span class="description">Defines the id attribute of the step content.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="contentclass1">Content class</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="" id="contentclass1" name="step_content_class[]">
										<span class="description">Defines the class attribute of the step content.</span>
									</td>
								</tr>
							</table>
							<table class="form-table" id="dspp_table_content2">
								<tr valign="top">
									<th scope="row" colspan="2" style="font-weight: bold;">
										Step 2 settings:
									</th>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="title2">Title</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="" id="title2" name="step_title[]">
										<span class="description">Defines the title of the step.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="tag2">Tag</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="a" id="tag2" name="step_tag[]">
										<span class="description">Defines the html tag of the step node.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="href2">Href</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="#content2" id="href2" name="step_href[]">
										<span class="description">Defines the href attribute of the step.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="class2">Class</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="" id="class2" name="step_class[]">
										<span class="description">Defines the class attribute of the step.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="label2">Label</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="" id="label2" name="step_label[]">
										<span class="description">Defines the label attribute of the step.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="content2">Content</label>
									</th>
									<td>
										<textarea cols="50" rows="10" id="content2" class="large-text code" name="step_content[]"></textarea>
										<span class="description">HTML step content.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="contentfromfile2">Content from file</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="" id="contentfromfile2" name="step_content_from_file[]" />
										<span class="description">Specify the file from which content will be loaded via AJAX. If you specify this parameter, html step content will be ignored.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="contenttag2">Content tag</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="div" id="contenttag2" name="step_content_tag[]">
										<span class="description">Defines the html tag of the step content node.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="contentid2">Content id</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="content2" id="contentid2" name="step_content_id[]">
										<span class="description">Defines the id attribute of the step content.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="contentclass2">Content class</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="" id="contentclass2" name="step_content_class[]">
										<span class="description">Defines the class attribute of the step content.</span>
									</td>
								</tr>
							</table>
							<table class="form-table" id="dspp_table_content3">
								<tr valign="top">
									<th scope="row" colspan="2" style="font-weight: bold;">
										Step 3 settings:
									</th>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="title3">Title</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="" id="title3" name="step_title[]">
										<span class="description">Defines the title of the step.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="tag3">Tag</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="a" id="tag3" name="step_tag[]">
										<span class="description">Defines the html tag of the step node.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="href3">Href</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="#content3" id="href3" name="step_href[]">
										<span class="description">Defines the href attribute of the step.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="class3">Class</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="" id="class3" name="step_class[]">
										<span class="description">Defines the class attribute of the step.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="label3">Label</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="" id="label3" name="step_label[]">
										<span class="description">Defines the label attribute of the step.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="content3">Content</label>
									</th>
									<td>
										<textarea cols="50" rows="10" id="content3" class="large-text code" name="step_content[]"></textarea>
										<span class="description">HTML step content.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="contentfromfile3">Content from file</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="" id="contentfromfile3" name="step_content_from_file[]" />
										<span class="description">Specify the file from which content will be loaded via AJAX. If you specify this parameter, html step content will be ignored.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="contenttag3">Content tag</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="div" id="contenttag3" name="step_content_tag[]">
										<span class="description">Defines the html tag of the step content node.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="contentid3">Content id</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="content3" id="contentid3" name="step_content_id[]">
										<span class="description">Defines the id attribute of the step content.</span>
									</td>
								</tr>
								<tr valign="top">
									<th scope="row">
										<label for="contentclass3">Content class</label>
									</th>
									<td>
										<input type="text" class="regular-text" value="" id="contentclass3" name="step_content_class[]">
										<span class="description">Defines the class attribute of the step content.</span>
									</td>
								</tr>
							</table>
						</th>
					</tr>
				</tbody>
			</table>
			<p class="submit">
				<input type="submit" value="Save Options" class="button-primary" name="Submit">
				<input type="hidden" name="action" value="save" />
			</p>
		</form>
		<?php
	}
}

add_action('wp_head', 'dspp_head');
function dspp_head()
{
	echo "
		<link type='text/css' rel='stylesheet' href='" . get_bloginfo('wpurl') . "/wp-content/plugins/dynamic_step_process_panels/style.css' />
		<link type='text/css' rel='stylesheet' href='" . get_bloginfo('wpurl') . "/wp-content/plugins/dynamic_step_process_panels/colors/allColors.css' />
	";
}
add_action('wp_footer', 'dspp_footer');
function dspp_footer()
{
	delete_option('jsLoaded');
}
//Dynamic Step Process Panels shortcode
add_option('jsLoaded', 'false');
function dspp_shortcode($atts) 
{
	extract(shortcode_atts(array(
		'id' => '',
		'packed' => 'true',
		'jquery' => 'true'
	), $atts));
	if($id!="")
	{
		if($shortcode_settings = get_option('dspp_shortcode_settings_' . $id))
		{
			extract($shortcode_settings);
			$dspp = "";
			if(get_option('jsLoaded')=='false')
			{
				if($packed=="true")
					$dspp .= "<script type='text/javascript' src='" . get_bloginfo('wpurl') . "/wp-content/plugins/dynamic_step_process_panels/js/jquery.processPanel.packed.js'></script>";
				else
				{
					if($jquery=="true")
						$dspp .= "<script type='text/javascript' src='" . get_bloginfo('wpurl') . "/wp-content/plugins/dynamic_step_process_panels/js/jquery-1.4.2.min.js'></script>";
					$dspp .= "<script type='text/javascript' src='" . get_bloginfo('wpurl') . "/wp-content/plugins/dynamic_step_process_panels/js/jquery.processPanel.js'></script>";
				}
				update_option('jsLoaded', 'true');
			}
			//create panel html
			$shortcode = "[dspp_panel" 
				. ($paneltag!="" ? " tag='" . $paneltag . "'" : "")
				. ($panelid!="" ? " id='" . $panelid . "'" : "")
				. ($panelclass!="" ? " class='" . $panelclass . "'" : "")
				. ($panelstyle!="" ? " style='" . $panelstyle . "'" : "")
				. ($panelaction!="" && $paneltag=="form" ? " action='" . $panelaction . "'" : "")
				. (($panelmethod=="post" || $panelmethod=="get") && $paneltag=="form" ? " method='" . $panelmethod . "'" : "") 
				. "]";
			$steps = "";
			$contents = "";
			for($i=0; $i<$stepscount; $i++)
			{
				$steps .=" [dspp_step"
					. ($tag[$i]!="" ? " tag='" . $tag[$i] . "'" : "")
					. ($href[$i]!="" ? " href='" . $contentfromfile[$i] . $href[$i] . "'" : "")
					. ($class[$i]!="" ? " class='" . $class[$i] . "'" : "")
					. ($label[$i]!="" ? " label='" . $label[$i] . "'" : "") 
					. "]"
					. stripslashes($title[$i])
					. "[/dspp_step]";
			}
			for($i=0; $i<$stepscount; $i++)
			{
				$contents .=" [dspp_content"
					. ($contenttag[$i]!="" ? " tag='" . $contenttag[$i] . "'" : "")
					. ($contentid[$i]!="" ? " id='" . $contentid[$i] . "'" : "")
					. ($contentclass[$i]!="" ? " class='" . $contentclass[$i] . "'" : "")
					. "]"
					. stripslashes($content[$i])
					. "[/dspp_content]";
			}
			if($nextprevbuttonsposition=="top")
				$shortcode .= $contents.$steps;
			else
				$shortcode .= $steps.$contents;
			$shortcode .= "[/dspp_panel]";
			$dspp .= do_shortcode($shortcode);
			$dspp .= "
			<script type='text/javascript'>
				jQuery(document).ready(function($){
					$('#$panelid').processPanel({
						kind: '$kind',
						style: '$style',
						firstSelected: $firstselected,
						icons: $icons,
						imgFolder: '$imgfolder',
						chooseAgain: $chooseagain,
						nextPrevButtons: $nextprevbuttons,
						nextPrevButtonsPosition: '$nextprevbuttonsposition',
						nextButtonTitle: '$nextbuttontitle',
						prevButtonTitle: '$prevbuttontitle',
						fadeSpeed: $fadespeed,
						event: '$event',
						beforeLoad: " . stripslashes($beforeload) . ",
						onLoad: " . stripslashes($onload) . ",
						onOpen: " . stripslashes($onopen) . ",
						afterOpen: " . stripslashes($afteropen) . ",
						onOpenPopup: " . stripslashes($onopenpopup) . ",
						onClosePopup: " . stripslashes($onclosepopup) . ",
						onHoverIn: " . stripslashes($onhoverin) . ",
						onHoverOut: " . stripslashes($onhoverout) . "
				});
				});
			</script>";
		}
		else
			$dspp = "Shortcode with given id not found!";
	}
	else
		$dspp = "Parameter id not specified!";
	return $dspp;
}
add_shortcode('dspp', 'dspp_shortcode');

function dspp_shortcode_old($atts) {
	extract(shortcode_atts(array(
		'id' => 'processPanel',
		'kind' => 'stepByStep',
		'style' => 'green-blue',
		'firstselected' => 'true',
		'icons' => 'true',
		'imgfolder' => 'wp-content/plugins/dynamic_step_process_panels/img',
		'chooseagain' => 'true',
		'nextprevbuttons' => 'true',
		'nextprevbuttonsposition' => 'bottom',
		'nextbuttontitle' => 'Next step',
		'prevbuttontitle' => 'Previous step',
		'fadespeed' => '1000',
		'event' => 'click',
		'beforeload' => 'function(){}',
		'onload' => 'function(){}',
		'onopen' => 'function(){}',
		'afteropen' => 'function(){}',
		'onopenpopup' => 'function(){}',
		'onclosepopup' => 'function(){}',
		'onhoverin' => 'function(){}',
		'onhoverout' => 'function(){}',
		'packed' => 'true',
		'jquery' => 'true'
	), $atts));
	$dspp = "";
	if(get_option('jsLoaded')=='false')
	{
		if($packed=="true")
			$dspp .= "<script type='text/javascript' src='" . get_bloginfo('wpurl') . "/wp-content/plugins/dynamic_step_process_panels/js/jquery.processPanel.packed.js'></script>";
		else
		{
			if($jquery=="true")
				$dspp .= "<script type='text/javascript' src='" . get_bloginfo('wpurl') . "/wp-content/plugins/dynamic_step_process_panels/js/jquery-1.4.2.min.js'></script>";
			$dspp .= "<script type='text/javascript' src='" . get_bloginfo('wpurl') . "/wp-content/plugins/dynamic_step_process_panels/js/jquery.processPanel.js'></script>";
		}
		update_option('jsLoaded', 'true');
	}
	$dspp .= "
	<script type='text/javascript'>
		jQuery(document).ready(function($){
			$('#$id').processPanel({
				kind: '$kind',
				style: '$style',
				firstSelected: $firstselected,
				icons: $icons,
				imgFolder: '$imgfolder',
				chooseAgain: $chooseagain,
				nextPrevButtons: $nextprevbuttons,
				nextPrevButtonsPosition: '$nextprevbuttonsposition',
				nextButtonTitle: '$nextbuttontitle',
				prevButtonTitle: '$prevbuttontitle',
				fadeSpeed: $fadespeed,
				event: '$event',
				beforeLoad: $beforeload,
				onLoad: $onload,
				onOpen: $onopen,
				afterOpen: $afteropen,
				onOpenPopup: $onopenpopup,
				onClosePopup: $onclosepopup,
				onHoverIn: $onhoverin,
				onHoverOut: $onhoverout
		});
		});
	</script>";
	return $dspp;
}
add_shortcode('dspp_old', 'dspp_shortcode_old');

//panel shortcode
function dspp_panel_shortcode($atts, $content)
{
	extract(shortcode_atts(array(
		'tag' => 'div',
		'id' => 'processPanel',
		'class' => 'dspp_panel',
		'style' => '',
		'action' => '',
		'method' => ''
	), $atts));
	if($id!="")
		$stepContent = "<$tag id='$id'" . " class='$class'" . ($style!="" ? " style='$style'" : "") . ($action!="" ? " action='$action'" : "") . ($method!="" ? " method='$method'" : "") . ">" . do_shortcode($content) . "</$tag>";
	else
		$stepContent = "id attribute required!";
	return $stepContent;
}
add_shortcode('dspp_panel', 'dspp_panel_shortcode');

//step shortcode
function dspp_step_shortcode($atts, $content)
{
	extract(shortcode_atts(array(
		'tag' => 'a',
		'class' => '',
		'href' => '',
		'label' => ''
	), $atts));
	if($href!="")
		$step = "<$tag href='$href'" . ($class!="" ? " class='$class'" : "") . ($label!="" ? " label='$label'" : "") . ">" . do_shortcode($content) . "</$tag>";
	else
		$step = "href attribute required!";
	return $step;
}
add_shortcode('dspp_step', 'dspp_step_shortcode');

//content shortcode
function dspp_content_shortcode($atts, $content)
{
	extract(shortcode_atts(array(
		'tag' => 'div',
		'id' => '',
		'class' => ''
	), $atts));
	if($id!="")
		$stepContent = "<$tag id='$id'" . ($class!="" ? " class='$class'" : "") . ">" . do_shortcode($content) . "</$tag>";
	else
		$stepContent = "id attribute required!";
	return $stepContent;
}
add_shortcode('dspp_content', 'dspp_content_shortcode');
?>