<?php
require_once('class.php');
$zsw = new VideoGallery();
function zsw_showgallery($id){
    global $zsw;
    echo $zsw->front_show_gallery($id);
}
if(isset ($_GET['action']) && $_GET['action']=='view'){
    //iframe feed
    ?>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>The title</title>
        <link rel="stylesheet" href="css/reset.css"/>
    	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js" type="text/javascript"></script>
        <script type="text/javascript" src="iosgallery/iosgallery.js"></script>
        <link rel="stylesheet" type="text/css" href="iosgallery/iosgallery.css"/>
        <!--[if IE]>
        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
    </head>
    <body>
<?php
    zsw_showgallery($_GET['id']);
    ?>
    </body>
</html>
<?php
}