/* http://www.2crossmedia.com
   living elements for jQuery 
   Written by 2crossmedia (info{at}2crossmedia.com) april 2010.
*/




jQuery.log = function(message) {
  if(window.console) {
     console.log(message);
  } else {
     //alert(message);
  }
};


(function($) {
 
   $.fn.livingElements = function(mask_url, settings) {
     var config = {
     	background: '#33CCFF',
     	easing: 'swing',
     	delay: 0,
     	disableIE6: false,
     	startOnLoad: false,
     	triggerElementSelector: null,
     	triggerElementStartEvent: 'focus', // values: focus, blur
     	triggerElementStopEvent: 'blur', // focus, blur
     	preAnimationStartOpacity: null,
     	preAnimationDuration: 500,
     	mainAnimationFade: true, // false: move
     	mainAnimationStartOpacity: 1,
     	mainAnimationEndOpacity: 0,
     	mainAnimationScrollDirection: 'horizontal',
     	mainAnimationStartBackgroundPositionX: 0,
     	mainAnimationStartBackgroundPositionY: 0,
     	mainAnimationEndBackgroundPositionX: null,
     	mainAnimationEndBackgroundPositionY: null,
     	mainAnimationContinous: true,
     	mainAnimationDuration: 1000,     	
     	mainAnimationSoftEndDuration: null,
     	postAnimationEndOpacity: null,
     	postAnimationDuration: 500     	
     	};
 
     if (settings) $.extend(config, settings);
     
     config.averageOpacity = (config.mainAnimationStartOpacity + config.mainAnimationEndOpacity)/2;
     var activeFunction;
     
     // IE 6 & 5.5 detection
     var ie55 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 5.5") != -1);
		 var ie6 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 6.0") != -1);
     
     if((ie55 || ie6) && config.disableIE6) return this;
    	
     this.each(function() {
     	 var params = {
     	 		elementWidth : $(this).outerWidth(),
     	 		elementHeight: $(this).outerHeight(),
     	 		mainAnimationStartBackgroundPositionX: config.mainAnimationStartBackgroundPositionX,
     	 		mainAnimationStartBackgroundPositionY: config.mainAnimationStartBackgroundPositionY
     	 	};
     	 
     	 if(config.mainAnimationEndBackgroundPositionX === null){
     	 	if(config.mainAnimationScrollDirection == 'horizontal') params.mainAnimationEndBackgroundPositionX = params.elementWidth;
     		else params.mainAnimationEndBackgroundPositionX = params.mainAnimationStartBackgroundPositionX;
     	 }
     	 else params.mainAnimationEndBackgroundPositionX = config.mainAnimationEndBackgroundPositionX;
     	 if(config.mainAnimationEndBackgroundPositionY === null)
     	 	if(config.mainAnimationScrollDirection == 'horizontal') params.mainAnimationEndBackgroundPositionY = params.mainAnimationStartBackgroundPositionY;
     		else params.mainAnimationEndBackgroundPositionY = params.elementHeight;
     	 else params.mainAnimationEndBackgroundPositionY = config.mainAnimationEndBackgroundPositionY;
     	 
     	 params.averageBackgroundPositionX = (params.mainAnimationStartBackgroundPositionX + params.mainAnimationEndBackgroundPositionX)/2;
     	 params.averageBackgroundPositionY = (params.mainAnimationStartBackgroundPositionY + params.mainAnimationEndBackgroundPositionY)/2;
     	 
       if($(this).css('position') == 'static') $(this).css('position', 'relative');
       $(this).children().css('position', 'absolute');       
       var maskElement = $(this).clone().empty().css('position', 'absolute').css('background', 'url('+mask_url+')').css('width', params.elementWidth).css('height', params.elementHeight).attr('class', '').prependTo(this);
       var backgroundElement = maskElement.clone().css('background', config.background).css('backgroundPosition', params.mainAnimationStartBackgroundPositionX+'px '+params.mainAnimationStartBackgroundPositionY+'px').prependTo(this);
       if(config.preAnimationStartOpacity !== null) backgroundElement.css('opacity', config.preAnimationStartOpacity);
       else backgroundElement.css('opacity', config.mainAnimationStartOpacity);
       
       // IE 6 & 5.5 PNG fix
			 if(ie55 || ie6){
			 		$.each([maskElement], function(i, elem) { 
				     	var bgImage = elem.css('background-image');
							if(bgImage.indexOf(".png")!=-1){
								var imageSrc = bgImage.split('url("')[1].split('")')[0];
								elem.css('background-image', 'none');
								elem.get(0).runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='images/input-mask.png',sizingMethod='scale')";								
							}
					});
			 }
			 
       if(config.triggerElementSelector == null || config.startOnLoad){       
	       startAnimation(backgroundElement, config, params);
		   }
		   
		   if(config.triggerElementSelector != null){
			   $(this).children(config.triggerElementSelector).focus(function(){
			     	if(config.triggerElementStartEvent == 'focus')startAnimation(backgroundElement, config, params);
			     	else if(config.triggerElementStopEvent == 'focus')endAnimation(backgroundElement, config, params);
			  	});
			  	
			  	$(this).children(config.triggerElementSelector).blur(function(){
				    if(config.triggerElementStartEvent == 'blur')startAnimation(backgroundElement, config, params);
			     	else if(config.triggerElementStopEvent == 'blur')endAnimation(backgroundElement, config, params);
			  	});
			 }
     
     }); // end this.each()
 
     return this;
     
     // functions
     function startAnimation(elem, config, params){
     	if(config.preAnimationStartOpacity !== null){
			   		activeFunction = window.setTimeout(function(){
			   			$.log(config.mainAnimationStartOpacity);
			     		elem.stop(true).animate({'opacity': config.mainAnimationStartOpacity}, config.preAnimationDuration, config.easing);
			     	}, config.delay);
			    }
		     	activeFunction = window.setTimeout(function(){
		     		_animateMask(elem, config, params);
		     		}, config.preAnimationDuration+config.delay);	
     }
     
     function endAnimation(elem, config, params){
     			window.clearTimeout(activeFunction);
		   		if(config.mainAnimationFade){
			     	if(config.mainAnimationSoftEndDuration != null)elem.stop(true).animate({'opacity': config.mainAnimationStartOpacity}, config.mainAnimationSoftEndDuration, config.easing);
			     	else elem.stop(true).css('opacity', config.mainAnimationStartOpacity);
			    }else{
			    	if(config.mainAnimationSoftEndDuration != null){
				    	elem.stop(true).animate(
								{backgroundPosition:'('+params.mainAnimationStartBackgroundPositionX+'px '+params.mainAnimationStartBackgroundPositionY+'px)'}, 
								config.mainAnimationSoftEndDuration,
								config.easing);
						}/*else{
							elem.stop(true).css('backgroundPosition', params.mainAnimationStartBackgroundPositionX+'px '+params.mainAnimationStartBackgroundPositionY+'px');
						}*/
			    }
			    if(config.postAnimationEndOpacity != null){
				    activeFunction = window.setTimeout(function(){
			     		elem.stop(true).animate({'opacity': config.postAnimationEndOpacity}, config.postAnimationDuration, config.easing);
			     		
			     		window.setTimeout(function(){
				     		elem.stop(true).css('backgroundPosition', params.mainAnimationStartBackgroundPositionX+'px '+params.mainAnimationStartBackgroundPositionY+'px');
				     	},config.postAnimationDuration);
				     	
			     	},config.mainAnimationSoftEndDuration);
			    }
		 }
		 
     function _animateMask(elem, config, params){
     	$.log($(elem).css('backgroundPosition'));
     	if(config.mainAnimationFade){
     		if((config.mainAnimationStartOpacity <= config.mainAnimationEndOpacity && parseFloat(elem.css('opacity')) > config.averageOpacity) || (config.mainAnimationStartOpacity >= config.mainAnimationEndOpacity && parseFloat(elem.css('opacity')) < config.averageOpacity)){
     			elem.stop(true).animate({'opacity': config.mainAnimationStartOpacity}, config.mainAnimationDuration, config.easing)
     		}
     		else{
     			elem.stop(true).animate({'opacity': config.mainAnimationEndOpacity}, config.mainAnimationDuration, config.easing)
     		}
     	}else{     		
     		var currentBackgroundPositionX;
     		var currentBackgroundPositionY; 
     		if($(elem).css('backgroundPosition') == '0% 0%'){
     			currentBackgroundPositionX = 0;
     		  currentBackgroundPositionY = 0;
     		}
     		else{
     			var bgpArray = $(elem).css('backgroundPosition').split('px');
     			currentBackgroundPositionX = parseFloat(bgpArray[0]);
     		  currentBackgroundPositionY = parseFloat(bgpArray[1]);;
     		}
     		
     		if((params.mainAnimationEndBackgroundPositionX >= params.mainAnimationStartBackgroundPositionX && currentBackgroundPositionX > params.averageBackgroundPositionX) ||
     		   (params.mainAnimationEndBackgroundPositionX <= params.mainAnimationStartBackgroundPositionX && currentBackgroundPositionX < params.averageBackgroundPositionX) ||
     		   (params.mainAnimationEndBackgroundPositionY >= params.mainAnimationStartBackgroundPositionY && currentBackgroundPositionY > params.averageBackgroundPositionY) ||
     		   (params.mainAnimationEndBackgroundPositionY <= params.mainAnimationStartBackgroundPositionY && currentBackgroundPositionY < params.averageBackgroundPositionY)){
     		   		$.log(params.mainAnimationStartBackgroundPositionX+' '+params.mainAnimationStartBackgroundPositionY+' '+params.mainAnimationEndBackgroundPositionX+' '+params.mainAnimationEndBackgroundPositionY);
			     		$(elem).stop(true).animate(
							{backgroundPosition:'('+params.mainAnimationStartBackgroundPositionX+'px '+params.mainAnimationStartBackgroundPositionY+'px)'}, 
							config.mainAnimationDuration,
							config.easing);
				}else{
							$(elem).stop(true).animate(
							{backgroundPosition:'('+params.mainAnimationEndBackgroundPositionX+'px '+params.mainAnimationEndBackgroundPositionY+'px)'}, 
							config.mainAnimationDuration,
							config.easing);
				}
     	}
     	
     	if(config.mainAnimationContinous) activeFunction = window.setTimeout(function(){
		     		_animateMask(elem, config, params);
		     		}, config.mainAnimationDuration);     		
    }
    $.log($(elem).css('backgroundPosition'));
 
   };
 
 })(jQuery);
