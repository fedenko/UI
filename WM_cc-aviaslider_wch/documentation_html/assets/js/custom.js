jQuery.noConflict();

jQuery(document).ready(function(){
	my_lightbox("a[rel^='prettyPhoto'], a[rel^='lightbox'], .lightbox");
});

function my_lightbox($elements)
{	
	jQuery($elements).prettyPhoto();
}
