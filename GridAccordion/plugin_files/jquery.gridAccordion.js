/*
	Grid Accordion
*/
(function($) {
	
	function GridAccordion(instance, options) {
		
		// contains all the settings for the accordion
		this.settings = $.extend({}, $.fn.gridAccordion.defaults, options);
		
		// reference to the main DIV that contains the slideshow
		var accordion = $(instance),
			
			// reference to the current object
			self = this,
			
			// index of the current panel
			currentIndex = -1,
			
			// array of objects, each object containing data(path, caption etc.) about the panel
			panels = [],
			
			// array of DIV panel objects
			panelDivs = [],
			
			// will be used as the timer for the slideshow mode
			slideshowTimer = 0,
			
			// these properties can be assign to individual panels in the XML file
			panelProps = ['captionFadeDuration', 'captionWidth', 'captionHeight', 'captionTop', 'captionLeft', 'linkTarget'],
			
			// the initial width of the panels
			initialPanelWidth,
			
			// the initial height of the panels
			initialPanelHeight,
			
			// the width of the panel when it is opened
			openedPanelWidth,
			
			// the height of the panel when it is opened
			openedPanelHeight,
			
			// the current state of the accordion. can be 'opened' or 'closed'
			accordionState = 'closed',
			
			// the total width of the margins and borders
			outerWidth = 0,
			
			// the total height of the margins and borders
			outerHeight = 0,
			
			// the total number of panels
			totalPanels = 0,
			
			// the number of columns
			columns,
			
			// the number of rows
			rows,
			
			// timer used to delay the opening of the panel
			openPanelTimer;
		
		
		// START
		init();
		

		/**
		* Initializes the accordion
		*/
		function init() {
			// delete the content of the selected DIV and initialize it
			accordion.addClass('accordion')
			 	  	 .css({width: self.settings.width, height: self.settings.height});
			
			if (self.settings.xmlSource) {
				// delete the previous content of the selected DIV
				accordion.empty();
				
				//parse the XML file
				$.ajax({type:'GET', url:self.settings.xmlSource, dataType: $.browser.msie ? 'text' : 'xml', success:function(data) {																													
					var xml;
					
					if ($.browser.msie) {
						xml = new ActiveXObject('Microsoft.XMLDOM');
						xml.async = false;
						xml.loadXML(data);
					} else {
						xml = data;
					}
					
					// find all the <panel> nodes
					$(xml).find('panel').each(function() {
						// will contain data such as path, caption or link
						var panel = {};
						
						// will contain data such as alignType etc.
						panel.properties = {};
						
						// reads all the tags that were specified for a panel in the XML file
						for (var i = 0; i < $(this).children().length; i++) {						
							var node = $(this).children()[i];
							panel[node.nodeName] = $(this).find(node.nodeName).text();
						}
						
						// reads all the attributes that were specified for a slide in the XML file
						for (var i = 0; i < panelProps.length; i++) {
							var name = panelProps[i],
								value = $(this).attr(name);
								
							// if a property was not specified in the XML file, take the default value
							if (value == undefined)
								panel.properties[name] = self.settings[name];
							else
								panel.properties[name] = value;
						}
						
						panels.push(panel);
					});
					
					loadPanels();					
				}});
			} else {
				// if an XML file was not specified, read the content of the selected div
				accordion.children().each(function(index) {					  
					// will contain data such as path, caption, or link
					var panel = {};
					
					// will contain data such as alignType etc.
					panel.properties = {};

					// loops through all the sub-children of child
					for (var i = 0; i < $(this).children().length; i++) {
						var data = $(this).children()[i];
						
						// check whether the current sub-child is an image, a link, or a paragraph, and copy the data
						if($(data).is('a')) {
							panel['path'] = $(data).find('img').attr('src');
							panel['link'] = $(data).attr('href');
							if ($(data).attr('target'))
								panel.properties.linkTarget = $(data).attr('target');
						} else if($(data).is('img')) {
							panel['path'] = $(data).attr('src');
						} else {
							panel[$(data).attr('class')] = $(data).html();
						}
					}
					
					// reads all the settings that were specified for each panel
					for (var i = 0; i < panelProps.length; i++) {
						var name = panelProps[i],
							value;
						
						if (self.settings.panelProperties)
							if (self.settings.panelProperties[index])
								value = self.settings.panelProperties[index][name];
								
						// if a property was not specified, take the default value
						if (!panel.properties[name])
							if (value == undefined)
								panel.properties[name] = self.settings[name];
							else
								panel.properties[name] = value;
					}
					
					panels.push(panel);
				});
				
				// delete the current content of the selected div and create the accordion
				accordion.empty();
				loadPanels();
			}
		}
		
		
		/**
		* Loads the panels
		*/
		function loadPanels() {
			// randomizes the panels
			if (self.settings.shuffle)
				panels.sort(function(){return 0.5 - Math.random()});
			
			// preloades all the images
			if (self.settings.preloadPanels) {
				showPreloader();
				
				// contains the number of slides that were preloaded
				var counter = 0,
						
					// the number of slides that need to be preloaded
					n = panels.length;
						
				// load the images
				for (var i = 0; i < n; i++) {						
					$('<img/>').load(function() {										 
										 counter++;
										 if (counter == n) {
											 hidePreloader();
											 displayPanels();
										 }
									 })
								.attr('src', panels[i].path);
				}
			} else {
				 displayPanels();
			}
		}
		
		
		
		/**
		* Displays the panels
		*/
		function  displayPanels() {
			totalPanels = panels.length;
			
			columns = self.settings.columns;
			
			rows = Math.ceil(totalPanels / columns);
			
			// calculate the initial panel width
			initialPanelWidth = (self.settings.width - (columns - 1) * self.settings.distance) / self.settings.columns;
			
			// calculate the initial panel height
			initialPanelHeight = (self.settings.height - (rows - 1) * self.settings.distance) / Math.ceil(totalPanels / self.settings.columns);
			
			// calculate the opened panel width
			openedPanelWidth = self.settings.width - (columns - 1) * (self.settings.closedPanelWidth + self.settings.distance);
			
			// calculate the opened panel height
			openedPanelHeight = self.settings.height - (rows - 1) * (self.settings.closedPanelHeight + self.settings.distance);
			
			
			// create a dummy div in order to calculate the width/height of the border, margins and other elements
			var div = $('<div class="panel"></div>').appendTo(accordion);			
			outerWidth = (isNaN(parseInt(div.css('borderLeftWidth'))) ? 0 : parseInt(div.css('borderLeftWidth'))) + (isNaN(parseInt(div.css('borderRightWidth'))) ? 0 : parseInt(div.css('borderRightWidth')));
			outerHeight = (isNaN(parseInt(div.css('borderTopWidth'))) ? 0 : parseInt(div.css('borderTopWidth'))) + (isNaN(parseInt(div.css('borderBottomWidth'))) ? 0 : parseInt(div.css('borderBottomWidth')));			
			div.remove();
			
			for (var i = 0; i < totalPanels; i++)
				createPanel(i);
			
			if (self.settings.slideshow)
				startSlideshow();
			
			// pause or resume the slidethos on hover
			// also close all the panels on mouse out
			accordion.hover(function() {
								if (self.settings.slideshow && self.settings.stopSlideshowOnHover)
									stopSlideshow();
							},
							
							function() {
								if (self.settings.closePanelOnMouseOut)
									resetPanels();
									
								if (self.settings.slideshow && self.settings.stopSlideshowOnHover)
									startSlideshow();
							});
		}
		
		
		/**
		* Creates a panel 
		*/
		function createPanel(index) {
			var	panel = $('<div class="panel"></div>').appendTo(accordion);
			
			panelDivs.push(panel);
			
			// temporarily set the panel's size to the default size
			// this value might change after the image is loaded and its actual size becomes available
			panels[index].width = openedPanelWidth;
			panels[index].height = openedPanelHeight;
			
			// preload the image
			$('<img/>').load(function() {
							// when it's loaded replace the preloader with the actual image
							panelDivs[index].css('background-image', 'url(' + $(this).attr('src') + ')');
							
							// set the alignment of the image
							switch (self.settings.alignType) {
								case 'leftTop':
									panelDivs[index].css('background-position', 'left top');
									break;
									
								case 'leftCenter':
									panelDivs[index].css('background-position', 'left center');
									break;
								
								case 'leftBottom':
									panelDivs[index].css('background-position', 'left bottom');
									break;
								
								case 'centerTop':
									panelDivs[index].css('background-position', 'center top');
									break;
								
								case 'centerCenter':
									panelDivs[index].css('background-position', 'center center');
									break;
								
								case 'centerBottom':
									panelDivs[index].css('background-position', 'center bottom');
									break;
									
								case 'rightTop':
									panelDivs[index].css('background-position', 'right top');
									break;
									
								case 'rightCenter':
									panelDivs[index].css('background-position', 'right center');
									break;
									
								case 'rightBottom':
									panelDivs[index].css('background-position', 'right bottom');
									break;
									
								case 'default':
									panelDivs[index].css('background-position', 'left top');
							}
							
							// create the shadow
							if (self.settings.shadow)
								var shadow = $('<div class="shadow"></div>').appendTo(panel);
							
							panels[index].width	= $(this).attr('width');
							panels[index].height = $(this).attr('height');
							
							// fire the panelLoaded event
							var eventObject = {type: 'panelLoaded', index:index, data:panels[index]};
							$.isFunction(self.settings.panelLoaded) && self.settings.panelLoaded.call(this, eventObject);
						})
						.attr('src', panels[index].path);
			
			// set the initial size and position of the panel
			panel.css('width',  initialPanelWidth - outerWidth);
			panel.css('height', initialPanelHeight - outerHeight);			
			panel.css('left', (index % columns) * (initialPanelWidth  + self.settings.distance));
			panel.css('top', Math.floor(index / columns) * (initialPanelHeight  + self.settings.distance));
			
			
			// listen for mouse over and mouse out
			panel.hover(
				function(event) {
					if (self.settings.openPanelOnMouseOver) {
						if (openPanelTimer)
							clearTimeout(openPanelTimer);
						// set a delay before opening the panel
						openPanelTimer = setTimeout(function() {openPanel(index);}, self.settings.openPanelDelay);
					}
					
					// fire the panelMouseOver event
					var eventObject = {type: 'panelMouseOver', index:index, data:panels[index]};
					$.isFunction(self.settings.panelMouseOver) && self.settings.panelMouseOver.call(this, eventObject);
				},
				function() {
					// fire the panelMouseOut event
					var eventObject = {type: 'panelMouseOut', index:index, data:panels[index]};
					$.isFunction(self.settings.panelMouseOut) && self.settings.panelMouseOut.call(this, eventObject);
				}
			);			
			
			if(panels[index].link)
				panel.css('cursor', 'pointer');
								
			//listen for clicks
			panel.click(function() {
				if (self.settings.openPanelOnClick)
					openPanel(index);
				
				if(panels[index].link)
					window.open(panels[index].link, panels[index].properties.linkTarget);
				
				// fire the panelClick event
				var eventObject = {type: 'panelClick', index:index, data:panels[index]};
				$.isFunction(self.settings.panelClick) && self.settings.panelClick.call(this, eventObject);
			});
			
			
			// fire the panelCreated event
			var eventObject = {type: 'panelCreated', index:index, data:panels[index]};
			$.isFunction(self.settings.panelCreated) && self.settings.panelCreated.call(this, eventObject);
			
			if (index == panels.length - 1) {
				// fire the panelCreated event
				var eventObject = {type: 'allPanelsCreated'};
				$.isFunction(self.settings.allPanelsCreated) && self.settings.allPanelsCreated.call(this, eventObject);
			}
		}
		
		
		/**
		* Opens the panel with the specified index
		*/
		function openPanel(index) {
			if (currentIndex == index && accordionState == 'opened')
				return;
												 
			// change the accordion state
			accordionState = 'opened';
			
			// stop any running animation
			if (currentIndex != -1)
				panelDivs[currentIndex].stop();
			
			currentIndex = index;
			
			// fire the openPanel event
			var eventObject = {type: 'openPanel', index:index, data:panels[index]};
			$.isFunction(self.settings.openPanel) && self.settings.openPanel.call(this, eventObject);
			
			removeCaption();
				
			// this flag will assure that some actions are only being done once
			var flag = false,
				// reference to the opened panel
				openedPanel = panelDivs[currentIndex],			
				
				// the width of the opened panel (used to calcualte the progress)
				openedWidth,
				// the height of the opened panel (used to calcualte the progress)
				openedHeight;
				
			if (self.settings.openedPanelWidth == 'auto') {
				openedWidth = openedPanelWidth;
				
				for (var i = 0; i < totalPanels; i++)
					if (i % columns == currentIndex % columns)
						openedWidth = Math.min(openedWidth, panels[i].width);
						
			} else if (self.settings.openedPanelWidth == 'max') {
				openedWidth = panels[currentIndex].width;
			} else {
				openedWidth = self.settings.openedPanelWidth;
			}
			
			
			if (self.settings.openedPanelHeight == 'auto') {
				openedHeight = openedPanelHeight;
				
				for (var i = 0; i < totalPanels; i++)
					if (Math.floor(i / columns) == Math.floor(currentIndex / columns))
						openedHeight = Math.min(openedHeight, panels[i].height);
						
			} else if (self.settings.openedPanelHeight == 'max') {
				openedHeight = panels[currentIndex].height;
			} else {
				openedHeight = self.settings.openedPanelHeight;
			}
				
			
				
				
			// the width of the closed panels
			var	closedWidth = (self.settings.width - (columns - 1) * self.settings.distance - openedWidth) / (columns - 1),
				// the height of the closed panels
				closedHeight = (self.settings.height - (rows - 1) * self.settings.distance - openedHeight) / (rows - 1),
				// the target left value for the panle's position
				openedTargetLeft = currentIndex * (closedWidth + self.settings.distance),
				// the target top value for the panle's position
				openedTargetTop = currentIndex * (closedHeight + self.settings.distance),
				// holds the properties that will be animated
				anim = {},
				
				// array containing the target width values of the panels
				targetWidthArray = [],
				// array containing the initial width values of the panels
				startWidthArray = [],
				// array containing the target height values of the panels
				targetHeightArray = [],
				// array containing the initial height values of the panels
				startHeightArray = [],
				
				// array containing the target position values of the panels
				targetLeftArray = [],
				// array containing the initial position values of the panels
				startLeftArray = [],
				// array containing the target top values of the panels
				targetTopArray = [],
				// array containing the initial top values of the panels
				startTopArray = [],
				
				// a number from 0 to 1 indicating the current progress of the animation
				progress;
				
			// populate the arrays with the initial values and the target values
			for (var i = 0; i < totalPanels; i++) {
				startWidthArray[i] = parseFloat(panelDivs[i].css('width'));
				startHeightArray[i] = parseFloat(panelDivs[i].css('height'));
				startLeftArray[i] = parseFloat(panelDivs[i].css('left'));
				startTopArray[i] = parseFloat(panelDivs[i].css('top'));
				
				// calculate the target size of each panel
				if (i == currentIndex) {
					targetWidthArray[i] = openedWidth - outerWidth;				
					targetHeightArray[i] = openedHeight - outerHeight;	
				} else {
					if (i % columns == currentIndex % columns)
						targetWidthArray[i] = Math.min(openedWidth - outerWidth, panels[i].width);
					else
						targetWidthArray[i] = closedWidth - outerWidth;
					
					if (Math.floor(i / columns) == Math.floor(currentIndex / columns))
						targetHeightArray[i] = Math.min(openedHeight - outerHeight, panels[i].height);
					else
						targetHeightArray[i] = closedHeight - outerHeight;
				}
				
				// calculate the target position of each panel
				targetLeftArray[i] = (i % columns) * (closedWidth + self.settings.distance) + 
									 ((i % columns) <= (currentIndex % columns) ? 0 : openedWidth - closedWidth)+
									 ((i % columns == currentIndex % columns && openedWidth - outerWidth > targetWidthArray[i]) ? (openedWidth - outerWidth - targetWidthArray[i]) / 2 : 0);
									 
				targetTopArray[i] = Math.floor(i / columns) * (closedHeight + self.settings.distance) + 
									(Math.floor(i / columns) <= Math.floor(currentIndex / columns) ? 0 : openedHeight - closedHeight) +
									((Math.floor(i / columns) == Math.floor(currentIndex / columns) && openedHeight - outerHeight > targetHeightArray[i]) ? (openedHeight - outerHeight - targetHeightArray[i]) / 2 : 0);
				
			}
			
			// used to calculate the progress
			var	openedStartSize,
				openedSize,
				outerSize;
				
			// animate the width or height depending on which value has changed	
			if (parseFloat(openedPanel.css('width')) != openedWidth - outerWidth) {
				openedStartSize = parseFloat(openedPanel.css('width'));
				openedSize = openedWidth;
				outerSize = outerWidth;
				anim.width = openedSize - outerSize;
			} else {
				openedStartSize = parseFloat(openedPanel.css('height'));
				openedSize = openedHeight;
				outerSize = outerHeight;
				anim.height = openedSize - outerSize;
			}
			
			
			// stop any running animation
			openedPanel.stop();
			
			// if there are properties that have changed, start the animation
			openedPanel.animate(anim, {duration: self.settings.slideDuration, 
				complete: function() {
					if (!flag) {
						flag = true;
						// when the animation is complete, create the caption
						if (panels[index].caption)
							createCaption(panels[index].caption);
						
						// fire the animationComplete event
						var eventObject = {type: 'animationComplete'};
						$.isFunction(self.settings.animationComplete) && self.settings.animationComplete.call(this, eventObject);
					}
				},
				
				step: function(currentValue) {
					progress = (currentValue - openedStartSize) / (openedSize - outerSize - openedStartSize);
					
					for (var i = 0; i < totalPanels; i++) {
						panelDivs[i].css('width', progress * (targetWidthArray[i] - startWidthArray[i]) + startWidthArray[i]);
						panelDivs[i].css('height', progress * (targetHeightArray[i] - startHeightArray[i]) + startHeightArray[i]);
						panelDivs[i].css('left', progress * (targetLeftArray[i] - startLeftArray[i]) + startLeftArray[i]);
						panelDivs[i].css('top', progress * (targetTopArray[i] - startTopArray[i]) + startTopArray[i]);
					}
						
				}
			});
			
		}
		
		
		/**
		* Rearranges all the panels in their initial state
		*/
		function resetPanels() {
			// change the state of the accordion
			accordionState = 'closed';
			
			if (openPanelTimer)
				clearTimeout(openPanelTimer);
				
			removeCaption();
			
			// this flag will assure that some actions are only being done once
			var	flag = false,
				// reference to the opened panel
				openedPanel = panelDivs[currentIndex],
				// the initial size of the selected opened panel (used only to calcualte the progress)
				openedStartWidth = parseFloat(openedPanel.css('width')),
				// holds the properties that will be animated
				anim = {},
				
				// array containing the target width values of the panels
				targetWidthArray = [],
				// array containing the initial width values of the panels
				startWidthArray = [],
				// array containing the target height values of the panels
				targetHeightArray = [],
				// array containing the initial height values of the panels
				startHeightArray = [],
				
				// array containing the target position values of the panels
				targetLeftArray = [],
				// array containing the initial position values of the panels
				startLeftArray = [],
				// array containing the target top values of the panels
				targetTopArray = [],
				// array containing the initial top values of the panels
				startTopArray = [],
				
				// a number from 0 to 1 indicating the current progress of the animation
				progress;
			
			// populate the arrays with the correct values
			for (var i = 0; i < totalPanels; i++) {				
				startWidthArray[i] = parseFloat(panelDivs[i].css('width'));
				startHeightArray[i] = parseFloat(panelDivs[i].css('height'));
				targetWidthArray[i] = initialPanelWidth - outerWidth;
				targetHeightArray[i] = initialPanelHeight - outerHeight;
				
				startLeftArray[i] = parseFloat(panelDivs[i].css('left'));
				startTopArray[i] = parseFloat(panelDivs[i].css('top'));
				targetLeftArray[i] = (i % columns) * (initialPanelWidth  + self.settings.distance);
				targetTopArray[i] = Math.floor(i / columns) * (initialPanelHeight  + self.settings.distance);
			}
				
			anim.width = initialPanelWidth - outerWidth;
			
			// stop any running animation
			openedPanel.stop();
			
			// if there are properties that have changed, start the animation
			openedPanel.animate(anim, {duration: self.settings.slideDuration, 
				complete: function() {
					if (!flag) {
						flag = true;
								
						// fire the animationComplete event
						var eventObject = {type: 'animationComplete'};
						$.isFunction(self.settings.animationComplete) && self.settings.animationComplete.call(this, eventObject);
					}
				},
				step: function(currentValue) {
					progress = (openedStartWidth - currentValue) / (openedStartWidth - initialPanelWidth + outerWidth);
					
					for (var i = 0; i < totalPanels; i++) {
						panelDivs[i].css('width', progress * (targetWidthArray[i] - startWidthArray[i]) + startWidthArray[i]);
						panelDivs[i].css('height', progress * (targetHeightArray[i] - startHeightArray[i]) + startHeightArray[i]);
						panelDivs[i].css('left', progress * (targetLeftArray[i] - startLeftArray[i]) + startLeftArray[i]);
						panelDivs[i].css('top', progress * (targetTopArray[i] - startTopArray[i]) + startTopArray[i]);
					}
					
				}
			});
		}
		
		
		/**
		* Opens the next panel
		*/
		function nextPanel() {				
			var index = (currentIndex == panels.length - 1) ? 0 : (currentIndex + 1);
			openPanel(index);
		}
		
		
		/**
		* Opens the previous panel
		*/
		function previousPanel() {
			var index = currentIndex == 0 ? (panels.length - 1) : (currentIndex - 1);
			openPanel(index);
		}
		
		
		/**
		* Shows the main preloader
		*/
		function showPreloader() {
			var preloader = $('<div class="preloader"></div>').hide()
										   				      .fadeIn(300)
										   				      .appendTo(accordion),
				
				// calculate the preloader's position
				preloaderLeft = ((self.settings.width - parseInt(preloader.css('width'))) * 0.5),
				preloaderTop = ((self.settings.height - parseInt(preloader.css('height'))) * 0.5);
			
			preloader.css({'left':preloaderLeft, 'top':preloaderTop});
		}
		
		
		/**
		* Hides the main preloader
		*/
		function hidePreloader() {
			accordion.find('.preloader').remove();
		}
		
		
		/**
		* Creates the caption
		*/
		function createCaption(captionText) {
			// get the specified values for the current caption
			var panelData = panels[currentIndex],
				properties = panelData.properties,
				captionFadeDuration = parseInt(properties.captionFadeDuration),
				captionWidth = parseInt(properties.captionWidth),
				captionHeight = parseInt(properties.captionHeight),
				captionTop = parseInt(properties.captionTop),
				captionLeft = parseInt(properties.captionLeft),
				
				// create the main caption container
				caption = $('<div class="caption"></div>').css({'width':captionWidth, 'height':captionHeight,
															    'left':captionLeft, 'top':captionTop,
															    'opacity': 0})
														  .appendTo(panelDivs[currentIndex]),
				
				// create the background
				captionBackground = $('<div class="caption-background"></div>').css({'width':'100%', 'height': '100%'}).appendTo(caption),			
				
				// create the content of the caption
				captionContent = $('<p></p>').html(captionText)
											 .css({'width':'100%', 'height': '100%', 'opacity': 1})
											 .appendTo(captionBackground);
				
			// slide in the caption
			caption.animate({'opacity': 1}, captionFadeDuration);			
		}
		
		
		/**
		* Removes the caption
		*/
		function removeCaption() {
			var caption = accordion.find('.caption');
			
			if (caption)
				caption.stop().animate({'opacity': 0}, 300, function(){caption.remove();});
		}		
		
		
		/**
		* Starts the slideshow
		*/
		function startSlideshow() {			
			slideshowTimer = setInterval(function() {
				if (self.settings.slideshowDirection == 'next')
					nextPanel();
				else if (self.settings.slideshowDirection == 'previous')
					previousPanel();
			}, self.settings.slideshowDelay);
		}
		
		
		/**
		* Stops the slideshow
		*/
		function stopSlideshow() {			
			if (slideshowTimer)
				clearInterval(slideshowTimer);
		}
		
		
		// PUBLIC METHODS
		
		this.nextPanel = nextPanel;
		
		this.previousSlide = previousPanel;
		
		this.openPanel = openPanel;
		
		this.startSlideshow = function() {
			startSlideshow();
		};
		
		this.stopSlideshow = function() {
			stopSlideshow();
		};
		
		this.getSlideshowState = function() {
			return slideshowState;
		};
		
		this.getCurrentIndex = function() {
			return currentIndex;	
		};
		
		this.getPanelAt = function(index) {
			return panels[index];	
		};
		
		this.getAccordionState = function() {
			return accordionState;	
		};
	}
	
	
	$.fn.gridAccordion = function(options) {
		var collection = [];
		
		for (var i = 0; i < this.length; i++) {
			if (!this[i].accordion) {
				this[i].accordion = new GridAccordion(this[i], options);
				collection.push(this[i].accordion);
			}
		}
		
		// if there are more accordion instances, return the array
		// it there is only one, return just the accordion instance
		return collection.length > 1 ? collection : collection[0];
	};
	
	
	// default settings
	$.fn.gridAccordion.defaults =  {
		xmlSource:null,
		width:500,
		height:300,
		alignType:'leftTop',
		distance:0,
		columns:3,
		slideshow:false,
		slideshowDelay:5000,
		slideshowDirection:'next',
		stopSlideshowOnHover:true,
		slideDuration:700,
		openPanelOnMouseOver:true,
		closePanelOnMouseOut:true,
		openPanelOnClick:false,
		preloadPanels:false,
		shuffle:false,
		openedPanelWidth:'auto',
		openedPanelHeight:'auto',
		closedPanelWidth:30,
		closedPanelHeight:30,
		captionFadeDuration:500,
		captionWidth:300, 
		captionHeight:100, 
		captionTop:100, 
		captionLeft:30,
		shadow:false,
		linkTarget:'_blank',
		openPanelDelay:200,
		panelProperties:null,
		panelMouseOver:null,
		panelMouseOut:null,
		panelClick:null,
		panelLoaded:null,
		panelCreated:null,
		allPanelsCreated:null,
		animationComplete:null,
		openPanel:null
	};
	
})(jQuery);