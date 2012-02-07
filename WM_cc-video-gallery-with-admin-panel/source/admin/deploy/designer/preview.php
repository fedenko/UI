<?php

header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
$designurl = '../xml/design.xml';
if(isset ($_GET['designrand']))
    $designurl='xml/design' . $_GET['designrand'] . '.xml';
$swfloc = 'deploy/preview.swf';
if(isset ($_GET['swfloc']))
    $swfloc=$_GET['swfloc'];

//$cachebuster = rand(5, );
?>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Video Gallery Designer Preview</title>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js" type="text/javascript"></script>
        <!--[if IE]>
        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
			<![endif]-->
        <style>*{margin:0; padding:0; border:0;}</style>
    </head>
    <body>
<?php
sleep(3);
?>
        <p>
            <object type="application/x-shockwave-flash" data="<?php echo $swfloc; ?>" width="675" height="300" id="flashcontent" style="visibility: visible; "><param name="movie" value="<?php echo $swfloc; ?>"><param name="menu" value="false"><param name="allowScriptAccess" value="always"><param name="scale" value="noscale"><param name="allowFullScreen" value="true"><param name="wmode" value="opaque"><param name="flashvars" value="video=oa_D1vBaBts;nBEn0In7Ufg;zojRyGQP4x8;Yjg5t3__lLs;WQF7ggH4gsE;CQpP00AbqNA;FI4mrRgELgA&types=youtube;youtube;youtube;youtube;youtube;youtube;youtube&titles=YouTube Video;Local Video;From Prada to Nada;Burning Palms;Cowboys and Aliens;The Resident;What is Paul?&descriptions=This is the first YouTube video. Add them just by typing the id in the admin panel.;This is a video [ flv ] added simply through the admin panel. Just by clicking Upload.;YouTube Trailer HD;YouTube Trailer HD;YouTube Trailer HD;YouTube Trailer HD;YouTube Trailer HD&menuPosition=right&designXML=<?php echo $designurl; ?>">
            </object>
        </p>
    </body>
</html> 