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





    //CLOSE MODAL WHEN LINK NAVIGATION IS CLICKED
    $('#menu-overlay .menu-item').click(function(e) {
        e.preventDefault();
        $(".md-modal").removeClass("md-show");
        $(".morph-button").removeClass("open");

    });





    //SKILLS MODAL LINKS
    var docElem = window.document.documentElement, didScroll, scrollPosition;

    // trick to prevent scrolling when opening/closing button
    function noScrollFn() {
        window.scrollTo( scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0 );
    }

    function noScroll() {
        window.removeEventListener( 'scroll', scrollHandler );
        window.addEventListener( 'scroll', noScrollFn );
    }

    function scrollFn() {
        window.addEventListener( 'scroll', scrollHandler );
    }

    function canScroll() {
        window.removeEventListener( 'scroll', noScrollFn );
        scrollFn();
    }

    function scrollHandler() {
        if( !didScroll ) {
            didScroll = true;
            setTimeout( function() { scrollPage(); }, 60 );
        }
    };

    function scrollPage() {
        scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
        didScroll = false;
    };

    scrollFn();

    [].slice.call( document.querySelectorAll( '.morph-button' ) ).forEach( function( bttn ) {
        new UIMorphingButton( bttn, {
            closeEl : '.icon-close',
            onBeforeOpen : function() {
                // don't allow to scroll
                noScroll();
            },
            onAfterOpen : function() {
                // can scroll again
                canScroll();
            },
            onBeforeClose : function() {
                // don't allow to scroll
                noScroll();
            },
            onAfterClose : function() {
                // can scroll again
                canScroll();
            }
        });
    });





    //SKILLS INTRO
    $('.s-skills .s-nav a.next').click(function(e){
        e.preventDefault();

        var skills = $(this).parent().parent();
        $(skills).next().animate({
            top: '0%'
        }, 500);
        $(skills).removeClass('active');
        $(skills).next().addClass('active');
    });

    $('.s-skills .s-nav a.previous').click(function(e){
        e.preventDefault();

        var skills = $(this).parent().parent();
        $(skills).animate({
            top: '100%'
        }, 500);
        $(skills).removeClass('active');
        $(skills).prev().addClass('active');
    })

    $('#menu-overlay .menu-item').click(function(e) {
        e.preventDefault();
        $(".morph-button").removeClass("open");
        $('.s-content').animate({
            top: '100%'
        }, 500);
    });





    //SKILLS MODAL
    $('.morph-button button').click(function(e) {
        e.preventDefault();

        var deco = $(this).parent().find(".deco");
        $(deco).removeClass('hide');
        $(deco).addClass('show');

        var letterBig = $(this).parent().find(".title-contact h1 span:first-child");
        $(letterBig).removeClass('hide');
        $(letterBig).addClass('show');

        var letterSmall = $(this).parent().find(".title-contact h1 span:last-child");
        $(letterSmall).removeClass('hide');
        $(letterSmall).addClass('show');
    });

    $('.morph-content .icon-close').click(function(e) {
        e.preventDefault();

        var content = $(this).parent().find(".deco");
        $(content).removeClass('show');
        $(content).addClass('hide');

        var letterBig = $(this).parent().find(".title-contact h1 span:first-child");
        $(letterBig).removeClass('show');
        $(letterBig).addClass('hide');

        var letterSmall = $(this).parent().find(".title-contact h1 span:last-child");
        $(letterSmall).removeClass('show');
        $(letterSmall).addClass('hide');
    });
});
