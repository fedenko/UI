function tinyplugin() {
	
	// Retrun plugin value to tinyMCE
    return "[googlocker-plugin]";
	
}

// Start Tiny MCE plugin
(function() {

    tinymce.create('tinymce.plugins.googlockerplugin', {

		// When initiated:
        init : function(ed, url){
			
			// Create dialog command
			ed.addCommand('editShortcode', function() {
				ed.windowManager.open({
				  file : url + '/mce_dialog.php',
				  width : 450,
				  height : 400,
				  inline : 1
				}, {
				  plugin_url : url
				});
			});

			
			// Add the like locker button to the toolbar
            ed.addButton('googlockerplugin', {
				
                title : 'Wrap content in Google Locker container.',
				
				cmd : 'editShortcode',		
						
                image: url + "/lock.png"
				
            }); // end addbutton
			
        },

		// Set MCE plugin info
        getInfo : function() {
			
            return {
				
                longname : 'Google Content Locker',
                author : 'Tyler Colwell',
                authorurl : 'http://tyler.tc',
                infourl : 'http://tyler.tc',
                version : "1.0"
				
            };
			
        } // end set info
		
    }); // End main plugin init

	// Finally add functionality to toolbar
    tinymce.PluginManager.add('googlockerplugin', tinymce.plugins.googlockerplugin);
    
})(); // end plugin