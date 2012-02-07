<?php
	if ( !$module_settings ) {
		require( "../settings.php" );
	}
	
	if ( $_COOKIE[ "cl_session" ] == $_ini_password ) {
		echo( '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
				<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-us" lang="en-us">
				  <head>
					<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
					<title>Country lock</title>
						
						<meta http-equiv="content-type" content="text/html; charset=utf-8" />
						<meta http-equiv="Content-Type" content="text/html" />
						
						<link rel="stylesheet" href="../data/css/blueprint/plugins/buttons/screen.css" type="text/css" media="screen, projection">
						<link href="../data/css/uni-form.css" title="Default Style" media="screen" rel="stylesheet"/>
						<link href="../data/css/main.css" title="Default Style" media="screen" rel="stylesheet"/>
						<link href="../data/css/box.css" title="Default Style" media="screen" rel="stylesheet"/>
						
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
					<form action="" class="uniForm" method="post">
					
					<div class="header">
						<fieldset>
							<h2 class="alt"><center><img src="../data/logo.png" alt="Country lock" /></h2>
							<hr>
							<a class="button" href="changepassword.php">
								<img src="../data/css/blueprint/plugins/buttons/icons/key.png" alt=""/> Change Password
							</a>
							<a class="button" href="../../documentation">
								<img src="../data/css/blueprint/plugins/buttons/icons/information.png" alt=""/> Documentation
							</a>
							<a class="button" href="../../">
								<img src="../data/css/blueprint/plugins/buttons/icons/application_form.png" alt=""/> Manage lists
							</a>
							<a class="button" target="_blank" href="http://colzdragon.com/index.php?p=/categories/freelance-projects/">
								<img src="../data/css/blueprint/plugins/buttons/icons/bug.png" alt=""/> Report a bug
							</a>
							<a class="button negative" href="reinstall.php">
								<img src="../data/css/blueprint/plugins/buttons/icons/cross.png" alt=""/> Reinstall Country lock
							</a>
					  </fieldset>
					 </div>
					 <form action="" class="uniForm" method="post">
					 <fieldset>' );
					if ( $_ini_update ) {
						echo( '
						 <div class="notice">
							<p>An update to Country Lock is available ( v' . $_ini_update_version . ' ), you are currently running Country lock v.' . $_version . '. You can upgrade by downloading the new version <a href="http://codecanyon.net/item/country-lock/153882">here</a>.</p>
						</div>' );
					}
					
					if ( file_exists( "../install.php" ) ) {
						echo( '
						 <div class="error">
							<p>The Country lock install file still exists! <a href="../install_del.php">Click here to automatically delete it.</a></p>
						</div>' );
					}
						echo( '<p>Thank you for logging into Country lock!</p>
					  </fieldset>
					</form>
				  </body>
				</html>' );
	} else {
		echo( '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-us" lang="en-us">
		  <head>
			<title>Country lock</title>
			
			<meta http-equiv="content-type" content="text/html; charset=utf-8" />
			<meta http-equiv="Content-Type" content="text/html" />
			
			<link href="../data/css/uni-form.css" title="Default Style" media="screen" rel="stylesheet"/>
			<link href="../data/css/main.css" title="Default Style" media="screen" rel="stylesheet"/>
			
			<script type="text/javascript" src="../data/js/jquery.min.js"></script>
			<script src="data/js/uni-form-validation.jquery.js" type="text/javascript"></script>
		  
			
			<!--[if lte ie 7]>
			  <style type="text/css" media="screen">
				/* Move these to your IE6/7 specific stylesheet if possible */
				.uniForm, .uniForm fieldset, .uniForm .ctrlHolder, .uniForm .formHint, .uniForm .buttonHolder, .uniForm .ctrlHolder ul{ zoom:1; }
			  </style>
			<![endif]-->
		  </head>

		  <body>

			<h1><img border=0 alt="Country lock" src="../data/logo.png" /></h1>
			
			<form action="../auth.php" class="uniForm" method="post">
			  <fieldset>
				<h3>Authentication</h3>
				<div class="ctrlHolder">
					<label for="">Password</label>
					<input type="password" name="password" id="" size="35" maxlength="50" type="text" class="textInput medium error"/>
					<p class="formHint">Please enter your password.</p>
				</div>
				
				<div class="buttonHolder">
					<button type="submit" class="primaryAction">Login</button>
				</div>
			  </fieldset>
			</form>

			<div id="footer">
			  <p><a href="documentation"><img src="../data/icn/information.png" border=0 /></a>&nbsp;<a href="admin"><img src="../data/icn/database_gear.png" border=0 /></a></p>
			</div>

		  </body>
		</html>' );
	}

?>