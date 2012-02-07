<?php 
include_once 'checklog.php'; 
include_once 'config.php'; 
include_once 'functions.php'; 
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />	
	<link href="css/wooo.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="js/jquery.validate.min.js"></script>
	<script type="text/javascript" src="js/jquery.easing.js"></script>
	<script type="text/javascript" src="js/jquery.dimensions.js"></script>
	<script type="text/javascript" src="js/jquery.accordion.js"></script>
	<script type="text/javascript" src="js/bloooming.woooshop.admin.js"></script>
	<title>woooShop admin</title>
</head>
	<body>
		<div class="wrapper">
			<a class="logo" href="/wooo"></a>
			<div class="ajax"></div>
			<div id="response"></div>
			<div class="site">
				<div class="menu">
					<a class="settings">settings</a>
					<a id="addnew">add new product</a>
					<a href="logout.php">logout</a>
				</div>
				<div id="items">
				
				</div>

				
				<div id="form">
				</div>
			
	</div><!--site-->
	</div><!--wrapper-->
	</body>
</html>
