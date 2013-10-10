;(function ($, window, document, undefined) {   
    var pluginName = 'OffCanvas';
    
    var defaults = {
           target_menu: "#mainMenu"
        };

    function Canvasize(element, options) {   
        this.element = element;
        this.$el = $(element);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    };

    Canvasize.prototype = {
        init: function () {
            offcanvas = this.settings.target_menu
            offContent = '<nav>' + $(offcanvas).html();   
            $('body').children().wrapAll('<div class="content-wrapper">');
            $(offContent).addClass('offcanvas').insertBefore('.content-wrapper');
            //add a back button to the menu
            $('.offcanvas ul').append('<li><a href="#" id="close-menu">Back</a></li>');
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