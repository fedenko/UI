<?php
require( "lib/settings.php" );
if ( $_ini_setup != true ) {

	echo( '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-us" lang="en-us">
	  <head>
		<title>Country lock</title>
		
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta http-equiv="Content-Type" content="text/html" />
		
		<link href="lib/data/css/uni-form.css" title="Default Style" media="screen" rel="stylesheet"/>
		<link href="lib/data/css/main.css" title="Default Style" media="screen" rel="stylesheet"/>
		
		<script type="text/javascript" src="lib/data/js/jquery.min.js"></script>
		<script src="lib/data/js/uni-form-validation.jquery.js" type="text/javascript"></script>
	  
		
		<!--[if lte ie 7]>
		  <style type="text/css" media="screen">
			/* Move these to your IE6/7 specific stylesheet if possible */
			.uniForm, .uniForm fieldset, .uniForm .ctrlHolder, .uniForm .formHint, .uniForm .buttonHolder, .uniForm .ctrlHolder ul{ zoom:1; }
		  </style>
		<![endif]-->
	  </head>

	  <body>

		<h1><img border=0 alt="Country lock" src="lib/data/logo.png" /></h1>
		
		<form action="lib/install.php" class="uniForm" method="post">
		
		<div class="header">
			<h2>Country lock</h2>
			<p>Author: <a href="http://codecanyon.net/user/HelixNebula">Helix Nebula</a> <a target="_blank" href="http://codecanyon.net/user/HelixNebula/portfolio" class="cta">See more scripts ></a></p>
		</div>
		<p>Country Lock is a simple script that allows you to easily generate a line of code to block certain countries. You generate the code through the easy-to-use aesthetic form. NOTE : Country Lock blocks countries based on the clients native language, NOT IP; by doing so, checking if a client is in a country is MUCH faster, and doesn\'t even need SQL !</p>
		  <fieldset>
			<h3>Using the buttons</h3>
			<p>The <a href="documentation"><img src="lib/data/icn/information.png" border=0 /></a> icon found at the bottom of every Country Lock page leads you to the Country Lock documentation when clicked.<br>
			The <a href="lib/admin"><img src="lib/data/icn/database_gear.png" border=0 /></a> icon found at the bottom of every Country Lock page leads you to the Country Lock administration page when clicked.
			</p>
			<h3>Installation</h3>
			<p>It looks like this is your first time using Country Lock, installation is easy and simple, just fill in the form below.</p>
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
				<p class="formHint"><a href="http://www.random.org/passwords/" target="_blank"><img src="lib/data/icn/key_add.png" border=0 /> Generate a password</a></p>
			</div>
			
			<div class="buttonHolder">
				<button type="submit" class="primaryAction">Install</button>
			</div>
		  </fieldset>
		</form>

		<div id="footer">
			<p><a href="documentation"><img src="lib/data/icn/information.png" border=0 /></a>&nbsp;<a href="javascript:alert( \'You have not installed Country lock yet!\' )"><img src="lib/data/icn/database_gear.png" border=0 /></a></p>
		</div>

	  </body>
	</html>' );
	die( );
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-us" lang="en-us">
  <head>
    <title>Country lock</title>
    
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Type" content="text/html" />
    
    <link href="lib/data/css/uni-form.css" title="Default Style" media="screen" rel="stylesheet"/>
    <link href="lib/data/css/main.css" title="Default Style" media="screen" rel="stylesheet"/>
    
    <script type="text/javascript" src="lib/data/js/jquery.min.js"></script>
    <script src="lib/data/js/uni-form-validation.jquery.js" type="text/javascript"></script>
  
    
    <!--[if lte ie 7]>
      <style type="text/css" media="screen">
        /* Move these to your IE6/7 specific stylesheet if possible */
        .uniForm, .uniForm fieldset, .uniForm .ctrlHolder, .uniForm .formHint, .uniForm .buttonHolder, .uniForm .ctrlHolder ul{ zoom:1; }
      </style>
    <![endif]-->
  </head>

  <body>

    <h1><img border=0 alt="Country lock" src="lib/data/logo.png" /></h1>
    
    <form action="lib/process_country.php" class="uniForm" method="get">
      <fieldset>
        <h3>Code generator</h3>
		<p>Please select the countries you wish to block:</p>
		
		<div class="ctrlHolder noLabel">
          <ul>
            <li><label for=""><input id="" name="af" data-default-value="Placeholder text" type="checkbox"/> Africa</label></li>
            <li><label for=""><input id="" name="en-au" data-default-value="Placeholder text" type="checkbox"/> Australia</label></li>
            <li><label for=""><input id="" name="nl-be" data-default-value="Placeholder text" type="checkbox"/> Belgium</label></li>
			<li><label for=""><input id="" name="en-bz" data-default-value="Placeholder text" type="checkbox"/> Belize</label></li>
            <li><label for=""><input id="" name="pt-br" data-default-value="Placeholder text" type="checkbox"/> Brazil</label></li>
            <li><label for=""><input id="" name="en-gb" data-default-value="Placeholder text" type="checkbox"/> Britain</label></li>
			<li><label for=""><input id="" name="en-ca" data-default-value="Placeholder text" type="checkbox"/> Canada</label></li>
			<li><label for=""><input id="" name="en" data-default-value="Placeholder text" type="checkbox"/> Caribbean</label></li>
			<li><label for=""><input id="" name="es-c" data-default-value="Placeholder text" type="checkbox"/> Chile</label></li>
			<li><label for=""><input id="" name="_zh" data-default-value="Placeholder text" type="checkbox"/> China</label></li>
			<li><label for=""><input id="" name="es-co" data-default-value="Placeholder text" type="checkbox"/> Colombia</label></li>
			<li><label for=""><input id="" name="hr" data-default-value="Placeholder text" type="checkbox"/> Croatia</label></li>
			<li><label for=""><input id="" name="cs" data-default-value="Placeholder text" type="checkbox"/> Czech Republic</label></li>
			<li><label for=""><input id="" name="da" data-default-value="Placeholder text" type="checkbox"/> Denmark</label></li>
			<li><label for=""><input id="" name="ar-eg" data-default-value="Placeholder text" type="checkbox"/> Egypt</label></li>
			<li><label for=""><input id="" name="et" data-default-value="Placeholder text" type="checkbox"/> Estonia</label></li>
			<li><label for=""><input id="" name="fi" data-default-value="Placeholder text" type="checkbox"/> Finland</label></li>
            <li><label for=""><input id="" name="fr" data-default-value="Placeholder text" type="checkbox"/> France</label></li>
			<li><label for=""><input id="" name="_de" data-default-value="Placeholder text" type="checkbox"/> Germany</label></li>
            <li><label for=""><input id="" name="e" data-default-value="Placeholder text" type="checkbox"/> Greece</label></li>
            <li><label for=""><input id="" name="hu" data-default-value="Placeholder text" type="checkbox"/> Hungary</label></li>
			<li><label for=""><input id="" name="ar-iq" data-default-value="Placeholder text" type="checkbox"/> Iraq</label></li>
			<li><label for=""><input id="" name="en-ie" data-default-value="Placeholder text" type="checkbox"/> Ireland</label></li>
			<li><label for=""><input id="" name="en-jm" data-default-value="Placeholder text" type="checkbox"/> Jamaica</label></li>
			<li><label for=""><input id="" name="ja" data-default-value="Placeholder text" type="checkbox"/> Japan</label></li>
			<li><label for=""><input id="" name="ko" data-default-value="Placeholder text" type="checkbox"/> Korea</label></li>
			<li><label for=""><input id="" name="lv" data-default-value="Placeholder text" type="checkbox"/> Latvia</label></li>
			<li><label for=""><input id="" name="lt" data-default-value="Placeholder text" type="checkbox"/> Lithuanian</label></li>
			<li><label for=""><input id="" name="es-mx" data-default-value="Placeholder text" type="checkbox"/> Mexico</label></li>
			<li><label for=""><input id="" name="n" data-default-value="Placeholder text" type="checkbox"/> Netherlands</label></li>
			<li><label for=""><input id="" name="en-nz" data-default-value="Placeholder text" type="checkbox"/> New Zealand</label></li>
			<li><label for=""><input id="" name="ur" data-default-value="Placeholder text" type="checkbox"/> Pakistan</label></li>
			<li><label for=""><input id="" name="pt" data-default-value="Placeholder text" type="checkbox"/> Portugal</label></li>
			<li><label for=""><input id="" name="ro-mo" data-default-value="Placeholder text" type="checkbox"/> Romania</label></li>
			<li><label for=""><input id="" name="_ru" data-default-value="Placeholder text" type="checkbox"/> Russia</label></li>
			<li><label for=""><input id="" name="ar-sa" data-default-value="Placeholder text" type="checkbox"/> Saudi Arabia</label></li>
			<li><label for=""><input id="" name="gd" data-default-value="Placeholder text" type="checkbox"/> Scotland</label></li>
			<li><label for=""><input id="" name="sr" data-default-value="Placeholder text" type="checkbox"/> Serbia</label></li>
			<li><label for=""><input id="" name="sk" data-default-value="Placeholder text" type="checkbox"/> Slovakia</label></li>
			<li><label for=""><input id="" name="en-za" data-default-value="Placeholder text" type="checkbox"/> South Africa</label></li>
			<li><label for=""><input id="" name="es" data-default-value="Placeholder text" type="checkbox"/> Spain</label></li>
			<li><label for=""><input id="" name="sv" data-default-value="Placeholder text" type="checkbox"/> Sweden</label></li>
			<li><label for=""><input id="" name="th" data-default-value="Placeholder text" type="checkbox"/> Thailand</label></li>
			<li><label for=""><input id="" name="en-tt" data-default-value="Placeholder text" type="checkbox"/> Trinidad</label></li>
			<li><label for=""><input id="" name="ts" data-default-value="Placeholder text" type="checkbox"/> Tsonga</label></li>
			<li><label for=""><input id="" name="tr" data-default-value="Placeholder text" type="checkbox"/> Turkey</label></li>
			<li><label for=""><input id="" name="uk" data-default-value="Placeholder text" type="checkbox"/> Ukraine</label></li>
			<li><label for=""><input id="" name="en-us" data-default-value="Placeholder text" type="checkbox"/> United States</label></li>
			<li><label for=""><input id="" name="vi" data-default-value="Placeholder text" type="checkbox"/> Vietnam</label></li>
          </ul>
        </div>
		<div class="ctrlHolder">
          <label for="">Restriction type</label>
          <select name="type" id="" class="selectInput">
            <option data-default-value="Placeholder text">Blacklist</option>
            <option data-default-value="Placeholder text">Whitelist</option>
          </select>
          <p class="formHint">Blacklisting restricts the selected countries, and whitelisting <b>only</b> allows the selected countries.</p>
        </div>

		
		<div class="buttonHolder">
			<button type="submit" class="primaryAction">Generate Code</button>
		</div>
      </fieldset>
    </form>

    <div id="footer">
      <p><a href="documentation"><img src="lib/data/icn/information.png" border=0 /></a>&nbsp;<a href="lib/admin"><img src="lib/data/icn/database_gear.png" border=0 /></a></p>
    </div>

  </body>
</html>