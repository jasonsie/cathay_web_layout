using CathayWebApp.Middleware;
using CathayWebApp.ViewLocationExpanders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation();

// Configure view location expanders
builder.Services.Configure<Microsoft.AspNetCore.Mvc.Razor.RazorViewEngineOptions>(options =>
{
    options.ViewLocationExpanders.Add(new ReferenceViewLocationExpander());
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

// Add language middleware before routing
app.UseMiddleware<LanguageMiddleware>();

app.UseRouting();
app.UseAuthorization();

// New unified routing structure for language-based URLs
// Route 1: domain/{language}/ -> Home Index
app.MapControllerRoute(
    name: "languageRoot",
    pattern: "{language:regex(zh-hant|en|km)}/",
    defaults: new { controller = "Site", action = "LanguageRoot" });

// Route 2: domain/{language}/{path}/{page}/ -> Specific page within a path
app.MapControllerRoute(
    name: "languagePathPage",
    pattern: "{language:regex(zh-hant|en|km)}/{path}/{page}/",
    defaults: new { controller = "Site", action = "LanguagePathPage" });

// Route 3: domain/{language}/{path}/ -> Path index
app.MapControllerRoute(
    name: "languagePath",
    pattern: "{language:regex(zh-hant|en|km)}/{path}/",
    defaults: new { controller = "Site", action = "LanguagePath" });

// Legacy routes for backward compatibility
app.MapControllerRoute(
    name: "liaoWithLanguage", 
    pattern: "{language:regex(zh-hant|en|km)}/liao/{action=Index}/{id?}",
    defaults: new { controller = "Liao" });

app.MapControllerRoute(
    name: "homeWithLanguage",
    pattern: "{language:regex(zh-hant|en|km)}/{controller=Home}/{action=Index}/{id?}");

// Fallback routes without language (defaults to zh-hant)
app.MapControllerRoute(
    name: "liao",
    pattern: "liao/{action=Index}/{id?}",
    defaults: new { controller = "Liao", language = "zh-hant" });

// Root path redirects to default language
app.MapControllerRoute(
    name: "rootRedirect",
    pattern: "",
    defaults: new { controller = "Site", action = "LanguageRoot", language = "zh-hant" });

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}",
    defaults: new { language = "zh-hant" });

// Catch-all route for invalid URLs - redirect to home
app.MapControllerRoute(
    name: "catchAll",
    pattern: "{*url}",
    defaults: new { controller = "Site", action = "RedirectToHome" });

app.Run();
