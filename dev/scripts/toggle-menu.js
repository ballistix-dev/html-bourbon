$(function() {
  $('*[data-toggle="toggle-menu"]').on('click', function(event) {
      event.preventDefault();
      var target = $(this).data('target');
      $(this).toggleClass('is-active');
      $(target).find('.menu').toggleClass('is-active');
  });
});
