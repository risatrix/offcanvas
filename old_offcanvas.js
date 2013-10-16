/*!
 *  Off-canvas menu via added classes
 *  Copyright (c) David Bushell | http://dbushell.com/
 */

 /* This script doesn't do any styling, or even build the off-canvas menu.
 /* it just adds classes you use to control the menu via toggle.
 */

(function(window, document, undefined) {
  var $doc = $(document.documentElement);

  // normalize vendor prefixes
  var transform_prop = window.Modernizr.prefixed('transform'),
      transition_prop = window.Modernizr.prefixed('transition'),
      transition_end = (function() {
          var props = {
              'WebkitTransition' : 'webkitTransitionEnd',
              'MozTransition'    : 'transitionend',
              'OTransition'      : 'oTransitionEnd otransitionend',
              'msTransition'     : 'MSTransitionEnd',
              'transition'       : 'transitionend'
          };
          return props.hasOwnProperty(transition_prop) ? props[transition_prop] : false;
      })();

  window.App = (function() {
    var _init = false, app = {};

    var inner = document.getElementById('content-wrap'),
        nav_open = false,
        nav_class = 'js-nav';

    app.init = function() {
      if (_init) {
        return;
      }
      _init = true;

      
var closeNavEnd = function(e) {
        if (e && e.target === inner) {
          $(document).off(transition_end, closeNavEnd);
        }
        nav_open = false;
        inner.style.width = '';
      };
      app.closeNav =function() {
        if (nav_open) {
          // close navigation after transition or immediately
          var duration = (transition_end && transition_prop) ? parseFloat(window.getComputedStyle(inner, '')[transition_prop + 'Duration']) : 0;
          if (duration > 0) {
            $(document).on(transition_end, closeNavEnd);
          } else {
            closeNavEnd(null);
          }
        }
        $doc.removeClass(nav_class);
      };

      app.openNav = function() {
        if (nav_open) {
          return;
        }
        $doc.addClass(nav_class);
        // fix `inner`'s width flashes when its box layout is changed from
        // static to absolute
        inner.style.width = $doc.width() + 'px';
        nav_open = true;

        return false;
      };

      app.toggleNav = function(e) {
        if (nav_open && $doc.hasClass(nav_class)) {
          app.closeNav();
        } else {
          app.openNav();
        }
        if (e) {
          e.preventDefault();
        }

        return false;
      };

      // open nav with whatever "nav" button you can find:
      $('#nav-toggle, #nav-toggle-two, #track-toggle').on('click', app.toggleNav);

      // close nav with main "close" button
      $('#back-toggle').on('click', app.toggleNav);

      // close nav by touching the partial off-screen content
      $('#content-wrap').on('click', function(e) {
        if (nav_open && !$(e.target).closest('#nav').length) {
          e.preventDefault();
          app.closeNav();
        }
      });
      $doc.addClass('js-ready');
    };

    return app;
  })();

})(window, window.document);

 <script>
    jQuery(document).ready(function() {
      $canvasContent = $('.tracks ul').html();
      offCanvas = '<nav id="off_canvas">';
      offCanvas += '<h3>Tracks:</h3><ul>';
      offCanvas += $canvasContent;
      offCanvas += '<li><a href="#" id="back-toggle">Close<i class="icon-remove-sign"></i></a></li>';
      offCanvas +='</ul></nav>';
      $(offCanvas).insertBefore('#content-wrap');

      window.App.init();
    });