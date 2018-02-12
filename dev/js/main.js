$(document).ready(function(){
    "use strict";


    //OPEN / CLOSE NAVIGATION MENU
    $(".menu-toggle").click(function(e) {
        e.preventDefault();
        $("#menu-overlay").toggleClass("active");
        $(".menu-trigger").toggleClass("active");
        $(this).toggleClass("active");
    });





    //CLOSE MENU WHEN A LINK IS CLICKED
    $('#menu-overlay .menu-item').click(function() {
        $("#menu-overlay").removeClass("active");
        $(".menu-toggle").removeClass("active");
        $(".menu-trigger").removeClass("active");
    });





    //NAVIGATION LINK ANIMATION
    var Page = (function() {
        var $nav = $( '#menu-nav > a' ),
            slitslider = $( '#slider' ).slitslider({
                onBeforeChange : function( slide, pos ){
                    $nav.removeClass( 'current' );
                    $nav.eq( pos ).addClass( 'current' );
                }
            }),

            init = function(){
                initEvents();
            },

            initEvents = function(){
                $nav.each( function( i ){
                    $( this ).on( 'click', function( event ){
                        var $dot = $( this );
                        if( !slitslider.isActive() ){
                            $nav.removeClass( 'current' );
                            $dot.addClass( 'current' );
                        }

                        slitslider.jump( i + 1 );
                        return false;
                    });
                });
            };

            return { init : init };
    })();
    Page.init();
});
