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

     //Accordion Box
    if ($('.accordion-box').length) {

    // Switch click করলে FAQ খুলবে/বন্ধ হবে না
    $('.accordion-box').on('click', '.switch, .switch *', function(e) {
        e.stopPropagation();
    });

    $(".accordion-box").on('click', '.acc-btn', function () {
        var outerBox = $(this).closest('.accordion-box');
        var target = $(this).closest('.accordion');
        var accBtn = $(this);
        var accContent = accBtn.next('.acc-content');

        if (target.hasClass('active-block')) {
            accBtn.removeClass('active');
            target.removeClass('active-block');
            accContent.slideUp(300);
        } else {
            outerBox.find('.accordion').removeClass('active-block');
            outerBox.find('.acc-btn').removeClass('active');
            outerBox.find('.acc-content').slideUp(300);

            accBtn.addClass('active');
            target.addClass('active-block');
            accContent.slideDown(300);
        }
    });
}

   
    
    }); // End Document Ready Function 

    
    
    






})(jQuery); // End jQuery



