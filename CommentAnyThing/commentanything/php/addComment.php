<?php
    require_once('../config.inc.php');
    require_once('../funcs.inc.php');

    $_REQUEST['comment']     = cleanInput($_REQUEST['comment']);
    $_REQUEST['sender_name'] = cleanInput($_REQUEST['sender_name']);
    $_REQUEST['sender_mail'] = cleanInput($_REQUEST['sender_mail']);


    //honeypot check
    if($_REQUEST['email'] or !$_REQUEST['comment']){
        exit;
    }


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

    header('Location: '.$_SERVER['HTTP_REFERER']);
    exit;
?>