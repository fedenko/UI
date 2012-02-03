var DeviantMenu = new Class({
	Implements: [Options, Events],
	container: null,
	current: null,
	options: {
		width: 150,
		duration: 500,
		transition: 'sine:in:out',
		leftText: 'Return',
		leftPosition: 'top',
		group: null,
		main: null,
		autoreset: true,
		reset: true,
		button: null,
		onClick: $empty,
		onOpen: $empty,
		onOpened: $empty,
		onClose: $empty,
		onClosed: $empty,
		onReset: $empty
	},
	initialize: function (container, options) {
		this.container = $(container);
		if (! ($defined(options) && $defined(options.width))) this.options.width = $pick(this.container.getProperty('width'), this.container.offsetWidth);
		this.options.main = $pick(this.options.main, this.container.getElement('ul'));
		this.setOptions(options);
		if (this.options.button) {
			this.options.button = $(this.options.button);
			this.container.fade('hide');
			this.options.button.addEvent('click', function () {
				this.container.fade()
			}.bind(this))
		}
		if (!window.deviantgroups) window.deviantgroups = $H();
		if (this.options.group) {
			if (!window.deviantgroups.has(this.options.group)) window.deviantgroups.set(this.options.group, []);
			window.deviantgroups.get(this.options.group).include(this)
		}
		this.container.setStyles({
			'width': this.options.width,
			'overflow': 'hidden'
		});
		window.deviantid = $pick(window.deviantid, 0);
		var d = new Element('div').setStyle('width', 5000).inject(this.container);
		this.container.getElement('ul').inject(d);
		this.container.getElement('ul').set('id', 'deviant_' + window.deviantid++);
		this.flatten(this.container.getElement('ul'));
		this.current = this.options.main;
		this.current.setStyles({
			'display': 'block',
			'height': this.current.retrieve('offsetHeight')
		});
		if (this.options.autoreset) window.addEvent('click', function (e) {
			if (this.options.button != null) {
				if (! (this.container.hasChild(e.target) || this.container == e.target || this.options.button.hasChild(e.target) || this.options.button == e.target)) {
					this.reset();
					this.container.fade('out')
				}
			} else {
				if (! (this.container.hasChild(e.target) || this.container == e.target)) {
					this.reset()
				}
			}
		}.bind(this))
	},
	flatten: function (ul) {
		ul.getChildren('li').each(function (li, index) {
			var item = li.getElement('ul');
			var anchor = li.getElement('a');
			anchor.addEvent('click', function () {
				this.fireEvent('click', anchor)
			}.bind(this));
			if (item) {
				item.set('id', ul.get('id') + '_' + index);
				item.inject(ul, 'after');
				var left = new Element('li', {
					'class': 'left'
				}).inject(item, this.options.leftPosition);
				new Element('a', {
					'href': '#' + ul.get('id'),
					'html': (this.options.leftText == 'parent' ? li.getElement('a').get('text') : this.options.leftText)
				}).addEvent('click', (function (e) {
					e.stop();
					this.open(ul, 'before')
				}).bind(this)).inject(left);
				li.getElement('a').addEvent('click', (function (e) {
					e.stop();
					if (this.options.group) {
						window.deviantgroups.get(this.options.group).each(function (e) {
							if (e != this) {
								e.reset()
							}
						}.bind(this))
					}
					this.open(item, 'after')
				}).bind(this));
				li.set('class', 'right');
				this.flatten(item)
			}
		},
		this);
		ul.store('offsetHeight', ul.offsetHeight);
		ul.setStyles({
			'float': 'left',
			'overflow': 'hidden',
			'display': 'none',
			'width': this.options.width
		})
	},
	open: function (item, where) {
		if (this.current == item) return;
		var ul = this.current;
		this.current = item;
		if (where == 'after' && this.$events && this.$events.open)(function (f) {
			f(ul, item)
		}).run(this.$events.open);
		if (where == 'before' && this.$events && this.$events.close)(function (f) {
			f(ul, item)
		}).run(this.$events.close);
		ul.set('morph', {
			'link': 'chain',
			'transition': this.options.transition,
			'duration': this.options.duration
		});
		item.set('morph', {
			'link': 'chain',
			'transition': this.options.transition,
			'duration': this.options.duration
		});
		item.inject(ul, where);
		if (where == 'after') {
			item.style.display = 'block';
			item.setStyles({
				'display': 'block',
				'width': this.options.width,
				'height': ul.retrieve('offsetHeight')
			}).morph({
				'height': item.retrieve('offsetHeight')
			});
			ul.morph({
				'width': 0,
				'height': item.retrieve('offsetHeight')
			}).morph({
				'display': 'none'
			})
		}
		if (where == 'before') {
			item.setStyles({
				'display': 'block',
				'width': 0,
				'height': ul.retrieve('offsetHeight')
			}).morph({
				'height': item.retrieve('offsetHeight'),
				'width': this.options.width
			});
			ul.morph({
				'height': item.retrieve('offsetHeight')
			}).morph({
				'display': 'none'
			})
		}
		if (where == 'after') this.fireEvent('opened', [ul, item], this.options.duration);
		if (where == 'before') this.fireEvent('closed', [ul, item], this.options.duration)
	},
	reset: function () {
		if (this.current == this.options.main || !this.options.reset) return;
		this.fireEvent('reset');
		this.open(this.options.main, 'before')
	}
});
var JSONDeviantMenu = new Class({
	Extends: DeviantMenu,
	initialize: function (t, d, o) {
		var data = $H(d);
		t.addClass('deviant');
		t.adopt(this.make(d));
		this.parent(t, o)
	},
	make: function (hash) {
		hash = $H(hash);
		var ul = new Element('ul');
		hash.each((function (value, key) {
			var li = new Element('li').inject(ul);
			if ($type(value) == 'object') {
				li.adopt(new Element('a', {
					'href': '#',
					'text': key
				}));
				li.adopt(this.make.pass(value, this)())
			} else {
				li.adopt(new Element('a', {
					'href': value,
					'text': key
				}))
			}
		}).bind(this));
		return ul
	}
});

Element.implement({
	DeviantMenu: function (options) {
		if (this.hasClass('deviant')) {
			return new DeviantMenu(this, options)
		} else {
			var menus = [];
			this.getElements('.deviant').each(function (e) {
				menus.include(new DeviantMenu(e, options))
			});
			return menus
		}
	},
	JSONDeviantMenu: function (data, options) {
		return new JSONDeviantMenu(this, data, options)
	}
});
