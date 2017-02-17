(function($) {
  var forms = $('form');

  function checkFields(form) {
    var input    = form.find('input');
    var textarea = form.find('textarea');
    var re       = /.+@.+\..+/i;
    var errors   = [];

    input.each(function() {
      var element = $(this);
      var value   = element.val();

      element.removeClass('error');

      if (!value.length) {
        errors.push('empty');
        element.addClass('error');
      } else if(element.attr('type') === 'email' && !value.match(re)) {
        errors.push('invalid email');
        element.addClass('error');
      }
    });

    textarea.each(function() {
      $(this).removeClass('error');

      if(!$(this).val().length) {
        errors.push('empty textarea');
        $(this).addClass('error');
      }
    });

    if (!errors.length) return true;

    return false;
  }

  forms.on('submit', function(e) {
    var result = checkFields($(this));
    if (!result) e.preventDefault();
  });
})(jQuery);
