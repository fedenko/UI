<?php
    /***
     *  Encode MailAddresses against Spam Bots
     ***/
    function jsEncode($address, $text){
        preg_match('!^(.*)(\?.*)$!',$address,$match);
        if(!empty($match[2])) {
            $smarty->trigger_error("mailto: hex encoding does not work with extra attributes. Try javascript.");
            return;
        }
        $address_encode = '';
        for ($x=0; $x < strlen($address); $x++) {
            if(preg_match('!\w!',$address[$x])) {
                $address_encode .= '%' . bin2hex($address[$x]);
            } else {
                $address_encode .= $address[$x];
            }
        }
        $text_encode = '';
        for ($x=0; $x < strlen($text); $x++) {
            $text_encode .= '&#x' . bin2hex($text[$x]).';';
        }

        $mailto = "&#109;&#97;&#105;&#108;&#116;&#111;&#58;";
        return '<a href="'.$mailto.$address_encode.'" '.$extra.'>'.$text_encode.'</a>';
    }

    /***
     *  Get rid of all HTML in the input
     ***/
    function cleanInput($str){
        return nl2br(htmlspecialchars(strip_tags(trim(urldecode($str)))));
    }

    /***
     *  Prepare a Gravatar String
     ***/
    function gravatar($email, $absolute=true){
        if($absolute){
            $dir = str_replace('/commentanything/ajax/loadComments.php','/',$_SERVER['REQUEST_URI']);
            $dir = str_replace('/commentanything/ajax/addComment.php','/',$dir);
            return md5( strtolower( trim( $email ) ) ).'?s=32&d='.urlencode('http://'.$_SERVER['HTTP_HOST'].$dir.'commentanything/css/images/default.gif');
        }

        $dirs = explode('/',$_SERVER['REQUEST_URI']);
        array_pop($dirs);
        $dir  = implode('/',$dirs);
        return md5( strtolower( trim( $email ) ) ).'?s=32&d='.urlencode('http://'.$_SERVER['HTTP_HOST'].$dir.'/commentanything/css/images/default.gif');
    }
?>