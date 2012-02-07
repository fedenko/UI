<?php
	 
	 session_start();
	 include_once 'config.php';
     
     $_SESSION['logged'] = 'out';

     header( 'Location: login.html' );
     exit();

?>