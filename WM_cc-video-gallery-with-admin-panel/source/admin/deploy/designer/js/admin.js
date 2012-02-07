	jQuery(document).ready(function(){
		//console.log('ceva');
		//console.log($('#colorpickerHolder'));
		var lastindex = 3;
		$('.colorpickerHolder2').ColorPicker({
			flat: true,
			color: '#00ff00',
			onSubmit: function(hsb, hex, rgb, el) {
				$(el).parent().find('.colorSelector2 div').css('backgroundColor', '#' + hex);
				$(el).parent().parent().find('.textinput').val('#' + hex);
				$(el).parent().parent().find('.textinput').change();
				$(el).stop().animate({height: 0}, 500);
			}
		});
		
		$('.colorpickerHolder2>div').css('position', 'absolute');
		var widt = false;
		$('.colorSelector2').bind('click', function() {
			var $this = jQuery(this);
			//console.log($this);
			$this.parent().css('z-index', lastindex++);
			$(this).parent().children('.colorpickerHolder2').stop().animate({height: widt ? 0 : 173}, 500);
			widt = !widt;
		});
		$('.textinput').change(function(){
			var $this = $(this);
			if($this.attr('name') == 'thumbs_width'){
				jQuery('.preview-thumb-bg').css('width', $this.val());
			}
			if($this.attr('name') == 'thumbs_height'){
				jQuery('.preview-thumb-bg').css('height', $this.val());
			}
			if($this.attr('name') == 'thumbs_space'){
				jQuery('.preview-thumb-bg').css('margin-bottom', $this.val() + "px");
			}
			if($this.attr('name') == 'thumbs_bg'){
				jQuery('.preview-thumb-bg').css('background-color', $this.val());
			}
			if($this.attr('name') == 'thumbs_pic_w'){
				jQuery('.preview-thumb-pic').css('width', $this.val());
			}
			if($this.attr('name') == 'thumbs_pic_h'){
				jQuery('.preview-thumb-pic').css('height', $this.val());
			}
			if($this.attr('name') == 'pp_x'){
				var val = parseFloat($this.val());
				if(val<0){
				jQuery('.pp').css('left', 'auto');
				jQuery('.pp').css('right', (-val + 16));
				}else{
				jQuery('.pp').css('left', (val + 16));
				jQuery('.pp').css('right', 'auto');
				}
			}
			if($this.attr('name') == 'pp_y'){
				var val = parseFloat($this.val());
				if(val<0){
				jQuery('.pp').css('top', 'auto');
				jQuery('.pp').css('bottom', (-val + 8));
				}else{
				jQuery('.pp').css('top', (val + 8));
				jQuery('.pp').css('bottom', 'auto');
				}
			}
			if($this.attr('name') == 'pp_bg'){
				var val = ($this.val());
				jQuery('.pp').css('border-color', 'transparent ' + val);
			}
			if($this.attr('name') == 'scr_x'){
				var val = parseFloat($this.val());
				var offset = 22;
				var iden = '.scr_bg, .scrl_bg, .scrp_bg';
				if(val<0){
				jQuery(iden).css('left', 'auto');
				jQuery(iden).css('right', (-val + offset));
				}else{
				jQuery(iden).css('left', (val + offset));
				jQuery(iden).css('right', 'auto');
				}
			}
			if($this.attr('name') == 'scr_y'){
				var val = parseFloat($this.val());
				var offset = 11;
				var iden = '.scr_bg, .scrl_bg, .scrp_bg';
				if(val<0){
				jQuery(iden).css('top', 'auto');
				jQuery(iden).css('bottom', (-val + offset));
				}else{
				jQuery(iden).css('top', (val + offset));
				jQuery(iden).css('bottom', 'auto');
				}
			}
			if($this.attr('name') == 'scr_w'){
				var val = parseFloat($this.val());
				var offset = 0;
				var iden = '.scr_bg';
				if(val<0){
				jQuery(iden).css('width', (500 + val));
				}else{
				jQuery(iden).css('width', (val));
				}
			}
			if($this.attr('name') == 'scr_h'){
				var val = parseFloat($this.val());
				var offset = 0;
				var iden = '.scr_bg';
				if(val<0){
				jQuery(iden).css('height', (500 + val));
				}else{
				jQuery(iden).css('height', (val));
				}
			}
			if($this.attr('name') == 'scr_bg'){
				var val = ($this.val());
				jQuery('.scr_bg').css('background-color', val);
			}
			if($this.attr('name') == 'scrl_bg'){
				var val = ($this.val());
				jQuery('.scrl_bg').css('background-color', val);
			}
			if($this.attr('name') == 'scrp_bg'){
				var val = ($this.val());
				jQuery('.scrp_bg').css('background-color', val);
			}
			if($this.attr('name') == 'vol_x'){
				var val = parseFloat($this.val());
				var offset = 11;
				var iden = '.vol';
				if(val<0){
				jQuery(iden).css('left', 'auto');
				jQuery(iden).css('right', (-val + offset));
				}else{
				jQuery(iden).css('left', (val + offset));
				jQuery(iden).css('right', 'auto');
				}
			}
			if($this.attr('name') == 'vol_y'){
				var val = parseFloat($this.val());
				var offset = 11;
				var iden = '.vol';
				if(val<0){
				jQuery(iden).css('top', 'auto');
				jQuery(iden).css('bottom', (-val + offset));
				}else{
				jQuery(iden).css('top', (val + offset));
				jQuery(iden).css('bottom', 'auto');
				}
			}
			
			if($this.attr('name') == 'vol_bg'){
				var val = ($this.val());
				jQuery('.vol').css('background-color', val);
			}
			if($this.attr('name') == 'full_x'){
				var val = parseFloat($this.val());
				var offset = 11;
				var iden = '.full';
				if(val<0){
				jQuery(iden).css('left', 'auto');
				jQuery(iden).css('right', (-val + offset));
				}else{
				jQuery(iden).css('left', (val + offset));
				jQuery(iden).css('right', 'auto');
				}
			}
			if($this.attr('name') == 'full_y'){
				var val = parseFloat($this.val());
				var offset = 11;
				var iden = '.full';
				if(val<0){
				jQuery(iden).css('top', 'auto');
				jQuery(iden).css('bottom', (-val + offset));
				}else{
				jQuery(iden).css('top', (val + offset));
				jQuery(iden).css('bottom', 'auto');
				}
			}
			
			if($this.attr('name') == 'full_bg'){
				var val = ($this.val());
				jQuery('.full').css('background-color', val);
			}
			if($this.attr('name') == 'settings_bg'){
				var val = ($this.val());
				jQuery('.player_bg').css('background-color', val);
			}
			if($this.attr('name') == 'settings_controls_bg'){
				var val = ($this.val());
				jQuery('.controls_bg').css('background-color', val);
			}
			if($this.attr('name') == 'settings_controls_bg_h'){
				jQuery('.controls_bg').css('height', $this.val());
			}
			
		})
			
		$('.toggle-title').bind('click', function(){
			var $t = $(this);
			if($t.hasClass('opened')){
				($t.parent().find('.toggle-content').slideUp('fast'));
				$t.removeClass('opened');
			}else{
				($t.parent().find('.toggle-content').slideDown('fast'));
				$t.addClass('opened');
			}
		})
			
		$('.save-button').bind('click', function(){
			//console.log(jQuery(this).parent().children('.preloader'));
			jQuery(this).parent().children('.preloader').animate({'opacity': 1}, {queue:false, duration:1});
			var aux = ($('.textinput').serialize())
			
			$.post("index.php", { thedata: aux },
   function(data) {
			jQuery('.preloader').animate({'opacity': 0}, {queue:false, duration:1});
			if(console)
    	 	console.log("Data Loaded: " + data);
   			});
			
			return false;
		})
			
		$('.preview-button').bind('click', function(){
			//console.log(jQuery(this).parent().children('.preloader'));
			jQuery(this).parent().children('.preloader').animate({'opacity': 1}, {queue:false, duration:1});
			var aux = ($('.textinput').serialize())
			var randomnumber=Math.floor(Math.random()*1000);
			aux += '&rand=' + randomnumber;
			$.post("index.php", { previewdata: aux },
   function(data) {
			jQuery('.preloader').animate({'opacity': 0}, {queue:false, duration:1});
			if(console)
    	 	console.log("Data Loaded: " + data);
   			});
			
			window.open('preview.php?designrand=' + randomnumber + '&swfloc=' + window.swfloc,'mywindow','width=700,height=330');
			
			
			return false;
		})
		
		jQuery('.textinput').change();
			
		$('#example1').bind('click', function(){
			for(i=0;i<jQuery('.textinput').length;i++){
				var $cache = jQuery('.textinput').eq(i);
				var nm = $cache.attr('name');
				if($cache.attr('name')=='thumbs_bg' || nm=='settings_controls_bg')
				$cache.val('#f5f5f5');
				if($cache.attr('name')=='thumbs_text_title_c' || nm == 'pp_bg' || nm == 'scrp_bg' || nm == 'vol_bg' || nm == 'full_bg')
				$cache.val('#99f099');
				if(nm == 'scr_bg')
				$cache.val('#e6e6e6');
				if(nm == 'scl_bg')
				$cache.val('#858585');
				$cache.change();
				
			}
		})
	})