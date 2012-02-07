<?php

    session_start();

    if(!array_key_exists('logged',$_SESSION) || $_SESSION['logged'] != 'in') {
    	
		include_once 'config.php';
        header( 'Location: '.$config['wooo'].'/login.html' );
        exit();
    }
    

?>