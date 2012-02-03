<?php

require 'class.resize.php';

$resize = new Resize();

if(array_key_exists('debug', $_GET)) {
	$resize->debug();
} else {
	$resize->output();
}

?>