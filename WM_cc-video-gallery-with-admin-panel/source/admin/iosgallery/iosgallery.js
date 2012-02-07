
(function($) {
	$.fn.iosgallery = function(o) {
		
		var defaults = {
		}
		
		o = $.extend(defaults, o);
		this.each( function() {
			var cthis = $(this);
			var total_width = cthis.width();
			var total_height = cthis.height();
			var currNr=0;
			var videos = cthis.find('.videos').children();
			var i=0;
			for(i=0; i<videos.length;i++){
				videos.eq(i).css({
					'position' : 'absolute',
					'top' : total_height * i
				})
			}
			cthis.find('.videos-menu').children().click(function(){
				var index = ($(this).parent().children().index($(this)));
				if(index==currNr) return;
				$(this).parent().children().eq(currNr).removeClass('selected');
				videos.eq(currNr).css('top', 0);
				videos.eq(currNr).animate({
					'top' : -total_height -5 
				}, {queue:false, duration: 300})
				//videos.eq(currNr).fadeOut('slow');
				$(this).parent().children().eq(index).addClass('selected');
				videos.eq(index).css('top', total_height);
				videos.eq(index).animate({
					'top' : 0
				}, {queue:false, duration: 300})
				//videos.eq(index).fadeIn('slow');
				currNr=index;
			})
			return this;
		})
	}
})(jQuery);


			function is_ios() {
				return (
					(navigator.platform.indexOf("iPhone") != -1) ||
					(navigator.platform.indexOf("iPod") != -1) ||
					(navigator.platform.indexOf("iPad") != -1)
				)
			}