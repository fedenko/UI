/*
 * Sliding Tabs 1.0.3 - jQuery Plugin
 * Copyright 2010, Christian André
 *
 * You need to buy a license if you want to use this script.
 * http://codecanyon.net/wiki/buying/howto-buying/licensing/
 *
 */
 
(function($) { 
 
	$.fn.slideTabs = function(options) {
		var opts = $.extend(true, {}, $.fn.slideTabs.defaults, options);	
		
		this.each(function() {				
			var container = $(this),
				tabs = container.find(opts.tabsList),
				content = container.find(opts.viewContainer),
				next = container.find(opts.btnNext),
				prev = container.find(opts.btnPrev),								
				activeElem = tabs.children("li").find("."+opts.activeTabClass);						
									
			// Hide the overflowing content
			content.css({overflow: "hidden"});
			
			// Set the first tab element to 'active' if none is found
			if (!activeElem.length) {			
				activeElem = tabs.find("a:first").addClass(opts.activeTabClass);				
			}						
			
			// Show the active tab's content													
			content.children(activeElem.attr("href")).addClass(opts.activeViewClass);																		
			
			// Set the view div styles according to the content animation option
			content.children("div").css({position: "absolute"});
			
			switch(opts.contentAnim) {
				case "slideLeft": 										
					content.children("div:not(."+opts.activeViewClass+")").css({left: content.parent("div").outerWidth(true)});
					break;
				case "slideRight":					
					content.children("div:not(."+opts.activeViewClass+")").css({left: -content.parent("div").outerWidth(true)});  
					break;
				case "slideUp":					
					content.children("div:not(."+opts.activeViewClass+")").css({top: content.parent("div").outerHeight(true)});
					break;
				case "slideDown":					
					content.children("div:not(."+opts.activeViewClass+")").css({top: -content.parent("div").outerHeight(true)});
					break;
				default:					
					content.children("div:not(."+opts.activeViewClass+")").hide();
			}
			
			activeElem = activeElem.parent("li");				
								
			// Get the values needed to get the total height/width of the tabs			
			var lastElem = tabs.children("li:last"),									
				lastElemD,
				lastElemP = lastElem.position(),			
				activeElemD,
				activeElemP,
				elemMargin = 0;														
							
			if (opts.orientation == "horizontal") {						
				lastElemD = lastElem.outerWidth(true);
					
				// If the total length exceeds the container width, show the links
				if ((lastElemD + lastElemP.left) > opts.slideWidth) {				
					prev.show();
					next.show();																
									
					activeElemD = activeElem.outerWidth(true),
					activeElemP = activeElem.position();				
					
					// Find the active element's position
					if (activeElemP.left > opts.slideWidth) {
						elemMargin += activeElemD + (activeElemP.left - opts.slideWidth);							
						elemMargin = (elemMargin + opts.offsetRight);						
					} else if ((activeElemP.left + activeElemD) > opts.slideWidth) {
						elemMargin += activeElemD - (opts.slideWidth - activeElemP.left);						
						elemMargin = (elemMargin + opts.offsetRight);
					} else {
						elemMargin = (elemMargin - opts.offsetLeft);
					}
																																	
					// Set the active element's position					
					tabs.css({marginLeft: -+elemMargin});																
					
					// Deactivate the arrow button if the tab element is at the beginning or end of the list								
					if(tabs.children("li:first").position().left == 0 + opts.offsetLeft)				
						prev.addClass(opts.btnDisabledClass);												
					if(tabs.children("li:last").position().left + lastElem.outerWidth(true) == opts.slideWidth - opts.offsetRight)					
						next.addClass(opts.btnDisabledClass);		
				}		
			} else {			
				lastElemD = lastElem.outerHeight(true);
							
				// If the total height exceeds the container height, show the links
				if ((lastElemD + lastElemP.top) > opts.slideHeight) {				
					prev.show();
					next.show();
					
					activeElemD = activeElem.outerHeight(true),
					activeElemP = activeElem.position();					
					
					// Find the active element's position
					if (activeElemP.top > opts.slideHeight) {
						elemMargin += activeElemD + (activeElemP.top - opts.slideHeight);
						elemMargin = (elemMargin + opts.offsetBottom);
					} else if ((activeElemP.top + activeElemD) > opts.slideHeight) {
						elemMargin += activeElemD - (opts.slideHeight - activeElemP.top);
						elemMargin = (elemMargin + opts.offsetBottom);
					} else {
						elemMargin = (elemMargin - opts.offsetTop);
					}									
					
					// Set the active element's position					
					tabs.css({marginTop: -+elemMargin});
									
					// Deactivate the arrow button if the tab element is at the beginning or end of the list								
					if (tabs.children("li:first").position().top == 0 + opts.offsetTop) 						
						prev.addClass(opts.btnDisabledClass);												
					if (tabs.children("li:last").position().top + lastElem.outerHeight(true) == opts.slideHeight - opts.offsetBottom)						
						next.addClass(opts.btnDisabledClass);		
				}
			}
			
			var tab, elem, elemD, elemP = 0, prevElem, prevElemPos = 0, elemHidden = 0, activeView, view;
			
			/* 
			 * Tab links
			 */			
			tabs.find("li a."+opts.tabClass).live("click", function() {
				tab = $(this);
				// Return false if an animation is running				
				if($(":animated").length || tab.hasClass(opts.activeTabClass))
					return false;						
				
				elem = tab.parent('li');						
				elemP = elem.position();						
				
				// Set new active state							
				tabs.children("li").find("a."+opts.activeTabClass).removeClass(opts.activeTabClass);					
				tab.addClass(opts.activeTabClass);
							
				if (opts.orientation == "horizontal") {			
					elemD = elem.outerWidth(true);								
					
					// Find the clicked elements position and show the arrow buttons accordingly
					if (elemP.left < 0 + opts.offsetLeft) {			
						prevElemPos = elem.next().position();
						elemHidden = (elemD - prevElemPos.left);							
						elemMargin = elemMargin - elemHidden - opts.offsetLeft;													
																		
						next.removeClass(opts.btnDisabledClass); 		
					} else if ((elemD + elemP.left) > opts.slideWidth - opts.offsetRight) {								
						elemMargin += elemD - (opts.slideWidth - elemP.left - opts.offsetRight);
																		
						prev.removeClass(opts.btnDisabledClass); 	
					}
							
					// Animate tabs with the new value					
					tabs.animate({marginLeft: -+elemMargin}, opts.tabsAnimTime, opts.tabsEasing);
				} else {
					elemD = elem.outerHeight(true);								
					
					// Find the clicked elements position and show the arrow buttons accordingly
					if (elemP.top < 0 + opts.offsetTop) {	
						prevElemPos = elem.next().position();
						elemHidden = (elemD - prevElemPos.top);							
						elemMargin = elemMargin - elemHidden - opts.offsetTop;
																		
						next.removeClass(opts.btnDisabledClass); 		
					} else if ((elemD + elemP.top) > opts.slideHeight - opts.offsetBottom) {			
						elemMargin += elemD - (opts.slideHeight - elemP.top - opts.offsetBottom);
																		
						prev.removeClass(opts.btnDisabledClass); 
					}								
							
					// Animate tabs with the new value					
					tabs.animate({marginTop: -+elemMargin}, opts.tabsAnimTime, opts.tabsEasing);
				}
				
				// Sett prev/next link styles				
				if(elem.is(":first-child")) 					
					prev.addClass(opts.btnDisabledClass);  
				if(elem.is(":last-child")) 					
					next.addClass(opts.btnDisabledClass);
											
				activeView = content.children("div."+opts.activeViewClass);				
				view = content.children("div#"+tab.attr("hash"));								
				
				// Show/animate the clicked tab's content into view	
				switch(opts.contentAnim) {
					case "fade": 
						fade();
						break;
					case "slideLeft": 					
						slideLeft();
						break;
					case "slideRight":
						slideRight();
						break;
					case "slideUp":
						slideUp();
						break;
					case "slideDown":
						slideDown();
						break;
					default:
						activeView.hide();				
						view.show();		
				}						
				
				// Add/remove active classes							
				activeView.removeClass(opts.activeViewClass);													
				view.addClass(opts.activeViewClass);						
				
				return false;
			});		
			
			/* 
			 * Transition functions
			 */
			function fade() {
				activeView.fadeOut(opts.contentAnimTime, function() {														
					view.fadeIn(opts.contentAnimTime);														
				});												
			}; 
			 
			function slideLeft() {
				activeView.animate({left: -container.outerWidth(true)+"px"}, opts.contentAnimTime, opts.contentEasing);												
							
				view.css({display: "block"}).animate({left: 0}, opts.contentAnimTime, opts.contentEasing, function() {				
					activeView.css({display: "none", left: container.outerWidth(true)});				
				});
			};
			
			function slideRight() {
				activeView.animate({left: container.outerWidth(true)+"px"}, opts.contentAnimTime, opts.contentEasing);												
							
				view.css({display: "block"}).animate({left: 0}, opts.contentAnimTime, opts.contentEasing, function() {				
					activeView.css({display: "none", left: -container.outerWidth(true)});				
				});
			};
			
			function slideUp() {
				activeView.animate({top: -container.outerHeight(true)+"px"}, opts.contentAnimTime, opts.contentEasing);
												
				view.css({display: "block"}).animate({top: 0}, opts.contentAnimTime, opts.contentEasing, function() {				
					activeView.css({display: "none", top: container.outerHeight(true)});											
				});		
			
			};
			
			function slideDown() {
				activeView.animate({top: container.outerHeight(true)+"px"}, opts.contentAnimTime, opts.contentEasing);
												
				view.css({display: "block"}).animate({top: 0}, opts.contentAnimTime, opts.contentEasing, function() {				
					activeView.css({display: "none", top: -container.outerHeight(true)});												
				});		
			};
					
			/* 
			 * Next tab function
			 */		 						
			function nextTab() {					
				// Return false if an animation is running
				if ($(":animated").length)
					return false;											
				
				if (opts.orientation == "horizontal") {			
					// Find the element and set the margin					
					tabs.children("li").each(function() {						
						elem = $(this);
						elemP = elem.position().left;																																										
														
						if ((elemP + elem.outerWidth(true)) > opts.slideWidth - opts.offsetRight) {																																				
							elemHidden = (opts.slideWidth - elemP);																																													
							elemMargin += elem.outerWidth(true) - elemHidden + opts.offsetRight;
							
							return false;
						}
																							
					});																		
					
					// Animate with the new value			
					tabs.animate({marginLeft: -+elemMargin}, opts.tabsAnimTime, opts.tabsEasing);				
				} else {
					// Find the element and set the margin					
					tabs.children("li").each(function() {						
						elem = $(this);
						elemP = elem.position().top;																			
									
						if ((elemP + elem.outerHeight(true)) > opts.slideHeight - opts.offsetBottom) {																																						
							elemHidden = (opts.slideHeight - elemP);																																							
							elemMargin += elem.outerHeight(true) - elemHidden + opts.offsetBottom;
							
							return false;
						}
					});								
					
					// Animate with the new value			
					tabs.animate({marginTop: -+elemMargin}, opts.tabsAnimTime, opts.tabsEasing);	
				}						
						
				// Show the prev link								
				prev.removeClass(opts.btnDisabledClass);  		
				
				// Deactivate the next link at the last tab				
				if(elem.is(":last-child")) 					
					next.addClass(opts.btnDisabledClass);  						
			};
			
			/* 
			 * Previous tab function
			 */						
			function prevTab() {					
				// Return false if an animation is running
				if ($(":animated").length)			
					return false;						
							
				if (opts.orientation == "horizontal") {	
					// Find the element and set the margin 			
					tabs.children("li").each(function() {	
						prevElem = $(this);
						prevElemPos = prevElem.position().left;														
						
						if (prevElemPos >= 0 + opts.offsetLeft) {																			
							elemHidden = (prevElem.prev().outerWidth(true) - prevElemPos);											
							elemMargin = elemMargin - elemHidden - opts.offsetLeft;														
							
							return false;
						}													
												
					});																																			
								
					// Animate with the new value					
					tabs.animate({marginLeft: -+elemMargin}, opts.tabsAnimTime, opts.tabsEasing);	
				} else {
					// Find the element and set the margin 			
					tabs.children("li").each(function() {	
						prevElem = $(this);
						prevElemPos = prevElem.position().top;	
									
						if (prevElemPos >= 0 + opts.offsetTop) {																				
							elemHidden = (prevElem.prev().outerHeight(true) - prevElemPos);				
							elemMargin = elemMargin - elemHidden - opts.offsetTop;															
							
							return false;
						}													
												
					});																						
					
					// Animate with the new value					
					tabs.animate({marginTop: -+elemMargin}, opts.tabsAnimTime, opts.tabsEasing);	
				}						
				
				// Show the next link				
				next.removeClass(opts.btnDisabledClass);  						
				
				// Deactivate prev button if showing the first tab				
				if(prevElem.prev().is(":first-child")) 					
					prev.addClass(opts.btnDisabledClass);  														
			};		
			
			// Bind prev/next click events		
			next.bind("click", function() {				
				nextTab();
				return false;
			});
			
			prev.bind("click", function() {		
				prevTab();
				return false;
			});
			
			// Bind mouse scroll wheel events				
			if (opts.scrollTabs == true) {				
				tabs.mousewheel(function(event, delta) {
					if (delta > 0) prevTab();
					else if (delta < 0) nextTab();
					return false; // Prevents default scrolling
				});
			}			
		});
		
		return this;
	};

	// default options
	$.fn.slideTabs.defaults = {
		btnNext: "a#next",
		btnPrev: "a#prev",
		tabsList: "ul#tabs",
		viewContainer: "div#view_container",		
		tabClass: "tab",
		activeTabClass: "active",
		activeViewClass: "active_view",
		btnDisabledClass: "disabled",
		orientation: "horizontal",
		slideWidth: 694,
		slideHeight: 300,		
		offsetLeft: 0,		
		offsetRight: 0,
		offsetTop: 0,
		offsetBottom: 0,		
		contentAnim: "slideLeft",
		tabsEasing: "",
		contentEasing: "easeInOutExpo",
		tabsAnimTime: 300,
		contentAnimTime: 600,		
		scrollTabs: true
	};

})(jQuery);