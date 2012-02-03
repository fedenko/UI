
var Flipmenu=function(container){this.initialize=function(){this.container=$("#"+container);if(!this.container){alert("Could not locate \""+container+"\"");return;}
this.container.addClass("flipmenu");this.readLinks();}
this.readLinks=function(){var self=this;this.container.find("a").each(function(i,el){self.render(i,el);});}
this.render=function(inx,link){$(link).wrap("<div class=\"flipmenu_box\"></div>");$(link).addClass(($(link).hasClass("active"))?"flipmenu_link_active":"flipmenu_link");var parent=$(link).parent()
parent.css({width:(link.offsetWidth)+"px",height:link.offsetHeight+"px"});var clone=$(link).clone();clone.removeClass("flipmenu_link");clone.addClass("flipmenu_link_over").css({top:link.offsetHeight+"px",left:"0px"});parent.append(clone);$(parent).bind("mouseenter",this,this.onMouseEnter);$(parent).bind("mouseleave",this,this.onMouseLeave);}
this.onMouseEnter=function(event){var first=$(this.firstChild);if(first.hasClass("active"))
return;var second=first.next();first.animate({top:"-"+first.outerHeight()},250);second.animate({top:"0"},250);}
this.onMouseLeave=function(event){var first=$(this.firstChild);if(first.hasClass("active"))
return;var second=first.next();first.stop().animate({top:"0"},250);second.stop().animate({top:$(this).outerHeight()},250);}
this.initialize();}