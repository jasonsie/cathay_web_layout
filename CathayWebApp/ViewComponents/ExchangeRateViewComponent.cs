using Microsoft.AspNetCore.Mvc;

namespace CathayBankKh.ViewComponents
{
    // This namespace is referenced by some legacy views
    // Keeping it for backward compatibility
    public class ExchangeRateViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            return View();
        }
    }
}
