/*
*
* EasyAjax_Form Script
* 
* Copyright 2009 John Stevens.  
* Get this script at Themeforest.net
*
* Requires jQuery 1.3+
*
* version 5.2 
* 	( Modified to simulate Ajax. Themeforest.net
* 	does not allow server side scripts in the 
* 	JavaScript Section )
*	
*/

EasyAjax_Form = function () {
	var f = {};
	f = {
		errorMsgs: {
			required: 'This is a required field.',
			email: 'Please enter a valid email address.',
			phone: 'Example: 111-222-3333.',
			lengthInput: '50 or fewer characters for this field.',
			lengthText: '5000 or fewer characters for this field.',
			ajaxTimeout: 'An error occurred when saving your request, please try again.' + 'If this problem persists, please try again later.'
		},
		fades: {
			validation: 200,
			ajax: 500
		},
		ajaxTimers: {
			pause: 2000,
			timeout: 10000
		},
		valClasses: {
			requiredField: 'REQUIRED',
			emailField: 'EMAIL',
			phoneField: 'PHONE',
			charLengthInput: 'LENGTH_INPUT',
			charLengthText: 'LENGTH_TEXT',
			optionalField: 'OPTIONAL'
		},
		formClasses: {
			validateOnly: 'VALIDATE',
			ajaxOnly: 'AJAX',
			disable: 'DISABLE',
			choose: 'CHOOSE'
		},
		cssSelectors: {
			validationPass: 'PASS',
			validationFail: 'FAIL',
			ajaxLoading: '#FORM_LOAD',
			ajaxTimeout: "AJAX_TIMEOUT",
			ajaxResponse: "AJAX_RESPONSE"
		},
		regExps: {
			email: /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/,
			phone: /^\(?(\d{3})\)?[\.\-\/ ]?(\d{3})[\.\-\/ ]?(\d{4})$/
		},
		charLimit: {
			input: 50,
			textArea: 5000
		}
	};
	function appendSpan(b) {
		$.each(b, function (i, a) {
			$('<span></span>').insertAfter(this)
		})
	}
	function hasClassArray_maker(b, c) {
		var d = [],
		Classes = f.valClasses,
		j = 0;
		if (c) {
			Classes = f.formClasses
		}
		$.each(Classes, function (k, a) {
			if ($(b).hasClass(a)) {
				d[j] = a;
				j = j + 1
			}
		});
		return d
	}
	function fieldProperty_maker(b) {
		var c = f.valClasses,
		fieldProperties = {};
		$.each(c, function (l, a) {
			fieldProperties[l] = false
		});
		return fieldProperties
	}
	function calcFieldProperties(b, c) {
		$.each(c, function (m, a) {
			switch (a) {
			case f.valClasses.emailField:
				b.emailField = true;
				break;
			case f.valClasses.requiredField:
				b.requiredField = true;
				break;
			case f.valClasses.phoneField:
				b.phoneField = true;
				break;
			case f.valClasses.charLengthInput:
				b.charLengthInput = true;
				break;
			case f.valClasses.charLengthText:
				b.charLengthText = true;
				break;
			default:
				break
			}
		});
		return b
	}
	function boolObjDecoder(c, d) {
		var x = 0;
		$.each(c, function (p, a) {
			var b;
			if (a === d) {
				x = 1;
				b = false
			}
		});
		if (x === 1) {
			return false
		}
		return true
	}
	function ajaxError(a, b) {
		$(f.cssSelectors.ajaxLoading).fadeOut(f.fades.ajax / 4, function () {
			$(this).remove()
		});
		$('<div id="Response">' + '<p class=' + f.cssSelectors.ajaxTimeout + '>' + f.errorMsgs.ajaxTimeout + '</p>' + '</div>').hide().appendTo(a).fadeIn(f.fades.ajax);
		$('<div id="Refresh">' + '<p><a href ="#">Click here</a> to re-enter form information.</p>' + '</div>').hide().appendTo(a).fadeIn(f.fades.ajax);
		$('#Refresh').click(function () {
			$('#Response, #Refresh, #Ajax_Disclaimer').fadeOut(f.fades.ajax / 2, function () {
				$('#Response, #Refresh, #Ajax_Disclaimer').remove();
				$(b).fadeIn(f.fades.ajax / 2)
			})
		});
		return true
	}
	function ajaxSuccess(a, b, c) {
		$(f.cssSelectors.ajaxLoading).fadeOut(f.fades.ajax / 4, function () {
			$(this).remove()
		});
		$('<div id="Response">' + '<p class=' + f.cssSelectors.ajaxResponse + '>' + a + '</p>' + '</div>').hide().appendTo(b).fadeIn(f.fades.ajax);
		$('<div id="Refresh">' + '<p><a href ="#">Click Here</a> to re-enter form information.</p>' + '</div>').hide().appendTo(b).fadeIn(f.fades.ajax);
		$('#Refresh').click(function () {
			$('#Response, #Refresh, #Ajax_Disclaimer').fadeOut(f.fades.ajax / 2, function () {
				$('#Response, #Refresh, #Ajax_Disclaimer').remove();
				$(c).fadeIn(f.fades.ajax / 2)
			})
		});
		return true
	}
	function requiredValidator(a, b) {
		var c = f.errorMsgs.required,
		hasReqErr = false;
		if (b === '') {
			$(a).next().removeClass(f.cssSelectors.validationPass);
			$(a).next().hide().addClass(f.cssSelectors.validationFail).text(c).fadeIn(f.fades.validation);
			hasReqErr = true
		}
		return hasReqErr
	}
	function emailValidator(a, b) {
		var c = f.errorMsgs.email,
		hasEmailErr = false,
		reEmail = f.regExps.email;
		if (!reEmail.test(b)) {
			$(a).next().removeClass(f.cssSelectors.validationPass);
			$(a).next().hide().addClass(f.cssSelectors.validationFail).text(c).fadeIn(f.fades.validation);
			hasEmailErr = true
		}
		return hasEmailErr
	}
	function phoneValidator(a, b) {
		var c = f.errorMsgs.phone,
		hasPhoneErr = false,
		rePhone = f.regExps.phone;
		if (!rePhone.test(b)) {
			$(a).next().removeClass(f.cssSelectors.validationPass);
			$(a).next().hide().addClass(f.cssSelectors.validationFail).text(c).fadeIn(f.fades.validation);
			hasPhoneErr = true
		}
		return hasPhoneErr
	}
	function inputLengthValidator(a, b) {
		var c = f.errorMsgs.lengthInput,
		hasInputLengthErr = false;
		if (b.length > f.charLimit.input) {
			$(a).next().removeClass(f.cssSelectors.validationPass);
			$(a).next().hide().addClass(f.cssSelectors.validationFail).text(c).fadeIn(f.fades.validation);
			hasInputLengthErr = true
		}
		return hasInputLengthErr
	}
	function textLengthValidator(a, b) {
		var c = f.errorMsgs.lengthText,
		hasTextLengthErr = false;
		if (b.length > f.charLimit.textArea) {
			$(a).next().removeClass(f.cssSelectors.validationPass);
			$(a).next().hide().addClass(f.cssSelectors.validationFail).text(c).fadeIn(f.fades.validation);
			hasTextLengthErr = true
		}
		return hasTextLengthErr
	}
	function fieldValidator(a, b, c) {
		var d = {};
		d = {
			requiredError: false,
			emailError: false,
			phoneError: false,
			inputLengthError: false,
			textLengthError: false
		};
		if (a.requiredField) {
			d.requiredError = requiredValidator(c, b);
			if (d.requiredError) {
				return d
			}
		}
		if (a.emailField) {
			d.emailError = emailValidator(c, b);
			if (d.emailError) {
				return d
			}
		}
		if (a.phoneField) {
			d.phoneError = phoneValidator(c, b);
			if (d.phoneError) {
				return d
			}
		}
		if (a.charLengthInput) {
			d.inputLengthError = inputLengthValidator(c, b);
			if (d.inputLengthError) {
				return d
			}
		}
		if (a.charLengthText) {
			d.textLengthError = textLengthValidator(c, b);
			if (d.textLengthError) {
				return d
			}
		}
		return d
	}
	function greenChecker(a) {
		$(a).next().removeClass('FAIL');
		if ($(a).next().hasClass("PASS")) {
			return
		}
		$(a).next().hide().addClass("PASS").text('').fadeIn(f.fades.validation)
	}
	function validate_onBlur(b, c) {
		$(c).blur(function () {
			var a = {},
			currentField = this,
			input = $(currentField).val(),
			blankOptInput = false,
			hasClassArray = [],
			fieldProperties = {},
			validationTracker = {},
			validationResults = true;
			a = f.valClasses;
			hasClassArray = hasClassArray_maker(currentField);
			fieldProperties = fieldProperty_maker(currentField);
			if (input === '' && $(currentField).hasClass(f.valClasses.optionalField)) {
				blankOptInput = true
			}
			if (hasClassArray.length !== 0) {
				fieldProperties = calcFieldProperties(fieldProperties, hasClassArray);
				if (!blankOptInput) {
					validationTracker = fieldValidator(fieldProperties, input, currentField)
				}
				validationResults = boolObjDecoder(validationTracker, true)
			}
			if (validationResults) {
				greenChecker(currentField)
			}
		})
	}
	function validate_onSubmit(d, e) {
		$("" + d + "").submit(function () {
			var c = {},
			allGood = [],
			formValid = false;
			c = f.valClasses;
			$.each(e, function (r, a) {
				var b = $(a).val(),
				blankOptInput = false,
				hasClassArray = [],
				fieldProperties = {},
				validationTracker = {},
				validationResults = true;
				allGood[r] = false;
				hasClassArray = hasClassArray_maker(a);
				fieldProperties = fieldProperty_maker(a);
				if (b === '' && $(a).hasClass(f.valClasses.optionalField)) {
					blankOptInput = true
				}
				if (hasClassArray.length !== 0) {
					fieldProperties = calcFieldProperties(fieldProperties, hasClassArray);
					if (!blankOptInput) {
						validationTracker = fieldValidator(fieldProperties, b, a)
					}
					validationResults = boolObjDecoder(validationTracker, true)
				}
				if (validationResults) {
					allGood[r] = true;
					greenChecker(a)
				}
			});
			formValid = boolObjDecoder(allGood, false);
			if (formValid) {
				return true
			}
			return false
		})
	}
	function ajaxOnly(d, e) {
		$("" + d + "").submit(function () {
			var c = this,
			toFile = this.action,
			daddy = $(this).parent(),
			dataString = $(this).serialize();
			$(c).fadeOut(f.fades.ajax, function () {
				$("<div id='FORM_LOAD'/>").hide().appendTo(daddy).show()
			});
			$.ajax({
				type: "post",
				url: toFile,
				data: dataString,
				timeout: f.ajaxTimers.timeout,
				error: function (a, b) {
					setTimeout(function () {
						ajaxError(daddy, c)
					},
					f.fades.ajax + 10)
				},
				success: function (a) {
					setTimeout(function () {
						ajaxSuccess(a, daddy, c)
					},
					f.fades.ajax + f.ajaxTimers.pause)
				}
			});
			return false
		})
	}
	function validatePlusAjax_onSubmit(d, e) {
		$("" + d + "").submit(function () {
			var c = {},
			allGood = [],
			formValid = false,
			thisForm = this,
			daddy = $(this).parent(),
			serverResponse = 'This is a simulated* response from the server!</p><p class="AJAX_RESPONSE">Thank you for your interest in EasyAjax_Form.</p><p class="AJAX_RESPONSE">Get it today!<br/>',
			disclaimerContent = '<p style="font-size: 14px;">* Security measures on ThemeForest.net do not allow server side scripts in the JavaScript section. As such, Ajax is simulated for this preview.</p>';
			c = f.valClasses;
			$.each(e, function (r, a) {
				var b = $(a).val(),
				blankOptInput = false,
				hasClassArray = [],
				fieldProperties = {},
				validationTracker = {},
				validationResults = true;
				allGood[r] = false;
				hasClassArray = hasClassArray_maker(a);
				fieldProperties = fieldProperty_maker(a);
				if (b === '' && $(a).hasClass(f.valClasses.optionalField)) {
					blankOptInput = true
				}
				if (hasClassArray.length !== 0) {
					fieldProperties = calcFieldProperties(fieldProperties, hasClassArray);
					if (!blankOptInput) {
						validationTracker = fieldValidator(fieldProperties, b, a)
					}
					validationResults = boolObjDecoder(validationTracker, true)
				}
				if (validationResults) {
					allGood[r] = true;
					greenChecker(a)
				}
			});
			formValid = boolObjDecoder(allGood, false);
			if (formValid) {
				$(thisForm).fadeOut(f.fades.ajax, function () {
					$("<div id='FORM_LOAD'/>").hide().appendTo(daddy).show()
				});
				setTimeout(function () {
					ajaxSuccess(serverResponse, daddy, thisForm);
					$('<div id="Ajax_Disclaimer"/>').hide().append(disclaimerContent).appendTo(daddy).fadeIn(f.fades.ajax)
				},
				f.fades.ajax + f.ajaxTimers.pause)
			}
			return false
		})
	}
	function chooseID(a) {
		var b;
		if (a) {
			a = '#' + a
		} else {
			a = "form"
		}
		b = $('' + a + ' :input:not(:submit):not(:button)');
		if ($(a).hasClass(f.formClasses.validateOnly)) {
			validate_onBlur(a, b);
			validate_onSubmit(a, b);
			return
		} else if ($(a).hasClass(f.formClasses.ajaxOnly)) {
			ajaxOnly(a, b);
			return
		} else {
			validate_onBlur(a, b);
			validatePlusAjax_onSubmit(a, b);
			return
		}
	}
	function init() {
		var a = "form",
		allFields = $('' + a + ' :input:not(:submit):not(:button)');
		appendSpan(allFields);
		if ($(a).hasClass(f.formClasses.disable)) {
			return
		} else if ($(a).hasClass(f.formClasses.choose)) {
			return
		} else if ($(a).hasClass(f.formClasses.validateOnly)) {
			validate_onBlur(a, allFields);
			validate_onSubmit(a, allFields);
			return
		} else if ($(a).hasClass(f.formClasses.ajaxOnly)) {
			ajaxOnly(a, allFields);
			return
		} else {
			validate_onBlur(a, allFields);
			validatePlusAjax_onSubmit(a, allFields);
			return
		}
	}
	return {
		CustomMessages: f.errorMsgs,
		CustomFades: f.fades,
		CustomTimers: f.ajaxTimers,
		CustomCharLimits: f.charLimit,
		Go: init,
		ByID: chooseID
	}
} ();
$(function () {
	EasyAjax_Form.Go()
});