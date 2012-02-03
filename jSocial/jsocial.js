(function($){
	$.fn.jsocial = function(custom) {
var defaults = {
		  	highlight: true,
			buttons: "digg,stumbleupon,delicious,facebook,yahoo",
			imagedir: "images/",
			imageextension: "gif",
			blanktarget: true
		  };
var settings 		= $.extend({}, defaults, custom);
var jsocial 		= this;

		// Set target attribute
var target = settings.blanktarget ? 'target="_blank"' : '';
		
		// Write social icons to browser
var buttons = settings.buttons.split(",");
		for ( key in buttons ) {
			var name = buttons[key];
			var url = jformat[buttons[key]];
			if(url != undefined){
				url = url.replace("{TITLE}"			, urlencode(jsocial_title()));
				url = url.replace("{URL}"			, urlencode(jsocial_url()));
				url = url.replace("{KEYWORDS}"		, urlencode(jsocial_metakeywords()));
				url = url.replace("{DESCRIPTION}"	, urlencode(jsocial_metadescription()));
		var sociallink = '<a ' + target + ' href="' + url + '" class="jsocial_button"><img border="0" src="' + settings.imagedir + name + '.' + settings.imageextension + '" alt="' + name + '" /></a>';
				
				this.append(sociallink);
			}
			
		}
		
		// If highlight bind mousehover and mouseout
		if(settings.highlight){
			// Trigger focus animation
			this.find(".jsocial_button").bind("mouseover", function(){
				$(this).siblings().stop().animate({"opacity": 0.2}, 500);
			});
			
			this.find(".jsocial_button").bind("mouseout", function(){
				$(this).siblings().stop().animate({"opacity": 1}, 500);
			});
		}
		
		// Meta keywords
var jsocial_keywords;
		function jsocial_metakeywords() { 
			if(jsocial_description == undefined){
				metaCollection = document.getElementsByTagName('meta'); 
				for (i=0;i<metaCollection.length;i++) { 
					nameAttribute = metaCollection[i].name.search(/keywords/);
					if (nameAttribute!= -1) { 
						jsocial_keywords = metaCollection[i].content;
						return jsocial_keywords; 
					} 
				} 
			}else{
				return jsocial_keywords;
			}
		} 
		
		// Meta description
		var jsocial_description;
		function jsocial_metadescription() { 
			if(jsocial_description == undefined){
				metaCollection = document.getElementsByTagName('meta'); 
				for (i=0;i<metaCollection.length;i++) { 
					nameAttribute = metaCollection[i].name.search(/description/);
					if (nameAttribute!= -1) { 
						jsocial_description = metaCollection[i].content;
						return jsocial_description; 
					} 
				} 
			}else{
				return jsocial_description;
			}
		} 
		
		// Title
		function jsocial_title(){
			return document.title;
		}
		
		// Url
		function jsocial_url(){
			return document.location;
		}
		
		// Encode url
		function urlencode(string) {
			return escape(string).replace('+', '%2B').replace('%20', '+').replace('*', '%2A').replace('/', '%2F').replace('@', '%40');
		}
		
		function highlight(element, state){
			
			if(state){
				element.style.opacity = 1;
				element.childNodes[0].style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=100);";
			}else{
				element.style.opacity = highlight_opacity/100;
				element.style.filter = "alpha(opacity=20)";
				element.childNodes[0].style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + highlight_opacity + ");";
			}
		}

		
		// returns the jQuery object to allow for chainability.
		return this;
	}
	
})(jQuery);

// Format list
var jformat				= Array();
jformat['nujij']	 	= "http://nujij.nl/jij.lynkx?t={TITLE}&u={URL}&b={DESCRIPTION}"
jformat['ekudos'] 		= "http://www.ekudos.nl/artikel/nieuw?url={URL}&title={TITLE}&desc={DESCRIPTION}";
jformat['digg'] 		= "http://digg.com/submit?phase=2&url={URL}&title={TITLE}";
jformat['linkedin'] 	= "http://www.linkedin.com/shareArticle?mini=true&url={URL}&title={TITLE}&summary={DESCRIPTION}&source=";
jformat['sphere'] 		= "http://www.sphere.com/search?q=sphereit:{URL}";
jformat['technorati'] 	= "http://www.technorati.com/faves?add={URL}";
jformat['delicious'] 	= "http://del.icio.us/post?url={URL}&title={TITLE}";
jformat['furl'] 		= "http://furl.net/storeIt.jsp?u={URL}&t={TITLE}";
jformat['netscape'] 	= "http://www.netscape.com/submit/?U={URL}&T={TITLE}";
jformat['yahoo'] 		= "http://myweb2.search.yahoo.com/myresults/bookmarklet?u={URL}&t={TITLE}";
jformat['google'] 		= "http://www.google.com/bookmarks/mark?op=edit&bkmk={URL}&title={TITLE}";
jformat['newsvine'] 	= "http://www.newsvine.com/_wine/save?u={URL}&h={TITLE}";
jformat['reddit'] 		= "http://reddit.com/submit?url={URL}&title={TITLE}";
jformat['blogmarks'] 	= "http://blogmarks.net/my/new.php?mini=1&url={URL}&title={TITLE}";
jformat['magnolia'] 	= "http://ma.gnolia.com/bookmarklet/add?url={URL}&title={TITLE}";
jformat['live']		 	= "https://favorites.live.com/quickadd.aspx?marklet=1&mkt=en-us&url={URL}&title={TITLE}&top=1";
jformat['tailrank'] 	= "http://tailrank.com/share/?link_href={URL}&title={TITLE}";
jformat['facebook'] 	= "http://www.facebook.com/share.php?u={URL}";
jformat['twitter'] 		= "http://twitter.com/?status={TITLE}%20-%20{URL}";
jformat['stumbleupon'] 	= "http://www.stumbleupon.com/submit?url={URL}&title={TITLE}";
jformat['bligg'] 		= "http://www.bligg.nl/submit.php?url={URL}";
jformat['symbaloo'] 	= "http://www.symbaloo.com/en/add/url={URL}&title={TITLE}";