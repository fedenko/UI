/*******************************************************************************
 *  -- Comment Anything facebook Style --                                      *
 *                                                                             *
 *      Author: Kulikov Alexey <a.kulikov@gmail.com>                           *
 *      Web: http://clops.at                                                   *
 *      Since: 28.03.2010                                                      *
 *                                                                             *
 *******************************************************************************/


/***
 *  When a user is typing a comment the size of the textarea is extended
 ***/
function adjustHeight(textarea){
    var dif = textarea.scrollHeight - textarea.clientHeight;
    if (dif){
        if (isNaN(parseInt(textarea.style.height))){
            textarea.style.height = textarea.scrollHeight + "px"
        }else{
            textarea.style.height = parseInt(textarea.style.height) + dif + "px"
        }
    }
}

/***
 *  Creates placeholders for text in the field
 ***/
function inputPlaceholder (input, color) {

    if (!input) return null;

    /**
    * Webkit browsers already implemented placeholder attribute.
    * This function useless for them.
    */
    if (input.placeholder && 'placeholder' in document.createElement(input.tagName)) return input;

    var placeholder_color = color || '#AAA';
    var default_color = input.style.color;
    var placeholder = input.getAttribute('placeholder');

    if (input.value === '' || input.value == placeholder) {
        input.value = placeholder;
        input.style.color = placeholder_color;
    }

    var add_event = /*@cc_on'attachEvent'||@*/'addEventListener';

    input[add_event](/*@cc_on'on'+@*/'focus', function(){
        input.style.color = default_color;
        if (input.value == placeholder) {
            input.value = '';
        }
    }, false);

    input[add_event](/*@cc_on'on'+@*/'blur', function(){
        if (input.value === '') {
            input.value = placeholder;
            input.style.color = placeholder_color;
        } else {
            input.style.color = default_color;
        }
    }, false);

    input.form && input.form[add_event](/*@cc_on'on'+@*/'submit', function(){
        if (input.value == placeholder) {
            input.value = '';
        }
    }, false);

    return input;
}

/***
 *  Heart and soul of the application -- it ADDS the comment to the database
 ***/
function addEMComment(oid){
    if($('addEmComment').value != $('addEmComment').getAttribute('placeholder')){
        //mark comment box as inactive
        $('addEmComment').disabled = true;
        $('addEmMail').disabled = true;
        $('addEmName').disabled = true;
        $('emAddButton').disabled = true;

        if($('addEmName').value == $('addEmName').getAttribute('placeholder')){
            $('addEmName').value = '';
        }

        if($('addEmMail').value == $('addEmMail').getAttribute('placeholder')){
            $('addEmMail').value = '';
        }

        new Ajax.Request('commentanything/ajax/addComment.php', {
              method: 'post',
              parameters: {
                  comment:      encodeURIComponent($('addEmComment').value),
                  object_id:    oid,
                  sender_name:  encodeURIComponent($('addEmName').value),
                  sender_mail:  encodeURIComponent($('addEmMail').value)
              },

            onSuccess: function(reply) {
                var data = reply.responseText.evalJSON(true);

                $('emContent').insert('<div class="emComment" id="comment_'+data.id+'" style="display: none;"><div class="emCommentImage">'+data.image+'</div><div class="emCommentText">'+data.text+'</div><div class="emCommentInto">'+data.date+'</div></div>');
                $('comment_'+data.id).appear();

                if($('total_em_comments')){
                    $('total_em_comments').innerHTML = data.total;
                }
                resetFields();
            }
        });
    }else{
        $('addEmComment').focus();
    }

    return false;
}

/***
 *  This loads all the comments to the current object id from the database
 ***/
function loadComments(){
    if($('emComments') && $('emComments').getAttribute('object')){
        if(!$('emComments').hasClassName('ignorejsloader')){

            new Ajax.Request('commentanything/ajax/loadComments.php', {
                  method: 'post',
                  parameters: {
                      object_id: $('emComments').getAttribute('object')
                  },

                onSuccess: function(reply) {
                    var data = reply.responseText.evalJSON(true);

                    if(data.dberror){
                        alert("DATABASE ERROR:\n"+data.dberror);
                        return;
                    }

                    $('emComments').innerHTML = data.html;
                    Event.observe('addEmComment', 'keyup', function(){
                        adjustHeight($('addEmComment'));
                    });
                    resetFields();
                }
            });

        }else{
            Event.observe('addEmComment', 'keyup', function(){
                adjustHeight($('addEmComment'));
            });
            resetFields();
        }
    }
}

/***
 *  Clear Add Comment Fields
 ***/
function resetFields(){
    $('addEmComment').value = '';
    $('addEmComment').style.color = '#333';
    $('addEmComment').disabled = false;

    $('addEmName').value = '';
    $('addEmName').style.color = '#333';
    $('addEmName').disabled = false;

    $('addEmMail').value = '';
    $('addEmMail').style.color = '#333';
    $('addEmMail').disabled = false;

    $('emAddButton').disabled = false;
    inputPlaceholder($('addEmComment'));
    inputPlaceholder($('addEmName'));
    inputPlaceholder($('addEmMail'));
    $('addEmComment').style.height = '29px';

}

/***
 *  When there are more than 2 comments they are hidden and can be opened by this function
 ***/
function viewAllComments(){
    var coms = $$('div.emComment');
    for(var i=0; i<coms.length;i++){
        coms[i].show();
    }
    $('emShowAllComments').hide();
}

//OnLoad Stuff
Event.observe(window, 'load', function() {
    loadComments();
});