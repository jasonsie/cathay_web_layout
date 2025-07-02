using Microsoft.AspNetCore.Mvc;

namespace CathayWebApp.Controllers
{
    public class AboardController : Controller
    {
        public IActionResult Index()
        {
            // Set up mock ViewBag variables required by the template
            SetupMockViewBag();
            return View();
        }
        
        private void SetupMockViewBag()
        {
            // Mock the required ViewBag variables for Hong Kong branch
            ViewBag.lang = "zh-hant";
            ViewBag.country_url = "hongkong";
            ViewBag.city_url = "";
            ViewBag.section = "aboard/";
            ViewBag.subsection = "";
            ViewBag.bodyPath = "~/Views/Aboard/content.cshtml"; // We'll create this
            ViewBag.PageTitle = "";
            ViewBag.PageDescription = "";
        }
        
        // Add additional action methods for each .cshtml file in aboard directory
        // Example: public IActionResult PageName() { return View(); }
    }
}
