
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>The title</title>
        <link rel='stylesheet' type="text/css" href="css/reset.css"/>
        <link rel='stylesheet' type="text/css" href="css/style.css"/>
    	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js" type="text/javascript"></script>
        <!--[if IE]>
        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
    </head>
    <body>
        
        <div class="main-container">
		<div class="header_wrapper">
                    <div class="header_pattern"></div>
			<div class="header">
				<div class="logo"></div>
                    <div class="admincircle-con"><a href="http://thezoomer.net/php_ygallery/admin/admin.php" class="admincircle" target="_blank"></a></div>
			</div>
		</div>
            
        <div class="content_wrapper">
        <div class="content">
            <h2>Demo 1</h2>
    <?php
require_once('admin/bridge.php');
zsw_showgallery('default');
?>
        
        </div>
        </div>
        </div>
        </body>
</html>	