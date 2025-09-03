//#region terms
function initTermsPage() {

    if (!eventFlag.terms) {
        $(document).on('click', '#goPrevToPaymentMethod', function () {
            PreviousStepToPaymentMethod();
        });

        $(document).on('click', '#goNextToReviewNSubmit', function () {
            NextStepToReviewNSubmitPage();
        });

        eventFlag.terms = true;
    }
}

function PreviousStepToPaymentMethod() {
    HideTermsNShowPaymentMethodPage();
}

function NextStepToReviewNSubmitPage() {
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
        HideTermsNShowReviewNSubmitPage();
    }
}

function HideTermsNShowPaymentMethodPage() {
    $.ajax({
        type: "GET",
        url: '/personal/apply-online-payment-method',
        success: function (data) {
            $('#stepTerms').hide();
            $('#stepPaymentMethod').show();
            $('#stepPaymentMethod').html(DOMPurify.sanitize(data));
            initPaymentMethod();
        },
        error: function (xhr, textStatus) {
            alert(xhr.responseText);
        }
    });
}

function HideTermsNShowReviewNSubmitPage() {
    $.ajax({
        type: "GET",
        url: '/personal/apply-online-review-n-submit',
        success: function (data) {
            $('#stepTerms').hide();
            $('#stepReviewNSubmit').show();
            $('#stepReviewNSubmit').html(DOMPurify.sanitize(data));
            initReviewNSubmit();
        },
        error: function (xhr, textStatus) {
            alert(xhr.responseText);
        }
    });
}