// $(function() {

//     $('[class*="animate-"]').css('opacity', 0);
    
//     var screenHeight = $(window).height();

//     $(window).scroll(function() {
        
//         var scrollTop   = $( this ).scrollTop();
        
//         $('[class*="animate-"]').each(function() {
        
//             var offset      = 200,
//                 delay       = 400,
//                 element     = $(this),
//                 topPos      = element.offset().top,
//                 animation   = element.attr('class').replace("animate-", ""),
//                 scrollPos   = scrollTop + screenHeight - offset;
        
//             if ( topPos < scrollPos ) {
                
//                 setTimeout(function(){
                
//                     element.addClass(animation + ' animated');
        
//                     element.css('opacity', 1);
                
//                 }, delay );
        
//             }

//         });

//     });

// });