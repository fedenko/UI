/*!
 * Bloooming Shop Plugin v1.0
 * http://www.bloooming.com/
 *
 * Copyright 2010, Tina Coric
 * All rights reserved
 *
 * Date: Thu May 20 22:22:22 2010 -0500
 */
$(document).ready(function(){
	
	$('.wooo').bloooming_shop();
	
	$('body').append('<div id="panel"><div id="panelcontent"></div><div class="panelbutton" id="hidepanel" style="display: none;"><a>hide cart</a></div></div><div id="showpanel" class="panelbutton" style="display: visible;"><a>shopping cart</a></div><div id="btntarget"></div>');
	$('#panelcontent').hide();
	
	$.ajax({
		type: "GET",
		url: "/wooo/cart.php",
		async: false,
		dataType: "html",
		success: function(html){
			$('#panelcontent').html(html);
		}
	});

	
	
	$(".panelbutton").click(function(){
		$("#panel").animate({
			height: "200px"
		}, "fast",function(){
			$('#panelcontent').show();
		});
		$("#hidepanel").fadeIn();
		$("#showpanel").fadeOut();
	
	});	
	
   $("#hidepanel").click(function(){
		$("#panel").animate({
			height: "0px"
		}, "fast", function(){ 
			$("#showpanel").fadeIn();
			$('#panelcontent').hide();
		});
		
		$("#hidepanel").fadeOut();
   });	
	
   

   
   	$('.shopme p').click(function(){
   		
   		var pid = $(this).attr('rel');

        $('body').prepend('<div class="shadow" id="'+$(this).attr('rel')+'_shadow"></div>');
        
        var shadow = $('#'+pid+'_shadow');

	     shadow.width($(this).parent().css('width')).height($(this).parent().css('height')).css('top', $(this).parent().offset().top).css('left', $(this).parent().offset().left).css('opacity', 0.5).show();
    	 shadow.css('position', 'absolute');
		 
		 shadow.animate( {
		  		width: $('#btntarget').innerWidth(), 
		  		height: $('#btntarget').innerHeight(), 
		  		top: $('#btntarget').offset().top, 
		  		left: $('#btntarget').offset().left 
		  		}, { 
		  		duration: 300 
		  		} )
		    .animate({ 
		    	opacity: 0 
		    },
		    { 
		    duration: 100,
		    complete: function(){
		    	
		   	shadow.remove();
		    	
		}
		    
		});
		
		var option = $('#'+pid+' .woooptions').val();
   	
   		var formData = 'pid=' + pid + '&option=' + option; 
		
		$.ajax({
			type : 'POST',
			url : '/wooo/cart.php',
			data : formData,
			success : function (html) {
				$('#panelcontent').html(html);
			}
		});

   	
	}); 


	$('.removeitem').live('click', function() {		
		rid = $(this).attr('id');
		rop = $(this).attr('rel');

		var remData = 'remove=' + rid + '&rop=' + rop; 
		
		$.ajax({
			type : 'POST',
			url : '/wooo/cart.php',
			data : remData,
			success : function (html) {
				$('#panelcontent').html(html);
			//	alert('thx');
			}
		});
		
	});


}); // document

/** replace ******/

jQuery.fn.bloooming_shop = function(){
	
		this.each(function(){
		
			var elem = $(this);

			var cl = 'bt1';
			var id = $(this).html();
			var opt = $(this).attr('options');
			var text = $(this).attr('text');
			var price = $(this).attr('price');
		//	alert(price);
			
			if (text == undefined) {
				text = 'add to cart';
			}
			
			if (opt == 'true' && price != 'true' ) {
				cl = 'bt3';
			}
			
			if (price == 'true' && opt == 'true') {
				cl = 'bt4';
			}

			if (price == 'true' && opt != 'true') {
				cl = 'bt2';
			}
			
			elem.removeClass('wooo');
			elem.addClass('shopme');
			elem.addClass(cl);
			elem.attr('id','pid'+id);
			elem.html('<p rel="pid'+id+'" class="'+cl+'">'+ text +'</p>');
						
			// get product data
			if (price == 'true' || opt == 'true') {
			
				$.ajax({
					type : 'GET',
					url : '/wooo/functions.php?mode=p_data&id='+id+'&opt='+opt+'&price='+price,
					success : function (html) {
						
						elem.append(html);
						
						if (jQuery().sSelect) {
						 	elem.children('.woooptions').sSelect();
						 } 
										
						// change price
						$('.woooptions').change(function(){
							var selid = $(this).attr('id');
							var rel = $('#'+selid+' option:selected').attr('rel');

							if (rel != undefined) {
								$(this).parent().children('.woooprice').html(rel);
							}
						});

					}
				});
			}
		
		});
	
	return false;

};

/** replace ******/


