/*Rbista Zoom 2009 */
var zoomAreaWidth = '300px';
var zoomAreaHeight = '300px';
var loadingImg = './images/loader.gif';
var thumbFadeSpeed = 9;
var ZoomsInstances = new Array();
var Rb_UA = 'msie';
var Br = navigator.userAgent.toLowerCase();
if (Br.indexOf("opera") != -1) {
	Rb_UA = 'opera'
} else if (Br.indexOf("msie") != -1) {
	Rb_UA = 'msie'
} else if (Br.indexOf("safari") != -1) {
	Rb_UA = 'safari'
} else if (Br.indexOf("mozilla") != -1) {
	Rb_UA = 'gecko'
}
function $(a) {
	if (document.getElementById) {
		return document.getElementById(a)
	} else if (document.all) {
		return document.all[a]
	} else if (document.layers) {
		return document.layers[a]
	} else {
		return false
	}
};
function GetStyle(a, b) {
	if (a.currentStyle) {
		var y = a.currentStyle[b];
		y = parseInt(y) ? y: '0px'
	} else if (window.getComputedStyle) {
		var c = document.defaultView.getComputedStyle(a, null);
		var y = c ? c[b] : null
	} else {
		y = a.style[b];
		y = parseInt(y) ? y: '0px'
	}
	return y
};
function GetBounds(a) {
	if (a.getBoundingClientRect) {
		var r = a.getBoundingClientRect();
		var b = 0;
		var c = 0;
		if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
			c = document.body.scrollTop;
			b = document.body.scrollLeft
		} else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
			c = document.documentElement.scrollTop;
			b = document.documentElement.scrollLeft
		}
		return {
			'left': r.left + b,
			'top': r.top + c,
			'right': r.right + b,
			'bottom': r.bottom + c
		}
	}
};
function GetEventBounds(a) {
	var x = 0;
	var y = 0;
	if (Rb_UA == 'msie') {
		y = a.clientY;
		x = a.clientX;
		if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
			y = a.clientY + document.body.scrollTop;
			x = a.clientX + document.body.scrollLeft
		} else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
			y = a.clientY + document.documentElement.scrollTop;
			x = a.clientX + document.documentElement.scrollLeft
		}
	} else {
		y = a.clientY;
		x = a.clientX;
		y += window.pageYOffset;
		x += window.pageXOffset
	}
	return {
		'x': x,
		'y': y
	}
};
function CreateMethodReference(a, b) {
	Args = [];
	for (var i = 2; i < arguments.length; i++) Args.push(arguments[i]);
	return function () {
		a[b].apply(a, Concat(Args, arguments))
	}
};
function Concat() {
	var a = [];
	for (var i = 0; i < arguments.length; i++) for (var j = 0; j < arguments[i].length; j++) a.push(arguments[i][j]);
	return a
};
var Rb_zoom = function (a, b, c, d, e) {
	this.SImgCont = $(a);
	this.SImg = $(b);
	this.ZImgCont = $(c);
	this.ZImg = $(d);
	this.Position = e;
	this.ZImgSizeX = 0;
	this.ZImgSizeY = 0;
	this.ZImgContStyleTop = '0px';
	this.SImgSizeX = 0;
	this.SImgSizeY = 0;
	this.popupSizeX = 20;
	this.popupSizey = 20;
	this.positionX = 0;
	this.positionY = 0;
	this.Pop = 0;
	this.SafariImgLoaded = false;
	this.NeedCalcul = false;
	this.LoadingImg = null;
	ZoomsInstances.push(this);
	this.CheckCoordsRef = CreateMethodReference(this, "CheckCoords");
	this.MouseMoveRef = CreateMethodReference(this, "MouseMove")
};
Rb_zoom.prototype = {
	StartLoading: function () {
		this.LoadingImg = document.createElement('IMG');
		this.LoadingImg.src = loadingImg;
		this.LoadingImg.style.position = 'absolute';
		this.LoadingImg.style["opacity"] = .5;
		this.LoadingImg.style["-moz-opacity"] = .5;
		this.LoadingImg.style["-html-opacity"] = .5;
		this.LoadingImg.style["filter"] = "alpha(Opacity=50)";
		this.LoadingImg.style.left = (parseInt(this.SImg.width) / 2 - parseInt(this.LoadingImg.width) / 2) + 'px';
		this.LoadingImg.style.top = (parseInt(this.SImg.height) / 2 - parseInt(this.LoadingImg.height) / 2) + 'px';
		this.SImgCont.appendChild(this.LoadingImg)
	},
	InitZoom: function () {
		if (!this.LoadingImg && !this.ZImg.complete && this.SImg.width != 0 && this.SImg.height != 0) this.StartLoading();
		if (Rb_UA == 'safari') {
			if (!this.SafariImgLoaded) {
				Rb_addEventListener(this.ZImg, "load", CreateMethodReference(this, "InitZoom"));
				this.SafariImgLoaded = true;
				return
			}
		} else {
			if (!this.ZImg.complete || !this.SImg.complete) {
				setTimeout(CreateMethodReference(this, "InitZoom"), 100);
				return
			}
		}
		this.ZImg.style.borderWidth = '0px';
		this.ZImg.style.padding = '0px';
		this.ZImgSizeX = this.ZImg.width;
		this.ZImgSizeY = this.ZImg.height;
		this.SImgSizeX = this.SImg.width;
		this.SImgSizeY = this.SImg.height;
		if (this.ZImgSizeX == 0 || this.ZImgSizeY == 0 || this.SImgSizeX == 0 || this.SImgSizeY == 0) {
			setTimeout(CreateMethodReference(this, "InitZoom"), 100);
			return
		}
		if (Rb_UA == 'opera' || (Rb_UA == 'msie' && !(document.compatMode && 'backcompat' == document.compatMode.toLowerCase()))) {
			this.SImgSizeX -= parseInt(GetStyle(this.SImg, 'paddingLeft'));
			this.SImgSizeX -= parseInt(GetStyle(this.SImg, 'paddingRight'));
			this.SImgSizeY -= parseInt(GetStyle(this.SImg, 'paddingTop'));
			this.SImgSizeY -= parseInt(GetStyle(this.SImg, 'paddingBottom'))
		}
		if (this.LoadingImg) {
			this.SImgCont.removeChild(this.LoadingImg);
			this.LoadingImg = null
		}
		this.SImgCont.style.width = this.SImg.width + 'px';
		this.ZImgCont.style.top = '-10000px';
		var r = GetBounds(this.SImg);
		if (!r) {
			this.ZImgCont.style.left = this.SImgSizeX + parseInt(GetStyle(this.SImg, 'borderLeftWidth')) + parseInt(GetStyle(this.SImg, 'borderRightWidth')) + parseInt(GetStyle(this.SImg, 'paddingLeft')) + parseInt(GetStyle(this.SImg, 'paddingRight')) + 15 + 'px'
		} else {
			this.ZImgCont.style.left = (r['right'] - r['left'] + 15) + 'px'
		}
		switch (this.Position) {
		case 'left':
			this.ZImgCont.style.left = '-' + (15 + parseInt(this.ZImgCont.style.width)) + 'px';
			break;
		case 'bottom':
			if (r) {
				this.ZImgContStyleTop = r['bottom'] - r['top'] + 15 + 'px'
			} else {
				this.ZImgContStyleTop = this.SImg.height + 15 + 'px'
			}
			this.ZImgCont.style.left = '0px';
			break;
		case 'top':
			this.ZImgContStyleTop = '-' + (15 + parseInt(this.ZImgCont.style.height)) + 'px';
			this.ZImgCont.style.left = '0px';
			break
		}
		if (this.Pop) {
			this.RecPopUpDim();
			return
		}
		this.InitZoomCont();
		this.InitPopUp();
		Rb_addEventListener(window.document, "mousemove", this.CheckCoordsRef);
		Rb_addEventListener(this.SImgCont, "mousemove", this.MouseMoveRef)
	},
	InitZoomCont: function () {
		var a = this.ZImg.src;
		if (this.ZImgSizeY < parseInt(this.ZImgCont.style.height)) this.ZImgCont.style.height = this.ZImgSizeY + 'px';
		if (this.ZImgSizeX < parseInt(this.ZImgCont.style.width)) this.ZImgCont.style.width = this.ZImgSizeX + 'px';
		while (this.ZImgCont.firstChild) this.ZImgCont.removeChild(this.ZImgCont.firstChild);
		if (Rb_UA == 'msie') {
			var c = document.createElement("IFRAME");
			c.style.left = '0px';
			c.style.top = '0px';
			c.style.position = 'absolute';
			c.src = "javascript:''";
			c.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)';
			c.style.width = this.ZImgCont.style.width;
			c.style.height = this.ZImgCont.style.height;
			c.frameBorder = 0;
			this.ZImgCont.appendChild(c)
		}
		var b = document.createElement("DIV");
		b.style.position = 'absolute';
		b.style.left = '7px';
		b.style.top = '115px';
		b.innerHTML = '';
		b.style.widtn = '300px';
		b.style.color = '#FF0000';
		b.style.fontSize = '32px';
		var d = document.createElement("DIV");
		d.style.overflow = "hidden";
		this.ZImgCont.appendChild(d);
		this.ZImgCont.appendChild(b);
		this.ZImg = document.createElement("IMG");
		this.ZImg.src = a;
		this.ZImg.style.position = 'relative';
		this.ZImg.style.borderWidth = '0px';
		this.ZImg.style.padding = '0px';
		this.ZImg.style.left = '0px';
		this.ZImg.style.top = '0px';
		d.appendChild(this.ZImg)
	},
	InitPopUp: function () {
		this.Pop = document.createElement("DIV");
		this.Pop.className = 'RbZoomPop';
		this.Pop.style.zIndex = 10;
		this.Pop.style.visibility = 'hidden';
		this.Pop.style.position = 'absolute';
		this.Pop.style["opacity"] = .5;
		this.Pop.style["-moz-opacity"] = .5;
		this.Pop.style["-html-opacity"] = .5;
		this.Pop.style["filter"] = "alpha(Opacity=50)";
		this.SImgCont.appendChild(this.Pop);
		this.RecPopUpDim();
		this.SImgCont.unselectable = "on";
		this.SImgCont.style.MozUserSelect = "none";
		this.SImgCont.onselectstart = function () {
			return false
		};
		this.SImgCont.oncontextmenu = function () {
			return false
		}
	},
	RecPopUpDim: function () {
		this.popupSizeX = parseInt(this.ZImgCont.style.width) / (this.ZImgSizeX / this.SImgSizeX);
		this.popupSizeY = parseInt(this.ZImgCont.style.height) / (this.ZImgSizeY / this.SImgSizeY);
		if (this.popupSizeX > this.SImgSizeX) this.popupSizeX = this.SImgSizeX;
		if (this.popupSizeY > this.SImgSizeY) this.popupSizeY = this.SImgSizeY;
		this.popupSizeX = Math.round(this.popupSizeX);
		this.popupSizeY = Math.round(this.popupSizeY);
		if (! (document.compatMode && 'backcompat' == document.compatMode.toLowerCase())) {
			var a = parseInt(GetStyle(this.Pop, 'borderLeftWidth'));
			this.Pop.style.width = (this.popupSizeX - 2 * a) + 'px';
			this.Pop.style.height = (this.popupSizeY - 2 * a) + 'px'
		} else {
			this.Pop.style.width = this.popupSizeX + 'px';
			this.Pop.style.height = this.popupSizeY + 'px'
		}
	},
	CheckCoords: function (a) {
		var r = GetEventBounds(a);
		var x = r['x'];
		var y = r['y'];
		var b = 0;
		var c = 0;
		var d = this.SImg;
		while (d && d.tagName != "BODY" && d.tagName != "HTML") {
			b += d.offsetTop;
			c += d.offsetLeft;
			d = d.offsetParent
		}
		if (Rb_UA == 'msie') {
			var r = GetBounds(this.SImg);
			c = r['left'];
			b = r['top']
		}
		c += parseInt(GetStyle(this.SImg, 'borderLeftWidth'));
		b += parseInt(GetStyle(this.SImg, 'borderTopWidth'));
		if (Rb_UA != 'msie' || !(document.compatMode && 'backcompat' == document.compatMode.toLowerCase())) {
			c += parseInt(GetStyle(this.SImg, 'paddingLeft'));
			b += parseInt(GetStyle(this.SImg, 'paddingTop'))
		}
		if (x > parseInt(c + this.SImgSizeX)) {
			this.HideRect();
			return false
		}
		if (x < parseInt(c)) {
			this.HideRect();
			return false
		}
		if (y > parseInt(b + this.SImgSizeY)) {
			this.HideRect();
			return false
		}
		if (y < parseInt(b)) {
			this.HideRect();
			return false
		}
		if (Rb_UA == 'msie') {
			this.SImgCont.style.zIndex = 1
		}
		return true
	},
	HideRect: function () {
		if (this.Pop) this.Pop.style.visibility = "hidden";
		this.ZImgCont.style.top = '-10000px';
		if (Rb_UA == 'msie') {
			this.SImgCont.style.zIndex = 0
		}
	},
	MouseMove: function (a) {
		Rb_stopEventPropagation(a);
		for (i = 0; i < ZoomsInstances.length; i++) if (ZoomsInstances[i] != this) ZoomsInstances[i].CheckCoords(a);
		if (this.NeedCalcul) return;
		if (!this.CheckCoords(a)) return;
		this.NeedCalcul = true;
		var b = this.SImg;
		var c = 0;
		var d = 0;
		if (Rb_UA == 'gecko' || Rb_UA == 'opera' || Rb_UA == 'safari') {
			var e = b;
			while (e.tagName != "BODY" && e.tagName != "HTML") {
				d += e.offsetTop;
				c += e.offsetLeft;
				e = e.offsetParent
			}
		} else {
			var r = GetBounds(this.SImg);
			c = r['left'];
			d = r['top']
		}
		c += parseInt(GetStyle(this.SImg, 'borderLeftWidth'));
		d += parseInt(GetStyle(this.SImg, 'borderTopWidth'));
		if (Rb_UA != 'msie' || !(document.compatMode && 'backcompat' == document.compatMode.toLowerCase())) {
			c += parseInt(GetStyle(this.SImg, 'paddingLeft'));
			d += parseInt(GetStyle(this.SImg, 'paddingTop'))
		}
		var r = GetEventBounds(a);
		var x = r['x'];
		var y = r['y'];
		this.positionX = x - c;
		this.positionY = y - d;
		if ((this.positionX + this.popupSizeX / 2) >= this.SImgSizeX) this.positionX = this.SImgSizeX - this.popupSizeX / 2;
		if ((this.positionY + this.popupSizeY / 2) >= this.SImgSizeY) this.positionY = this.SImgSizeY - this.popupSizeY / 2;
		if ((this.positionX - this.popupSizeX / 2) <= 0) this.positionX = this.popupSizeX / 2;
		if ((this.positionY - this.popupSizeY / 2) <= 0) this.positionY = this.popupSizeY / 2;
		this.ShowRect()
	},
	ShowRect: function () {
		var a = this.positionX - this.popupSizeX / 2;
		var b = this.positionY - this.popupSizeY / 2;
		var c = a * (this.ZImgSizeX / this.SImgSizeX);
		var d = b * (this.ZImgSizeY / this.SImgSizeY);
		if (document.documentElement.dir == 'rtl') c = (this.positionX + this.popupSizeX / 2 - this.SImgSizeX) * (this.ZImgSizeX / this.SImgSizeX);
		a += parseInt(GetStyle(this.SImg, 'borderLeftWidth'));
		b += parseInt(GetStyle(this.SImg, 'borderTopWidth'));
		if (Rb_UA != 'msie' || !(document.compatMode && 'backcompat' == document.compatMode.toLowerCase())) {
			a += parseInt(GetStyle(this.SImg, 'paddingLeft'));
			b += parseInt(GetStyle(this.SImg, 'paddingTop'))
		}
		this.Pop.style.left = a + 'px';
		this.Pop.style.top = b + 'px';
		this.Pop.style.visibility = "visible";
		if ((this.ZImgSizeX - c) < parseInt(this.ZImgCont.style.width)) c = this.ZImgSizeX - parseInt(this.ZImgCont.style.width);
		if (this.ZImgSizeY > (parseInt(this.ZImgCont.style.height))) {
			if ((this.ZImgSizeY - d) < (parseInt(this.ZImgCont.style.height))) {
				d = this.ZImgSizeY - parseInt(this.ZImgCont.style.height)
			}
		}
		this.ZImg.style.left = ( - c) + 'px';
		this.ZImg.style.top = ( - d) + 'px';
		this.ZImgCont.style.top = this.ZImgContStyleTop;
		this.ZImgCont.style.display = 'block';
		this.ZImgCont.style.visibility = 'visible';
		this.ZImg.style.display = 'block';
		this.ZImg.style.visibility = 'visible';
		this.NeedCalcul = false
	},
	Fade: function (a, b, c) {
		var d = (a == "Out") ? 100 : 0;
		var e = (thumbFadeSpeed > 10 || thumbFadeSpeed <= 0) ? 2 : thumbFadeSpeed;
		if (Rb_UA == 'msie') e += 7;
		setTimeout(function () {
			if (a == "Out") d = ((d - e) < 0) ? 0 : (d - e);
			else d = ((d + e) > 100) ? 100 : (d + e);
			with(b.style) {
				opacity = d / 100;
				MozOpacity = d / 100;
				KhtmlOpacity = d / 100;
				filter = 'alpha(opacity=' + d + ')'
			}
			if ((d > 0 && a == "Out") || (d < 100 && a == "In")) setTimeout(arguments.callee, 1);
			else {
				if (c != null) c.call(this)
			}
		},
		1)
	},
	ChangeZoom: function (a, b) {
		if (!this.Pop) return;
		Rb_removeEventListener(window.document, "mousemove", this.CheckCoordsRef);
		Rb_removeEventListener(this.SImgCont, "mousemove", this.MouseMoveRef);
		this.SImgCont.removeChild(this.Pop);
		this.Pop = null;
		var c = document.createElement("IMG");
		c.id = this.ZImg.id;
		c.src = a;
		this.ZImg.parentNode.replaceChild(c, this.ZImg);
		this.ZImg = c;
		this.ZImg.style.position = 'relative';
		var d = document.createElement("IMG");
		with(d.style) {
			opacity = 0;
			MozOpacity = 0;
			KhtmlOpacity = 0;
			filter = 'alpha(opacity=0)'
		}
		d.id = this.SImg.id;
		d.src = b;
		var e = this;
		this.Fade('Out', this.SImg, function () {
			e.SImg.parentNode.replaceChild(d, e.SImg);
			e.Fade('In', d, null);
			e.SImg = d;
			e.SImg.style.position = 'relative';
			e.SafariLoad = false;
			e.NeedCalcul = false;
			e.InitZoom();
			e.SImgCont.href = a
		})
	}
};
function Rb_addEventListener(a, b, c) {
	if (Rb_UA == 'gecko' || Rb_UA == 'opera' || Rb_UA == 'safari') {
		try {
			a.addEventListener(b, c, false)
		} catch(e) {}
	} else if (Rb_UA == 'msie') {
		a.attachEvent("on" + b, c)
	}
};
function Rb_removeEventListener(a, b, c) {
	if (Rb_UA == 'gecko' || Rb_UA == 'opera' || Rb_UA == 'safari') {
		a.removeEventListener(b, c, false)
	} else if (Rb_UA == 'msie') {
		a.detachEvent("on" + b, c)
	}
};
function Rb_stopEventPropagation(a) {
	if (Rb_UA == 'gecko' || Rb_UA == 'opera' || Rb_UA == 'safari') {
		a.cancelBubble = true;
		a.preventDefault();
		a.stopPropagation()
	} else if (Rb_UA == 'msie') {
		window.event.cancelBubble = true
	}
};
function BasName(a) {
	return unescape(a).replace(/^.*[\/\\]/g, '')
};
function InitThumbs(b, c, d) {
	var f = $(c).getElementsByTagName("A");
	for (var i = 0; i < f.length; i++) {
		if (f[i].rel != '' && f[i].href != '') {
			f[i].className = (BasName(f[i].rel) == BasName($(d).src)) ? 'Current': '';
			var g = document.createElement("IMG");
			g.src = f[i].rel;
			g.style.position = 'absolute';
			g.style.left = '-10000px';
			g.style.top = '-10000px';
			document.body.appendChild(g);
			g = document.createElement("IMG");
			g.src = f[i].href;
			g.style.position = 'absolute';
			g.style.left = '-10000px';
			g.style.top = '-10000px';
			document.body.appendChild(g);
			Rb_addEventListener(f[i], "click", function (e) {
				var e = e ? e: window.event;
				var a = e.target != null ? e.target: e.srcElement;
				if (a.nodeName == 'IMG') a = a.parentNode;
				b["ChangeZoom"].call(b, a.href, a.rel);
				for (var j = 0; j < f.length; j++) f[j].removeAttribute("class");
				a.className = 'Current';
				a.style.outline = '0';
				if (Rb_UA == 'msie') this.blur();
				Rb_stopEventPropagation(e);
				return false
			})
		}
	}
};
function FindZooms() {
	var b = window.document.getElementsByTagName("A");
	for (var i = 0; i < b.length; i++) {
		if (b[i].className == "RbZoom") {
			var c = b[i].childNodes[0];
			var j = 1;
			while (c.nodeType != 1) c = b[i].childNodes[j++];
			if (c.nodeName != "IMG") {
				alert('Invalid Zoom Object !');
				continue
			}
			var d = Math.round(Math.random() * 1000000);
			Rb_addEventListener(b[i], "click", function (a) {
				if (Rb_UA == 'msie') this.blur();
				Rb_stopEventPropagation(a);
				return false
			});
			b[i].id = 'RbZoom_' + d;
			b[i].style.position = "relative";
			Re = new RegExp(/position(\s+)?:(\s+)?(\w+)/i);
			Matches = Re.exec(b[i].rel);
			var e = 'right';
			if (Matches) {
				switch (Matches[3]) {
				case 'left':
					e = 'left';
					break;
				case 'bottom':
					e = 'bottom';
					break;
				case 'top':
					e = 'top';
					break
				}
			}
			c.id = "SImg_" + d;
			var f = document.createElement("DIV");
			f.id = "ZCont_" + d;
			f.style.width = zoomAreaWidth;
			f.style.height = zoomAreaHeight;
			f.style.overflow = 'hidden';
			f.className = 'RbZoomImageCont';
			f.style.zIndex = 100;
			f.style.visibility = 'hidden';
			f.style.position = 'absolute';
			f.style.top = '-10000px';
			f.style.left = '-10000px';
			var g = document.createElement("IMG");
			g.id = "ZImg_" + d;
			g.src = b[i].href;
			f.appendChild(g);
			b[i].appendChild(f);
			var h = new Rb_zoom('RbZoom_' + d, "SImg_" + d, "ZCont_" + d, "ZImg_" + d, e);
			h.InitZoom();
			Re = new RegExp(/thumbs(\s+)?:(\s+)?(\w+)/i);
			Matches = Re.exec(b[i].rel);
			if (Matches != null && $(Matches[3])) InitThumbs(h, Matches[3], "SImg_" + d)
		}
	}
};
if (Rb_UA == 'msie') {
	try {
		document.execCommand("BackgroundImageCache", false, true)
	} catch(e) {}
}
Rb_addEventListener(window, "load", FindZooms);