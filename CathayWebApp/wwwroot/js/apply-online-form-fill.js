
//#region form fill
function initFormFillPage() {
	RefillFormDataFormFillPage();

	if (!eventFlag.formFill) {
		$(document).on('click', '#goPrevToOtpPageBtn', function () {
			PreviousStepToOtpPage();
		});

		$(document).on('click', '#goNextToFileUploadPageBtn', function () {
			NextStepToFileUploadPage();
		});

		eventFlag.formFill = true;
	}

	$('#position').on('change', function () {
		if (this.value == "Other") {
			$('#positionOther').prop('disabled', false);
		} else {
			$('#positionOther').val("");
			$('#positionOther').prop('disabled', true);
		}
	});

	$('#residentialPropertyType').on('change', function () {
		if (this.value == "Other") {
			$('#residentialPropertyTypeOther').prop('disabled', false);
		} else {
			$('#residentialPropertyTypeOther').val("");
			$('#residentialPropertyTypeOther').prop('disabled', true);
		}
	});

	$('#companyType').on('change', function () {
		if (this.value == "Other") {
			$('#companyTypeOther').prop('disabled', false);
		} else {
			$('#companyTypeOther').val("");
			$('#companyTypeOther').prop('disabled', true);
		}
	});

	$('#serviceType').on('change', function () {
		if (this.value == "Other") {
			$('#serviceTypeOther').prop('disabled', false);
		} else {
			$('#serviceTypeOther').val("");
			$('#serviceTypeOther').prop('disabled', true);
		}
	});

	$('#relationship').on('change', function () {
		if (this.value == "Other") {
			$('#relationshipOther').prop('disabled', false);
		} else {
			$('#relationshipOther').val("");
			$('#relationshipOther').prop('disabled', true);
		}
	});

	$('#province').on('change', function () {
		// 清空下面階層的資料
		$('#district').empty();
		$('#commune').empty();
		const obj = {
			type: 1,
			parentCode: this.value
		}
		if (this.value !== "") {
			GetAddressData(obj, '');
		}
	});

	$('#district').on('change', function () {
		// 清空下面階層的資料
		$('#commune').empty();
		const obj = {
			type: 2,
			parentCode: this.value
		}
		GetAddressData(obj, '');
	});

	$('#companyprovince').on('change', function () {
		// 清空下面階層的資料
		$('#companydistrict').empty();
		$('#companycommune').empty();
		const obj = {
			type: 1,
			parentCode: this.value
		}
		if (this.value !== "") {
			GetAddressData(obj, 'company');
		}
	});

	$('#companydistrict').on('change', function () {
		// 清空下面階層的資料
		$('#companycommune').empty();
		const obj = {
			type: 2,
			parentCode: this.value
		}
		GetAddressData(obj, 'company');
	});

	$('#relativeprovince').on('change', function () {
		// 清空下面階層的資料
		$('#relativedistrict').empty();
		$('#relativecommune').empty();
		const obj = {
			type: 1,
			parentCode: this.value
		}
		if (this.value !== "") {
			GetAddressData(obj, 'relative');
		}
	});

	$('#relativedistrict').on('change', function () {
		// 清空下面階層的資料
		$('#relativecommune').empty();
		const obj = {
			type: 2,
			parentCode: this.value
		}
		GetAddressData(obj, 'relative');
	});

	$('#defaultToCurrentAddress').on('change', function () {
		if (this.checked) {
			RelativeAddressData = { ...AddressData };

			ApplyAddressData(RelativeAddressData.district, 1, 'relative');
			ApplyAddressData(RelativeAddressData.commune, 2, 'relative');

			$('#relativeprovince').val($('#province').val());
			$('#relativedistrict').val($('#district').val());
			$('#relativecommune').val($('#commune').val());
			$('#relativestreet').val($('#street').val());
			$('#relativehouseNo').val($('#houseNo').val());
		}
	})

	if (Channel) {
		$("#channel").val(Channel);
		if (Channel === 'Telegram' || Channel === 'Facebook') {
			$("#channel").prop('disabled', true);
		}
	}
	if (!AddressData.province) {
		const obj = {
			type: 0,
			parentCode: ''
		}
		GetAddressData(obj, '');
		GetAddressData(obj, 'company');
		GetAddressData(obj, 'relative');
	}
}


function RefillFormDataFormFillPage() {
	// apply address data
	if (AddressData.province !== null) {
		ApplyAddressData(AddressData.province, 0, '');
		ApplyAddressData(AddressData.district, 1, '');
		ApplyAddressData(AddressData.commune, 2, '');
	}

	if (CompanyAddressData.province !== null) {
		ApplyAddressData(CompanyAddressData.province, 0, 'company');
		ApplyAddressData(CompanyAddressData.district, 1, 'company');
		ApplyAddressData(CompanyAddressData.commune, 2, 'company');
	}

	if (RelativeAddressData.province !== null) {
		ApplyAddressData(RelativeAddressData.province, 0, 'relative');
		ApplyAddressData(RelativeAddressData.district, 1, 'relative');
		ApplyAddressData(RelativeAddressData.commune, 2, 'relative');
	}

	if (!!ApplyOnlineModel.formFill?.personalInfo) {
		$("#firstName").val(ApplyOnlineModel.formFill.personalInfo.firstName);
		$("#lastName").val(ApplyOnlineModel.formFill.personalInfo.lastName);
		$("#gender").val(ApplyOnlineModel.formFill.personalInfo.gender);
		$("#email").val(ApplyOnlineModel.formFill.personalInfo.email);
		$("#maritalStatus").val(ApplyOnlineModel.formFill.personalInfo.maritalStatus);
		$("#dependent").val(ApplyOnlineModel.formFill.personalInfo.dependent);
		$("#education").val(ApplyOnlineModel.formFill.personalInfo.education);
		$("#houseNo").val(ApplyOnlineModel.formFill.personalInfo.currentAddress.houseNo);
		$("#street").val(ApplyOnlineModel.formFill.personalInfo.currentAddress.street);
		$("#district").val(ApplyOnlineModel.formFill.personalInfo.currentAddress.district);
		$("#province").val(ApplyOnlineModel.formFill.personalInfo.currentAddress.province);
		$("#commune").val(ApplyOnlineModel.formFill.personalInfo.currentAddress.commune);

		if (ApplyOnlineModel.formFill.personalInfo.residentialPropertyType.includes('#')) {
			$('#residentialPropertyTypeOther').prop('disabled', false);
			$("#residentialPropertyTypeOther").val(ApplyOnlineModel.formFill.personalInfo.residentialPropertyType.replace('#', ''));
			$("#residentialPropertyType").val("Other");
		} else {
			$("#residentialPropertyType").val(ApplyOnlineModel.formFill.personalInfo.residentialPropertyType);
		}
	}
	if (!!ApplyOnlineModel.formFill?.employmentFinancialInfo) {
		$("#companyName").val(ApplyOnlineModel.formFill.employmentFinancialInfo.companyName);
		$("#annualIncome").val(ApplyOnlineModel.formFill.employmentFinancialInfo.annualIncome);
		$("#companyPhoneNo").val(ApplyOnlineModel.formFill.employmentFinancialInfo.companyPhoneNo);
		$("#lengthOfService").val(ApplyOnlineModel.formFill.employmentFinancialInfo.lengthOfService);
		if (ApplyOnlineModel.formFill.employmentFinancialInfo.position.includes('#')) {
			$('#positionOther').prop('disabled', false);
			$("#positionOther").val(ApplyOnlineModel.formFill.employmentFinancialInfo.position.replace('#', ''));
			$("#position").val("Other");
		} else {
			$("#position").val(ApplyOnlineModel.formFill.employmentFinancialInfo.position);
		}
		if (ApplyOnlineModel.formFill.employmentFinancialInfo.companyType.includes('#')) {
			$('#companyTypeOther').prop('disabled', false);
			$("#companyTypeOther").val(ApplyOnlineModel.formFill.employmentFinancialInfo.companyType.replace('#', ''));
			$("#companyType").val("Other");
		} else {
			$("#companyType").val(ApplyOnlineModel.formFill.employmentFinancialInfo.companyType);
		}
		if (ApplyOnlineModel.formFill.employmentFinancialInfo.serviceType.includes('#')) {
			$('#serviceTypeOther').prop('disabled', false);
			$("#serviceTypeOther").val(ApplyOnlineModel.formFill.employmentFinancialInfo.serviceType.replace('#', ''));
			$("#serviceType").val("Other");
		} else {
			$("#serviceType").val(ApplyOnlineModel.formFill.employmentFinancialInfo.serviceType);
		}
		$("#companyhouseNo").val(ApplyOnlineModel.formFill.employmentFinancialInfo.address.houseNo);
		$("#companystreet").val(ApplyOnlineModel.formFill.employmentFinancialInfo.address.street);
		$("#companydistrict").val(ApplyOnlineModel.formFill.employmentFinancialInfo.address.district);
		$("#companyprovince").val(ApplyOnlineModel.formFill.employmentFinancialInfo.address.province);
		$("#companycommune").val(ApplyOnlineModel.formFill.employmentFinancialInfo.address.commune);
	}
	if (!!ApplyOnlineModel.formFill?.familyRelativeInfo) {
		$("#relativeName").val(ApplyOnlineModel.formFill.familyRelativeInfo.relativeName);
		$("#relativeMobilePhone").val(ApplyOnlineModel.formFill.familyRelativeInfo.relativeMobilePhone);
		if (ApplyOnlineModel.formFill.familyRelativeInfo.relationship.includes('#')) {
			$('#relationshipOther').prop('disabled', false);
			$("#relationshipOther").val(ApplyOnlineModel.formFill.familyRelativeInfo.relationship.replace('#', ''));
			$("#relationship").val("Other");
		} else {
			$("#relationship").val(ApplyOnlineModel.formFill.familyRelativeInfo.relationship);
		}

		$("#relativehouseNo").val(ApplyOnlineModel.formFill.familyRelativeInfo.address.houseNo);
		$("#relativestreet").val(ApplyOnlineModel.formFill.familyRelativeInfo.address.street);
		$("#relativedistrict").val(ApplyOnlineModel.formFill.familyRelativeInfo.address.district);
		$("#relativeprovince").val(ApplyOnlineModel.formFill.familyRelativeInfo.address.province);
		$("#relativecommune").val(ApplyOnlineModel.formFill.familyRelativeInfo.address.commune);
	}
	if (!!ApplyOnlineModel.formFill?.creditCardType) {
		$("#cardType").val(ApplyOnlineModel.formFill.creditCardType.cardType);
		$("#preferBranches").val(ApplyOnlineModel.formFill.creditCardType.preferBranches);
		$("#channel").val(ApplyOnlineModel.formFill.creditCardType.applyByChannel);
	}
}

function GetAddressData(obj, prefix) {
	$.ajax({
		type: "POST",
		url: '/Address/GetAddress',
		data: JSON.stringify(obj),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (data) {
			if (data.isSuccess) {
				ApplyAddressData(data.content.items, obj.type, prefix)
			} else {
				alert("Error: " + data.errorMsg);
			}
		},
		error: function (xhr, textStatus) {
			alert(xhr.responseText);
		}
	});
}

function ApplyAddressData(items, type, prefix) {
	let id = '';
	let typeText = '';
	switch (type) {
		case 0: typeText = 'province'; break;
		case 1: typeText = 'district'; break;
		case 2: typeText = 'commune'; break;
	}
	switch (prefix) {
		case '': AddressData[typeText] = items; break;
		case 'company': CompanyAddressData[typeText] = items; break;
		case 'relative': RelativeAddressData[typeText] = items; break;
	}
	id = `#${prefix}${typeText}`;
	$(id).empty();
	$('<option>')
		.prop('selected', true)
		.val('')
		.text(`Select the ${typeText}`)
		.appendTo(id);
	// $(id).append(`<option selected value="">Select the ${typeText}</option>`);
	if (items) {
		items.forEach(function (item) {
			$('<option>')
				.val(item.code)
				.text(item.eName)
				.appendTo(id);
		})
	}
}

function PreviousStepToOtpPage() {
	HideFormFillNShowOtpPage();
}

function NextStepToFileUploadPage() {
	let obj = new Object({
		data: {
			personalInfo: {
				firstName: null,
				lastName: null,
				gender: null,
				email: null,
				maritalStatus: null,
				dependent: null,
				education: null,
				currentAddress: {
					houseNo: null,
					street: null,
					district: null,
					province: null,
					commune: null
				},
				residentialPropertyType: null
			},
			employmentFinancialInfo: {
				companyName: null,
				annualIncome: null,
				companyPhoneNo: null,
				lengthOfService: null,
				position: null,
				companyType: null,
				serviceType: null,
				address: {
					houseNo: null,
					street: null,
					district: null,
					province: null,
					commune: null
				}
			},
			familyRelativeInfo: {
				relativeName: null,
				relationship: null,
				relativeMobilePhone: null,
				address: {
					houseNo: null,
					street: null,
					district: null,
					province: null,
					commune: null
				}
			},
			creditCardType: {
				cardType: null,
				preferBranches: null,
				applyByChannel: null
			}
		},
		isValid: true
	});

	obj = { ...checkPersonalInfo(obj), ...checkEmploymentFinancialInfo(obj), ...checkFamilyRelativeInfo(obj), ...checkCreditCardType(obj) };

	// save form filled data in memory
	ApplyOnlineModel.formFill.personalInfo = obj.data.personalInfo;
	ApplyOnlineModel.formFill.employmentFinancialInfo = obj.data.employmentFinancialInfo;
	ApplyOnlineModel.formFill.familyRelativeInfo = obj.data.familyRelativeInfo;
	ApplyOnlineModel.formFill.creditCardType = obj.data.creditCardType;

	if (obj.isValid) {
		HideFormFillNShowFilesUploadPage();
	} else {
		alert("Please check the input fields with red border.")
	}

}

function checkPersonalInfo(obj) {
	if ($("#firstName").val() === "") {
		obj.isValid = false;
		if (!$("#firstName").hasClass('is-invalid')) {
			$("#firstName").toggleClass('is-invalid');
		}
	} else {
		obj.data.personalInfo.firstName = $("#firstName").val();
		$("#firstName").removeClass('is-invalid');
	}
	if ($("#lastName").val() === "") {
		obj.isValid = false;
		if (!$("#lastName").hasClass('is-invalid')) {
			$("#lastName").toggleClass('is-invalid');
		}
	} else {
		obj.data.personalInfo.lastName = $("#lastName").val();
		$("#lastName").removeClass('is-invalid');
	}
	if ($("#gender").val() === "") {
		obj.isValid = false;
		if (!$("#gender").hasClass('is-invalid')) {
			$("#gender").toggleClass('is-invalid');
		}
	} else {
		obj.data.personalInfo.gender = $("#gender").val();
		$("#gender").removeClass('is-invalid');
	}
	if ($("#email").val() === "" || !IsPatternValid("email")) {
		obj.isValid = false;
		if (!$("#email").hasClass('is-invalid')) {
			$("#email").toggleClass('is-invalid');
		}
	} else {
		obj.data.personalInfo.email = $("#email").val();
		$("#email").removeClass('is-invalid');
	}
	if ($("#maritalStatus").val() === "") {
		obj.isValid = false;
		if (!$("#maritalStatus").hasClass('is-invalid')) {
			$("#maritalStatus").toggleClass('is-invalid');
		}
	} else {
		obj.data.personalInfo.maritalStatus = $("#maritalStatus").val();
		$("#maritalStatus").removeClass('is-invalid');
	}
	if ($("#dependent").val() === "") {
		obj.isValid = false;
		if (!$("#dependent").hasClass('is-invalid')) {
			$("#dependent").toggleClass('is-invalid');
		}
	} else {
		obj.data.personalInfo.dependent = $("#dependent").val();
		$("#dependent").removeClass('is-invalid');
	}
	if ($("#education").val() === "") {
		obj.isValid = false;
		if (!$("#education").hasClass('is-invalid')) {
			$("#education").toggleClass('is-invalid');
		}
	} else {
		obj.data.personalInfo.education = $("#education").val();
		$("#education").removeClass('is-invalid');
	}

	if ($("#houseNo").val() === "") {
		obj.isValid = false;
		if (!$("#houseNo").hasClass('is-invalid')) {
			$("#houseNo").toggleClass('is-invalid');
		}
	} else {
		obj.data.personalInfo.currentAddress.houseNo = $("#houseNo").val();
		$("#houseNo").removeClass('is-invalid');
	}
	if ($("#street").val() === "") {
		obj.isValid = false;
		if (!$("#street").hasClass('is-invalid')) {
			$("#street").toggleClass('is-invalid');
		}
	} else {
		obj.data.personalInfo.currentAddress.street = $("#street").val();
		$("#street").removeClass('is-invalid');
	}
	if ($("#district").val() === "") {
		obj.isValid = false;
		if (!$("#district").hasClass('is-invalid')) {
			$("#district").toggleClass('is-invalid');
		}
	} else {
		obj.data.personalInfo.currentAddress.district = $("#district").val();
		$("#district").removeClass('is-invalid');
	}
	if ($("#province").val() === "") {
		obj.isValid = false;
		if (!$("#province").hasClass('is-invalid')) {
			$("#province").toggleClass('is-invalid');
		}
	} else {
		obj.data.personalInfo.currentAddress.province = $("#province").val();
		$("#province").removeClass('is-invalid');
	}
	if ($("#commune").val() === "") {
		obj.isValid = false;
		if (!$("#commune").hasClass('is-invalid')) {
			$("#commune").toggleClass('is-invalid');
		}
	} else {
		obj.data.personalInfo.currentAddress.commune = $("#commune").val();
		$("#commune").removeClass('is-invalid');
	}
	if ($("#residentialPropertyType").val() === "") {
		obj.isValid = false;
		if (!$("#residentialPropertyType").hasClass('is-invalid')) {
			$("#residentialPropertyType").toggleClass('is-invalid');
		}
	} else {
		if ($("#residentialPropertyType").val() === "Other") {
			if ($("#residentialPropertyTypeOther").val() === "") {
				obj.isValid = false;
				if (!$("#residentialPropertyTypeOther").hasClass('is-invalid')) {
					$("#residentialPropertyTypeOther").toggleClass('is-invalid');
				}
			} else {
				obj.data.personalInfo.residentialPropertyType = "#" + $("#residentialPropertyTypeOther").val();
				$("#residentialPropertyTypeOther").removeClass('is-invalid');
			}
		} else {
			obj.data.personalInfo.residentialPropertyType = $("#residentialPropertyType").val();
		}
		$("#residentialPropertyType").removeClass('is-invalid');
	}

	return obj;
}

function checkEmploymentFinancialInfo(obj) {
	if ($("#companyName").val() === "") {
		obj.isValid = false;
		if (!$("#companyName").hasClass('is-invalid')) {
			$("#companyName").toggleClass('is-invalid');
		}
	} else {
		obj.data.employmentFinancialInfo.companyName = $("#companyName").val();
		$("#companyName").removeClass('is-invalid');
	}
	if ($("#annualIncome").val() === "") {
		obj.isValid = false;
		if (!$("#annualIncome").hasClass('is-invalid')) {
			$("#annualIncome").toggleClass('is-invalid');
		}
	} else {
		obj.data.employmentFinancialInfo.annualIncome = $("#annualIncome").val();
		$("#annualIncome").removeClass('is-invalid');
	}
	if ($("#companyPhoneNo").val() === "" || !IsPatternValid("companyPhoneNo")) {
		obj.isValid = false;
		if (!$("#companyPhoneNo").hasClass('is-invalid')) {
			$("#companyPhoneNo").toggleClass('is-invalid');
		}
	} else {
		obj.data.employmentFinancialInfo.companyPhoneNo = $("#companyPhoneNo").val();
		$("#companyPhoneNo").removeClass('is-invalid');
	}
	if ($("#lengthOfService").val() === "") {
		obj.isValid = false;
		if (!$("#lengthOfService").hasClass('is-invalid')) {
			$("#lengthOfService").toggleClass('is-invalid');
		}
	} else {
		obj.data.employmentFinancialInfo.lengthOfService = $("#lengthOfService").val();
		$("#lengthOfService").removeClass('is-invalid');
	}
	if ($("#position").val() === "") {
		obj.isValid = false;
		if (!$("#position").hasClass('is-invalid')) {
			$("#position").toggleClass('is-invalid');
		}
	} else {
		if ($("#position").val() === "Other") {
			if ($("#positionOther").val() === "") {
				obj.isValid = false;
				if (!$("#positionOther").hasClass('is-invalid')) {
					$("#positionOther").toggleClass('is-invalid');
				}
			} else {
				obj.data.employmentFinancialInfo.position = "#" + $("#positionOther").val();
				$("#positionOther").removeClass('is-invalid');
			}
		} else {
			obj.data.employmentFinancialInfo.position = $("#position").val();
		}
		$("#position").removeClass('is-invalid');
	}

	if ($("#companyType").val() === "") {
		obj.isValid = false;
		if (!$("#companyType").hasClass('is-invalid')) {
			$("#companyType").toggleClass('is-invalid');
		}
	} else {
		if ($("#companyType").val() === "Other") {
			if ($("#companyTypeOther").val() === "") {
				obj.isValid = false;
				if (!$("#companyTypeOther").hasClass('is-invalid')) {
					$("#companyTypeOther").toggleClass('is-invalid');
				}
			} else {
				obj.data.employmentFinancialInfo.companyType = "#" + $("#companyTypeOther").val();
				$("#companyTypeOther").removeClass('is-invalid');
			}
		} else {
			obj.data.employmentFinancialInfo.companyType = $("#companyType").val();
		}
		$("#companyType").removeClass('is-invalid');
	}
	if ($("#serviceType").val() === "") {
		obj.isValid = false;
		if (!$("#serviceType").hasClass('is-invalid')) {
			$("#serviceType").toggleClass('is-invalid');
		}
	} else {
		if ($("#serviceType").val() === "Other") {
			if ($("#serviceTypeOther").val() === "") {
				obj.isValid = false;
				if (!$("#serviceTypeOther").hasClass('is-invalid')) {
					$("#serviceTypeOther").toggleClass('is-invalid');
				}
			} else {
				obj.data.employmentFinancialInfo.serviceType = "#" + $("#serviceTypeOther").val();
				$("#serviceTypeOther").removeClass('is-invalid');
			}
		} else {
			obj.data.employmentFinancialInfo.serviceType = $("#serviceType").val();
		}
		$("#serviceType").removeClass('is-invalid');
	}

	if ($("#companyhouseNo").val() === "") {
		obj.isValid = false;
		if (!$("#companyhouseNo").hasClass('is-invalid')) {
			$("#companyhouseNo").toggleClass('is-invalid');
		}
	} else {
		obj.data.employmentFinancialInfo.address.houseNo = $("#companyhouseNo").val();
		$("#companyhouseNo").removeClass('is-invalid');
	}
	if ($("#companystreet").val() === "") {
		obj.isValid = false;
		if (!$("#companystreet").hasClass('is-invalid')) {
			$("#companystreet").toggleClass('is-invalid');
		}
	} else {
		obj.data.employmentFinancialInfo.address.street = $("#companystreet").val();
		$("#companystreet").removeClass('is-invalid');
	}
	if ($("#companydistrict").val() === "") {
		obj.isValid = false;
		if (!$("#companydistrict").hasClass('is-invalid')) {
			$("#companydistrict").toggleClass('is-invalid');
		}
	} else {
		obj.data.employmentFinancialInfo.address.district = $("#companydistrict").val();
		$("#companydistrict").removeClass('is-invalid');
	}
	if ($("#companyprovince").val() === "") {
		obj.isValid = false;
		if (!$("#companyprovince").hasClass('is-invalid')) {
			$("#companyprovince").toggleClass('is-invalid');
		}
	} else {
		obj.data.employmentFinancialInfo.address.province = $("#companyprovince").val();
		$("#companyprovince").removeClass('is-invalid');
	}
	if ($("#companycommune").val() === "") {
		obj.isValid = false;
		if (!$("#companycommune").hasClass('is-invalid')) {
			$("#companycommune").toggleClass('is-invalid');
		}
	} else {
		obj.data.employmentFinancialInfo.address.commune = $("#companycommune").val();
		$("#companycommune").removeClass('is-invalid');
	}
	return obj;
}

function checkFamilyRelativeInfo(obj) {
	if ($("#relativeName").val() === "") {
		obj.isValid = false;
		if (!$("#relativeName").hasClass('is-invalid')) {
			$("#relativeName").toggleClass('is-invalid');
		}
	} else {
		obj.data.familyRelativeInfo.relativeName = $("#relativeName").val();
		$("#relativeName").removeClass('is-invalid');
	}
	if ($("#relationship").val() === "") {
		obj.isValid = false;
		if (!$("#relationship").hasClass('is-invalid')) {
			$("#relationship").toggleClass('is-invalid');
		}
	} else {
		obj.data.familyRelativeInfo.relationship = $("#relationship").val();
		if ($("#relationship").val() === "Other") {
			if ($("#relationshipOther").val() === "") {
				obj.isValid = false;
				if (!$("#relationshipOther").hasClass('is-invalid')) {
					$("#relationshipOther").toggleClass('is-invalid');
				}
			} else {
				obj.data.familyRelativeInfo.relationship = "#" + $("#relationshipOther").val();
				$("#relationshipOther").removeClass('is-invalid');
			}
		} else {
			obj.data.familyRelativeInfo.relationship = $("#relationship").val();
		}
		$("#relationship").removeClass('is-invalid');
	}
	if ($("#relativeMobilePhone").val() === "" || !IsPatternValid("relativeMobilePhone")) {
		obj.isValid = false;
		if (!$("#relativeMobilePhone").hasClass('is-invalid')) {
			$("#relativeMobilePhone").toggleClass('is-invalid');
		}
	} else {
		obj.data.familyRelativeInfo.relativeMobilePhone = $("#relativeMobilePhone").val();
		$("#relativeMobilePhone").removeClass('is-invalid');
	}

	if ($("#relativehouseNo").val() === "") {
		obj.isValid = false;
		if (!$("#relativehouseNo").hasClass('is-invalid')) {
			$("#relativehouseNo").toggleClass('is-invalid');
		}
	} else {
		obj.data.familyRelativeInfo.address.houseNo = $("#relativehouseNo").val();
		$("#relativehouseNo").removeClass('is-invalid');
	}
	if ($("#relativestreet").val() === "") {
		obj.isValid = false;
		if (!$("#relativestreet").hasClass('is-invalid')) {
			$("#relativestreet").toggleClass('is-invalid');
		}
	} else {
		obj.data.familyRelativeInfo.address.street = $("#relativestreet").val();
		$("#relativestreet").removeClass('is-invalid');
	}
	if ($("#relativedistrict").val() === "") {
		obj.isValid = false;
		if (!$("relative#district").hasClass('is-invalid')) {
			$("#relativedistrict").toggleClass('is-invalid');
		}
	} else {
		obj.data.familyRelativeInfo.address.district = $("#relativedistrict").val();
		$("#relativedistrict").removeClass('is-invalid');
	}
	if ($("#relativeprovince").val() === "") {
		obj.isValid = false;
		if (!$("#relativeprovince").hasClass('is-invalid')) {
			$("#relativeprovince").toggleClass('is-invalid');
		}
	} else {
		obj.data.familyRelativeInfo.address.province = $("#relativeprovince").val();
		$("#relativeprovince").removeClass('is-invalid');
	}
	if ($("#relativecommune").val() === "") {
		obj.isValid = false;
		if (!$("#relativecommune").hasClass('is-invalid')) {
			$("#relativecommune").toggleClass('is-invalid');
		}
	} else {
		obj.data.familyRelativeInfo.address.commune = $("#relativecommune").val();
		$("#relativecommune").removeClass('is-invalid');
	}
	return obj;
}

function checkCreditCardType(obj) {
	if ($("#cardType").val() === "") {
		obj.isValid = false;
		if (!$("#cardType").hasClass('is-invalid')) {
			$("#cardType").toggleClass('is-invalid');
		}
	} else {
		obj.data.creditCardType.cardType = $("#cardType").val();
		$("#cardType").removeClass('is-invalid');
	}
	if ($("#preferBranches").val() === "") {
		obj.isValid = false;
		if (!$("#preferBranches").hasClass('is-invalid')) {
			$("#preferBranches").toggleClass('is-invalid');
		}
	} else {
		obj.data.creditCardType.preferBranches = $("#preferBranches").val();
		$("#preferBranches").removeClass('is-invalid');
	}
	if ($("#channel").val() === "") {
		obj.isValid = false;
		if (!$("#channel").hasClass('is-invalid')) {
			$("#channel").toggleClass('is-invalid');
		}
	} else {
		obj.data.creditCardType.applyByChannel = $("#channel").val();
		$("#channel").removeClass('is-invalid');
	}
	return obj;
}

function HideFormFillNShowOtpPage() {
	$.ajax({
		type: "GET",
		url: '/personal/apply-online-otp',
		success: function (data) {
			$('#stepFormFill').hide();
			$('#stepOtp').show();
			$('#stepOtp').html(DOMPurify.sanitize(data));
			initOtpPage();
		},
		error: function (xhr, textStatus) {
			alert(xhr.responseText);
		}
	});
}

function HideFormFillNShowFilesUploadPage() {
	$.ajax({
		type: "GET",
		url: '/personal/apply-online-files-upload',
		success: function (data) {
			$('#stepFormFill').hide();
			$('#stepFilesUpload').show();
			$('#stepFilesUpload').html(DOMPurify.sanitize(data));
			initFilesUpload();
		},
		error: function (xhr, textStatus) {
			alert(xhr.responseText);
		}
	});
}
//#endregion
