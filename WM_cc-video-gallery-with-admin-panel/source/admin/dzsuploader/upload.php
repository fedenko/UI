<?php

/*
 * DZS Upload
 * version: 1.0
 * author: digitalzoomstudio
 * website: http://digitalzoomstudio.net
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */



function get_theheaders() {
    //$headers = array();
    //print_r($_SERVER);
    return $_SERVER;
}  

if(isset($HTTP_POST_FILES['file_field']['tmp_name'])){
$uploadloc = 'upload/';
if(isset ($_POST['UPLOAD_PATH']))
    $uploadloc = $headers['UPLOAD_PATH'];
$path= $uploadloc.$HTTP_POST_FILES['file_field']['name'];
if(isset($HTTP_POST_FILES['file_field']['tmp_name'])){
    $file_name =  'file name: ' . $HTTP_POST_FILES['file_field']['name'];
    $file_name = str_replace(' ', '-', $file_name);
    $pos = strpos($file_name, ".php");
    //echo $pos;
    if ($pos !== false){
        echo "You cannot upload php files.";
        die();
    }

}


if(copy($HTTP_POST_FILES['file_field']['tmp_name'], $path)){
echo "Success";
}else{
echo "Error";
}

}else{
$headers = get_theheaders();
//print_r($headers);
$file_name = $headers['HTTP_X_FILE_NAME'];
//print_r($file_name);
$uploadloc = 'upload/';
if(isset ($headers['HTTP_X_UPLOAD_PATH'])){
    $uploadloc = $headers['HTTP_X_UPLOAD_PATH'];
}
    $file_name = str_replace(' ', '-', $file_name);
    $target=$uploadloc . $file_name;
    $content = file_get_contents("php://input");
    file_put_contents($target,$content);



}