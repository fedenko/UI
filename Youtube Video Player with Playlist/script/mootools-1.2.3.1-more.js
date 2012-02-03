//MooTools More, <http://mootools.net/more>. Copyright (c) 2006-2009 Aaron Newton <http://clientcide.com/>, Valerio Proietti <http://mad4milk.net> & the MooTools team <http://mootools.net/developers>, MIT Style License.

MooTools.More={version:"1.2.3.1"};Fx.Scroll=new Class({Extends:Fx,options:{offset:{x:0,y:0},wheelStops:true},initialize:function(b,a){this.element=this.subject=document.id(b);
this.parent(a);var d=this.cancel.bind(this,false);if($type(this.element)!="element"){this.element=document.id(this.element.getDocument().body);}var c=this.element;
if(this.options.wheelStops){this.addEvent("start",function(){c.addEvent("mousewheel",d);},true);this.addEvent("complete",function(){c.removeEvent("mousewheel",d);
},true);}},set:function(){var a=Array.flatten(arguments);this.element.scrollTo(a[0],a[1]);},compute:function(c,b,a){return[0,1].map(function(d){return Fx.compute(c[d],b[d],a);
});},start:function(c,h){if(!this.check(c,h)){return this;}var e=this.element.getSize(),f=this.element.getScrollSize();var b=this.element.getScroll(),d={x:c,y:h};
for(var g in d){var a=f[g]-e[g];if($chk(d[g])){d[g]=($type(d[g])=="number")?d[g].limit(0,a):a;}else{d[g]=b[g];}d[g]+=this.options.offset[g];}return this.parent([b.x,b.y],[d.x,d.y]);
},toTop:function(){return this.start(false,0);},toLeft:function(){return this.start(0,false);},toRight:function(){return this.start("right",false);},toBottom:function(){return this.start(false,"bottom");
},toElement:function(b){var a=document.id(b).getPosition(this.element);return this.start(a.x,a.y);},scrollIntoView:function(c,e,d){e=e?$splat(e):["x","y"];
var h={};c=document.id(c);var f=c.getPosition(this.element);var i=c.getSize();var g=this.element.getScroll();var a=this.element.getSize();var b={x:f.x+i.x,y:f.y+i.y};
["x","y"].each(function(j){if(e.contains(j)){if(b[j]>g[j]+a[j]){h[j]=b[j]-a[j];}if(f[j]<g[j]){h[j]=f[j];}}if(h[j]==null){h[j]=g[j];}if(d&&d[j]){h[j]=h[j]+d[j];
}},this);if(h.x!=g.x||h.y!=g.y){this.start(h.x,h.y);}return this;}});var Tips=new Class({Implements:[Events,Options],options:{onShow:function(a){a.setStyle("visibility","visible");
},onHide:function(a){a.setStyle("visibility","hidden");},title:"title",text:function(a){return a.get("rel")||a.get("href");},showDelay:100,hideDelay:100,className:null,offset:{x:16,y:16},fixed:false},initialize:function(){var a=Array.link(arguments,{options:Object.type,elements:$defined});
if(a.options&&a.options.offsets){a.options.offset=a.options.offsets;}this.setOptions(a.options);this.container=new Element("div",{"class":"tip"});this.tip=this.getTip();
if(a.elements){this.attach(a.elements);}},getTip:function(){return new Element("div",{"class":this.options.className,styles:{visibility:"hidden",display:"none",position:"absolute",top:0,left:0}}).adopt(new Element("div",{"class":"tip-top"}),this.container,new Element("div",{"class":"tip-bottom"})).inject(document.body);
},attach:function(b){var a=function(d,c){if(d==null){return"";}return $type(d)=="function"?d(c):c.get(d);};$$(b).each(function(d){var e=a(this.options.title,d);
d.erase("title").store("tip:native",e).retrieve("tip:title",e);d.retrieve("tip:text",a(this.options.text,d));var c=["enter","leave"];if(!this.options.fixed){c.push("move");
}c.each(function(f){d.addEvent("mouse"+f,d.retrieve("tip:"+f,this["element"+f.capitalize()].bindWithEvent(this,d)));},this);},this);return this;},detach:function(a){$$(a).each(function(c){["enter","leave","move"].each(function(d){c.removeEvent("mouse"+d,c.retrieve("tip:"+d)||$empty);
});c.eliminate("tip:enter").eliminate("tip:leave").eliminate("tip:move");if($type(this.options.title)=="string"&&this.options.title=="title"){var b=c.retrieve("tip:native");
if(b){c.set("title",b);}}},this);return this;},elementEnter:function(b,a){$A(this.container.childNodes).each(Element.dispose);["title","text"].each(function(d){var c=a.retrieve("tip:"+d);
if(!c){return;}this[d+"Element"]=new Element("div",{"class":"tip-"+d}).inject(this.container);this.fill(this[d+"Element"],c);},this);this.timer=$clear(this.timer);
this.timer=this.show.delay(this.options.showDelay,this,a);this.tip.setStyle("display","block");this.position((!this.options.fixed)?b:{page:a.getPosition()});
},elementLeave:function(b,a){$clear(this.timer);this.tip.setStyle("display","none");this.timer=this.hide.delay(this.options.hideDelay,this,a);},elementMove:function(a){this.position(a);
},position:function(d){var b=window.getSize(),a=window.getScroll(),e={x:this.tip.offsetWidth,y:this.tip.offsetHeight},c={x:"left",y:"top"},f={};for(var g in c){f[c[g]]=d.page[g]+this.options.offset[g];
if((f[c[g]]+e[g]-a[g])>b[g]){f[c[g]]=d.page[g]-this.options.offset[g]-e[g];}}this.tip.setStyles(f);},fill:function(a,b){if(typeof b=="string"){a.set("html",b);
}else{a.adopt(b);}},show:function(a){this.fireEvent("show",[this.tip,a]);},hide:function(a){this.fireEvent("hide",[this.tip,a]);}});