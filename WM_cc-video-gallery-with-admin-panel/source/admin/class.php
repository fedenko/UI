<?php
/*
  Plugin Name: Video YouTube Vimeo Gallery - with CMS
  Plugin URI: http://digitalzoomstudio.net/
  Description: Creates and manages video galleries.
  Version: 1.0
  Author: Digital Zoom Studio
  Author URI: http://digitalzoomstudio.net/
 */





class VideoGallery {

    public $the_path;
    public $sliders_index = 0;
    public $the_shortcode = 'wall';
    public $admin_capability = 'manage_options';
    public $dbitemsname = 'zsw_items';
    public $dboptionsname = 'zsw_options';
    public $mainitems;
    public $mainoptions;
    public $user;
    public $password;
    private $postuser;
    private $theuser;
    private $theemail;
    private $basepath;
    private $abspath;
    private $useabspath = 'on';

    function __construct() {

        require_once('config.php');
        
        $this->mainoptions = $options_array;
        $this->theemail = $this->mainoptions['user_email'];
        $this->the_path = '';
        $this->basepath = dirname(__FILE__) . '/';
        
        $aux = file_get_contents($this->basepath . 'db/location.txt');
        $this->abspath = $aux;
        if(dzs_find_string(dzs_curr_url(), 'admin.php')==true && $aux==''){
            $loc = substr(dzs_curr_url(), 0, strlen(dzs_curr_url())-9);
            
            $myFile = "db/location.txt";
            $fh = fopen($myFile, 'w') or die("can't open file");
            fwrite($fh, $loc);
            fclose($fh);
            $this->abspath = $loc;
        }
        if($this->useabspath!='on'){
            $this->abspath = '';
        }
        
        $aux = file_get_contents($this->basepath . 'db/db.txt');
        $this->mainitems = unserialize($aux);
        

        //$uploadbtnstring = '<button class="button-secondary action upload_file zs2-main-upload">Upload</button>';

            $uploadbtnstring = '<form name="upload" class="dzs-upload" action="#" method="POST" enctype="multipart/form-data">
            <input type="button" value="Upload" class="btn_upl button-secondary"/>
            <input type="file" name="file_field" class="file_field"/>
            <input type="submit" class="btn_submit"/>
    </form>';
        if($this->mainoptions['ispreview']=='on'){
           $uploadbtnstring = '<span class="uploaddisabled">Upload Disabled in Demo</span>';
        }
        
        


        $this->sliderstructure = '<div class="slider-con" style="display:none;">
        <div class="settings-con">
        <h4>General Options</h4>
        <div class="setting">
        <div class="setting-label">ID</div>
        <input type="text" class="textinput main-id type_all" name="0-settings-id" value="default"/>
        </div>
        <div class="setting">
        <div class="setting-label">Width</div>
        <input type="text" class="textinput type_all" name="0-settings-width" value="900"/>
        </div>
        <div class="setting">
        <div class="setting-label">Height</div>
        <input type="text" class="textinput type_all" name="0-settings-height" value="300"/>
        </div>
        <div class="setting">
        <div class="setting-label">Menu Position</div>
        <select class="textinput styleme type_all" name="0-settings-menuposition">
        <option>right</option>
        <option>down</option>
        <option>left</option>
        <option>up</option>
        <option>none</option>
        </select>
        </div>
        <div class="setting">
        <div class="setting-label">Autoplay</div>
        <select class="textinput styleme type_all" name="0-settings-autoplay">
        <option>on</option>
        <option>off</option>
        </select>
        </div>
        <div class="setting">
        <div class="setting-label">Thumbnail</div>
        <input class="textinput" name="0-settings-thumbnail" type="text"/>' . $uploadbtnstring . '
        </div>
        <div class="setting">
        <div class="setting-label">Scrollbar</div>
        <select class="textinput styleme type_all" name="0-settings-scrollbar">
        <option>off</option>
        <option>on</option>
        </select>
        </div>
        
        <h4>Skin Settings</h4>
        <div class="setting">
        <div class="setting-label">Skin</div>
        <select class="textinput styleme type_all" name="0-settings-skin">
        <option>complete</option>
        <option>light</option>
        <option>rouge</option>
        <option>complete_allchars</option>
        </select>
        </div>
        <div class="setting">
        <div class="setting-label">Window Mode</div>
        <select class="textinput styleme type_all" name="0-settings-windowmode">
        <option>opaque</option>
        <option>transparent</option>
        </select>
        </div>
        <!--
        <div class="setting">
        <div class="setting-label">Display Mode</div>
        <select class="textinput styleme type_all" name="0-settings-displaymode">
        <option>normal</option>
        <option>wall</option>
        </select>
        </div>
        -->
        <div class="setting">
        <div class="setting-label">Custom Design Mode</div>
        <div class="sidenote">You can modify the design via the Design Generator</div>
        <select class="textinput styleme type_all" name="0-settings-designgenerator">
        <option>off</option>
        <option>on</option>
        </select>
        </div>
        <div class="setting">
        <div class="setting-label">Disable Description</div>
        <div class="sidenote">Disable the descriptions that appears on top of the video..</div>
        <select class="textinput styleme type_all" name="0-settings-disabledescription">
        <option>off</option>
        <option>on</option>
        </select>
        </div>
        
        <h4>Vimeo Feed Options</h4>
        <div class="setting">
        <div class="setting-label">Enable ?</div>
        <select class="textinput styleme type_all" name="0-settings-vimeofeed">
        <option>off</option>
        <option>on</option>
        </select>
        </div>
        <div class="setting">
        <div class="setting-label">User</div>
        <input type="text" class="textinput type_all" name="0-settings-vimeofeed_user" value=""/>
        </div>
        
        <h4>YouTube Feed Options</h4>
        <div class="setting">
        <div class="setting-label">Enable ?</div>
        <select class="textinput styleme type_all" name="0-settings-youtubefeed">
        <option>off</option>
        <option>on</option>
        </select>
        </div>
        <div class="setting">
        <div class="setting-label">User</div>
        <input type="text" class="textinput type_all" name="0-settings-youtubefeed_user" value=""/>
        </div>
        <div class="setting">
        <div class="setting-label">Playlist</div>
        <div class="sidenote">If you have an YouTube playlist and want to render it into the gallery you just enter its id
        here for example for this playlist http://www.youtube.com/playlist?list=PL<strong>16AD38D1667DC744</strong>&feature=viewall
        , the id is the bolded part -> 16AD38D1667DC744<br/>
        If this field is not null, it will overwrite the User field ( so if you have a playlist id, the user field does not matter ) .</div>
        <input type="text" class="textinput type_all" name="0-settings-youtubefeed_playlist" value=""/>
        </div>
        <div class="setting">
        <div class="setting-label">Max Videos</div>
        <input type="text" class="textinput type_all" name="0-settings-youtubefeed_maxvideos" value="100"/>
        </div>
        
        <h4>YouTube Options</h4>
        <div class="setting">
        <div class="setting-label">Suggested Quality</div>
        <input type="text" class="textinput" name="0-settings-suggestedquality" value="hd720"/>
        </div>
        
        <h4>Other Options</h4>
        <div class="setting">
        <div class="setting-label">Default Volume</div>
        <input type="text" class="textinput" name="0-settings-defaultvolume" value=""/>
        </div>
        <div class="setting">
        <div class="setting-label">Menu Scroll Time</div>
        <input type="text" class="textinput" name="0-settings-menuscrolltime" value="0.3"/>
        </div>
        <div class="setting">
        <div class="setting-label">Enable Embed Button</div>
        <div class="sidenote">Allow your visitors to embed your video gallery on their site</div>
        <select class="textinput styleme type_all" name="0-settings-embedbutton">
        <option>off</option>
        <option>on</option>
        </select>
        </div>
        </div><!--end settings con-->
        <div class="master-items-con">
        <div class="items-con"></div>
        <a href="#" class="add-item"></a>
        </div><!--end master-items-con-->
        </div>';
        $this->itemstructure = '<div class="item-con">
            <div class="item-delete">x</div>
            <div class="item-duplicate"></div>
        <div class="item-preview" style="background-image:url(' . $this->abspath . 'img/defaultthumb.png)">
        </div>
        <div class="item-settings-con">
        <div class="setting">
        <div class="setting-label">Source</div>
        <textarea class="textinput main-source type_all" name="0-0-source" style="width:160px; height:23px;">' . $this->abspath . 'img/defaultthumb.png</textarea>' . $uploadbtnstring . '
        </div>
        <div class="setting">
        <div class="setting-label">Thumbnail</div>
        <input class="textinput upload-prev main-thumb sec-thumb" name="0-0-thethumb" style="width:160px; height:23px;" value="' . $this->abspath . 'img/defaultthumb.png"/>' . $uploadbtnstring . '
        </div>
        <div class="setting">
        <div class="setting-label">Type:</div>
        <select class="textinput item-type styleme type_all" name="0-0-type">
        <option>youtube</option>
        <option>video</option>
        <option>vimeo</option>
        <option>audio</option>
        <option>image</option>
        <option>link</option>
        </select>
        </div>
        <h4>Description</h4>
        <div class="setting">
        <div class="setting-label">Title:</div>
        <input type="text" class="textinput" name="0-0-title"/>
        </div>
        <div class="setting">
        <div class="setting-label">Description:</div>
        <input type="text" class="textinput" name="0-0-description"/>
        </div>
        </div><!--end item-settings-con-->
        </div>';

        //print_r($_COOKIE);
    }
    public function admin_init(){
        $this->postuser = '';
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
            $this->postuser = $_POST['user'];
        }
        if (isset($_POST['password'])) {
            $postpass = $_POST['password'];
        }
        if(isset ($_POST['action']) && $_POST['action'] == 'phpyg_ajax'){
            $this->ajax_save_data();
        }

        $args = array();
        if ($cookieuser != '') {
            $this->theuser = $cookieuser;
            $this->admin_menu();
            return;
        }
        if ($this->postuser == $this->mainoptions['user']) {
            if ($postpass == $this->mainoptions['password']) {
                $this->theuser = $this->postuser;
                $this->admin_menu();
                return;
            } else {
                $args['warning'] = ('Password not correct...');
                $this->admin_login_screen($args);
                return;
            }
        } else {
            if ($postuser != '') {
                $args['warning'] = ('Username not correct...');
            }
            $this->admin_login_screen($args);
            return;
        }
    }
    function ajax_save_data(){
        
        $auxarray = array();
        $mainarray=array();
        parse_str($_POST['postdata'], $auxarray);
        foreach($auxarray as $label => $value){
            //echo $auxarray[$label];
            $aux = explode('-', $label);
            $mainarray[$aux[0]][$aux[1]][$aux[2]] = $auxarray[$label];
        }
        $mainarraystr = serialize($mainarray);
        //print_r($mainarraystr);
        $myFile = "db/db.txt";
        $fh = fopen($myFile, 'w') or die("can't open file");
        fwrite($fh, $mainarraystr);
        fclose($fh);
        die();
    }
    function admin_login_screen($args) {
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
                <div class="userwarning">Default Login: admin, thepassword<br/>
                Please change these on purchase from the config file</div>
                <div class="login-form">
                    <form action="admin.php" method="POST" class="login">
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
                <div class="warning"><?php echo $args['warning']; ?></div>
            </body>
        </html>

        <?php
    }

    function admin_menu() {
        if($this->theuser!=''){
                if(isset ($_POST['remember_me']) && $_POST['remember_me']=='on'){
                    setcookie("cookie_user", $this->theuser, time()+12000);
                }else{
                    setcookie("cookie_user", $this->theuser, time()+3600);
                }
        }
        //print_r($_COOKIE);
        ?>
        <!DOCTYPE HTML>
        <html>
            <head>
                <title>DZS Video Gallery Admin</title>
                <meta charset="UTF-8"/>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js"></script>
                <link rel="stylesheet" type="text/css" href="css/reset.css">
                <link rel="stylesheet" type="text/css" href="css/admin.css">
                <script src="admin.js"></script>
                
		<link type="text/css" href="jqueryui/ui-lightness/jquery-ui-1.8.16.custom.css" rel="stylesheet" />
		<script type="text/javascript" src="jqueryui/jquery-ui-1.8.16.custom.min.js"></script>
                
                <link rel="stylesheet" type="text/css" href="dzsuploader/upload.css">
                <script src="dzsuploader/upload.js"></script>
                <script src="dzsuploader/jquery.form.js"></script>
                
                <link rel="stylesheet" type="text/css" href="prettyphoto/prettyphoto.css">
                <script src="prettyphoto/prettyphoto.js"></script>
                <!--[if IE 8]>
<script type="text/javascript" src="https://getfirebug.com/firebug-lite-debug.js"></script>
<![endif]-->
            </head>

            <body class='adminpage'>
                <div class="container">
                <div class="admin-bar">
                    <div class="user-welcome">
                        <?php
                        $email = $this->theemail;
                        $default = "http://dummyimage.com/20x20/fff/999.png";
                        $size = 20;
                        $grav_url = "http://www.gravatar.com/avatar/" . md5( strtolower( trim( $email ) ) ) . "?d=" . urlencode( $default ) . "&s=" . $size;
                        echo '<img src="'.$grav_url.'" class="gravatar" alt="" />';
                        ?>
                        <span class="hello-user">Hello, <span class="the-user"><?php echo $this->theuser; ?></span></span>
                    </div>
                    <div class="align-right">
                        <div class="import-export-db-con">
            <div class="the-toggle">Settings</div>
            <div class="the-content-mask" style="display:none;">
                <div class="arrow-up"></div>
            <div class="the-content">
                <h3>Export Database</h3>
        <form action="" method="POST"><input type="submit" name="zs1_export" value="Export"/></form>
                <h3>Import Database</h3>
        <form enctype="multipart/form-data" action="" method="POST">
<input type="hidden" name="MAX_FILE_SIZE" value="100000" />
File Location: <input name="dzs_uploadfile" type="file" /><br />
<input type="submit" name="zs1_uploadfile_confirm" value="Import" />
</form>
        </div>
        </div>
            </div>
                    <form action="" method="POST" class="logout">
                            <input type="submit" class="button-logout" value="Log Out" tabindex="4" name="action_logout">
                    </form>
                    </div>
                </div>
                    <div class="admin-content">
                        <noscript>You need Javascript enabled to see the admin panel.</noscript>
    <div class="wrap">
        <h2>DZS Video Gallery Admin   <img alt="" style="visibility: visible;" id="main-ajax-loading" src="img/wpspin_light.gif"></h2>
        
        <a href="<?php echo $this->abspath ?>deploy/designer/index.php" target="_blank" class="button-secondary action">Go to Designer Center</a>
        <br />
        <br />

        <table cellspacing="0" class="wp-list-table widefat dzs_admin_table main_sliders"> 
            <thead> 
            <tr> 
            <th style="" class="manage-column column-name" id="name" scope="col">ID</th>
            <th class="column-edit">Edit</th> 
            <th class="column-edit">Duplicate</th> 
            <th class="column-edit">Delete</th> 
            </tr> 
            </thead> 
            <tbody>
            </tbody>
    </table>

        <br />
    <a class="button-secondary add-slider">Add Slider</a>
    <form class="master-settings">
    </form>
    <div class="dzsuploader dzs-multi-upload">
<p>
	<input id="files-upload" class="multi-uploader" name="file_field" type="file" multiple>
</p>
<br/>
<div class="sidenote">Max Upload Size: <?php echo ini_get('post_max_size'); ?></div>
<div class="droparea">
	<div class="instructions">drag & drop files here</div>
</div>
<div class="upload-list-title">The Preupload List</div>
<ul class="upload-list">
	<li class="dummy">add files here from the button or drag them above</li>
</ul>
<button class="primary-button upload-button">Confirm Upload</button>
</div>
    <a href="#" class="button-primary master-save">Save Changes</a> <img alt="" style="position:fixed; bottom:31px; right:125px; visibility: hidden;" id="save-ajax-loading" src="img/wpspin_light.gif"/>
    
</div>
<script>
        <?php 
        //$this->abspath = '';
        //$jsnewline = '\\' + "\n";
	echo "window.dzs_upload_path = '".$this->abspath."dzsuploader/upload/';
            ";
        echo "window.dzs_php_loc = '".$this->abspath."dzsuploader/upload.php';
            ";
        echo "window.dzs_admin_loc = '".$this->abspath."';
            ";
        $aux = str_replace(array("\r", "\r\n", "\n"), '', $this->sliderstructure);
        echo "var sliderstructure = '".$aux."';
";
        $aux = str_replace(array("\r", "\r\n", "\n"), '', $this->itemstructure);
        echo "var itemstructure = '".$aux."';
";
        ?>
        jQuery(document).ready(function($){
        sliders_ready();
        <?php
        $items = $this->mainitems;
        for($i=0;$i<count($items);$i++){
            echo "sliders_addslider(); 
";
        }
        if(count($items)>0)
            echo 'sliders_showslider(0);
';
        for($i=0;$i<count($items);$i++){
            
        for($j=0;$j<count($items[$i])-1;$j++){
            echo "sliders_additem(".$i."); 
";
        }
        foreach($items[$i] as $label => $value){
            if($label==='settings'){
                
                foreach($items[$i][$label] as $sublabel => $subvalue){
                    
                    $subvalue=stripslashes($subvalue);
                $subvalue = str_replace(array("\r", "\r\n", "\n", '\\', "\\"), '', $subvalue);
                echo 'sliders_change('.$i.', "settings", "'.$sublabel.'", '."'".$subvalue."'".'); 
';
                }
            }else{
                
                foreach($items[$i][$label] as $sublabel => $subvalue){
                    $subvalue=stripslashes($subvalue);
                $subvalue = str_replace(array("\r", "\r\n", "\n", '\\', "\\"), '', $subvalue);
                echo 'sliders_change('.$i.', '.$label.', "'.$sublabel.'", '."'".$subvalue."'".'); 
';
                }
                
            }
        }
        }
        ?>
        jQuery('#main-ajax-loading').css('visibility', 'hidden');
        $("a[rel^='prettyPhoto']").prettyPhoto();
});     
        </script>
                    </div>
                </div>
                <div id="embedcode" style="display:none;">
		<p>This is inline content opened in prettyPhoto.</p>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>
	</div>
        <div class="saveconfirmer">
            Changes have been saved.
        </div>
            </body>
        </html>
        <?php
    }
    function front_show_gallery($id){
        $fout='';
        $this->sliders_index++;
        $fullscreen='off';

        if ($this->mainitems == ''){
            return;
        }
        
        //echo $id;
        $i = 0;
        $k = 0;

        for ($i = 0; $i < count($this->mainitems); $i++) {
            if ((isset($id)) && ($id == $this->mainitems[$i]['settings']['id']))
                $k = $i;
        }
        $its = $this->mainitems[$k];
        
        
        
        

    $user_feed = '';
    $yt_playlist_feed = '';
    
    if($its['settings']['youtubefeed']=='on' && $its['settings']['youtubefeed_user']!=''){
        $user_feed = $its['settings']['youtubefeed_user'];
        if($its['settings']['youtubefeed_playlist']=='')
        $its['settings']['youtubefeed']='off';
    }
    if($its['settings']['youtubefeed']=='on' && $its['settings']['youtubefeed_playlist']!=''){
        $yt_playlist_feed = $its['settings']['youtubefeed_playlist'];
        $its['settings']['youtubefeed']='on';
        $user_feed='';
    }
    
    $skin = 'deploy/preview.swf';
    if ($its['settings']['skin'] == 'light'){
        $skin = "deploy/preview_skin_overlay.swf";
    }
    if ($its['settings']['skin'] == 'rouge'){
        $skin = "deploy/preview_skin_rouge.swf";
    }
    if ($its['settings']['skin'] == 'complete_allchars'){
        $skin = "deploy/preview_allchars.swf";
    }
    if($its['settings']['designgenerator']=='on'){
        $skin = 'deploy/preview.swf';
    }
    $swfloc = $this->abspath . $skin;
    $wmode = 'opaque';
    $wmode = $its['settings']['windowmode'];
    $fout.='<object type="application/x-shockwave-flash" data="'.$swfloc.'" width="'.$its['settings']['width'].'" height="'.$its['settings']['height'].'" id="flashcontent'.$this->sliders_index.'" style="visibility: visible;">
<param name="movie" value="'.$swfloc.'"><param name="menu" value="false"><param name="allowScriptAccess" value="always">
<param name="scale" value="noscale"><param name="allowFullScreen" value="true"><param name="wmode" value="'.$wmode.'">
<param name="flashvars" value="';
    //print_r($its[$k]);
    
    //..youtube user feed..
    if($user_feed!=''){
        for($i=0;$i<count($its)-1;$i++){
            unset($its[$i]);
        }
        $target_file ="http://gdata.youtube.com/feeds/api/users/".$user_feed."/uploads?v=2&alt=jsonc";
        //echo $target_file;
        $ida = dzs_get_contents($target_file);
        $idar = json_decode($ida);
        //print_r($idar);
        //print_r(count($idar->data->items));
        $i=0;
        if($its['settings']['youtubefeed_maxvideos']=='') $its['settings']['youtubefeed_maxvideos']=100;
        $yf_maxi = $its['settings']['youtubefeed_maxvideos'];
        
        foreach ($idar->data->items as $ytitem){
            //print_r($ytitem);
            $its[$i]['source'] = $ytitem->id;
            $its[$i]['thethumb'] = "";
            $its[$i]['type'] = "youtube";

            $aux = $ytitem->title;
            $lb   = array('"' ,"\r\n", "\n", "\r", "&" ,"-", "`", '�', "'", '-');
            $aux = str_replace($lb, ' ', $aux);
            $its[$i]['title'] = $aux;

            $aux = $ytitem->description;
            $lb   = array('"' ,"\r\n", "\n", "\r", "&" ,"-", "`", '�', "'", '-');
            $aux = str_replace($lb, ' ', $aux);
            $its[$i]['description'] = $aux;

            $i++;
            if($i>$yf_maxi+1)
                break;
        }
        
            $its[$i]['source'] = " ";
            $its[$i]['thethumb'] = " ";
            //$its[$i]['type'] = " ";
    }
    
    
    //http://vimeo.com/api/v2/blakewhitman/videos.json
    if(isset($its['settings']['vimeofeed']) && $its['settings']['vimeofeed']=='on'){
        for($i=0;$i<count($its)-1;$i++){
            unset($its[$i]);
        }
        $target_file ="http://vimeo.com/api/v2/".$its['settings']['vimeofeed_user']."/videos.json";
        $ida = dzs_get_contents($target_file);
        $idar = json_decode($ida);
        $i=0;
        foreach ($idar as $item){
            $its[$i]['source'] = $item->id;
            $its[$i]['thethumb'] = $item->thumbnail_small;
            $its[$i]['type'] = "vimeo";
            
            $aux = $item->title;
            $lb   = array('"' ,"\r\n", "\n", "\r", "&" ,"-", "`", '�', "'", '-');
            $aux = str_replace($lb, ' ', $aux);
            $its[$i]['title'] = $aux;

            $aux = $item->description;
            $lb   = array('"' ,"\r\n", "\n", "\r", "&" ,"-", "`", '�', "'", '-');
            $aux = str_replace($lb, ' ', $aux);
            $its[$i]['description'] = $aux;
            $i++;
        }
    }
    if($its['settings']['youtubefeed']=='on' && $its['settings']['youtubefeed_playlist']!=''){
        
        for($i=0;$i<count($its)-1;$i++){
            unset($its[$i]);
        }
        $target_file ="http://gdata.youtube.com/feeds/api/playlists/".$yt_playlist_feed."?alt=json&start-index=1&max-results=40";
        $ida = dzs_get_contents($target_file);
        $idar = json_decode($ida);
        //print_r(count($idar->data->items));
        $i=0;
        if($its['settings']['youtubefeed_maxvideos']=='') {
            $its['settings']['youtubefeed_maxvideos']=100;
        }
        $yf_maxi = $its['settings']['youtubefeed_maxvideos'];
        
        foreach ($idar->feed->entry as $ytitem){
            $aux = array();
            parse_str($ytitem->link[0]->href, $aux);
            //print_r($aux['http://www_youtube_com/watch?v']);
        
            $its[$i]['source'] = $aux['http://www_youtube_com/watch?v'];
            $its[$i]['thethumb'] = "";
            $its[$i]['type'] = "youtube";
            
            //print_r($ytitem);
            $aux2 = get_object_vars($ytitem->title);
            $aux = ($aux2['$t']);
            $lb   = array("\r\n", "\n", "\r", "&" ,"-", "`", '�', "'", '-');
            $aux = str_replace($lb, ' ', $aux);

            /*
            $aux = $ytitem->description;
            $lb   = array("\r\n", "\n", "\r", "&" ,"-", "`", '�', "'", '-');
            $aux = str_replace($lb, ' ', $aux);
            $its['settings']['description'] = $aux;
            */
            $i++;
            if($i>$yf_maxi)
                break;
        }
        
    }
    
    $videos='';
    $thumbs='';
    $titles='';
    $descriptions='';
    $types='';
    for($i=0;$i<count($its)-1;$i++){
        $videos .= $its[$i]['source'];
        if($i != count($its) - 2){
            $videos.=';';
        }
        
        if($its[$i]['thethumb']=='' && $its[$i]['type']=='vimeo'){
            $imgid = $its[$i]['source'];
            $url = "http://vimeo.com/api/v2/video/$imgid.php";
            $cache = dzs_get_contents($url);
            $imga = unserialize($cache);
            $img = ($imga[0]['thumbnail_small']);
            $its[$i]['thethumb']=$img;
        }
        $thumbs .= $its[$i]['thethumb'];
        
        if($i != count($its) - 2){
            $thumbs.=';';
        }
        
        
        
        $types .= $its[$i]['type'];
        if($i != count($its) - 2){
            $types.=';';
        }
        $titles .= $its[$i]['title'];
        if($i != count($its) - 2){
            $titles.=';';
        }
        $descriptions .= $its[$i]['description'];
        if($i != count($its) - 2){
            $descriptions.=';';
        }
    }
    //echo 'ceva';
    //echo $videos;
    //print_r($its);
    
    
    
    $iosbackup='';
    
    $iosbackup.='
<div id="ios-vg' . $this->sliders_index . '" class="ios-vg" style="width:' . $its['settings']['width'] . 'px; height:' . $its['settings']['height'] . 'px;">';
    
    
    $iosbackup.='
<ul class="videos">';
$vw = ($its['settings']['width'] - 200);
if($its['settings']['menuposition']=='none'){
    $vw = $its['settings']['width'];
    $iosbackup.='<style>#ios-vg' . $this->sliders_index . ' .videos-menu{ display:none; }</style>';
}

for ($i = 0; $i < count($its) - 1; $i++) {
        if ($its[$i]['type'] == "video")
            $iosbackup.='<li style="width:' . ($vw) . 'px; height:' . ($its['settings']['height']) . 'px;"><video width="' . ($vw) . '" height="' . $its['settings']['height'] . '" controls="" webkit-playsinline><source src="' . $its[$i]['source'] . '" /></video></li>';
        if ($its[$i]['type'] == "youtube")
            $iosbackup.='<li style="width:' . ($vw) . 'px; height:' . ($its['settings']['height']) . 'px;"><iframe width="' . ($vw) . '" height="' . $its['settings']['height'] . '" src="http://www.youtube.com/embed/' . $its[$i]['source'] . '" frameborder="0" allowfullscreen></iframe></li>';
        if ($its[$i]['type'] == "vimeo")
            $iosbackup.='<li style="width:' . ($vw) . 'px; height:' . ($its['settings']['height']) . 'px;"><iframe src="http://player.vimeo.com/video/' . $its[$i]['source'] . '?portrait=0&amp;color=ffffff" width="' . ($vw) . '" height="' . ($its['settings']['height']) . '" frameborder="0"></iframe></li>';
        if ($its[$i]['type'] == "audio")
            $iosbackup.='<li style="width:' . ($vw) . 'px; height:' . ($its['settings']['height']) . 'px;"><audio width="' . ($vw) . '" height="' . $its['settings']['height'] . '" src="' . $its[$i]['source'] . '"></audio></li>';
        if ($its[$i]['type'] == "image")
            $iosbackup.='<li style="width:' . ($vw) . 'px; height:' . ($its['settings']['height']) . 'px;"><img width="' . ($vw) . '" height="' . $its['settings']['height'] . '" src="' . $its[$i]['source'] . '"/></li>';
        if ($its[$i]['type'] == "inline")
            $iosbackup.=$its[$i]['source'];
}

    
    $iosbackup.='</ul>';
    
    
    $iosbackup.='<ul class="videos-menu">';
    for ($i = 0; $i < count($its) - 1; $i++) {
        $iosbackup.='<li';
        if($i==1) $iosbackup.=' class="selected"';
        $iosbackup.='><img class="the-thumb" src="' . $its[$i]['thethumb'] . '"><div class="the-title">' . $its[$i]['title'] . '</div><div class="the-content">' . $its['settings']['description'] . '</div></li>';
    }
    $iosbackup.='</ul>';
    
    
    $iosbackup.='</div>';
    $iosbackup.='<script>
	jQuery(document).ready(function($){
        if(is_ios()==true){
        $("#ios-vg' . $this->sliders_index . '").iosgallery();
            }
	})
        </script>';
    //echo $this->abspath;
    $fout.=dzs_addSwfAttr('video', $videos, true);
    $fout.=dzs_addSwfAttr('totalWidth', $its['settings']['width']);
    $fout.=dzs_addSwfAttr('totalHeight', $its['settings']['height']);
    $fout.=dzs_addSwfAttr('thumbs', $thumbs);
    $fout.=dzs_addSwfAttr('types', $types);
    $fout.=dzs_addSwfAttr('titles', $titles);
    $fout.=dzs_addSwfAttr('menuDescriptions', $descriptions);
    $fout.=dzs_addSwfAttr('menuPosition', $its['settings']['menuposition']);
    $fout.=dzs_addSwfAttr('autoplay', $its['settings']['autoplay']);
    
        $fout.=dzs_addSwfAttr('shareButton', "on");
        $fout.=dzs_addSwfAttr('shareIcons', $this->abspath . 'img/twitter.png;' . $this->abspath . 'img/facebook.png');
        $fout.=dzs_addSwfAttr('shareTooltips', "Tweet It;Share on Facebook");
        $fout.=dzs_addSwfAttr('shareLinks', "http://twitter.com/sharecr63urlcr61".dzs_curr_url()."cr38textcr61Awesome%20VideoGallery;http://www.facebook.com/sharer.phpcr63ucr61".dzs_curr_url()."cr38tcr61Awesome%20VideoGallery");
    if($its['settings']['embedbutton']=='on'){
        $fout.=dzs_addSwfAttr('embedButton', "on");
        $fout.=dzs_addSwfAttr('htmlEmbedCode', "cr60iframe src=cr34".$this->abspath . 'bridge.phpcr63actioncr61viewcr38idcr61'.$its['settings']['id']."cr34 width=cr34".$its['settings']['width']."cr34 height=cr34".$its['settings']['height']."cr34 style=cr34overflow:hidden;cr34 cr62cr60/iframecr62");
    }
    if (isset($its['settings']['thumbnail']) && $its['settings']['thumbnail'] != '') {
        $fout.=dzs_addSwfAttr('cueFirstVideo', "off");
	$fout.=dzs_addSwfAttr('thumb', $its['settings']['thumbnail']);
    }
    if($its['settings']['designgenerator']=='on'){
	$fout.=dzs_addSwfAttr('designXML', $this->abspath . 'deploy/xml/design.xml');
    }
    
    
    $fout.='">';
    $fout.=$iosbackup.'</object>';
     
    /*
    
    if($zs1_ispreview=='on' && $this->sliders_index<2){
        if(isset ($_GET['opt1']))
            $its['settings']['width'] = $_GET['opt1'];
        if(isset ($_GET['opt2']))
            $its['settings']['height'] = $_GET['opt2'];
        if(isset ($_GET['opt3']))
            $its['settings']['menuposition'] = $_GET['opt3'];
        if(isset ($_GET['opt4']))
            $its['settings'][4] = $_GET['opt4'];
        if(isset ($_GET['opt5']))
            $its['settings']['youtubefeed'] = $_GET['opt5'];
        if(isset ($_GET['opt6']))
            $its['settings']['youtubefeed_user'] = $_GET['opt6'];
    }
    

    
    
    
    
    //if(isset($its['settings'][14])&& $its['settings'][14]!='')
    if($its['settings'][13]=='wall'){
        
        $fout.='<style>
            .dzs-gallery-container .item{ width:23%; margin-right:1%; float:left; position:relative; }
            .dzs-gallery-container .item-image{ width:100%; }
            .dzs-gallery-container h4{  color:#D26; }
            .dzs-gallery-container h4:hover{ background: #D26; color:#fff; }
            .clear { clear:both; }
            </style>';
        $fout.='<div class="dzs-gallery-container">';
        
        for ($i = 1; $i < count($its) - 1; $i++) {
            $fout.='<div class="item">';
            $fout.='<a href="'.$zs1_path.'ajax.php?height='.$its['settings']['height'].'&width='.$its['settings']['width'].'&type='.$its[$i]['type'].'&source='.$its[$i]['source'].'" title="'.$its[$i]['type'].'" class="thickbox"><img class="item-image" src="';
            if($its[$i]['thethumb']!='')
                $fout.=$its[$i]['thethumb'];
            else{
                if($its[$i]['type']=="youtube"){
                  $fout.='http://img.youtube.com/vi/'.$its[$i]['source'].'/0.jpg';
                  $its[$i]['thethumb']='http://img.youtube.com/vi/'.$its[$i]['source'].'/0.jpg';
                }
            }
            $fout.='"/></a>';
            $fout.='<h4>'.$its[$i]['type'].'/<h4>';
            $fout.='</div>';
        }
        $fout.='<div class="clear"></div>';
        $fout.='</div>';
        $fout.='<div class="clear"></div>';
        $fout.='<script>
            jQuery(".dzs-gallery-container").masonry({
  itemSelector: ".item"
});</script>';
    }else{

    $fout = '<script type="text/javascript">';


    //VIDEOS
    $fout.="var fv1='";

    

    for ($i = 1; $i < count($its) - 1; $i++) {
        $fout.=$its[$i]['source'];

        if ($i < count($its) - 2)
            $fout.=';';
    }

    //TYPES
    $fout.="';
	var fv2='";

    //TYPES
    for ($i = 1; $i < count($its) - 1; $i++) {
        $fout.=$its[$i]['type'];
        if ($i < count($its) - 2)
            $fout.=';';
    }

    //THUMBS
    $sw1 = false;
    for ($i = 1; $i < count($its) - 1; $i++)
        if ($its[$i]['thethumb'] != '')
            $sw1 = true;

    $fout.="';
	var fv3='";




        for ($i = 1; $i < count($its) - 1; $i++) {
            $sw=false;
            $fout.=$its[$i]['thethumb'];
            if($its[$i]['thethumb']!='')
                $sw=true;
            if ($its[$i]['thethumb'] == '' && $its[$i]['type'] == 'vimeo') {
                
                
            }
            if ($its[$i]['thethumb'] == '' && $its[$i]['type'] == 'youtube') {
                $imgid = $its[$i]['source'];
                //$fout.="http://img.youtube.com/vi/".$imgid."/2.jpg";
                $its[$i]['thethumb']='http://img.youtube.com/vi/'.$its[$i]['source'].'/0.jpg';

                $sw=true;
            }

            if ($i < count($its) - 2 && $sw==true)
                $fout.=';';
        }
    




    //TITLES
    $sw1 = false;
    for ($i = 1; $i < count($its) - 1; $i++)
        if ($its[$i]['type'] != '')
            $sw1 = true;

    $fout.="';
	var fv4='";
    if ($sw1 == true) {

        for ($i = 1; $i < count($its) - 1; $i++) {
            $fout.=$its[$i]['type'];

            if ($i < count($its) - 2)
                $fout.=';';
        }
    }


    //MENU DESCRIPTIONS
    $sw1 = false;
    for ($i = 1; $i < count($its) - 1; $i++)
        if ($its['settings']['description'] != '')
            $sw1 = true;

    $fout.="';
	var fv5='";
    if ($sw1 == true) {

        for ($i = 1; $i < count($its) - 1; $i++) {
            $fout.=$its['settings']['description'];

            if ($i < count($its) - 2)
                $fout.=';';
        }
    }

    $fout.="'";
    $fout.=';
	var width = ' . $its['settings']['width'] . ';
		var height =' . $its['settings']['height'] . ';
		var flashvars = {
		totalWidth:width,
		totalHeight:height,
		autoplay:"' . $its['settings'][4] . '",
		autoplayNextVideo:"on",
		menuPosition:"' . $its['settings']['menuposition'] . '",
                youtubeFeed:"' . $its['settings']['youtubefeed'] . '",
                youtubeFeed_user:"' . $its['settings']['youtubefeed_user'] . '",
                youtubeFeed_playlistId:"' . $its['settings']['youtubefeed_playlist'] . '",
                scrollbar:"' . $its['settings'][9] . '",
		video:fv1,
		types:fv2,
		thumbs:fv3,
		titles:fv4,
		menuDescriptions:fv5';
    
    if(isset($its['settings'][14])&& $its['settings'][14]!='')
        $fout.=',
            defaultVolume:"'.$its['settings'][14].'"';
    
    if(isset($its['settings'][17])&& $its['settings'][17]!='')
        $fout.=',
            suggestedQuality:"'.$its['settings'][17].'"';
    
    if(isset($its['settings'][18])&& $its['settings'][18]=='on'){
        $fout.=',
            designXML:"'.$zs1_path.'deploy/xml/design.xml"';
        $its['settings']['skin'] = 'complete';
    }
    if(isset($its['settings'][19])&& $its['settings'][19]=='on'){
        $fout.=',
            player_design_disable_description:"on"';
    }
    if(isset($its['settings'][20])&& $its['settings'][20]=='on'){
        $fout.=',
            settings_deeplinking:"on"';
    }
    if(isset($its['settings'][21]) && $its['settings'][21]!=''){
        $fout.=',
            menu_scroll_animation_time:' . $its['settings'][21];
    }
    

    $zs1_targetswf = "deploy/preview.swf";

    //SCRIPT CONTINUE

    
    $fout.='
        };
		var params = {
			menu: "false",
			allowScriptAccess: "always",
			scale: "noscale",
			allowFullScreen: "true",
			wmode:"'.$its['settings'][12].'",
			base:' . $c_singlequote . $zs1_path . $c_singlequote . '
		};';
    if ($its['settings'][9] == 'on' && $its['settings']['menuposition'] == 'down')
        $fout.='
            height+=12
            ';
    if ($its['settings'][9] == 'on' && $its['settings']['menuposition'] == 'right')
        $fout.='
            width+=12
            ';
    if (!(isset($_GET['viewAlt']) && $_GET['viewAlt'] == 'true'))
        $fout.='var attributes = {}; 
            swfobject.embedSWF("' . $zs1_path . $zs1_targetswf . '", "flashcontent' . $this->sliders_index . '", width, height, "9.0.0", "expressInstall.swf", flashvars, params, attributes);';
    $fout.='
	
<div class="alternate-content">

    
    $fout.='</ul>';
$fout.='</div>
</div>
<div class="clearfix">&nbsp;</div>
</div>';


    }


        */
        
        
        
        
        
        
        
        //echo $k;
        return $fout;
    }

}

require_once('dzs_functions.php');
