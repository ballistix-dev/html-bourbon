$(function() {
  $('body').prepend('<a href="javascript:void(0);" class="back-to-top" data-toggle="tooltip" data-placement="left" title="Back to Top"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>');
  var offset = 400;
  $(document).scroll(function() {
      if ($(this).scrollTop() > offset) {
          $('.back-to-top').addClass('show');
      } else {
          $('.back-to-top').removeClass('show');
      }
  });
  $('.back-to-top').click(function(event) {
      event.preventDefault();
      $('html, body').animate({
          scrollTop: 0
      }, 500);
      return false;
  });
});
