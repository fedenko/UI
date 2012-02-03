/*
 * Parses the given element for measurements. Adds a tooltip to that element, showing the measurement converted into other metrics
 * Date Published: 9th November 2009
 * Version: 1.0
 * Author: Maria Cheung <maria@mariacheung.com>
 * 
 * Copyright (c) 2009 by Maria Cheung - http://www.mariacheung.com
 * 
 *
 */

(function($) {

	$.fn.jconvert = function(options) {

		var defaults = {
			listType: 'ul'							// Ordered list 'ol', or unordered list 'ul'
			, shortUnits: true						// True or False, whether to abbreviate the units Eg: 1m or 1 metre
			, spellingMode: 'uk'						// 'uk' or 'us'
			, showUnderline: true					// True or False, whether to show a dashed underline under measurements unit
			, decimalPlaces: 2						// Number of decimal places to round to
			, unitsMode: 'uk'						// 'uk' or 'us'. If your site uses Imperial units use 'uk', otherwise use 'us'
		};

		var settings = $.extend({ }, defaults, options); 

		return this.each(function(index) {
			var $this = $(this);

			// Get rid of any event handlers
			$this.unbind();
			// Get rid of any tooltip given by the browser
			$this.title = '';

			var measurementArr = getMeasurement($this.text());
			
			// If the text held a measurement at all in the form "NUMBER WORD" or "NUMBERWORD"
			if (measurementArr) {
				var conversions = doConversion(measurementArr[1], measurementArr[2]);
				
				// Make sure the WORD in the measurement pattern was actually a metric and not just a random word
				if (conversions) {
					var tooltip = buildTooltip(conversions, $this.text());
					
					// Show either UK or US spellings
					if (settings.spellingMode.toLowerCase() == 'us') {
						tooltip = getUsSpelling(tooltip);
					}

					// Bind the mouseover tooltip to each measurement
					$this = bindEvents($this, tooltip);
					
					// Change the cursor to a question mark
					$this.css('cursor', 'help');
					
					// Give the unit element a dashed underline
					if (settings.showUnderline) {
						$this.css("border-bottom", "1px dashed");
					}
				}
			}

			// Must return the object for chainability
			return $this; 
		});
		
		// Gets the quantity and metric from a string
		function getMeasurement(text) {
			// Measurements will be written as "Quantity Metric" or "QuantityMetric", eg: "1 cup" or "1cup"
			var measurementArr = text.match(/([0-9]*.?[0-9]*)\s*(\w+)/);
			
			if (measurementArr) {
				// So now any measurement should be an array, with 2nd element being the quantity and 3rd being the metric
				return measurementArr;
			} else {
				return false;
			}
		}
		
		// Builds the tooltip HTML from an array of conversions
		function buildTooltip(conversions, text) {
			// Display the user-defined title, or else our default title
			var tooltip = (settings.title ? settings.title : 'Conversions for <b>' + text + '</b>');
			// Start the HTML list
			tooltip = tooltip + '<br /><' + settings.listType + '>';
			
			// Parse the conversions and build the tooltip list
			for(metric in conversions) {
				// Round the new measurement to specified decimal places
				tooltip = tooltip + '<li>' + roundNumber(conversions[metric]) + ' ' + metric + '</li>';
			}
			
			tooltip = tooltip + '</' + settings.listType + '>';

			return tooltip;
		}
		
		function bindEvents(obj, tooltip) {
			// Add the tooltop when we hover over the link
			obj.mouseover( function(e) {
				$('<div id="tooltip" />')
					.appendTo($('body'))
					.hide()
					.html(tooltip)
					.css({top: e.pageY - 35, left: e.pageX + 15})
					.fadeIn(350);
			});
			
			// Remove the tooltop when we hover out
			obj.mouseout( function(e) {
				$('div#tooltip')
					.fadeOut(350)
					.remove();
			});
			return obj;
		}
		
		function getUsSpelling(text) {
			text = text.replace(/litre/gi, 'liter');
			text = text.replace(/metre/gi, 'meter');
			return text;
		}
		
		function roundNumber(quantity) {
			var power = Math.pow(10, settings.decimalPlaces)
			quantity = Math.round(quantity*power)/power;
			return quantity;
		}
		
		// Returns an array of conversions for the given quantity
		function doConversion(quantity, metric) {
			var conversions = new Array();
			
			switch (metric.toLowerCase()) {
				// **************   Weight Conversions   **************
				case 'g':
				case 'gs':
				case 'gram':
				case 'grams':
				case 'gramme':
				case 'grammes':
					short_units = {"oz": 0.0352734, "lb": 0.0022046};
					long_units = {"ounces": 0.0352734, "pounds": 0.0022046};
				break;
				
				case 'kg':
				case 'kgs':
				case 'kilogram':
				case 'kilograms':
				case 'kilogramme':
				case 'kilogrammes':
					short_units = {"lb": 2.20462262, "stone": 0.157473044};
					long_units = {"pounds": 2.20462262, "stone": 0.157473044};
				break;
				
				case 'lb':
				case 'lbs':
				case 'pound':
				case 'pounds':
					// Show grams until 1000, then show kilograms
					var grams = (quantity * 453.5923097);
					if (grams < 1000) {
						short_units = {"oz": 16, "g": 453.5923097, "stone": 0.0714285714};
						long_units = {"ounces": 16, "grams": 453.5923097, "stone": 0.0714285714};
					} else {
						short_units = {"oz": 16, "kg": .4535923097, "stone": 0.0714285714};
						long_units = {"ounces": 16, "kilograms": .4535923097, "stone": 0.0714285714};
					}
				break;
				
				case 'oz':
				case 'ozs':
				case 'ounces':
				case 'ounce':
					// Show grams until 1000, then show kilograms
					var grams = (quantity * 28.349523);
					if (grams < 1000) {
						short_units = {"lb": 0.0625, "g": 28.349523};
						long_units = {"pounds": 0.0625, "grams": 28.349523};
					} else {
						short_units = {"lb": 0.0625, "kg": .028349523};
						long_units = {"pounds": 0.0625, "kilograms": .028349523};
					}
				break;

				case 'stone':
				case 'stones':
					short_units = {"lb": 14, "kg": 6.35029318};
					long_units = {"pounds": 14, "kilograms": 6.35029318};
				break;
				
				// **************   Volume Conversions   **************				
				case 'fl oz':
				case 'fl ozs':
				case 'fluid ounce':
				case 'fluid ounces':
					short_units = {"cups": 0.125, "tbls": 2, "tsps": 6};
					long_units = {"cups": 0.125, "tablespoons": 2, "teaspoons": 6};
				break;
								
				case 'cup':
				case 'cups':
					// Show ml until 1000, then show litres
					var ml = (quantity * 236.588237);
					if (ml < 1000) {
						short_units = {"tsps": 48, "tbls": 16, 'ml': 236.588237};
						long_units = {"teaspoons": 48, "tablespoons": 16, 'millilitres': 236.588237};
					} else {
						short_units = {"tsps": 48, "tbls": 16, "l": .236588237};
						long_units = {"teaspoons": 48, "tablespoons": 16, "litres": .236588237};
					}
				break;
								
				case 'pint':
				case 'pints':
					if (settings.unitsMode == 'us') {
						// US Pints
						
						// Show ml until 1000, then show litres
						var ml = (quantity * 473.176473);
						if (ml < 1000) {
							short_units = {"US qt": 0.5, "Imp. qt": 0.41633692, 'ml': 473.176473};
							long_units = {"US quarts": 0.5, "Imperial quarts": 0.41633692, 'millilitres': 473.176473};
						} else {
							short_units = {"US qt": 0.5, "Imp. qt": 0.41633692, "l": .473176473};
							long_units = {"US quarts": 0.5, "Imperial quarts": 0.41633692, "litres": .473176473};
						}
					} else if (settings.unitsMode == 'uk') {
						// Imperial Pints
						
						// Show ml until 1000, then show litres
						var ml = (quantity * 568.261485);
						if (ml < 1000) {
							short_units = {"US qt": 0.600475211, "Imp. qt": 0.5, 'ml': 568.261485};
							long_units = {"US quarts": 0.600475211, "Imperial quarts": 0.5, 'millilitres': 568.261485};
						} else {
							short_units = {"US qt": 0.600475211, "Imp. qt": 0.5, "l": .568261485};
							long_units = {"US quarts": 0.600475211, "Imperial quarts": 0.5, "litres": .568261485};
						}
					}
				break;
								
				case 'quart':
				case 'quarts':
					if (settings.unitsMode == 'us') {
						// US quarts
						
						// Show ml until 1000, then show litres
						var ml = (quantity * 946.352946);
						if (ml < 1000) {
							short_units = {"US pt": 2, "Imp. pt": 1.66534768, "ml": 946.352946, "US gal": 0.25, "Imp. gal": 0.20816846};
							long_units = {"US pints": 2, "Imperial pints": 1.66534768, "millilitres": 946.352946, "US gallons": 0.25, "Imperial gallon": 0.20816846};
						} else {
							short_units = {"US pt": 2, "Imp. pt": 1.66534768, "l": .946352946, "US gal": 0.25, "Imp. gal": 0.20816846};
							long_units = {"US pints": 2, "Imperial pints": 1.66534768, "litres": .946352946, "US gallons": 0.25, "Imperial gallon": 0.20816846};
						}
					} else if (settings.unitsMode == 'uk') {
						// Imperial quarts
						
						// Show ml until 1000, then show litres
						var ml = (quantity * 1136.52297);
						if (ml < 1000) {
							short_units = {"Imp. pt": 2, 'US pt':  2.40190084, "ml": 1136.52297, "US gal": 0.300237605, "Imp. gal": 0.25};
							long_units = {"Imperial pints": 2, 'US pints':  2.40190084, "millilitres": 1136.52297, "US gallons": 0.300237605, "Imperial gallons": 0.25};
						} else {
							short_units = {"Imp. pt": 2, 'US pt':  2.40190084, "l": 1.13652297, "US gal": 0.300237605, "Imp. gal": 0.25};
							long_units = {"Imperial pints": 2, 'US pints':  2.40190084, "litres": 1.13652297, "US gallons": 0.300237605, "Imperial gallons": 0.25};
						}
					}
				break;
				
				case 'ml':
				case 'mls':
				case 'millilitre':
				case 'millilitres':
				case 'milliliter':
				case 'milliliters':
					short_units = {"tsps": 0.2, "tbls": 0.05, "cups": 0.00422675284};
					long_units = {"teaspoons": 0.2, "tablespoons": 0.05, "cups": 0.00422675284};
				break;
								
				case 'l':
				case 'ls':
				case 'litre':
				case 'litres':
				case 'liter':
				case 'liters':
					short_units = {"US pt": 2.11337642, "Imp. pt": 1.759755696, "US qt": 1.056688261, "Imp. qt": 0.87987663, "gal": 0.264172037};
					long_units = {"US pints": 2.11337642, "Imperial pints": 1.759755696, "US quarts": 1.056688261, "Imperial quarts": 0.87987663, "gallons": 0.264172037};
				break;
								
				case 'gal':
				case 'gallon':
				case 'gallons':
					if (settings.unitsMode == 'us') {
						// US gallons
						short_units = {"US pt": 8, "Imp. pt": 6.661400327, "US qt": 4, "Imp. qt": 3.33069536, "l": 3.785412};
						long_units = {"US pints": 8, "Imperial pints": 6.661400327, "US quarts": 4, "Imperial quarts": 3.33069536, "litres": 3.785412};
					} else if (settings.unitsMode == 'uk') {
						// Imperial gallons
						short_units = {"US pt": 9.60760338, "Imp. pt": 8, "US qt": 4.80380169, "Imp. qt": 4, "l": 4.54609188};
						long_units = {"US pints": 9.60760338, "Imperial pints": 8, "US quarts": 4.80380169, "Imperial quarts": 4, "litres": 4.54609188};
					}
				break;
				
				case 'tsp':
				case 'tsps':
				case 'teaspoon':
				case 'teaspoons':
					short_units = {"tbls": 0.333333333, "cups": 0.020833333};
					long_units = {"tablespoons": 0.333333333, "cups": 0.020833333};
				break;
				
				case 'tbs':
				case 'tbls':
				case 'tablespoon':
				case 'tablespoons':
					short_units = {"tsps": 3, "cups": 0.0625};
					long_units = {"teaspoons": 3, "cups": 0.0625};
				break;


				// **************   Length Conversions   **************
				case 'm':
				case 'metre':
				case 'metres':
				case 'meter':
				case 'meters':
					short_units = {"yd": 1.093613298, "ft": 3.280839895};
					long_units = {"yards": 1.093613298, "feet": 3.280839895};
				break;
				
				case 'yard':
				case 'yards':
					short_units = {"m": 0.9144, "ft": 3};
					long_units = {"metres": 0.9144, "feet": 3};
				break;
				
				case 'foot':
				case 'feet':
				case 'ft':
					short_units = {"m": 0.3048, "yd": 0.333333333};
					long_units = {"metres": 0.3048, "yards": 0.333333333};
				break;
								
				default:
					conversions = false;
				break;
			}
			
			// Show either abbreviated units or long units
			units = long_units;
			if (settings.shortUnits == true) {
				
				units = short_units;
			} 
			
			// Build the conversions array
			var i = 0;
			for (unit in units) {
				conversions[unit] = (quantity * units[unit]);
				i++;
			}
			
			return conversions;
		}
		
	};

})(jQuery); 
