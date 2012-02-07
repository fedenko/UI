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
	
	///// SHOW LOADING IMAGE ON AJAX ACTIVITY ////////////////
	$('.ajax')
	    .hide()  // hide it initially
	    .ajaxStart(function() {
	        $(this).show();
	    })
	    .ajaxStop(function() {
	        $(this).delay(350).fadeOut();
	    });
	
	/* LIST */
	getlist();
	
	$('.settings').click(function(){
		
		$.ajax({
			type : 'GET',
			url : 'functions.php?mode=settings',
			success : function (html) {
				$('#form').html(html);
				$('.acc').accordion();

			}
		});
	
	});
	
	
	$('#addnew').click(function(){
		
		$.ajax({
			type : 'GET',
			url : 'functions.php?mode=add',
			success : function (html) {
				$('#form').html(html);

			}
		});
		
	});
	
	$('.oadd').live('click',function(){
		
		var pid = $(this).attr('ref');
				
		$.ajax({
			type : 'GET',
			url : 'functions.php?mode=oadd&pid='+pid,
			success : function (html) {
				$('#form').html(html);

			}
		});
		
	});
	
	/* submit */
	
	$('#addproduct').live('submit',function(){
		
		var pname = $('#name').val();
		var pprice = $('#price').val();
		
		var formData = 'name=' + pname + '&price='+ pprice; 
		
		$.ajax({
			type : 'POST',
			url : 'functions.php?mode=save',
			data : formData,
			success : function (html) {
				$('#response').html(html);
				getlist();
			}
		});
		
		return false;
	});
	
	
	$('#editproduct').live('submit',function(){
		
		var pname = $('#name').val();
		var pprice = $('#price').val();
		var pid = $('#id').val();
		
		var formData = 'name=' + pname + '&price='+ pprice + '&id=' + pid; 
		
		$.ajax({
			type : 'POST',
			url : 'functions.php?mode=editsave',
			data : formData,
			success : function (html) {
				$('#response').html(html);
				getlist();
			}
		});
		
		return false;
	});
	
	
	$('#addoption').live('submit',function(){
		
		var pid = $('#pid').val();
		var oname = $('#name').val();
		var oprice = $('#price').val();
		
		var formData = 'oname=' + oname + '&oprice='+ oprice + '&pid=' + pid; 
		
		$.ajax({
			type : 'POST',
			url : 'functions.php?mode=osave',
			data : formData,
			success : function (html) {
				$('#response').html(html);
				getlist();
			}
		});
		
		return false;
	});
	
	
	
	$('#editoption').live('submit',function(){
		
		var option = $('#option').val();
		var price = $('#price').val();
		var oid = $('#id').val();
		
		var formData = 'option=' + option + '&price='+ price + '&id=' + oid; 
		
		$.ajax({
			type : 'POST',
			url : 'functions.php?mode=oeditsave',
			data : formData,
			success : function (html) {
				$('#response').html(html);
				getlist();
			}
		});
		
		return false;
	});
	
	
	$('#editsettings').live('submit',function(){
		
		var formData = $(this).serialize(); 
		
		$.ajax({
			type : 'POST',
			url : 'functions.php?mode=savesettings',
			data : formData,
			success : function (html) {
				$('#response').html(html);
			}
		});

		return false;

	});
	
	
	$('.delete').live('click',function() {
		
		var pid = $(this).attr('ref');
		var name = $(this).attr('name');
		
		$c = confirm('Are you sure you want to delete '+name+' ?');
		
		if ($c) {
			
			var formData = 'id=' + pid; 
			
			$.ajax({
				type : 'POST',
				url : 'functions.php?mode=delete',
				data : formData,
				success : function (html) {
					$('#response').html(html);
					getlist();
				}
			});
			
		} // confirmed
	
	});
	
	$('.odelete').live('click',function() {
		
		var pid = $(this).attr('ref');
		
		$c = confirm('Are you sure you want to delete this option?');
		
		if ($c) {
			
			var formData = 'id=' + pid; 
			
			$.ajax({
				type : 'POST',
				url : 'functions.php?mode=odelete',
				data : formData,
				success : function (html) {
					$('#response').html(html);
					getlist();
				}
			});
			
		} // confirmed
	
	});
	
	$('.edit').live('click',function() {
		
		var pid = $(this).attr('ref');
		
		$.ajax({
			type : 'GET',
			url : 'functions.php?mode=edit&id='+pid,
			success : function (html) {
				$('#form').html(html);
			}
		});
	
	});
	

	$('.oedit').live('click',function() {
		
		var oid = $(this).attr('ref');
		
		$.ajax({
			type : 'GET',
			url : 'functions.php?mode=oedit&id='+oid,
			success : function (html) {
				$('#form').html(html);
			}
		});
	
	});
	
	
	
	
	function getlist() {
		$.ajax({
			type : 'GET',
			url : 'functions.php?mode=list',
			success : function (html) {
				$('#items').html(html);
				$("tr:nth-child(odd)").addClass("alt");
			}
		});
	}




});

