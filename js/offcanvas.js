/*Build the menu*/
 (function ($, window, document, undefined) {
 
  $.fn.offcanvas = function(options) {
	var settings = $.extend({
        // Default settings
        target_menu: '#mainMenu',
    }, options );

  //wrap the content, clone the menu and append the clone to the wrapper	
  $('body').children().wrapAll('<div class="content-wrapper">');
  offContent = '<nav>' + $(settings.target_menu).html();   
  $(offContent).addClass('offcanvas').insertBefore('.content-wrapper');
  //add a back button to the menu
  $('.offcanvas ul').append('<li><a href="#" id="close-menu">Back</a></li>');
  
  };

}(jQuery, window, window.document, undefined));

$(window).offcanvas();