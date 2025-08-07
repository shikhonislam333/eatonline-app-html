$(document).ready(function() {


    //Customer Owner My Account Tab
    $(".myaccInnerNewMenuUl li").click(function() { //When click open tab

        $(".myaccInnerNewMenuUl li").removeClass("active");
        $(".customerTabContent").hide();

        $(this).addClass("active");
        var activeTab = $(this).attr("id");
        //alert(activeTab);
        if (activeTab == 'customer_myorder') {
            $('#customer_myorder').show();
            $('#customer_myorderview_content').hide();
        }


        //alert(jssitebaseUrl +'/images/loader.gif');
        $('#loadingimg').html('<div style="text-align:center;"><img src="' + jssitebaseUrl + '/images/loader.gif" border="0" alt="Loading" /></div>').show();
        setTimeout(function() {
            $("#loadingimg").hide();
            $('#' + activeTab + '_content').show();
        }, 200);
    });

    $('#order_search_text').keyup(function() {
        showFilterOrder();
    });

    $('input[name="company_cvr_ean"]').click(function() {

        if ($(this).val() == 'cvr') {
            $('.company_credit_div').removeClass('hide');

        } else if ($(this).val() == 'ean') {
            $('.company_credit_div').addClass('hide');
        }
    });

    $('input[name="account_type"]').click(function() {
        $('.ui-loader').show();
        if ($(this).val() == 'parsonal') {
            setTimeout(function() {
                $('.ui-loader').hide();

                $('div.ResgiterFrom .company_register').addClass('hide');
                $('div.ResgiterFrom .personal_register').removeClass('hide');
            }, 200);

        } else if ($(this).val() == 'company') {
            setTimeout(function() {
                $('.ui-loader').hide();
                $('div.ResgiterFrom .company_register').removeClass('hide');
                $('div.ResgiterFrom .personal_register').addClass('hide');
            }, 200);

        }
    });
});

function deleteCustomerAccount() {

    $.post(jssitebaseUrl + '/ajaxFile.php', {
        'action': 'deleteMyAccount'
    }, function(output) {
        //alert(output);
        if (output == 'success') {
            customerLogout();
        } else {
            $("#errormsg").addClass('errormsg').html(output);
        }
    });

}
//------------------------------------------------------------------------------------
//customerResetValidate
function customerResetValidate() {

    //alert("sri");

    //Error Language
    var err_lang_arr = error_language();

    var resetpassword = $("#customer_resetpassword").val();
    var retypepassword = $("#customer_retypepassword").val();

    if (resetpassword == '') {
        //$("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_empty_lastname']);
        $("#errormsg").addClass('errormsg').html(err_lang_arr['enter_your_reset_password']);
        $("#customer_resetpassword").focus();
        return false;
    }
    if (retypepassword == '') {
        //$("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_empty_lastname']);
        $("#errormsg").addClass('errormsg').html(err_lang_arr['enter_your_retype_password']);
        $("#customer_retypepassword").focus();
        return false;
    }
    //return false;

}
//------------------------------------------------------------------------------------
//Customer Register Validate
function customerRegisterValidate() {
    //Error Language
    $('span.errClass1').removeClass('errClass1 alert alert-danger');
    var err_lang_arr = error_language();

    var customername = $.trim($("#customer_name").val());
    var customerlastname = $.trim($("#customer_lastname").val());
    var customerstreet = $.trim($("#customer_street").val());
    var customerbuildtype = $.trim($("#customer_buildtype").val());
    //var customercrossstreet 	= $.trim($("#customer_crossstreet").val());
    var customerzip = $.trim($("#customer_zip").val());
    var customercity = $.trim($("#customer_city").val());
    var customerphone = $.trim($("#customer_phone").val());
    var customeremail = $.trim($("#customer_email").val());
    var customerpassword = $.trim($("#customer_password").val());
    var customerconpassword = $.trim($("#customer_conpassword").val());
    var company_cvr_ean_value = $.trim($("#company_cvr_ean_value").val());
    //var customer_termscond		= $.trim($("#customer_termscond").val());
    //var nameRegex = /^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/;
    var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,4}(?:\.[a-z]{2})?)$/i

    //$('#customer_termscond').checked(true);

    if (customername == '') {
        $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_empty_name']);
        $("#customer_name_errormsg").addClass('errClass1 alert alert-danger').html(err_lang_arr['cus_reg_empty_name']);
        $("#customer_name").focus();
        return false;
    }
    /*if(!customername.match(nameRegex)) {
     $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_correct_name']);
     $("#customer_name").focus();
     //$("#customer_name").select();
     return false;
     }*/
    if (customerlastname == '') {
        $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_empty_lastname']);
        $("#customer_lastname_errormsg").addClass('errClass1 alert alert-danger').html(err_lang_arr['cus_reg_empty_lastname']);
        $("#customer_lastname").focus();
        return false;
    }

    /*if(!customerlastname.match(nameRegex)) {
	    $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_correct_name']);
	    $("#customer_lastname").focus();
	    $("#customer_lastname").select();
	    return false;
  	}*/
    if ((customerstreet) == '') {
        $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_empty_street']);
        $("#customer_street_errormsg").addClass('errClass1 alert alert-danger').html(err_lang_arr['cus_reg_empty_street']);
        $("#customer_street").focus();
        return false;
    }

    if (customercity == '') {
        $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_city']);
        $("#customer_city_errormsg").addClass('errClass1 alert alert-danger').html(err_lang_arr['cus_reg_city']);
        $("#customer_city").focus();
        $("#customer_city").select();
        return false;
    }

    if (customerzip == '') {
        $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_empty_zip']);
        $("#customer_zip_errormsg").addClass('errClass1 alert alert-danger').html(err_lang_arr['customer_zip']);
        $("#customer_zip").focus();
        return false;
    } else if (isNaN(customerzip)) {
        $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_correct_zip']);
        $("#customer_zip_errormsg").addClass('errClass1 alert alert-danger').html(err_lang_arr['cus_reg_correct_zip']);
        $("#customer_zip").focus();
        $("#customer_zip").select();
        return false;
    }

    /*if(customercity != ''){
    	if(!customercity.match(nameRegex)){
    		$("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_correct_city']);
    		$("#customer_city").focus();
    		$("#customer_city").select();
    		return false;
    	}	
    }
	
    if(customerstate != ''){
    	if(!customerstate.match(nameRegex)){
    		$("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_correct_state']);
    		$("#customer_state").focus();
    		$("#customer_state").select();
    		return false;	
    	}	
    }*/

    if (customerphone == '') {
        $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_empty_phone']);
        $("#customer_phone_errormsg").addClass('errClass1 alert alert-danger').html(err_lang_arr['cus_reg_empty_phone']);
        $("#customer_phone").focus();
        return false;
    } else if (isNaN(customerphone)) {
        $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_correct_phone']);
        $("#customer_phone_errormsg").addClass('errClass1 alert alert-danger').html(err_lang_arr['cus_reg_correct_phone']);
        $("#customer_phone").focus();
        $("#customer_phone").select();
        return false;
    }

    var customeraddresslabel = 'Home';
    /*if(document.getElementById("customer_addresslabel_home").checked == true){
    	var customeraddresslabel  = $.trim($("#customer_addresslabel_home").val());
    }else if(document.getElementById("customer_addresslabel_off").checked == true){ 
    	var customeraddresslabel  = $.trim($("#customer_addresslabel_off").val());
    }else if(document.getElementById("customer_addresslabel_other").checked == true){ 
    	var customeraddresslabel  = $.trim($("#customer_addresslabel_other").val());
    }else{
    	var customeraddresslabel  = '';
    }*/



    /* check company account field
     customer_company_name
     customer_firm_address
     */
    if ($('input[name="account_type"]:checked').val() == 'company') {
        var companyname = $.trim($("#customer_company_name").val());

        if (companyname == '') {
            $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_empty_companyname']);
            $("#customer_company_name_errormsg").addClass('errClass1 alert alert-danger').html(err_lang_arr['cus_reg_empty_companyname']);
            $("#customer_company_name").focus();
            return false;
        }

        if (company_cvr_ean_value == '') {
            if ($('input[name="company_cvr_ean"]:checked').val() == 'cvr') {
                $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_empty_cvr_number']);
                $("#company_cvr_ean_value_errormsg").addClass('errClass1 alert alert-danger').html(err_lang_arr['cus_reg_empty_cvr_number']);
            } else if ($('input[name="company_cvr_ean"]:checked').val() == 'ean') {
                $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_empty_ean_number']);
                $("#company_cvr_ean_value_errormsg").addClass('errClass1 alert alert-danger').html(err_lang_arr['cus_reg_empty_ean_number']);
            }
            $("#company_cvr_ean_value").focus();
            return false;
        }


    }

    if (customeremail == '') {
        $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_empty_email']);
        $("#customer_email_errormsg").addClass('errClass1 alert alert-danger').html(err_lang_arr['cus_reg_empty_email']);
        $("#customer_email").focus();
        return false;
    }
    //if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(customeremail))){
    if (!(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,4}(?:\.[a-z]{2})?)$/i.test(customeremail))) {
        $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_invalid_email']).show();
        $("#customer_email_errormsg").addClass('errClass1 alert alert-danger').html(err_lang_arr['cus_reg_invalid_email']);
        $("#customer_email").focus();
        return false;
    }

    /*if((customerpassword) == ''){
    	$("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_empty_password']);
    	$("#customer_password").focus();
    	return false;	
    }
    if((customerconpassword) == ''){
    	$("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_empty_conpassword']);
    	$("#customer_conpassword").focus();
    	return false;	
    }
    if(customerpassword != customerconpassword){
    	$("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_invalid_password']);
    	$("#customer_password").focus();
    	return false;
    }*/

    if (customeremail != '') {
        $.post(jssitebaseUrl + '/ajaxFile.php', {
            'customeremail': customeremail,
            'account_type': $('input[name="account_type"]:checked').val(),
            'ean_cvr': $('input[name="company_cvr_ean"]:checked').val(),
            'company_cvr_ean_value': company_cvr_ean_value,
            'action': 'checkCustomerEmail'
        }, function(output) {
            //alert(output);
            if (output == 'EAN Invalid') {
                $("#errormsg").addClass('errormsg').html('EAN Invalid');
                $("#company_cvr_ean_value_errormsg").addClass('errClass1 alert alert-danger').html('EAN Invalid');
                $("#company_cvr_ean_value").focus();
                return false;
            } else if (output > '0') {
                $("#errormsg").addClass('errormsg').html(err_lang_arr['email_id_already_exist']).show();
                $("#customer_email_errormsg").addClass('errClass1 alert alert-danger').html(err_lang_arr['email_id_already_exist']);
                $("#customer_email").focus();
            } else if ((customerpassword) == '') {
                $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_empty_password']);
                $("#customer_password_errormsg").addClass('errClass1 alert alert-danger').html(err_lang_arr['cus_reg_empty_password']);
                $("#customer_password").focus();
                return false;
            } else if ((customerconpassword) == '') {
                $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_empty_conpassword']);
                $("#customer_conpassword_errormsg").addClass('errClass1 alert alert-danger').html(err_lang_arr['cus_reg_empty_conpassword']);
                $("#customer_conpassword").focus();
                return false;
            } else if (customerpassword != customerconpassword) {
                $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_invalid_password']);
                $("#customer_password_errormsg").addClass('errClass1 alert alert-danger').html(err_lang_arr['cus_reg_invalid_password']);
                $("#customer_password").focus();
                return false;
            } else if (!$('input[name="customer_termscond"]').is(':checked')) {
                $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_reg_not_select_terms_cond']);
                $("#customer_termscond_errormsg").addClass('errClass1 alert alert-danger').html(err_lang_arr['cus_reg_not_select_terms_cond']);
                $("#customer_termscond").focus();
                return false;
            } else {
                document.customer_register.submit();
            }
        });
        return false;
    }
}
//-------------------------------------------------------------------------------------------
//Customer Register Validate
function customerLoginValidate() {

    //Error Language
    var err_lang_arr = error_language();

    var customerlogemail = $("#customer_logemail").val();
    var customerlogpassword = $("#customer_logpassword").val();
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if ($("#rememberme").prop('checked') == true) {
        var rememberme = $("#rememberme").val();
    } else {
        var rememberme = "";
    }

    if (customerlogemail == '') {
        $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_login_email_empty']);
        $("#customer_logemail").focus();
        return false;
    }
    //if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(customerlogemail))){
    if (!(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,4}(?:\.[a-z]{2})?)$/i.test(customerlogemail))) {
        $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_login_email_valid']).show();
        $("#customer_logemail").focus();
        return false;
    }
    if ((customerlogpassword) == '') {
        $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_login_pass_empty']);
        $("#customer_logpassword").focus();
        return false;
    }
    if (customerlogemail != '' && customerlogpassword != '') {
        $.post(jssitebaseUrl + '/ajaxFile.php', {
            'customerlogemail': customerlogemail,
            'customerlogpassword': customerlogpassword,
            'rememberme': rememberme,
            'action': 'customerlogin'
        }, function(output) {
            //alert(output);
            if (output == 'Deactivated') {
                $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_login_account_deacivate']).show();
                return false;
            } else if (output == 'PendingActivate') {
                $("#errormsg").addClass('errormsg').html('Your account is not activated yet.').show();
                return false;
            } else if (output == 'Invalid_Login') {
                $("#errormsg").addClass('errormsg').html(err_lang_arr['cus_login_invalid']).show();
                return false;
            } else {
                document.customerlogin.submit();
                //window.location = jssitebaseUrl+"/"+filetype;
            }
        });
    }
    return false;
}

//Facebook Connect/ Login
function callFacebookConnect(login_qry_str) {
    //Error Language
    var err_lang_arr = error_language();
    FB.init({
        appId: site_fb_appsid,
        status: true,
        cookie: true,
        xfbml: true
    });

    FB.login(function(response) {
        if (response.authResponse) {
            FB.api('/me', function(response) {
                //alert(response.email);
                if (response.email != "") {
                    /*alert(response.email);
                    alert(response.name);
                    alert(response.first_name);
                    alert(response.last_name);
                    alert(response.username);
                    alert(response.gender);
                    alert(response.id);return false;*/
                    $.post(jssitebaseUrl + '/ajaxFile.php', {
                        'customerlogemail': response.email,
                        'customername': response.name,
                        'action': 'customerLoginFb'
                    }, function(data) {
                        //alert(data);
                        if (data == "loginSuccess") {
                            login_qry_str11 = check_undefined(login_qry_str);
                            //window.location.href=jssitebaseUrl+"/customerMyaccount.php";
                            if (login_qry_str11 == 'pagetype=checkout') {
                                login_qry_str11 = 'checkout';
                            }
                            window.location.href = jssitebaseUrl + "/" + login_qry_str11;
                        } else {
                            alert(err_lang_arr['invalid_email_id']);
                            FB.logout();
                        }

                    });
                }
            });
        }
    }, {
        scope: 'email'
    });
}

//Facebook Connect/ Login
function callFacebookConnect_addon_domain(resid, res_seourl) {
    //Error Language
    var err_lang_arr = error_language();
    FB.init({
        appId: site_fb_appsid,
        status: true,
        cookie: true,
        xfbml: true
    });

    FB.login(function(response) {
        if (response.authResponse) {
            FB.api('/me', function(response) {
                //alert(response.email);
                if (response.email != "") {
                    /*alert(response.email);
                    alert(response.name);
                    alert(response.first_name);
                    alert(response.last_name);
                    alert(response.username);
                    alert(response.gender);
                    alert(response.id);return false;*/
                    $.post(jssitebaseUrl + '/ajaxFile.php', {
                        'customerlogemail': response.email,
                        'customername': response.name,
                        'action': 'customerLoginFb'
                    }, function(data) {
                        //alert(data);
                        if (data == "loginSuccess") {
                            window.location.href = jssitebaseUrl + "/restaurantDetails.php?resid=" + resid + "&resname=" + res_seourl;
                        } else {
                            alert(err_lang_arr['invalid_email_id']);
                            FB.logout();
                        }

                    });
                }
            });
        }
    }, {
        scope: 'email'
    });
}
//-------------------------------------------------------------------------------------------
//Forget Password POPUP

function customerForgetPassword() {

    var err_lang_arr = error_language();
    var forgetemail = $("#forgetemail").val();

    if (forgetemail == '') {
        $("#errforgetemail").addClass('errormsg').html(err_lang_arr['cus_login_forgetemail_empty']).show();
        $("#forgetemail").focus();
        return false;
    } else if (!(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,4}(?:\.[a-z]{2})?)$/i.test(forgetemail))) {
        $("#errforgetemail").addClass('errormsg').html(err_lang_arr['cus_login_forgetemail_valid']).show();
        $("#forgetemail").focus();
        return false;
    } else {
        $("#errforgetemail").hide();
    }
    if (forgetemail != '') {
        $.post(jssitebaseUrl + '/ajaxFile.php', {
            'forgetemail': forgetemail,
            'action': 'customerforgetPassword'
        }, function(output) {
            //alert(output);
            if ($.trim(output) == 'sendpass_success') {
                $("#errforgetemail").addClass('succmsg').html(err_lang_arr['pwd_has_been_send_email']).show();
                setTimeout(function() {
                    $("#forgetemail").val('');
                    $('#customerforgetpop').modal("hide");

                    //$("#customerforgetpop").hide();
                    //$('#maska').fadeOut();
                    //$("#forgetemail").val(''); 
                }, 2000);
            } else if ($.trim(output) == 'deactive_email') {
                $("#errforgetemail").addClass('errormsg').html('Your Email in Pending Status').show();
            } else if ($.trim(output) == 'pending_email') {
                $("#errforgetemail").addClass('errormsg').html('Your Email not Activated').show();
            } else if ($.trim(output) == 'no_email') {
                $("#errforgetemail").addClass('errormsg').html(err_lang_arr['email_address_not_registered']).show();
            }
        });
    }
    return false;
}

//----------------------------------------------------------------------------------------------------
//Change Password
function customerChangePassword() {

    var err_lang_arr = error_language();
    //var oldpassword    = $("#oldpassword").val();
    var newpassword = $("#newpassword").val();
    var retypepassword = $("#retypepassword").val();

    /*if(oldpassword == ''){
    	$("#changeerrormsg").addClass('errormsg').html(err_lang_arr['cus_changepass_check_oldpass']);
    	$("#oldpassword").focus();
    	return false;
    }
    else */
    if (newpassword == '') {
        $("#changeerrormsg").addClass('errormsg').html(err_lang_arr['cus_changepass_check_newpass']);
        $("#newpassword").focus();
        return false;
    } else if (retypepassword == '') {
        $("#changeerrormsg").addClass('errormsg').html(err_lang_arr['cus_changepass_check_retypepass']);
        $("#retypepassword").focus();
        return false;
    }
    /*else if(oldpassword == newpassword){
    	$("#changeerrormsg").addClass('errormsg').html(err_lang_arr['cus_changepass_check_oldnewpass']);
    	$("#oldpassword").focus();
    	return false;
    }*/
    else if (newpassword != retypepassword) {
        $("#changeerrormsg").addClass('errormsg').html(err_lang_arr['cus_changepass_check_newconfpass']);
        $("#newpassword").focus();
        return false;
    } else {
        //$.post('ajaxFile.php',{"oldpassword":oldpassword,"newpassword":newpassword,"action":"checkChangePassword"},function(response){
        $.post('ajaxFile.php', {
            "newpassword": newpassword,
            "action": "checkChangePassword"
        }, function(response) {
            //alert(response);
            if (response == "Invalid_Old_Pwd") {
                $("#changeerrormsg").addClass('errormsg').html(err_lang_arr['cus_changepass_check_invalidpass']);
                return false;
            } else if (response == 'success') {
                $("#changeerrormsg").removeClass('errormsg');
                $("#changeerrormsg").addClass('succmsg').html(err_lang_arr['cus_changepass_check_success']);
                setTimeout(function() {
                    $("#changeerrormsg").hide();
                    //$("#oldpassword").val('');
                    $("#newpassword").val('');
                    $("#retypepassword").val('');
                }, 2000);
            }
        });
        return false;
    }
}
//-------------------------------------------------------------------------------------------------
//Customer Profile Update
function customerUpdateProfile() {

    var err_lang_arr = error_language();

    var firstname = $.trim($("#firstname").val());
    var lastname = $.trim($("#lastname").val());
    //var customerstreet   = $.trim($("#customerstreet").val());
    var customeremail = $.trim($("#customeremail").val());
    var customerphone = $.trim($("#customerphone").val());
    var customer_company_name = $.trim($("#customer_company_name").val());
    //var customerlandline = $("#customerlandline").val();

    if (firstname == '') {
        $("#profileerrormsg").addClass('errormsg').html(err_lang_arr['cus_profile_update_name']);
        $("#firstname").focus();
        return false;
    }
    if (lastname == '') {
        $("#profileerrormsg").addClass('errormsg').html(err_lang_arr['cus_profile_update_lastname']);
        $("#lastname").focus();
        return false;
    }
    /*if(customerstreet == ''){
    	$("#profileerrormsg").addClass('errormsg').html(err_lang_arr['cus_profile_update_street']);
    	$("#customerstreet").focus();
    	return false;
    }*/
    if (customeremail == '') {
        $("#profileerrormsg").addClass('errormsg').html(err_lang_arr['cus_profile_update_email']);
        $("#customeremail").focus();
        return false;
    }
    if (customerphone == '') {
        $("#profileerrormsg").addClass('errormsg').html(err_lang_arr['cus_profile_update_phone']);
        $("#customerphone").focus();
        return false;
    }
    if (customerphone != '') {
        if (isNaN(customerphone)) {
            $("#profileerrormsg").addClass('errormsg').html(err_lang_arr['cus_profile_update_phonenocheck']);
            $("#customerphone").focus();
            return false;
        } else if (customerphone < 10) {
            $("#profileerrormsg").addClass('errormsg').html(err_lang_arr['cus_profile_update_phonenoless']);
            $("#customerphone").focus();
            return false;
        }
    }
    var customer_cvr_number = '';
    var customer_ean_number = '';
    if ($('#account_type').val() == 'company') {
        customer_cvr_number = $.trim($("#customer_cvr_number").val());
        customer_ean_number = $.trim($("#customer_ean_number").val());
        if (customer_company_name == '') {
            $("#profileerrormsg").addClass('errormsg').html('Please enter company name');
            $("#customer_company_name").focus();
            return false;
        }
    }
    //$.post('ajaxFile.php',{"firstname":firstname, "lastname":lastname, "customerstreet":customerstreet,"customeremail":customeremail,"customerphone":customerphone,"action":"customerUpdateProfile"},function(response){
    $.post('ajaxFile.php', {
        "firstname": firstname,
        "lastname": lastname,
        "customeremail": customeremail,
        "customerphone": customerphone,
        "customer_company_name": customer_company_name,
        "customer_cvr_number": customer_cvr_number,
        "customer_ean_number": customer_ean_number,
        "action": "customerUpdateProfile"
    }, function(response) {
        //alert(response);
        if (response == 'success') {
            $("#profileerrormsg").removeClass('errormsg');
            $("#profilesuccessmsg").html(err_lang_arr['cus_profile_update_success']);
            setTimeout(function() {
                $("#profilesuccessmsg").hide();
            }, 2000);
        } else {
            $("#profileerrormsg").addClass('errormsg').html(response);
        }
    });
}
//---------------------------------------------------------------------------------------------
//Update Customer Primary Address
function customerUpdatePrimaryAddress() {
    var err_lang_arr = error_language();
    var doornumber = $.trim($("#doornumber").val());
    var customer_street = $.trim($("#customer_street").val());
    //var street   	= $.trim($("#street").val());
    //var landmark 	= $.trim($("#landmark").val());
    var customer_city = $.trim($("#customer_city").val());
    var customer_zip = $.trim($("#customer_zip").val());
    var landline = $.trim($("#landline").val());

    $(".errormsg").html('');

    if (customer_street == '') {
        $("#primaryerrormsg").addClass('errormsg').html(err_lang_arr['cus_profile_update_street']);
        $("#customer_street").focus();
        return false;
    }
    /*if(doornumber == ''){
    	$("#primaryerrormsg").addClass('errormsg').html(err_lang_arr['cus_addressbook_update_doorno']);
    	$("#doornumber").focus();
    	return false;
    }*/
    /*if(street == ''){
    	$("#primaryerrormsg").addClass('errormsg').html(err_lang_arr['cus_addressbook_update_street']);
    	$("#street").focus();
    	return false;
    }*/

    if (customer_zip == '') {
        $("#primaryerrormsg").addClass('errormsg').html(err_lang_arr['cus_reg_empty_zip']);
        $("#customer_zip").focus();
        return false;
    }
    if (customer_city == '') {
        $("#primaryerrormsg").addClass('errormsg').html(err_lang_arr['cus_addressbook_update_city']);
        $("#customer_city").focus();
        return false;
    }
    if (landline != '') {
        if (isNaN(landline)) {
            $("#primaryerrormsg").addClass('errormsg').html(err_lang_arr['cus_addressbook_update_landline']);
            $("#landline").focus();
            return false;
        }
    }

    if (document.getElementById('customer_termscond').checked == true) {
        var customer_termscond = 'Yes';
    } else {
        var customer_termscond = 'No';
    }

    if (document.getElementById('customer_sms').checked == true) {
        var customer_sms = 'Yes';
    } else {
        var customer_sms = 'No';
    }

    if (document.getElementById('customer_mail').checked == true) {
        var mail_opt = 'Yes';
    } else {
        var mail_opt = 'No';
    }

    var emailperformance = $("[name=email_performance]:checked").val();

    /*alert(customer_termscond);
    alert(customer_sms);
    alert(mail_opt);*/

    //$.post('ajaxFile.php',{"doornumber":doornumber,"street":street,"city":city, "zip":zip, "landmark":landmark,"landline":landline,"mail_opt":mail_opt,"customer_sms":customer_sms,"customer_termscond":customer_termscond,"action":"customerUpdatePrimary"},function(response){

    //$.post(jssitebaseUrl+'/ajaxFile.php',{"doornumber":doornumber,"customer_city":customer_city, "customer_zip":customer_zip, "landline":landline,"mail_opt":mail_opt,"customer_sms":customer_sms,"customer_termscond":customer_termscond,"emailperformance":emailperformance,"action":"customerUpdatePrimary"},function(response){
    $.post(jssitebaseUrl + '/ajaxFile.php', {
        "doornumber": doornumber,
        "customer_street": customer_street,
        "customer_city": customer_city,
        "customer_zip": customer_zip,
        "landline": landline,
        "mail_opt": mail_opt,
        "customer_sms": customer_sms,
        "customer_termscond": customer_termscond,
        "emailperformance": emailperformance,
        "action": "customerUpdatePrimary"
    }, function(response) {
        //alert(response);
        if (response == 'success') {
            $("#primarysuccessmsg").html(err_lang_arr['cus_addressbook_update_success']);
            setTimeout(function() {
                $("#primarysuccessmsg").hide();
            }, 2000);
        }
    });
}
//---------------------------------------------------------------------------------------------
//Update Customer Primary Address
function customerUpdateSecondaryAddress() {

    var err_lang_arr = error_language();

    var secondaryname = $("#secname").val();
    var secondaryaddress = $("#secaddress").val();
    var secondarystreet = $("#secstreet").val();
    var secondarylandmark = $("#seclandmark").val();
    var secondarycity = $("#seccity").val();
    var secondarycellphone = $("#seccellphone").val();
    var secondarylandline = $("#seclandline").val();

    $(".errormsg").html('');
    if (secondaryname == '') {
        $("#seconndaryerrormsg").addClass('errormsg').html(err_lang_arr['plz_enter_sec_customer_name']);
        $("#secondaryname").focus();
        return false;
    }
    if (secondaryaddress == '') {
        $("#seconndaryerrormsg").addClass('errormsg').html(err_lang_arr['plz_enter_sec_customer_address']);
        $("#secondaryaddress").focus();
        return false;
    }
    if (secondarystreet == '') {
        $("#seconndaryerrormsg").addClass('errormsg').html(err_lang_arr['plz_enter_sec_customer_street']);
        $("#secondarystreet").focus();
        return false;
    }
    if (secondarycity == '') {
        $("#seconndaryerrormsg").addClass('errormsg').html(err_lang_arr['plz_enter_sec_customer_city']);
        $("#secondarycity").focus();
        return false;
    }
    if (secondarycellphone == '') {
        $("#seconndaryerrormsg").addClass('errormsg').html(err_lang_arr['plz_enter_sec_customer_cell']);
        $("#secondarycellphone").focus();
        return false;
    }
    if (secondarycellphone != '') {
        if (isNaN(secondarycellphone)) {
            $("#seconndaryerrormsg").addClass('errormsg').html(err_lang_arr['plz_enter_sec_valcustomer_cell']);
            $("#secondarycellphone").focus();
            return false;
        } else if (secondarycellphone < 10) {
            $("#seconndaryerrormsg").addClass('errormsg').html(err_lang_arr['plz_enter_sec_val_customer_1']);
            $("#secondarycellphone").focus();
            return false;
        }
    }
    if (secondarylandline != '') {
        if (isNaN(secondarylandline)) {
            $("#seconndaryerrormsg").addClass('errormsg').html(err_lang_arr['plz_enter_sec_landline_number']);
            $("#secondarylandline").focus();
            return false;
        }
    }

    $.post('ajaxFile.php', {
        "secondaryname": secondaryname,
        "secondaryaddress": secondaryaddress,
        "secondarystreet": secondarystreet,
        "secondarylandmark": secondarylandmark,
        "secondaryarea": secondaryarea,
        "secondarycity": secondarycity,
        "secondarycellphone": secondarycellphone,
        "secondarylandline": secondarylandline,
        "action": "customerUpdateSecondary"
    }, function(response) {
        //alert(response);
        if (response == 'success') {
            $("#secondarysuccessmsg").html(err_lang_arr['sec_address_has_been_update']);
            setTimeout(function() {
                $("#secondarysuccessmsg").hide();
            }, 2000);
        }
    });
}
//---------------------Member validation--------------//
function refreshTab() {
    var $link = $('li.active a[data-toggle="tab"]');
    $link.parent().removeClass('active');
    var tabLink = $link.attr('href');
    $('#mainTabs a[href="' + tabLink + '"]').tab('show');
}

function addMember() {
    var phone = $('.member_phone input#phone').val();
    var name = $('.member_name input#member_name').val();
    var validPhone = /^([0-9]{2} ){3}[0-9]{2}$/;
    if (phone == '') {
        $(".member_phone > #membererrormsg").html("Enter phone number");
        $('.member_phone input#phone').focus();
        return false;
    }
    if (name == '') {
        $(".member_name > #membererrormsg").html("Enter member name");
        $('.member_name input#member_name').focus();
        return false;
    }
    //if(phone.match(validPhone)) {
    $.post('ajaxFile.php', {
        "phone": phone,
        "name": name,
        "action": "addMember"
    }, function(response) {
        //alert(response);
        if (response == 'success') {
            $("#membersuccessmsg").html("New member added");
            setTimeout(function() {
                $("#membersuccessmsg").hide();
                window.location.reload();
            }, 2000);
        } else {
            $('#membererrormsg').text(response);
        }
    });
    //} else {
    //	$('#membererrormsg').text('Invalid phone number');
    //}
}

function delete_member(member_id) {
    $.post('ajaxFile.php', {
        "phone_id": member_id,
        "action": "deleteMember"
    }, function(response) {
        //alert(response);
        if (response == 'success') {
            $("#membersuccessmsg").html("Member Deleted");
            setTimeout(function() {
                $("#membersuccessmsg").hide();
                window.location.reload();
            }, 2000);
        } else {
            $('#membererrormsg').text(response);
        }
    });
}
//------------------------------------------------------------------------------------------------------
function showFilterOrder() {

    var keywords = $('#order_search_text').val();
    var filter = $('#order_filter_dropdown').val();
    $('#myOrderHistoryFilter').html('<div class="addtocartloading"><img src="' + jssitebaseUrl + '/images/loader.gif" border="0" alt="Loading" /><span>Please wait...</span></div>').show();
    $("#myOrderHistoryFilter").load(jssitebaseUrl + "/ajaxAction.php?action=filterOrderMyAccount&filter=" + filter + "&keywords=" + keywords);
}

function closeOrderViewFullDetails() {
    $('#customer_myorderview_content').removeClass('cd-panel--is-visible');
}
//Order View Full details
function orderViewFullDetails(orderid) {



    $('#customer_myorder').removeClass("active");
    $('#customer_myorder').removeClass("in");
    //$('#order_filter').hide();
    //$('#customer_myorderview_content').show();
    $('#customer_myorderview_content').addClass('cd-panel--is-visible');
    $('#customer_myorderview_content').html('<div class="addtocartloading"><img src="' + jssitebaseUrl + '/images/loader.gif" border="0" alt="Loading" /><span>Please wait...</span></div>').show();
    $("#customer_myorderview_content").load(jssitebaseUrl + "/ajaxAction.php?action=orderFullDetails&orderid=" + orderid);

}
//------------------------------------------------------------------------------------------
//Back To Order History
//------------------------------------------------------------------------------------------
//Order View Full details
function backToOrderHistory() {
    $('#customer_myorder').addClass("active");
    $('#customer_myorder').addClass("in");
    $('#customer_myorderview_content').hide();
}
//------------------------------------------------------------------------------------------------------
//Customer Reviews
function customerReviews(orderid, resid) {

    var err_lang_arr = error_language();
    $(".orderid").val(orderid);
    $(".resid").val(resid);

    $.post('ajaxFile.php', {
        "orderid": orderid,
        "resid": resid,
        "action": "customerReviewsCheck"
    }, function(response) {

        if (response == '0') {
            //myPopupWindowOpen('#customerReviewsPop','#maska');
        } else {
            alert(err_lang_arr['already_review_posted_this']);
            return false;
        }
    });

}

function customerReviewsSubmit() {

    var err_lang_arr = error_language();

    if (document.getElementById("rating-1").checked == true) {
        var rating = $.trim($("#rating-1").val());
    } else if (document.getElementById("rating-2").checked == true) {
        var rating = $.trim($("#rating-2").val());
    } else if (document.getElementById("rating-3").checked == true) {
        var rating = $.trim($("#rating-3").val());
    } else if (document.getElementById("rating-4").checked == true) {
        var rating = $.trim($("#rating-4").val());
    } else if (document.getElementById("rating-5").checked == true) {
        var rating = $.trim($("#rating-5").val());
    } else {
        $("#errormsg").addClass('errormsg').html(err_lang_arr['please_select_rating']);
        document.customer_review.rating[0].focus();
        return false;
    }
    var message = $("#ratingmessage").val();
    var orderid = $(".orderid").val();
    var resid = $(".resid").val();

    $("#errormsg").html('');

    if (message == '') {
        $("#errormsg").addClass('errormsg').html(err_lang_arr['please_enter_your_msg']).show();
        $("#ratingmessage").focus();
        return false;
    }
    if (message != '') {
        $.post(jssitebaseUrl + '/ajaxFile.php', {
            'rating': rating,
            'message': message,
            'orderid': orderid,
            'resid': resid,
            'action': 'customerReviews'
        }, function(output) {
            //alert(output);
            if (output == 'success') {
                $("#errormsg").addClass('succmsg').html(err_lang_arr['your_review_has_been_sent_suc']).show();
                setTimeout(function() {
                    $("#customerReviewsPop").modal("hide");
                    $('.modal-backdrop').remove();
                    $("#errormsg").hide();
                    $("#rating-1").attr('checked', false);
                    $("#rating-2").attr('checked', false);
                    $("#rating-3").attr('checked', false);
                    $("#rating-4").attr('checked', false);
                    $("#rating-5").attr('checked', false);
                    $("#ratingmessage").val('');
                }, 2000);
            }
        });
    }
    return false;
}
//--------------------------------------------------------------------------------
//customer favorite delete
function changeStatusOptionFav(chgeval, mid, chgestatus) {

    //Error Language
    var err_lang_arr = error_language();

    if (chgeval == 'delete') {
        var str = err_lang_arr['cusfav_sure_want_delete'];
    }

    if (confirm(str)) {

        $(".favoriteListDetails").load(jssitebaseUrl + "/ajaxAction.php?action=customerFavStatus", {
            'chgeval': chgeval,
            'mid': mid,
            'chgestatus': chgestatus
        });
    }
}

//---------------For Myaccount-------------------------
//Get Show Zip
function getZipListCust(cid) {
    //alert("sri");
    // alert(cid);

    $('#showResZipList').html('<div class="loaderveg"><img src="' + jssitebaseUrl + '/images/loader_veg.gif" border="0" alt="Loading" />&nbsp;Please wait...</div>');
    $('#showResZipList').load(jssitebaseUrl + "/ajaxActionRestaurant.php?cid=" + cid + "&action=showCustZipList", {});
    /*req.onreadystatechange = function(){
		
    	if (req.readyState == 4){
		 	if (req.status == 200){
		 		//alert(req.responseText);
		    	document.getElementById('showResZipList').innerHTML=req.responseText;
		 	}else {
	   	   		$.prompt("There was a problem while using XMLHTTP:\n" + req.statusText);
		 	}
      	}
	}
   	req.open("GET", jssitebaseUrl+"/ajaxActionRestaurant.php?cid="+cid+"&action=showCustZipList", true);
   	req.send(null);*/


}
//Get Show City
function getCityListCust(zid) {
    //alert("sri");
    // alert(zid);
    $('#showResCityList').html('<div class="loaderveg"><img src="' + jssitebaseUrl + '/images/loader_veg.gif" border="0" alt="Loading" />&nbsp;Please wait...</div>');
    $('#showResCityList').load(jssitebaseUrl + "/ajaxActionRestaurant.php?zid=" + zid + "&action=showCustCityList", {});

    /*
	req.onreadystatechange = function(){
		
    	if (req.readyState == 4){
		 	if (req.status == 200){
		 		//alert(req.responseText);
		    	document.getElementById('showResCityList').innerHTML=req.responseText;
		 	}else {
	   	   		$.prompt("There was a problem while using XMLHTTP:\n" + req.statusText);
		 	}
      	}
	}
   	req.open("GET", jssitebaseUrl+"/ajaxActionRestaurant.php?zid="+zid+"&action=showCustCityList", true);
   	req.send(null);*/


}

//---------------For Register-------------------------
//get zip list for customer register
function getZipListCustRegister(cid) {
    //alert("sri");
    // alert(cid);

    $('#showResZipList').html('<div class="loaderveg"><img src="' + jssitebaseUrl + '/images/loader_veg.gif" border="0" alt="Loading" />&nbsp;Please wait...</div>');
    $('#showResZipList').load(jssitebaseUrl + "/ajaxActionRestaurant.php?cid=" + cid + "&action=showCustZipList&custReg=1", {});

    /*req.onreadystatechange = function(){

        if (req.readyState == 4){
            if (req.status == 200){
                //alert(req.responseText);
                document.getElementById('showResZipList').innerHTML=req.responseText;
            }else {
                $.prompt("There was a problem while using XMLHTTP:\n" + req.statusText);
            }
        }
    }
    req.open("GET", jssitebaseUrl+"/ajaxActionRestaurant.php?cid="+cid+"&action=showCustZipList&custReg=1", true);
    req.send(null);*/


}

//get City list for customer register
function getCityListCustRegister(zid) {
    //alert("sri");
    // alert(zid);

    $('#signupPopup #showResCityList').html('<div class="loaderveg"><img src="' + jssitebaseUrl + '/images/loader_veg.gif" border="0" alt="Loading" />&nbsp;Please wait...</div>');
    $('#signupPopup #showResCityList').load(jssitebaseUrl + "/ajaxActionRestaurant.php?zid=" + zid + "&action=showCustCityList&custReg=1", {});
    /* req.onreadystatechange = function(){

         if (req.readyState == 4){
             if (req.status == 200){
                 //alert(req.responseText);
                 document.getElementById('showResCityList').innerHTML=req.responseText;
             }else {
                 $.prompt("There was a problem while using XMLHTTP:\n" + req.statusText);
             }
         }
     }
     req.open("GET", jssitebaseUrl+"/ajaxActionRestaurant.php?zid="+zid+"&action=showCustCityList&custReg=1", true);
     req.send(null);*/


}

function reorder_same(orderid) {

    //Error Language
    var err_lang_arr = error_language();

    if (orderid != '') {
        if (confirm(err_lang_arr['res_myaccount_sure_want_to_reorder'])) {
            if (jssiteuserfriendly == 'Y')
                window.location = jssitebaseUrl + '/reorder/' + orderid;
            else
                window.location = jssitebaseUrl + '/reorder_same.php?orderid=' + orderid;

        }
    }
}