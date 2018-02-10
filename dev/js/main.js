$(document).ready(function(){
    "use strict";


    //OPEN / CLOSE NAVIGATION MENU
    $(".menu-toggle").click(function(e) {
        e.preventDefault();
        $("#menu-overlay").toggleClass("active");
        $(".menu-trigger").toggleClass("active");
        $(this).toggleClass("active");
    });

});
