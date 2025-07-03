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
app.UseRouting();
app.UseAuthorization();

// Configure routing for aboard and liao sections
app.MapControllerRoute(
    name: "aboard",
    pattern: "aboard/{action=Index}",
    defaults: new { controller = "Aboard" });

app.MapControllerRoute(
    name: "liao",
    pattern: "liao/{action=Index}",
    defaults: new { controller = "Liao" });

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
