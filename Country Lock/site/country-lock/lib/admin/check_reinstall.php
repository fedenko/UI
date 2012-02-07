<?php
	if ( !$module_settings ) {
		require( "../settings.php" );
	}
	
	if ( !$_COOKIE[ "cl_session" ] == $_ini_password ) {
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
	} else {
		if ( $_POST[ "sure" ] != "on" ) {
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
				<form action="check_reinstall.php" class="uniForm" method="post">
				
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
				 <form action="save.php" class="uniForm" method="post">
				 <fieldset>
					<div class="ctrlHolder noLabel">
					  <ul>
						<li><label for=""><input id="" name="sure" data-default-value="" type="checkbox"/> Are you sure you want to do this? This action can not be reversed.</label></li>
					  </ul>
					</div>
					<div class="buttonHolder">
						<button type="submit" class="primaryAction">Reinstall</button>
					</div>
				  </fieldset>
				</form>
			  </body>
			</html>' );
		} else {
			if ( !file_exists( "../install.php" ) ) {
				$payload = "PD9waHANCglyZXF1aXJlKCAiaW5pLnBocCIgKTsNCgkNCglpZiAoICEkX1BPU1RbICJwYXNzd29yZCIgXSB8fCAhJF9QT1NUWyAicGF0aCIgXSApIHsNCgkJZWNobyggJzwhRE9DVFlQRSBodG1sIFBVQkxJQyAiLS8vVzNDLy9EVEQgWEhUTUwgMS4wIFN0cmljdC8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9UUi94aHRtbDEvRFREL3hodG1sMS1zdHJpY3QuZHRkIj4NCgk8aHRtbCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCIgeG1sOmxhbmc9ImVuLXVzIiBsYW5nPSJlbi11cyI+DQoJICA8aGVhZD4NCgkJPHRpdGxlPkNvdW50cnkgbG9jazwvdGl0bGU+DQoJCQ0KCQk8bWV0YSBodHRwLWVxdWl2PSJjb250ZW50LXR5cGUiIGNvbnRlbnQ9InRleHQvaHRtbDsgY2hhcnNldD11dGYtOCIgLz4NCgkJPG1ldGEgaHR0cC1lcXVpdj0iQ29udGVudC1UeXBlIiBjb250ZW50PSJ0ZXh0L2h0bWwiIC8+DQoJCQ0KCQk8bGluayBocmVmPSJkYXRhL2Nzcy91bmktZm9ybS5jc3MiIHRpdGxlPSJEZWZhdWx0IFN0eWxlIiBtZWRpYT0ic2NyZWVuIiByZWw9InN0eWxlc2hlZXQiLz4NCgkJPGxpbmsgaHJlZj0iZGF0YS9jc3MvbWFpbi5jc3MiIHRpdGxlPSJEZWZhdWx0IFN0eWxlIiBtZWRpYT0ic2NyZWVuIiByZWw9InN0eWxlc2hlZXQiLz4NCgkJDQoJCTxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0IiBzcmM9ImRhdGEvanMvanF1ZXJ5Lm1pbi5qcyI+PC9zY3JpcHQ+DQoJCTxzY3JpcHQgc3JjPSJkYXRhL2pzL3VuaS1mb3JtLXZhbGlkYXRpb24uanF1ZXJ5LmpzIiB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPjwvc2NyaXB0Pg0KCSAgDQoJCQ0KCQk8IS0tW2lmIGx0ZSBpZSA3XT4NCgkJICA8c3R5bGUgdHlwZT0idGV4dC9jc3MiIG1lZGlhPSJzY3JlZW4iPg0KCQkJLyogTW92ZSB0aGVzZSB0byB5b3VyIElFNi83IHNwZWNpZmljIHN0eWxlc2hlZXQgaWYgcG9zc2libGUgKi8NCgkJCS51bmlGb3JtLCAudW5pRm9ybSBmaWVsZHNldCwgLnVuaUZvcm0gLmN0cmxIb2xkZXIsIC51bmlGb3JtIC5mb3JtSGludCwgLnVuaUZvcm0gLmJ1dHRvbkhvbGRlciwgLnVuaUZvcm0gLmN0cmxIb2xkZXIgdWx7IHpvb206MTsgfQ0KCQkgIDwvc3R5bGU+DQoJCTwhW2VuZGlmXS0tPg0KCSAgPC9oZWFkPg0KDQoJICA8Ym9keT4NCg0KCQk8aDE+PGltZyBib3JkZXI9MCBhbHQ9IkNvdW50cnkgbG9jayIgc3JjPSJkYXRhL2xvZ28ucG5nIiAvPjwvaDE+DQoJCQ0KCQk8Zm9ybSBhY3Rpb249Imluc3RhbGwucGhwIiBjbGFzcz0idW5pRm9ybSIgbWV0aG9kPSJwb3N0Ij4NCgkJDQoJCTxkaXYgY2xhc3M9ImhlYWRlciI+DQoJCQk8aDI+Q291bnRyeSBsb2NrPC9oMj4NCgkJCTxwPkF1dGhvcjogPGEgaHJlZj0iaHR0cDovL2NvZGVjYW55b24ubmV0L3VzZXIvSGVsaXhOZWJ1bGEiPkhlbGl4IE5lYnVsYTwvYT4gPGEgdGFyZ2V0PSJfYmxhbmsiIGhyZWY9Imh0dHA6Ly9jb2RlY2FueW9uLm5ldC91c2VyL0hlbGl4TmVidWxhL3BvcnRmb2xpbyIgY2xhc3M9ImN0YSI+U2VlIG1vcmUgc2NyaXB0cyA+PC9hPjwvcD4NCgkJPC9kaXY+DQoJCTxwPkNvdW50cnkgTG9jayBpcyBhIHNpbXBsZSBzY3JpcHQgdGhhdCBhbGxvd3MgeW91IHRvIGVhc2lseSBnZW5lcmF0ZSBhIGxpbmUgb2YgY29kZSB0byBibG9jayBjZXJ0YWluIGNvdW50cmllcy4gWW91IGdlbmVyYXRlIHRoZSBjb2RlIHRocm91Z2ggdGhlIGVhc3ktdG8tdXNlIGFlc3RoZXRpYyBmb3JtLiBOT1RFIDogQ291bnRyeSBMb2NrIGJsb2NrcyBjb3VudHJpZXMgYmFzZWQgb24gdGhlIGNsaWVudHMgbmF0aXZlIGxhbmd1YWdlLCBOT1QgSVA7IGJ5IGRvaW5nIHNvLCBjaGVja2luZyBpZiBhIGNsaWVudCBpcyBpbiBhIGNvdW50cnkgaXMgTVVDSCBmYXN0ZXIsIGFuZCBkb2VzblwndCBldmVuIG5lZWQgU1FMICE8L3A+DQoJCSAgPGZpZWxkc2V0Pg0KCQkJPGgzPlVzaW5nIHRoZSBidXR0b25zPC9oMz4NCgkJCTxwPlRoZSA8YSBocmVmPSJkb2N1bWVudGF0aW9uIj48aW1nIHNyYz0iZGF0YS9pY24vaW5mb3JtYXRpb24ucG5nIiBib3JkZXI9MCAvPjwvYT4gaWNvbiBmb3VuZCBhdCB0aGUgYm90dG9tIG9mIGV2ZXJ5IENvdW50cnkgTG9jayBwYWdlIGxlYWRzIHlvdSB0byB0aGUgQ291bnRyeSBMb2NrIGRvY3VtZW50YXRpb24gd2hlbiBjbGlja2VkLjxicj4NCgkJCVRoZSA8YSBocmVmPSJhZG1pbiI+PGltZyBzcmM9ImRhdGEvaWNuL2RhdGFiYXNlX2dlYXIucG5nIiBib3JkZXI9MCAvPjwvYT4gaWNvbiBmb3VuZCBhdCB0aGUgYm90dG9tIG9mIGV2ZXJ5IENvdW50cnkgTG9jayBwYWdlIGxlYWRzIHlvdSB0byB0aGUgQ291bnRyeSBMb2NrIGFkbWluaXN0cmF0aW9uIHBhZ2Ugd2hlbiBjbGlja2VkLg0KCQkJPC9wPg0KCQkJPGgzPkluc3RhbGxhdGlvbjwvaDM+DQoJCQk8ZGl2IGlkPSJlcnJvck1zZyI+DQoJCQk8aDI+U29tZSBlcnJvcnMgd2VyZSBlbmNvdW50ZXJlZCBkdXJpbmcgdGhlIGluc3RhbGxhdGlvbiBvZiBDb3VudHJ5IExvY2s6PC9oMj4NCgkJCSAgPG9sPg0KCQkJICAnICk7DQoJCQlpZiAoICEkX1BPU1RbICJwYXRoIiBdICkgew0KCQkJCWVjaG8oICc8bGk+VGhlIHBhdGggZmllbGQgaXMgbWlzc2luZy48L2xpPicgKTsNCgkJCX0NCgkJCWlmICggISRfUE9TVFsgInBhc3N3b3JkIiBdICkgew0KCQkJCWVjaG8oICc8bGk+VGhlIHBhc3N3b3JkIGZpZWxkIGlzIG1pc3NpbmcuPC9saT4nICk7DQoJCQl9DQoJCQllY2hvKCAnPC9vbD4NCgkJICA8L2Rpdj48cD5JdCBsb29rcyBsaWtlIHRoaXMgaXMgeW91ciBmaXJzdCB0aW1lIHVzaW5nIENvdW50cnkgTG9jaywgaW5zdGFsbGF0aW9uIGlzIGVhc3kgYW5kIHNpbXBsZSwganVzdCBmaWxsIGluIHRoZSBmb3JtIGJlbG93LjwvcD4NCgkJCTxwPlRoZSBwYXRoIHRvIENvdW50cnkgTG9jayBpcyB3aGVyZSB5b3UgdXBsb2FkZWQgQ291bnRyeSBsb2NrIHRvLiBJZiB5b3UgbG9vayB1cCB0aGVyZSBhdCB0aGUgYWRkcmVzcyBiYXIgaWYgaXQgc2F5cyBodHRwOi8vd3d3LnlvdXJkb21haW4uY29tL2NvdW50cnktbG9jay8gdGhlbiB5b3UgcHV0IGNvdW50cnktbG9jayBpbnRvIHRoZSBmaWVsZCBiZWxvdy4NCgkJCUlmIGl0IHNheXMgaHR0cDovL3d3dy55b3VyZG9tYWluLmNvbS9ibGFoL2NvdW50cnktbG9jay8geW91IHB1dCBibGFoL2NvdW50cnktbG9jayBpbnRvIHRoZSBmaWVsZCBiZWxvdywgYW5kIHNvIG9uLjwvcD4NCgkJCQ0KCQkJPGRpdiBjbGFzcz0iY3RybEhvbGRlciI+DQoJCQkJPGxhYmVsIGZvcj0iIj5Db3VudHJ5IGxvY2sgcGF0aDwvbGFiZWw+DQoJCQkJPGlucHV0IG5hbWU9InBhdGgiIGlkPSIiIGRhdGEtZGVmYXVsdC12YWx1ZT0iIiBzaXplPSIzNSIgbWF4bGVuZ3RoPSI1MCIgdHlwZT0idGV4dCIgY2xhc3M9InRleHRJbnB1dCBsYXJnZSBlcnJvciIvPg0KCQkJPC9kaXY+DQoJCQk8cD5UaGUgYmVsb3cgZmllbGQgZGV0ZXJtaW5lcyB0aGUgcGFzc3dvcmQgbmVlZGVkIHRvIGxvZ2luIHRvIHRoZSBhZG1pbmlzdHJhdGlvbiBwYWdlLjwvcD4NCgkJCTxkaXYgY2xhc3M9ImN0cmxIb2xkZXIiPg0KCQkJCTxsYWJlbCBmb3I9IiI+UGFzc3dvcmQ8L2xhYmVsPg0KCQkJCTxpbnB1dCBuYW1lPSJwYXNzd29yZCIgaWQ9IiIgZGF0YS1kZWZhdWx0LXZhbHVlPSJQbGVhc2UgaW5wdXQgYSBwYXNzd29yZCwgdGhpcyB3aWxsIGJlIHVzZWQgdG8gbG9naW4gdG8geW91ciBhZG1pbiBwYWdlLiIgc2l6ZT0iMzUiIG1heGxlbmd0aD0iNTAiIHR5cGU9InRleHQiIGNsYXNzPSJ0ZXh0SW5wdXQgbGFyZ2UgZXJyb3IiLz4NCgkJCQk8cCBjbGFzcz0iZm9ybUhpbnQiPjxhIGhyZWY9Imh0dHA6Ly93d3cucmFuZG9tLm9yZy9wYXNzd29yZHMvIiB0YXJnZXQ9Il9ibGFuayI+PGltZyBzcmM9ImRhdGEvaWNuL2tleV9hZGQucG5nIiBib3JkZXI9MCAvPiBHZW5lcmF0ZSBhIHBhc3N3b3JkPC9hPjwvcD4NCgkJCTwvZGl2Pg0KCQkJDQoJCQk8ZGl2IGNsYXNzPSJidXR0b25Ib2xkZXIiPg0KCQkJCTxidXR0b24gdHlwZT0ic3VibWl0IiBjbGFzcz0icHJpbWFyeUFjdGlvbiI+SW5zdGFsbDwvYnV0dG9uPg0KCQkJPC9kaXY+DQoJCSAgPC9maWVsZHNldD4NCgkJPC9mb3JtPg0KDQoJCTxkaXYgaWQ9ImZvb3RlciI+DQoJCQk8cD48YSBocmVmPSJkb2N1bWVudGF0aW9uIj48aW1nIHNyYz0iZGF0YS9pY24vaW5mb3JtYXRpb24ucG5nIiBib3JkZXI9MCAvPjwvYT4mbmJzcDs8YSBocmVmPSJqYXZhc2NyaXB0OmFsZXJ0KCBcJ1lvdSBoYXZlIG5vdCBpbnN0YWxsZWQgQ291bnRyeSBsb2NrIHlldCFcJyApIj48aW1nIHNyYz0iZGF0YS9pY24vZGF0YWJhc2VfZ2Vhci5wbmciIGJvcmRlcj0wIC8+PC9hPjwvcD4NCgkJPC9kaXY+DQoNCgkgIDwvYm9keT4NCgk8L2h0bWw+JyApOw0KCX0gZWxzZSB7DQoJCSRzZXR0aW5ncyA9IEFycmF5KCApOw0KCQkkc2V0dGluZ3NbICJzZXR0aW5ncyIgXVsgInNldHVwIiBdID0gdHJ1ZTsNCgkJJHNldHRpbmdzWyAic2V0dGluZ3MiIF1bICJwYXRoIiBdID0gc3RyX3JlcGxhY2UoICJsaWIiLCAiIiwgZGlybmFtZSggX19GSUxFX18gKSApOw0KCQkkc2V0dGluZ3NbICJzZXR0aW5ncyIgXVsgImh0dHBfcGF0aCIgXSA9ICJodHRwOi8vIiAuICRfU0VSVkVSWyAiSFRUUF9IT1NUIiBdIC4gIi8iIC4gJF9QT1NUWyAicGF0aCIgXTsNCgkJJHNldHRpbmdzWyAic2V0dGluZ3MiIF1bICJwYXNzd29yZCIgXSA9IGhhc2goICJTSEEyNTYiLCAkX1BPU1RbICJwYXNzd29yZCIgXSApOw0KCQl3cml0ZV9pbmlfc2V0dGluZ3MoICRzZXR0aW5ncyApOw0KCQkNCgkJaGVhZGVyKCAiTG9jYXRpb246IGh0dHA6Ly8iIC4gJF9TRVJWRVJbICJIVFRQX0hPU1QiIF0gLiAiLyIgLiAkX1BPU1RbICJwYXRoIiBdICk7DQoJfQ0KPz4=";
				$handle = fopen( "../install.php", "w" ) or die( "FATAL ERROR: Can't create the file, maybe your permissions are messed up? Try chmodding this directory to add write access" );
				
				fwrite( $handle, base64_decode( $payload ) );
				fclose( $handle );
				
				unlink( "../cfg/settings.ini" );
				
				header( "Location: " . $_ini_http_path );
			} else {
				unlink( "../cfg/settings.ini" );
				header( "Location: " . $_ini_http_path );
			}
		}
	}