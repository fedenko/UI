<?php
session_start();  // for the caching

// Basic function to send data to jQuery
function array2json($arr) {
    if(function_exists('json_encode')) return json_encode($arr); //Lastest versions of PHP already has this functionality.
    $parts = array();
    $is_list = false;

    //Find out if the given array is a numerical array
    $keys = array_keys($arr);
    $max_length = count($arr)-1;
    if(($keys[0] == 0) and ($keys[$max_length] == $max_length)) {//See if the first key is 0 and last key is length - 1
        $is_list = true;
        for($i=0; $i<count($keys); $i++) { //See if each key correspondes to its position
            if($i != $keys[$i]) { //A key fails at position check.
                $is_list = false; //It is an associative array.
                break;
            }
        }
    }

    foreach($arr as $key=>$value) {
        if(is_array($value)) { //Custom handling for arrays
            if($is_list) $parts[] = array2json($value); /* :RECURSION: */
            else $parts[] = '"' . $key . '":' . array2json($value); /* :RECURSION: */
        } else {
            $str = '';
            if(!$is_list) $str = '"' . $key . '":';

            //Custom handling for multiple data types
            if(is_numeric($value)) $str .= $value; //Numbers
            elseif($value === false) $str .= 'false'; //The booleans
            elseif($value === true) $str .= 'true';
            else $str .= '"' . addslashes($value) . '"'; //All other things
            // :TODO: Is there any more datatype we should be in the lookout for? (Object?)

            $parts[] = $str;
        }
    }
    $json = implode(',',$parts);

    if($is_list) return '[' . $json . ']';//Return numerical JSON
    return '{' . $json . '}';//Return associative JSON
}


// if there asre some problem with esential files
if(!file_exists('analytics.class.php') || !file_exists('config.php')) {
	print array2json(array("status" => 404, "message" => "File not found!"));
	exit;
}

include_once 'analytics.class.php';
include_once 'config.php';

// if the config.php is not set
if($username == "" || $password == "" || $profileId == "") {
	print array2json(array("status" => 403, "message" => "Please edit the config.php!"));
	exit;
}

try {
	// construct the class
	$oAnalytics = new analytics($username, $password);
	
	// set it up to use caching
	$oAnalytics->useCache();
	
	// get an array with profiles (profileId => profileName)
    $aProfiles = $oAnalytics->getProfileList();  
	
	$aProfileKeys = array_keys($aProfiles);
    // set the profile tot the first account
    
	if(in_array($profileId, $aProfileKeys)) {
		// set profile by id
		$oAnalytics->setProfileById($profileId);
	} else {
		$message = "The profile Id in a config.php is not correct!";
		$message .= "<br />Available in account: <ul>"; 
		foreach ($aProfiles as $id => $name) {
			$message .= "<li><b>$id</b> ($name)</li>";
		}
		$message .="</ul>";	
		print array2json(array("status" => 403, "message" => $message));
		exit;
	}
	
	$yesterday = date("Y-m-d",(time()-1*24*60*60));	
	
	// set the date range between yesterday and before 1 mmonth
    $oAnalytics->setDateRange(date("Y-m-d",strtotime("-1 month", (time()-1*24*60*60))), $yesterday);

	// Select metrics	
	foreach ($_POST['data'] as $items) {
		$metricsArray[] = $items['metrics'];  
	}
	
	// get the datas by metrics
	foreach($metricsArray as $metrics) {
		$dateStore = null;
		$valueStore = null;
		
		// from google
	   	$response = $oAnalytics->getData(array(	'dimensions' => 'ga:date',
	                                    	'metrics'    => $metrics,
	                                     	'sort'       => 'ga:date'));
											
		$dateFormat = $_POST['dateFormat'];		// set the date format								
											
		foreach($response as $date => $value) {
			$dateStore[] = date($dateFormat, strtotime($date));
			$valueStore[] = $value;
		}
		
		$values[] = $valueStore;		
	}								
	
	// return a json with datas
	print array2json(array("status" => 200, "data" => array("dates" => $dateStore, "values" => $values)));
										
} catch(Exception $e) {
	// return errors
	print array2json(array("status" => 400, "message" => $e->getMessage()));
}	
?>