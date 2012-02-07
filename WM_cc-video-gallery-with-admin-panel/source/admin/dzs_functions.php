<?php

if(!function_exists('dzs_curr_url')){
function dzs_curr_url() {
    if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on'){
        $page_url .= "https://";
    }else{
        $page_url = 'http://';
    }
    if ($_SERVER["SERVER_PORT"] != "80") {
        $page_url .= $_SERVER["SERVER_NAME"] . ":" . $_SERVER["SERVER_PORT"] . $_SERVER["REQUEST_URI"];
    } else {
        $page_url .= $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"];
    }
    return $page_url;
}
}
    if (!function_exists('dzs_savemeta')) {

        function dzs_savemeta($id, $arg2, $arg3='') {
            //echo htmlentities($_POST[$arg2]);
            if($arg3=='html'){
                update_post_meta($id, $arg2, htmlentities($_POST[$arg2]));
                return;
            }
                
            
            if (isset($_POST[$arg2]))
                update_post_meta($id, $arg2, esc_attr(strip_tags($_POST[$arg2])));
            else
            if ($arg3 == 'checkbox')
                update_post_meta($id, $arg2, "off");
        }

    }
    
    
if (!function_exists('dzs_checked')) {

    function dzs_checked($arg1, $arg2, $arg3='checked', $echo=true) {
        $func_output = '';
        if ($arg1 == $arg2){
            $func_output = $arg3;
        }
        if($echo==true)
        echo $func_output;
        else
        return $func_output;
    }

}

if(!function_exists('dzs_find_string')){
    function dzs_find_string($arg, $arg2) {
        $pos = strpos($arg, $arg2);

        if ($pos === false)
            return false;

        return true;
    }
}


if (!function_exists('dzs_get_excerpt')) {
    function dzs_get_excerpt($pid=0,$maxlen=400, $striptags=false) {
        global $post;
        $fout = '';
        $excerpt = '';
        if ($pid == 0)
            $post_id = $post->ID;
        else
            $post_id = $pid;
        $po = (get_post($post_id));

        if ($po->post_excerpt != '')
            return $po->post_excerpt;

        $aux = strip_tags($po->post_content);
        if (strlen($aux) > $maxlen) {
            $excerpt.=substr($aux, 0, $maxlen);
            
            if($striptags==true){
                $excerpt = strip_tags($excerpt);
                $excerpt = str_replace("\n", " ", $excerpt);
                $excerpt = str_replace("\r", " ", $excerpt);
                $excerpt = str_replace("\t", " ", $excerpt);
                
            }
            
            $fout.=$excerpt;
            $fout.=' [..] ';
            //echo $fout;
        } else {
            $fout.=$aux;
        }
        return $fout;
    }
}


if(!function_exists('dzs_print_menu')){
    function dzs_print_menu() {
        $args = array('menu' => 'mainnav', 'menu_class' => 'menu sf-menu', 'container' => false, 'theme_location' => 'primary', 'echo' => '0');
        $aux = wp_nav_menu($args);
        $aux = preg_replace('/<ul>/', '<ul class="sf-menu">', $aux, 1);
        if (preg_match('/<div class="sf-menu">/', $aux)) {
            $aux = preg_replace('/<div class="sf-menu">/', '', $aux, 1);
            $aux = $rest = substr($aux, 0, -7);
        }
        // $aux_char = '/';
        //$aux = preg_replace('/<div>/', '', $aux, 1);
        print_r($aux);
    }
}
if (!function_exists('dzs_post_date')) {

    function dzs_post_date($pid) {
        $po = get_post($pid);
        //print_r($po);
        if($po){
        echo mysql2date('l M jS, Y', $po->post_date);
        }
    }

}


if(!function_exists('dzs_pagination')){
    function dzs_pagination($pages = '', $range = 2) {
        global $paged;
        $fout = '';
        $showitems = ($range * 2) + 1;

        if (empty($paged))
            $paged = 1;

        if ($pages == '') {
            global $wp_query;
            $pages = $wp_query->max_num_pages;
            if (!$pages) {
                $pages = 1;
            }
        }

        if (1 != $pages) {
            $fout.= "<div class='dzs-pagination pagination'>";
            if ($paged > 2 && $paged > $range + 1 && $showitems < $pages)
                $fout.= "<a href='" . get_pagenum_link(1) . "'>&laquo;</a>";
            if ($paged > 1 && $showitems < $pages)
                $fout.= "<a href='" . get_pagenum_link($paged - 1) . "'>&lsaquo;</a>";

            for ($i = 1; $i <= $pages; $i++) {
                if (1 != $pages && (!($i >= $paged + $range + 1 || $i <= $paged - $range - 1) || $pages <= $showitems )) {
                    $fout.= ( $paged == $i) ? "<span class='current'>" . $i . "</span>" : "<a href='" . get_pagenum_link($i) . "' class='inactive' >" . $i . "</a>";
                }
            }

            if ($paged < $pages && $showitems < $pages)
                $fout.= "<a href='" . get_pagenum_link($paged + 1) . "'>&rsaquo;</a>";
            if ($paged < $pages - 1 && $paged + $range - 1 < $pages && $showitems < $pages)
                $fout.= "<a href='" . get_pagenum_link($pages) . "'>&raquo;</a>";
            $fout.= '<div class="clearfix"></div>';
            $fout.= "</div>
                ";
        }
        return $fout;
    }
}


if(!function_exists('replace_in_matrix')){
function replace_in_matrix($arg1, $arg2, &$argarray){
    foreach($argarray as &$newi){
        //print_r($newi);
        if(is_array($newi)){
            foreach($newi as &$newj){
                if(is_array($newj)){
                    foreach($newj as &$newk){
                    if(!is_array($newk)){
                        $newk = str_replace($arg1, $arg2, $newk);
                    }
                    }
                }else{
                    $newj = str_replace($arg1, $arg2, $newj);
                }

            }
        }else{
           $newi = str_replace($arg1, $arg2, $newi);
        }
    }
}
}


if(!function_exists('dzs_addAttr')){
function dzs_addAttr($arg1, $arg2) {
    $fout='';
    //$arg2 = str_replace('\\', '', $arg2);
    if (isset ($arg2)  && $arg2 != "undefined" && $arg2 != '')
        $fout.= ' '.$arg1 . "='" . $arg2 . "' ";
    return $fout;
}
}
if(!function_exists('dzs_addSwfAttr')){
function dzs_addSwfAttr($arg1, $arg2, $first=false) {
    $fout='';
    //$arg2 = str_replace('\\', '', $arg2);
    
    //sanitaze for object input
    $lb   = array('"' ,"\r\n", "\n", "\r", "&" ,"-", "`", '�', "'", '-');
    $arg2 = str_replace(' ', '%20', $arg2);
    //$arg2 = str_replace('<', '', $arg2);
    $arg2 = str_replace($lb, '', $arg2);
    
    if (isset ($arg2)  && $arg2 != "undefined" && $arg2 != ''){
        if($first==false){
            $fout.='&';
        }
        $fout.= $arg1 . "=" . $arg2 . "";
    }
    return $fout;
}
}
if(!function_exists('dzs_get_contents')){
    function dzs_get_contents($url){
    if( function_exists('curl_init') ) { // if cURL is available, use it...
                $ch = curl_init($url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_HEADER, 0);
                curl_setopt($ch, CURLOPT_TIMEOUT, 10);
                $cache = curl_exec($ch);
                curl_close($ch);
        } else {
                $cache = @file_get_contents($url); // ...if not, use the common file_get_contents()
        }
        return $cache;
    }
}