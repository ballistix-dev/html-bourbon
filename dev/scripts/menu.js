$(function() {
	$('.menu-item-has-children > a').on('click', function(event){
		event.stopPropagation();
		event.preventDefault();	
	});
	$('.menu-item-has-children > a').on('click', function(event){
		if ( !($(this).hasClass('is-active')) ) {
			$(this).closest('ul').find('.is-active').removeClass('is-active');
		}
		$(this).toggleClass('is-active');
		$(this).parent().toggleClass('is-active');
	})
	$('html').on('click', function(){	
		$('.menu').find('.is-active').each(function(){
			$(this).removeClass('is-active');
		});	
	})
});