$('[data-toggle="popover"]').popover();

$('.form-next').on('click', function() {
    $(".form-top").addClass('d-none');
    $(".form-validate").removeClass('d-none');
});

$('.modal').on('hidden.bs.modal', function(e) {
    $(".form-top").removeClass('d-none');
    $(".form-validate").addClass('d-none');
});

$('#signupPopup').on('shown.bs.modal', function() {
    $('#loginPopup').modal('hide')
});

$('#loginPopup').on('shown.bs.modal', function() {
    $('#signupPopup').modal('hide')
});

$('#forgotCustomerPopup').on('shown.bs.modal', function() {
    $('#loginPopup').modal('hide')
});

$(document).on("click", "input[name='account_type']", function() {
    if (this.id === 'account-bussiness') {
        $("#company-account").removeClass('d-none');
    } else {
        $("#company-account").addClass('d-none');
    }
});

function showEanCVR(el, txt) {

    var id = $(el).children('input').attr('id');
    if (id === 'company_cvr_ean_cvr') {
        $('#company_cvr_ean_cvr').prop('checked', true);
        $('#company_cvr_ean_ean').prop('checked', false);
        $('#company_cvr_ean_value').attr('placeholder', txt);
        $("#ean-update").addClass('d-none');
        $("#cvr-update").removeClass('d-none');
    } else if (id === 'company_cvr_ean_ean') {
        $('#company_cvr_ean_value').attr('placeholder', txt);
        $('#company_cvr_ean_cvr').prop('checked', false);
        $('#company_cvr_ean_ean').prop('checked', true);
        $("#cvr-update").addClass('d-none');
        $("#ean-update").removeClass('d-none');
    }
}

$(document).on("click", "#signup-account-submit", function() {

    if (!($('#company-account').hasClass('d-none')) && $('#customer_company_name').val().length == 0) {
        $("#errormsg").addClass('errormsg').html('Invalid Company Name');
        $("#customer_company_name_errormsg").addClass('errClass1 alert alert-danger').html('Invalid Company Name');
        $("#customer_company_name").focus();
        return false;
    }
    if ($("input#account-bussiness").is(':checked') && $("input#company_cvr_ean_ean").is(':checked')) {

        $.post(jssitebaseUrl + '/ajaxFile.php', {
            'account_type': 'company',
            'ean_cvr': $('input[name="company_cvr_ean"]:checked').val(),
            'company_cvr_ean_value': $("#company_cvr_ean_value").val(),
            'action': 'checkEANNumber'
        }, function(output) {
            if (output == '0') {
                $("#errormsg").addClass('errormsg').html('EAN Invalid');
                $("#company_cvr_ean_value_errormsg").addClass('errClass1 alert alert-danger').html('EAN Invalid');
                $("#company_cvr_ean_value").focus();
            } else {
                $(".signup-account-info").hide();
                $(".signup-user-info").show();
            }
        });

    } else {
        $(".signup-account-info").hide();
        $(".signup-user-info").show();
    }
});

$('.collapseHeader').on('click', function() {
    if ($(this).is(':visible')) {
        $(this).children('.fa').toggleClass('active');
        $(this).next('.custom-collapse').toggleClass('d-lg-none-');
    }
});

$('.bd-search-docs-toggle').on('click', function() {
    if ($(this).is('.collapsed')) {
        $('body').addClass('modal-open');
    } else {
        $('body').removeClass('modal-open');
    }
});