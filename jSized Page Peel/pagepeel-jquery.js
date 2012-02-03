/**
 * X-Team Page Peel, v1.1.1
 *
 * @copyright Copyright (c) 2009 X-Team, <a href="http://x-team.com/">X-Team</a>
 * @author Stephen Reay
 * @version 1.1.1
 */

/**
 * X-Team Namespace
 * @namespace
 */
if (typeof Xteam == 'undefined') {
	Xteam = {};
}

/**
 * X-Team UI Namespace
 * @namespace
 */
if (typeof Xteam.Ui == 'undefined') {
	Xteam.Ui = {};
}

/**
 * Create a peel on the page corner, without Flash!
 * @class
 * @param {HTMLElement|String} element the base element for the peel
 * @param {Object} [options] configuration options for the peel
 */
Xteam.Ui.PagePeel = function (element, options) {
	var self = this,
		options = options || {};
	
	// This class needs to be instantiated, but we'll let it slide.
	if (this.constructor !== arguments.callee) {
		return new arguments.callee(element, options);
	}
	
	// Timeouts for adding open & full classes
	this.Timeouts = {
		openClass: 0,
		fullClass: 0,
		closeTeaser: 0
	};
	
	// Base element
	this.element = this.findElement(element);
	this.addClass(this.element, 'xteam-pagepeel');
	
	// Peel image
	this.peel = this.findElement('img.peel', this.element);
	
	if (this.getBrowser() === 'msie' && this.getBrowserVersion() <= 6) {
		this.fixPNG(this.peel);
	}
	
	// Back element(s)
	this.back = this.findElement('.back', this.element);

	// Merge defaults & user options
	this.options = this.mergeObjects(this.options, options);
	
	// Read the 'original' sizes from the elements' CSS
	this.options.sizes.original = this.mergeObjects(this.options.sizes.original, {
		peel : {
			height: this.getStyle(this.peel, 'height'),
			width: this.getStyle(this.peel, 'width')
		},
		back : {
			height: this.getStyle(this.back, 'height'),
			width: this.getStyle(this.back, 'width')
		}		
	});
	
	// Setup Peel Events
	this.bindEvent(this.element, 'mouseenter', this.foldPeel, 'hover');
	this.bindEvent([this.element, document], 'mouseleave', this.foldPeel, 'original');
		
	// Add support for the 'full' state onclick
	if (this.options.fullOpenOnClick) {
		this.bindEvent(this.element, 'click', this.foldPeel, 'full');
	}
	
	// Setup events to handle the 'full' state when it's 'sticky'
	if (this.options.fullOpenIsSticky) {
		
		
		// Stop random clicks in side the peel from propogating through
		this.bindEvent(this.element, 'click', function (e) {
			this.stopBubble(e);
		});

		// The element(s) that can close the peel onclick
		var closer = this.findElement('.close', this.element);
		if (this.options.fullOpenCloseOnBodyClick) {
			closer = [closer, document];
		}

		// Event listener to close the 'full' peel
		this.bindEvent(closer, 'click', function (e) {
			if (this.hasClass(this.element, 'full') && this.options.fullOpenIsSticky) {
				this.stopBubble(e);
				this.foldPeel(e, 'original');
			} 
		}, true);
	}

	// Setup the "Teaser"	
	if (this.options.teaserInterval) {
		window.setInterval(function () {
			if (!self.hasClass(self.element, 'open')) {
				self.foldPeel(false, 'teaser');
				self.Timeouts.closeTeaser = window.setTimeout(function() {
					self.foldPeel(false, 'original');
				}, self.options.teaserDuration * 1000);
			}
		}, self.options.teaserInterval * 1000);
		
	}
};

Xteam.Ui.PagePeel.prototype = {
	// Fix for references to this.constructor
	constructor: Xteam.Ui.PagePeel,

	/* Class Defaults */
	options: {
		
		teaserInterval: 15, /* The interval (in seconds) at which the "teaser" should show. Set to 0 or false to disable teaser */
		teaserDuration: 5, /* The time (in seconds) the "teaser" should be open */
		fullOpenOnClick: true, /* Whether the Peel opens to the "Full" state when clicked */
		fullOpenIsSticky: true, /* Whether the "Full" state is "sticky" and requires a second click to close */
		fullOpenCloseOnBodyClick: true, /* Whether the "Full", "sticky" state will be closed by a click outside the Peel */
		
		sizes: {
			original: {
				expanded: false,
				open: false,
				full: false
			},
			hover: {
				peel: {
					height: '437px',
					width: '414px'
				},
				
				back: {
					height: '414px',
					width: '414px'
				},
				expanded: true,
				open: true,
				full: false
			},
			
			full: {
				peel: {
					height: '656px',
					width: '621px'
				},
				
				back: {
					height: '621px',
					width: '621px'
				},
				expanded: true,
				open: true,
				full: true
			},
			
			teaser: {
				peel: {
					height: '146px',
					width: '138px'
				},
				
				back: {
					height: '138px',
					width: '138px'
				},
				
				expanded: true,
				open: false,
				full: false
			}
		},
		
		durations: {
			teaser: 200,
			hover: 400,
			full: 400,
			original: 200
		}
	},

	/* Abstract methods */
	findElement: function () {
		throw new Error('This method must be overridden');
	},
	
	getBrowser: function () {
		throw new Error('This method must be overridden');
	},

	getBrowserVersion: function () {
		throw new Error('This method must be overridden');
	},
	
	mergeObjects: function () {
		throw new Error('This method must be overridden');
	},
	
	bindEvent: function () {
		throw new Error('This method must be overridden');
	},
	
	getEventTarget: function () {
		throw new Error('This method must be overridden');
	},
	
	stopBubble: function () {
		throw new Error('This method must be overridden');
	},
	
	addClass: function () {
		throw new Error('This method must be overridden');
	},
	
	removeClass: function () {
		throw new Error('This method must be overridden');
	},
	
	hasClass: function () {
		throw new Error('This method must be overridden');
	},
	
	getStyle: function () {
		throw new Error('This method must be overridden');
	},
	
	setStyle: function () {
		throw new Error('This method must be overridden');
	},
	
	getAttribute: function () {
		throw new Error('This method must be overridden');
	},
	
	setAttribute: function () {
		throw new Error('This method must be overridden');
	},
	
	animate: function () {
		throw new Error('This method must be overridden');
	},
	
	stopAnimation: function () {
		throw new Error('This method must be overridden');
	},	


	/* Class methods */

	/**
	 * Fix a 32-bit PNG image in IE6
	 * @param {HTMLElement} img the image to 'fix'
	 */
	fixPNG: function (img) {
		var sizingMethod = 'scale',
			pngSrc = this.getAttribute(img, 'src'),
			dir = pngSrc.substring(0, pngSrc.lastIndexOf('/') + 1);
		
		this.setStyle(img, {'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=" + sizingMethod + ", src='" + pngSrc + "')"});
		
		this.setAttribute(img, {'src': dir + 'trans.gif'});
	},
	
	
	/**
	 * Animate the Page Peel to fold it "in" or "out"
	 * @param {Event} event the original event that triggered this method
	 * @param {String} name the name of the 'state' to become
	 */
	foldPeel: function (event, name) {
		var self = this;

		if (event && event.type !== 'click' && name !== 'full' && this.options.fullOpenIsSticky && this.hasClass(this.element, 'full')) {
			return;
		}

		// Cancel adding/removing the open & full classes
		window.clearTimeout(this.Timeouts.openClass);
		window.clearTimeout(this.Timeouts.fullClass);
		window.clearTimeout(this.Timeouts.closeTeaser);
		
		// Get the new size & duration
		var state = this.options.sizes[name];
		var duration = this.options.durations[name];
		
		// Stop any running animation
		this.stopAnimation(this.peel);
		this.stopAnimation(this.back);
		
		// Run the new animations
		this.animate(this.peel, state.peel, duration);
		this.animate(this.back, state.back, duration, function () {
			if (!state.expanded) {
				self.removeClass(self.element, 'expanded');
			}
			if (name === 'teaser') {
				self.addClass(self.element, 'teaser');
			}

		});

		// Adding 'expanded' class
		if (state.expanded) {
			this.addClass(this.element, 'expanded');
		}
		
		if (name !== 'teaser') {
			this.removeClass(this.element, 'teaser');
		}
		
		// Add/Remove the 'open' class
		this.Timeouts.openClass = window.setTimeout(function () {
			if (state.open) {
				self.addClass(self.element, 'open');
			}
			else {
				self.removeClass(self.element, 'open');
			}
			
		}, duration / 2);		

		// Add/Remove the 'full' class
		this.Timeouts.fullClass = window.setTimeout(function () {
			if (state.full) {
				self.addClass(self.element, 'full');
			}
			else {
				self.removeClass(self.element, 'full');
			}
			
		}, duration / 2);		
	}
};
/**
 * X-Team Page Peel connector for jQuery, v1.1.1
 *
 * @copyright Copyright (c) 2009 X-Team, <a href="http://x-team.com/">X-Team</a>
 * @author Stephen Reay
 * @version 1.1.1
 */

Xteam.Ui.PagePeel.prototype.findElement = function (expression, parent) {
	var element = jQuery.apply(this, arguments);
	
	element = element.length > 1 ? element.get() : element.get(0);
	
	return element;
};

Xteam.Ui.PagePeel.prototype.getBrowser = function () {
	for(var i in jQuery.browser) {
		if (jQuery.browser[i] === true) {
			return i;
		}
	}
	return false;
};

Xteam.Ui.PagePeel.prototype.getBrowserVersion = function () {
	return jQuery.browser.version;
};

Xteam.Ui.PagePeel.prototype.mergeObjects = function (base, extras) {
	var merged = {};
	
	$.extend(true, merged, base, extras || {});
	
	return merged;
};

Xteam.Ui.PagePeel.prototype.bindEvent = function (element, event, callback, state) {
	var self = this;
	jQuery(element).bind(event, function (e) {
		callback.call(self, e, state);
	});
};

Xteam.Ui.PagePeel.prototype.getEventTarget = function (event) {
	return jQuery.Event(event).target;
};

Xteam.Ui.PagePeel.prototype.stopBubble = function (event) {
	event = jQuery.Event(event);
	event.stopImmediatePropagation();
};

Xteam.Ui.PagePeel.prototype.addClass = function (element, className) {
	jQuery(element).addClass(className);
};

Xteam.Ui.PagePeel.prototype.removeClass = function (element, className) {
	jQuery(element).removeClass(className);
};

Xteam.Ui.PagePeel.prototype.hasClass = function (element, className) {
	return jQuery(element).hasClass(className);
};

Xteam.Ui.PagePeel.prototype.getStyle = function (element, style) {
	return jQuery(element).css(style);
};

Xteam.Ui.PagePeel.prototype.setStyle = function (element, style, value) {
	jQuery(element).css(style, value);
};

Xteam.Ui.PagePeel.prototype.getAttribute = function (element, attribute) {
	return jQuery(element).attr(attribute);
};

Xteam.Ui.PagePeel.prototype.setAttribute = function (element, attribute, value) {
	jQuery(element).attr(attribute, value);
};

Xteam.Ui.PagePeel.prototype.animate = function (element, style, duration, easing, callback) {
	element = jQuery(element);
	var args = jQuery.makeArray(arguments).slice(1);
	element.animate.apply(element, args);
};

Xteam.Ui.PagePeel.prototype.stopAnimation = function (element) {
	jQuery(element).stop();
};