(function($) {
  
  $.fn.iosPlaceholder = function(options) {
    if(!this.length) {
      return false;
    }
    return this.filter('input').each(function() {
      
      var $this = $(this),
      
          // Init placeholder div
          placeholderText = $this.attr('placeholder'),
          $placeholder = $('<div class="placeholder">')
            .css({ position: 'absolute', paddingLeft: (($this.outerHeight() - $this.height()) / 2) + 2 + "px" })
            .text(placeholderText)
            
            // Trigger text field focus
            .bind('click.iosPlaceholder', function() {
              $this.focus();
            }),
          
          // Init placeholder wrapper
          wrapperStyles = {
                position: 'relative',
                lineHeight: $this.outerHeight() + "px",
                fontSize: $this.css('fontSize')
              },
          $placeholderWrapper = $('<div class="placeholder-wrapper">')
            .css(wrapperStyles)
            .html($placeholder);
      
      $this
        .attr('autocomplete', 'off')
        .removeAttr('placeholder');
      
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
          
      $this.bind('focus.iosPlaceholder', function() {
        $placeholderWrapper.addClass('focussed');
      });
      
      $this.bind('blur.iosPlaceholder', function() {
        $placeholderWrapper.removeClass('focussed');
        if($this.val() === '') {
          $placeholder.show();
        }
      });
      
      $this.bind('keydown.iosPlaceholder', function(evt) {
        // A list of keycodes that don't output any characters
        if(!(evt.which === 13 || (evt.which >= 16 && evt.which <= 20) || (evt.which === 27) || (evt.which >= 33 && evt.which <= 40) || (evt.which >= 91 && evt.which <= 93) || (evt.which >= 112 && evt.which <= 123) || (evt.which >= 144 && evt.which <= 145) || evt.which === 224)) {
          $placeholder.hide();
        }
      });
      $this.bind('keyup.iosPlaceholder', function(evt) {
        if(!$this.val()) {
          $placeholder.show();
        }
      });
    });
  };
})(jQuery);