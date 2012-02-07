<?php
	
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest')) {
	
	session_name('wooo');
	session_start();
	
	include_once 'config.php';
	include_once 'functions.php';
	$pfx = $config['db_table_prefix'];

	if (isset($_POST['remove'])) {
		
		$rid = substr($_POST['remove'],2);
		$rop = substr($_POST['rop'],4);
		
		if ($_SESSION['woooshop'][$rid][$rop]['count'] >1) {
			$_SESSION['woooshop'][$rid][$rop]['count'] -= 1;
		}
		else {
			unset($_SESSION['woooshop'][$rid][$rop]);
		}
		
		// unset
		if (empty($_SESSION['woooshop'][$rid])) {

			unset($_SESSION['woooshop'][$rid]);
			
		}
		
	}


	if (isset($_POST['pid'])) {
		
		$id = substr($_POST['pid'],3);
		$opt = $_POST['option'];
		
		// get products from database
		
		$product = p_product($id,$opt);
	
		if (!empty($product)) {
			
			if (!array_key_exists('woooshop',$_SESSION)){
				$_SESSION['woooshop'] = array();
			}
			
			if (array_key_exists($id, $_SESSION['woooshop'])) {
				
				// option exists
				if (array_key_exists($opt,$_SESSION['woooshop'][$id])) {
					$_SESSION['woooshop'][$id][$opt]['count'] += 1;				
				} // option exists
				else {
					
					/*check price */
					if ($product->optionprice) {
						$price = $product->optionprice;
					}
					else {
						$price = $product->productprice;
					}
									
					$_SESSION['woooshop'][$id][$opt] = array(
						'name' => $product->productname,
						'price' => $price,
						'option' => $product->optionname,
						'count' => 1					
					);
				} // option don't exist

				
			} // plus one
			
			else {
		
				/*check price */
				if ($product->optionprice) {
					$price = $product->optionprice;
				}
				else {
					$price = $product->productprice;
				}
				if (!$product->optionname) {
					$product->optionname = $opt;
				}
				

				$_SESSION['woooshop'][$id][$opt] = array(
					'name' => $product->productname,
					'price' => $price,
					'option' => $product->optionname,
					'count' => 1					
				);
		
			} // add new key

			
		}
		
		
	}
		
	/**************** out ****************/
	
	
	if (!empty($_SESSION['woooshop'])) {
			
		$currency = wooo_currency();
				
		$out = '<table cellpadding="0" cellspacing="0">';

		$sum = 0;
			
		foreach($_SESSION['woooshop'] as $id => $option) {
						
			foreach($option as $o => $item) {
	
				$price = $item['price'] * $item['count'];
				$sum += $price;

				$out .= '<tr>
						<td class="action"><a id="r_'.$id.'" rel="rop_'.$o.'" class="removeitem"></a></td>
						<td class="count">'.$item['count'].'</td>
						<td class="name">'.$item['name'];
						
						if ($o != 'undefined') {
							$out .=	' <span class="option">('.$item['option'].')</span>';
						}

						
				$out .=	'</td><td class="prc">'.$currency['currency'].' '.number_format($price,2).'</td>
						</tr>
				';
				
			} // foreach
			
		
			
		}
				
		
		$out .= '<tr>

				<td colspan="3" class="prcl sum"><b>Summary '.$currency['currency-code'].'</b></td>
				<td class="prc sum"><b>'.$currency['currency'].' '.number_format($sum,2).'</b></td>
		</tr>';
		
		
		$out .= '</table>';
		$out .= wooo_gateway($_SESSION['woooshop']);
		
		
		print $out;
	} // 
	
	else {
		print 'Your cart is empty';
	}

}
	
?>