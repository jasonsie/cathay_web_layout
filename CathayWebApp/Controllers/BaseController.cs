using Microsoft.AspNetCore.Mvc;

namespace CathayWebApp.Controllers
{
    public class BaseController : Controller
    {
        protected void SetupLanguageViewData(string language = "zh-hant")
        {
            // Validate and set default language if invalid
            var validLanguages = new[] { "zh-hant", "en", "km" };
            if (!validLanguages.Contains(language))
            {
                language = "zh-hant";
            }

            // Set language data for the template
            ViewData["lang"] = language;
            ViewData["html_lang"] = GetHtmlLangCode(language);
            ViewData["lang_url"] = GetLanguageUrl(language);
            
            // Add language to RouteData for URL generation
            RouteData.Values["language"] = language;
        }

        private string GetHtmlLangCode(string language)
        {
            return language switch
            {
                "zh-hant" => "zh-hant",
                "en" => "en",
                "km" => "vi-vn", // As per your template, km maps to vi-vn
                _ => "zh-hant"
            };
        }

        private string GetLanguageUrl(string language)
        {
            return language switch
            {
                "zh-hant" => "",
                "en" => "en/",
                "km" => "vi-vn/",
                _ => ""
            };
        }

        protected void SetupCommonViewData(string section = "", string subsection = "")
        {
            ViewData["section"] = section;
            ViewData["subsection"] = subsection;
            ViewData["PageTitle"] = "";
            ViewData["PageDescription"] = "";
        }
    }
}
