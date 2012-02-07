/**
 * jquery.freshline.Parallax - jQuery Plugin for Parallax Effects (freshline)
 * @version: 1.1 (03.10.2011)
 * @requires jQuery v1.2.2 or later 
 * @author Krisztian Horvath
 * All Rights Reserved, use only in freshline Templates or when Plugin bought at Envato ! 
**/




(function($,undefined){	
	
	
	
	////////////////////////////
	// THE PLUGIN STARTS HERE //
	////////////////////////////
	
	$.fn.extend({
	
		
		// OUR PLUGIN HERE :)
		fhparallax: function(options) {
	
		
			
		////////////////////////////////
		// SET DEFAULT VALUES OF ITEM //
		////////////////////////////////
		var defaults = {	
			editor:'off',		// Turn on or off the Editor Modus
			path:'parallax/js/ZeroClipboard.swf',
			automatic:0,		// Set the Automatic of th Animation (Delay Time)
			mobile_auto_start:"yes"		// Do we need auto Start on Mobile Devices ??
		};
		
		options = $.extend({}, $.fn.fhparallax.defaults, options);
					

		return this.each(function() {
					
			//PUT THE BANNER HOLDER IN A VARIABLE
			var world = $(this);
			
			// OPTIONS 
			var opt=options;
			
			if (opt.editor=="on") 
				world.data('old_html',world.html());
				
			
			
			// Set Some Data in the Object			
			world.data('ba_imagesLoaded',0);	
			world.data('path',opt.path);


			world.find('div').css({'opacity':'0.0','display':'block'});		

			
			
			
			//create the Before & After Images
			createWorld(world);						
			
			world.append('<div id="parallax-main-loader" class="parallax-main-loader"></div>');
			
			// SET AUTOMATIC DATAS
			world.data('countdown',0);
			world.data('auto_direction',15)
			world.data('auto_zoom',15);
			world.data('lastmouseX',100);
			world.data('lastmouseY',300);

			if( navigator.userAgent.match(/Android/i) ||
			 navigator.userAgent.match(/webOS/i) ||
			 navigator.userAgent.match(/iPhone/i) ||
			 navigator.userAgent.match(/iPod/i)
			 ){
				if (opt.mobile_auto_start=="yes") opt.automatic=1;
			}
			
			
			// Init Image Preloading 
			initImagePreLoading(world);
			
			//NOW WE LOAD THE ba_images, AND ONCE IT HAS BEED DONE, WE CAN START
			preloadba_images(world,opt);
		
			world.data('rabbit',"on");
			
			if (opt.editor=="on")  {
			
				world.appendTo($('body'));
				world.css({'z-index':'88999'});
				
				createEditor(world,opt);
			
			}
		
		
			
			
		})
	}
})


		///////////////////////////////
		//  --  LOCALE FUNCTIONS -- //
		///////////////////////////////
		
		
									
									
					/////////////////////////////////////////////////////
					// PUT ALL IMAGES IN POSITION AFTER CALIBRATION   //
					///////////////////////////////////////////////////
					function resetWorld(world) {
									world.children().each(function() {
										var $this=$(this);
										parallaxSlide(world.data('mouseX'),world.data('mouseY'),world,$this);											
									});		
							}
							
							
					/////////////////////////////////////////////////////////
					// PUT ALL ba_images IN AN ARRAY, FOR PRELOADING !!  //
					///////////////////////////////////////////////////////
					function initImagePreLoading(item) {
								var ba_images=new Array();
								var imageamounts=0;
								item.find("img").each(
									function(i){
										var $this=$(this);
										ba_images[imageamounts] = $this.attr('src');								
										imageamounts++;
									});
													
							item.data('ba_images',ba_images);
							
					}
		
		
					/////////////////////////////////////////////////////////////////////////////////////////	
					//REKURSIVE PRELOADING ALL THE ba_images, AND CALL THE CALLBACK FUNCTION AT THE END   //
					////////////////////////////////////////////////////////////////////////////////////////
					function preloadba_images(item,opt){	
										
										var ba_images = item.data('ba_images');
										var ba_imagesLoaded = item.data('ba_imagesLoaded');
										var img = new Image();	// TEMPORARY HOLDER FOR IMAGE TO LOAD				
										$(img).css("display","none");
										$(img).attr('src',ba_images[ba_imagesLoaded]);	// SET THE SOURCE OF THE TEMP IMAGE
										
										if (img.complete || img.readyState === 4) {		// CHECK IF THE IMAGE IS ALREADY LOADED
											ba_imagesLoaded++;								// IF YES WE CAN INCREASE THE AMOUNT OF LOADED ba_images
											if(ba_imagesLoaded == ba_images.length) {			// IF WE LOADED ALL THE ba_images	
												startParallax(item,opt);					// CAN CALLBACK FUNCION BE CALLED
											} else {		
												item.data('ba_imagesLoaded',ba_imagesLoaded);
												preloadba_images(item,opt);				// OTHER WAY WE NEED TO PRELOAD THE REST ba_images
											}
										} else {
											
											$(img).load(function(){						// IF NOT CACHED YET, LETS LOAD THE IMAGE
													ba_imagesLoaded++;						// WE CAN INCREASE THE AMOUNT OF LOADED ba_images
													if(ba_imagesLoaded == ba_images.length) {	// IF WE LOADED ALL THE ba_images									
														startParallax(item,opt)						// CAN CALLBACK FUNCION BE CALLED		
													} else {		
														item.data('ba_imagesLoaded',ba_imagesLoaded);													
														preloadba_images(item,opt);		// OTHER WAY WE NEED TO PRELOAD THE REST ba_images
													}
											});
										}
								}; 
				
					
					////////////////////////////////////////////////////
					// CREATE THE BEFORE AFTER IMAGES IN THE DIVS 	  //
					////////////////////////////////////////////////////
					
					function createWorld (item) {
						item.children().each(
							function() {
								//////////////////////////////////////
								// Save the Position of the Levels  //
								//////////////////////////////////////
								var  $this = $(this);
								$this.data("oldLeft",$this.position().left);
								$this.data("oldTop",$this.position().top);							
								$this.data("oldWidth",$this.find('img:first').width());
								$this.data("oldHeight",$this.find('img:first').height());									
							});
							
						item.find('.p_button').each(function() {
							var $this=$(this);
							$this.data('button_normal',$this.find('img').attr('src'));
							$this.data('button_hover',$this.find('img').attr('alt'));							
							
							$this.hover(
									function() {
										var $this=$(this);
										var img=$this.find('img');
										img.attr('src',$this.data('button_hover'));
									},
									function() {
										var $this=$(this);
										var img=$this.find('img');
										img.attr('src',$this.data('button_normal'));
									});
						});
					}
																										
					
					
					////////////////////////////////////////////
					// START AFTER LOADIN THE KEN BURN SLIDER //
					////////////////////////////////////////////
					function startParallax(item,opt) {
							
								
								item.css({'opacity':'0.0', 'display':'block'});								
								
								item.find('div').css({'opacity':'1.0','display':'block'});								
								
								item.animate({'opacity':'1.0'},{duration:1000}).delay(1000);
								
								 item.children().each(function() {
											var $this=$(this);
											parallaxSlide(100,100,item,$this);
											
										});		
									
								if ($.browser.msie && $.browser.version >= 7 && $.browser.version < 9 ) {
									item.addClass('noFilterClass');
									item.find('div').addClass('noFilterClass');
								} else {
									textanim(item,500);
								}
															
								
								item.find('#parallax-main-loader').each(function() {
									var $this=$(this);
									$this.animate({'opacity':'0.0'},{duration:1000, complete:function() {
										$this.remove();
										startFollower(item,opt);
									}});
								});
								
								item.data('mouseX',0);
								item.data('mouseY',0);
								item.data('xset',10);
								item.data('yset',10);
								item.data('automatic',opt.automatic);
								if (opt.automatic>0 && opt.editor!="on") {
									setInterval(function() {
										
										if (item.data('countdown')<opt.automatic) item.data('countdown',item.data('countdown')+100);
										if (item.data('countdown')>=opt.automatic) {												
											item.data('mouseX',item.data('mouseX')+item.data('xset'));
											item.data('mouseY',item.data('mouseY')+item.data('yset'));	
											if (item.data('mouseX')>=parseInt(item.css('width'),0)) item.data('xset',-20);
											if (item.data('mouseY')>=parseInt(item.css('height'))) item.data('yset',-20);
											if (item.data('mouseX')<=0) item.data('xset',20);
											if (item.data('mouseY')<=0) item.data('yset',20);
											resetWorld(item);
										}
									},50);
								}
						}
					
					///////////////////////////
					// START MOUSE FOLLOWER  //
					//////////////////////////
					function startFollower(item,opt) {
								
								if (opt.editor=="on") {
										
										item.find('#controllgrid').mousemove(function(e){
											  mouseX = e.pageX;
											  mouseY = e.pageY;	  
											  item.data('mouseX',mouseX);
											  item.data('mouseY',mouseX);
											  item.data('countdown',0);
											  if (item.data('rabbit') =="on") {
												  item.children().each(function() {
														var $this=$(this);
														parallaxSlide(e.pageX,e.pageY,item,$this);
														
													});		
												}
										}) ;
								} else {
									if ($.browser.msie && $.browser.version >= 7 && $.browser.version < 9 ) {
										item.mousemove(function(e){
											  mouseX = e.pageX;
											  mouseY = e.pageY;
											  
											  item.data('mouseX',mouseX);
											  item.data('mouseY',mouseX);
											  
											  item.data('countdown',0);
											  item.children().each(function() {
													var $this=$(this);
													parallaxSlide(e.pageX,e.pageY,item,$this);
													
												});		
										}) ;
									} else {
										$(window).mousemove(function(e){
											  mouseX = e.pageX;
											  mouseY = e.pageY;
											  
											  item.data('mouseX',mouseX);
											  item.data('mouseY',mouseX);
											  
											  item.data('countdown',0);
											  item.children().each(function() {
													var $this=$(this);
													parallaxSlide(e.pageX,e.pageY,item,$this);
													
												});		
										}) ;
									}
								}
						}
					
					
					
					
					////////////////////////////////////////////////////////////////////////////////////////////////////////////
					// PARALLAX SLIDE WILL PUT THE ITEM IN THE RIGHT POSITION ZOOMED, DEPENDING ON THE SETTINGS FROM THE HTML //
					////////////////////////////////////////////////////////////////////////////////////////////////////////////
					function parallaxSlide(mouseX,mouseY,world,item) {
										
							
							var factorX = mouseX / $(window).width() ;
							var factorY = -1*(mouseY / $(window).height()); 
							
							if (factorX>1) factorX=1;
							if (factorX<-1) factorX=-1;
							if (factorY>1) factorY=1;
							if (factorY<-1) factorY=-1;
							
							// MAX SKEW, X and Y , OFFSET DISTANCES
							var startx = item.data("startx");
							var starty = item.data("starty");
							
							var maxwayX = Math.abs(item.data("endx")-startx);							
							var maxwayY = item.data("endy")-starty;										
							var endskew = item.data("endskew") - item.data("startskew");
							
							
							
							// If Old Browser, than let change the values...
							if ($.browser.msie && $.browser.version >= 7 && $.browser.version < 9 ) {
								if (item.data("endx_ie8") !=undefined ) {
									startx = item.data("startx_ie8");							
									maxwayX = Math.abs(item.data("endx_ie8")-startx);						
									
								}
								if (item.data("endy_ie8") !=undefined ) {
									starty = item.data("starty_ie8");
									maxwayY = Math.abs(item.data("endy_ie8")-starty);						
									
								}
								endskew=0;								
							}
							
							
							// Move the Items by Zoom in the Middle of the Screen
							var maxoffx = 0; 							
							var maxendoffx = 0;
							
							if (item.data("zoomxoffset")!=undefined) maxoffx = item.data("zoomxoffset");
							if (item.data("zoomxendoffset")!=undefined) maxendoffx = item.data("zoomxendoffset");
							
							if ($.browser.msie && $.browser.version >= 7 && $.browser.version < 9 ) {
								if (item.data("zoomxoffset_ie8")!=undefined) maxoffx = item.data("zoomxoffset_ie8");
								if (item.data("zoomxendoffset_ie8")!=undefined) maxendoffx = item.data("zoomxendoffset_ie8");
							}
							
							// Calculate the Zooming Factor
							var zoomfactor = world.data("zoommax") - world.data("zoommin");
							zoomfactor=(zoomfactor*factorY)/100;
							zoomfactor=world.data("zoommin")/100 + zoomfactor;
							
							// Calculate the new Zoomed Item Size
							var newWidth = item.data("oldWidth")*zoomfactor;
							var newHeight = item.data("oldHeight")*zoomfactor;							
							
							// Calculate the Distances (Factors)
							var slideFactorX = (maxwayX * factorX);
							var slideFactorY = (maxwayY * factorY);	
							var skewFactor = (endskew * factorX);
							
							
							var xoffsetFactor = maxoffx * factorY
							
							
							var dif=Math.abs(maxoffx - maxendoffx);
							xoffsetFactor = xoffsetFactor - (dif*factorX)*factorY
							
							
							
							
							
							// Check the Offsets on the Screen
							var leftOffset=0;
							var topOffset=0;
							
							// SET THE TARGET PARAMETERS
							leftOffset = (newWidth - item.data("oldWidth"))/2;
							topOffset = (newHeight - item.data("oldHeight"))/2;		
							
							var targetX = xoffsetFactor+startx-slideFactorX-leftOffset;
							var targetY = starty+slideFactorY-topOffset;
							
	
							item.find("img").css({"width":newWidth+"px","height":newHeight+"px"});
							
							
							item.css({"left":targetX+"px","top":targetY+"px"});
							
							item.find('#selectbox').css({'width':newWidth+'px','height':newHeight+'px',"left":"0px","top":"0px"});
							
							if (item.data("endskew") !=undefined) {					
								
								item.css({
											'transform': 'skew('+(item.data("startskew")+skewFactor)+'deg)',
											'-o-transform': 'skew('+(item.data("startskew")+skewFactor)+'deg)',
											'ms-transform': 'skew('+(item.data("startskew")+skewFactor)+'deg)',
											'-ms-transform': 'skew('+(item.data("startskew")+skewFactor)+'deg)',
											'-moz-transform': 'skew('+(item.data("startskew")+skewFactor)+'deg)',
											'-webkit-transform': 'skew('+(item.data("startskew")+skewFactor)+'deg)'
										});
							}
							
					}
						
					
				
				
							
				
				
				///////////////////
				// TEXTANIMATION //
				//////////////////			
				function textanim (item,edelay) {
				
								
								var counter=0;
								
								item.find('div').each(function(i) {
									var $this=$(this);
									if ($this.hasClass('before')) $this.appendTo(item.find("#before").parent());
									if ($this.hasClass('after')) $this.appendTo(item.find("#after").parent());
								});
								
								
								
								item.find('div').each(function(i) {
											var $this=$(this);
											
											
											if ($this.data('_top') == undefined) $this.data('_top',$this.position().top);
											if ($this.data('_left') == undefined) $this.data('_left',$this.position().left);
											if ($this.data('_op') == undefined) $this.data('_op',$this.css('opacity'));
											
											
											//// -  SLIDE UP   -   ////
											if ($this.hasClass('slideup')) {
													$this.animate({'top':$this.data('_top')+20+"px"},
																	{duration:0,queue:false})
														   .delay(edelay + (counter+1)*50)
														   .animate({'top':$this.data('_top')+"px"},
																	{duration:300,queue:true})	
												counter++;
											}
											
											
											//// -  SLIDE RIGHT   -   ////
											if ($this.hasClass('slideright')) {
												$this.animate({'left':$this.data('_left')-20+"px"},
															{duration:0,queue:false})
												   .delay(edelay + (counter+1)*50)
												   .animate({'left':$this.data('_left')+"px"},
															{duration:300,queue:true})	
												counter++;
											}
											
											
											//// -  SLIDE DOWN  -   ////
											if ($this.hasClass('slidedown')) {
													$this.animate({'top':$this.data('_top')-20+"px"},
																	{duration:0,queue:false})
														   .delay(edelay + (counter+1)*50)
														   .animate({'top':$this.data('_top')+"px"},
																	{duration:300,queue:true})	
												counter++;
											}
											
										
											//// -  SLIDE LEFT   -   ////
											if ($this.hasClass('slideleft')) {
												$this.animate({'left':$this.data('_left')+20+"px"},
															{duration:0,queue:false})
												   .delay(edelay + (counter+1)*50)
												   .animate({'left':$this.data('_left')+"px"},
															{duration:300,queue:true})	
												counter++;
											}
											
											
											//// -  FADE UP   -   ////
											if ($this.hasClass('fadeup')) {
													
													$this.animate({'top':$this.data('_top')+20+"px",
																	 'opacity':0},
																	{duration:0,queue:false})
														   .delay(edelay + (counter+1)*50)
														   .animate({'top':$this.data('_top')+"px",
																	 'opacity':$this.data('_op')},
																	{duration:300,queue:true})	
												counter++;
											}
											
											
											//// -  FADE RIGHT   -   ////
											if ($this.hasClass('faderight')) {
												$this.animate({'left':$this.data('_left')-20+"px",
															 'opacity':0},
															{duration:1,queue:false})
												   .delay(edelay + (counter+1)*50)
												   .animate({'left':$this.data('_left')+"px",
															'opacity':$this.data('_op')},
															{duration:300,queue:true})	
												counter++;
											}
											
											
											//// -  FADE DOWN  -   ////
											if ($this.hasClass('fadedown')) {
													$this.animate({'top':$this.data('_top')-20+"px",
																	 'opacity':0},
																	{duration:1,queue:false})
														   .delay(edelay + (counter+1)*50)
														   .animate({'top':$this.data('_top')+"px",
																	 'opacity':$this.data('_op')},
																	{duration:300,queue:true})	
												counter++;
											}
											
											
											//// -  FADE LEFT   -   ////
											if ($this.hasClass('fadeleft')) {
												$this.animate({'left':($this.data('_left')+20)+"px",
															 'opacity':0},
															{duration:1,queue:false})
												   .delay(edelay + (counter+1)*50)
												   .animate({'left':$this.data('_left')+"px",
															'opacity':$this.data('_op')},
															{duration:300,queue:true})	
												counter++;
											}
											
											//// -  FADE   -   ////
											if ($this.hasClass('fade')) {
												$this.animate({'opacity':0},
															{duration:1,queue:false})
												   .delay(edelay + (counter+1)*50)
												   .animate({'opacity':$this.data('_op')},
															{duration:300,queue:true})	
												counter++;
											}
											
										
										});
										
										
					
				}
				
				
})(jQuery);			

				
			

			   