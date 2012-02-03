/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
 
 /**
 * JSized plugin factory
 * 
 * Allows for jQuery UI style api for methods
 * 
 * eg. $(elem).myplugin('mymethodname','args',5,true)
 * it accepts both constructors or object literals as the second argument
 * eg. $.plugin('myplugin', MyPlugin);
 * 
 * A limitation of this plugin is that the methods are only cognizant
 * on a per-element basis. They do not know the entire set.
 * 
 * by Paul Irish. Public Domain
 *  
 * @requires jQuery
 */

/**
 * example stepper plugin.
 * defined as an object literal.
 *
 * just as easily this could be written as a class with 
 * resig's simple inheritance script: http://ejohn.org/blog/simple-javascript-inheritance/
 * e.g. 
 *   var MyPlugin = Class.extend({ ...
 */

/*
var MyPlugin = {
      // init will be called when plugin initalized for an elem
      init: function(options, element) {
      },
      method1: function() {
      }
};

// install the plugin
jQuery.jsizedPlugin('pluginName', MyPlugin);

// instantiate a new instance (init will be called)
jQuery('.element').pluginName({ foo: 'bar' });

// use a method
jQuery('.element').pluginName('method1', 'someparam');

*/

jQuery.jsizedPlugin = function(name, object) {
  // create a new plugin with the given name
  jQuery.fn[name] = function(options) {
    
    var args = Array.prototype.slice.call(arguments, 1);
    return this.each(function() {
      
      // check the data() cache, if it's there we'll call the method requested
      var instance = jQuery.data(this, name);
      if (instance) {
        options && instance[options].apply(instance, args);
      } else {
        // if a constructor was passed in...
        if (typeof object === 'function') instance = new object(options, this);
        // else an object was passed in
        else {
          // create a constructor out of it
          function F(){};
          F.prototype = object;
          instance = new F()
          instance.init(options,this);
        }
        
        jQuery.data(this, name, instance);
      }
    });
  };
};

/**
 * JSized Carousel
 * Copyright (c) 2009 JSized, http://jsized.com
 * 
 * Supports images and videos with description
 * 
 * @requires jQuery
 */
(function(){function m(){if(window.console&&console.log&&i.isFunction(console.log)){Array.prototype.unshift.call(arguments,"[Carousel]");console.log.apply(console,arguments)}}function q(d,c){function f(a,b,g){a=i(a);if(!n[b])throw TypeError("Invalid animation type");g=g||function(){};n[b](a,g)}function j(a){return a.each(function(b,g){b=i(g).prevAll().length;i(g).css(k(b,false))})}function k(a,b){a=c-a-1;var g=d.front.height,e=d.front.width,h=d.sizeDecrease;b={top:a*g*h*0.9,right:a*(e*h+d.distanceBetween), width:e-e*h*a,height:g-g*h*a,opacity:b?1:Math.max(0.7,1-a*0.1)};if(b.width<1||b.height<1){b.width=1;b.height=1}for(prop in b)if(prop!="opacity"&&prop!="visibility")b[prop]=Math.round(b[prop]);return b}function o(a){if(a.length!=1)throw Error("Pass only 1 at a time");a.find("img").css({width:a.width(),height:a.height()})}function p(a){a.find("img").css({width:"100%",height:"100%"})}var l=false,n={load:function(a,b){j(a);p(a);a.show();b()},hide:function(a,b){var g=a.length-1;a.each(function(e,h){h= i(h);o(h);setTimeout(function(){h.animate({height:0,top:h.height()+h[0].offsetTop},700,function(){h.hide();e==g&&b()})},e*250)})},forward:function(a,b){l=true;var g=c-a.length;i({sub:0}).animate({sub:g},{duration:1E3,easing:"easeOutQuad",step:function(){for(var e=0;e<a.length;e++)a.eq(e).css(k(e+this.sub))},complete:function(){l=false;b()}})},show:function(a,b){a.each(function(g,e){e=i(e);setTimeout(function(){j(e);o(e);var h={height:e.height(),top:+e.css("top").slice(0,-2)};e.css({height:0,top:h.height+ h.top}).animate(h,700,"linear",function(){p(e);g==a.length-1&&b()})},g*250)})},hoverOver:function(a){l||a.addClass("hover").animate({opacity:1},{queue:false,duration:450})},hoverOut:function(a){if(!l){var b=a.prevAll().length;b=k(b).opacity;a.animate({opacity:b},{queue:false,duration:450,complete:function(){a.removeClass("hover")}})}}};return{animate:f}}var i=jQuery;i.jsizedPlugin("jsizedCarousel",{init:function(d,c){m("initing carousel on ",c);this.options={front:{width:300,height:200},sizeDecrease:0.1, distanceBetween:15,changeInterval:5};i.extend(this.options,d);this.el=i(c);this.total=this.el.children().length;this.fx=q(this.options,this.total);this.isChainging=false;this.loadSlides();this.bindInteractionEvents();if(this.options.changeInterval){var f=this;this.slideshowInt=setInterval(function(){f.next()},this.options.changeInterval*1E3)}},loadSlides:function(){var d=this;this.el.children().hide().wrap('<div class="slide"></div>').show();this.getSlides().each(function(c,f){d.fx.animate(f,"load")})}, getSlides:function(){return this.el.children()},getIndex:function(d){return d.prevAll().length},bindInteractionEvents:function(){function d(f,j){var k=i(f.target).parent();if(k.hasClass("slide")){f.stopPropagation();c.fx.animate(k,j)}}var c=this;this.el.mouseover(function(f){d(f,"hoverOver")}).mouseout(function(f){d(f,"hoverOut")}).click(function(f){var j=i(f.target).closest(".slide");if(j){c.slideshowInt&&clearInterval(c.slideshowInt);c.next(c.total-c.getIndex(j)-1);f.stopPropagation()}});m("interaction events added")}, next:function(d){if(!this.isChainging){d=d||1;var c=this,f=this.fx.animate;c.isChainging=true;f(c.getSlides().slice(-d),"hide",function(){f(c.getSlides().slice(0,-d),"forward",function(){for(var j=0;j<d;j++)c.getSlides().slice(-1).prependTo(c.el);c.isChainging=false;f(c.getSlides().slice(0,d),"show",function(){})})})}}})})();