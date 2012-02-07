<?php
    require_once('commentanything/config.inc.php');
    require_once('commentanything/funcs.inc.php');


    //get comments from database
    $comments = $db->query("SELECT * FROM em_comments WHERE object_id = ".$db->quote($object_id)." ORDER BY id")->fetchAll();


    // -- form output ------------------------------------------------
    $total    = count($comments);
    $counter  = 1;
    $html = '<div id="emContent">';
    if($total > $CCOUNT){
        $html .= '<div class="emShowAllComments" id="emShowAllComments"><a href="javascript:viewAllComments();">'.$lang['view'].' <span id="total_em_comments">'.$total.'</span> '.$lang['view2'].'</a> <noscript><em>This page needs JavaScript to display all comments</em></noscript></div>';
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
                        <img src="http://www.gravatar.com/avatar/'.gravatar($comment['sender_mail'], false).'" width="32" height="32" alt="Gravatar" />
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
                <form method="post" action="commentanything/php/addComment.php" onsubmit="return false;">
                    <span '.($SHOWNAME?'':'style="display: none;"').' id="emNameSpan">
                        <label for="addEmName">'.$lang['name'].':</label>
                        <input type="text" placeholder="'.$lang['enterName'].'" id="addEmName" name="sender_name" />
                    </span>

                    <span '.($SHOWMAIL?'':'style="display: none;"').' id="emMailSpan">
                        <label for="addEmMail">'.$lang['mail'].':</label>
                        <input type="text" placeholder="'.$lang['enterMail'].'" id="addEmMail" name="sender_mail" />
                    </span>

                    <textarea placeholder="'.$lang['enterComment'].'" id="addEmComment" name="comment"></textarea>

                    <input type="text"   name="email"     value="" id="addEmPot" />
                    <input type="hidden" name="object_id" value="'.$object_id.'" />

                    <span class="emButton">
                        <input type="submit" class="emButton" id="emAddButton" value="'.$lang['comment'].'" onclick="addEMComment(\''.$object_id.'\')" />
                    </span>
                </form>
              </div>';

    //send reply to client
    echo '<div id="emComments" object="'.$object_id.'" class="ignorejsloader">'.$html.'</div>';
?>