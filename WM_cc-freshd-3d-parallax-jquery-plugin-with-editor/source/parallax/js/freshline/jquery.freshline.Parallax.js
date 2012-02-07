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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
				
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
				
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
				
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
				
					/////////////////////////////////////////////
					// - Create the Editor Grid and Rest Parts //
					/////////////////////////////////////////////
					function createEditor(world,opt) {
									world.css({'position':'absolute',
												'top':'130px',
												'left':'265px'});
												
									//Turn on the Controll Grid			
									opt.width = parseInt(world.css('width'),0);
									opt.height= parseInt(world.css('height'),0);
									var ww = 80 + opt.width;
									var wh = 80 + opt.height;
									var newh=wh+80;
									if (newh<1000) newh=1000;
									world.prepend('<div class="editor_background_parallax" style="width:2400px;height:'+newh+'px"></div>');
									
									var grid=$('<div style="width:'+ww+'px;height:'+wh+'px;top:-60px;left:-60px" id="controllgrid" class="controllgrid"></div>');
									world.append(grid);
									
									// Show the Pause Button
									var gridpause=$('<div class="controllgrid_pause" id="controllgrid_pause" ></div>');
									grid.append(gridpause);
									
									// Show Small Open/CLose Button on Grid
									var gridoo=$('<div class="controllgrid_openclose" title="Hide/Unhide the Gird"></div>');
									grid.append(gridoo);
									
									gridoo.data('on',1);
									
									// Turn on and off the Grid
									gridoo.click(function() {
										var $this=$(this);
										if ($this.data('on')=="1") {
											world.find('#controllgrid').css({'background-position':'0px -900px'});
											$this.css({'background-position':'bottom'});
											$this.data('on',2);
										} else {
											world.find('#controllgrid').css({'background-position':'0px 0px'});
											$this.data('on',1);
											$this.css({'background-position':'top'});
										}
									});
									
									
									// CREATE THE LINEAR
									for (var i=0;i<wh/20-1;i++) {
										var count=$('<div style="position:absolute;left:2px;top:'+(-5 + ((i+1)*20))+'px;color:#55677b;font-size:8px">'+String((i*20)-40)+'</div>');
										grid.append(count);
									}
									for (var i=0;i<ww/20-1;i++) {
										var count=$('<div style="position:absolute;top:8px;left:'+(-5 + ((i+1)*20))+'px;color:#55677b;font-size:8px">'+String((i*20)-40)+'</div>');
										grid.append(count);
									}
									
									
									// CREATE THE PANEL HERE
									var panel=$('<div id="panel" class="controllgrid_panel"></div>');
									var logo=$('<div id="logo" class="controllgrid_panel_logo"></div>');
									world.append(panel);
									panel.append(logo);
									
									// ADD THE RABBIT ICON
									var rabbit=$('<div id="rabbit" title="Turn on/off Parallax Animation" class="controllgrid_rabbit"></div>');
									panel.append(rabbit);
									rabbit.data('on','true');
									
									// RABBIT BUTTON SETTINGS
									rabbit.click(function() {		
										var $this=$(this);
										if ($this.data('on')=="true") {
											$this.css({'background-position':'bottom'});
											$this.data('on','false');
											world.data('rabbit','off');		
											world.find('#controllgrid_pause').css({'display':'block'});											
										} else {
											$this.css({'background-position':'top'});
											$this.data('on','true');
											world.data('rabbit','on');											
											world.find('#controllgrid_pause').css({'display':'none'});											
										}
									});
									
									
									//List of all items on the left side						
									world.find('img').each(function(i) {
										var $this=$(this);
										if ($this.parent().get(0).tagName=="A") $this=$this.parent();
										
										var button=$();
										
										var holder=$('<div data-id="'+i+'" id="controllgird_layerholder_'+i+'"></div>');
										var sup=$('<div class="controllgrid_swap_up" title="One layer Deeper"></div>');
										var sdown=$('<div class="controllgrid_swap_down" title="One layer Higher"></div>');
										var selectme=$('<div class="controllgrid_panel_item" title="Select -'+$this.parent().attr('id')+'- Layer to Edit">'+$this.parent().attr('id')+'</div>');
										var afilter=$('<div id="selecter" class="controllgrid_panel_filter" title="Hide / Unhide Layer"></div>');
										var divider=$('<div class="controllgrid_panel_divider"></div>');
										
										holder.append(sup).append(sdown).append(selectme).append(afilter).append(divider);
										
										
										// CHANGE THE LAYERS UP AND DOWN
										sup.click(function() {
											var $this=$(this).parent();									
											var old=$('<div>'+world.data("old_html")+'</div>');
											
											if ($this.prev().attr('id') != "rabbit") {											
													var devitem=$this.find('.controllgrid_panel_item').data('parent');
													devitem.prev().insertAfter(devitem);													
													$this.prev().insertAfter($this);
													
													var olditem=old.find('#'+devitem.attr('id'));													
													olditem.prev().insertAfter(olditem);													
													world.data('old_html',old.html());
													old.remove();
											}
										});
										
										
										// CHANGE THE LAYERS UP AND DOWN
										sdown.click(function() {
											var $this=$(this).parent();	
											var old=$('<div>'+world.data("old_html")+'</div>');											
											if ($this.next().attr('id') != "selectlayerinfo2") {											
													var devitem=$this.find('.controllgrid_panel_item').data('parent');
													devitem.insertAfter(devitem.next());
													$this.insertAfter($this.next());
													
													var olditem=old.find('#'+devitem.attr('id'));													
													olditem.insertAfter(olditem.next());													
													world.data('old_html',old.html());
													old.remove();
											}
										});
										
										
										
										
										
										//var dark_bg=$('<div style="display:none' class="controllgrid_panel_selected_item_bg"></div>');
										
										afilter.css({'cursor':'pointer'});				
										afilter.data('parent',$this.parent());
										afilter.data('on','0');
										
										selectme.css({'cursor':'pointer'});				
										selectme.data('parent',$this.parent());
										selectme.data('on','0');
										
										
										
										// THE FILTER - OPACITY CHANGER
										afilter.click(
											function() {
												var $this=$(this);
												
												if ($this.data('on') == "0") {													
													$this.data('on','1');							
													$this.data('parent').css({'opacity':'0.1'});
													$this.css({'background-position':'left top'});
												} else {													
													$this.data('on','0');
													$this.data('parent').css({'opacity':'1.0'});
													$this.css({'background-position':'right top'});
												}
											});
											
										
										
										// THE ITEM SELECTER
										selectme.click(
											function() {
												var $this=$(this);
												
												if ($this.data('on') == "0") {
													world.find('#calibration_holder').css({'display':'block'});
													world.find('#selectlayerinfo').css({'display':'none'});
													world.find('#selectlayerinfo2').css({'display':'none'});
													// REMOVE THE NOT USED SELECTBOXES  AND  SELECTED  LAYERS
													world.find('*').each(function() {
														var $this=$(this);														
														if ($this.hasClass('controllgrid_panel_item_selected')) {
															$this.removeClass('controllgrid_panel_item_selected');
															$this.data('on','0');													
															var par=$this.data('parent');
															par.find('#selectbox').remove();
														}														
													});
													
																										
													
													// ADD A CLASS TO THE SELECTED ITEM (LAYER)
													$this.addClass('controllgrid_panel_item_selected');																									
													$this.data('on','1');
													
													
													//THE PARENT OBJECT OF THE IMAGE SHOULD GET A SELECTBOX
													var par=$this.data('parent');
													par.append('<div id="selectbox" style="position:absolute;left:0px;top:0px;background-color:#00f6e2;width:'+(par.width())+'px;height:'+(par.height())+'px;"></div>');
													par.find('#selectbox').css({'opacity':'0.4'});
													
													swapCalibrationStep(world,world.find('#controllgrid_steps_1'))

												} else {
													// REMOVE SIMPLY THE NOT USED LAYER HERE
													$this.removeClass('controllgrid_panel_item_selected');
													$this.data('on','0');													
													var par=$this.data('parent');
													par.find('#selectbox').remove();													
													world.find('#calibration_holder').css({'display':'none'});
													world.find('#selectlayerinfo').css({'display':'block'});
													world.find('#selectlayerinfo2').css({'display':'block'});
													
												}
											});
										
										
										
										// ADD THE ITEMS AND ASSETS TO THE PANEL
										panel.append(holder);										
										//panel.append(divider);
									});		

									panel.append('<div class="controllgrid_select_one_layer_arrow" id="selectlayerinfo2"></div>');
									panel.append('<div class="controllgrid_select_one_layer_text" id="selectlayerinfo">Select a Layer Above to Edit</div>');
									
									// SHOW HTML BUTTON
									var showhtml=$('<div id="controllgrid_show_html" class="controllgrid_show_html"><div class="controllgrid_show_html_icon"></div>Show HTML </div>');
									panel.append(showhtml);
									
									showhtml.click(function() {
										createLightBox(world);
									});
									
									
									
									var calholder=$('<div class="calibration_holder" id="calibration_holder"></div>');
									calholder.css({'display':'none'});
									panel.append(calholder);
									////////////////////////// 									
									// ADD THE STEP BUTTONS //
									//////////////////////////
									
									
									calholder.append('<div class="controllgird_calib_text">Calibration Steps</div>');
									calholder.append('<div class="controllgrid_steps_numbers">1.</div>');
									calholder.append('<div class="controllgrid_steps_numbers">2.</div>');
									calholder.append('<div class="controllgrid_steps_numbers">3.</div>');
									calholder.append('<div class="controllgrid_steps_numbers">4.</div>');
									var step_a=$('<div id="controllgrid_steps_1" data-ad="1" title="Step 1. Start Calibration. Top Left -X/Y Start Positions and Skew Start" class="controllgrid_steps stepselectednow"></div>');
									var step_b=$('<div id="controllgrid_steps_2" data-ad="2" title="Step 2. Top Right -X End and Y Start Positions and Skew End" class="controllgrid_steps"></div>');
									var step_c=$('<div id="controllgrid_steps_3" data-ad="3" title="Step 3. Bottom Left -End Y Position and Start X-Offset" class="controllgrid_steps"></div>');
									var step_d=$('<div id="controllgrid_steps_4" data-ad="4" title="Last Step. Bottom Right -End Y Position and End X-Offset" class="controllgrid_steps"></div>');
									world.data('mouseX',0);
									world.data('mouseY',0);
									
									calholder.append(step_a);calholder.append('<div class="controllgrid_seperator"></div>');
									calholder.append(step_b);calholder.append('<div class="controllgrid_seperator"></div>');
									calholder.append(step_c);calholder.append('<div class="controllgrid_seperator"></div>');
									calholder.append(step_d);
									
									///////////////////////////////
									// THE CONTROLL OF THE STEPS //
									///////////////////////////////
									
									calholder.find('.controllgrid_steps').hover( 
											function() {
												var $this=$(this);
												if (!$this.hasClass('stepselectednow'))
													$this.css({'background-position':'center'});
											},
											function() {
												var $this=$(this);
												if ($this.hasClass('stepselectednow'))
													$this.css({'background-position':'bottom'});
												else
													$this.css({'background-position':'top'});
											});
											
									calholder.find('.controllgrid_steps').click(function() {swapCalibrationStep(world,$(this))});
									
									
									// ADD THE GRADIENT BOX IN THE TOOLBAR
									var gradient=$('<div class="step_separator_tabbackground"></div>');
									calholder.append(gradient);

									
									/////////////////////////
									// ADD THE SKEW PANELS //
									/////////////////////////
									calholder.append('<div class="skew_text">Start Skew</div>');
									calholder.append('<div class="controllgrid_skew_start"></div>');
									var minus=$('<div class="controllgrid_skew_minus" title="Decrease Skew"></div>');
									calholder.append(minus);
									calholder.append('<div class="controllgrid_skew_value">0</div>');
									var plus=$('<div class="controllgrid_skew_plus" title="Increase Skew"></div>');
									calholder.append(plus);
									calholder.append('<div class="controllgrid_skew_end"></div>');
									
									///////////////////////////////////
									// CHANGE THE SKEW VALUES HERE  //
									///////////////////////////////////
									minus.hover(
										function() { 
											var $this=$(this);
											$this.css({'background-position':'right bottom'});
										},
										function() { 
											var $this=$(this);
											$this.css({'background-position':'right top'});
										});
									
									plus.hover(
										function() { 
											var $this=$(this);
											$this.css({'background-position':'left bottom'});
										},
										function() { 
											var $this=$(this);
											$this.css({'background-position':'left top'});
										});
										
									
									///////////////////////////
									// THE SKEW MINUS BUTTON //
									///////////////////////////
									minus.click(function() {										
										var item=hideSelectBoxDuringChange(world);					
										var info=world.find('.controllgrid_skew_value');																														
										var steps=world.find('.stepselectednow').data('ad');																														
										if (steps=="1") 
											changeItemData(item,'startskew',-1,world,info)											
										 else
											changeItemData(item,'endskew',-1,world,info)
																				
									});
																			
									
									///////////////////////////
									// THE SKEW PLUS BUTTON //
									///////////////////////////									
									plus.click(function() {										
										var item=hideSelectBoxDuringChange(world);					
										var info=world.find('.controllgrid_skew_value');																														
										var steps=world.find('.stepselectednow').data('ad');																														
										if (steps=="1") 
											changeItemData(item,'startskew',+1,world,info)											
										 else
											changeItemData(item,'endskew',+1,world,info)										
									});
									
									
									
									///////////////////////////////
									// ADD THE ANIMATION PANEL HERE 
									///////////////////////////////
									calholder.append('<div class="controllgrid_minipanel_text">Start X/Y Position:</div>');
									
									
									// ADD THE MINISTEPPER
									var ministepsholder=$('<div class="controllgrid_ministeps_holder"></div>');
									for (var j=0;j<5;j++) {
										var st=100;
										if (j==1) st=10 
										else if (j==2) st=5 
											else if(j==3) st=2 
												else if (j==4)	st=1;
										var gap=$('<div class="controllgrid_ministeps" title="Gap to '+st+'" data-id="'+(4-j)+'" data-st="'+st+'"></div>')
										ministepsholder.append(gap);
										if (j==4) {
											gap.css({'background-position':'bottom'});
											gap.addClass("selectedgap");
										}
										gap.click(function() {
											var $this=$(this);
											world.find('.controllgrid_ministeps_fake').css({'background-position':(0-parseInt($this.data('id'),0)*9)+'px 0px'});
											world.find('.controllgrid_ministeps').each(function() {
												var $this=$(this);
												$this.removeClass("selectedgap");
												$this.css({'background-position':'top'});
											});
											$this.addClass("selectedgap");
											$this.css({'background-position':'bottom'});
											world.find('#cg_ministeps_info').html($this.data('st'));
										});
									}
									ministepsholder.append('<div id="cg_ministeps_info" class="controllgrid_ministeps_text">1</div>');
									calholder.append(ministepsholder);
									calholder.append('<div class="controllgrid_ministeps_fake" style="background-position:left"></div>');
									
									// ADD THE MIIPANEL WITH THE ARROWS
									var minipanel=$('<div id="controllgrid_minipanel" class="controllgrid_minipanel"></div>');
									var _up=$('<div id="controllgrid_minipanel_up" class="controllgrid_minipanel_up" title="Move Up"></div>');
									var _down=$('<div id="controllgrid_minipanel_down" class="controllgrid_minipanel_down" title="Move Down"></div>');
									var _left=$('<div id="controllgrid_minipanel_left" class="controllgrid_minipanel_left" title="Move Left"></div>');
									var _right=$('<div id="controllgrid_minipanel_right" class="controllgrid_minipanel_right" title="Move Right"></div>');
									var _info=$('<div id="controllgrid_minipanel_info" class="controllgrid_minipanel_info">INFO</div>');
									minipanel.append(_up);
									minipanel.append(_down);
									minipanel.append(_left);
									minipanel.append(_right);
									minipanel.append(_info);
									
									
									
									
									///////////////////////////////////////////////////////////
									// CHANGE THE VALUE DEPENDING ON THE CONTROLL ARROWS	 //
									///////////////////////////////////////////////////////////
									
									// UP BUTTON ON PANEL
									_up.click(function() {
										var item=hideSelectBoxDuringChange(world);																													
										var info=world.find('#controllgrid_minipanel_info');										
										var steps=world.find('.stepselectednow').data('ad');
										if ($.browser.msie && $.browser.version >= 7 && $.browser.version < 9 ) {
												if (steps=="1" || steps=="2") 
													changeItemData(item,'starty_ie8',-1,world,info)	
												 else 								
													changeItemData(item,'endy_ie8',-1,world,info)	
										} else {
											if (steps=="1" || steps=="2") 
													changeItemData(item,'starty',-1,world,info)	
												 else 								
													changeItemData(item,'endy',-1,world,info)	
										}
									});
									
									
									// DOWN BUTTON ON THE PANEL
									_down.click(function() {
										var item=hideSelectBoxDuringChange(world);																			
										var info=world.find('#controllgrid_minipanel_info');
										var steps=world.find('.stepselectednow').data('ad');
										if ($.browser.msie && $.browser.version >= 7 && $.browser.version < 9 ) {
												if (steps=="1" || steps=="2") 
													changeItemData(item,'starty:ie8',1,world,info)	
												 else 											
													changeItemData(item,'endy_ie8',1,world,info)	
										} else {
												if (steps=="1" || steps=="2") 
													changeItemData(item,'starty',1,world,info)	
												 else 											
													changeItemData(item,'endy',1,world,info)	
										}										
									});
									
									
									// LEFT BUTTON ON THE PANEL
									_left.click(function() {
										var item=hideSelectBoxDuringChange(world);																			
										var info=world.find('#controllgrid_minipanel_info');
										var steps=world.find('.stepselectednow').data('ad');
										if ($.browser.msie && $.browser.version >= 7 && $.browser.version < 9 ) {
												if (steps=="1") 											
													changeItemData(item,'startx_ie8',-1,world,info)
												else
													if (steps=="2") 
														changeItemData(item,'endx_ie8',-1,world,info)
													 else 										
														if (steps=="3") 
															changeItemData(item,'zoomxoffset_ie8',-1,world,info)
														else
															if (steps=="4") 
																changeItemData(item,'zoomxendoffset_ie8',-1,world,info)
										} else {
												if (steps=="1") 											
													changeItemData(item,'startx',-1,world,info)
												else
													if (steps=="2") 
														changeItemData(item,'endx',-1,world,info)
													 else 										
														if (steps=="3") 
															changeItemData(item,'zoomxoffset',-1,world,info)
														else
															if (steps=="4") 
																changeItemData(item,'zoomxendoffset',-1,world,info)
										}
									});
									
									
									// RIGHT BUTTON ON THE PANEL
									_right.click(function() {
										var item=hideSelectBoxDuringChange(world);										
										var info=world.find('#controllgrid_minipanel_info');										
										var steps=world.find('.stepselectednow').data('ad');
										if ($.browser.msie && $.browser.version >= 7 && $.browser.version < 9 ) {
												if (steps=="1") 											
													changeItemData(item,'startx_ie8',1,world,info)
												else
													if (steps=="2") 
														changeItemData(item,'endx_ie8',1,world,info)
													 else 										
														if (steps=="3") 
															changeItemData(item,'zoomxoffset_ie8',1,world,info)
														else
															if (steps=="4") 
																changeItemData(item,'zoomxendoffset_ie8',1,world,info)
										 } else {
										 		if (steps=="1") 											
													changeItemData(item,'startx',1,world,info)
												else
													if (steps=="2") 
														changeItemData(item,'endx',1,world,info)
													 else 										
														if (steps=="3") 
															changeItemData(item,'zoomxoffset',1,world,info)
														else
															if (steps=="4") 
																changeItemData(item,'zoomxendoffset',1,world,info)
										 }
									});
									
									calholder.append(minipanel);
								
									
					}
					
					
					
					function getPageScroll() {
						var  yScroll;
						if (self.pageYOffset) {
						  yScroll = self.pageYOffset;
						  
						} else if (document.documentElement && document.documentElement.scrollTop) {
						  yScroll = document.documentElement.scrollTop;
						  
						} else if (document.body) {// all other Explorers
						  yScroll = document.body.scrollTop;
						  
						}
						return yScroll;
					}

					
					/////////////////////////
					// CREATE LIGHTBOX NOW //
					////////////////////////
					function createLightBox(world) {
						
					  // var doc=world;
						//for (var i=0;i<100;i++) 
						//	if (doc.parent().html() != null) doc=world.parent();
						world.css({'z-index':'5000'});
						var overlay=$('<div id="lboxoverlay" class="controllgrid_lightbox_overlay"></div>');
						overlay.css({	'width':$(window).width()+'px',
										'height':($(window).height()+150)+'px',
										'opacity':'0.7'});						
						$('body').append(overlay);
						
						
						//ADD THE LIGHTBOX AND ADD THE CLOSE BUTTON TO IT AS WELL
						var file=("file"==(String($(location).attr('href')).substring(0,4)));

						if (!file) 
							var Header="Click icon to copy to clipboard or copy manually" 
						else
							var Header="Copy HTML manually to clipboard (Offline Modus)" 
						var lb=$('<div id="controllgird_lbox" class="controllgrid_lightbox_holder"><div id="cggreybox" class="greybox"><div class="controllgrid_lightbox_holder_icon"></div><div class="controllgrid_lightbox_header">'+Header+'</div></div></div>');						
						lb.css( {'top': Math.round( ($( window ).height() - lb.outerHeight() ) / 2 ) + 'px', 'left': Math.round( ($( window ).width() - lb.outerWidth() ) / 2 ) + 'px', 'margin-top': 0, 'margin-left': 0} )						
																						
						var cb=$('<div id="controllgrid_lightbox_holder_closebutton" class="controllgrid_lightbox_holder_closebutton"></div>')						
						$('body').append(lb);
						lb.append(cb);

						lb.delay(1).animate( {'top': getPageScroll() + Math.round( ($( window ).height() - lb.outerHeight() ) / 2 ) + 'px', 
										 'left': Math.round( ($( window ).width() - lb.outerWidth() ) / 2 ) + 'px'} ,
										{duration:10,queue:true})
									
						cb.click(function() {
							$('body').unbind();
							$('body').find('#lboxoverlay').remove();
							$('body').find('#controllgird_lbox').remove();
							world.css({'z-index':'9000'});
						});
						
						
						
						var old=$('<div id="old_parallax">'+world.data('old_html')+'</div>');
						
						
						var texts="";
						
						old.children().each(function(i) {
							var $this=$(this);		
							var item_id=$this.attr('id');
							var $orig=world.find('#'+item_id);		
							var minitexts=$this.clone().wrap('<div></div>').parent().html();
							texts=texts+"<!--\n##############################\n     "+item_id+"  Settings  \n##############################\n-->\n\n";
							minitexts = replaceDataValue('startx',$this,$orig,minitexts);							
							minitexts = replaceDataValue('starty',$this,$orig,minitexts);
							minitexts = replaceDataValue('endx',$this,$orig,minitexts);
							minitexts = replaceDataValue('endy',$this,$orig,minitexts);							
							minitexts = replaceDataValue('startskew',$this,$orig,minitexts);
							minitexts = replaceDataValue('endskew',$this,$orig,minitexts);
							minitexts = replaceDataValue('startx_ie8',$this,$orig,minitexts);
							minitexts = replaceDataValue('starty_ie8',$this,$orig,minitexts);
							minitexts = replaceDataValue('endx_ie8',$this,$orig,minitexts);
							minitexts = replaceDataValue('endy_ie8',$this,$orig,minitexts);
							minitexts = replaceDataValue('zoomxoffset',$this,$orig,minitexts);
							minitexts = replaceDataValue('zoomxoffset_ie8',$this,$orig,minitexts);
							minitexts = replaceDataValue('zoomxendoffset',$this,$orig,minitexts);
							minitexts = replaceDataValue('zoomxendoffset_ie8',$this,$orig,minitexts);
							texts=texts+"        "+minitexts+"\n\n";
						});
						
																													
						lb.append('<div id="new_htmlsource" style="overflow:hidden;width:800px;height:460px;margin-left:0px;margin-top:20px"></div>');
						lb.find('#new_htmlsource').html('<textarea id="result_html" style="padding:10px;margin-top:-3px;width:785px;height:466px;">'+texts+'</textarea>');
						
						lb.find('#result_html').select();
						// COPY PASTE ISSUES

						if (!file) {						
							world.data('result',lb.find('#result_html').val());

							lb.find('.controllgrid_lightbox_holder_icon').zclip({
									path:world.data('path'),
									copy:world.data('result')
								});
						}
							
						
			
									
						
						// DEPENDING ON THE SCROLL OR RESIZING EFFECT, WE SHOULD REPOSITION THE LIGHTBOX
						$(window).bind('resize scroll', function() {
							
							var $this=$(this);							
							var overlay=$('body').find('#lboxoverlay');
							var lb=$('body').find('#controllgird_lbox');
							
							
							overlay.css({'width':$this.width()+'px',
										'height':($this.height()+150)+'px',
										'top':getPageScroll()
										});
							
							lb.stop();
							lb.animate( {'top': getPageScroll() + Math.round( ($( window ).height() - lb.outerHeight() ) / 2 ) + 'px', 
										 'left': Math.round( ($( window ).width() - lb.outerWidth() ) / 2 ) + 'px'} ,
										{duration:300,queue:false})
							
							
						});
						
					}
					
					
					//////////////////////////////////////////
					// PREPARE THE NEW HTML TEXT FOR EXPORT //
					//////////////////////////////////////////
					function replaceDataValue(what,old,neu,where) {							
							where=where.replace('data-'+what+'="'+old.data(what)+'"','data-'+what+'="'+neu.data(what)+'"');							
							return where;
						}
					
					
					
					///////////////////////////////////////
					// CHANGE THE VALUE OF DATAS IN ITEM //
					///////////////////////////////////////
					function changeItemData(item,dat,dir,world,info) {						
						var st=parseInt(world.find(".selectedgap").data('st'),0);
						if (dir=="-1") {
							item.data(dat,item.data(dat)-st);							
						} else {
							item.data(dat,item.data(dat)+st);		
						}
						
						info.html(item.data(dat));
						resetWorld(world);												
					}
									
					
					///////////////////////////////////////////
					// CHANGE BETWEEN THE CALIBRATION STEPS //
					///////////////////////////////////////////
					function swapCalibrationStep(world,$this) {
										
										$this.parent().find('.controllgrid_steps').each(function() {
											var $this=$(this);
											$this.css({'background-position':'top'});
											$this.removeClass("stepselectednow");
										});
										
										$this.css({'background-position':'bottom'});
										$this.addClass("stepselectednow");
										
										var maininfo=world.find('#controllgrid_minipanel_info');
										maininfo.html("INFO");
										
										////////////////////////////////////////////////////////////
										// Change the Panel Settings, so evrything is in Position//
										//////////////////////////////////////////////////////////
										var skews = world.find('.controllgrid_skew_start');
										var skewe = world.find('.controllgrid_skew_end');
										var skewp = world.find('.controllgrid_skew_plus');
										var skewm = world.find('.controllgrid_skew_minus');
										var skewt = world.find('.skew_text');
										var skewv = world.find('.controllgrid_skew_value');
										
										var mint = world.find('.controllgrid_minipanel_text');
										
										skews.css({'display':'block'});
										skewe.css({'display':'block'});
										skewp.css({'display':'block'});
										skewm.css({'display':'block'});
										skewt.css({'display':'block'});
										skewv.css({'display':'block'});
										mint.css({'margin-top':'50px'});
										mint.html('<b>Start X/Y</b> Position:');
										
										
										// THE 1st STEP IN CALIBRATION
										if ($this.data('ad')=="1") {
											skewt.html('<b>Start</b> Skew');
											skews.css({'opacity':'1.0'});
											skewe.css({'opacity':'0.0'});
											world.data('mouseX',0);
											world.data('mouseY',0);
											var sb=world.find('#selectbox');										
											var item=sb.parent();										
											var info=world.find('.controllgrid_skew_value');			
											info.html(item.data('startskew'));
											resetWorld(world);
											
										} else {
											
											// THE 2nd STEP IN CALIBRATION
											if ($this.data('ad')=="2") {
												skewt.html('<b>End</b> Skew');
												mint.html('<b>End X/Y</b> Position:');
												skews.css({'opacity':'0.0'});
												skewe.css({'opacity':'1.0'});
												world.data('mouseX',3000);
												world.data('mouseY',0);
												var sb=world.find('#selectbox');										
												var item=sb.parent();										
												var info=world.find('.controllgrid_skew_value');			
												info.html(item.data('endskew'));
												resetWorld(world);
												//...
											} else {
												skews.css({'display':'none'});
												skewe.css({'display':'none'});
												skewp.css({'display':'none'});
												skewm.css({'display':'none'});
												skewt.css({'display':'none'});
												skewv.css({'display':'none'});
												mint.css({'margin-top':'-35px'});
												
												// THE 3th STEP IN CALIBRATION
												if ($this.data('ad')=="3") {
													mint.html('<b>End Y</b> Position &<br> <b>Zoom Dependend</b> Horizontal <b>Offset</b>:');
													skews.css({'opacity':'0.0'});
													skewe.css({'opacity':'0.0'});
													world.data('mouseX',0);
													world.data('mouseY',3000);
													resetWorld(world);
												} else {
												
													// THE 4th STEP IN CALIBRATION
													if ($this.data('ad')=="4") {
														mint.html('<b>End Y</b> Position &<br> <b>Zoom Dependend</b> Horizontal <b>Offset</b>:');
														skews.css({'opacity':'0.0'});
														skewe.css({'opacity':'0.0'});
														world.data('mouseX',3000);
														world.data('mouseY',3000);
														resetWorld(world);
													}}}}
									};
					
					///////////////////////////////////////////////////////////////
					// THIS FUNCTION HIDES THE SELECTBOX DURING CHANGES VALUES   //
					///////////////////////////////////////////////////////////////
					function hideSelectBoxDuringChange(world) {
										var sb=world.find('#selectbox');										
										sb.stop(true,true)
										sb.css({'opacity':'0.0'});										
										sb.animate({'opacity':'0.2'},{duration:3000,queue:false})										
										var item=sb.parent();
										if (item.data('startx')==undefined) item=item.parent();	
										return item;
									}
									
	
				
				
})(jQuery);			

				
			

			   