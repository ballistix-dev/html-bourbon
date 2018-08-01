$(function() {

  $('*[data-element="animate"]').css('opacity', 0);
  $('*[data-element="animate"]').addClass('animated');

  var screenHeight = $(window).height();

  $(window).scroll(function() {

    var scrollTop = $(this).scrollTop();

    $('*[data-element="animate"]').each(function() {

      var offset = 200,
        delay = 0,
        element = $(this),
        topPos = element.offset().top,
        animation = element.data("animate"),
        scrollPos = scrollTop + screenHeight - offset;

      if (topPos <= scrollPos) {

        setTimeout(function() {

          element.addClass(animation);

          element.css('opacity', 1);

        }, delay);

      } else {
        element.removeClass(animation);
        element.animate({
          opacity: 0
        }, 1500);
      }

    });

  });

});
