//#region form fill
function initPaymentMethod() {
	RefillFormDataPaymentMethod();
	if (!eventFlag.paymentMethod) {
		$(document).on('click', '#goPrevToFilesUploadBtn', function () {
			PreviousStepToFilesUpload();
		});
	
		$(document).on('click', '#goNextToTermsPageBtn', function () {
			NextStepToTermsPage();
		});

		eventFlag.paymentMethod = true;
	}

}

function RefillFormDataPaymentMethod() {
	if (!!ApplyOnlineModel?.paymentMethod) {
		if (ApplyOnlineModel.paymentMethod.method === 'Full Payment') {
			$("#fullPayment").prop("checked", true);
		}
		if (ApplyOnlineModel.paymentMethod.method === 'Minimun Payment') {
			$("#minimunPayment").prop("checked", true);
		}
		$("#accountNo").val(ApplyOnlineModel.paymentMethod.accountNo);
	}
}

function PreviousStepToFilesUpload() {
	HidePaymentMethodNShowFilesUploadPage();
}

function NextStepToTermsPage() {
	const obj = new Object({
		data: {
			method: null,
			accountNo: null,
		},
		isValid: true
	});
	obj.data.method = $('input[name="paymentMethod"]:checked').val();
	
	if ($("#accountNo").val() !== "" && !IsPatternValid("accountNo")) {
		obj.isValid = false;
		if (!$("#accountNo").hasClass('is-invalid')) {
			$("#accountNo").toggleClass('is-invalid');
		}
	} else {
		obj.data.accountNo = $("#accountNo").val();
		$("#accountNo").removeClass('is-invalid');
	}

	if (obj.isValid) {
		ApplyOnlineModel.paymentMethod = {
			method: obj.data.method,
			accountNo: obj.data.accountNo,
		}
		HidePaymentMethodNShowTermsPage();
	} else {
		alert("Please check one of payment methods or input the account number field.")
	}
}

function HidePaymentMethodNShowFilesUploadPage() {
	$.ajax({
		type: "GET",
		url: '/personal/apply-online-files-upload',
		success: function (data) {
			$('#stepPaymentMethod').hide();
			$('#stepFilesUpload').show();
			$('#stepFilesUpload').html(DOMPurify.sanitize(data));
			initFilesUpload();
		},
		error: function (xhr, textStatus) {
			alert(xhr.responseText);
		}
	});
}

function HidePaymentMethodNShowTermsPage() {
	$('#stepPaymentMethod').hide();
	$('#stepTerms').show();
	initTermsPage();

	// $.ajax({
	// 	type: "GET",
	// 	url: '/personal/apply-online-terms',
	// 	success: function (data) {
	// 		$('#stepPaymentMethod').hide();
	// 		$('#stepTerms').show();
	// 		initTermsPage();
	// 	},
	// 	error: function (xhr, textStatus) {
	// 		alert(xhr.responseText);
	// 	}
	// });
}

//#endregion
