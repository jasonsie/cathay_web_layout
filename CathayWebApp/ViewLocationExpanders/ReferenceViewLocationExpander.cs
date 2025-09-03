using Microsoft.AspNetCore.Mvc.Razor;

namespace CathayWebApp.ViewLocationExpanders
{
    public class ReferenceViewLocationExpander : IViewLocationExpander
    {
        public IEnumerable<string> ExpandViewLocations(ViewLocationExpanderContext context, IEnumerable<string> viewLocations)
        {
            // Add reference paths to the view location search
            var expandedLocations = new List<string>
            {
                "/Reference/liao/Views/{1}/{0}.cshtml",
                "/Reference/liao/Views/Shared/{0}.cshtml"
            };

            // Add original locations
            expandedLocations.AddRange(viewLocations);

            return expandedLocations;
        }

        public void PopulateValues(ViewLocationExpanderContext context)
        {
            // No additional values needed for this expander
        }
    }
}
