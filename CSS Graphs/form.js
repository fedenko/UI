$(document).ready(function () {
    var container = $('<div></div>').attr({
        'id': 'form-container'
    }).css({
        'float': 'left',
        'margin-right': '25px'
    });
    var form = $('<form></form>').attr({
        'id': 'form-cssgraph',
        'name': 'form-cssgraph'
    }).css({
        'font-family': 'Arial',
        'font-size': '12px'
    });
    
    var input_type = $('<p></p>').append(
        $('<label></label>').attr({
            'for': 'input_type'
        }).html('Type '),
        $('<select></select>').attr({
            'id': 'input_type',
            'name': 'type'
        }).append($('<option></option>').attr({
            'value': 'vertical',
            'text': 'vertical'
        })).append($('<option></option>').attr({
            'value': 'horizontal',
            'text': 'horizontal'
        }))
    );
    
    var input_width = $('<p></p>').append(
        $('<label></label>').attr({
            'for': 'input_width'
        }).html('Width '),
        $('<input />').attr({
            'id': 'input_width',
            'name': 'width',
            'type': 'text',
            'value': '320'
        })
    );
    
    var input_height = $('<p></p>').append(
        $('<label></label>').attr({
            'for': 'input_height'
        }).html('Height '),
        $('<input />').attr({
            'id': 'input_height',
            'name': 'height',
            'type': 'text',
            'value': '240'
        })
    );
    
    var input_pattern = $('<p></p>').append(
        $('<label></label>').attr({
            'for': 'input_pattern'
        }).html('Pattern '),
        $('<select></select>').attr({
            'id': 'input_pattern',
            'name': 'pattern'
        }).append($('<option></option>').attr({
            'value': 'h_d2l_256.png',
            'text': 'Horizontal Gradient - Dark to Light'
        })).append($('<option></option>').attr({
            'value': 'h_l2d_256.png',
            'text': 'Horizontal Gradient - Light to Dark'
        })).append($('<option></option>').attr({
            'value': 'v_d2l_256.png',
            'text': 'Vertical Gradient - Dark to Light'
        })).append($('<option></option>').attr({
            'value': 'v_l2d_256.png',
            'text': 'Vertical Gradient - Light to Dark'
        }))
    );
    
    var input_animate = $('<p></p>').append(
        $('<label></label>').attr({
            'for': 'input_animate'
        }).html('Animate '),
        $('<select></select>').attr({
            'id': 'input_animate',
            'name': 'animate'
        }).append($('<option></option>').attr({
            'value': 'true',
            'text': 'true'
        })).append($('<option></option>').attr({
            'value': 'false',
            'text': 'false'
        }))
    );
    
    var input_start = $('<p></p>').append(
        $('<label></label>').attr({
            'for': 'input_start'
        }).html('Start from '),
        $('<select></select>').attr({
            'id': 'input_start',
            'name': 'start'
        }).append($('<option></option>').attr({
            'value': 'bottom',
            'text': 'bottom'
        })).append($('<option></option>').attr({
            'value': 'top',
            'text': 'top'
        })).append($('<option></option>').attr({
            'value': 'left',
            'text': 'left'
        })).append($('<option></option>').attr({
            'value': 'right',
            'text': 'right'
        }))
    );
    
    var input_labels = $('<p></p>').append(
        $('<p></p>').html('Labels'),
        $('<textarea></textarea>').attr({
            'id': 'input_labels',
            'name': 'labels',
            'cols': '40',
            'rows': '5'
        }).html(CSSGRAPH1_OPTIONS.labels)
    );
    
    var input_data = $('<p></p>').append(
        $('<p></p>').html('Data'),
        $('<textarea></textarea>').attr({
            'id': 'input_data',
            'name': 'data',
            'cols': '40',
            'rows': '5'
        }).html(CSSGRAPH1_OPTIONS.data)
    );
    
    var generate = $('<p></p>').append(
        $('<input />').attr({
            'id': 'generate',
            'name': 'generate',
            'type': 'button',
            'value': 'Generate'
        }).click(function () {
            generateNewGraph();
        })
    );
    
    var output_code = $('<div></div>').append(
        $('<h2></h2>').html('Code'),
        $('<textarea></textarea>').attr({
            'id': 'output_code',
            'name': 'code',
            'cols': '60',
            'rows': '15'
        }).css({
            'float': 'left'
        })
    ).css({
        'float': 'left',
        'font-family': 'Arial',
        'font-size': '12px'
    });
    
    $('#form').prepend(container);
    container.append(
        $('<h2></h2>').html('Settings')
    );
    
    container.append(form);
    form.append(input_type);
    form.append(input_width);
    form.append(input_height);
    form.append(input_pattern);
    form.append(input_animate);
    form.append(input_start);
    form.append(input_labels);
    form.append(input_data);
    form.append(generate);
    $('#code-block').append(output_code);
});

function generateNewGraph() {
    var form = document.getElementById('form-cssgraph');
    CSSGRAPH1_OPTIONS.type = form.elements.input_type.value;
    CSSGRAPH1_OPTIONS.width = form.elements.input_width.value;
    CSSGRAPH1_OPTIONS.height = form.elements.input_height.value;
    CSSGRAPH1_OPTIONS.pattern = form.elements.input_pattern.value;
    CSSGRAPH1_OPTIONS.animate = form.elements.input_animate.value;
    CSSGRAPH1_OPTIONS.start = form.elements.input_start.value;
    CSSGRAPH1_OPTIONS.labels = form.elements.input_labels.value;
    CSSGRAPH1_OPTIONS.data = form.elements.input_data.value;
    var code_str = '';
    code_str += '    &lt;script type="text/javascript"&gt;'+"\n";
    code_str += '        var CSSGRAPH1_OPTIONS = {'+"\n";
    code_str += '            graph: \'myGraph1\','+"\n";
    code_str += '            type: \'###TYPE###\','+"\n";
    code_str += '            width: ###WIDTH###,'+"\n";
    code_str += '            height: ###HEIGHT###,'+"\n";
    code_str += '            pattern: \'###PATTERN###\','+"\n";
    code_str += '            labels: \'###LABELS###\','+"\n";
    code_str += '            data: \'###DATA###\','+"\n";
    code_str += '            animate: ###ANIMATE###,'+"\n";
    code_str += '            start: \'###START###\''+"\n";
    code_str += '        }'+"\n";
    code_str += '        '+"\n";
    code_str += '        jQuery(document).ready(function($) {'+"\n";
    code_str += '            $().cssgraph(CSSGRAPH1_OPTIONS);'+"\n";
    code_str += '        });'+"\n";
    code_str += '    &lt;/script&gt;'+"\n";
    code_str += '';
    code_str = code_str.replace('###TYPE###', form.elements.input_type.value);
    code_str = code_str.replace('###WIDTH###', form.elements.input_width.value);
    code_str = code_str.replace('###HEIGHT###', form.elements.input_height.value);
    code_str = code_str.replace('###PATTERN###', form.elements.input_pattern.value);
    code_str = code_str.replace('###LABELS###', form.elements.input_labels.value);
    code_str = code_str.replace('###DATA###', form.elements.input_data.value);
    code_str = code_str.replace('###ANIMATE###', form.elements.input_animate.value);
    code_str = code_str.replace('###START###', form.elements.input_start.value);
    $('#output_code').html(code_str);
    $().cssgraph(CSSGRAPH1_OPTIONS);
}