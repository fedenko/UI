/**
 * Multiple transitions
 * Use different transition for description and image
 * Use whatever type of content to slide. Not only images
 * Support for embeded content sliding
 * 
 */

(function($){
	$.fn.featuredbox = function(custom) {
		var defaults = {
		  	width: 600,
			height: 300,
			slidesAnimation: "slide-top",
			slidesSpeed: "slow",
			descriptionAnimation: "slide-bottom",
			descriptionSpeed: "slow",
			navigationHide: false,
			navigationAnimation: "slide",
			rotateInterval: 6000,
			next: "",
			previous: ""
		};
		var settings 			= $.extend({}, defaults, custom);
		 
		// Variables
		var box 				= this;
		var start_zindex		= 10;
		var current_slide		= "slide1";
		var current_slide_nr	= 1;
		var lock_slide			= false;
		var lock_description	= false;
		var slide_count			= box.find("ul li").length;
		var rotator				= "";
		var description_width	= 0;
		var description_height	= 0;
		var description_top		= 0;
		var description_left	= 0;
		var description_load_interval = "";
		var reloaded_calculation = false;
		
		/** Prepare featured box **/
		
		// Add featured box wrapper
		// In this wrapper we add the navigation block. This way you can show
		// the navigation beside the image
		box.wrapInner('<div class="featuredbox"></div>');
		var box_innner 	= box.find(".featuredbox");
		
		// Add extra divs
		box_innner.append('<div class="description" style="z-index:102"></div>');
		box.append('<div class="navigation" style="z-index:101"></div>');
		box_innner.prepend('<div class="box-slide1" style="z-index:50">qsd</div>');
		box_innner.prepend('<div class="box-slide2" style="z-index:51;display:none">tester</div>');
		
		// Show the box
		box.show();
		
		// Set auto rotate interval
		startRotate();
		
		// Add extra vars
		var description_box = box.find(".description");
		
		// Set z-index
		box.find("ul").addClass("slides");
		box.find("ul li").each(function (i) {
			$(this).hide();
			$(this).addClass("slide" + (i+1));
			start_zindex--;
		});
		
		// Set current image
		if(!$.browser.msie){
			box.find("ul").find("embed").attr("wmode", "transparent");
		}
		box.find(".box-slide1").html(box.find("." + current_slide).children().eq(0).clone());
		
		add_navigate_click_handlers();
		
		// Fix for IE browser
		box.find(".box-slide1").find("embed").attr("wmode", "transparent");

		// Create navigation
		var navigation = "<ul>";
		var first_active = " active";
		for(var i=0 ; i < slide_count ; i++){
			navigation += '<li class="nav' + (i+1) + first_active + '">' + box.find(".slide" + (i+1)).children().eq(2).html() + "</li>";
			first_active = "";
		}
		navigation += "</ul>";
		var navigation_box = box.find(".navigation");
		navigation_box.html(navigation);
		navigation_box.find("li").bind("click", function () { 
			if(!lock_slide && !lock_description){
				var current_click = $(this).attr("class").replace("nav", "").replace(" hover", "").replace(" active", "");
				slidesTransition(current_slide_nr, current_click);
			}
		}).bind("mouseenter",function(){
			$(this).addClass("hover");
		}).bind("mouseleave",function(){
			$(this).removeClass("hover");
		});

		// Set description
		description_box.html(box.find(".slide1").children().eq(1).html());
		
		// Add menu hider
		if(settings.navigationHide){
			box.find(".navigation").hide();
			box.bind("mouseenter",function(){
				box.find(".navigation:not(:animated)").fadeIn("slow");
			}).bind("mouseleave",function(){
				box.find(".navigation").fadeOut("slow");
			});
		}
		
		// Slide transition function
		function slidesTransition(from_nr, to_nr){
			
			// Stop interval timer
			stopRotate();
			
			// Create vars
			var from_slide 		= "slide" + from_nr;
			var to_slide		= "slide" + to_nr;
			
			// Set navigation active
			navigation_box.find("li").removeClass("active");
			navigation_box.find("li.nav" + to_nr).addClass("active");
			
			// If clicked the active slide
			// don't do any animation
			if(from_slide == to_slide){
				return;	
			}
			
			lock_slide			= true;
			lock_description	= true;
			
			// Set box slide 1 to from slide content
			box.find(".box-slide1").html(box.find("." + from_slide).children().eq(0).clone());
			box.find(".box-slide1").show();
			
			box.find(".box-slide2").html(box.find("." + to_slide).children().eq(0).clone());
			box.find(".box-slide2").hide();
			
			add_navigate_click_handlers();
			
			// Fix for IE browser
			box.find(".box-slide1").find("embed").attr("wmode", "transparent");
			box.find(".box-slide2").find("embed").attr("wmode", "transparent");
			
			switch(settings.slidesAnimation){
				case "slide-bottom":
					slideBottomSlidesAnimation();
					break;
				case "slide-top":
					slideTopSlidesAnimation();
					break;
				case "slide-left":
					slideLeftSlidesAnimation();
					break;
				case "slide-right":
					slideRightSlidesAnimation();
					break;
				case "size":
					sizeSlidesAnimation();
					break;
				case "line":
					lineSlidesAnimation();
					break;
				default:
					fadeSlidesAnimation();
					break;
			}
			
			var new_description_content = box.find("." + to_slide).children().eq(1).html();
			switch(settings.descriptionAnimation){
				case "slide-bottom":
					slideBottomDescriptionAnimation(new_description_content);
					break;
				case "slide-top":
					slideTopDescriptionAnimation(new_description_content);
					break;
				case "slide-left":
					slideLeftDescriptionAnimation(new_description_content);
					break;
				case "slide-right":
					slideRightDescriptionAnimation(new_description_content);
					break;
				default:
					fadeDescriptionAnimation(new_description_content);
					break;
			}
			
			// Set current slide
			current_slide = "slide" + to_nr;
			current_slide_nr = to_nr;

		}
		
		// Start rotate interval
		function startRotate(){
			if(settings.rotateInterval > 0 && settings.rotateInterval != "undefined"){
				rotator = setInterval(rotate, settings.rotateInterval);	
			}	
		}
		
		// Stop rotate interval
		function stopRotate(){
			window.clearInterval(rotator);
		}
		
		// Rotate trough slides
		function rotate(){
			// Calculate next slide
			var next_slide_nr = (current_slide_nr+1) > slide_count ? 1 : (current_slide_nr+1);
			slidesTransition(current_slide_nr, next_slide_nr);
		}
		
		// Rotate back trough slides
		function rotate_back(){
			// Calculate pervious slide
			var next_slide_nr = (current_slide_nr-1) < 1 ? slide_count : (current_slide_nr-1);
			slidesTransition(current_slide_nr, next_slide_nr);
		}
		
		/** Slide transitions **/
		function fadeSlidesAnimation(){
			box.find(".box-slide2").fadeIn(settings.slidesSpeed, unlock_slide);
		}
		
		function slideBottomSlidesAnimation(){
			box.find(".box-slide2").css("top", settings.height);
			box.find(".box-slide2").show();
			box.find(".box-slide2").animate({ top : "0px" }, settings.slidesSpeed, null, unlock_slide);
		}
		
		function slideTopSlidesAnimation(){
			box.find(".box-slide2").css("top", -settings.height);
			box.find(".box-slide2").show();
			box.find(".box-slide2").animate({ top : "0px" }, settings.slidesSpeed, null, unlock_slide);
		}
		
		function slideLeftSlidesAnimation(){
			box.find(".box-slide2").css("left", -settings.width);
			box.find(".box-slide2").show();
			box.find(".box-slide2").animate({ left : "0px" }, settings.slidesSpeed, null, unlock_slide);
		}
		
		function slideRightSlidesAnimation(){
			box.find(".box-slide2").css("left", settings.width);
			box.find(".box-slide2").show();
			box.find(".box-slide2").animate({ left : "0px" }, settings.slidesSpeed, null, unlock_slide);
		}
		
		function sizeSlidesAnimation(){
			box.find(".box-slide2").show(settings.slidesSpeed, unlock_slide);
		}
		
		function lineSlidesAnimation(){
			box.find(".box-slide2").css("left", settings.width);
			box.find(".box-slide2").show();
			box.find(".box-slide2").animate({ left : "0px" }, settings.slidesSpeed);
			box.find(".box-slide1").animate({ left : -settings.width+"px" }, settings.slidesSpeed, null, function(){
				//box.find(".box-slide2").css("left", 0);		
				box.find(".box-slide1").css("left", 0);
				unlock_slide();
			});
		}
		
		/** Description transitions **/
		function fadeDescriptionAnimation(new_content){
			var description_box = box.find(".description");
			description_box.fadeOut(settings.descriptionSpeed, function(){
				if(new_content == "" || new_content == "undefined"){ 
					description_box.hide();
					unlock_description();
				}else{
					description_box.html(new_content);
					description_box.fadeIn(settings.descriptionSpeed, unlock_description);	
				}
			});
		}
		
		function slideBottomDescriptionAnimation(new_content){
			description_box.animate({ top : settings.height + description_height + "px" }, settings.descriptionSpeed, null,
			function(){
				if(new_content == "" || new_content == "undefined"){ 
					description_box.hide();
				}else{
					description_box.show();
				}
				description_box.html(new_content);
				description_box.animate({ top : description_top + "px" }, settings.descriptionSpeed, null, unlock_description);												
			});
		}
		
		function slideTopDescriptionAnimation(new_content){
			description_box.animate({ top : "-" + description_height + "px" }, settings.descriptionSpeed, null, function(){
				if(new_content == "" || new_content == "undefined"){ 
					description_box.hide();
				}else{
					description_box.show();
				}
				description_box.html(new_content);
				description_box.animate({ top : description_top + "px" }, settings.descriptionSpeed, null, unlock_description);												
			});
		}
		
		function slideLeftDescriptionAnimation(new_content){
			description_box.animate({ left : "-" + description_width + "px" }, settings.descriptionSpeed, null, function(){
				if(new_content == "" || new_content == "undefined"){ 
					description_box.hide();
				}else{
					description_box.show();
				}
				description_box.html(new_content);
				description_box.animate({ left : description_left + "px" }, settings.descriptionSpeed, null, unlock_description);												
			});
		}
		
		function slideRightDescriptionAnimation(new_content){
			description_box.animate({ left : settings.width + description_width + "px" }, settings.descriptionSpeed, null, function(){
				if(new_content == "" || new_content == "undefined"){ 
					description_box.hide();
				}else{
					description_box.show();
				}
				description_box.html(new_content);
				description_box.animate({ left : description_left + "px" }, settings.descriptionSpeed, null, unlock_description);												
			});
		}
		
		/** Extra functions **/
		
		function unlock_description(){
			lock_description = false;
			is_unlocked();
		}
		
		function unlock_slide(){
			lock_slide = false;	
			is_unlocked();
		}
		
		function is_unlocked(){
			if(!lock_description && !lock_slide){
				startRotate();	
			}
		}
		
		function add_navigate_click_handlers(){
			// Add next click handler
			if(settings.next != ""){
				box.find(settings.next).bind("click", function(){ 
					if(!lock_description && !lock_slide){
						rotate();	
					}
				});
			}	
			
			// Add previous click handler
			if(settings.previous != ""){
				box.find(settings.previous).bind("click", function(){ 
					if(!lock_description && !lock_slide){
						rotate_back();	
					}
				});
			}
		}
		
		
		function calc_description_box_position(){
			window.clearInterval(description_load_interval);

			// Description size
			calc_description_box_size();

			// Calculate description top
			description_top =  parseInt(description_box.css("top").replace("px", ""));
			
			// Calculate description left
			description_left =  parseInt(description_box.css("left").replace("px", ""));
			
			if(isNaN(description_left)){
				description_box.hide();	
				description_load_interval = setInterval(calc_description_box_position, 200);	
			}else{
				description_box.fadeIn("fast");
				if(!reloaded_calculation){
					reloaded_calculation = true;
					calc_description_box_position();
				}
			}
		}
		
		function calc_description_box_size(){
			// Calculate description box height
			description_height = parseInt(description_box.css("padding-top").replace("px", "")) + 
								parseInt(description_box.css("padding-bottom").replace("px", "")) + 
								parseInt(description_box.css("height").replace("px", ""));
			
			description_width = parseInt(description_box.css("padding-left").replace("px", "")) + 
								parseInt(description_box.css("padding-right").replace("px", "")) + 
								parseInt(description_box.css("width").replace("px", ""));	
		}
		
		calc_description_box_position();
		
		// returns the jQuery object to allow for chainability.
		return this;
	}
	
})(jQuery);
