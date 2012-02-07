function gmp_plugin() {
	return "[geoloc]";
}

(function() {
	tinymce.create('tinymce.plugins.gmp', {
		init : function(ed, url){
			ed.addButton('gmp', {
			title : 'Insert a Google Map',
				onclick : function() {
					ed.execCommand(
					'mceInsertContent',
					false,
					gmp_plugin()
					);
				},
				image: url + "/../images/mce.png"
			});
		}
	});
	tinymce.PluginManager.add('gmp', tinymce.plugins.gmp);
})();