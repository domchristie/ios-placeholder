(function($) {
  
  $.fn.iosPlaceholder = function(options) {
    if(!this.length) {
      return false;
    }
    return this.each(function() {
      
      var $this = $(this),
      
          // Init placeholder div
          placeholderText = $this.attr('placeholder'),
          $placeholder = $('<span class="placeholder">')
            .css({ position: 'absolute', paddingLeft: (($this.outerHeight() - $this.height()) / 2) + 1 + "px" })
            .text(placeholderText)
            
            // Trigger text field focus
            .click(function() {
              $this.focus();
            }),
          
          // Init placeholder wrapper
          wrapperStyles = {
                position: 'relative',
                width: $this.outerWidth() + "px",
                lineHeight: $this.outerHeight() + "px",
                fontSize: $this.css('fontSize')
              },
          $placeholderWrapper = $('<div class="placeholder-wrapper">')
            .css(wrapperStyles)
            .html($placeholder);
      
      $this.removeAttr('placeholder');
      
      // Wrap input field in placeholder wrapper
      // In this way, the wrapper is inserted directly into the document,
      // and therefore is still easily accessible with $placeholderWrapper.
      // With .wrap(), the wrapper is cloned, then inserted (i.e. $placeholderWrapper would NOT the one in the document)
      $this
        .before($placeholderWrapper)
        .appendTo($placeholderWrapper);
          
      // Prevents placeholder being shown if value present e.g. on Firefox refresh
      if($this.val()) {
        $placeholder.hide();
      }
          
      $this.focus(function() {
        $placeholderWrapper.addClass('focussed');
      });
      
      $this.blur(function() {
        $placeholderWrapper.removeClass('focussed');
        if($this.val() === '') {
          $placeholder.show();
        }
      });
      
      $this.keydown(function(evt) {
        // A list of keycodes that don't output any characters
        if(!(evt.which === 13 || (evt.which >= 16 && evt.which <= 20) || (evt.which === 27) || (evt.which >= 33 && evt.which <= 40) || (evt.which >= 91 && evt.which <= 93) || (evt.which >= 112 && evt.which <= 123) || (evt.which >= 144 && evt.which <= 145))) {
          $placeholder.hide();
        }
      });
      $this.keyup(function(evt) {
        if(!$this.val()) {
          $placeholder.show();
        }
      });
    });
  };
})(jQuery);