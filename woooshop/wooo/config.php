<?php

    $config['path'] = 'wooo'; /*relative path to wooo folder */

    $config['db_host']  = 'localhost';
    $config['db_database']  = 'test';
    $config['db_user']  = 'root';
    $config['db_pass']  = 'bali09';
    $config['db_table_prefix']  = 'wooo_';
    
    
    /***don't change this*/
	$config['host'] = 'http://'.$_SERVER['HTTP_HOST'];
    $config['wooo'] = $config['host'].'/'.$config['path'];


?>