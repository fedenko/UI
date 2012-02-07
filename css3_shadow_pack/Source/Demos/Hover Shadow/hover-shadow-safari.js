$(function(){
	if( $.browser.safari ){
		$('.HoverShadow').each(function(){
			var target = $(this),
				after = $('<div class="after"/>').appendTo(target);
				
			target.addClass('safari');
			
			if( target.hasClass('HSmall') ){
				after.css( '-webkit-border-radius' , target.width()*0.4 +'px/10px');
			}
			else if( target.hasClass('HMedium') ){
				after.css( '-webkit-border-radius' , target.width()*0.45 +'px/10px');
			}
			else if( target.hasClass('HLarge') ){
				after.css( '-webkit-border-radius' , target.width()*0.5 +'px/10px');
			}
		});
	}
});