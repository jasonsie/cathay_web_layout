using CathayWebApp.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation();

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

// Configure multilingual routing for aboard and liao sections
app.MapControllerRoute(
    name: "aboardWithLanguage",
    pattern: "{language:regex(zh-hant|en|km)}/aboard/{action=Index}/{id?}",
    defaults: new { controller = "Aboard" });

app.MapControllerRoute(
    name: "liaoWithLanguage", 
    pattern: "{language:regex(zh-hant|en|km)}/liao/{action=Index}/{id?}",
    defaults: new { controller = "Liao" });

app.MapControllerRoute(
    name: "homeWithLanguage",
    pattern: "{language:regex(zh-hant|en|km)}/{controller=Home}/{action=Index}/{id?}");

// Fallback routes without language (defaults to zh-hant)
app.MapControllerRoute(
    name: "aboard",
    pattern: "aboard/{action=Index}/{id?}",
    defaults: new { controller = "Aboard", language = "zh-hant" });

app.MapControllerRoute(
    name: "liao",
    pattern: "liao/{action=Index}/{id?}",
    defaults: new { controller = "Liao", language = "zh-hant" });

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}",
    defaults: new { language = "zh-hant" });

app.Run();
