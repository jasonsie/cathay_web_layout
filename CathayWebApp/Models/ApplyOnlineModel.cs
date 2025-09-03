namespace CathayWebApp.Models
{
    public class ApplyOnlineModel
    {
        public string? PromoCode { get; set; }
        public string? Channel { get; set; }
        public IdentityInfo? Identity { get; set; }
        public FormFillInfo? FormFill { get; set; }
        public FileUploadInfo? FileUpload { get; set; }
        public PaymentMethodInfo? PaymentMethod { get; set; }
    }

    public class IdentityInfo
    {
        public string? PhoneNumber { get; set; }
        public string? OtpCode { get; set; }
    }

    public class FormFillInfo
    {
        public PersonalInfo? PersonalInfo { get; set; }
        public EmploymentFinancialInfo? EmploymentFinancialInfo { get; set; }
        public FamilyRelativeInfo? FamilyRelativeInfo { get; set; }
        public string? CreditCardType { get; set; }
    }

    public class PersonalInfo
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Nationality { get; set; }
        public string? IdNumber { get; set; }
        public AddressInfo? Address { get; set; }
    }

    public class EmploymentFinancialInfo
    {
        public string? CompanyName { get; set; }
        public string? Position { get; set; }
        public decimal? MonthlyIncome { get; set; }
        public AddressInfo? CompanyAddress { get; set; }
    }

    public class FamilyRelativeInfo
    {
        public string? RelativeName { get; set; }
        public string? Relationship { get; set; }
        public string? RelativePhone { get; set; }
        public AddressInfo? RelativeAddress { get; set; }
    }

    public class AddressInfo
    {
        public string? Province { get; set; }
        public string? District { get; set; }
        public string? Commune { get; set; }
        public string? Street { get; set; }
        public string? HouseNumber { get; set; }
    }

    public class FileUploadInfo
    {
        public string? IdCardFront { get; set; }
        public string? IdCardBack { get; set; }
        public string? SalarySlip { get; set; }
        public string? BankStatement { get; set; }
    }

    public class PaymentMethodInfo
    {
        public string? PaymentType { get; set; }
        public string? AccountNumber { get; set; }
        public string? BankName { get; set; }
    }
}
