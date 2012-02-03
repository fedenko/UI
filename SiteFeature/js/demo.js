/*
	jQuery - siteFeature Plugin
	@copyright Michael Kafka - http://www.makfak.com
	@version 1.0
	*** Demo *** 
*/
$(document).ready(function() {

	var HTMLbackup = $('#DemoContainer').html();
	$('#DemoContainer').data('bkup',HTMLbackup);
	
	$('#DemoOptions li a').click(function(){
		window.scrollTo(0,0);
		clearInterval(SiteFeatureAutoPlayInterval);
		$('#DemoContainer').empty().html($('#DemoContainer').data('bkup'));
		var nextFunct = $(this).next().text();
		
		if(this.hash == '#horz'){
			$('#preFeature div:even').addClass('horizontal');
		}
		
		$('#DemoContainer h3.title').text($(this).text());
		
		eval(nextFunct);
		return false;
	}).filter(':first').click();
	
});


