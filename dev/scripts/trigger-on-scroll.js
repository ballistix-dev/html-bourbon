$(function() {

  $('*[data-element="scroll"]').each(function() {

    var element = $(this),
      topPos = element.position().top;

    $(window).scroll(function() {

      var scrollTop = $(this).scrollTop();

      if (topPos < scrollTop) {
        element.addClass('is-scrolled');
      } else {
        element.removeClass('is-scrolled');
      }
    });

  });

});
