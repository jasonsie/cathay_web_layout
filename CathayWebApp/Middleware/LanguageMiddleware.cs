using System.Globalization;

namespace CathayWebApp.Middleware
{
    public class LanguageMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string[] _supportedLanguages = { "zh-hant", "en", "km" };
        private readonly string _defaultLanguage = "zh-hant";

        public LanguageMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var path = context.Request.Path.Value ?? "";
            
            // Skip if path is for static files
            if (IsStaticFile(path))
            {
                await _next(context);
                return;
            }

            // Check if path already contains a language segment
            var segments = path.Split('/', StringSplitOptions.RemoveEmptyEntries);
            
            if (segments.Length > 0 && _supportedLanguages.Contains(segments[0]))
            {
                // Language is already in URL, continue
                await _next(context);
                return;
            }

            // If no language in URL and it's a request for a page (not API/static), 
            // detect preferred language and redirect
            if (ShouldRedirectForLanguage(path))
            {
                var preferredLanguage = DetectPreferredLanguage(context);
                var newPath = $"/{preferredLanguage}{path}";
                
                context.Response.Redirect(newPath, permanent: false);
                return;
            }

            await _next(context);
        }

        private bool IsStaticFile(string path)
        {
            if (string.IsNullOrEmpty(path)) return false;
            
            var staticExtensions = new[] { ".css", ".js", ".png", ".jpg", ".jpeg", ".gif", ".ico", ".svg", ".woff", ".woff2", ".ttf", ".eot" };
            return staticExtensions.Any(ext => path.EndsWith(ext, StringComparison.OrdinalIgnoreCase));
        }

        private bool ShouldRedirectForLanguage(string path)
        {
            if (string.IsNullOrEmpty(path) || path == "/") return true;
            
            // Don't redirect for API endpoints or specific paths
            var skipPaths = new[] { "/api", "/health", "/favicon.ico" };
            return !skipPaths.Any(skip => path.StartsWith(skip, StringComparison.OrdinalIgnoreCase));
        }

        private string DetectPreferredLanguage(HttpContext context)
        {
            // Check cookie first
            if (context.Request.Cookies.TryGetValue("preferred-language", out var cookieLanguage) 
                && _supportedLanguages.Contains(cookieLanguage))
            {
                return cookieLanguage;
            }

            // Check Accept-Language header
            var acceptLanguage = context.Request.Headers["Accept-Language"].ToString();
            if (!string.IsNullOrEmpty(acceptLanguage))
            {
                var languages = acceptLanguage.Split(',')
                    .Select(x => x.Split(';')[0].Trim())
                    .ToList();

                foreach (var lang in languages)
                {
                    if (_supportedLanguages.Contains(lang))
                        return lang;
                    
                    // Handle language variants (e.g., en-US -> en)
                    var baseLang = lang.Split('-')[0];
                    if (_supportedLanguages.Contains(baseLang))
                        return baseLang;
                }
            }

            return _defaultLanguage;
        }
    }
}
