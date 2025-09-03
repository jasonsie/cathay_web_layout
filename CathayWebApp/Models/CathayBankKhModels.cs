namespace CathayBankKh.Models
{
    public class ApplyOnlineFilesUploadModel
    {
        public string? IdCardFront { get; set; }
        public string? IdCardBack { get; set; }
        public string? SalarySlip { get; set; }
        public string? BankStatement { get; set; }
        public string? PassportPhoto { get; set; }
        public List<string>? UploadedFiles { get; set; } = new List<string>();
    }

    public class ApplyOnlineFormFillModel
    {
        public PersonalInformation? PersonalInfo { get; set; }
        public EmploymentInformation? EmploymentInfo { get; set; }
        public FamilyInformation? FamilyInfo { get; set; }
        public string? CreditCardType { get; set; }
    }

    public class PersonalInformation
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Nationality { get; set; }
        public string? IdNumber { get; set; }
        public string? PhoneNumber { get; set; }
        public AddressInformation? Address { get; set; }
    }

    public class EmploymentInformation
    {
        public string? CompanyName { get; set; }
        public string? Position { get; set; }
        public decimal? MonthlyIncome { get; set; }
        public string? WorkExperience { get; set; }
        public AddressInformation? CompanyAddress { get; set; }
    }

    public class FamilyInformation
    {
        public string? SpouseName { get; set; }
        public string? SpouseOccupation { get; set; }
        public string? EmergencyContactName { get; set; }
        public string? EmergencyContactPhone { get; set; }
        public string? Relationship { get; set; }
        public AddressInformation? EmergencyContactAddress { get; set; }
    }

    public class AddressInformation
    {
        public string? Province { get; set; }
        public string? District { get; set; }
        public string? Commune { get; set; }
        public string? Village { get; set; }
        public string? Street { get; set; }
        public string? HouseNumber { get; set; }
    }

    public class ApplyOnlineOtpModel
    {
        public string? PhoneNumber { get; set; }
        public string? OtpCode { get; set; }
        public DateTime? OtpExpiry { get; set; }
        public bool IsVerified { get; set; }
    }

    public class ApplyOnlinePaymentMethodModel
    {
        public string? PaymentType { get; set; }
        public string? BankName { get; set; }
        public string? AccountNumber { get; set; }
        public string? AccountHolderName { get; set; }
        public bool IsDirectDebit { get; set; }
    }

    public class ApplyOnlineReviewSubmitModel
    {
        public PersonalInformation? PersonalInfo { get; set; }
        public EmploymentInformation? EmploymentInfo { get; set; }
        public FamilyInformation? FamilyInfo { get; set; }
        public ApplyOnlineFilesUploadModel? Documents { get; set; }
        public ApplyOnlinePaymentMethodModel? PaymentMethod { get; set; }
        public string? CreditCardType { get; set; }
        public string? PromoCode { get; set; }
        public bool TermsAgreed { get; set; }
        public bool ConsentAgreed { get; set; }
    }

    public class ApplyOnlineReviewNSubmitModel
    {
        public PersonalInformation? PersonalInfo { get; set; }
        public EmploymentInformation? EmploymentInfo { get; set; }
        public FamilyInformation? FamilyInfo { get; set; }
        public ApplyOnlineFilesUploadModel? Documents { get; set; }
        public ApplyOnlinePaymentMethodModel? PaymentMethod { get; set; }
        public string? CreditCardType { get; set; }
        public string? PromoCode { get; set; }
        public bool TermsAgreed { get; set; }
        public bool ConsentAgreed { get; set; }
    }

    public class ApplyOnlineTermsModel
    {
        public bool DeclarationAgreed { get; set; }
        public bool ConsentAgreed { get; set; }
        public string? ApplicantSignature { get; set; }
        public DateTime? SignatureDate { get; set; }
    }
}
