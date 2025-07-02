namespace CathayWebApp.Models
{
    public class IndexViewModel
    {
        public string? Title { get; set; }
        public string? Message { get; set; }
        public DateTime CurrentDate { get; set; } = DateTime.Now;
    }
}
