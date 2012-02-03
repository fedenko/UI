(function ($) {
	$.fn.photostack = function (g) {
		var h = {
			prev: '#prev',
			next: '#next',
			speed: 'slow',
			direction: 'vertical',
			easeIn: null,
			easeOut: null,
			randomTop: 10,
			randomLeft: 10,
			autoplay: false,
			autoplayDirection: 'next',
			autoplayTimeout: 5000,
			autoplayStart: '#start',
			autoplayStop: '#stop',
			rotate: true,
			rotateDeg: 5,
			shadow: false,
			shadowOffsetX: 0,
			shadowOffsetY: 0,
			shadowBlur: 5,
			shadowColor: 'black'
		};
		var g = $.extend(h, g);
		var i, maxHeight, maxzIndex;
		var j = false;
		return this.each(function () {
			obj = $(this);
			i = 0,
			maxHeight = 0,
			maxzIndex = 0;
			obj.children('img').each(function () {
				var a = $(this);
				i = a.width() > i ? a.width() : i;
				maxHeight = a.height() > maxHeight ? a.height() : maxHeight;
				a.css({
					'z-index': ++maxzIndex,
					'top': randomPixels(g.randomTop) + 'px',
					'left': randomPixels(g.randomLeft) + 'px'
				});
				if (navigator.appName != 'Microsoft Internet Explorer') {
					a.css('display', 'none');
					$(new Image()).attr('src', a.attr('src')).load(function () {
						a.fadeIn('slow')
					})
				}
				if (g.rotate) {
					var b = 'rotate(' + randomPixels(g.rotateDeg) + 'deg)';
					a.css({
						'-moz-transform': b,
						'-webkit-transform': b
					})
				}
				if (g.shadow) {
					var b = g.shadowOffsetX + 'px ' + g.shadowOffsetY + 'px ' + g.shadowBlur + 'px ' + g.shadowColor;
					a.css({
						'-moz-box-shadow': b,
						'-webkit-box-shadow': b
					})
				}
			});
			obj.children('img').css({
				'position': 'absolute'
			}).wrapAll('<div class="photostack-wrapper"></div>').parent().css({
				'position': 'relative',
				'width': i,
				'height': maxHeight
			});
			i += g.randomLeft;
			maxHeight += g.randomTop;
			if (g.rotate) {
				i += g.rotateDeg * 5;
				maxHeight += g.rotateDeg * 5
			}
			$(g.prev).click(function () {
				swapPhotos(obj.children('.photostack-wrapper').children('img'), '1', maxzIndex, '', -1);
				return false
			});
			$(g.next).click(function () {
				swapPhotos(obj.children('.photostack-wrapper').children('img'), maxzIndex, '1', '-', 1);
				return false
			});
			var c;
			if (g.autoplay) startAutoplay();
			$(g.autoplayStart).click(function () {
				c = startAutoplay();
				return false
			});
			$(g.autoplayStop).click(function () {
				clearInterval(c);
				return false
			})
		});
		function swapPhotos(b, c, d, e, f) {
			if (j) return false;
			else j = true;
			b.each(function () {
				if ($(this).css('z-index') == c) {
					var a, animationOut;
					if (g.direction == 'vertical') {
						a = {
							'top': e + maxHeight + 'px',
							'left': randomPixels(g.randomLeft) + 'px'
						};
						animationOut = {
							'top': randomPixels(g.randomTop) + 'px'
						}
					} else {
						a = {
							'left': e + i + 'px',
							'top': randomPixels(g.randomTop) + 'px'
						};
						animationOut = {
							'left': randomPixels(g.randomLeft) + 'px'
						}
					}
					$(this).animate(a, g.speed, g.easeIn, function () {
						$(this).css('z-index', d).animate(animationOut, g.speed, g.easeOut, function () {
							j = false
						})
					})
				} else {
					$(this).animate({
						'text-decoration': 'none'
					},
					g.speed, function () {
						$(this).css('z-index', parseInt($(this).css('z-index')) + f)
					})
				}
			})
		}
		function randomPixels(a) {
			var b = Math.floor(Math.random() * a);
			return Math.floor(Math.random() * 2) == 0 ? "-" + b: b
		}
		function startAutoplay() {
			return setInterval(function () {
				if (g.autoplayDirection == 'next') swapPhotos(obj.children('.photostack-wrapper').children('img'), maxzIndex, '1', '-', 1);
				else {
					swapPhotos(obj.children('.photostack-wrapper').children('img'), '1', maxzIndex, '', -1)
				}
			},
			g.autoplayTimeout)
		}
	}
})(jQuery);