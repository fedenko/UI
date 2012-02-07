<?php

    /* -- DATABASE ACCESS PARAMETERS, PLEASE EDIT -- */
    $DB_HOST    = 'localhost';
    $DB_USER    = 'root';
    $DB_PASS    = 'root';
    $DB_NAME    = 'emcomments';


    /* -- Some UI Settings, edit of you wish -- */
    //how to format dates
    $DATEFORMAT = '%c'; //see http://at2.php.net/manual/en/function.strftime.php for other possibilities

    //what to hide comments under SHOW MORE
    $CCOUNT     = 2;

    //Name Input Field Visible?
    $SHOWNAME   = false;

    //eMail Input Field Visible?
    $SHOWMAIL   = false;


    /* -- Language Settings -- */
    $lang['view']           = 'View all';
    $lang['view2']          = 'comments';
    $lang['name']           = 'Name';
    $lang['enterName']      = 'Enter your name';
    $lang['mail']           = 'eMail';
    $lang['enterMail']      = 'Enter youe eMail address';
    $lang['enterComment']   = 'Add a Comment';
    $lang['comment']        = 'Comment';















    ####################################################################################################
    /* ----- DO NOT EDIT BELOW THIS LINE ----- */
    //open the actual DB connection
    try{
        $db = new PDO('mysql:host='.$DB_HOST.';dbname='.$DB_NAME,$DB_USER,$DB_PASS,array());
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $db->setAttribute(PDO::ATTR_CASE, PDO::CASE_LOWER);
        $db->exec("SET NAMES 'utf8'");
    }catch (exception $e){
        header('Content-type: application/x-json');
        echo json_encode(array('dberror' => $e->getMessage()));
        exit;
    }

    //db setup if neccessary
    $db->exec('CREATE TABLE IF NOT EXISTS em_comments(
                    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                    object_id VARCHAR(64) NOT NULL,

                    created DATETIME NOT NULL,

                    sender_name     VARCHAR(128),
                    sender_mail     VARCHAR(128),
                    sender_ip       BIGINT,

                    comment_text    TEXT,
                    admin_reply     ENUM(\'0\',\'1\') NOT NULL DEFAULT \'0\',

                    PRIMARY KEY(id),
                    KEY(object_id)
                ) COLLATE utf8_general_ci');
?>