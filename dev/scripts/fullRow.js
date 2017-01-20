// $(function() {

//     jQuery.fn.extend({

//         fullRow: function () {

//             var width = $('body').width();

//             this.each(function() {

//                 var value = $(this).position().left - $('body').position().left;
            
//                 $(this).css({
//                     'width': width,
//                     'margin-left': -value,
//                     'margin-right': -value,
//                     'padding-left': value,
//                     'padding-right': value
//                 });

//             });

//         return this;

//         }
        
//     });

//     $(window).resize(function() {
//         $('.page-template-default .post-header').fullRow();
//     }).bind('orientationchange', function() {
//         $('.page-template-default .post-header').fullRow();
//     });

//     $('.page-template-default .post-header').fullRow();

// });