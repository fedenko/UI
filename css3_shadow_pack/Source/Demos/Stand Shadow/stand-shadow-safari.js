$(function(){
	if( $.browser.safari ){
		$('.StandShadow').each(function(){
			var target = $(this),
				after = $('<div class="after"/>').appendTo(target);
				
			target.addClass('safari');
			
			if( target.hasClass('SSmall') ){
				after.css( '-webkit-border-radius' , target.width()*0.525 +'px/20px');
			}
			else if( target.hasClass('SMedium') ){
				after.css( '-webkit-border-radius' , target.width()*0.55 +'px/20px');
			}
			else if( target.hasClass('SLarge') ){
				after.css( '-webkit-border-radius' , target.width()*0.575 +'px/20px');
			}
		});
	}
});