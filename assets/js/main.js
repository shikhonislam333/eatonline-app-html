(function($) {
    "use strict";

    $(document).ready( function() {

    //>> Sticky Header Js Start <<//
    $(".toggle-password").click(function() {

        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    /* ================================
       Instagram Slider Js Start
    ================================ */

    if($('.dashboard-banner-slider').length > 0) {
        const dashboardBannerSlider = new Swiper(".dashboard-banner-slider", {
            spaceBetween: 30,
            speed: 1300,
            loop: true,
            centeredSlides: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
        });
    }
   
    
    }); // End Document Ready Function 

    
    
    






})(jQuery); // End jQuery



