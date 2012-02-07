<?php
$theuser = '';

require_once('../../config.php');
if (isset($_REQUEST['thedata'])) {
    $thedata = $_REQUEST['thedata'];
    //$dat = unserialize($thedata);
    $params = array();
    parse_str($_POST['thedata'], $params);
    //print_r($params);
    //echo $thedata;
    $myFile = "db/db.txt";
    $fh = fopen($myFile, 'w') or die("can't open file");
    $stringData = serialize($params);
    fwrite($fh, $stringData);
    fclose($fh);

    $xmlFile = $config['xmllocation'];
    $xmlData = '<?xml version="1.0"?>';
    $xmlData.='<content>';
    foreach ($params as $key => $param) {
        //$xmlData.='<>'x
        $xmlData .= '<' . $key . '>' . $param . '</' . $key . '>';
    }
    $xmlData.='</content>';
    $xh = fopen($xmlFile, 'w') or die("can't open file");
    fwrite($xh, $xmlData);
    fclose($xh);
    //print_r($xmlData);

    die();
}


if (isset($_REQUEST['previewdata'])) {
    $thedata = $_REQUEST['previewdata'];
    //$dat = unserialize($thedata);
    $params = array();
    parse_str($_POST['previewdata'], $params);
    print_r($params);
    //echo $thedata;

    $xmlFile = "xml/design" . $params['rand'] . ".xml";
    $xmlData = '<?xml version="1.0"?>';
    $xmlData.='<content>';
    foreach ($params as $key => $param) {
        //$xmlData.='<>'
        $xmlData .= '<' . $key . '>' . $param . '</' . $key . '>';
    }
    $xmlData.='</content>';
    $xh = fopen($xmlFile, 'w') or die("can't open file");
    fwrite($xh, $xmlData);
    fclose($xh);
    //print_r($xmlData);

    die();
}





$dbget = file_get_contents("db/db.txt");
$data = unserialize($dbget);

//print_r($data);

function add_simple_field($pname) {
    global $data;
    $fout = '';
    $val = '';
    if (isset($data[$pname]))
        $val = $data[$pname];
    $fout.='<div class="setting"><input type="text" class="textinput short" name="' . $pname . '" value="' . $val . '"></div>';
    echo $fout;
}

function add_cb_field($pname) {
    global $data;
    $fout = '';
    $val = '';
    if (isset($data[$pname]))
        $val = $data[$pname];
    $checked = '';
    if($val=='on')
        $checked=' checked';
    
    $fout.='<div class="setting"><input type="checkbox" class="textinput" name="' . $pname . '" value="on" '.$checked.'/> on</div>';
    echo $fout;
}

function add_cp_field($pname) {
    global $data;
    $fout = '';
    $val = '';
    if (isset($data[$pname]))
        $val = $data[$pname];
    $fout.='
    <div class="setting"><input type="text" class="textinput short" name="' . $pname . '" value="' . $val . '">
                <div class="customWidget">
					<div class="colorSelector2"><div style="background-color: ' . $val . '"></div></div>
	                <div class="colorpickerHolder2">
	                </div>
				</div>
    </div>';
    echo $fout;
}
//print_r($_POST);
//print_r($config);
$config = array_merge($config, $options_array);
admin_init();

function admin_init(){
    global $theuser, $config;
        $postuser = '';
        $postpass = '';
        $cookieuser = '';
        //print_r($_COOKIE);
        if(isset ($_POST['action_logout'])){
           setcookie("cookie_user", '', time()-10000);
          echo'<div>Redirecting...</div><script>
var basepath = unescape(window.location.pathname);
setTimeout( refresh, 1500 );
function refresh()
{
    window.location.href = basepath;
}
</script>';
           return;
        }
        if (isset($_COOKIE['cookie_user'])) {
            $cookieuser = $_COOKIE['cookie_user'];
        }
        if (isset($_POST['user'])) {
            $postuser = $_POST['user'];
        }
        if (isset($_POST['password'])) {
            $postpass = $_POST['password'];
        }
        

        $args = array();
        if ($cookieuser != '') {
            $theuser = $cookieuser;
            admin_menu();
            return;
        }
        //print_r($_POST);
        //print_r($config);
        if ($postuser == $config['user']) {
            if ($postpass == $config['password']) {
                $theuser = $postuser;
                admin_menu();
                return;
            } else {
                $args['warning'] = ('Password not correct...');
                admin_login_screen($args);
                return;
            }
        } else {
            if ($postuser != '') {
                $args['warning'] = ('Username not correct...');
            }
            admin_login_screen($args);
            return;
        }
    }
function admin_login_screen($args) {
    global $theuser, $config;
    if($theuser!=''){
                if(isset ($_POST['remember_me']) && $_POST['remember_me']=='on'){
                    setcookie("cookie_user", $theuser, time()+1200);
                }else{
                    setcookie("cookie_user", $theuser, time()+360);
                }
        }
        ?>
        <!DOCTYPE HTML>
        <html>
            <head>
                <title>Admin Login | DZS Video Gallery</title>
                <meta charset="UTF-8"/>
                <link rel="stylesheet" type="text/css" href="css/reset.css">
                <link rel="stylesheet" type="text/css" href="css/login.css">
            </head>

            <body class='loginpage'>
                <div class="login-form">
                    <form action="index.php" method="POST" class="login">
                        <fieldset class="loginBody">
                            <label>Username</label>
                            <input type="text" tabindex="1" placeholder="user" name="user" required>
                            <label>Password</label>
                            <input type="password" tabindex="2" required name="password">
                        </fieldset>
                        <footer>
                            <label><input name="remember_me" type="checkbox" tabindex="3"><p>Keep me logged in</p></label>
                            <input type="submit" class="btnLogin" value="Login" tabindex="4" name="action_login">
                        </footer>
                    </form>
                </div>
                <div class="warning"><?php if(isset ($args['warning'])) { echo $args['warning']; } ?></div>
            </body>
        </html>

        <?php
    }
//admin_menu();
function admin_menu(){
    global $theuser, $config, $data;
    if($theuser!=''){
                if(isset ($_POST['remember_me']) && $_POST['remember_me']=='on'){
                    setcookie("cookie_user", $theuser, time()+12000);
                }else{
                    setcookie("cookie_user", $theuser, time()+3600);
                }
        }
?>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" type="text/css" href="style/style.css"/>
        <link href='http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz&v2' rel='stylesheet' type='text/css'> 
        <title>DZS Video YouTube Vimeo Gallery Designer Center</title>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js" type="text/javascript"></script>
        <script type="text/javascript" src="colorpicker/colorpicker.js"></script>
        <script src="js/admin.js" type="text/javascript"></script>
        <link rel="stylesheet" href="colorpicker/colorpicker.css" type="text/css" /> 
        <!--[if IE]>
        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
        <script>
            window.swfloc = "<?php echo $config['swflocation']; ?>";
        </script>
    </head>
    <body>
        <div class="content-wrapper">
            <div class="content">
                <h1>Video Gallery Designer Center</h1>
                <?php if($config['ispreview']=='on'){ ?>
                <div class="comment">Hello and welcome to DZS Video / YouTube / Vimeo Gallery Designer Center. As this is only a preview, it will not save the changes in the primary database, but it will create temp files so you can preview the full power of this 
                    tool ( click <strong>Preview</strong> from the right ). You may notice that you won't find here all the options that you may need for fully customising the gallery. That's because here are only the options that are stricly related to the controls
                 of the gallery. The others like menu position, video list etc. are found in the main xml file ( gallery.xml ) you can find a full list of those options at the bottom.
                </div>
                <?php } ?>
                <hr>
                <div class="settings_block">
                    <h2>Settings</h2>
                    <div class="toggle">
                        <div class="toggle-title"><h3>Thumb Settings</h3><div class="arrow-down"></div></div>

                        <div class="toggle-content" style="display:none">

                            <h5>Width</h5>
                            <div class="setting"><input type="text" class="textinput short" name="thumbs_width" value="<?php echo $data['thumbs_width'] ?>"/></div>
                            <h5>Height</h5>
                            <div class="setting"><input type="text" class="textinput short" name="thumbs_height" value="<?php echo $data['thumbs_height'] ?>"/></div>
                            <h5>Spacing</h5>
                            <div class="setting"><input type="text" class="textinput short" name="thumbs_space" value="<?php echo $data['thumbs_space'] ?>"/></div>
                            <h5>Background</h5>
                            <div class="setting"><input type="text" class="textinput short" name="thumbs_bg" value="<?php echo $data['thumbs_bg'] ?>"/>
                                <div class="customWidget">
                                    <div class="colorSelector2"><div style="background-color: <?php echo $data['thumbs_bg'] ?>"></div></div>
                                    <div class="colorpickerHolder2" style="z-index:30">
                                    </div>
                                </div></div>
                            <h5>Border Width</h5>
                            <?php add_simple_field('thumbs_borderw') ?>
                            <h5>Border Color</h5>
                            <?php add_cp_field('thumbs_borderc') ?>
                            <h5>Thumb Pic Width</h5>
                            <?php add_simple_field('thumbs_pic_w') ?>
                            <h5>Thumb Pic Height</h5>
                            <?php add_simple_field('thumbs_pic_h') ?>
                            <h5>Thumb Pic X</h5>
                            <?php add_simple_field('thumbs_pic_x') ?>
                            <h5>Thumb Pic Y</h5>
                            <?php add_simple_field('thumbs_pic_y') ?>
                            <h5>Thumb Text Width</h5>
                            <?php add_simple_field('thumbs_text_w') ?>
                            <h5>Thumb Text Height</h5>
                            <?php add_simple_field('thumbs_text_h') ?>
                            <h5>Thumb Text Title Color</h5>
                            <?php add_cp_field('thumbs_text_title_c') ?>
                            <h5>Thumb Text X</h5>
                            <?php add_simple_field('thumbs_text_x') ?>
                            <h5>Thumb Text Y</h5>
                            <?php add_simple_field('thumbs_text_y') ?>

                            <div class="preview-component-con">
                                <div class="preview-component">
                                    <div class="preview-thumb" style="position:relative;">
                                        <div class="preview-thumb-bg" style="background-color:#333; width:275px; height:70px; margin-bottom:0px;">
                                        </div>
                                        <div class="preview-thumb-text" style="position:absolute; top:5px; left:70px; width:200px; color:#fff; font-family: Arial, Helvetica, sans-serif;">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
                                        </div>
                                        <div class="preview-thumb-pic" style="background:#fff; width:50px; height:50px; position:absolute; top:10px; left:10px;">
                                        </div>
                                    </div>
                                    <div class="preview-thumb" style="position:relative;">
                                        <div class="preview-thumb-bg" style="background:#333; width:275px; height:70px; margin-bottom:0px;">
                                        </div>
                                        <div class="preview-thumb-text" style="position:absolute; top:5px; left:70px; width:200px; color:#fff; font-family: Arial, Helvetica, sans-serif;">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
                                        </div>
                                        <div class="preview-thumb-pic" style="background:#fff; width:50px; height:50px; position:absolute; top:10px; left:10px;">
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>



                    <div class="toggle">
                        <div class="toggle-title"><h3>Play / Stop Buttons</h3><div class="arrow-down"></div></div>

                        <div class="toggle-content" style="display:none">

                            <h5>Position X</h5>
                            <?php add_simple_field('pp_x') ?>
                            <h5>Position Y</h5>
                            <?php add_simple_field('pp_y') ?>
                            <h5>Background</h5>
                            <?php add_cp_field('pp_bg') ?>

                        </div>
                    </div>



                    <div class="toggle">
                        <div class="toggle-title"><h3>Scrub Bar</h3><div class="arrow-down"></div></div>

                        <div class="toggle-content" style="display:none">

                            <h5>Position X</h5>
                            <?php add_simple_field('scr_x') ?>
                            <h5>Position Y</h5>
                            <?php add_simple_field('scr_y') ?>
                            <h5>Width</h5>
                            <div class="sidenote">Best to use a negative value. For example -200 means video width - 200.</div>
                            <?php add_simple_field('scr_w') ?>
                            <h5>Height</h5>
                            <?php add_simple_field('scr_h') ?>
                            <h5>Background Static</h5>
                            <?php add_cp_field('scr_bg') ?>
                            <h5>Background Loaded</h5>
                            <?php add_cp_field('scrl_bg') ?>
                            <h5>Background Progress</h5>
                            <?php add_cp_field('scrp_bg') ?>

                        </div>
                    </div>


                    <div class="toggle">
                        <div class="toggle-title"><h3>Volume Button</h3><div class="arrow-down"></div></div>

                        <div class="toggle-content" style="display:none">

                            <h5>Position X</h5>
                            <?php add_simple_field('vol_x') ?>
                            <h5>Position Y</h5>
                            <?php add_simple_field('vol_y') ?>
                            <h5>Background</h5>
                            <?php add_cp_field('vol_bg') ?>

                        </div>
                    </div>


                    <div class="toggle">
                        <div class="toggle-title"><h3>Fullscreen Button</h3><div class="arrow-down"></div></div>

                        <div class="toggle-content" style="display:none">

                            <h5>Position X</h5>
                            <?php add_simple_field('full_x') ?>
                            <h5>Position Y</h5>
                            <?php add_simple_field('full_y') ?>
                            <h5>Background</h5>
                            <?php add_cp_field('full_bg') ?>

                        </div>
                    </div>


                    <div class="toggle">
                        <div class="toggle-title"><h3>General Settings</h3><div class="arrow-down"></div></div>

                        <div class="toggle-content" style="display:none">
                            <h5>Player Background</h5>
                            <?php add_cp_field('settings_bg') ?>
                            <h5>Controls Background</h5>
                            <?php add_cp_field('settings_controls_bg') ?>

                            <h5>Controls Background Height</h5>
                            <?php add_simple_field('settings_controls_bg_h') ?>
                            <h5>Video Does Not Overlay Controls?</h5>
                            <?php add_cb_field('settings_does_not_overlay_controls') ?>
                            <h5>Disable Video Description?</h5>
                            <?php add_cb_field('settings_disable_description') ?>
                            <h5>Fade Controls On Mouse Leave ?</h5>
                            <?php add_cb_field('settings_fade_on_leave') ?>

                        </div>
                    </div>







                </div>
                <div class="preview_block">
                    <div>
                        <h2>Preview</h2>
                        <div class="preview-all-con">
                            <div class="preview-all">
                                <div>
                                    <div class="preview-player">
                                        <div class="player_bg" style="background-color: #555;"></div>
                                        <div class="controls_bg" style="background-color: #000; height:28px;"></div>
                                        <div class="pp" style="border-color: transparent #fff; bottom:8px; left:16px;"></div>
                                        <div class="scr_bg" style="background-color: #fff; width:226px; height:6px;  bottom:11px; left:55px;"></div>
                                        <div class="scrl_bg" style="background-color: #eee; width:126px; height:6px;  bottom:11px; left:55px; "></div>
                                        <div class="scrp_bg" style="background-color: #0099ff; width:63px; height:6px;  bottom:11px; left:55px; "></div>
                                        <div class="vol" style="background-color: #fff; bottom:10px; right:38px;"></div>
                                        <div class="full" style="background-color: #fff; bottom:10px; right:10px;"></div>
                                    </div>
                                    <div class="preview-thumbs">
                                        <div class="preview-thumb" style="position:relative;">
                                            <div class="preview-thumb-bg" style="background-color:#333; width:275px; height:70px; margin-bottom:0px;">
                                            </div>
                                            <div class="preview-thumb-text" style="position:absolute; top:5px; left:70px; width:200px; color:#fff; font-family: Arial, Helvetica, sans-serif;">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
                                            </div>
                                            <div class="preview-thumb-pic" style="background:#fff; width:50px; height:50px; position:absolute; top:10px; left:10px;">
                                            </div>
                                        </div>
                                        <div class="preview-thumb" style="position:relative;">
                                            <div class="preview-thumb-bg" style="background:#333; width:275px; height:70px; margin-bottom:0px;">
                                            </div>
                                            <div class="preview-thumb-text" style="position:absolute; top:5px; left:70px; width:200px; color:#fff; font-family: Arial, Helvetica, sans-serif;">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
                                            </div>
                                            <div class="preview-thumb-pic" style="background:#fff; width:50px; height:50px; position:absolute; top:10px; left:10px;">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <a class="preview-button primary-button" href="#">Preview</a>
                        <h2>Premade Examples</h2>
                        <img src="img/example1.png" id="example1" class="example"/>
                </div>
                <div class="clear"></div>
                
                <br/>
                <?php
                if ($config['ispreview'] == 'on') {
                    echo '<div>Because preview mode is enabled, saving is disabled. You can still preview your configuration from the Preview button in the right half.</div>';
                }
                ?>
                <a class="<?php
                if ($config['ispreview'] != 'on') {
                    echo 'save-button ';
                }
                ?> primary-button" href="#">Save</a><div class="preloader"></div>
                <div class="clear"></div><br/>
                <div class="footercomment comment"><h4>Full list of other options via gallery.xml</h4>
                
<ul>
  <li><strong>totalWidth</strong> - gallery width (in pixels)</li>
  <li><strong>totalHeight</strong></li>
  <li><strong>autoplay</strong> - autoplay the gallery</li>
  <li><strong>autoplayNextVideo</strong> - autoplay the next video when the current one ends</li>
  <li><strong>thumb</strong> - a image that you may want to showcase before the video starts ( works only if cueFirstVideo or autoplay is set to off )</li>
  <li><strong>menuPosition</strong> - the gallery menu position; can be <em>right</em>,<em>left</em>, <em>up</em>, <em>down</em> or <em>none</em> ( if you want the menu to dissapear )</li>
  <li><strong>scrollbar</strong> - can be on / off - a scrollbar that you may want to use instead of the normal no click method to scroll, useful if you have many many videos and you want the scroll to be more contralable - note: you may have to increase the html embed size too for the scrollbar to fit if you do not see it</li>
  <li><strong>youtubeFeed</strong> - choose if the videos should be taken from a YouTube channel or playlist, the next 4 settings are relevant only if youtubeFeed is set to <em>on</em></li>
  <li><strong>youtubeFeed_user</strong> - you can have a user's channel play here, you just have to enter his name ( example: digitalzoomstudio )</li>
  <li><strong>youtubeFeed_keywords</strong> - filter only the videos which have this keywords ( separated by comma )</li>
  <li><strong>youtubeFeed_playlistId</strong> - the playlist id if you want a playlist to play, this property overwrites youtubeFeed_user so you may want to leave it blank if you want the user channel to play instead</li>
  <li><strong>suggestedQuality</strong> - choose from <ul>
  <li>Quality level small: Player height is 240px, and player dimensions are at least 320px by 240px for 4:3 aspect ratio.</li>
  <li>Quality level medium: Player height is 360px, and player dimensions are 640px by 360px (for 16:9 aspect ratio) or 480px by 360px (for 4:3 aspect ratio).</li>
  <li>Quality level large: Player height is 480px, and player dimensions are 853px by 480px (for 16:9 aspect ratio) or 640px by 480px (for 4:3 aspect ratio).</li>
  <li>Quality level hd720: Player height is 720px, and player dimensions are 1280px by 720px (for 16:9 aspect ratio) or 960px by 720px (for 4:3 aspect ratio).</li>
  <li>Quality level hd1080: Player height is 1080px, and player dimensions are 1920px by 1080px (for 16:9 aspect ratio) or 1440px by 1080px (for 4:3 aspect ratio).</li>
  <li>Quality level highres: Player height is greater than 1080px, which means that the player's aspect ratio is greater than 1920px by 1080px.</li>
  <li>Quality level default: YouTube selects the appropriate playback quality. This setting effectively reverts the quality level to the default state and nullifies any previous efforts to set playback quality using the <a href="http://code.google.com/intl/ro-RO/apis/youtube/flash_api_reference.html#cueVideoById">cueVideoById</a>, <a href="http://code.google.com/intl/ro-RO/apis/youtube/flash_api_reference.html#loadVideoById">loadVideoById</a> or setPlaybackQuality functions.</li>
  </ul></li><br>
<li><strong>cueFirstVideo</strong> - if you don't want the player to start loading the videos and preserve bandwidth you can set this to <em>off</em> [ you can check example 2 where this is set to <em>off</em> ]</li>
<li><strong>shareButton</strong> - <em>on</em> or <em>off</em></li>
<li><strong>shareButtonWidth</strong> - in pixels</li>
<li><strong>shareButtonHeight</strong></li>
<li><strong>embedButton</strong> - <em>on</em> or <em>off</em></li>
<li><strong>logo</strong> - optional logo to appear in top left ( you enter here the path to it )</li>
<li><strong>logoAlpha</strong> - choose a value from 0 to 1 for yout logo opacity</li>
<li><strong>logoLink</strong> - you can have a link redirect if the user clicks the logo</li>
<li><strong>streamServer</strong> - only for RTMP playback </li>
<li><strong>htmlEmbedCode</strong> - if you have enabled the embed button you can choose a code for your visitors to embed your player - default embed code structure is already defined in the xml</li>
<li><strong>keep_logo_on_fullscreen</strong> - choose <em>on</em> or <em>off</em> if you want to keep the logo on fullscreen</li>
<li><strong>shuffleOnStart</strong> - choose if the videos should be randomised at start</li>
<li><strong>deeplinking</strong> - enable deeplinking ( on video change the link changes to this format http://currentlink.com/#2 for the second video for example)</li>
<li><strong>defaultVolume</strong> - default: -1 - choose a default volume from 0 to 1 if you want the gallery to start with that every time. The gallery has advanced implementation that retains the users last volume and plays back at the same volume even if the user has closed the page with the gallery and visits it much later - so you should leave this to it's defautl value</li>
<li><strong>scaleMode</strong> - <em>fill</em> or <em>proportional</em>, works only for local videos, rtmp, audio images, and images</li>
</ul>
<p>List of parameters for each item</p>
<ul>
  <li><strong>source - </strong>the path of the file</li>
  <li><strong>type</strong> - the type of the file -&gt; can be <em>vimeo</em> / <em>video</em> / <em>rtmp</em> / <em>image</em> / <em>audio</em> or <em>youtube</em></li>
  <li><strong>description</strong> - the description if you want it appear on video pause</li>
  <li><strong>title</strong> - the title that appears in the menu</li>
  <li><strong>menuDescription</strong> - the description that appears in the menu</li>
  <li><strong>thumb</strong> - the thumb that appears in the menu</li>
  <li><strong>audioImage</strong> - only for audio type -&gt; an optional image that shows when the music plays</li>
</ul>
</div>
            </div>
        </div>
    </body>
</html>
<?php
}