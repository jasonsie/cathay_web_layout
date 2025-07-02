//#region review and submit
function initReviewNSubmit() {
    FulfillReviewForm();
    GetCaptcha();

    
	if (!eventFlag.reviewNSubmit) {
        $(document).on('click', '#goPrevToTerms', function () {
            PreviousStepToTerms();
        });

        $(document).on('click', '#goNextToSubmit', function () {
            Submit();
        });

        $(document).on('click', '#getCaptchaBtn', function () {
            GetCaptcha();
        });

        eventFlag.reviewNSubmit = true;
    }
}

function GetCaptcha() {
    $.ajax({
        type: "GET",
        async: false,
        url: '/Personal/ReadCaptcha',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.IsSuccess) {
                const imgStr = "data:image/jpeg;base64," + data.Data.PictureBase64;
                $("#imgCaptcha").attr("src", imgStr);
            } else {
                alert("Error: " + data.ReturnMessage);
            }
        },
        error: function (xhr, textStatus) {
            alert(xhr.responseText);
        }
    });
}

function CheckCaptcha() {
    var captchaCode = $("#txtCaptcha").val();
    $.ajax({
        type: "POST",
        data: JSON.stringify({ captchaCode: captchaCode }),
        async: false,
        url: '/Personal/CheckCaptcha',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.IsSuccess) {
                SubmitDataAndSendEmail();
            } else {
                alert("Error: " + data.ReturnMessage);
            }
        },
        error: function (xhr, textStatus) {
            alert(xhr.responseText);
        }
    });
}

function FulfillReviewForm() {
    $('#formName').text(`${ApplyOnlineModel.formFill.personalInfo.lastName} ${ApplyOnlineModel.formFill.personalInfo.firstName}`);
    $('#formGender').text(ApplyOnlineModel.formFill.personalInfo.gender === "M" ? "Male" : "Female");
    $('#formMaritalStatus').text(ApplyOnlineModel.formFill.personalInfo.maritalStatus);
    $('#formDependent').text(ApplyOnlineModel.formFill.personalInfo.dependent);
    $('#formIdPassport').text(ApplyOnlineModel.identity.idNumber);
    $('#formEducation').text(ApplyOnlineModel.formFill.personalInfo.education);
    $('#formEmail').text(ApplyOnlineModel.formFill.personalInfo.email);
    $('#formDateOfBirth').text(ApplyOnlineModel.identity.dateOfBirth);
    $('#formMobileNumber').text(ApplyOnlineModel.identity.phoneNumber);
    $('#formResidentialType').text(ApplyOnlineModel.formFill.personalInfo.residentialPropertyType);
    $('#formAddress').text(
        `${ApplyOnlineModel.formFill.personalInfo.currentAddress.houseNo},
				${ApplyOnlineModel.formFill.personalInfo.currentAddress.street},
				${AddressData['commune'].find(add => add.code === ApplyOnlineModel.formFill.personalInfo.currentAddress.commune).eName},
				${AddressData['district'].find(add => add.code === ApplyOnlineModel.formFill.personalInfo.currentAddress.district).eName},
				${AddressData['province'].find(add => add.code === ApplyOnlineModel.formFill.personalInfo.currentAddress.province).eName}, Cambodia `
    );

    $('#formCompanyName').text(ApplyOnlineModel.formFill.employmentFinancialInfo.companyName);
    $('#formPosition').text(ApplyOnlineModel.formFill.employmentFinancialInfo.position.replace('#', ''));
    $('#formCompanyPhoneNumber').text(ApplyOnlineModel.formFill.employmentFinancialInfo.companyPhoneNo);
    $('#formCompanyAddress').text(
        `
					${ApplyOnlineModel.formFill.employmentFinancialInfo.address.houseNo},
					${ApplyOnlineModel.formFill.employmentFinancialInfo.address.street},
					${CompanyAddressData['commune'].find(add => add.code === ApplyOnlineModel.formFill.employmentFinancialInfo.address.commune).eName},
					${CompanyAddressData['district'].find(add => add.code === ApplyOnlineModel.formFill.employmentFinancialInfo.address.district).eName},
					${CompanyAddressData['province'].find(add => add.code === ApplyOnlineModel.formFill.employmentFinancialInfo.address.province).eName}, Cambodia
					`
    );
    $('#formLengthOfService').text(ApplyOnlineModel.formFill.employmentFinancialInfo.lengthOfService);
    $('#formAnnualIncome').text(ApplyOnlineModel.formFill.employmentFinancialInfo.annualIncome);
    $('#formCompanyType').text(ApplyOnlineModel.formFill.employmentFinancialInfo.companyType.replace('#', ''));
    $('#formServiceType').text(ApplyOnlineModel.formFill.employmentFinancialInfo.serviceType.replace('#', ''));

    $('#formRelativeName').text(ApplyOnlineModel.formFill.familyRelativeInfo.relativeName);
    $('#formRelationship').text(ApplyOnlineModel.formFill.familyRelativeInfo.relationship.replace('#', ''));
    $('#formRelativePhoneNumber').text(ApplyOnlineModel.formFill.familyRelativeInfo.relativeMobilePhone);
    $('#formRelativeAddress').text(
        `
					${ApplyOnlineModel.formFill.familyRelativeInfo.address.houseNo},
					${ApplyOnlineModel.formFill.familyRelativeInfo.address.street},
					${RelativeAddressData['commune'].find(add => add.code === ApplyOnlineModel.formFill.familyRelativeInfo.address.commune).eName},
					${RelativeAddressData['district'].find(add => add.code === ApplyOnlineModel.formFill.familyRelativeInfo.address.district).eName},
					${RelativeAddressData['province'].find(add => add.code === ApplyOnlineModel.formFill.familyRelativeInfo.address.province).eName}, Cambodia
					`
    );

    $('#formCardType').text(ApplyOnlineModel.formFill.creditCardType.cardType);
    $('#formPreferBranch').text(ApplyOnlineModel.formFill.creditCardType.preferBranches);
    $('#formPaymentMethod').text(ApplyOnlineModel.paymentMethod.method);
    $('#formAccountNo').text(ApplyOnlineModel.paymentMethod.accountNo);
    $('#formReferralCode').text(ApplyOnlineModel.identity.referralCode);
    $('#formChannel').text(ApplyOnlineModel.formFill.creditCardType.applyByChannel);
    $('#formPromoCode').text(ApplyOnlineModel.identity.promoCode);

    $('#consentName').text(`${ApplyOnlineModel.formFill.personalInfo.lastName} ${ApplyOnlineModel.formFill.personalInfo.firstName}`);
    $('#consentGender').text(ApplyOnlineModel.formFill.personalInfo.gender === "M" ? "Male" : "Female");
    $('#consentIdPassport').text(ApplyOnlineModel.identity.idNumber);
    $('#consentAddress').text(
        `${ApplyOnlineModel.formFill.personalInfo.currentAddress.houseNo},
					${ApplyOnlineModel.formFill.personalInfo.currentAddress.street},
					${AddressData['commune'].find(add => add.code === ApplyOnlineModel.formFill.personalInfo.currentAddress.commune).eName},
					${AddressData['district'].find(add => add.code === ApplyOnlineModel.formFill.personalInfo.currentAddress.district).eName},
					${AddressData['province'].find(add => add.code === ApplyOnlineModel.formFill.personalInfo.currentAddress.province).eName}, Cambodia `
    );

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}/${month}/${year}`;
    $('#today').text(currentDate);
}

function PreviousStepToTerms() {
    HideReviewNSubmitNShowTermsPage();
}

function Submit() {
    const obj = new Object({
        isValid: true
    });
    if ($("#declarationConfirm").is(":checked") === false) {
        obj.isValid = false;
    }
    if ($("#consentConfirm").is(":checked") === false) {
        obj.isValid = false;
    }

    if (!obj.isValid) {
        alert("The declaration and consent should be confirmed before submit.")
    } else {
        // 檢核驗證碼是否輸入
        if ($("#txtCaptcha").val() === "") {
            alert("Please input captcha code.")
        } else {
            //check otp then save data and send email
            CheckCaptcha();
        }
    }
}

function SubmitDataAndSendEmail() {
    var data = new FormData();
    data.append('UserId', ApplyOnlineModel.identity.idNumber);
    data.append('UserMobileNo', ApplyOnlineModel.identity.phoneNumber);
    data.append('Birthday', ApplyOnlineModel.identity.dateOfBirth);
    data.append('ReferralCode', ApplyOnlineModel.identity.referralCode);
    data.append('FirstName', ApplyOnlineModel.formFill.personalInfo.firstName);
    data.append('LastName', ApplyOnlineModel.formFill.personalInfo.lastName);
    data.append('Gender', ApplyOnlineModel.formFill.personalInfo.gender);
    data.append('Email', ApplyOnlineModel.formFill.personalInfo.email);
    data.append('MaritalStatus', ApplyOnlineModel.formFill.personalInfo.maritalStatus);
    data.append('Dependent', ApplyOnlineModel.formFill.personalInfo.dependent);
    data.append('Education', ApplyOnlineModel.formFill.personalInfo.education);
    data.append('AddressProvince', AddressData['province'].find(add => add.code === ApplyOnlineModel.formFill.personalInfo.currentAddress.province).eName);
    data.append('AddressDistrict', AddressData['district'].find(add => add.code === ApplyOnlineModel.formFill.personalInfo.currentAddress.district).eName);
    data.append('AddressCommune', AddressData['commune'].find(add => add.code === ApplyOnlineModel.formFill.personalInfo.currentAddress.commune).eName);
    data.append('AddressStreet', ApplyOnlineModel.formFill.personalInfo.currentAddress.street);
    data.append('AddressHouseNo', ApplyOnlineModel.formFill.personalInfo.currentAddress.houseNo);
    data.append('ResidentialPropertyType', ApplyOnlineModel.formFill.personalInfo.residentialPropertyType);

    data.append('CompanyName', ApplyOnlineModel.formFill.employmentFinancialInfo.companyName);
    data.append('CompanyPhoneNo', ApplyOnlineModel.formFill.employmentFinancialInfo.companyPhoneNo);
    data.append('AnnualIncome', ApplyOnlineModel.formFill.employmentFinancialInfo.annualIncome);
    data.append('LengthOfService', ApplyOnlineModel.formFill.employmentFinancialInfo.lengthOfService);
    data.append('Position', ApplyOnlineModel.formFill.employmentFinancialInfo.position.replace('#', ''));
    data.append('CompanyType', ApplyOnlineModel.formFill.employmentFinancialInfo.companyType.replace('#', ''));
    data.append('ServiceType', ApplyOnlineModel.formFill.employmentFinancialInfo.serviceType.replace('#', ''));
    data.append('CompanyAddressProvince', CompanyAddressData['province'].find(add => add.code === ApplyOnlineModel.formFill.employmentFinancialInfo.address.province).eName);
    data.append('CompanyAddressDistrict', CompanyAddressData['district'].find(add => add.code === ApplyOnlineModel.formFill.employmentFinancialInfo.address.district).eName);
    data.append('CompanyAddressCommune', CompanyAddressData['commune'].find(add => add.code === ApplyOnlineModel.formFill.employmentFinancialInfo.address.commune).eName);
    data.append('CompanyAddressStreet', ApplyOnlineModel.formFill.employmentFinancialInfo.address.street);
    data.append('CompanyAddressHouseNo', ApplyOnlineModel.formFill.employmentFinancialInfo.address.houseNo);

    data.append('RelativeName', ApplyOnlineModel.formFill.familyRelativeInfo.relativeName);
    data.append('RelativeMobilePhone', ApplyOnlineModel.formFill.familyRelativeInfo.relativeMobilePhone);
    data.append('Relationship', ApplyOnlineModel.formFill.familyRelativeInfo.relationship.replace('#', ''));
    data.append('RelativeAddressProvince', RelativeAddressData['province'].find(add => add.code === ApplyOnlineModel.formFill.familyRelativeInfo.address.province).eName);
    data.append('RelativeAddressDistrict', RelativeAddressData['district'].find(add => add.code === ApplyOnlineModel.formFill.familyRelativeInfo.address.district).eName);
    data.append('RelativeAddressCommune', RelativeAddressData['commune'].find(add => add.code === ApplyOnlineModel.formFill.familyRelativeInfo.address.commune).eName);
    data.append('RelativeAddressStreet', ApplyOnlineModel.formFill.familyRelativeInfo.address.street);
    data.append('RelativeAddressHouseNo', ApplyOnlineModel.formFill.familyRelativeInfo.address.houseNo);

    data.append('CardType', ApplyOnlineModel.formFill.creditCardType.cardType);
    data.append('PreferBranch', ApplyOnlineModel.formFill.creditCardType.preferBranches);
    data.append('ApplyChannel', ApplyOnlineModel.formFill.creditCardType.applyByChannel);
    data.append('SalaryValidationType', ApplyOnlineModel.fileUpload.salaryValidationType);
    data.append('PromoCode', ApplyOnlineModel.identity.promoCode);

    data.append('IdPassport', ApplyOnlineModel.fileUpload.idPassport);
    data.append('SelfiePhoto', ApplyOnlineModel.fileUpload.selfiePhoto);
    data.append('SalaryValidation', ApplyOnlineModel.fileUpload.salaryValidation);

    data.append('PaymentMethod', ApplyOnlineModel.paymentMethod.method);
    data.append('AccountNo', ApplyOnlineModel.paymentMethod.accountNo);

    $.ajax({
        type: "POST",
        url: '/ApplyData/Submit',
        data: data,
        dataType: "json",
        contentType: false,
        processData: false,
        cache: false,
        success: function (data) {
            if (data.isSuccess) {
                alert("Thank you! Your Online Application has been submitted.");
                window.location.href = 'apply-online?Channel=Website';
            } else {
                alert("Error: " + data.errorMsg);
                $("#txtCaptcha").val("");
                GetCaptcha();
            }
        },
        error: function (xhr, textStatus) {
            alert(xhr.responseText);
        }
    });
}

function HideReviewNSubmitNShowTermsPage() {
    $('#stepReviewNSubmit').hide();
    $('#stepTerms').show();
    initTermsPage();

    // $.ajax({
    //     type: "GET",
    //     url: '/personal/apply-online-terms',
    //     success: function (data) {
    //         $('#stepReviewNSubmit').hide();
    //         $('#stepTerms').show();
    //         initTermsPage();
    //     },
    //     error: function (xhr, textStatus) {
    //         alert(xhr.responseText);
    //     }
    // });
}
//#endregion