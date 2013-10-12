;(function ($, window, document, undefined) {   
    var pluginName = 'OffCanvas';
    
    var defaults = {
           target_menu: "#mainMenu",
           toggle: "#nav-toggle",
           nav_class: "nav-on"
        };

    function Canvasize(element, options) {   
        this.element = element;
        this.$el = $(element);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    var nav_open = false; 
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
            if (nav_open && $doc.hasClass(this.settings.nav_class)) {
              this.initCloseNav();
            } else {
              this.openNav();
            }
        },
        openNav: function () {
            $doc.addClass(this.settings.nav_class);
            nav_open = true;

            return false;
        },
        initCloseNav: function () {
            $doc.removeClass(this.settings.nav_class);
            nav_open = false;

            return false;
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