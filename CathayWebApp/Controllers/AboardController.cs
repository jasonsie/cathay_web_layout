using Microsoft.AspNetCore.Mvc;

namespace CathayWebApp.Controllers
{
    public class AboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        
        // Add additional action methods for each .cshtml file in aboard directory
        // Example: public IActionResult PageName() { return View(); }
    }
}
