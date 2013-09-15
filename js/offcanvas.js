/*Build the menu*/
 (function ($, window, document, undefined) {
 
  $.fn.offcanvas = function(options) {
	var settings = $.extend({
        // Default settings
        target_menu: '#mainMenu',
    }, options );

      $('body').children().wrapAll('<div class="content-wrapper">');
      offContent = '<nav>' + $(settings.target_menu).html();   
      $(offContent).addClass('offcanvas').insertBefore('.content-wrapper');
      $('.offcanvas ul').append('<li><a href="#" id="close-menu">Back</a></li>');
  };

}(jQuery, window, window.document, undefined));

$(window).offcanvas();