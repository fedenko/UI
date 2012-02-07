$(function() {
	 
	//automatic resize the content to fit the window
	changeWindowSize(0);
	$(window).bind('resize', function() {
		changeWindowSize(0);
	});

	orig_infotext=$("#infotext").html();
	$("#socials a").hover(
	  function () {
		$("#infotext").text($(this).attr("alt"));
	  },
	  function () {
		$("#infotext").html(orig_infotext);
	  }
	);
	
	$("h3").each(function(){
		$(this).disableSelection();
	});

	//automatic numeration titles
	count_nr=1;
	$(".head_nr").each(function(){
		if(count_nr<10) count_nr_insert="0"+count_nr;
		else count_nr_insert=count_nr;
		$(this).text(count_nr_insert);
		count_nr++;
	});
	$(".head_nr:last").html("&nbsp;+");
	$("h3").hover(function() { 
			$(this).find("span").addClass("down_icon_highlight");
		}, function() { 
			$(this).find("span").removeClass("down_icon_highlight");
	});
	
	
});

function changeIcon(icon,elementID){
	liID = elementID + 1 ;
	if(icon=="up"){
		$("#acc li:nth-child("+liID+")").find("span").addClass(icon+"_icon");
	}
	else{
		$("#acc li:nth-child("+liID+")").find("span").removeClass("up_icon");
	}
}

function changeWindowSize(myHeight){
			if(myHeight>=0){
					if($("#accordion").height()+250<$(window).height()){
						//alert("1");
						$("#main_wrapper").css({
						 	height: $(window).height()-329+"px"
						});
					}
					else
					{
						//alert("2");
						$("#main_wrapper").css({
						 	height: $("#accordion").height()-50+"px"
						});
					}
			}
			else{	
				if($("#accordion").height()+120+myHeight<$(window).height()){
					//alert("3");
					$("#main_wrapper").css({
					 	height: $(window).height()-104+"px"
					});
				}
				else
				{
					//alert("4");
					$("#main_wrapper").css({
					 	height: $("#accordion").height()+10+myHeight+"px"
					});
				}
			}
}

function str_replace(search, replace, subject) {
	return subject.split(search).join(replace);
}

jQuery.fn.outerHTML = function(s) {
			return (s)
			? this.before(s).remove()
			: jQuery("<p>").append(this.eq(0).clone()).html();
}

$.fn.disableSelection = function() {
    $(this).attr('unselectable', 'on')
           .css('-moz-user-select', 'none')
           .each(function() { 
               this.onselectstart = function() { return false; };
            });
};