(function ($) {
	GTrackOptions = function (category, action, label, count) {
		this.isPooled = true;
		this.category = category;
		this.action = action;
		this.label = label;
		this.count = count
	};
	GTrackSysInitOptions = function (account) {
		this.account = account;
		this.isPageTrackEnabled = true;
		this.onInitFinished = function (tracker) {};
		this.onTracking = function (option) {};
		this.dataName = "gtdata";
		this.intervalPool = 60000;
		this.handlers = {};
		this.autoInit = true;
		this.autoFlush = true
	};
	GTrackInitOptions = function (events, categories) {
		this.isPooled = true;
		this.events = events;
		this.categories = categories;
		this.actions = events;
		this.labels = "";
		this.counts = "1";
		this.handlers = {}
	};
	$.gtrack = function (options) {
		$.extend($.gtrack.options, options);
		$.gtrack.init()
	};
	$.each({
		tracker: null,
		poolId: 0,
		pooledTrack: [],
		options: new GTrackSysInitOptions(null),
		init: function () {
			var host = (("https:" == document.location.protocol) ? "https://ssl.": "http://www.");
			var url = host + "google-analytics.com/ga.js";
			$.getScript(url, function () {
				var tracker = _gat._getTracker($.gtrack.options.account);
				$.gtrack.tracker = tracker;
				if ($.gtrack.options.isPageTrackEnabled) {
					tracker._trackPageview()
				}
				$.gtrack.options.onInitFinished(tracker)
			});
			if ($.gtrack.options.autoInit) {
				$("*[gt-evt][gt-cat]").gtrackInit()
			}
			if ($.gtrack.options.autoFlush) {
				$(window).unload(function () {
					$.gtrack.trackPooled()
				})
			}
			if ($.gtrack.options.intervalPool > 0) {
				$.gtrack.poolId = setInterval(function () {
					$.gtrack.trackPooled()
				},
				$.gtrack.options.intervalPool)
			}
		},
		track: function (options) {
			if (options.isPooled) {
				$.gtrack.addTrackToPool(options)
			} else {
				$.gtrack.trackDirectly(options)
			}
		},
		trackDirectly: function (options) {
			$.gtrack.options.onTracking(options);
			return $.gtrack.tracker._trackEvent(options.category, options.action, options.label, options.count)
		},
		addTrackToPool: function (options) {
			var key = options.category + "_" + options.action + "_" + options.label;
			var val = $.gtrack.pooledTrack[key];
			if (val == null) {
				$.gtrack.pooledTrack[key] = $.extend({},
				options);
				val = $.gtrack.pooledTrack[key]
			} else {
				val.count += options.count
			}
		},
		trackPooled: function () {
			for (var key in $.gtrack.pooledTrack) {
				var options = $.gtrack.pooledTrack[key];
				if (options.count > 0) {
					$.gtrack.trackDirectly(options);
					options.count = 0
				}
			}
		},
		getDefaultEvent: function (e) {
			var gtrackData = e.data[$.gtrack.options.dataName];
			var options = new GTrackOptions(gtrackData.category, gtrackData.action, gtrackData.label, gtrackData.count);
			$.gtrack.track(options)
		}
	},
	function (i) {
		$.gtrack[i] = this
	});
	$.fn.gtrackInit = function (options) {
		var userDefinedOptions = options;
		return this.each(function () {
			var $this = $(this);
			var defaults = new GTrackInitOptions($this.attr("gt-evt"), $this.attr("gt-cat"));
			if ($this.attr("gt-act") != null) {
				defaults.actions = $this.attr("gt-act")
			}
			if ($this.attr("gt-lbl") != null) {
				defaults.labels = $this.attr("gt-lbl")
			}
			options = $.extend(defaults, userDefinedOptions);
			var events = options.events.split(",");
			var categories = options.categories.split(",");
			var actions = options.actions.split(",");
			var labels = options.labels.split(",");
			var counts = options.counts.split(",");
			$.each(events, function (i) {
				var name = events[i];
				var handler = function () {
					var result = $.gtrack.getDefaultEvent;
					var defaultHandler = $.gtrack.options.handlers[name];
					if (defaultHandler != null) {
						result = defaultHandler
					}
					var userDefinedHandler = null;
					if (options.handlers != null) {
						userDefinedHandler = options.handlers[name]
					}
					if (userDefinedHandler != null) {
						result = userDefinedHandler
					}
					return result
				} ();
				var data = $this.data($.gtrack.options.dataName);
				if (data != null) {
					if (data.handlers != null) {
						$this.unbind(name, data.handlers[name])
					}
				}
				var option = {};
				option[$.gtrack.options.dataName] = {
					isPooled: options.isPooled,
					action: name,
					category: function () {
						var result = "";
						if (categories.length != events.length) {
							result = options.categories
						} else {
							result = categories[i]
						}
						return result
					} (),
					action: function () {
						var result = "";
						if (actions.length != events.length) {
							result = options.actions
						} else {
							result = actions[i]
						}
						return result
					} (),
					label: function () {
						var result = "";
						if (labels.length != events.length) {
							result = options.labels
						} else {
							result = labels[i]
						}
						return result
					} (),
					count: function () {
						var result = "";
						if (counts.length != events.length) {
							result = options.counts
						} else {
							result = counts[i]
						}
						return parseInt(result)
					} ()
				};
				$this.bind(name, option, handler);
				options.handlers[name] = handler
			});
			$this.data($.gtrack.options.dataName, options)
		})
	};
	$.fn.gtrackFin = function (events) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data($.gtrack.options.dataName);
			if (data != null) {
				if (data.handlers != null) {
					if (events == null) {
						events = data.events
					}
					if (events == null) {
						events = ""
					}
					events = events.split(",");
					$.each(events, function (i) {
						var name = events[i];
						$this.trigger(name);
						$this.unbind(name, data.handlers[name])
					})
				}
			}
		})
	};
	$.fn.gtrack = function (events) {
		return this.each(function () {
			var $this = $(this);
			if (events == null) {
				var data = $this.data($.gtrack.options.dataName);
				if (data != null) {
					events = data.events
				}
			}
			if (events == null) {
				events = ""
			}
			events = events.split(",");
			$.each(events, function (i) {
				var name = events[i];
				$this.trigger(name)
			})
		})
	}
})(jQuery);