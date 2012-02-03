(function ($) {
	$.fn.itunesFeature = function (c) {
		var c = $.extend(true, $.fn.itunesFeature.defaults, c);
		return this.each(function () {
			var a = $(this);
			var b = {
				container: a,
				transitionInProgress: false,
				manualTransition: false,
				pausePresentation: false
			};
			ie6();
			readBillboardImages(c, b);
			if (b.images.length < 4) {
				alert('The "iTunesFeature" widget requires at least four sets of images!');
				return
			}
			initializeBillboards(c, b);
			initializeCarrousel(c, b);
			runBillboards(c, b)
		})
	};
	$.fn.itunesFeature.defaults = {
		transitionsInterval: 5000,
		transitionsLength: 600
	};
	function ie6() {
		return ($.browser.msie && $.browser.version == "6.0")
	};
	function readBillboardImages(e, f) {
		var g = f.container.find("div");
		f.images = [];
		g.each(function (a, b) {
			var c = jQuery(b).find("img");
			var d = jQuery(b).find("a");
			if (c.length >= 2) {
				f.images.push({
					title: $(b).find("span").text(),
					thumb: $(c[0]).attr("src"),
					large: $(c[1]).attr("src"),
					link: $(d[0]).attr("href")
				})
			}
		});
		f.images.current = 0;
		f.images.next = 1;
		g.remove()
	};
	function initializeCarrousel(a, b) {
		b.carrousel = $(document.createElement("ul")).attr("id", "carrousel");
		b.container.append(b.carrousel);
		for (var i = b.images.length - 1; i >= 0; i--) {
			var c = b.images[i];
			var d = '<li style="background:url(' + c.thumb + ') no-repeat"></li>';
			b.carrousel.append(d)
		}
		b.downArrow = $(document.createElement("img")).attr({
			"src": "resources/nothing.gif",
			"class": ((ie6()) ? "downarrow downarrowIE6": "downarrow")
		}).css({
			"opacity": "0"
		});
		b.container.append(b.downArrow);
		b.container.bind("mouseenter mouseleave", function (e) {
			b.downArrow.css("opacity", (e.type == "mouseenter") ? "8": "0")
		});
		b.downArrow.bind("mouseenter mouseleave click", function (e) {
			switch (e.type) {
			case "mouseenter":
				b.pausePresentation = true;
				break;
			case "mouseleave":
				b.pausePresentation = false;
				break;
			case "click":
				if (b.transitionInProgress) return;
				b.manualTransition = true;
				onBillboardTransition(a, b);
				b.manualTransition = false;
				break
			}
		})
	};
	function initializeBillboards(b, c) {
		c.container.append('<div id="billboardone"></div><div id="billboardtwo"></div>');
		var d = c.container.find("div");
		c.billboard1 = $(d[0]);
		c.billboard2 = $(d[1]).fadeTo(0, 0);
		c.activeBillboard = c.billboard1;
		c.titleBar = $(document.createElement("span")).attr({
			"class": (ie6() ? "featuretitle featuretitleIE6": "featuretitle")
		}).html("Some big title here");
		c.container.append(c.titleBar);
		c.transparentGlass = jQuery(document.createElement("div")).attr("id", "transparentGlass");
		c.container.append(c.transparentGlass);
		c.transparentGlass.click(function (e) {
			var a = c.images[c.images.current].link;
			if (a) document.location.href = c.images[c.images.current].link
		})
	};
	function runBillboards(a, b) {
		with(b) {
			billboard1.css({
				"background": "url(" + images[images.current].large + ") no-repeat"
			});
			billboard2.css({
				"background": "url(" + images[images.next].large + ") no-repeat"
			});
			titleBar.html(images[images.current].title)
		}
		b.container.css("display", "block");
		b.billboardIntervalHandle = setInterval(function () {
			onBillboardTransition(a, b)
		},
		a.transitionsInterval)
	};
	function reorderImagePointers(a) {
		a.current = (a.current == a.length - 1) ? 0 : a.current + 1;
		a.next = (a.next == a.length - 1) ? 0 : a.next + 1
	};
	function onBillboardTransition(a, b) {
		with(b) if (transitionInProgress || (pausePresentation && manualTransition == false)) return;
		var c = (b.activeBillboard == b.billboard1) ? b.billboard2: b.billboard1;
		var d = b.activeBillboard;
		c.css({
			"background": "url(" + b.images[b.images.next].large + ") no-repeat"
		});
		updateCarrousel(a, b);
		b.carrousel.animate({
			top: "0px"
		},
		a.transitionsLength);
		var w = b.titleBar.width();
		var l = b.titleBar.position().left;
		b.titleBar.animate({
			left: -(l + w) + "px"
		},
		a.transitionsLength / 2, function () {
			b.titleBar.html(b.images[b.images.next].title).css("left", -(b.titleBar.width() + 50) + "px");
			b.titleBar.animate({
				left: l + "px"
			},
			a.transitionsLength / 2)
		});
		b.transitionInProgress = true;
		c.fadeTo(a.transitionsLength, 1);
		d.fadeTo(a.transitionsLength, 0, function () {
			b.activeBillboard = c;
			reorderImagePointers(b.images);
			d.css({
				"background": "url(" + b.images[b.images.current].large + ") no-repeat"
			});
			b.transitionInProgress = false
		})
	};
	function updateCarrousel(a, b) {
		var c = b.carrousel.find("li:first");
		var d = b.carrousel.find("li:last");
		b.carrousel.css("top", -c.height() + "px");
		c.before(d)
	}
})(jQuery);