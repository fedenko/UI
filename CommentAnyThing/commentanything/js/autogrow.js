/*
 * AutoGrow <textarea />
 * Version 0.1
 * A Prototype extension.
 *
 * by Jason Burgess (www.holostek.net)
 *
 * Based on a jQuery plugin by Chrys Bader (www.chrysbader.com)
 * and a mooTools plugin by Gary Glass (www.bookballoon.com)
 *
 * Copyright (c) 2009 Jason Burgess
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * NOTE: This script requires Prototype 1.6.0 or later.
 *
 * USAGE:
 *		new AutoGrow(element);
 * where 'element' is the id of a textarea element. For example:
 *		new AutoGrow('myTextarea');
 */
var AutoGrow = Class.create();
AutoGrow.prototype = {
	dummy : null,
	textarea : null,
	executer : null,
	options : {
		/* minimum height of textarea */
		minHeight : 29,
		/* update interval in seconds */
		interval : 0.3,
		/*
		 * gap (in px) to maintain between last line of text and bottom of
		 * textarea. Using our line-height should work well.
		 */
		margin : 16
	},
	object : null,

	initialize : function(textarea, options) {
		var style, styles = [ 'font-size', 'font-family', 'width',
				'line-height', 'padding' ], newStyle = {
			'overflow-x' : 'hidden',
			'position' : 'absolute',
			'top' : 0,
			'left' : '-9999px'
		}, x, l;

		this.textarea = $(textarea);
		this.options.minHeight = Math.max(this.options.minHeight, this.textarea.clientHeight);

		Object.extend(this.options, options || {});

		// Don't want to show scrollbars.
		this.textarea.setStyle({overflow: 'hidden'});

		this.dummy = new Element('div');
		for (x = 0, l = styles.length; x < l; ++x) {
			style = styles[x];
			newStyle[style] = this.textarea.getStyle(style);
		}
		this.dummy.setStyle(newStyle);

		document.body.insert(this.dummy);
		this.executer = new PeriodicalExecuter(this.resize,
				this.options.interval);
		this.executer.object = this;
		this.object = this;
	},

	resize : function(force) {
		var ag = this.object, text, newHeight, triggerHeight;

		text = ag.textarea.getValue().replace(/\n|\r\n/g, '<br>X');
		if (force === true || ag.dummy.innerHTML.toLowerCase() != text.toLowerCase()) {
			ag.dummy.update(text);
			triggerHeight = ag.dummy.getHeight() + ag.options.margin;
			if (ag.textarea.clientHeight != triggerHeight) {
				newHeight = Math.max(ag.options.minHeight, triggerHeight);
				ag.textarea.setStyle( {
					'height' : newHeight
				});
			}
		}
	}

};