<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
				<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-us" lang="en-us">
				  <head>
					<title>Country lock</title>
					
					<meta http-equiv="content-type" content="text/html; charset=utf-8" />
					<meta http-equiv="Content-Type" content="text/html" />
					
					<link href="../data/css/uni-form.css" title="Default Style" media="screen" rel="stylesheet"/>
					<link href="../data/css/main.css" title="Default Style" media="screen" rel="stylesheet"/>
					
					<script type="text/javascript" src="../data/js/jquery.min.js"></script>
					<script src="../data/js/uni-form-validation.jquery.js" type="text/javascript"></script>
				  
					
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
					  <p><a href="documentation"><img src="../data/icn/information.png" border=0 /></a>&nbsp;<a href="../admin"><img src="../data/icn/database_gear.png" border=0 /></a></p>
					</div>

				  </body>
				</html>