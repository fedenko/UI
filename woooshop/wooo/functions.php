<?php
	
	include_once 'config.php'; 
	
	/**** db connection *****/
	
	global $connection;
	global $db;
	global $config;

	$connection = mysql_connect($config['db_host'], $config['db_user'], $config['db_pass']);
	
	if (!$connection) {
	    die('mySql connection not possible: ' . mysql_error());
	}
	else {
		$db = mysql_select_db($config['db_database'], $connection) or die("Database not found!");
	}
	
	/** parse AJAX GET REQUESTS ****/
	
	if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest')) {
		
		if (isset($_GET)) {
		
			if (isset($_GET['mode'])) {
				
				switch ($_GET['mode']){
					
					case 'list' :
						wooolist();
					break;
					
					case 'add' :
						wooo_addform();
					break;
					
					case 'oadd' :
						wooo_addoptionform($_GET['pid']);
					break;
					
					case 'edit' :
						wooo_editform($_GET['id']);
					break;
					
					case 'delete' :
						wooo_delete($_POST);
					break;
					
					case 'odelete' :
						wooo_odelete($_POST);
					break;
					
					case 'oedit' :
						wooo_oeditform($_GET['id']);
					break;
					
					case 'save' :
						wooo_save($_POST);
					break;
					
					case 'osave' :
						wooo_osave($_POST);
					break;
					
					case 'editsave' :
						wooo_editsave($_POST);
					break;
					
					case 'oeditsave' :
						wooo_oeditsave($_POST);
					break;
					
					case 'settings' :
						wooo_settings();
					break;
					
					case 'savesettings' :
						wooo_savesettings($_POST);
						
					break;
					
					case 'p_data':
						p_data($_GET['id'],$_GET['opt'],$_GET['price']);
					break;
					
					case 'gateway':
						wooo_gateway();
					break;
									
				} // switch
				
			} // mode	
			
		}
	} // ajax
	
	
	
	function wooolist() {
	
		global $config;
		global $db;
		
		$currency = wooo_currency();
		
		$pfx = $config['db_table_prefix'];
		
		/* retrieve products */
		
		$q = mysql_query('SELECT * FROM '.$pfx.'products;');

		$o = '<table cellpadding="0" cellspacing="0">
				<tr>
			  	  <th>ID</th>
			  	  <th>name</th>
			  	  <th class="price">price</th>
			  	  <th>options</th>
			  	  <th></th>
			  	  </tr>

		';
		
		while($p = mysql_fetch_object($q)){
			
			  $op = '';
				
			  $oq = mysql_query('SELECT * FROM '.$pfx.'options WHERE product_id = '.$p->id.';');
			  
			  if (!empty($oq)) {
			  	  
			  	  $op .= '<table cellpadding="0" cellspacing="0">
			  	  ';
				  while($po = mysql_fetch_object($oq)) {

						$op .= '<tr>
								<td>'.$po->name.'</td>
								<td class="price">';
								if ($po->price != ''){
									$op .= $currency['currency'].' '.$po->price;
								}
						$op .=	'</td>
								<td style="width:50px"><a ref="'.$po->id.'" class="odelete">delete</a><a ref="'.$po->id.'" class="oedit">edit</a></td>
						</tr>';

					}
			  	  $op .= '</table>';	
			  	
			  }
		
  			   $o .= '<tr>
			   <td>'.$p->id.'</td>
			   <td>'.$p->name.'</td>
			   <td class="price">'.$currency['currency'].' '.$p->price.'</td>
			   <td class="opts">'.$op.'</td>
			   <td style="width:50px"><a class="delete" name="'.$p->name.'" ref="'.$p->id.'">delete</a><a class="edit" ref="'.$p->id.'">edit</a><a ref="'.$p->id.'" class="oadd">add option</a></td>
			   </tr>';	

 		
 		 }
 		
 		$o .= '</table>'; 
 		
 		
 		
 		print $o;
		
	}
	
	function wooo_addform(){
		
		$o = '
		
		<script type="text/javascript">
			$(document).ready(function(){
				
				$("#addproduct").validate();

			});

		</script>
		
		<form id="addproduct" method="post">				
				<fieldset>
					<label>Name</label>
					<input type="text" id="name" name="name" class="required" />
				</fieldset>

				<fieldset>
					<label>Price</label>
					<input type="text" id="price" name="price" class="required" />
				</fieldset>
				
				<input type="submit" id="submit" name="submit" value="add" />
			</form>';
		
		
		print $o;
		
	}
	
	function wooo_addoptionform($id){
		
		$o = '
		
		<script type="text/javascript">
			$(document).ready(function(){
				
				$("#addoption").validate();

			});

		</script>
		
		<form id="addoption" method="post">		
				<input type="hidden" id="pid" name="pid" value="'.$id.'" />		
				<fieldset>
					<label>Option</label>
					<input type="text" id="name" name="name" class="required" />
				</fieldset>

				<fieldset>
					<label>Price</label>
					<input type="text" id="price" name="price" />
				</fieldset>
				
				<input type="submit" id="submit" name="submit" value="add" />
			</form>';
		
		
		print $o;
		
	}
	
	
	
	
	
	function wooo_save($data){

		global $config;
		global $db;			
		$pfx = $config['db_table_prefix'];
		
				
		mysql_query('INSERT INTO '.$pfx.'products (name, price) VALUES ("'.$data['name'].'", "'.$data['price'].'")');
				
		print 'Product saved!';
		
	}

	function wooo_osave($data){

		global $config;
		global $db;			
		$pfx = $config['db_table_prefix'];
		
				
		mysql_query('INSERT INTO '.$pfx.'options (product_id, name, price) VALUES ("'.$data['pid'].'", "'.$data['oname'].'", "'.$data['oprice'].'")');
				
		print 'Option saved!';
		
	}


	function wooo_editsave($data){

		global $config;
		global $db;			
		$pfx = $config['db_table_prefix'];
		
				
		mysql_query('UPDATE '.$pfx.'products SET name = "'.$data['name'].'", price = "'.$data['price'].'" WHERE id="'.$data['id'].'";');
				
		print 'Product saved!';
		
	}
	

	function wooo_oeditsave($data){

		global $config;
		global $db;			
		$pfx = $config['db_table_prefix'];

				
		mysql_query('UPDATE '.$pfx.'options SET name = "'.$data['option'].'", price = "'.$data['price'].'" WHERE id="'.$data['id'].'"');
				
		print 'Option saved!';
		
	}
	
	function wooo_savesettings($data){

		global $config;
		global $db;			
		$pfx = $config['db_table_prefix'];
						
			foreach($data as $k => $d) {

				if ($k != 'pass') {
					mysql_query('UPDATE '.$pfx.'settings SET value="'.stripslashes($d).'" WHERE name="'.$k.'";');
				}
				if ($k == 'pass' && $d != '') {
					mysql_query('UPDATE '.$pfx.'settings SET value="'.md5($d).'" WHERE name="pass";');
				}
				/*
				if ($k == 'pass' && $d != '') {
					$v = md5($d);
				}
				if ($k != 'pass' && $d != '') {
					$v = $d;
				}
				print $k.' - '.$d;
			
				if ($v != ''){
				//	mysql_query('UPDATE '.$pfx.'settings SET value="'.$v.'" WHERE name="'.$k.'";');
				} 
				*/

			}
							
		print 'Settings saved!';
	
	}


	function wooo_delete($data){

		global $config;
		global $db;			
		$pfx = $config['db_table_prefix'];
		
				
		mysql_query('DELETE FROM '.$pfx.'products WHERE id = "'.$_POST['id'].'";');
		mysql_query('DELETE FROM '.$pfx.'options WHERE product_id = "'.$_POST['id'].'";');
				
		print 'Product deleted!';

	}
	
	function wooo_odelete($data){

		global $config;
		global $db;			
		$pfx = $config['db_table_prefix'];
				
		mysql_query('DELETE FROM '.$pfx.'options WHERE id = "'.$_POST['id'].'";');
				
		print 'Option deleted!';

	}
	
	
	function wooo_editform($id){

		global $config;
		global $db;			
		$pfx = $config['db_table_prefix'];
		
		/* retrieve product */
		
		$q = mysql_query('SELECT * FROM '.$pfx.'products WHERE id="'.$id.'";');

		while($p = mysql_fetch_object($q)){
		
			$o = '
			
			<script type="text/javascript">
				$(document).ready(function(){
					
					$("#editproduct").validate();
	
				});
	
			</script>
			
			<form id="editproduct" method="post">
					<input type="hidden" id="id" name="id" value="'.$p->id.'" />			
					<fieldset>
						<label>Name</label>
						<input type="text" id="name" name="name" value="'.$p->name.'" class="required" />
					</fieldset>
	
					<fieldset>
						<label>Price</label>
						<input type="text" id="price" name="price" value="'.$p->price.'" class="required" />
					</fieldset>
					
					<input type="submit" id="submit" name="submit" value="save" />
				</form>';
			
			
			print $o;
		

		} // while



	}

	function wooo_oeditform($id){

		global $config;
		global $db;			
		$pfx = $config['db_table_prefix'];
		
		/* retrieve product */
		
		$q = mysql_query('SELECT * FROM '.$pfx.'options WHERE id="'.$id.'";');

		while($p = mysql_fetch_object($q)){
		
			$o = '
			
			<script type="text/javascript">
				$(document).ready(function(){
					
					$("#editoption").validate();
	
				});
	
			</script>
			
			<form id="editoption" method="post">
					<input type="hidden" id="id" name="id" value="'.$p->id.'" />			
					<fieldset>
						<label>Name</label>
						<input type="text" id="option" name="option" value="'.$p->name.'" class="required" />
					</fieldset>
	
					<fieldset>
						<label>Price</label>
						<input type="text" id="price" name="price" value="'.$p->price.'" />
					</fieldset>
					
					<input type="submit" id="submit" name="submit" value="save" />
				</form>';
			
			
			print $o;
		

		} // while

	}

	function wooo_settings(){
		
		global $config;
		global $db;
		
		$pfx = $config['db_table_prefix'];
		
		/* retrieve settings */
		
		$q = mysql_query('SELECT * FROM '.$pfx.'settings;');
		
		$o = '<form id="editsettings" method="post"><div class="acc">';
		
		
		$settings = array();
		
		while($p = mysql_fetch_object($q)){
		
				$settings[$p->section]['fields'][] = $p;
 		
 		 }
		
		
		foreach($settings as $k => $s) {
			
			$o .= '<a>'.$k.'</a><div>';
			
			foreach($s['fields'] as $p){
				$val = '';
				
				if ($p->name != 'pass') {
					$val = $p->value;
					$type = 'text';
				}
				else {
					$type = 'password';
				}
					
  			   $o .= '<fieldset>
			   <label>'.$p->name.'</label>';
			   
			   if ($p->opts != '') {
			   	   
			   	   $opts = explode(',',$p->opts);
			   	   
			   	   $o .= '<select name="'.$p->name.'" id="'.$p->name.'">';
			   	   		foreach($opts as $op) {
			   	   			$sel = '';
			   	   			if ($p->value == $op) {
			   	   				$sel = 'selected="selected" ';
			   	   			}
			   	   			$o .= '<option '.$sel.' value="'.$op.'">'.$op.'</option>';
			   	   		}
			   	   $o .= '</select>';
			   }
			   else {
			   		$o .= '<input type="'.$type.'" name="'.$p->name.'" id="'.$p->name.'" value="'.$val.'" />';
			   }
			   
		
			   
			  
			   $o .= '</fieldset>';	
			} 
			
			$o .= '</div>';
		
		}
		

 		$o .= '</div><input type="submit" id="submit" name="submit" value="save" /></form>';

 		print $o;
		
	}
	
	function wooo_currency() {
		
		global $config;
		global $db;

		$pfx = $config['db_table_prefix'];
		
		$currency = array();
		
		$q = mysql_query('SELECT * FROM '.$pfx.'settings WHERE name = "currency" or name = "currency-code";');
		
		while($p = mysql_fetch_object($q)){
			$currency[$p->name] = $p->value;
		}
		return $currency;
	}
	
	function p_data($id,$opt,$price){
		
		global $config;
		global $db;

		$pfx = $config['db_table_prefix'];
		$pr = '';
		$sel = '';
		
		$c = wooo_currency();

		if ($price == 'true') {
			$q2 = mysql_query('SELECT * FROM '.$pfx.'products WHERE id="'.$id.'";');
			while($p2 = mysql_fetch_object($q2)){
				$pr = '<b class="woooprice">'.$c['currency'].' '.$p2->price.'</b>';
			}
		}
		
		if ($opt == 'true') {
			$q = mysql_query('SELECT * FROM '.$pfx.'options WHERE product_id = "'.$id.'";');
			
			$sel = '<select class="woooptions" id="sel'.$id.'">';
				$pray = array();
				while($p = mysql_fetch_object($q)){
					$priceval = '';
					$rel = '';
					if ($p->price != '') {
						$priceval = '('.$c['currency'].' '.$p->price.')';
						$pray[] = $p->price;
						$rel = 'rel="'.$c['currency'].' '.$p->price.'"';
					}
					
					$sel .= '<option '.$rel.' value="'.$p->id.'">'.$p->name.' '.$priceval.'</option>';
					
					if (!empty($pray) && $price == 'true') {
						$pr = '<b class="woooprice">'.$c['currency'].' '.$pray['0'].'</b>';
					}
				}
				
			$sel .= '</select>';
		}
		
		print $pr.$sel;				
	
	}
	
	function p_product($id,$opt = null){

		global $config;
		global $db;
				
		$product = array();

		$pfx = $config['db_table_prefix'];
		
		if ($opt != 'undefined') {
			$q = mysql_query('SELECT p.name as productname, o.name as optionname, p.price as productprice, o.price as optionprice FROM '.$pfx.'products p,'.$pfx.'options o WHERE p.id="'.$id.'" AND o.id = "'.$opt.'";');
		}
		else {
			$q = mysql_query('SELECT name as productname, price as productprice FROM '.$pfx.'products WHERE id="'.$id.'";');
		}
		while($p = mysql_fetch_object($q)){
				
			$product = $p;
	
		}
		
		return $product;
		
	}
	
	function wooo_gateway($items){
		global $config;
		global $db;
		$pfx = $config['db_table_prefix'];
		
		$settings = array();
		
		$q = mysql_query('SELECT * FROM '.$pfx.'settings WHERE section != "User";');
		
		while($p = mysql_fetch_object($q)){
			$settings[$p->name] = $p->value;
		}
		
		$ret = '';
		
//		print '<pre>';
//		print_r($items);	
	
			switch($settings['gateway']) {
				
				case 'paypal' :
		
					$checkout_count = 1;
				
					$paypalemail = $settings['paypal-email'];
					$paypallogo =  $settings['paypal-header'];
					$qstr = '';
					$gatewayurl = '';

				
					foreach($items as $id => $option) {
						
						foreach($option as $item) {

							$qstr .= '&item_name_' . $checkout_count . '=' . $item['name'];
							$qstr .= '&amount_' . $checkout_count . '=' . $item['price'];
							$qstr .= '&quantity_' . $checkout_count . '=' . $item['count'];
							
							++$checkout_count;	

						} // foreach

					
					} // foreach
				$ppl = '';
				if ($paypallogo != '') {
					$ppl = '&image_url='.$paypallogo;
				}
				
										
				$qstr .= '&currency_code='.$settings['currency-code'].'&return='.$config['host'].'&cancel_return='.$config['host'].$ppl;
				$gatewayurl = 'https://www.paypal.com/cgi-bin/webscr?cmd=_cart&upload=1&business=' . $paypalemail . $qstr;
						
				$ret = $gatewayurl;

				break;
				
					
				case 'paymex' :

					$checkout_count = 1;
					$paymexmerchant = $settings['merchant'];
					$qstr = '';
					$gatewayurl = '';

					foreach($items as $id => $option) {
						
						foreach($option as $item) {

							$qstr .= '&item_number_' . $checkout_count . '=' . $checkout_count;
							$qstr .= '&item_name_' . $checkout_count . '=' . $item['name'];
							$qstr .= '&amount_' . $checkout_count . '=' . $item['price'];
							$qstr .= '&item_qty_' . $checkout_count . '=' . $item['count'];

							++$checkout_count;	

						} // foreach

					
					} // foreach
					
					
				$gatewayurl = 'https://secure.paymex.co.nz/Process.aspx?business='.$paymexmerchant. $qstr;
						
				$ret =  $gatewayurl;

				break;
				
				
				case  '2checkout' :
					
					$checkout_count = 1;
					
					$twocheckoutsid = $settings['2checkout-sid'];
					$cartname = $settings['cart-name'];
					$qstr = '';
					$gatewayurl = '';
					
					$total = 0;

					foreach($items as $id => $option) {
						
						foreach($option as $item) {

							$total += $item['price'] * $item['count'];

							$qstr .= '&c_prod_' . $checkout_count . '=' . $checkout_count.','.$item['count'];
							$qstr .= '&c_name_' . $checkout_count . '=' . $item['name'];
							$qstr .= '&c_description_' . $checkout_count . '=' .$settings['currency'].' '.doubleval($item['price']);
							$qstr .= '&c_price_' . $checkout_count . '=' . doubleval($item['price']);

							++$checkout_count;	

						} // foreach

					
					} // foreach
										
					
					$gatewayurl = 'https://www.2checkout.com/checkout/spurchase?
					sid='.$twocheckoutsid.'
					&cart_order_id='.$cartname.'
					&total='.$total.
					$qstr.'
					&return_url='.$config['host'].'
					&merchant_order_id=
					&x_receipt_link_url=
					&id_type=1
					&c_tangible_1=
					&lang=en
					&pay_method=';

					$ret =  $gatewayurl;
					
				break;
				
				case 'moneybookers':
					
					$checkout_count = 1;
					
					$mbemail = $settings['MB-Email'];
					$qstr = '';
					$gatewayurl = '';
					
					$total = 0;

					foreach($items as $id => $option) {
						
						foreach($option as $item) {

							$total += $item['price'] * $item['count'];

							$qstr .= '&detail'.$checkout_count.'_text =' . $item['name'];
							$qstr .= '&detail'.$checkout_count.'_description =' .$settings['currency'].' '.doubleval($item['price']);

							++$checkout_count;	

						} // foreach

					
					} // foreach
					
					
					$gatewayurl = 'https://www.moneybookers.com/app/payment.pl?pay_to_email='.$mbemail.'&status_url='.$mbemail.'&currency='.$settings['currency-code'].'&amount='.$total.$qstr;

					$ret =  $gatewayurl;
					
				break;					
			
			}
		
		return '<a class="checkout" href="'.$ret.'">checkout with '.$settings['gateway'].'</a>';
	}
	
	

?>