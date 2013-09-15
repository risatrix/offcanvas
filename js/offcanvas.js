/*Build the menu*/
  $.fn.offcanvas = function() {
      $('body').children().wrapAll('<div class="content-wrapper">');
      offContent = '<nav>' + $('#mainMenu').html();   
      $(offContent).addClass('offcanvas').insertBefore('.content-wrapper');
      $('.offcanvas ul').append('<li><a href="#">Back</a></li>');
  };

  $(window).offcanvas();

