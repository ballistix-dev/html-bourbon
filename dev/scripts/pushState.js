// /*
//     https://rosspenman.com/pushstate-jquery
// */

// $(function() {

//     String.prototype.decodeHTML = function() {
//         return $("<div>", {
//             html: "" + this
//         }).html();
//     };
//     var $main = $("#site-content"),

//         $navigation = $("#site-header nav"),

//         init = function() {
//             // Do this when a page loads.

//             loadSite();

//             $navigation.animate({
//                 opacity: 1
//             }, 1000, function() {
//                 // Animation complete.
//             });

//         },
//         ajaxLoad = function(html) {
//             document.title = html
//                 .match(/<title>(.*?)<\/title>/)[1].trim()
//                 .decodeHTML();
//             init();
//         },
//         loadPage = function(href) {
//             $main.load(href + ' #site-content>*', ajaxLoad);
//         };

//     init();

//     $(window).on("popstate", function(e) {
//         if (e.originalEvent.state !== null) {
//             loadPage(location.href);
//         }
//     });

//     $(document).on('click', '.push-state a', function() {

//         var href = $(this).attr("href");

//         $navigation.css('opacity', '0.5');

//         if (href.indexOf(document.domain) > -1 || href.indexOf(':') === -1) {
//             history.pushState({}, '', href);
//             loadPage(href);
//             return false;
//         }

//     });

// });
