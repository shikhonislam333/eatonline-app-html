$(function() {
    'use strict';

    $('#booking_instruction').keypress(function(event) {

        if (event.keyCode == 13) {
            event.preventDefault();
        }
    });
    $('.dropdown-hover').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
    }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
    });

    $('.collapseFilterHeader').on('click', function() {
        if ($(this).is(':visible')) {
            $(this).children('.fa').toggleClass('active');
            $(this).next('.custom-filter-collapse').toggleClass('d-md-none-');
        }
    });

    $(".numbers-row").append('<div class="inc button-icon">+</div>');
    $(".numbers-row").prepend('<div class="dec button-icon">-</div>');
    $(".button-icon").on("click", function() {
        var $button = $(this);
        var rownum = $button.parent().find(".cart-inc-txt").data('row');

        var oldValue = $button.parent().find(".cart-inc-txt").val();
        if ($button.text() == "+") {
            var newVal = parseFloat(oldValue) + 1;
            orderItemDecInc(rownum, 1);
        } else {
            orderItemDecInc(rownum, 0);
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find(".cart-inc-txt").val(newVal);
        if (newVal == 0) {
            $(this).parent('.numbers-row').addClass('d-none').prev('.menu-add-button').removeClass('d-none');
        }
    });

    $('#filters input[type=checkbox]').on('click', function() {
        $(this).next('label').toggleClass('active');
    });

    $('#send-sms').on('click', function() {
        $('.verify-otp-section').removeClass('d-none');
        $(this).attr('disabled', 'disabled');
    });

    $('#otp-submit').on('click', function() {
        $('#sms-code').removeClass('active').removeClass('show');
        $('#basic-info').addClass('active').addClass('show');
        $('.nav-item a[href=#sms-code]').removeClass('active').addClass('completed');
        $('.nav-item a[href=#basic-info]').removeClass('disabled').addClass('active');
    });

    $('#otp-submit').on('click', function() {
        $('#sms-code').removeClass('active').removeClass('show');
        $('#basic-info').addClass('active').addClass('show');
        $('.nav-item a[href=#sms-code]').removeClass('active').addClass('completed');
        $('.nav-item a[href=#basic-info]').removeClass('disabled').addClass('active');
    });

    $('#order-table').on('click', function() {
        $('#basic-info').removeClass('active').removeClass('show');
        $('#order-status').addClass('active').addClass('show');
        $('.nav-item a[href=#basic-info]').removeClass('active').addClass('completed');
        $('.nav-item a[href=#order-status]').removeClass('disabled').addClass('active');
    });

    $(document).on('click', '.mobile-cart', function() {
        $('.cart-section').show();
    });

    $(document).on('click', '.cart-close', function() {
        $('.cart-section').hide();
    });

    $(document).on('click', '.cart-item-delete', function() {
        $(this).parents('.cart-item-box').remove();
        $('.item-delete-container').show();
        setTimeout(function() {
            $('.item-delete-container').hide();
        }, 3000);
        if ($('.cart-item-box').length == 0) {
            $('#cart-section').hide();
            $('.cart-empty').show();
        } else {
            $('#cart-section').show();
            $('.cart-empty').hide();
        }
    });

    $(document).on('click', '.menu-add-button', function() {
        //$(this).addClass('d-none').next('.numbers-row').removeClass('d-none').find('.cart-inc-txt').val(1);
    });
    /*var smileyWidth = $('.smiley-box a').outerWidth()+4;
    var outerSmileyWidth = smileyWidth * $('.smiley-box a').length;
    $(".smiley-box").hover(	
    	function() {
    		$(this).addClass("active");
    		$('.smiley-box').css({
    			'right': '0px',
    			'width': outerSmileyWidth + 'px'
    		});
    	}, function() {
    		$(this).removeClass("active");
    		$('.smiley-box').css({
    			'right': 'auto',
    			'width':  '100%'
    		});
    	}
    );

    $(document).on('click', '.smiley-box', function () {
    	var smileyWidth = $(this).children('.btn').outerWidth()+4;
    	var outerSmileyWidth = smileyWidth * $('.smiley-box a').length;
    	$(this).toggleClass('active');
    	if($(this).hasClass('active')) {
    		$('.smiley-box').css({
    			'right': '0px',
    			'width': outerSmileyWidth + 'px'
    		});
    	} else {
    		$('.smiley-box').css({
    			'right': 'auto',
    			'width':  '100%'
    		});
    	}
    });*/

    $(document).on("click", "#pizza-step-addons .inputGroup input", function() {
        var item_text = $(this).parent().find('label').text();
        var topping_item_price = $(this).parent().find('label').data('price');

        var id = $(this).val();
        var cat = $(this).parent().parent().parent().parent().find('.f-semibold').data('cat');

        if ($(this).attr('type') == 'radio') {
            $('#pizza-toppings-label .Toppings-item').find(".secondary-" + cat).remove();
        }
        var selectedItems = $('#Popupordermenuinfo').find('#pizza-toppings-label .Toppings-item').html();


        if ($(this).prop('checked') == true) {

            if ($('#pizza-toppings-label .Toppings-item').find("span[data-toppings='" + id + "']").length == 0) {
                selectedItems += "<span class='badge badge-warning font-weight-normal pt-1 pb-1 pl-2 pr-2 f-size-12 secondary-" + cat + "' data-toppings='" + id + "' data-price='" + topping_item_price + "'>" + item_text + "+</span>";
                $('#Popupordermenuinfo').find('#pizza-toppings-label .Toppings-item').html(selectedItems);
            }
        } else {
            $('#pizza-toppings-label .Toppings-item').find("span[data-toppings='" + id + "']").remove();

        }
        calculateHeaderPrice();

    });
    //$(document).on("click", ".checkboxDiv .inputGroup input", function () {
    //	if($(this). prop("checked") == true){
    //		alert('checked');
    //	} else {
    //		alert('unchecked');
    //	}
    //
    //	});

    $('.addon-popup').on('shown.bs.modal', function() {
        $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
            var $target = $(e.target);
            if ($target.parent().hasClass('disabled')) {
                return false;
            }
        });

        $(".next-step").click(function(e) {
            var $active = $(this).parents('.wizard').find('.nav-tabs a.active');
            $active.addClass('completed').find('.fa').removeClass('fa-circle').addClass('fa-check-circle');
            $active.next().removeClass('disabled');
            nextTab($active);
        });
        $(".prev-step").click(function(e) {
            var $active = $(this).parents('.wizard').find('.nav-tabs a.active');
            prevTab($active);
        });
    });




    $('.category-tab').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 575,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
});

/* Modal Popup Scroll Script */
function setModalMaxHeight(element) {
    this.$element = $('#orderpop');
    this.$content = this.$element.find('.modal-content');
    var borderWidth = this.$content.outerHeight() - this.$content.innerHeight();
    var dialogMargin = $(window).width() < 768 ? 20 : 60;
    var contentHeight = $(window).height() - (dialogMargin + borderWidth);
    var headerHeight = this.$element.find('.modal-header').outerHeight() || 0;
    var footerHeight = this.$element.find('.modal-footer').outerHeight() || 0;
    var maxHeight = contentHeight - (headerHeight + footerHeight);


    this.$content.css({
        'overflow': 'hidden'
    });

    this.$element
        .find('.modal-body').css({
            'max-height': maxHeight,
            'overflow-y': 'auto'
        });
}

$('.modal').on('show.bs.modal', function() {
    $(this).show();
    setModalMaxHeight(this);
});

$(window).resize(function() {
    if ($('.modal.in').length != 0) {
        setModalMaxHeight($('.modal.in'));
    }
});

function nextTopStep(el) {
    $('#firstNext').trigger('click');
    $(el).hide();

}

function nextStep(el) {
    var $active = $(el).parents('.wizard').find('.nav-tabs a.active');
    var active_tab_content = $(el).parents('.wizard').find('.tab-pane.active');
    if (active_tab_content.attr('id') == 'pizza-step-addons') {
        var validate_addons_to_menu = validateAddonsForAddToMenu();

        if (!validate_addons_to_menu) {
            return false;
        }
    } else if (active_tab_content.attr('id') == 'pizza-step-size' || active_tab_content.attr('id') == 'pizza-step-slice') {

        var validate_size_slice_to_menu = $('#' + active_tab_content.attr('id') + ' .addon-content').find('input[type=radio]:checked').length;

        if (!validate_size_slice_to_menu) {
            alert('Du mangler at vælge noget');
            return false;
        }
    }
    $active.addClass('completed').find('.fa').removeClass('fa-circle').addClass('fa-check-circle');
    $active.next().removeClass('disabled');
    nextTab($active);
    setModalMaxHeight($('.modal.in'));
}

function calculateHeaderPrice() {
    var total_price = 0.00
    $('div.topping-header').find('[data-price]').each(function() {
        total_price += parseFloat($(this).data('price'));
    });
    $('.header_price').text('I alt- ' + total_price + ' DKK');
}

function prevStep(el) {
    var $active = $(el).parents('.wizard').find('.nav-tabs a.active');
    prevTab($active);
    setModalMaxHeight($('.modal.in'));
}

function nextTab(elem) {
    /*$(elem).next().find('a[data-toggle="tab"]').click();*/
    //console.log($(elem).html());
    $(elem).next().trigger('click');
}

function prevTab(elem) {
    $('#topNext').show();
    //console.log($(elem).html());
    /*$(elem).prev().find('a[data-toggle="tab"]').click();*/
    $(elem).prev().trigger('click');
}