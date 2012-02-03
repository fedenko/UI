var MyChannel = function (n) {
	this.options = {
		user: null,
		maxPageSize: 20,
		container: null
	};
	this.initialize = function () {
		if (n) {
			for (var b in n) this.options[b] = n[b]
		}
		var c = swfobject.getFlashPlayerVersion().major;
		if (c < 8) alert("You are running version " + c + " of Adobe Flash player. YouTube player requires Adobe Flash player 8 or higher installed to view everything correctly.");
		this.container = $("#" + this.options.container);
		if (!this.container.length) alert("Could not find '" + this.options.container + "' element!");
		else {
			this.container.addClass("mychannel");
			this.container.append('<div class="player"><div id="' + this.options.container + '_playerpanel"></div><div class="controls"></div></div><div class="videos"><div class="scroll"></div></div><div class="showVideoPanel"><img class="loading" src="images/loadinfo.gif"></div>');
			var d = this;
			var e = this.container.find(".showVideoPanel");
			var f = jQuery(document.createElement("a")).attr({
				"href": "javascript:",
				"class": "showVidesBtn"
			}).append("See all videos").click(function () {
				d.openVideosPanel()
			});
			var g = jQuery(document.createElement("a")).attr({
				"href": "javascript:",
				"class": "loadMoreVideosBtn"
			}).append("Load more videos").click(function () {
				if (d.state.nextPageLink) {
					d.loadingState(true);
					jQuery.getJSON(d.state.nextPageLink + "&callback=?", function (a) {
						d.workoutSearchResponse(a);
						d.loadingState(false);
						d.openVideosPanel(true)
					})
				}
			});
			e.append(f);
			e.append(g);
			this.search()
		}
	};
	this.search = function () {
		var b = "http://gdata.youtube.com/feeds/api/users/" + this.options.user + "/uploads?callback=?&alt=json-in-script&orderby=published&max-results=" + this.options.maxPageSize;
		var c = this;
		this.loadingState(true);
		jQuery.getJSON(b, function (a) {
			c.workoutSearchResponse(a);
			c.loadingState(false);
			c.openVideosPanel(true)
		})
	};
	this.workoutSearchResponse = function (a) {
		var b = a.feed;
		if (!b) return;
		if (!this.state) {
			this.state = {
				data: [],
				nextPageLink: "",
				printedTo: 0
			}
		}
		for (var i = 0; i < b.entry.length; i++) {
			var c = b.entry[i];
			this.state.data.push({
				title: c.title.$t,
				thumb: c.media$group.media$thumbnail[0].url,
				url: c.media$group.media$content[0].url,
				duration: c.media$group.yt$duration.seconds
			});
			var d = c.media$group.media$player[0].url.split("=");
			this.state.data[this.state.data.length - 1].id = (d[1]) ? d[1] : null
		}
		for (var i = 0; i < b.link.length; i++) this.state.nextPageLink = (b.link[i].rel == "next") ? b.link[i].href: null;
		this.renderSearchResults()
	};
	this.renderSearchResults = function () {
		var a = "";
		var b = null;
		var c = this.container.find(".videos");
		var f = c.find(".scroll");
		if (!f.length) {
			var f = jQuery(document.createElement("div")).attr({
				"class": "scroll"
			});
			c.append(f)
		}
		var g = this;
		for (var i = this.state.printedTo; i < this.state.data.length; i++) {
			var d = this.state.data[i];
			var h = {
				"background-image": "url(" + d.thumb + ")",
				"background-repeat": "no-repeat"
			};
			var j = jQuery(document.createElement("div")).css(h).bind("click", d, function (e) {
				g.onThumbnailClick(e)
			}).append("<p>" + d.title + "</p>").attr({
				"class": "title"
			});
			f.append(j)
		}
		this.state.printedTo = i;
		var k = this.container.find(".showVideoPanel");
		var l = k.find(".showVidesBtn");
		var m = k.find(".loadMoreVideosBtn");
		if (this.state.nextPageLink != null) {
			k.css({
				"height": "20px"
			});
			m.css({
				"display": "block"
			})
		} else {
			m.css({
				"display": "none"
			});
			k.css({
				"height": "0px"
			})
		}
	};
	this.onThumbnailClick = function (a) {
		this.createFlashPlayer(a.data)
	};
	this.createFlashPlayer = function (b) {
		var c = this;
		swfobject.embedSWF(b.url + "&fs=1", this.options.container + '_playerpanel', "508", "392", "8", null, null, {
			allowfullscreen: "true"
		},
		null, function (e) {
			var a = c.container.find(".player");
			a.animate({
				"height": 400,
				"duration": "slow"
			});
			c.closeVideosPanel()
		})
	};
	this.openVideosPanel = function (a) {
		var b = this.container.find(".videos");
		var c = this.container.find(".showVideoPanel");
		var d = c.find(".showVidesBtn");
		var e = c.find(".loadMoreVideosBtn");
		var f = b.find(".scroll");
		e.css({
			"display": (this.state.nextPageLink) ? "block": "none"
		});
		d.css({
			"display": "none"
		});
		b.css({
			"display": "block"
		}).animate({
			"height": f.innerHeight(),
			duration: "slow"
		},
		function () {
			$(window).scrollTo({
				top: (a) ? ($(window).height() - b.offset().top) + f.innerHeight() : b.offset().top,
				left: 0
			},
			300)
		})
	};
	this.closeVideosPanel = function () {
		var a = this;
		var b = this.container.find(".videos");
		var c = this.container.find(".showVideoPanel");
		var d = c.find(".showVidesBtn");
		var e = c.find(".loadMoreVideosBtn");
		d.css({
			"display": "block"
		});
		e.css({
			"display": "none"
		});
		c.animate({
			"height": 20,
			duration: "fast"
		});
		b.animate({
			"height": 0,
			"duration": "slow"
		},
		function () {
			b.css({
				"display": "none"
			})
		})
	};
	this.onPlayerLoad = function (a, b) {
		this.player = a;
		this.setupPlayerEventHandlers();
		a.loadVideoById(b.id, "0");
		var c = this.container.find(".player");
		c.animate({
			"height": 422,
			"duration": "slow"
		});
		this.closeVideosPanel()
	};
	this.loadingState = function (a) {
		this.container.find(".loading").css({
			"display": (a) ? "": "none"
		})
	};
	this.initialize()
};