using Microsoft.AspNetCore.Mvc;

namespace CathayWebApp.Controllers
{
    public class LiaoController : BaseController
    {
        public IActionResult Index(string language = "zh-hant")
        {
            // Setup language and common view data
            SetupLanguageViewData(language);
            SetupCommonViewData("liao/");
            
            return View();
        }
        
        // Generic action to handle different pages with language support
        public IActionResult Page(string pageName, string language = "zh-hant")
        {
            SetupLanguageViewData(language);
            SetupCommonViewData("liao/", pageName);
            
            // Try to find the specific view, fallback to Index if not found
            var viewName = ViewExists(pageName) ? pageName : "Index";
            return View(viewName);
        }
        
        private bool ViewExists(string viewName)
        {
            var viewPath = $"~/Views/Liao/{viewName}.cshtml";
            return System.IO.File.Exists(Path.Combine(
                Directory.GetCurrentDirectory(), 
                "Views", "Liao", $"{viewName}.cshtml"));
        }
    }
}
