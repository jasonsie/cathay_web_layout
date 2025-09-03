using Microsoft.AspNetCore.Mvc;

namespace CathayWebApp.Controllers
{
    public class SiteController : BaseController
    {
        private readonly IWebHostEnvironment _environment;

        public SiteController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        // Handle root language URL: domain/{language}/
        public IActionResult LanguageRoot(string language = "zh-hant")
        {
            SetupLanguageViewData(language);
            SetupCommonViewData("home/");
            SetupSiteLangUrl(language);
            
            // Redirect to Home controller instead of using Aboard
            return RedirectToAction("Index", "Home", new { language = language });
        }

        // Handle specific path URLs: domain/{language}/{path}/
        public IActionResult LanguagePath(string language = "zh-hant", string path = "")
        {
            SetupLanguageViewData(language);
            SetupSiteLangUrl(language);
            
            SetupCommonViewData("liao/", path);
            
            // Try to find the specific view in the reference structure
            var viewPath = GetViewPathFromReference(path, language);
            
            if (!string.IsNullOrEmpty(viewPath) && ViewExists(viewPath))
            {
                return View(viewPath);
            }
            
            // Fallback to Liao Index if specific view not found
            return View("~/Views/Liao/Index.cshtml");
        }

        // Handle specific page within a path: domain/{language}/{path}/{page}/
        public IActionResult LanguagePathPage(string language = "zh-hant", string path = "", string page = "")
        {
            SetupLanguageViewData(language);
            SetupCommonViewData("liao/", path);
            SetupSiteLangUrl(language);
            
            // Try to find the specific page view
            var viewPath = GetPageViewPathFromReference(path, page, language);
            
            if (!string.IsNullOrEmpty(viewPath) && ViewExists(viewPath))
            {
                return View(viewPath);
            }
            
            // Fallback to path index
            return LanguagePath(language, path);
        }

        private string? GetViewPathFromReference(string path, string language)
        {
            if (string.IsNullOrEmpty(path))
                return null;

            // Map path names to reference structure
            var pathMappings = new Dictionary<string, string>
            {
                {"about-us", "AboutUs"},
                {"business", "Business"},
                {"personal", "Personal"},
                {"careers", "Careers"},
                {"contact", "Contact"},
                {"ethical-management", "EthicalManagement"},
                {"event", "Event"},
                {"feedback", "Feedback"},
                {"home", "Home"},
                {"job-openings", "JobOpenings"},
                {"privacy", "Privacy"},
                {"app", "App"}
            };

            var referencePath = pathMappings.ContainsKey(path.ToLower()) 
                ? pathMappings[path.ToLower()] 
                : CapitalizePath(path);

            // Check if this path exists in the reference structure
            var referenceFolderPath = Path.Combine(_environment.ContentRootPath, "Reference", "liao", "Views", referencePath);
            
            if (Directory.Exists(referenceFolderPath))
            {
                var languageFolderPath = Path.Combine(referenceFolderPath, language);
                if (Directory.Exists(languageFolderPath))
                {
                    var indexPath = Path.Combine(languageFolderPath, "Index.cshtml");
                    if (System.IO.File.Exists(indexPath))
                    {
                        return $"~/Reference/liao/Views/{referencePath}/{language}/Index.cshtml";
                    }
                }
            }

            return null;
        }

        private string? GetPageViewPathFromReference(string path, string page, string language)
        {
            if (string.IsNullOrEmpty(path) || string.IsNullOrEmpty(page))
                return null;

            // Map path names to reference structure (same as above)
            var pathMappings = new Dictionary<string, string>
            {
                {"about-us", "AboutUs"},
                {"business", "Business"},
                {"personal", "Personal"},
                {"careers", "Careers"},
                {"contact", "Contact"},
                {"ethical-management", "EthicalManagement"},
                {"event", "Event"},
                {"feedback", "Feedback"},
                {"home", "Home"},
                {"job-openings", "JobOpenings"},
                {"privacy", "Privacy"},
                {"app", "App"}
            };

            var referencePath = pathMappings.ContainsKey(path.ToLower()) 
                ? pathMappings[path.ToLower()] 
                : CapitalizePath(path);

            // Convert page name from URL format to file format
            var pageFileName = ConvertUrlToFileName(page);

            var fullPath = Path.Combine(_environment.ContentRootPath, "Reference", "liao", "Views", referencePath, language, $"{pageFileName}.cshtml");
            
            if (System.IO.File.Exists(fullPath))
            {
                return $"~/Reference/liao/Views/{referencePath}/{language}/{pageFileName}.cshtml";
            }

            return null;
        }

        private string CapitalizePath(string path)
        {
            if (string.IsNullOrEmpty(path))
                return path;

            // Handle kebab-case to PascalCase conversion
            var parts = path.Split('-');
            for (int i = 0; i < parts.Length; i++)
            {
                if (parts[i].Length > 0)
                {
                    parts[i] = char.ToUpper(parts[i][0]) + parts[i].Substring(1).ToLower();
                }
            }
            
            return string.Join("", parts);
        }

        private string ConvertUrlToFileName(string urlName)
        {
            // Convert URL format (kebab-case) to file format
            // Most files use kebab-case, so we keep them as-is
            return urlName.ToLower();
        }

        private bool ViewExists(string viewPath)
        {
            if (string.IsNullOrEmpty(viewPath))
                return false;

            // Remove the ~/ prefix and convert to physical path
            var relativePath = viewPath.StartsWith("~/") ? viewPath.Substring(2) : viewPath;
            var physicalPath = Path.Combine(_environment.ContentRootPath, relativePath.Replace('/', Path.DirectorySeparatorChar));
            
            return System.IO.File.Exists(physicalPath);
        }

        private void SetupSiteLangUrl(string language)
        {
            // Set up the site language URL for use in views
            ViewData["siteLangUrl"] = language switch
            {
                "zh-hant" => "/zh-hant/",
                "en" => "/en/",
                "km" => "/km/",
                _ => "/zh-hant/"
            };
        }
    }
}
