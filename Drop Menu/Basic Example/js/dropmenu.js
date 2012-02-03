
(function($){
	$.fn.dropmenu = function(custom) {
		var defaults = {
		  	openAnimation: "slide",
			closeAnimation: "slide",
			openClick: false,
			openSpeed: 500,
			closeSpeed: 700,
			closeDelay:500,
			onHide: function(){},
			onHidden: function(){},
			onShow: function(){},
			onShown: function(){}
		  };
		var settings = $.extend({}, defaults, custom);
		
		var menu = this;
		var currentPage = 0;
		var delayTimer = "";
		
		// Trigger init
		init();
		
		/**
		 * Do preparation work
		 */
		function init(){

			// Add open button and class to parent of a submenu
			var items = menu.find(":has(li,div) > a").append('<span class="arrow"></span>');
			$.each(items, function(i, val) {
				if(items.eq(i).parent().is("li")){
					items.eq(i).next().addClass("submenu").parent().addClass("haschildren");
				}else{
					items.eq(i).parent().find("ul").show();
				}
			});
			
			if(settings.openClick){
				menu.find(".submenu").css("display", "none");
				menu.find(":has(li,div) > a").parent().bind("mouseleave",handleHover).bind("mouseenter",function(){ window.clearInterval(delayTimer); });
				menu.find("a span.arrow").bind("click", handleHover);
			}else{
				menu.find(":has(li,div) > a").bind("mouseenter",handleHover).parent().bind("mouseleave",handleHover).bind("mouseenter",function(){ window.clearInterval(delayTimer); });
			}
			
			
		}
		
		/**
		 * Handle mouse hover action
		 */
		function handleHover(e){
			if(e.type == "mouseenter" || e.type == "click"){
				window.clearInterval(delayTimer);
				var current_submenu = $(e.target).parent().find(".submenu:not(:animated):not(.open)");
				if(current_submenu.html() == null){
					current_submenu = $(e.target).parent().next(".submenu:not(:animated):not(.open)");
				}
				if(current_submenu.html() != null){
					settings.onShow.call(current_submenu);
					closeAllMenus();
					current_submenu.prev().addClass("selected");
					current_submenu.css("z-index", "90");
					current_submenu.stop().hide();
					openMenu(current_submenu);
				}
			}
			if(e.type == "mouseleave" || e.type == "mouseout"){
				current_submenu = $(e.target).parents(".submenu");
				if(current_submenu.length != 1){
					var current_submenu = $(e.target).parent().parent().find(".submenu");
					if(current_submenu.html() == null){
						var current_submenu = $(e.target).parent().find(".submenu");
						if(current_submenu.html() == null){
							var current_submenu = $(e.target).parent().parent().parent().find(".submenu");
						}
					}
				}
				if(current_submenu.html() != null){
					if(settings.closeDelay == 0){
						current_submenu.parent().find("a").removeClass("selected");
						closeMenu(current_submenu);
					}else{
						window.clearInterval(delayTimer);
						delayTimer = setInterval(function(){
							window.clearInterval(delayTimer);
							closeMenu(current_submenu);
						}, settings.closeDelay);	
					}
				}
			}
		}
		
		function openMenu(object){
			switch(settings.openAnimation){
				case "slide":
					openSlideAnimation(object);
					break;
				case "fade":
					openFadeAnimation(object);
					break;
				default:
					openSizeAnimation(object);
					break;
			}
		}
		
		function openSlideAnimation(object){
			object.addClass("open").slideDown(settings.openSpeed, function(){ settings.onShown.call(this); });
		}
		
		function openFadeAnimation(object){
			object.addClass("open").fadeIn(settings.openSpeed, function(){ settings.onShown.call(this); });
		}
		
		function openSizeAnimation(object){
			object.addClass("open").show(settings.openSpeed, function(){ settings.onShown.call(this); });
		}
		
		function closeMenu(object){
			settings.onHide.call(object);
			switch(settings.closeAnimation){
				case "slide":
					closeSlideAnimation(object);
					break;
				case "fade":
					closeFadeAnimation(object);
					break;
				default:
					closeSizeAnimation(object);
					break;
			}
		}
		
		function closeSlideAnimation(object){
			object.slideUp(settings.closeSpeed, closeCallback);
		}
		
		function closeFadeAnimation(object){
			object.fadeOut(settings.closeSpeed, function(){ $(this).removeClass("open"); $(this).prev().removeClass("selected"); });
		}
		
		function closeSizeAnimation(object){
			object.hide(settings.closeSpeed, function(){ $(this).removeClass("open"); $(this).prev().removeClass("selected"); });
		}
		
		function closeAllMenus(){
			var submenus = menu.find(".submenu.open");
			$.each(submenus, function(i, val) {
				$(submenus[i]).css("z-index", "1");
				closeMenu($(submenus[i]));
			});
		}
		
		function closeCallback(object){
			$(this).removeClass("open"); 
			if($(this).prev().attr("class") == "selected") settings.onHidden.call(this);
			$(this).prev().removeClass("selected");
		}
			
		// returns the jQuery object to allow for chainability.
		return this;
	}
	
})(jQuery);
