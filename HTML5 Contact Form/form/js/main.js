/**
 * Created by 23rd and Walnut
 * www.23andwalnut.com
 * User: Saleem El-Amin
 * Date: Aug 28, 2010
 * Time: 10:49:59 AM
 */

$.noConflict();
jQuery(document).ready(function($)
{
    var tmpContent, geoLatLng, thisMap, directionsHTML;

    if (ie8up())
    {
        directionsHTML = '<div id="map-overlay" class="overlay"><div id="map-big">&nbsp;</div><div class="directions-form clearfix"><ul class="clearfix"><li class="first-child"><div class="dir-label">From:</div> <input type="text" id="from-input"/> </li><li><div class="dir-label">To:</div><input type="text" id="to-input"/> </li></ul><div class="filters clearfix"><select id="travel-mode-input"><option selected="selected" value="driving">By car</option><option value="bicycling">Bicycling</option><option value="walking">Walking</option></select><select id="unit-input"><option selected="selected" value="imperial">Imperial</option><option value="metric">Metric</option></select> <input id="get-directions" type="button" value="Go!"/><div class="clear">&nbsp;</div></div></div><div id="dir-container"></div></div>';
        $('body').prepend(directionsHTML);
        $('#to-input').val($('#company-street-address').html());
    }
    else{
       $('.address-wrapper').remove();
    }

    if (!("autofocus" in document.createElement("input")))
    {
        $('#name').focus();
    }

    $('input[title], select[title]').tooltip({
        position:'center right',
        effect:'fade',
        events:{
            input:'focus, blur',
            widget:'focus ,blur'}
    });
    

    $('#contact-form').validator({ 'offset':[0,1]}).submit(function(e)
    {

        if (!e.isDefaultPrevented())
        {
            $.post('process-form.php', $(this).serialize(), function(data)
            {
                $('.form-wrapper h2').fadeOut('fast');

                $('#contact-form').fadeOut('fast', function()
                {
                    $('.message').hide().html(data);
                    $('.message').show('fast');
                });
            });
        }
        return false;

    });

    if (ie8up())
    {
        var triggers =
                $(".get-directions-button").overlay({
                    mask: {
                        color: '#fff',
                        loadSpeed: 200,
                        opacity: 1
                    },
                    fixed:false,
                    closeOnClick: true,
                    onLoad:function()
                    {
                        $('#contact-form').data('validator').reset();

                        addressViaGeolocation();

                        $('.directions-form').show('fast');

                        thisMap = googleMap({
                            streetViewControl: true,
                            mapTypeControl:true,
                            navigationControl:true,
                            mapId:"map-big"
                        });
                    }
                });
    }


    $('#travel-mode-input, #unit-input, #get-directions').live('click', function()
    {
        googleDirections.getDirections();
    });

    function ie8up()
    {
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
        { //test for MSIE x.x;
            var ieversion = new Number(RegExp.$1) // capture x.x portion and store as a number
            if (ieversion >= 8)
                return true;
            else if (ieversion >= 7)
                return false;
            else if (ieversion >= 6)
                return false;
            else if (ieversion >= 5)
                return false;

        } else return true;
    }

    function addressViaGeolocation()
    {
        if (!!navigator.geolocation)
        {
            if (geoLatLng == null)
            {
                navigator.geolocation.getCurrentPosition(currentLocation, show_map_error);
            }
            else
            {
                $('#from-input').val('My Current Location');
            }
        }

        function currentLocation(loc)
        {
            geoLatLng = loc.coords.latitude + "," + loc.coords.longitude;
            $('#from-input').val('My Current Location');
        }

        function show_map_error()
        {
            ;
        }
    }


    if (ie8up())
    {
        var googleMap = function(mapOptions)
        {
            var geocoder, map, panorama, latlng;

            geocoder = new google.maps.Geocoder();

            var myOptions = {
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                streetViewControl: true,
                mapTypeControl:false,
                navigationControl:false,
                companyAddress: 'Atlanta GA',
                mapId:"map"
            };

            var myOptions = $.extend({}, myOptions, mapOptions);

            map = new google.maps.Map(document.getElementById(myOptions.mapId), myOptions);

            geocoder.geocode({ 'address': myOptions.companyAddress}, function(results, status)
            {
                if (status == google.maps.GeocoderStatus.OK)
                {
                    latlng = results[0].geometry.location;

                    map.setCenter(latlng);
                    map.setZoom(16);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: latlng
                    });

                    map.setOptions();
                }
            });

            return {map:map};
        };

        thisMap = googleMap({companyAddress:companyAddress});


        var googleDirections = {

            mapContainer: document.getElementById('map-big'),

            dirContainer: document.getElementById('dir-container'),
            fromInput: document.getElementById('from-input'),
            toInput: document.getElementById('to-input'),
            travelModeInput: document.getElementById('travel-mode-input'),
            unitInput: document.getElementById('unit-input'),

            // API Objects
            dirService: new google.maps.DirectionsService(),
            dirRenderer: new google.maps.DirectionsRenderer(),
            map: thisMap.map,

            showDirections: function(dirResult, dirStatus)
            {
                if (dirStatus != google.maps.DirectionsStatus.OK)
                {
                    alert('Unable to get directions. Please ensure you are using a valid starting address');
                    return;
                }

                $('#dir-container').show('fast');

                // Show directions
                googleDirections.dirRenderer.setMap(thisMap.map);
                googleDirections.dirRenderer.setPanel(googleDirections.dirContainer);
                googleDirections.dirRenderer.setDirections(dirResult);
            },

            getSelectedTravelMode: function()
            {
                var value =
                        googleDirections.travelModeInput.options[googleDirections.travelModeInput.selectedIndex].value;
                if (value == 'driving')
                {
                    value = google.maps.DirectionsTravelMode.DRIVING;
                } else if (value == 'bicycling')
                {
                    value = google.maps.DirectionsTravelMode.BICYCLING;
                } else if (value == 'walking')
                {
                    value = google.maps.DirectionsTravelMode.WALKING;
                } else
                {
                    alert('Unsupported travel mode.');
                }
                return value;
            },

            getSelectedUnitSystem: function()
            {
                return googleDirections.unitInput.options[googleDirections.unitInput.selectedIndex].value == 'metric' ?
                        google.maps.DirectionsUnitSystem.METRIC :
                        google.maps.DirectionsUnitSystem.IMPERIAL;
            },

            getDirections: function()
            {
                var fromStr = googleDirections.fromInput.value;
                var toStr = googleDirections.toInput.value;
                var dirRequest = {
                    origin: (fromStr == 'My Current Location') ? geoLatLng : fromStr,
                    destination: toStr,
                    travelMode: googleDirections.getSelectedTravelMode(),
                    unitSystem: googleDirections.getSelectedUnitSystem(),
                    provideRouteAlternatives: true
                };
                googleDirections.dirService.route(dirRequest, googleDirections.showDirections);
            },

            init: function()
            {
                var latLng = new google.maps.LatLng(37.77493, -122.419415);
                googleDirections.map = new google.maps.Map(googleDirections.mapContainer, {
                    zoom: 13,
                    center: latLng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

                googleDirections.getDirections();
            }

        };
    }


});


(function(f){function p(a,b,c){var h=c.relative?a.position().top:a.offset().top,e=c.relative?a.position().left:a.offset().left,i=c.position[0];h-=b.outerHeight()-c.offset[0];e+=a.outerWidth()+c.offset[1];var j=b.outerHeight()+a.outerHeight();if(i=="center")h+=j/2;if(i=="bottom")h+=j;i=c.position[1];a=b.outerWidth()+a.outerWidth();if(i=="center")e-=a/2;if(i=="left")e-=a;return{top:h,left:e}}function u(a,b){var c=this,h=a.add(c),e,i=0,j=0,m=a.attr("title"),q=a.attr("data-tooltip"),r=n[b.effect],l,s=
a.is(":input"),v=s&&a.is(":checkbox, :radio, select, :button, :submit"),t=a.attr("type"),k=b.events[t]||b.events[s?v?"widget":"input":"def"];if(!r)throw'Nonexistent effect "'+b.effect+'"';k=k.split(/,\s*/);if(k.length!=2)throw"Tooltip: bad events configuration for "+t;a.bind(k[0],function(d){clearTimeout(i);if(b.predelay)j=setTimeout(function(){c.show(d)},b.predelay);else c.show(d)}).bind(k[1],function(d){clearTimeout(j);if(b.delay)i=setTimeout(function(){c.hide(d)},b.delay);else c.hide(d)});if(m&&
b.cancelDefault){a.removeAttr("title");a.data("title",m)}f.extend(c,{show:function(d){if(!e){if(q)e=f(q);else if(m)e=f(b.layout).addClass(b.tipClass).appendTo(document.body).hide().append(m);else if(b.tip)e=f(b.tip).eq(0);else{e=a.next();e.length||(e=a.parent().next())}if(!e.length)throw"Cannot find tooltip for "+a;}if(c.isShown())return c;e.stop(true,true);var g=p(a,e,b);d=d||f.Event();d.type="onBeforeShow";h.trigger(d,[g]);if(d.isDefaultPrevented())return c;g=p(a,e,b);e.css({position:"absolute",
top:g.top,left:g.left});l=true;r[0].call(c,function(){d.type="onShow";l="full";h.trigger(d)});g=b.events.tooltip.split(/,\s*/);e.bind(g[0],function(){clearTimeout(i);clearTimeout(j)});g[1]&&!a.is("input:not(:checkbox, :radio), textarea")&&e.bind(g[1],function(o){o.relatedTarget!=a[0]&&a.trigger(k[1].split(" ")[0])});return c},hide:function(d){if(!e||!c.isShown())return c;d=d||f.Event();d.type="onBeforeHide";h.trigger(d);if(!d.isDefaultPrevented()){l=false;n[b.effect][1].call(c,function(){d.type="onHide";
h.trigger(d)});return c}},isShown:function(d){return d?l=="full":l},getConf:function(){return b},getTip:function(){return e},getTrigger:function(){return a}});f.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","),function(d,g){f.isFunction(b[g])&&f(c).bind(g,b[g]);c[g]=function(o){f(c).bind(g,o);return c}})}f.tools=f.tools||{version:"1.2.4"};f.tools.tooltip={conf:{effect:"toggle",fadeOutSpeed:"fast",predelay:0,delay:30,opacity:1,tip:0,position:["top","center"],offset:[0,0],relative:false,cancelDefault:true,
events:{def:"mouseenter,mouseleave",input:"focus,blur",widget:"focus mouseenter,blur mouseleave",tooltip:"mouseenter,mouseleave"},layout:"<div/>",tipClass:"tooltip"},addEffect:function(a,b,c){n[a]=[b,c]}};var n={toggle:[function(a){var b=this.getConf(),c=this.getTip();b=b.opacity;b<1&&c.css({opacity:b});c.show();a.call()},function(a){this.getTip().hide();a.call()}],fade:[function(a){var b=this.getConf();this.getTip().fadeTo(b.fadeInSpeed,b.opacity,a)},function(a){this.getTip().fadeOut(this.getConf().fadeOutSpeed,
a)}]};f.fn.tooltip=function(a){var b=this.data("tooltip");if(b)return b;a=f.extend(true,{},f.tools.tooltip.conf,a);if(typeof a.position=="string")a.position=a.position.split(/,?\s/);this.each(function(){b=new u(f(this),a);f(this).data("tooltip",b)});return a.api?b:this}})(jQuery);
(function(a){function t(d,b){var c=this,i=d.add(c),o=a(window),k,f,m,g=a.tools.expose&&(b.mask||b.expose),n=Math.random().toString().slice(10);if(g){if(typeof g=="string")g={color:g};g.closeOnClick=g.closeOnEsc=false}var p=b.target||d.attr("rel");f=p?a(p):d;if(!f.length)throw"Could not find Overlay: "+p;d&&d.index(f)==-1&&d.click(function(e){c.load(e);return e.preventDefault()});a.extend(c,{load:function(e){if(c.isOpened())return c;var h=q[b.effect];if(!h)throw'Overlay: cannot find effect : "'+b.effect+
'"';b.oneInstance&&a.each(s,function(){this.close(e)});e=e||a.Event();e.type="onBeforeLoad";i.trigger(e);if(e.isDefaultPrevented())return c;m=true;g&&a(f).expose(g);var j=b.top,r=b.left,u=f.outerWidth({margin:true}),v=f.outerHeight({margin:true});if(typeof j=="string")j=j=="center"?Math.max((o.height()-v)/2,0):parseInt(j,10)/100*o.height();if(r=="center")r=Math.max((o.width()-u)/2,0);h[0].call(c,{top:j,left:r},function(){if(m){e.type="onLoad";i.trigger(e)}});g&&b.closeOnClick&&a.mask.getMask().one("click",
c.close);b.closeOnClick&&a(document).bind("click."+n,function(l){a(l.target).parents(f).length||c.close(l)});b.closeOnEsc&&a(document).bind("keydown."+n,function(l){l.keyCode==27&&c.close(l)});return c},close:function(e){if(!c.isOpened())return c;e=e||a.Event();e.type="onBeforeClose";i.trigger(e);if(!e.isDefaultPrevented()){m=false;q[b.effect][1].call(c,function(){e.type="onClose";i.trigger(e)});a(document).unbind("click."+n).unbind("keydown."+n);g&&a.mask.close();return c}},getOverlay:function(){return f},
getTrigger:function(){return d},getClosers:function(){return k},isOpened:function(){return m},getConf:function(){return b}});a.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(e,h){a.isFunction(b[h])&&a(c).bind(h,b[h]);c[h]=function(j){a(c).bind(h,j);return c}});k=f.find(b.close||".close");if(!k.length&&!b.close){k=a('<a class="close"></a>');f.prepend(k)}k.click(function(e){c.close(e)});b.load&&c.load()}a.tools=a.tools||{version:"1.2.4"};a.tools.overlay={addEffect:function(d,
b,c){q[d]=[b,c]},conf:{close:null,closeOnClick:true,closeOnEsc:true,closeSpeed:"fast",effect:"default",fixed:!a.browser.msie||a.browser.version>6,left:"center",load:false,mask:null,oneInstance:true,speed:"normal",target:null,top:"10%"}};var s=[],q={};a.tools.overlay.addEffect("default",function(d,b){var c=this.getConf(),i=a(window);if(!c.fixed){d.top+=i.scrollTop();d.left+=i.scrollLeft()}d.position=c.fixed?"fixed":"absolute";this.getOverlay().css(d).fadeIn(c.speed,b)},function(d){this.getOverlay().fadeOut(this.getConf().closeSpeed,
d)});a.fn.overlay=function(d){var b=this.data("overlay");if(b)return b;if(a.isFunction(d))d={onBeforeLoad:d};d=a.extend(true,{},a.tools.overlay.conf,d);this.each(function(){b=new t(a(this),d);s.push(b);a(this).data("overlay",b)});return d.api?b:this}})(jQuery);
(function(e){function t(a,b,c){var k=a.offset().top,f=a.offset().left,l=c.position.split(/,?\s+/),p=l[0];l=l[1];k-=b.outerHeight()-c.offset[0];f+=a.outerWidth()+c.offset[1];c=b.outerHeight()+a.outerHeight();if(p=="center")k+=c/2;if(p=="bottom")k+=c;a=a.outerWidth();if(l=="center")f-=(a+b.outerWidth())/2;if(l=="left")f-=a;return{top:k,left:f}}function x(a){function b(){return this.getAttribute("type")==a}b.key="[type="+a+"]";return b}function u(a,b,c){function k(g,d,j){if(!(!c.grouped&&g.length)){var h;
if(j===false||e.isArray(j)){h=i.messages[d.key||d]||i.messages["*"];h=h[c.lang]||i.messages["*"].en;(d=h.match(/\$\d/g))&&e.isArray(j)&&e.each(d,function(n){h=h.replace(this,j[n])})}else h=j[c.lang]||j;g.push(h)}}var f=this,l=b.add(f);a=a.not(":button, :image, :reset, :submit");e.extend(f,{getConf:function(){return c},getForm:function(){return b},getInputs:function(){return a},reflow:function(){a.each(function(){var g=e(this),d=g.data("msg.el");if(d){g=t(g,d,c);d.css({top:g.top,left:g.left})}});return f},
invalidate:function(g,d){if(!d){var j=[];e.each(g,function(h,n){h=a.filter("[name='"+h+"']");if(h.length){h.trigger("OI",[n]);j.push({input:h,messages:[n]})}});g=j;d=e.Event()}d.type="onFail";l.trigger(d,[g]);d.isDefaultPrevented()||r[c.effect][0].call(f,g,d);return f},reset:function(g){g=g||a;g.removeClass(c.errorClass).each(function(){var d=e(this).data("msg.el");if(d){d.remove();e(this).data("msg.el",null)}}).unbind(c.errorInputEvent||"");return f},destroy:function(){b.unbind(c.formEvent).unbind("reset.V");
a.unbind(c.inputEvent||"").unbind("change.V");return f.reset()},checkValidity:function(g,d){g=g||a;g=g.not(":disabled");if(!g.length)return true;d=d||e.Event();d.type="onBeforeValidate";l.trigger(d,[g]);if(d.isDefaultPrevented())return d.result;var j=[],h=c.errorInputEvent+".v";g.not(":radio:not(:checked)").each(function(){var q=[],m=e(this).unbind(h).data("messages",q);e.each(v,function(){var o=this,s=o[0];if(m.filter(s).length){o=o[1].call(f,m,m.val());if(o!==true){d.type="onBeforeFail";l.trigger(d,
[m,s]);if(d.isDefaultPrevented())return false;var w=m.attr(c.messageAttr);if(w){q=[w];return false}else k(q,s,o)}}});if(q.length){j.push({input:m,messages:q});m.trigger("OI",[q]);c.errorInputEvent&&m.bind(h,function(o){f.checkValidity(m,o)})}if(c.singleError&&j.length)return false});var n=r[c.effect];if(!n)throw'Validator: cannot find effect "'+c.effect+'"';if(j.length){f.invalidate(j,d);return false}else{n[1].call(f,g,d);d.type="onSuccess";l.trigger(d,[g]);g.unbind(h)}return true}});e.each("onBeforeValidate,onBeforeFail,onFail,onSuccess".split(","),
function(g,d){e.isFunction(c[d])&&e(f).bind(d,c[d]);f[d]=function(j){e(f).bind(d,j);return f}});c.formEvent&&b.bind(c.formEvent,function(g){if(!f.checkValidity(null,g))return g.preventDefault()});b.bind("reset.V",function(){f.reset()});a[0]&&a[0].validity&&a.each(function(){this.oninvalid=function(){return false}});if(b[0])b[0].checkValidity=f.checkValidity;c.inputEvent&&a.bind(c.inputEvent,function(g){f.checkValidity(e(this),g)});a.filter(":checkbox, select").filter("[required]").bind("change.V",
function(g){var d=e(this);if(this.checked||d.is("select")&&e(this).val())r[c.effect][1].call(f,d,g)});var p=a.filter(":radio").change(function(g){f.checkValidity(p,g)});e(window).resize(function(){f.reflow()})}e.tools=e.tools||{version:"1.2.4"};var y=/\[type=([a-z]+)\]/,z=/^-?[0-9]*(\.[0-9]+)?$/,A=/^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,6})$/i,B=/^(https?:\/\/)?[\da-z\.\-]+\.[a-z\.]{2,6}[#\?\/\w \.\-=]*$/i,i;i=e.tools.validator={conf:{grouped:false,effect:"default",errorClass:"invalid",inputEvent:null,
errorInputEvent:"keyup",formEvent:"submit",lang:"en",message:"<div/>",messageAttr:"data-message",messageClass:"error",offset:[0,0],position:"center right",singleError:false,speed:"normal"},messages:{"*":{en:"Please correct this value"}},localize:function(a,b){e.each(b,function(c,k){i.messages[c]=i.messages[c]||{};i.messages[c][a]=k})},localizeFn:function(a,b){i.messages[a]=i.messages[a]||{};e.extend(i.messages[a],b)},fn:function(a,b,c){if(e.isFunction(b))c=b;else{if(typeof b=="string")b={en:b};this.messages[a.key||
a]=b}if(b=y.exec(a))a=x(b[1]);v.push([a,c])},addEffect:function(a,b,c){r[a]=[b,c]}};var v=[],r={"default":[function(a){var b=this.getConf();e.each(a,function(c,k){c=k.input;c.addClass(b.errorClass);var f=c.data("msg.el");if(!f){f=e(b.message).addClass(b.messageClass).appendTo(document.body);c.data("msg.el",f)}f.css({visibility:"hidden",display:"none"}).find("span").remove();e.each(k.messages,function(l,p){e("<span/>").html(p).appendTo(f)});f.outerWidth()==f.parent().width()&&f.add(f.find("p")).css({display:"inline"});
k=t(c,f,b);f.css({visibility:"visible",position:"absolute",top:k.top,left:k.left}).fadeIn(b.speed)})},function(a){var b=this.getConf();a.removeClass(b.errorClass).each(function(){var c=e(this).data("msg.el");c&&c.css({visibility:"hidden"})})}]};e.each("email,url,number".split(","),function(a,b){e.expr[":"][b]=function(c){return c.getAttribute("type")===b}});e.fn.oninvalid=function(a){return this[a?"bind":"trigger"]("OI",a)};i.fn(":email","Please enter a valid email address",function(a,b){return!b||
A.test(b)});i.fn(":url","Please enter a valid URL",function(a,b){return!b||B.test(b)});i.fn(":number","Please enter a numeric value.",function(a,b){return z.test(b)});i.fn("[max]","Please enter a value smaller than $1",function(a,b){if(b===""||e.tools.dateinput&&a.is(":date"))return true;a=a.attr("max");return parseFloat(b)<=parseFloat(a)?true:[a]});i.fn("[min]","Please enter a value larger than $1",function(a,b){if(b===""||e.tools.dateinput&&a.is(":date"))return true;a=a.attr("min");return parseFloat(b)>=
parseFloat(a)?true:[a]});i.fn("[required]","Please complete this mandatory field.",function(a,b){if(a.is(":checkbox"))return a.is(":checked");return!!b});i.fn("[pattern]",function(a){var b=new RegExp("^"+a.attr("pattern")+"$");return b.test(a.val())});e.fn.validator=function(a){var b=this.data("validator");if(b){b.destroy();this.removeData("validator")}a=e.extend(true,{},i.conf,a);if(this.is("form"))return this.each(function(){var c=e(this);b=new u(c.find(":input"),c,a);c.data("validator",b)});else{b=
new u(this,this.eq(0).closest("form"),a);return this.data("validator",b)}}})(jQuery);
(function(b){function k(){if(b.browser.msie){var a=b(document).height(),d=b(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,a-d<20?d:a]}return[b(document).width(),b(document).height()]}function h(a){if(a)return a.call(b.mask)}b.tools=b.tools||{version:"1.2.4"};var l;l=b.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:true,closeOnEsc:true,zIndex:9998,opacity:0.8,startOpacity:0,color:"#fff",onLoad:null,
onClose:null}};var c,i,e,g,j;b.mask={load:function(a,d){if(e)return this;if(typeof a=="string")a={color:a};a=a||g;g=a=b.extend(b.extend({},l.conf),a);c=b("#"+a.maskId);if(!c.length){c=b("<div/>").attr("id",a.maskId);b("body").append(c)}var m=k();c.css({position:"absolute",top:0,left:0,width:m[0],height:m[1],display:"none",opacity:a.startOpacity,zIndex:a.zIndex});a.color&&c.css("backgroundColor",a.color);if(h(a.onBeforeLoad)===false)return this;a.closeOnEsc&&b(document).bind("keydown.mask",function(f){f.keyCode==
27&&b.mask.close(f)});a.closeOnClick&&c.bind("click.mask",function(f){b.mask.close(f)});b(window).bind("resize.mask",function(){b.mask.fit()});if(d&&d.length){j=d.eq(0).css("zIndex");b.each(d,function(){var f=b(this);/relative|absolute|fixed/i.test(f.css("position"))||f.css("position","relative")});i=d.css({zIndex:Math.max(a.zIndex+1,j=="auto"?0:j)})}c.css({display:"block"}).fadeTo(a.loadSpeed,a.opacity,function(){b.mask.fit();h(a.onLoad);e="full"});e=true;return this},close:function(){if(e){if(h(g.onBeforeClose)===
false)return this;c.fadeOut(g.closeSpeed,function(){h(g.onClose);i&&i.css({zIndex:j});e=false});b(document).unbind("keydown.mask");c.unbind("click.mask");b(window).unbind("resize.mask")}return this},fit:function(){if(e){var a=k();c.css({width:a[0],height:a[1]})}},getMask:function(){return c},isLoaded:function(a){return a?e=="full":e},getConf:function(){return g},getExposed:function(){return i}};b.fn.mask=function(a){b.mask.load(a);return this};b.fn.expose=function(a){b.mask.load(a,this);return this}})(jQuery);
