
//#region form fill
function initFilesUpload() {
	RefillFormDataFilesUpload();

	if (!eventFlag.filesUpload) {
		$(document).on('click', '#goPrevToFormFillBtn', function () {
			PreviousStepToFormFill();
		});

		$(document).on('click', '#goNextToPaymentMethodPageBtn', function () {
			NextStepToPaymentMethodPage();
		});

		eventFlag.filesUpload = true;
	}

	$('#idPassport').on('change', function () {
		var file = this.files[0];
		CheckFileLegal(file, 'idPassport', handleUploadedFile);
	});

	$('#selfiePhoto').on('change', function () {
		var file = this.files[0];
		CheckFileLegal(file, 'selfiePhoto', handleUploadedFile);
	});

	$('#salaryValidation').on('change', function () {
		var file = this.files[0];
		CheckFileLegal(file, 'salaryValidation', handleUploadedFile);
	});


	$(document).on('click', '#goPrevToFormFillBtn', function () {
		PreviousStepToFormFill();
	});

	$(document).on('click', '#goNextToPaymentMethodPageBtn', function () {
		NextStepToPaymentMethodPage();
	});
}

function handleUploadedFile(file, id) {
	$("#" + id + "_name").html(file.name);
	if (!$("#" + id + "_name").hasClass('is-uploaded')) {
		$("#" + id + "_name").toggleClass('is-uploaded');
	}
}

function RefillFormDataFilesUpload() {
	if (!!ApplyOnlineModel.fileUpload) {
		$("#idPassport_name").html(ApplyOnlineModel.fileUpload.idPassport.name);
		$("#idPassport_name").toggleClass('is-uploaded');
		$("#selfiePhoto_name").html(ApplyOnlineModel.fileUpload.selfiePhoto.name);
		$("#selfiePhoto_name").toggleClass('is-uploaded');
		$("#salaryValidation_name").html(ApplyOnlineModel.fileUpload.salaryValidation.name);
		$("#salaryValidation_name").toggleClass('is-uploaded');
		$("#salaryValidationType").val(ApplyOnlineModel.fileUpload.salaryValidationType);
	}
}

function CheckFileLegal(file, id, callback) {
	// check file size
	if (!CheckFileSizeIsSmallerThenXMB(1.5, file.size)) {
		alert('File size should be smaller than 1.5 MB.')
		$('#' + id).val(null);
		$("#" + id + "_name").html(null);
		return;
	}

	// check file code
	var data = new FormData();
	data.append('uploadFile', file);
	$.ajax({
		type: "POST",
		url: '/Personal/CheckFile',
		data: data,
		dataType: "json",
		contentType: false,
		processData: false,
		cache: false,
		success: function (data) {
			if (data.result) {
				callback(file, id);
			} else {
				alert('File is illegal to upload');
				$('#' + id).val(null);
				$("#" + id + "_name").html(null);
			}
		}
	});
}

function CheckFileSizeIsSmallerThenXMB(x, size) {
	return size <= x * 1024 * 1024;
}

function PreviousStepToFormFill() {
	HideFilesUploadNShowFormFillPage();
}

function NextStepToPaymentMethodPage() {
	const obj = new Object({
		data: {
			idPassport: null,
			selfiePhoto: null,
			salaryValidation: null,
			salaryValidationType: null
		},
		isValid: true
	});
	if ($("#idPassport").val() === "" && ApplyOnlineModel.fileUpload?.idPassport === null) {
		obj.isValid = false;
		if (!$("#idPassport").hasClass('is-invalid')) {
			$("#idPassport").toggleClass('is-invalid');
		}
	} else {
		obj.data.idPassport = $("#idPassport").val();
		$("#idPassport").removeClass('is-invalid');
	}
	if ($("#selfiePhoto").val() === "" && ApplyOnlineModel.fileUpload?.selfiePhoto === null) {
		obj.isValid = false;
		if (!$("#selfiePhoto").hasClass('is-invalid')) {
			$("#selfiePhoto").toggleClass('is-invalid');
		}
	} else {
		obj.data.selfiePhoto = $("#selfiePhoto").val();
		$("#selfiePhoto").removeClass('is-invalid');
	}
	if ($("#salaryValidation").val() === "" && ApplyOnlineModel.fileUpload?.salaryValidation === null) {
		obj.isValid = false;
		if (!$("#salaryValidation").hasClass('is-invalid')) {
			$("#salaryValidation").toggleClass('is-invalid');
		}
	} else {
		obj.data.salaryValidation = $("#salaryValidation").val();
		$("#salaryValidation").removeClass('is-invalid');
	}
	if ($("#salaryValidationType").val() === "") {
		obj.isValid = false;
		if (!$("#salaryValidationType").hasClass('is-invalid')) {
			$("#salaryValidationType").toggleClass('is-invalid');
		}
	} else {
		obj.data.salaryValidation = $("#salaryValidationType").val();
		$("#salaryValidationType").removeClass('is-invalid');
	}


	if (obj.isValid) {
		ApplyOnlineModel.fileUpload = {
			idPassport: $("#idPassport").get(0).files[0] || ApplyOnlineModel.fileUpload.idPassport,
			selfiePhoto: $("#selfiePhoto").get(0).files[0] || ApplyOnlineModel.fileUpload.selfiePhoto,
			salaryValidation: $("#salaryValidation").get(0).files[0] || ApplyOnlineModel.fileUpload.salaryValidation,
			salaryValidationType: $("#salaryValidationType").val()
		}

		HideFilesUploadNPaymentUploadPage();
	} else {
		alert("Please check the input fields with red border.")
	}
}

function HideFilesUploadNShowFormFillPage() {
	$.ajax({
		type: "GET",
		url: '/personal/apply-online-form-fill',
		success: function (data) {
			$('#stepFilesUpload').hide();
			$('#stepFormFill').show();
			$('#stepFormFill').html(DOMPurify.sanitize(data));
			initFormFillPage();
		},
		error: function (xhr, textStatus) {
			alert(xhr.responseText);
		}
	});
}

function HideFilesUploadNPaymentUploadPage() {
	$.ajax({
		type: "GET",
		url: '/personal/apply-online-payment-method',
		success: function (data) {
			$('#stepFilesUpload').hide();
			$('#stepPaymentMethod').show();
			$('#stepPaymentMethod').html(DOMPurify.sanitize(data));
			initPaymentMethod();
		},
		error: function (xhr, textStatus) {
			alert(xhr.responseText);
		}
	});
}

//#endregion
