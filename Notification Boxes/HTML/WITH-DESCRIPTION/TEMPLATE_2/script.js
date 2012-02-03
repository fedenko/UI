// JavaScript Document

$(document).ready(function() {
			
			var infoText_slideDown = "More Info"; //Change Text for slide down!
			var infoText_slideUp = "Slide Up!"; //Change Text for slide up!
			
			$('.notification em').text(infoText_slideDown);
	
			$('.notification span').hover(function() {
 				$(this).css('cursor','pointer');
 			}, function() {
 					$(this).css('cursor','auto');
				});
			
			$('.notification span').click(function() {
                $('.notification-wrap').fadeOut(800);
            });
			
			$('.notification em').click(function(){
				if ($(".description").is(":hidden")) {
					$(".description").slideDown("slow", function() {
    					$('.notification em').text(infoText_slideUp); 

  					});
				} else {
					$('.notification em').text(infoText_slideDown);
					$(".description").slideUp("slow");
				}
			});
			
});