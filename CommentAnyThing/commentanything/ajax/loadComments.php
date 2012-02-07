<?php
    require_once('../config.inc.php');
    require_once('../funcs.inc.php');


    //get comments from database
    $comments = $db->query("SELECT * FROM em_comments WHERE object_id = ".$db->quote($_REQUEST['object_id'])." ORDER BY id")->fetchAll();


    // -- form output ------------------------------------------------
    $total    = count($comments);
    $counter  = 1;
    $html = '<div id="emContent">';
    if($total > $CCOUNT){
        $html .= '<div class="emShowAllComments" id="emShowAllComments"><a href="javascript:viewAllComments();">'.$lang['view'].' <span id="total_em_comments">'.$total.'</span> '.$lang['view2'].'</a></div>';
    }
    foreach($comments as $comment){
        if($comment['sender_name']){
            if($comment['sender_mail']){
                $comment['sender_name'] = jsEncode($comment['sender_mail'], $comment['sender_name']);
            }
            $sender = '<span class="emSenderName">'.$comment['sender_name'].'</span>: ';
        }else{
            $sender = '';
        }

        $html .= '<div class="emComment" id="comment_'.$comment['id'].'" '.($counter < ($total - ($CCOUNT - 1))?'style="display:none"':'').'>
                    <div class="emCommentImage">
                        <img src="http://www.gravatar.com/avatar/'.gravatar($comment['sender_mail']).'" width="32" height="32" alt="Gravatar" />
                    </div>
                    <div class="emCommentText">
                        '.$sender.stripslashes($comment['comment_text']).'
                    </div>
                    <div class="emCommentInto">
                        '.strftime($DATEFORMAT,strtotime($comment['created'])).'
                    </div>
                  </div>';
        $counter++;
    }
    $html .= '</div>';

    $html .= '<div id="emAddComment">
                <span '.($SHOWNAME?'':'style="display: none;"').' id="emNameSpan">
                    <label for="addEmName">'.$lang['name'].':</label>
                    <input type="text" placeholder="'.$lang['enterName'].'" id="addEmName" />
                </span>

                <span '.($SHOWMAIL?'':'style="display: none;"').' id="emMailSpan">
                    <label for="addEmMail">'.$lang['mail'].':</label>
                    <input type="text" placeholder="'.$lang['enterMail'].'" id="addEmMail" />
                </span>

                <textarea placeholder="'.$lang['enterComment'].'" id="addEmComment"></textarea>
                <span class="emButton">
                    <input type="button" class="emButton" id="emAddButton" value="'.$lang['comment'].'" onclick="addEMComment(\''.$_REQUEST['object_id'].'\')" />
                </span>
              </div>';

    //send reply to client
    header('Content-type: application/x-json');
    echo json_encode(array('html'  => $html, 'total' => $total));
?>