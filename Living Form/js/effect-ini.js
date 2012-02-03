$(document).ready(function() {
				$("#pulsing-effect").livingElements("images/input-mask.png", {
					background:"#00a5fa",
					easing: 'linear',
					triggerElementSelector: 'input',					
					mainAnimationStartOpacity:0,
					mainAnimationEndOpacity:1,
					mainAnimationDuration:800															
				});
				$("#invalid-effect").livingElements("images/input-mask.png", {
					background:"#ff0202",
					easing: 'linear',
					delay: 500,
					startOnLoad: true,
					triggerElementSelector: 'input',
					triggerElementStartEvent: null,
					triggerElementStopEvent: 'focus',					
					mainAnimationStartOpacity:0,
					mainAnimationEndOpacity:1,					
					mainAnimationDuration:800										
				});
				$("#static-effect").livingElements("images/input-mask.png", {
					background:"url('images/static-gradient.jpg') no-repeat",				
					triggerElementSelector: 'input',
					preAnimationStartOpacity: 0,					
					mainAnimationEndOpacity:1,					
					mainAnimationDuration:0,
					postAnimationEndOpacity: 0										
				});
				$("#inverted-effect").livingElements("images/input-mask.png", {
					background:"url('images/inverted-gradient.jpg') no-repeat",					
					startOnLoad: true,
     				triggerElementSelector: 'input',
     				triggerElementStartEvent: 'blur',
     				triggerElementStopEvent: 'focus',
					preAnimationStartOpacity: 0,					
					mainAnimationEndOpacity:1,					
					mainAnimationDuration:0,
					postAnimationEndOpacity: 0										
				});
				$("#living-effect").livingElements("images/input-mask.png", {
					background:"url('images/living-gradient.png') no-repeat",
					easing: 'linear',
					triggerElementSelector: 'input',
					preAnimationStartOpacity: 0,
					mainAnimationFade: false,					
					mainAnimationScrollDirection: 'horizontal',					
					mainAnimationDuration:2000,
					mainAnimationStartBackgroundPositionX: -500,     			
     			mainAnimationEndBackgroundPositionX: 0,
     			postAnimationEndOpacity: 0										
				});
				$("#multicolor-effect").livingElements("images/input-mask.png", {
					background:"url('images/multicolor-gradient.jpg') no-repeat",
					easing: 'linear',
					triggerElementSelector: 'input',
					preAnimationStartOpacity: 0,
					mainAnimationFade: false,					
					scrollDirection: 'horizontal',					
					mainAnimationDuration:3500,
					mainAnimationStartBackgroundPositionX: -500,     			
     			mainAnimationEndBackgroundPositionX: 0,
     			postAnimationEndOpacity: 0										
				});
				$("#textarea-effect").livingElements("images/textarea-mask.png", {
					background:"url('images/textarea-gradient.jpg') no-repeat",
					easing: 'linear',
					triggerElementSelector: 'textarea',
					preAnimationStartOpacity: 0,
					mainAnimationFade: false,					
					scrollDirection: 'horizontal',					
					mainAnimationDuration:1500,
					mainAnimationStartBackgroundPositionX: -200,     			
     			mainAnimationEndBackgroundPositionX: 0,
     			postAnimationEndOpacity: 0										
				});
				
				// force text in invalid input effect after reload
				$("#invalid-effect input").attr('value', 'Click me to stop the effect');
			});// JavaScript Document