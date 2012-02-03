var MeOnTheMap = function (g) {
	this.options = {
		address: "",
		container: "",
		defaultUI: true,
		noDragging: false,
		html: "",
		zoomLevel: 16,
		view: 0
	};
	this.preloads = [];
	this.initialize = function (a) {
		for (var b in a) {
			this.options[b] = a[b]
		}
		this.preparePreloading();
		this.container = document.getElementById(this.options.container);
		if (!this.container) {
			alert("Could not locate \"" + this.options.container + "\"");
			return
		}
		this.findLocation()
	};
	this.preparePreloading = function () {
		var c = new RegExp('(src)=("[^"]*")', 'g');
		var d = this.options.html.match(c);
		if (!d) return;
		function getHandler(b) {
			return function () {
				var a = document.getElementById(b.id);
				if (a) {
					a.parentNode.replaceChild(this, a);
					b.marker.tooltip.redraw(true)
				}
			}
		};
		for (var i = 0; i < d.length; i++) {
			this.options.html = this.options.html.replace(d[i], "style=\"visibility:visible\" id=\"preloadimg" + i + "\" src=\"\"");
			var e = d[0].split("=\"")[1];
			e = e.substring(0, e.length - 1);
			var f = new Image();
			this.preloads.push({
				element: f,
				src: e,
				id: "preloadimg" + i
			});
			f.onload = getHandler(this.preloads[this.preloads.length - 1])
		}
	};
	this.startPreloading = function (a, b) {
		for (var i = 0; i < this.preloads.length; i++) {
			this.preloads[i].marker = a;
			this.preloads[i].map = b;
			this.preloads[i].element.src = this.preloads[i].src
		}
	};
	this.findLocation = function () {
		var b = this;
		this.geoLocator = new GClientGeocoder();
		this.geoLocator.getLatLng(this.options.address, function (a) {
			b.handleGetLocatorResponse(a)
		})
	};
	this.getIcon = function () {
		var a = new GIcon(G_DEFAULT_ICON);
		a.image = "images/icon.png";
		a.shadow = "images/shadow.png";
		a.iconSize = new GSize(35, 35);
		a.shadowSize = new GSize(52, 35);
		a.iconAnchor = new GPoint(17, 35);
		return a
	};
	this.handleGetLocatorResponse = function (a) {
		this.geoLocator = null;
		if (!a) {
			alert("Could not resolve this addess \"" + this.options.address + "\"");
			return
		}
		var b = "";
		switch (this.options.view) {
		case 1:
			b = G_SATELLITE_MAP;
			break;
		case 2:
			b = G_HYBRID_MAP;
			break;
		default:
			b = G_NORMAL_MAP;
			break
		}
		this.map = new GMap2(this.container);
		this.map.setMapType(b);
		this.map.setCenter(a, this.options.zoomLevel);
		this.map.disableScrollWheelZoom();
		if (this.options.noDragging) this.map.disableDragging();
		if (this.options.defaultUI) this.map.setUIToDefault();
		this.marker = new GMarker(a, {
			icon: this.getIcon()
		});
		this.map.addOverlay(this.marker);
		if (!this.options.html || this.options.html == "") return;
		this.marker.tooltip = new Tooltip(this.marker, this.options.html);
		this.map.addOverlay(this.marker.tooltip);
		this.marker.tooltip.show();
		if (this.newCenter) {
			var c = this.map.fromLatLngToDivPixel(this.marker.getPoint());
			var d = this.map.fromContainerPixelToLatLng({
				x: c.x + this.newCenter.x,
				y: c.y + this.newCenter.y
			});
			this.map.setCenter(d)
		}
		this.startPreloading(this.marker, this.map)
	};
	this.adjustMapCenter = function (a) {
		if (!this.geoLocator && this.map) {
			var b = this.map.fromLatLngToDivPixel(this.marker.getPoint());
			var c = this.map.fromContainerPixelToLatLng({
				x: b.x + a.x,
				y: b.y + a.y
			});
			this.map.setCenter(c)
		} else {
			this.newCenter = a
		}
	};
	this.initialize(g)
};
function Tooltip(f, g) {
	this.isIE6 = function () {
		if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
			var a = new Number(RegExp.$1);
			return (a == 6)
		}
		return false
	};
	this.initialize = function (a) {
		this.map = a;
		this.div = document.createElement("div");
		var b = document.createElement("div");
		b.className = "top" + ((this.isIE6()) ? " IE6": "");
		var c = document.createElement("div");
		c.className = "middle" + ((this.isIE6()) ? " MIDDLEIE6": "");
		var d = document.createElement("div");
		d.className = "bottom" + ((this.isIE6()) ? " BOTTOMIE6": "");
		c.innerHTML = g;
		this.div.appendChild(b);
		this.div.appendChild(c);
		this.div.appendChild(d);
		this.div.className = 'tooltip';
		this.div.style.position = 'absolute';
		this.div.style.visibility = 'hidden';
		a.getPane(G_MAP_FLOAT_PANE).appendChild(this.div)
	};
	this.remove = function () {
		this.div.parentNode.removeChild(this.div)
	};
	this.copy = function () {
		return new Tooltip(this.marker, this.text, this.padding)
	};
	this.redraw = function (a) {
		if (!a) return;
		var b = this.map.fromLatLngToDivPixel(this.marker.getPoint());
		var c = this.marker.getIcon().iconAnchor;
		var d = (b.x - (this.div.offsetWidth / 2));
		var e = b.y - c.y - this.div.offsetHeight;
		this.div.style.top = e + 'px';
		this.div.style.left = d + 'px'
	};
	this.show = function () {
		this.div.style.visibility = 'visible'
	};
	this.hide = function () {
		this.div.style.visibility = 'hidden'
	};
	this.marker = f;
	this.text = g;
	this.prototype = new GOverlay()
};