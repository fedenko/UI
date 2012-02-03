//
// iStackMessages 1.2.9
// Sofcase aka Tarahonich Yuriy
// http://sofcase.com.ua
//
iStackMessages = new Class( 
{
	// Extend of Options
	Implements: [Options],
	
	// Default options
	options:
	{
		// Max. count messages in stack
		'capacity': 8,
		// Show and hide animation duration
		'animationTime': 300,
		// Time to left message
		'hideTimeout': 6000,
		// Options of hide animation
		'hideOptions': 
		{
			'property': 'opacity',
			'value': 0
		},
		// Options of show animation
		'showOptions':
		{
			'property': 'opacity',
			'value': 1			
		},
		// Positions
		'hPosition': 'right',
		'vPosition': 'top',
		// Callback functions
		'showCallback': null,
		'hideCallback': null
	},
	
	// Stack messages (container)
	stackmessages: null,
	
	// Box "Close all messages"
	closebox: null,

	// Class constructor
	initialize: function(options) 
	{
		// Set new options
		this.setOptions(options);
		
		// Create Stackmessages box (element)
		this.stackmessages = new Element('div',
		{
			'class': 'stack-messages',
			'styles': 
			{
				'position': 'fixed'
			}
		});
		
		// Create box for close all messages
		this.closebox = new Element('div', 
		{
			'html': 'close all messages',
			'class': 'stack-messages-closebox'
		});
		
		// Add click event to box "close all message"
		this.closebox.addEvent('click', function()
		{
			this.closeMessages();
		}.bind(this));
		
		// inject box "close all messages" to stack messages
		this.closebox.inject(this.stackmessages);
		
		// Set horizontal position
		if(this.options.hPosition == 'right') {
			this.stackmessages.setStyle('right', '0');
		} else {
			this.stackmessages.setStyle('left', '0');
		}

		// Set vertical position	
		if(this.options.vPosition == 'top') {
			this.stackmessages.setStyle('top', '0');
		} else {
			this.stackmessages.setStyle('bottom', '0');
		}
		
		// Inject box to site body
		this.stackmessages.inject(document.body, 'top');
		
		// check capacity
		if(this.options.capacity < 1) this.options.capacity = 1;
	},
	
	// Redraw stackmessages box
	redraw: function()
	{
		// Set horizontal position
		if(this.options.hPosition == 'right') {
			this.stackmessages.setStyle('right', '0');
			this.stackmessages.setStyle('left', null);
		} else {
			this.stackmessages.setStyle('left', '0');
			this.stackmessages.setStyle('right', null);
		}

		// Set vertical position	
		if(this.options.vPosition == 'top') {
			this.stackmessages.setStyle('top', '0');
			this.stackmessages.setStyle('bottom', null);
		} else {
			this.stackmessages.setStyle('bottom', '0');
			this.stackmessages.setStyle('top', null);
		}
	},
	
	// Show message function
	showMessage: function(type, header, message, isClosed, hideTimeout, clickHandle)
	{
		// Redraw stackmessages box
		this.redraw();
	
		// Check a capacity messages
		var messages = this.stackmessages.getChildren('div.message');
		if(messages.length >= this.options.capacity)
		{
			var countleft = messages.length - this.options.capacity + 1;
			for(var i = 0; i < countleft; i++)
			{
				this.disposeMessage(messages[i]);
			}
		}

		// Time to left of message
		hideTimeout = $defined(hideTimeout) ? hideTimeout.toInt() : this.options.hideTimeout;
		
		// Draw message box
		var messagebox = new Element('div', {'class': 'message message-' + type}).inject(this.stackmessages);
			messagebox.setStyle(this.options.hideOptions.property, this.options.hideOptions.value);
			
		// Draw text container and inject to messagebox
		if(message != '') new Element('div', {'html': message}).inject(messagebox, 'top');
		
		// Draw title text header and inject to messagebox
		if(header != '') new Element('h1', {'html': header}).inject(messagebox, 'top');	
		
		// Draw close button and inject to messagebox
		if(isClosed == true)
		{
			var closebtn = new Element('a',
			{
				'href': '#',
				'class': 'close-btn',
				'html': 'x',
				'events':
				{
					'click': function(e)
					{
						new Event(e).stop();
						this.disposeMessage(messagebox);
					}.bind(this)
				}
			}).inject(messagebox, 'top');
		}

		// Play a show animation
		messagebox.set('tween', {duration: this.options.animationTime});
		messagebox.tween(this.options.showOptions.property, this.options.showOptions.value);
		
		// Set timer to dispose message (if time to left = 0 to never hide)
		if(hideTimeout > 0) this.disposeMessage.delay(hideTimeout, this, messagebox);
		
		// Call a callback function
		if(this.options.showCallback) this.options.showCallback(messagebox);
		
		// Add event of click to message
		if(clickHandle != null) $(messagebox).addEvent('click', clickHandle, messagebox);
		
		// If >= 2, to show "close all" box
		if(messages.length + 1 > 1)
		{
			this.closebox.setStyle('display', 'block');
		}
		
		// Return message box element
		return $(messagebox);
	},
	
	// close all messages
	closeMessages: function()
	{
		this.stackmessages.getChildren('div.message').each(function(item, index)
		{
			this.disposeMessage(item);
		}.bind(this));
	
		this.closebox.setStyle('display', 'none');
	},
	
	// Dispose message (hide)
	disposeMessage: function(messagebox)
	{
		// Play a hide animation
		messagebox.set('tween', {duration: this.options.animationTime});
		messagebox.tween(this.options.hideOptions.property, this.options.hideOptions.value);  	  
		
		// Dispose message box			
		setTimeout(function()
		{
			messagebox.dispose();
		}, 
		this.options.animationTime);
		
		// Call a callback function
		if(this.options.hideCallback) this.options.hideCallback(messagebox);
	}
});