using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;

namespace CathayWebApp.Helpers
{
    public static class UrlHelperExtensions
    {
        public static string? ActionWithLanguage(this IUrlHelper urlHelper, string action, string controller, string? language = null, object? routeValues = null)
        {
            // Get current language from route data if not specified
            if (string.IsNullOrEmpty(language))
            {
                language = urlHelper.ActionContext.RouteData.Values["language"]?.ToString() ?? "zh-hant";
            }

            var values = new RouteValueDictionary(routeValues);
            values["language"] = language;
            values["action"] = action;
            values["controller"] = controller;

            return urlHelper.Action(action, controller, values);
        }

        public static string? RouteWithLanguage(this IUrlHelper urlHelper, string routeName, string? language = null, object? routeValues = null)
        {
            // Get current language from route data if not specified
            if (string.IsNullOrEmpty(language))
            {
                language = urlHelper.ActionContext.RouteData.Values["language"]?.ToString() ?? "zh-hant";
            }

            var values = new RouteValueDictionary(routeValues);
            values["language"] = language;

            return urlHelper.RouteUrl(routeName, values);
        }

        public static string? SwitchLanguage(this IUrlHelper urlHelper, string newLanguage)
        {
            var routeData = urlHelper.ActionContext.RouteData;
            var values = new RouteValueDictionary(routeData.Values);
            values["language"] = newLanguage;

            return urlHelper.RouteUrl(values);
        }
    }
}
