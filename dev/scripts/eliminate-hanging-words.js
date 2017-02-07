jQuery.fn.extend({

    hangingWords: function () {

        $(this).html(function(i, oldHtml) {
        	
        	return oldHtml.replace(/\s+([^\s]+)$/, "&nbsp;$1");

        });

    return this;

    }
    
});

$("p").hangingWords();