if (window.__noconflict) {
    jQuery.noConflict();
}
(function($) {
    $.fn.cssgraph = function(options) {
        options = $.fn.extend({}, $.fn.cssgraph.defaults, options);
        $.fn.cssgraph.container = initializeCssgraph(options);
    };
    
    $.fn.cssgraph.defaults = {
    	type: 'vertical',
        width: 320,
        height: 240,
        animate: true
    };
    
    $.fn.cssgraph.container = null;
    
    function initializeCssgraph(options) {
        var container = $('#'+options.graph);
        
        container.attr('class', 'container');
        container.html('');
        
        switch (options.type) {
        	case 'vertical':
		        vertBarGraph(container, options);
		        break;
        	case 'horizontal':
		        horizBarGraph(container, options);
		        break;
		    default:
		    	vertBarGraph(container, options);
        }
        
        return container;
    };
    
    function vertBarGraph(container, options) {
        options.pattern = (options.pattern != undefined ? options.pattern : 'h_d2l_256.png');
        var data = options.data.split(',');
        if (options.labels != undefined) {
            var labels = options.labels.split(',');
        }
        var colWidth = Math.floor(options.width / data.length);
        options.width = colWidth * data.length;
        container.css({
            'width': options.width,
            'height': options.height,
            'margin-bottom': '25px'
        });
        if (labels != undefined) {
            var label_bar = $('<div></div>').css({
                'width': options.width,
                'height': '11px',
                'float': 'left'
            });
        }
        for (var i = 0; i < data.length; i++) {
            var val = (data[i] >= 0 ? data[i] : 0);
            var col = $('<div></div>').attr(
                'class',
                'col'
            ).css({
                'width': Math.floor(options.width / data.length)+'px'
            });
            var bar_gap = $('<div></div>').attr(
                'class',
                'vbar_gap'
            ).css({
                'height': 100+'%'
            });
            var bar_fill = $('<div></div>').attr(
                'class',
                'vbar_fill'
            ).css({
                'height': 0+'%'
            });
            if (window.XMLHttpRequest) {
                var fill_img = $('<img />').attr(
                    'src',
                    options.pattern
                );
                fill_img.attr(
                    'title',
                    (labels != undefined ? labels[i] + ' (' + val + ')' : val)
                );
            }
            if (options.animate) {
                bar_gap.animate({
                    'height': (100 - val)+'%'
                }, 750);
                bar_fill.animate({
                    'height': val+'%'
                }, 750);
            }
            else {
                bar_gap.css({
                    'height': (100 - val)+'%'
                });
                bar_fill.css({
                    'height': val+'%'
                });
            }
            container.append(col);
            if (options.start != undefined && options.start == 'top') {
                col.append(bar_fill);
                col.append(bar_gap);
            }
            else {
                col.append(bar_gap);
                col.append(bar_fill);
            }
            if (window.XMLHttpRequest) {
                bar_fill.append(fill_img);
            }
            if (labels != undefined) {
                var bar_label = $('<div></div>').attr({
                    'class': 'vbar_label',
                    'title': val
                });
                bar_label.html(labels[i]);
                bar_label.css({
                    'width': Math.floor(options.width / data.length)+'px',
                    'height': '100%'
                });
                label_bar.append(bar_label);
            }
        }
        if (labels != undefined) {
            container.append(label_bar);
        }
    };
    
    function horizBarGraph(container, options) {
        options.pattern = (options.pattern != undefined ? options.pattern : 'v_l2d_256.png');
        var data = options.data.split(',');
        if (options.labels != undefined) {
            var labels = options.labels.split(',');
        }
        var rowHeight = Math.floor(options.height / data.length);
        options.height = rowHeight * data.length;
        container.css({
            'width': options.width,
            'height': options.height
        });
        if (labels != undefined) {
            container.css({
                'margin-left': '30px'
            });
            var label_bar = $('<div></div>').css({
                'width': '30px',
                'height': options.height,
                'float': 'left',
                'margin-left': '-30px'
            });
        }
        for (var i = 0; i < data.length; i++) {
            var val = (data[i] >= 0 ? data[i] : 0);
            var row = $('<div></div>').attr(
                'class',
                'row'
            ).css({
                'height': Math.floor(options.height / data.length)+'px'
            });
            var bar_gap = $('<div></div>').attr(
                'class',
                'hbar_gap'
            ).css({
                'width': 100+'%'
            });
            var bar_fill = $('<div></div>').attr(
                'class',
                'hbar_fill'
            ).css({
                'width': 0+'%'
            });
            if (window.XMLHttpRequest) {
                var fill_img = $('<img />').attr(
                    'src',
                    options.pattern
                );
                fill_img.attr(
                    'title',
                    (labels != undefined ? labels[i] + ' (' + val + ')' : val)
                );
            }
            if (options.animate) {
                bar_gap.animate({
                    'width': (100 - val)+'%'
                }, 750);
                bar_fill.animate({
                    'width': val+'%'
                }, 750);
            }
            else {
                bar_gap.css({
                    'width': (100 - val)+'%'
                });
                bar_fill.css({
                    'width': val+'%'
                });
            }
            container.append(row);
            if (options.start != undefined && options.start == 'right') {
                row.append(bar_gap);
                row.append(bar_fill);
            }
            else {
                row.append(bar_fill);
                row.append(bar_gap);
            }
            if (window.XMLHttpRequest) {
                bar_fill.append(fill_img);
            }
            if (labels != undefined) {
                var bar_label = $('<div></div>').attr({
                    'class': 'hbar_label',
                    'title': val
                });
                bar_label.html(labels[i]);
                bar_label.css({
                    'width': '100%',
                    'height': Math.floor(options.height / data.length)+'px'
                });
                label_bar.append(bar_label);
            }
        }
        if (labels != undefined) {
            container.prepend(label_bar);
        }
    };
})(jQuery);
