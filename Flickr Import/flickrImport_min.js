/*
 * Flickr Import 1.1.1
 *
 * Created by Stephen Hallgren (aka Teevio)
 * http://teevio.com
 *
 * Minified by /packer/
 * http://dean.edwards.name/packer/
 * 
 */
if (!window.themeForest) {
	window.themeForest = {}
}
function FlickrImport(a) {
	flickrImportObj = this;
	this.args = {
		"calls": [],
		"perPage": "10",
		"perRow": "5",
		"baseApiUrl": "http://api.flickr.com/services/rest/",
		"size": "s",
		"target": "_blank",
		"imageLink": "flickr",
		"imageZoom": "disabled"
	};
	this.callKey = 0;
	for (var b in a) {
		if (typeof a[b] !== 'function') {
			this.args[b] = a[b]
		}
	}
	if (!this.args.apiKey) {
		alert('FlickrImport: You did not pass an apiKey.');
		return false
	}
	if (!this.args.secret) {
		alert('FlickrImport: You did not pass a secret.');
		return false
	}
	try {
		method = this.args.calls[this.callKey].method.replace(/\./g, '');
		this[method]()
	} catch(error) {
		alert('FlickrImport: You did not pass a valid Flickr API method.')
	}
}
FlickrImport.prototype.makeNextCall = function () {
	try {
		this.args.calls[this.callKey].callback()
	} catch(err) {}
	this.callKey++;
	if (this.callKey < this.args.calls.length) {
		try {
			method = this.args.calls[this.callKey].method.replace(/\./g, '');
			this[method]()
		} catch(error) {
			alert('FlickrImport: You did not pass a valid Flickr API method.')
		}
	}
};
FlickrImport.prototype.flickrpeoplegetPublicPhotos = function () {
	perPage = this.args.perPage;
	if (this.args.calls[this.callKey].perPage) {
		perPage = this.args.calls[this.callKey].perPage
	}
	if (!this.args.calls[this.callKey].userId && !this.args.calls[this.callKey].username) {
		alert('FlickrImport: You need to pass a valid userId or username');
		return false
	} else if (!this.args.calls[this.callKey].userId && this.args.calls[this.callKey].username) {
		this.flickrpeoplefindByUsername('flickrpeoplegetPublicPhotos')
	} else {
		url = this.args.baseApiUrl + '?api_key=' + this.args.apiKey + '&user_id=' + this.args.calls[this.callKey].userId + '&format=json&jsoncallback=flickrImportObj.flickrpeoplegetPublicPhotos_cb&method=flickr.people.getPublicPhotos&per_page=' + perPage;
		this.addScript(url);
		this.flickrpeoplegetPublicPhotos_cb = function (a) {
			if (a.stat == "ok") {
				photos = a.photos.photo;
				this.buildPhotosHTML(photos, this.args.calls[this.callKey])
			} else {
				alert('FlickrImport: ' + a.message)
			}
		}
	}
};
FlickrImport.prototype.flickrfavoritesgetPublicList = function () {
	perPage = this.args.perPage;
	if (this.args.calls[this.callKey].perPage) {
		perPage = this.args.calls[this.callKey].perPage
	}
	if (!this.args.calls[this.callKey].userId && !this.args.calls[this.callKey].username) {
		alert('FlickrImport: You need to pass a valid userId or username');
		return false
	} else if (!this.args.calls[this.callKey].userId && this.args.calls[this.callKey].username) {
		this.flickrpeoplefindByUsername('flickrfavoritesgetPublicList')
	} else {
		url = this.args.baseApiUrl + '?api_key=' + this.args.apiKey + '&user_id=' + this.args.calls[this.callKey].userId + '&format=json&jsoncallback=flickrImportObj.flickrfavoritesgetPublicList_cb&method=flickr.favorites.getPublicList&per_page=' + perPage;
		this.addScript(url);
		this.flickrfavoritesgetPublicList_cb = function (a) {
			if (a.stat == "ok") {
				photos = a.photos.photo;
				this.buildPhotosHTML(photos, this.args.calls[this.callKey])
			} else {
				alert('FlickrImport: ' + a.message)
			}
		}
	}
};
FlickrImport.prototype.flickrinterestingnessgetList = function () {
	perPage = this.args.perPage;
	if (this.args.calls[this.callKey].perPage) {
		perPage = this.args.calls[this.callKey].perPage
	}
	url = this.args.baseApiUrl + '?api_key=' + this.args.apiKey + '&format=json&jsoncallback=flickrImportObj.flickrinterestingnessgetList_cb&method=flickr.interestingness.getList&per_page=' + perPage;
	this.addScript(url);
	this.flickrinterestingnessgetList_cb = function (a) {
		if (a.stat == "ok") {
			photos = a.photos.photo;
			this.buildPhotosHTML(photos, this.args.calls[this.callKey])
		} else {
			alert('FlickrImport: ' + a.message)
		}
	}
};
FlickrImport.prototype.flickrgroupspoolsgetPhotos = function () {
	if (!this.args.calls[this.callKey].groupId) {
		alert('FlickrImport: You need to pass a valid groupId');
		return false
	}
	perPage = this.args.perPage;
	if (this.args.calls[this.callKey].perPage) {
		perPage = this.args.calls[this.callKey].perPage
	}
	url = this.args.baseApiUrl + '?api_key=' + this.args.apiKey + '&format=json&jsoncallback=flickrImportObj.flickrgroupspoolsgetPhotos_cb&method=flickr.groups.pools.getPhotos&per_page=' + perPage + '&group_id=' + this.args.calls[this.callKey].groupId;
	this.addScript(url);
	this.flickrgroupspoolsgetPhotos_cb = function (a) {
		if (a.stat == "ok") {
			photos = a.photos.photo;
			this.buildPhotosHTML(photos, this.args.calls[this.callKey])
		} else {
			alert('FlickrImport: ' + a.message)
		}
	}
};
FlickrImport.prototype.flickrphotosetsgetList = function () {
	if (!this.args.calls[this.callKey].userId && !this.args.calls[this.callKey].username) {
		alert('FlickrImport: You need to pass a valid userId or username');
		return false
	} else if (!this.args.calls[this.callKey].userId && this.args.calls[this.callKey].username) {
		this.flickrpeoplefindByUsername('flickrphotosetsgetList')
	} else {
		url = this.args.baseApiUrl + '?api_key=' + this.args.apiKey + '&user_id=' + this.args.calls[this.callKey].userId + '&format=json&jsoncallback=flickrImportObj.flickrphotosetsgetList_cb&method=flickr.photosets.getList';
		this.addScript(url);
		this.flickrphotosetsgetList_cb = function (a) {
			if (a.stat == "ok") {
				photosets = a.photosets.photoset;
				this.buildPhotosetsHTML(photosets)
			} else {
				alert('FlickrImport: ' + a.message)
			}
		}
	}
};
FlickrImport.prototype.flickrphotosetsgetPhotos = function () {
	if (!this.args.calls[this.callKey].photosetId) {
		alert('ThemeForestFlick: You did not pass a photoset id');
		return false
	}
	perPage = this.args.perPage;
	if (this.args.calls[this.callKey].perPage) {
		perPage = this.args.calls[this.callKey].perPage
	}
	url = this.args.baseApiUrl + '?api_key=' + this.args.apiKey + '&photoset_id=' + this.args.calls[this.callKey].photosetId + '&format=json&jsoncallback=flickrImportObj.flickrphotosetsgetPhotos_cb&method=flickr.photosets.getPhotos&per_page=' + perPage;
	this.addScript(url);
	this.flickrphotosetsgetPhotos_cb = function (a) {
		if (a.stat == "ok") {
			photos = a.photoset.photo;
			this.args.calls[this.callKey].userId = a.photoset.owner;
			this.buildPhotosHTML(photos, this.args.calls[this.callKey])
		} else {
			alert('FlickrImport:  ' + a.message)
		}
	}
};
FlickrImport.prototype.flickrpeoplefindByUsername = function (b) {
	url = this.args.baseApiUrl + '?api_key=' + this.args.apiKey + '&username=' + this.args.calls[this.callKey].username + '&format=json&jsoncallback=flickrImportObj.flickrpeoplefindByUsername_cb&method=flickr.people.findByUsername';
	this.addScript(url);
	this.flickrpeoplefindByUsername_cb = function (a) {
		if (a.stat == "ok") {
			this.args.calls[this.callKey].userId = a.user.nsid;
			this[b]()
		} else {
			alert('FlickrImport:  ' + a.message)
		}
	}
};
FlickrImport.prototype.buildPhotosHTML = function (a) {
	size = this.args.size;
	target = this.args.target;
	perRow = this.args.perRow;
	imageLink = this.args.imageLink;
	linkClass = '';
	onClickVar = '';
	if (this.args.calls[this.callKey].onClick) {
		onClickVar = 'onclick="' + this.args.calls[this.callKey].onClick + '"'
	}
	if (this.args.calls[this.callKey].className) {
		linkClass = this.args.calls[this.callKey].className
	}
	if (this.args.calls[this.callKey].size) {
		size = this.args.calls[this.callKey].size
	}
	if (this.args.calls[this.callKey].target) {
		target = this.args.calls[this.callKey].target
	}
	if (this.args.calls[this.callKey].perRow) {
		perRow = this.args.calls[this.callKey].perRow
	}
	if (this.args.calls[this.callKey].imageLink) {
		imageLink = this.args.calls[this.callKey].imageLink
	}
	output = '<ul class="' + this.args.calls[this.callKey].method.replace(/\./g, ' ') + ' _' + this.callKey + '">';
	for (var i in a) {
		if (typeof a[i] !== 'function') {
			photo = a[i];
			className = '';
			if (perRow == 1) {
				className = ' class="start end"'
			}
			if (i % perRow == (perRow - 1)) {
				className = ' class="end"'
			} else if (i % perRow === 0) {
				className = ' class="start"'
			}
			if (!this.args.calls[this.callKey].userId && photo.owner) {
				owner = photo.owner
			} else {
				owner = this.args.calls[this.callKey].userId
			}
			link = 'http://www.flickr.com/photos/' + owner + '/' + photo.id;
			if (imageLink == 'preview') {
				link = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
			}
			output += '<li' + className + '><a href="' + link + '" id="photo_id_' + photo.id + '" target="' + target + '" class="' + linkClass + '" ' + onClickVar + ' title="' + photo.title + '"><img src="http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_' + size + '.jpg" alt="' + photo.title + '" /></a></li>'
		}
	}
	output += '<span class="clear"></span></ul>';
	currentHTML = document.getElementById(this.args.calls[this.callKey].id).innerHTML;
	document.getElementById(this.args.calls[this.callKey].id).innerHTML = currentHTML + output;
	this.makeNextCall()
};
FlickrImport.prototype.buildPhotosetsHTML = function (a) {
	target = this.args.target;
	perRow = this.args.perRow;
	size = this.args.size;
	if (this.args.calls[this.callKey].target) {
		target = this.args.calls[this.callKey].target
	}
	if (this.args.calls[this.callKey].perRow) {
		perRow = this.args.calls[this.callKey].perRow
	}
	if (this.args.calls[this.callKey].size) {
		size = this.args.calls[this.callKey].size
	}
	output = '<ul class="' + this.args.calls[this.callKey].method.replace(/\./g, ' ') + ' _' + this.callKey + '">';
	for (var i in a) {
		if (typeof a[i] !== 'function') {
			photoset = a[i];
			className = '';
			if (this.args.calls[this.callKey].perPage) {
				if (i >= this.args.calls[this.callKey].perPage) {
					break
				}
			}
			if (perRow == 1) {
				className = ' class="start end"'
			} else if (i % perRow == (perRow - 1)) {
				className = ' class="end"'
			} else if (i % perRow === 0) {
				className = ' class="start"'
			}
			output += '<li' + className + '><a href="http://www.flickr.com/photos/' + this.args.calls[this.callKey].userId + '/sets/' + photoset.id + '" id="photoset_id_' + photoset.id + '" target="' + target + '"><img src="http://farm' + photo.farm + '.static.flickr.com/' + photoset.server + '/' + photoset.primary + '_' + photoset.secret + '_' + size + '.jpg" /></a><p class="title" id="photoset_' + photoset.id + '_title"><a href="http://www.flickr.com/photos/' + this.args.calls[this.callKey].userId + '/sets/' + photoset.id + '" target="' + target + '">' + photoset.title._content + '</a></p><p class="description" id="photoset_' + photoset.id + '_description">' + photoset.description._content + '</p></li>'
		}
	}
	output += '<span class="clear"></span></ul>';
	currentHTML = document.getElementById(this.args.calls[this.callKey].id).innerHTML;
	document.getElementById(this.args.calls[this.callKey].id).innerHTML = currentHTML + output;
	this.makeNextCall()
};
FlickrImport.prototype.addScript = function (a) {
	var b = document.getElementsByTagName("head")[0];
	var c = document.createElement('script');
	c.type = 'text/javascript';
	c.src = a;
	if (!b) {
		b = document.body.parentNode.appendChild(document.createElement("head"))
	}
	b.appendChild(c)
};