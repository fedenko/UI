<?php
	require( "ini.php" );
	
	if ( !$_POST[ "password" ] || !$_POST[ "path" ] ) {
		echo( '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-us" lang="en-us">
	  <head>
		<title>Country lock</title>
		
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta http-equiv="Content-Type" content="text/html" />
		
		<link href="data/css/uni-form.css" title="Default Style" media="screen" rel="stylesheet"/>
		<link href="data/css/main.css" title="Default Style" media="screen" rel="stylesheet"/>
		
		<script type="text/javascript" src="data/js/jquery.min.js"></script>
		<script src="data/js/uni-form-validation.jquery.js" type="text/javascript"></script>
	  
		
		<!--[if lte ie 7]>
		  <style type="text/css" media="screen">
			/* Move these to your IE6/7 specific stylesheet if possible */
			.uniForm, .uniForm fieldset, .uniForm .ctrlHolder, .uniForm .formHint, .uniForm .buttonHolder, .uniForm .ctrlHolder ul{ zoom:1; }
		  </style>
		<![endif]-->
	  </head>

	  <body>

		<h1><img border=0 alt="Country lock" src="data/logo.png" /></h1>
		
		<form action="install.php" class="uniForm" method="post">
		
		<div class="header">
			<h2>Country lock</h2>
			<p>Author: <a href="http://codecanyon.net/user/HelixNebula">Helix Nebula</a> <a target="_blank" href="http://codecanyon.net/user/HelixNebula/portfolio" class="cta">See more scripts ></a></p>
		</div>
		<p>Country Lock is a simple script that allows you to easily generate a line of code to block certain countries. You generate the code through the easy-to-use aesthetic form. NOTE : Country Lock blocks countries based on the clients native language, NOT IP; by doing so, checking if a client is in a country is MUCH faster, and doesn\'t even need SQL !</p>
		  <fieldset>
			<h3>Using the buttons</h3>
			<p>The <a href="documentation"><img src="data/icn/information.png" border=0 /></a> icon found at the bottom of every Country Lock page leads you to the Country Lock documentation when clicked.<br>
			The <a href="admin"><img src="data/icn/database_gear.png" border=0 /></a> icon found at the bottom of every Country Lock page leads you to the Country Lock administration page when clicked.
			</p>
			<h3>Installation</h3>
			<div id="errorMsg">
			<h2>Some errors were encountered during the installation of Country Lock:</h2>
			  <ol>
			  ' );
			if ( !$_POST[ "path" ] ) {
				echo( '<li>The path field is missing.</li>' );
			}
			if ( !$_POST[ "password" ] ) {
				echo( '<li>The password field is missing.</li>' );
			}
			echo( '</ol>
		  </div><p>It looks like this is your first time using Country Lock, installation is easy and simple, just fill in the form below.</p>
			<p>The path to Country Lock is where you uploaded Country lock to. If you look up there at the address bar if it says http://www.yourdomain.com/country-lock/ then you put country-lock into the field below.
			If it says http://www.yourdomain.com/blah/country-lock/ you put blah/country-lock into the field below, and so on.</p>
			
			<div class="ctrlHolder">
				<label for="">Country lock path</label>
				<input name="path" id="" data-default-value="" size="35" maxlength="50" type="text" class="textInput large error"/>
			</div>
			<p>The below field determines the password needed to login to the administration page.</p>
			<div class="ctrlHolder">
				<label for="">Password</label>
				<input name="password" id="" data-default-value="Please input a password, this will be used to login to your admin page." size="35" maxlength="50" type="text" class="textInput large error"/>
				<p class="formHint"><a href="http://www.random.org/passwords/" target="_blank"><img src="data/icn/key_add.png" border=0 /> Generate a password</a></p>
			</div>
			
			<div class="buttonHolder">
				<button type="submit" class="primaryAction">Install</button>
			</div>
		  </fieldset>
		</form>

		<div id="footer">
			<p><a href="documentation"><img src="data/icn/information.png" border=0 /></a>&nbsp;<a href="javascript:alert( \'You have not installed Country lock yet!\' )"><img src="data/icn/database_gear.png" border=0 /></a></p>
		</div>

	  </body>
	</html>' );
	} else {
		$settings = Array( );
		$settings[ "settings" ][ "setup" ] = true;
		$settings[ "settings" ][ "path" ] = str_replace( "lib", "", dirname( __FILE__ ) );
		$settings[ "settings" ][ "http_path" ] = "http://" . $_SERVER[ "HTTP_HOST" ] . "/" . $_POST[ "path" ];
		$settings[ "settings" ][ "password" ] = hash( "SHA256", $_POST[ "password" ] );
		write_ini_settings( $settings );
		
		header( "Location: http://" . $_SERVER[ "HTTP_HOST" ] . "/" . $_POST[ "path" ] );
	}
?>