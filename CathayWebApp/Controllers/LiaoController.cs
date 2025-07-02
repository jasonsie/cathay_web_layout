using Microsoft.AspNetCore.Mvc;

namespace CathayWebApp.Controllers
{
    public class LiaoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        
        // Add additional action methods for each .cshtml file in liao directory
        // Example: public IActionResult PageName() { return View(); }
    }
}
