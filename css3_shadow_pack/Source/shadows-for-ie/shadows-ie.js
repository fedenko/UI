$(function(){
	if( $.browser.msie ){
		
		//Warp Shadows
		$('.WarpShadow, .RightWarpShadow, .LeftWarpShadow').each(function(){
			var target = $(this),
				before = $('<div class="before" />').appendTo(target),
				after = $('<div class="after" />').appendTo(target),
				center = $('<div class="center" />').appendTo(target);
			
			if( target.hasClass('WarpShadow') || target.hasClass('RightWarpShadow smallBox') || target.hasClass('LeftWarpShadow smallBox') )
				center.width( target.width() - 34 );
			else 
				center.width( target.width() - 14 );				
			
			before.append('<div/>');
			after.append('<div/>');
			
			if( target.hasClass('smallBox') ) {
				before.find('div').transform({ rotate: '8deg', skewX: '4deg' });						
				after.find('div').transform({ rotate: '-8deg', skewX: '-4deg' });
			}
			else {
				before.find('div').transform({ rotate: '4deg', skewX: '4deg' });						
				after.find('div').transform({ rotate: '-4deg', skewX: '-4deg' });
			}
		});
		
		
		//Left & Right Perspective Shadows
		$('.LeftPerspectiveShadow').each(function(){
			var before = $('<div class="before" />').appendTo( $(this) );					
			before.append('<div/>');				
			before.find('div').transform({ skewX: '50deg' });
		});
		
		$('.RightPerspectiveShadow').each(function(){
			var before = $('<div class="before" />').appendTo( $(this) );					
			before.append('<div/>');				
			before.find('div').transform({ skewX: '-50deg' });
		});
		
		
		//Bottom Shadow
		$('.BottomShadow').each(function(){
			var target = $(this),
				before = $('<div class="before" />').appendTo(target),
				after = $('<div class="after" />').appendTo(target),
				center = $('<div class="center" />').appendTo(target);
			
			if( target.hasClass('BSmall') )
				center.width( target.width() - 60 );
			else 
				center.width( target.width() - 80 );
				
			before.append('<div/>');
			after.append('<div/>');
			
			before.find('div').transform({ skewX: '40deg' });						
			after.find('div').transform({ skewX: '-40deg' });
		});
		
		
		//Hover Shadow
		$('.HoverShadow').each(function(){
			var target = $(this),				    
				after = $('<div class="after" />').appendTo(target);
				
			after.append('<div/>');
		});
		
		
		//Stand Shadow
		$('.StandShadow').each(function(){
			var target = $(this),				    
				after = $('<div class="after" />').appendTo(target);
				
			after.append('<div/>');
		});
		
		
		//Fold Shadow
		$('.FoldShadow').each(function(){
			var target = $(this),
				before = $('<div class="before" />').appendTo(target),
				after = $('<div class="after" />').appendTo(target);
			
			before.append('<div/>');
			after.append('<div/>');				
		});	


		//Curl Shadows
		$('.LeftCurlShadow').each(function(){
			var before = $('<div class="before" />').appendTo( $(this) );					
			before.append('<div/>');				
			before.find('div').transform({ rotate: '-4deg', skewX: '4deg' });
		});
		
		$('.RightCurlShadow').each(function(){
			var before = $('<div class="before" />').appendTo( $(this) );					
			before.append('<div/>');				
			before.find('div').transform({ rotate: '4deg', skewX: '-4deg' });
		});
		
	}
});