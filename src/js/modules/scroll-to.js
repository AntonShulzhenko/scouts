(function($) {
  $('.scroll-to').on('click', function() {
    var hash   = $(this).attr('href'),
      position = $(hash).offset().top;
    $('html:not(:animated),body:not(:animated)').animate({
      scrollTop: position
    }, 800);
    return false;
  });
})(jQuery);
