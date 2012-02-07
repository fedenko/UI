<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Google Content Locker</title>
<style type="text/css">

#contentlockerform label{
	display:block;
	margin:10px 0px 5px 0px;
	color:#21759B;
	font-family:Arial, Helvetica, sans-serif;
	font-weight:bold;
	font-size:13px;
	background:url(settings.png) left center no-repeat;
	line-height:20px;
	padding:0 0 0 24px;
}

#contentlockerform .input{
	width:400px;
    background: none repeat scroll 0 0 #F3F3F3;
    border: 1px solid #DDDDDD;
    color: #333333;
    padding: 6px;
	margin:5px 0px 10px 0px;
	font-size:11px;
}

#wpll-insert{
	padding:7px 11px;
	background-color:#444444;
	color:#fff;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	border-radius: 5px;
	font-weight:bold;
	border:0px;
	font-size:12px;
	cursor:pointer;
}

</style>
<script language="javascript" src="../../../wp-includes/js/tinymce/tiny_mce_popup.js"></script>
<script language="javascript" src="../../../wp-includes/js/tinymce/utils/mctabs.js"></script>
<script language="javascript" src="../../../wp-includes/js/tinymce/utils/form_utils.js"></script>
<script language="javascript" type="text/javascript">

	// Start TinyMCE
	function init() {
		tinyMCEPopup.resizeToInnerSize();
	}
	
	// Function to add the like locker shortcode to the editor
	function addLocker(){
		
		// Cache our form vars
		var locker_theme   	= document.getElementById('wpll-theme').value;
		var locker_url	   	= document.getElementById('wpll-url').value;
		var locker_msg 		= document.getElementById('wpll-msg').value;
		
		// If TinyMCE runable
		if(window.tinyMCE) {
			
			// Get the selected text in the editor
			selected = tinyMCE.activeEditor.selection.getContent();
			
			// Send our modified shortcode to the editor with selected content				
			window.tinyMCE.execInstanceCommand('content', 'mceInsertContent', false,  '[google-locker theme="'+locker_theme+'" url="'+locker_url+'" message="'+locker_msg+'"]'+selected+'[/google-locker]');

			// Repaints the editor
			tinyMCEPopup.editor.execCommand('mceRepaint');
			
			// Close the TinyMCE popup
			tinyMCEPopup.close();
			
		} // end if
		
		return; // always R E T U R N

	} // end add like locker function
	
</script>
</head>

<body>


<div class="tabs">
    <ul>
        <li id="thkBC_tab1" class="current"><span><a href="#" onmousedown="return false;">Create Content Locker</a></span></li>
    </ul>
</div>


<div id="thkBC_options" class="panel_wrapper">

    <div id="thkBC_panel" class="panel current" style="height:350px;"><br />
    
        <form method="post" action="" id="contentlockerform">
        
          <label for="wpll-theme">Color Theme</label>
          <select name="wpll-theme" class="input" id="wpll-theme">
            <option value="blue" selected="selected">Blue</option>
            <option value="grey">Grey</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="Yellow">Yellow</option>
            <option value="orange">Orange</option>
            <option value="pink">Pink</option>
          </select>
          
          <label for="wpll-url">URL To &quot;+1&quot; or Share</label>
          <input name="wpll-url" type="text" class="input" id="wpll-url" />
        
          <label for="wpll-msg">Message To Show In Content Locker</label>
          <textarea name="wpll-msg" id="wpll-msg" cols="" rows="5" class="input">+1 This Content on Google To View It!</textarea><br />
          
          <input name="wpll-insert" type="button" id="wpll-insert" value="Insert" onclick="addLocker();" />
          
          <div style="clear:both;"></div>
            
        </form>    
    
    </div>

</div>
    
</body>
</html>