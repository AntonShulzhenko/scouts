(function($) {
  function accrodionToggleActive() {
    var accordion = $('.accordion');
    var panels    = accordion.find('.panel');
    var link      = accordion.find('.panel-link');

    link.on('click', function() {
      addActiveClass($(this).parent().next());
    });

    accordion.find('.panel-collapse.in').parent().addClass('active');

    function addActiveClass(el) {
      panels.removeClass('active');
      el.hasClass('in') ? el.parent().removeClass('active') : el.parent().addClass('active');
    }
  }

  accrodionToggleActive();
})(jQuery);
