$(function() {
	jNotice();
});

// Incontent probleem bij IE al je het sluit en terug open is de .description bij login verdwenen
// <div style="overflow: auto;background-color:#99FFFF;height:100%;max-height:100%;display:block;z-index:3">
(function($){
	$.fn.jnotice = function(custom) {
		
		// Default configuration
		var defaults = {
			openClickElement: '',
			toggleClickElement: '',
			closeClickElement: '',
			animation: "none",
			animationSpeed: 200,
			autoClose: 0,
			position: "bottom",
			openNow: false,
			openCallback: '',
			closeCallback: ''
		};
		  
		// Combine user and default configuration
		var settings = $.extend({}, defaults, custom);

		// Main notice box var
		var noticebox = $(this);
		
		// Default hide the notice
		$(this).hide();
		
		// Set extra style settings
		if($.browser.msie){
			$(this).css("position", "absolute");
		}else{
			$(this).css("position", "fixed");
		}

		if(settings.position == "top"){
			$(this).css("top", 0);	
		}else{
			$(this).css("bottom", 0);
		}
		$(this).css("left", 0);
		
		// Fixed header and footer use
		$("body").css("height", "100%");
		$("body").css("max-height", "100%");
		$("body").css("overflow", "hidden");
		$("html").css("height", "100%");
		$("html").css("max-height", "100%");
		$("html").css("overflow", "hidden");
		
		// Make open binding
		if(settings.openClickElement != ""){
			$(settings.openClickElement).bind('click', showNotice);
		}
		
		// Make close binding
		if(settings.closeClickElement != ""){
			$(settings.closeClickElement).bind('click', hideNotice);
		}
		
		// Make close binding
		if(settings.toggleClickElement != ""){
			$(settings.toggleClickElement).bind('click', toggleNotice);
		}
		
		// If direct open
		if(settings.openNow){
			showNotice();	
		}
		
		function showNotice(){
			
			if(settings.animation == "none"){
				noticebox.show();	
				setAutoClose();
			}
			
			if(settings.animation == "slide"){
				noticebox.slideDown(settings.animationSpeed, setAutoClose);
			}
			
			if(settings.animation == "fade"){
				noticebox.fadeIn(settings.animationSpeed, setAutoClose);
			}
			
			if(settings.animation == "size"){
				noticebox.show(settings.animationSpeed , setAutoClose);	
			}
			
		}
		
		function hideNotice(){
			
			// Hide notice box
			if(settings.animation == "none"){
				noticebox.hide();
				setCloseCallback();
			}
			
			if(settings.animation == "slide"){
				noticebox.slideUp(settings.animationSpeed, setCloseCallback);
			}
			
			if(settings.animation == "fade"){
				noticebox.fadeOut(settings.animationSpeed, setCloseCallback);
			}
			
			if(settings.animation == "size"){
				noticebox.hide(settings.animationSpeed , setAutoClose);	
			}
			
		}
		
		function toggleNotice(){
			if((noticebox.css('display')) == 'none'){	
				showNotice();
			}else{
				hideNotice();
			}
		}
		
		function setAutoClose(){
			
			// Handle callback
			if(settings.openCallback != ''){
				settings.openCallback();
			}
			
			if(settings.autoClose > 0){
				// If autoclose is set
				setTimeout( function () { 
					hideNotice();
				}, settings.autoClose);
			}	
		}
		
		function setCloseCallback(){
			if(settings.openCallback != ''){
				settings.closeCallback();
			}
		}
		
		// Return the jQuery object to allow for chainability.
		return this;
		
	}
	
})(jQuery);


function jNotice(){	
	// Wrap content with div
	if($("body").find("#jnotice_wrapper").length == 0){
		var bodycontent = $("body").html();
		$("body").html('<div id="jnotice_wrapper" style="overflow: auto;height:100%;max-height:100%;display:block;z-index:3">' + bodycontent + '<div style="display:block;clear:both;font-size:1px>.</div></div>'); 
	}
}

