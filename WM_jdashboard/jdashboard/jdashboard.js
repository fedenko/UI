/*!
 * jDashboard.js - jQuery Plugin v1.0.0
 * http://www.codecanyon.net/user/sarthemaker
 *
 * Copyright 2010, Sarathi Hansen
 *
 * Includes Cookie plugin
 * http://plugins.jquery.com/project/Cookie
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses
 *
 * Date: October 29, 2010
 */

(function($) {
	
	// jQuery Cookie plugin
	$.cookie = function(name, value, options) {
		if (typeof value != 'undefined') {
			options = options || {};
			if (value === null) {
				value = '';
				options.expires = -1;
			}
			var expires = '';
			if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
				var date;
				if (typeof options.expires == 'number') {
					date = new Date();
					date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
				} else {
					date = options.expires;
				}
				expires = '; expires=' + date.toUTCString();
			}
			var path = options.path ? '; path=' + (options.path) : '';
			var domain = options.domain ? '; domain=' + (options.domain) : '';
			var secure = options.secure ? '; secure' : '';
			document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
		} else {
			var cookieValue = null;
			if(document.cookie && document.cookie != '') {
				var cookies = document.cookie.split(';');
				for (var i = 0; i < cookies.length; i++) {
					var cookie = $.trim(cookies[i]);
					if (cookie.substring(0, name.length + 1) == (name + '=')) {
						cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
						break;
					}
				}
			}
			return cookieValue;
		}
	};
	
	// detect whether cookies are enabled or not
	$.cookie("jdash-detect-cookies", "is_working");
	var cookiesOn = $.cookie("jdash-detect-cookies") == "is_working";
	
	// define the jQuery Plugin
	$.fn.jDashboard = function(opts) {
		
		// the default options
		var defaults = {
			columns: 2,
			columnWidth: null,
			dragOpacity: 0.65,
			showSector: true
		}
		
		// extend the default options with the user-defined options
		opts = $.extend(defaults, opts);
		
		// loop through each element in the jQuery object
		return this.each(function() {
			
			// create the dashboard's sector
			// this is the placeholder to show where the item will be dropped
			var sector = document.createElement("div");
			// give the sector a class
			$(sector).addClass("jdash-sector");
			// if the option is set, then hide the sector
			if(!opts.showSector) $(sector).css({ visibility: "hidden" });
			
			// store the current dashboard in a variable
			var $db = $(this);
			
			// store the sector in the dashboard element
			this.sector = sector;
			// give the dashboard a class and append the sector to it
			$db.addClass("jdash").append(sector);
			
			// store all of the dashboard's items in a jQuery object
			var items = $db.children("div.jdash-item");
			
			// create a new table to build the dashboard's columns
			var dbTable = document.createElement("table");
			var dbTbody = document.createElement("tbody");
			var dbTrow  = document.createElement("tr");
			
			// create an array to store the columns in
			var cols = [];
			// create each column for the dashboard
			for(var c = 0; c < opts.columns; c++) {
				// create a new td element
				var column = document.createElement("td");
				// give the column a class
				$(column).addClass("jdash-column");
				// set the width of the column according to the options
				$(column).css({ width: opts.columnWidth == null? Math.floor(100/opts.columns) + "%" : opts.columnWidth });
				// add the column to the dashboard's table's row
				$(dbTrow).append(column);
				// push the column onto the cols array
				cols.push(column);
			}
			
			// remove the cell padding/spacing from the dashboard's table
			$(dbTable).attr({ cellPadding: 0, cellSpacing: 0 });
			// make the tables width 100% if no columnWidth is defined
			if(opts.columnWidth == null) $(dbTable).css({ width: "100%" });
			
			// append the body and row to the table
			dbTable.appendChild(dbTbody);
			dbTbody.appendChild(dbTrow);
			// append the table to the dashboard
			this.appendChild(dbTable);
			
			// create the default cookies if they haven't been defined yet.
			if(cookiesOn) {
				var cook;
				
				if(!$.cookie("jdash-collapse-" + $db.attr("id")) || $.cookie("jdash-collapse-" + $db.attr("id")).split("-").length != items.length) {
					cook = "";
					for(var i = 0; i < items.length; i++) cook += (i > 0? "-0" : "0");
					$.cookie("jdash-collapse-" + $db.attr("id"), cook, { expires: 365 })
				}
				
				if(!$.cookie("jdash-index-" + $db.attr("id")) || $.cookie("jdash-index-" + $db.attr("id")).split("|").length != items.length) {
					cook = "";
					var col = 0;
					for(var i = 0; i < items.length; i++) {
						cook += (i > 0? "|" : "") + col + "," + i;
						col++;
						if(col >= cols.length) col = 0;
					}
					$.cookie("jdash-index-" + $db.attr("id"), cook, { expires: 365 });
				}
				
				// retrieve the cookies for the collapsing and layout
				var collapse = $.cookie("jdash-collapse-" + $db.attr("id")).split("-");
				var itemIndex = $.cookie("jdash-index-" + $db.attr("id")).split("|");
			}
			
			// loop through each dashboard item...
			items.each(function(index) {
				
				var $this = $(this);
				
				// store the item's collapse state
				this.jdashCollapse = false;
				// store the items index
				this.jdashId = index;
				// store the dragOpacity in the item
				this.dragOpacity = opts.dragOpacity;
				
				// store the items dragging offsets
				this.offset = {
					click: {
						left: 0,
						top: 0
					},
					left: 0,
					top: 0
				}
				
				// retrieve the header for the item
				var head = $this.children("h1.jdash-head:first-child");
				
				// create the item's toolbar if one is in the html
				var toolbar;
				if(head.children("div.jdash-toolbar").length) toolbar = head.children("div.jdash-toolbar")[0];
				head.children("div.jdash-toolbar").remove();
				
				// retrieve the title from the header
				var title = head.html();
				// clear the header's html
				head.html("");
				
				// create a new table for the header
				var table = document.createElement("table");
				var tbody = document.createElement("tbody");
				var trow  = document.createElement("tr");
				var tcol1 = document.createElement("td");
				var tcol2 = document.createElement("td");
				
				// remove the table's cell padding/spacing and make the width 100%
				$(table).attr({ cellPadding: 0, cellSpacing: 0 }).css({ width: "100%" });
				
				// append the body and row to the table
				table.appendChild(tbody);
				tbody.appendChild(trow);
				
				// if the item has a toolbar, then create an
				// extra row and column to put it in
				if(toolbar) {
					var trow2 = document.createElement("tr");
					var tcol3 = document.createElement("td");
					tbody.appendChild(trow2);
					trow2.appendChild(tcol3);
					$(tcol3).attr("colspan", "2");
					tcol3.appendChild(toolbar);
				}
				
				// set the vertical alignment of the columns to middle
				// and the width of the collapse button to 31
				$(tcol1).css({ verticalAlign: "middle" });
				$(tcol2).css({ width: 31, verticalAlign: "middle" });
				
				// append the columns to the table row
				trow.appendChild(tcol1);
				trow.appendChild(tcol2);
				// append the entire table to the header
				head.append(table);
				
				// create the header title
				var headTitle = document.createElement("div");
				tcol1.appendChild(headTitle);
				$(headTitle).html(title).addClass("jdash-head-title");
				
				// create the item's collapse button
				var headCollapse = document.createElement("div");
				// when the button is clicked, run the collapse function
				$(headCollapse).addClass("jdash-head-collapse").click(collapseClicked);
				tcol2.appendChild(headCollapse);
				
				// setup the dragging events
				$(headTitle).mousedown($.proxy(initDrag, this));
				$(document).mousemove($.proxy(doDrag, this)).mouseup($.proxy(deinitDrag, this));
				
				// if this item's collapse cookie is set, then collapse the item
				if(cookiesOn && collapse[index] == "1") {
					$this.children("div.jdash-body").css({ display: "none" });
					$this.addClass("collapse");
					this.jdashCollapse = true;
				}
				
			});
			
			// add the items to each column according to the order set in the index cookie
			if(cookiesOn) {
				var itemRow = [];
				for(var u = 0; u < itemIndex.length; u++) itemRow.push(itemIndex[u].split(",")[1]);
				for(var i = 0; i < items.length; i++)
					$(cols[Math.min(itemIndex[i].split(",")[0], cols.length-1)]).append(items[itemIndex[i].split(",")[1]]);
			} else {
				var col = 0;
				for(var i = 0; i < items.length; i++) {
					$(cols[col]).append(items[i]);
					col++;
					if(col >= opts.columns) col = 0;
				}
			}
			
		});
	};
	
	// runs when the item's title is pressed
	function initDrag(e) {
		var $this = $(this);
		if(!this.isDragging && !this.dragInit) {
			this.offset.left = $this.offset().left;
			this.offset.top  = $this.offset().top;
			this.offset.click.left = e.pageX - $this.offset().left;
			this.offset.click.top  = e.pageY - $this.offset().top;
			this.dragInit = true;
			$this.css({ position: "relative" });
		}
		e.preventDefault();
	};
	
	// runs when the mouse is moved
	function doDrag(e) {
		var $this = $(this);
		if(this.dragInit && !this.isDragging)
		{
			this.isDragging = true;
			this.dragInit = false;
			$.proxy(onDragStart, this)(e);
			$this.css({ opacity: this.dragOpacity });
			this.offset.left = $this.offset().left;
			this.offset.top  = $this.offset().top;
		}
		
		if(this.isDragging)
		{
			$this.css({
				left: e.pageX - this.offset.left - this.offset.click.left,
				top: e.pageY - this.offset.top - this.offset.click.top
			});
			$.proxy(onDragStep, this)(e);
		}
		e.preventDefault();
	};
	
	// runs when the mouse is released
	function deinitDrag(e) {
		if(this.isDragging || this.dragInit) {
			if(this.isDragging) $.proxy(onDragStop, this)(e);
			this.isDragging = false;
			this.dragInit = false;
			$(this).css({ opacity: 1 });
		}
		e.preventDefault();
	};
	
	// runs when a dashboard item has started dragging
	function onDragStart(e) {
		var $this = $(this);
		$this.addClass("dragging");
		var sector = $this.parents("div.jdash")[0].sector;
		$(sector).insertAfter(this);
		$this.css({ marginBottom: -this.offsetHeight - ($this.is(":last-child")? 0 : parseFloat($this.css("marginTop"))) });
		$(sector).css({
			display: "block",
			height: this.offsetHeight + (parseFloat($this.css("paddingTop")) - parseFloat($(sector).css("paddingTop"))) + (parseFloat($this.css("paddingBottom")) - parseFloat($(sector).css("paddingBottom"))) - parseFloat($(sector).css("borderTopWidth")) - parseFloat($(sector).css("borderBottomWidth")) - parseFloat($this.css("paddingTop")) - parseFloat($this.css("paddingBottom"))
		});
	};
	
	// runs each time the mouse moves while a dashboard item is being dragged
	function onDragStep(e) {
		var $this = $(this);
		var sector = $this.parents("div.jdash")[0].sector;
		var _this = this;
		$this.parents("tr").children("td.jdash-column").each(function() {
			var $col = $(this);
			if(
				($col.children().length == 0 || ($col.children().length == 1 && $col.children()[0] == _this)) &&
				$this.offset().left + _this.offsetWidth/2 - 10 > $col.offset().left &&
				$this.offset().left + _this.offsetWidth/2 + 10 < $col.offset().left + this.offsetWidth
			) {
				$($col.parents("div.jdash")[0].sector).appendTo(this);
				$.proxy(updateShift, _this)(e);
			}
		});
		$this.parents("div.jdash").find("div.jdash-item").each(function() {
			var $item = $(this);
			if(this != _this) {
				if(
					$this.offset().left + _this.offsetWidth/2 - 10 > $item.offset().left &&
					$this.offset().left + _this.offsetWidth/2 + 10 < $item.offset().left + this.offsetWidth &&
					((
						$this.offset().top > $item.offset().top &&
						$this.offset().top + 10 < $item.offset().top + this.offsetHeight/2) ||
					(
						($item.is(":first-child") || ($this.is(":first-child") && $item.prev()[0] == _this)) && $this.offset().top + 10 < $item.offset().top + this.offsetHeight/2
					)) &&
					$item.prev()[0] != sector)
				{
					$($item.parents("div.jdash")[0].sector).insertBefore(this);
					$.proxy(updateShift, _this)(e);
					
				} else if(
					$this.offset().left + _this.offsetWidth/2 - 10 > $item.offset().left &&
					$this.offset().left + _this.offsetWidth/2 + 10 < $item.offset().left + this.offsetWidth &&
					((
						$this.offset().top + _this.offsetHeight - 10 > $item.offset().top + this.offsetHeight/2 &&
						$this.offset().top + _this.offsetHeight + 10 < $item.offset().top + this.offsetHeight) ||
					(
						($item.is(":last-child") || ($this.is(":last-child") && $item.next()[0] == _this)) && $this.offset().top + _this.offsetHeight - 10 > $item.offset().top + this.offsetHeight/2
					)) &&
					$item.next().next()[0] != sector)
				{
					$($item.parents("div.jdash")[0].sector).insertAfter(this);
					$.proxy(updateShift, _this)(e);
				}
			}
		});
		
		$this.css({ marginBottom: -this.offsetHeight - ($this.is(":last-child")? 0 : parseFloat($this.css("marginTop"))) });
	};
	
	// runs when a dashboard item has stopped dragging
	function onDragStop() {
		var $this = $(this);
		$this.css({ marginBottom: -this.offsetHeight - parseFloat($this.css("marginTop")) });
		var sector = $this.parents("div.jdash")[0].sector;
		$this.css({ top: $this.offset().top - $(sector).offset().top, left: $this.offset().left - $(sector).parent("td.jdash-column").offset().left - parseFloat($this.css("marginLeft")) });
		$this.insertBefore(sector);
		$this.animate({ left: 0, top: 0 }, "fast", "", function() {
			$this.removeClass("dragging");
			$(sector).css({ display: "none" });
			$this.css({ marginBottom: parseFloat($this.css("marginTop")) });
		});
		
		if(cookiesOn) {
			var cook = "";
			var col = 0;
			var items = $this.parents("div.jdash").find("div.jdash-item").toArray();
			var cols  = $this.parents("div.jdash").find("td.jdash-column").length;
			for(var i = 0; i < items.length; i++) {
				cook += (i > 0? "|" : "") + $(items[i]).parents("td.jdash-column").index() + "," + items[i].jdashId;
				col++;
				if(col >= cols) col = 0;
			}
			$.cookie("jdash-index-" + $this.parents("div.jdash").attr("id"), cook, { expires: 365 });
		}
	};
	
	// updates the position of the dashboard item when it's siblings are moved around
	function updateShift(e) {
		var $this = $(this);
		this.offset.left = $this.offset().left - parseFloat($this.css("left"));
		this.offset.top = $this.offset().top - parseFloat($this.css("top"));
		$this.css({
			left: e.pageX - this.offset.left - this.offset.click.left,
			top: e.pageY - this.offset.top - this.offset.click.top
		});
	};
	
	// collapses the item when it's title is clicked
	function collapseClicked() {
		var $this = $(this);
		var b = $this.parents("div.jdash-item").children("div.jdash-body");
		
		if(cookiesOn) {
			$this.parents("div.jdash-item")[0].jdashCollapse = b.css("display") != "none";
			var items = $this.parents("div.jdash").find("div.jdash-item");
			var col = "";
			for(var i = 0; i < items.length; i++) {
				for(var j = 0; j < items.length; j++) {
					if(items[j].jdashId == i) {
						col += (col == ""? (items[j].jdashCollapse? "1" : "0") : "-" + (items[j].jdashCollapse? "1" : "0"));
						break;
					}
				}
			}
			$.cookie("jdash-collapse-" + $this.parents("div.jdash").attr("id"), col, { expires: 365 });
		}
		
		b.slideToggle("fast", function() {
			if(b.css("display") == "none") b.parents("div.jdash-item").addClass("collapse");
		});
		if(b.css("display") == "block") b.parents("div.jdash-item").removeClass("collapse");
	};
	
})(jQuery);