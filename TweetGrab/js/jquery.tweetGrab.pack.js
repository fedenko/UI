/*
	jQuery - tweetGrab Plugin
	@copyright Michael Kafka - http://www.makfak.com
	@version 2.0
*/
(function ($) {
	var g;
	$.fn.tweetGrab = function (b) {
		var c = $.extend({},
		$.fn.tweetGrab.defaults, b);
		return this.each(function (i) {
			obj = $(this);
			set = {};
			set.url = obj.attr('href');
			set.text = obj.text();
			set.urlCheck = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(set.url);
			set.center = 'margin-left:auto; margin-right:auto;';
			set.searchTerm = false;
			if (/^\@/.test(set.text)) {
				set.type = 'user'
			} else if (/^\#/.test(set.text)) {
				set.type = 'hashtag'
			} else if (/^\$/.test(set.text)) {
				set.type = 'ticker'
			} else if (/^\?/.test(set.text)) {
				set.type = 'search';
				set.text = set.text.replace(/^\?/, '')
			}
			if (c.user != '' || set.type == 'user') {
				if (set.type == 'user') {
					c.user = set.text
				}
				set.type = 'user';
				if (/^\@/.test(c.user)) {
					c.user = c.user.substr(1, c.user.length)
				}
				set.id = c.user + i;
				set.twitterURL = 'http://twitter.com/statuses/user_timeline/' + c.user + '.json?count=' + c.tweetCount + '&callback=?';
				set.displayURL = 'http://twitter.com/' + c.user + ''
			} else if (c.hashtag != '' || set.type == 'hashtag') {
				if (set.type == 'hashtag') {
					c.hashtag = set.text
				}
				set.type = 'hashtag';
				if (/^\#/.test(c.hashtag)) {
					set.id = c.hashtag.substr(1, c.hashtag.length) + i
				} else {
					set.id = c.hashtag + i;
					c.hashtag = '#' + c.hashtag
				}
				set.searchTerm = escape(c.hashtag)
			} else if (c.ticker != '' || set.type == 'ticker') {
				if (set.type == 'ticker') {
					c.ticker = set.text
				}
				set.type = 'ticker';
				if (/^\$/.test(c.ticker)) {
					set.id = c.ticker.substr(1, c.ticker.length) + i
				} else {
					set.id = c.ticker + i;
					c.ticker = '$' + c.ticker
				}
				set.searchTerm = escape(c.ticker)
			} else if (set.urlCheck) {
				var a = '^(https?:\/\/)?([twier]+)\.([com]+)/.*/([status]+)/';
				if (set.url.match(a)) {
					set.type = 'quote';
					set.id = set.url.replace(/.+(?=[^0-9])./i, '');
					set.twitterURL = 'http://twitter.com/statuses/show/' + set.id + '.json?callback=?';
					set.displayURL = set.url
				}
			} else {
				set.searchTerm = escape(set.text)
			}
			if (set.searchTerm) {
				set.type = 'search';
				set.twitterURL = 'http://search.twitter.com/search.json?callback=?&q=' + set.searchTerm + '&rpp=' + c.tweetCount + '';
				set.displayURL = 'http://search.twitter.com/search?q=' + set.searchTerm + ''
			}
			if (!c.center) {
				set.center == ''
			}
			obj.replaceWith('' + '<div class="tweetgrab_container" id="' + set.id + '" style="width:' + c.width + '; ' + set.center + '">' + '<span class="tweetgrab_loading" id="' + set.id + '">loading <a href="' + set.displayURL + '">' + set.displayURL + '</a></span>' + '</div>' + '');
			fetchTweet(c, set, i)
		})
	};
	$.fn.tweetGrab.defaults = {
		user: '',
		hashtag: '',
		ticker: '',
		tweetCount: '10',
		width: '99%',
		center: false,
		animateHeightDuration: 500,
		animateHeightEasing: 'linear',
		animateFadeDuration: 500
	};
	var h = Array;
	function fetchTweet(e, f, i) {
		h[f.id] = setTimeout('tweetGrabFakeErrorEvent(' + f.id + ')', 10000);
		$.getJSON(f.twitterURL, function (a) {
			clearTimeout(h[f.id]);
			var b = '';
			var c;
			if (f.type == 'search') {
				$.each(a.results, function (i) {
					if (i == 0) {
						b = '' + '<div class="tweetgrab_background tweetgrab_search" style="visibility:hidden;">' + '<div class="tweetgrab_content">' + '<span class="tweetgrab_speech-bubble"></span>'
					}
					b += '<div>' + '<span class="tweet_author"><a href="http://www.twitter.com/' + this.from_user + '" style="background:url(' + this.profile_image_url + ') 0px 0px no-repeat;" title="' + this.from_user + '"></a></span>' + '<span class="tweet_text">' + '<a href="http://www.twitter.com/' + this.from_user + '">' + this.from_user + '</a>: ' + linkify(this.text) + '' + '<span class="tweet_meta"><a href="' + f.url + '">' + relative_time(this.created_at) + '</a></span>' + '</span>' + '<span class="clear"></span>' + '</div>';
					if (i == a.results.length - 1) {
						b += '<span class="tweet_info">Search Results for: <a href="' + f.displayURL + '">' + unescape(f.searchTerm); + '</a></span>' + '</div>' + '</div>'
					}
				})
			}
			if (f.type == 'quote') {
				b = '' + '<div class="tweetgrab_background" style="background-image:url(' + a.user.profile_background_image_url + '); background-color:#' + a.user.profile_background_color + ';visibility:hidden;">' + '<div class="tweetgrab_content">' + '<span class="tweetgrab_speech-bubble"></span>' + '<span class="tweet_text" style="color:#' + a.user.profile_text_color + ';">' + linkify(a.text) + '</span>' + '<span class="tweet_meta"><a href="' + f.url + '">' + relative_time(a.created_at) + '</a></span>' + '<span class="tweet_author"><a href="http://www.twitter.com/' + a.user.screen_name + '" style="background:url(' + a.user.profile_image_url + ') 0px 0px no-repeat; color:#' + a.user.profile_link_color + ';">' + a.user.screen_name + '</a></span>' + '</div>' + '</div>'
			}
			if (f.type == 'user') {
				$.each(a, function (i) {
					if (i == 0) {
						c = this.user.profile_link_color;
						b = '' + '<div class="tweetgrab_background" style="background-image:url(' + this.user.profile_background_image_url + '); background-color:#' + this.user.profile_background_color + ';visibility:hidden;">' + '<div class="tweetgrab_content">' + '<span class="tweetgrab_speech-bubble"></span>'
					}
					b += '<span class="tweet_text" style="color:#' + this.user.profile_text_color + ';">' + linkify(this.text) + '</span>' + '<span class="tweet_meta"><a href="http://twitter.com/' + this.user.screen_name + '/status/' + this.id + '">' + relative_time(this.created_at) + '</a></span>';
					if (i == a.length - 1) {
						b += '<span class="tweet_author"><a href="http://www.twitter.com/' + this.user.screen_name + '" style="background:url(' + this.user.profile_image_url + ') 0px 0px no-repeat; color:#' + this.user.profile_link_color + ';">' + this.user.screen_name + '</a></span>' + '</div>' + '</div>'
					}
				})
			}
			g = f.id;
			$('#' + f.id).children('.tweetgrab_loading').parent().prepend(b).find('span.tweet_text a').css({
				'color': '#' + c
			});
			var d = $('#' + f.id).children('.tweetgrab_background').height();
			$('#' + f.id).children('.tweetgrab_loading').animate({
				'opacity': '1'
			},
			500, function () {
				$(this).animate({
					'height': d
				},
				e.animateHeightDuration, e.animateHeightEasing, function () {
					$(this).parent().css({
						'height': d
					}).children('.tweetgrab_background').css({
						'visibility': 'visible'
					});
					$(this).animate({
						'opacity': '0'
					},
					e.animateFadeDuration, function () {
						$(this).css({
							'display': 'none'
						})
					})
				})
			})
		});
		return
	}
	function linkify(b) {
		b = b.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/, function (a) {
			return a.link(a)
		});
		b = b.replace(/@+[A-Za-z0-9-_]+/g, function (a) {
			b = a.replace(/[A-Za-z0-9-_]+/, function (i) {
				return '<a href="http://twitter.com/' + i + '">' + i + '</a> '
			});
			return b
		});
		b = b.replace(/#+[A-Za-z0-9-_]+/g, function (a) {
			b = a.replace(/[A-Za-z0-9-_]+/, function (i) {
				return '<a href="http://search.twitter.com/search?q=+#' + i + '">' + i + '</a> '
			});
			return b
		});
		b = b.replace(/\$+[A-Za-z0-9-_]+/g, function (a) {
			b = a.replace(/[A-Za-z0-9-_]+/, function (i) {
				return '<a href="http://search.twitter.com/search?q=+$' + i + '">' + i + '</a> '
			});
			return b
		});
		return b
	};
	function relative_time(a) {
		var b = a.split(" ");
		a = b[1] + " " + b[2] + ", " + b[5] + " " + b[3];
		var c = Date.parse(a);
		var d = (arguments.length > 1) ? arguments[1] : new Date();
		var e = parseInt((d.getTime() - c) / 1000);
		e = e + (d.getTimezoneOffset() * 60);
		var r = '';
		if (e < 60) {
			r = 'a minute ago'
		} else if (e < 120) {
			r = 'couple of minutes ago'
		} else if (e < (45 * 60)) {
			r = (parseInt(e / 60)).toString() + ' minutes ago'
		} else if (e < (90 * 60)) {
			r = 'an hour ago'
		} else if (e < (24 * 60 * 60)) {
			r = '' + (parseInt(e / 3600)).toString() + ' hours ago'
		} else if (e < (48 * 60 * 60)) {
			r = '1 day ago'
		} else {
			r = (parseInt(e / 86400)).toString() + ' days ago'
		}
		return r
	}
})(jQuery);
function tweetGrabFakeErrorEvent(a) {
	$('#' + a).children('.tweetgrab_loading').html($('#' + a).children('.tweetgrab_loading').html().replace(/loading/, 'error')).css({
		'background-image': 'url(images/ajax-error.gif)'
	})
}