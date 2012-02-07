<?php
    session_start();
	
	if(isset($_POST['username'], $_POST['password']) && strcmp(trim($_POST['username']),'') != 0 && strcmp(trim($_POST['username']),'') != 0 ) {

		include_once 'config.php';
		include_once 'functions.php';
		$pfx = $config['db_table_prefix'];
	
		$udata = array();
		
		$q = mysql_query('SELECT * FROM '.$pfx.'settings;');
		
		while($u = mysql_fetch_object($q)) {		
			$udata[$u->name] = $u->value;
		}
		
		if ($_POST['username'] == $udata['user'] && md5($_POST['password']) == $udata['pass']) {
			
		    $_SESSION['logged'] = 'in';
	        header( 'Location: '.$config['wooo'].'/index.php' );
	        exit();
		}
		else {
	        header( 'Location: '.$config['wooo'].'/login.html' );
	        exit();
		}
		
	}
	
?>
