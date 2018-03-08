$(function() {
  $("input[type=text], input[type=email], input[type=tel], select, textarea").bind({
    focus: function() {
      $(this).prev("label").addClass('active');
    },
    focusout: function() {
      if (!$(this).val()) {
        $(this).prev("label").removeClass('active');
      }
    }
  });

  $('select').prepend('<option value=""></option>').val('');
});
