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
            // Validate language and redirect if invalid
            if (!IsValidLanguage(language))
            {
                return RedirectToAction("LanguageRoot", new { language = "zh-hant" });
            }
            
            SetupLanguageViewData(language);
            SetupCommonViewData("home/");
            SetupSiteLangUrl(language);
            
            // Directly return the Home view without redirect to avoid routing issues
            return View($"~/Views/Home/{language}/Index.cshtml");
        }

        // Handle specific path URLs: domain/{language}/{path}/
        public IActionResult LanguagePath(string language = "zh-hant", string path = "")
        {
            // Validate language and redirect if invalid
            if (!IsValidLanguage(language))
            {
                return RedirectToAction("LanguageRoot", new { language = "zh-hant" });
            }
            
            SetupLanguageViewData(language);
            SetupSiteLangUrl(language);
            
            // Special handling for "home" path - redirect to root
            if (path.ToLower() == "home")
            {
                return RedirectToAction("LanguageRoot", new { language = language });
            }
            
            SetupCommonViewData("liao/", path);
            
            // Try to find the specific view in the reference structure
            var viewPath = GetViewPathFromReference(path, language);
            
            if (!string.IsNullOrEmpty(viewPath) && ViewExists(viewPath))
            {
                return View(viewPath);
            }
            
            // Check if there's a view in the standard Views folder structure
            var standardViewPath = GetStandardViewPath(path, language);
            if (!string.IsNullOrEmpty(standardViewPath) && ViewExists(standardViewPath))
            {
                return View(standardViewPath);
            }
            
            // If no view found, redirect to home page instead of returning 404
            return RedirectToAction("LanguageRoot", new { language = language });
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
            
            // If page not found, try to fallback to path index
            var pathExists = !string.IsNullOrEmpty(GetViewPathFromReference(path, language)) || 
                           !string.IsNullOrEmpty(GetStandardViewPath(path, language));
            
            if (pathExists)
            {
                return LanguagePath(language, path);
            }
            
            // If neither page nor path exists, redirect to home
            return RedirectToAction("LanguageRoot", new { language = language });
        }

        // Catch-all action for invalid URLs
        public IActionResult RedirectToHome(string url = "")
        {
            // Try to extract language from the URL if possible
            var language = "zh-hant"; // default
            
            if (!string.IsNullOrEmpty(url))
            {
                var urlParts = url.Split('/');
                if (urlParts.Length > 0)
                {
                    var potentialLang = urlParts[0].ToLower();
                    if (potentialLang == "en" || potentialLang == "km" || potentialLang == "zh-hant")
                    {
                        language = potentialLang;
                    }
                }
            }
            
            // Redirect to the appropriate language home page
            return RedirectToAction("LanguageRoot", new { language = language });
        }

        private string? GetStandardViewPath(string path, string language)
        {
            if (string.IsNullOrEmpty(path))
                return null;

            // Map path names to standard Views folder structure  
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

            var folderName = pathMappings.ContainsKey(path.ToLower()) 
                ? pathMappings[path.ToLower()] 
                : CapitalizePath(path);

            // Check if this path exists in the standard Views structure
            var viewFolderPath = Path.Combine(_environment.ContentRootPath, "Views", folderName, language);
            
            if (Directory.Exists(viewFolderPath))
            {
                var indexPath = Path.Combine(viewFolderPath, "Index.cshtml");
                if (System.IO.File.Exists(indexPath))
                {
                    return $"~/Views/{folderName}/{language}/Index.cshtml";
                }
            }

            return null;
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

        private bool IsValidLanguage(string language)
        {
            var validLanguages = new[] { "zh-hant", "en", "km" };
            return validLanguages.Contains(language?.ToLower());
        }
    }
}
