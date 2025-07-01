
//#region otp
function initOtpPage() {
	RefillFormDataOtpPage();
	
	if (!eventFlag.otp) {
		$("#dateOfBirth").datepicker();
		$("#dateOfBirth").datepicker("option", "maxDate", '+0m +0w');
		$("#dateOfBirth").datepicker("option", "dateFormat", 'dd/mm/yy');

		$(document).on('click', '#getOtpBtn', function () {
			GetOtpCode();
		}); 
		$(document).on('click', '#getOtpBtnPhone', function () {
			GetOtpCode();
		});

		$(document).on('click', '#verifyOtpAndGoNextBtn', function () {
			VerifyOtp();
		});
		
		eventFlag.otp = true;
	}

	var queryparams = window.location.search;

	if (queryparams && typeof (queryparams) === "string" && queryparams.length > 0) {
		var urlParams = new URLSearchParams(window.location.search);
		var promoCode = urlParams.get('PromoCode');
		$('#promoCode').val(promoCode);
	}
}

function GetOtpCode() {
	const obj = new Object({
		data: {
			id: null,
			birthday: null,
			mobileNo: null
		},
		isValid: true
	});
	if ($("#idNumber").val() === "" || !IsPatternValid("idNumber")) {
		obj.isValid = false;
		if (!$("#idNumber").hasClass('is-invalid')) {
			$("#idNumber").toggleClass('is-invalid');
		}
	} else {
		obj.data.id = $("#idNumber").val();
		$("#idNumber").removeClass('is-invalid');
	}
	if ($("#dateOfBirth").val() === "") {
		obj.isValid = false;
		if (!$("#dateOfBirth").hasClass('is-invalid')) {
			$("#dateOfBirth").toggleClass('is-invalid');
		}
	} else {
		obj.data.birthday = $("#dateOfBirth").val();
		$("#dateOfBirth").removeClass('is-invalid');
	}
	if ($("#phoneNumber").val() === "" || !IsPatternValid("phoneNumber")) {
		obj.isValid = false;
		if (!$("#phoneNumber").hasClass('is-invalid')) {
			$("#phoneNumber").toggleClass('is-invalid');
		}
	} else {
		obj.data.mobileNo = "0" + $("#phoneNumber").val();
		$("#phoneNumber").removeClass('is-invalid');
	}
	if (obj.isValid) {
		// get otp code
		$.ajax({
			type: "POST",
			url: '/Otp/GetOtp',
			data: JSON.stringify(obj.data),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				if (data.isSuccess) {
					$("#verifyCode").prop('disabled', false);
					alert("OTP Message was sent to your phone.");
					var pac = data?.content;
					if ($("#otpPac").hasClass("d-none")) {
						$("#otpPac").removeClass('d-none');
					}
					$("#otpPac").text(pac + "-");
					$("#verifyCode").focus();
				} else {
					alert("Error: " + data.errorMsg);
				}
			},
			error: function (xhr, textStatus) {
				alert(xhr.responseText);
			}
		});
	}
}

function VerifyOtp() {
	const obj = new Object({
		data: {
			id: null,
			birthday: null,
			mobileNo: null,
			referralCode: null,
			otpCode: null,
			promoCode: null
		},
		isValid: true
	});
	if ($("#confirm").is(":checked") === false) {
		alert("The agreement should be confirmed before submit.");
		return;
	}
	if ($("#idNumber").val() === "" || !IsPatternValid("idNumber")) {
		obj.isValid = false;
		if (!$("#idNumber").hasClass('is-invalid')) {
			$("#idNumber").toggleClass('is-invalid');
		}
	} else {
		obj.data.id = $("#idNumber").val();
		$("#idNumber").removeClass('is-invalid');
	}
	if ($("#dateOfBirth").val() === "") {
		obj.isValid = false;
		if (!$("#dateOfBirth").hasClass('is-invalid')) {
			$("#dateOfBirth").toggleClass('is-invalid');
		}
	} else {
		obj.data.birthday = $("#dateOfBirth").val();
		$("#dateOfBirth").removeClass('is-invalid');
	}
	if ($("#phoneNumber").val() === "" || !IsPatternValid("phoneNumber")) {
		obj.isValid = false;
		if (!$("#phoneNumber").hasClass('is-invalid')) {
			$("#phoneNumber").toggleClass('is-invalid');
		}
	} else {
		obj.data.mobileNo = $("#phoneNumber").val();
		$("#phoneNumber").removeClass('is-invalid');
	}
	if (($("#referralCode").val() !== "" && $("#referralCode").val().length < 10)) {
		obj.isValid = false;
		if (!$("#referralCode").hasClass('is-invalid')) {
			$("#referralCode").toggleClass('is-invalid');
		}
	} else {
		obj.data.referralCode = $("#referralCode").val();
		$("#referralCode").removeClass('is-invalid');
	}
	if ($("#verifyCode").val() === "" || !IsPatternValid("verifyCode")) {
		obj.isValid = false;
		if (!$("#verifyCode").hasClass('is-invalid')) {
			$("#verifyCode").toggleClass('is-invalid');
		}
	} else {
		obj.data.otpCode = $("#verifyCode").val();
		$("#verifyCode").removeClass('is-invalid');
	}

	if (obj.isValid) {
		// verify otp code
		$.ajax({
			type: "POST",
			url: '/Otp/Verify',
			data: JSON.stringify(obj.data),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				if (data.isSuccess) {
					NextStepToFormFillPage();
				} else {
					alert("Error: " + data.errorMsg);
				}
			},
			error: function (xhr, textStatus) {
				alert(xhr.responseText);
			}
		});
	}

}

function NextStepToFormFillPage() {
	ApplyOnlineModel.identity = {
		idNumber: $("#idNumber").val(),
		dateOfBirth: $("#dateOfBirth").val(),
		phoneNumber: $("#phoneNumber").val(),
		referralCode: $("#referralCode").val(),
		promoCode: $("#promoCode").val()
	}
	HideOtpNShowFormFillPage();
}

function HideOtpNShowFormFillPage() {
	$.ajax({
		type: "GET",
		url: '/personal/apply-online-form-fill',
		success: function (data) {
			$('#stepOtp').hide();
			$('#stepFormFill').show();
			$('#stepFormFill').html(DOMPurify.sanitize(data));

			initFormFillPage();
		},
		error: function (xhr, textStatus) {
			alert(xhr.responseText);
		}
	});
}

function RefillFormDataOtpPage() {
	if (ApplyOnlineModel.identity !== null) {
		$("#idNumber").val(ApplyOnlineModel.identity.idNumber);
		$("#dateOfBirth").val(ApplyOnlineModel.identity.dateOfBirth);
		$("#phoneNumber").val(ApplyOnlineModel.identity.phoneNumber);
		$("#referralCode").val(ApplyOnlineModel.identity.referralCode);
		$("#promoCode").val(ApplyOnlineModel.identity.promoCode);
	}
}

function IsPatternValid(elementId) {
	var pattern = $("#" + elementId).attr('pattern');
	var exp = new RegExp(pattern);
	return exp.test($("#" + elementId).val())
}
//#endregion
