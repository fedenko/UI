<?php
    require_once('../config.inc.php');
    require_once('../funcs.inc.php');


    $_REQUEST['comment']     = cleanInput($_REQUEST['comment']);
    $_REQUEST['sender_name'] = cleanInput($_REQUEST['sender_name']);
    $_REQUEST['sender_mail'] = cleanInput($_REQUEST['sender_mail']);


    //error check extreme
    if($_REQUEST['sender_name'] == $lang['enterName']){
        unset($_REQUEST['sender_name']);
    }

    if($_REQUEST['sender_mail'] == $lang['enterMail']){
        unset($_REQUEST['sender_mail']);
    }


    //insert comment into database
    $db->exec('INSERT INTO em_comments SET
                                object_id    = '.$db->quote($_REQUEST['object_id']).',
                                created      = NOW(),
                                sender_name  = '.$db->quote($_REQUEST['sender_name']).',
                                sender_mail  = '.$db->quote($_REQUEST['sender_mail']).',
                                sender_ip    = '.(int)ip2long($_SERVER['REMOTE_ADDR']).',
                                comment_text = '.$db->quote($_REQUEST['comment']));

    $total = $db->query("SELECT count(*) AS total FROM em_comments WHERE object_id = ".$db->quote($_REQUEST['object_id']))->fetch();

    if($_REQUEST['sender_name']){
        if($_REQUEST['sender_mail']){
            $_REQUEST['sender_name'] = jsEncode($_REQUEST['sender_mail'], $_REQUEST['sender_name']);
        }
        $sender = '<span class="emSenderName">'.$_REQUEST['sender_name'].'</span>: ';
    }else{
        $sender = '';
    }

    header('Content-type: application/x-json');
    echo json_encode(array(
                            'id'    => $db->lastInsertId(),
                            'text'  => stripslashes($sender.$_REQUEST['comment']),
                            'name'  => stripslashes($_REQUEST['sender_name']),
                            'mail'  => stripslashes($_REQUEST['sender_mail']),
                            'image' => '<img src="http://www.gravatar.com/avatar/'.gravatar($_REQUEST['sender_mail']).'" />',
                            'date'  => strftime($DATEFORMAT),
                            'total' => (int)$total['total']
                            ));
?>