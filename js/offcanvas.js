;(function ($, window, document, undefined) {   
    var pluginName = 'OffCanvas';

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

    
    var defaults = {
           target_menu: "#mainMenu",
           toggle: "#nav-toggle",
           nav_class: "nav-on", 
           inner: ".content-wrapper"
        };

    function Canvasize(element, options) {   
        this.element = element;
        this.$el = $(element);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.is_nav_open = false; 
        this.init();
    }

    var $doc = $(document.documentElement);

    Canvasize.prototype = {
        init: function () {
            this.buildMenu(this.settings.target_menu); //comment out if you already have a menu
            this.addToggle(this.settings.toggle);
            this.addToggle("#close-menu");
            //eventually, add ability to initialize swipe toggle here
            $doc.addClass('nav-ready');
        },
        buildMenu: function (target_menu) {
            offcanvas = this.settings.target_menu;
            offContent = '<nav>' + $(offcanvas).html();   
            $('body').children().wrapAll('<div class="content-wrapper">');
            $(offContent).addClass('offcanvas').insertBefore('.content-wrapper');
            //add a back button to the menu if there isn't one
            // $('.offcanvas ul').append('<li><a href="#" id="close-nav">Back</a></li>');
        },
        addToggle: function (toggle) {
            var self = this;
            $(toggle).on('click.' + pluginName, function () {
                self.toggleNav();
            });  
        },
        toggleNav: function () {
            if (this.is_nav_open && $doc.hasClass(this.settings.nav_class)) {
              this.initCloseNav();
            } else {
              this.openNav();
            }
        },
        openNav: function () {
            $doc.addClass(this.settings.nav_class);
            this.is_nav_open = true;

            return false;
        },
        initCloseNav: function () {
            if (this.nav_open) {
              // close navigation after transition or immediately
              var duration = (transition_end && transition_prop) ? parseFloat(window.getComputedStyle($('.content-wrapper'), '')[transition_prop + 'Duration']) : 0;
              if (duration > 0) {
                $(document).on(transition_end, closeNavEnd);
              } else {
                closeNavEnd(null);
              }
            }
            
            $doc.removeClass(this.settings.nav_class);
        },
        closeNavEnd: function(e) {
            if (e && e.target === inner) {
              $(document).off(transition_end, closeNavEnd);
            }
            this.nav_open = false;
        }
    };

    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Canvasize( this, options ));
            }
        });
    };

})( jQuery, window, document );