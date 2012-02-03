// JavaScript Document

$(document).ready(function() {
	
	$('.description p').hide();
	
			$('.notification, .description span').hover(function() {
 				$(this).css('cursor','pointer');
 			}, function() {
 					$(this).css('cursor','auto');
				});
			
			$('.notification span').click(function() {
                $('.notification-wrap').fadeOut(800);
            });
			
			$('.notification').click(function() {
                $('.notification-wrap').fadeOut(800);
            });
			
			$(".description span").click(function(){
	  			$(".description p").slideToggle("slow");
	 		 	$(this).toggleClass("close");
			});
	
});