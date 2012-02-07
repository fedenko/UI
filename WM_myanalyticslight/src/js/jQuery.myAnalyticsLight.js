/* 
 * myAnalyticsLight
 * Version: 1.1
 * Made by Festo
 * http://codecanyon.net/user/Festo
 */

(function($) {

	$.fn.myAnalyticsLight = function(options) {

		// deffault options
		var defaults = {
			php : 'myAnalyticsLight/report.php',  // default path to report.php
			tooltip : true,  // enable tooltip or not
			tooltipOpacity: 0.80, // Tooltip Opacity
			dateFormat : 'Y-m-d',  // date format
			data: [{
						metrics : 'ga:pageviews',  //metrics
						label : 'Pageviews',  // label text
						color : "#0000FF" // line color
					}]
		};

		var options = $.extend(defaults, options);

		return this.each(function() {
			obj = $(this);
			obj.html('Loading...'); // expand the container div with "loading..." text
			var dataStore;

			try {
				// try to get the datas
				$.ajax({
					async : false,
					url : options.php,
					type : 'POST',
					data : options,
					dataType : "json",
					//dataType : "html",
					success : function(msg) {
						//alert(msg);
						dataStore = msg;
					},
					error : function(msg) {
						//alert(serialize(msg));
						obj.html(msg);
						//return false;
					},
					statusCode : {
						404 : function() {
							obj.html('PHP file not found!');
						}
					}
				});

				if(dataStore.status != 200) { // if there are some problem with the query
					obj.html(dataStore.message);
				} else {

					var valuesArray = [];
					var dates = [];
					var tooltipDates = [];
					var maxY = 0;

					Array.max = function(array) {
						return Math.max.apply(Math, array);
					};
					
					// Search the max value
					maxY = 0;
					$.each(dataStore.data.values, function(index, item) {
						if(maxY < Array.max(item)) {
							maxY = Array.max(item);
						}
					});
					
					data = new Array();

					$.each(dataStore.data.values, function(index, value) {
						valuesArray = Array();

						$.each(value, function(i, v) {
							valuesArray.push([i, v]);
						});

						data.push({
							data : valuesArray,
							label : options.data[index].label,
							color : options.data[index].color
						});

					});
					
					// set the frequency of ticks
					$.each(dataStore.data.dates, function(index, value) {
						if(index % 5 == 0) {
							dates.push([index, value]);
						}
						tooltipDates.push([index, value]);
					});
					
					// Create chars
					var plot = $.plot(obj, data, {
						series : {
							lines : {
								show : true // show lines
							},
							points : {
								show : true  // show points
							}
						},
						legend : {
							backgroundOpacity : 0.3
						},
						grid : {
							hoverable : true,
							clickable : true
						},
						yaxis : {
							min : 0,
							max : (maxY + (maxY / 2))
						},
						xaxis : {
							ticks : dates
						}
					});

					// Tooltip options
					function showTooltip(x, y, contents) {
						$('<div id="tooltip">' + contents + '</div>').css({
							position : 'absolute',
							display : 'none',
							top : y + 5,
							left : x + 5,
							border : '1px solid #000',
							padding : '2px',
							'font-size' : '100%',
							'background-color' : '#FFF',
							'-moz-border-radius' : '4px',
							'-webkit-border-radius' : '4px',
							'border-radius' : '4px',
							opacity : options.tooltipOpacity
						}).appendTo("body").fadeIn(200);
					};

					if(options.tooltip) {
						
						//if the tooltips enabled set 						
						var previousPoint = null;
						obj.bind("plothover", function(event, pos, item) {
							if(item) {
								if(previousPoint != item.datapoint) {
									previousPoint = item.datapoint;

									$("#tooltip").remove();
									var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
									x = Math.round(x);
									x = eval(x);
									x = tooltipDates[x][1];
									showTooltip(item.pageX, item.pageY, '<small>' + x + '</small><br />' + item.series.label + ": <b>" + Math.round(y) + '</b>');
								}
							} else {
								$("#tooltip").remove();
								previousPoint = null;
							}
						});
					}
				}
			} catch(err) {
				obj.html("Something wrong with the script. <br />" + err.description);
			}

		});
	};
})(jQuery);
