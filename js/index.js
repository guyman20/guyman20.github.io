(function($) {
   
   $.widget("custom.rangeslider", {

      // Default options
      options: {
         'min'            : 0,
         'max'            : 100,
         'message'    : 'Default message should be over-ridden'
         /*
            Provide additional options to change:
            - slider track color, slider handle color, slider output bg color & text color, 'tooltip' disabled/enabled, slider output disabled/enabled
         */
      },

      _create: function() {
         var self          = this.element,
             options       = this.options,
             min           = options['min'],
             max           = options['max'],
             msg           = options['message'],
             $range_inner  = $(
                                '<input class="range-slider--slide js-range-slide" id="rangeSlider" type="range" value="" min="" max="" step="">' +
                                '<output class="range-slider--output js-range-output" for="rangeSlider"></output>'
                             ),
             $range        = self.append($range_inner),
             $slider       = $(self).children('.js-range-slide');

         // Set min and max value attributes on slider input on init
         $slider.attr({ 'min': min, 'max': max, 'value': min });

         var $width          = $slider.width(),
             pos_calc        = (min / max) * 100,
             pixel_pos       = (pos_calc / 100) * $width,
             $slider_output  = $(self).children('.js-range-output');

         // Set slider starting position and populate label text
         $slider_output.css('left', pixel_pos + 'px').html(min + '%');

         self.on('mousemove', function(e) {
            self.rangeslider('moveLabel'); // why can't I just call self.moveLabel?
         });
      },

      // Position label with slider handle
      moveLabel: function() {

         var self            = this.element,
             options         = this.options,
             range_slider    = self[0],
             slider_input    = range_slider.getElementsByTagName('input')[0],
             slider_output   = range_slider.getElementsByTagName('output')[0],
             input_max       = slider_input.max,
             slider_value    = slider_input.value,
             width           = slider_input.clientWidth,
             pos_calc        = (slider_value / input_max) * 100,
             pixel_pos       = (pos_calc / 100) * (width-30),
             $output         = $(self).children('.js-range-output');

         // Position output elem & inject slider value
         $output.css('left', pixel_pos + 'px')
            .html(slider_value + '%');

         // Add or remove tooltip
         if (slider_value >= 20 && slider_value < 25) {
            // Inject tooltip
            $(self).rangeslider('createMessage', $output, options['message']);

         } else if (slider_value > 25 || slider_value < 20) {
            // Remove tooltip and html
            $(self).rangeslider('killMessage');
         }
      },
      
      createMessage: function(elem, msg) {
         /* 
            Since this is not "technically" a 
            tooltip it should be renamed.
            All of the element should be customizable.
         */
         var msg_html = '<span class="js-range-tooltip"></span>',
             self = this.element;

         // Inject tooltip message container if doesn't already exist
         if ($('.js-range-tooltip').length === 0) {
            elem.after(msg_html);
         }
         // Add tooltip message html
         $('.js-range-tooltip').html(msg);
      },

      killMessage: function() {
         // If tooltip exists then remove it
         if ($('.js-range-tooltip').length > 0) {
            $('.js-range-tooltip').remove();
            /* 
               Maybe find out what data, etc is binding
               to DOM and remove if possible?
            */
         }
      }

   });
})(jQuery);

// Initialise Sliders
$("[data-range-id = range_1]").rangeslider(
   { max: 75 },
   { "message": "My special message" }
);

$("[data-range-id = range_2]").rangeslider({ max: 30 });