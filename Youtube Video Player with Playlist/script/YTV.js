/**
 * YTV - YouTube video player with playlist and repeat options
 * @version		1.0.0
 * @MooTools version 1.2
 * @author Constantin Boiangiu <constantin.b [at] gmail.com>
 * @copyright Constantin Boiangiu
 */
var YTV = new Class({
	Implements: [Options],
	options: {
		videos: null,
		videoSize: {
			width: 425,
			height: 344
		},
		playerConfig: {
			showRelated: 0,
			showSearch: 0,
			showInfo: 0
		},
		videoContainer: null,
		playlist: null,
		clickStart: true,
		volume: 30,
		infoPanel: null,
		togglePlaylist: null,
		toggleRepeat: null,
		repeatPlaylist: false
	},
	initialize: function (A) {
		this.setOptions(A);
		this.videos = $(this.options.playlist).getElements(this.options.videos);
		this.container = $(this.options.videoContainer);
		this.container.setStyles(this.options.videoSize);
		this.playlistState = -1;
		this.currentVideo = 0;
		new Tips(".tooltiped", {
			className: "YTV_tips"
		});
		this.playlistScroll();
		this.togglePlaylist();
		if (this.options.repeatPlaylist) {
			$(this.options.toggleRepeat).addClass("playlist_repeat_on")
		}
		$(this.options.toggleRepeat).addEvent("click", function (B) {
			B.preventDefault();
			if (this.options.repeatPlaylist) {
				this.options.repeatPlaylist = false;
				$(this.options.toggleRepeat).removeClass("playlist_repeat_on")
			} else {
				this.options.repeatPlaylist = true;
				$(this.options.toggleRepeat).addClass("playlist_repeat_on")
			}
		}.bind(this));
		this.videos.each(function (D, B) {
			var C = JSON.decode(D.get("rel"));
			if (C.end) {
				D.addClass("link_repeat")
			}
			new Element("a", {
				"class": "repeat tooltiped" + (C.end == 1 ? " repeat_on": ""),
				href: "#",
				title: "toggle video repeat",
				events: {
					click: function (E) {
						E.preventDefault();
						if (C.end) {
							this.removeClass("repeat_on");
							D.removeClass("link_repeat")
						} else {
							this.addClass("repeat_on");
							D.addClass("link_repeat")
						}
						C.end = C.end ? 0 : 1
					}
				}
			}).injectAfter(D);
			C.title = D.get("text");
			D.addEvent("click", this.playVideo.pass([C, B], this));
			if (!$defined(this.swfObj)) {
				this.playVideo(C, B)
			}
		}.bind(this))
	},
	loadVideo: function (B) {
		if ($defined(this.swfObj)) {
			this.swfObj.cueVideoById(B.vidId);
			this.swfObj.setVolume(B.volume || this.options.volume);
			if (B.end) {
				this.swfObj.playVideo()
			} else {
				if ($defined(B.paused) && B.paused !== 1) {
					this.swfObj.playVideo()
				} else {
					if (this.options.clickStart && !$defined(B.paused)) {
						this.swfObj.playVideo()
					}
				}
			}
			return false
		}
		var A = "http://www.youtube.com/v/" + B.vidId + "&enablejsapi=1&playerapiid=YTV_videoPlayer&rel=" + this.options.playerConfig.showRelated + "&showsearch=" + this.options.playerConfig.showSearch + "&showinfo=" + this.options.playerConfig.showInfo;
		this.swfObj = new Swiff(A, {
			id: "YTV_videoPlayer",
			container: this.container,
			width: this.options.videoSize.width,
			height: this.options.videoSize.height,
			params: {
				wmode: "transparent",
				allowScriptAccess: "always"
			}
		})
	},
	playVideo: function (B, A) {
		this.videoPlaying = B;
		this.currentVideo = A;
		this.loadVideo(B);
		if (this.playlistState == 1) {
			this.playlistFx.start({
				left: -500
			});
			this.playlistState = -1;
			$(this.options.togglePlaylist).removeClass("playlist_on")
		}
		this.highlightElement(A)
	},
	highlightElement: function (A) {
		this.videos.removeClass("selected");
		this.videos[A].addClass("selected")
	},
	changeState: function (E) {
		var D = "";
		switch (E) {
		case - 1 : D = "Starting player";
			break;
		case 0:
			D = this.videoPlaying.title + " - ended";
			if (this.videoPlaying.end == 1) {
				D = this.videoPlaying.title + " - replaying";
				this.swfObj.playVideo()
			} else {
				if (this.options.repeatPlaylist) {
					var A = this.currentVideo + 1 < this.videos.length ? this.currentVideo + 1 : 0;
					var C = this.videos[A];
					var B = JSON.decode(C.get("rel"));
					B.title = C.get("text");
					D = "Loading next video <strong>" + B.title + "</strong>";
					this.playVideo(B, A)
				}
			}
			break;
		case 1:
			D = "<strong>" + this.videoPlaying.title + "</strong> - playing" + (this.videoPlaying.end ? " ( repeat : on )": "");
			break;
		case 2:
		case 5:
			D = "<em>" + this.videoPlaying.title + "</em>";
			break;
		case 3:
			D = "Buffering video ... please wait";
			break
		}
		this.videoState = E;
		$(this.options.infoPanel).set({
			html: D
		})
	},
	playlistScroll: function () {
		this.playlistScroll = new Fx.Scroll($(this.options.playlist), {
			wait: false,
			duration: 400,
			wheelStops: false
		});
		var A = this.currentVideo;
		$(this.options.playlist).addEvent("mousewheel", function (B) {
			var B = new Event(B);
			A += -B.wheel;
			if (A < 0) {
				A = 0
			}
			if (A >= this.videos.length) {
				A = this.videos.length - 1
			}
			this.playlistScroll.toElement(this.videos[A])
		}.bind(this))
	},
	togglePlaylist: function () {
		this.playlistFx = new Fx.Morph(this.options.playlist, {
			wait: false,
			duration: 300
		});
		$(this.options.togglePlaylist).addEvent("click", function (A) {
			A.preventDefault();
			var B = this.playlistState == -1 ? 0 : -500;
			this.playlistFx.start({
				left: B
			});
			if (this.playlistState == -1) {
				this.prevState = this.videoState;
				$(this.options.togglePlaylist).addClass("playlist_on")
			} else {
				$(this.options.togglePlaylist).removeClass("playlist_on")
			}
			this.playlistState *= -1;
			if (this.playlistState == 1) {
				this.swfObj.pauseVideo()
			} else {
				if (this.prevState == 1) {
					this.swfObj.playVideo()
				}
			}
		}.bind(this))
	}
});
function onYouTubePlayerReady() {
	var A = document.getElementById("YTV_videoPlayer");
	A.addEventListener("onStateChange", "YTVplayer.changeState");
	YTVplayer.swfObj = A
}
window.addEvent("load", function () {
	this.YTVplayer = new YTV({
		videoContainer: "YTV_playback",
		playlist: "YTV_playlist",
		videoSize: {
			width: 617,
			height: 500
		},
		playerConfig: {
			showRelated: 0,
			showSearch: 0,
			showInfo: 1
		},
		videos: ".YTV_video",
		clickStart: true,
		volume: 10,
		infoPanel: "movie_state",
		togglePlaylist: "playlist",
		toggleRepeat: "playlist_repeat",
		repeatPlaylist: true
	})
}.bind(this));
