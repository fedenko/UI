$(function(){
	if( $.browser.safari ){
		$('.FoldShadow').each(function(){
			var target = $(this),
				before = $('<div class="before"/>').appendTo(target),
				after = $('<div class="after"/>').appendTo(target);
				
			target.addClass('safari');
			
			before.css( '-webkit-border-radius' , target.width()*0.155 +'px/30px');
			after.css( '-webkit-border-radius' , target.width()*0.48 +'px/30px');
			
		});
	}
});