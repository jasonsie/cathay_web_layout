# .NET Web Application Setup Specification

## Overview
This specification outlines the setup process for a .NET web application that will serve the .cshtml view files located in the `aboard` and `liao` directories.

## Prerequisites
- .NET 8.0 SDK or later
- Visual Studio 2022 or Visual Studio Code
- Git (for version control)

## Project Structure
```
cathay_web_layout/
├── SPEC.md
├── aboard/
│   └── *.cshtml files
├── liao/
│   └── *.cshtml files
└── CathayWebApp/ (to be created)
    ├── Controllers/
    ├── Views/
    │   ├── Aboard/
    │   └── Liao/
    ├── wwwroot/
    ├── Program.cs
    └── CathayWebApp.csproj
```

## Setup Instructions

### 1. Create .NET MVC Application
```bash
# Navigate to the project root
cd /Users/jason/Developer/z-lab/cathay/cathay_web_layout

# Create new MVC application
dotnet new mvc -n CathayWebApp
cd CathayWebApp
```

### 2. Configure Application Structure

#### Update Program.cs
```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllersWithViews();

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
```

### 3. Create Controllers

#### AboardController.cs
```csharp
using Microsoft.AspNetCore.Mvc;

namespace CathayWebApp.Controllers
{
    public class AboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        
        // Add additional action methods for each .cshtml file in aboard directory
        // Example: public IActionResult PageName() { return View(); }
    }
}
```

#### LiaoController.cs
```csharp
using Microsoft.AspNetCore.Mvc;

namespace CathayWebApp.Controllers
{
    public class LiaoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        
        // Add additional action methods for each .cshtml file in liao directory
        // Example: public IActionResult PageName() { return View(); }
    }
}
```

### 4. Organize Views

#### Copy .cshtml files to appropriate Views directories:
- Copy all .cshtml files from `../aboard/` to `Views/Aboard/`
- Copy all .cshtml files from `../liao/` to `Views/Liao/`

#### Create _ViewStart.cshtml
```html
@{
    Layout = "_Layout";
}
```

#### Create Shared/_Layout.cshtml
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - Cathay Web Layout</title>
    <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
</head>
<body>
    <header>
        <nav class="navbar">
            <div class="container">
                <a class="navbar-brand" href="/">Cathay Web Layout</a>
                <div class="navbar-nav">
                    <a class="nav-link" href="/aboard">Aboard</a>
                    <a class="nav-link" href="/liao">Liao</a>
                </div>
            </div>
        </nav>
    </header>
    
    <main role="main" class="container">
        @RenderBody()
    </main>
    
    <footer>
        <div class="container">
            &copy; @DateTime.Now.Year - Cathay Web Layout
        </div>
    </footer>
    
    <script src="~/js/site.js" asp-append-version="true"></script>
    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>
```

### 5. Configure Static Files

#### wwwroot/css/site.css
Copy existing CSS files from the project into the wwwroot directory:
- Copy CSS files to `wwwroot/css/`
- Copy JavaScript files to `wwwroot/js/`
- Copy images to `wwwroot/images/`

### 6. Update Project Dependencies

#### CathayWebApp.csproj
Ensure the following packages are included:
```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>
</Project>
```

## Running the Application

### Development Mode
```bash
cd CathayWebApp
dotnet run
```

The application will be available at:
- https://localhost:5001 (HTTPS)
- http://localhost:5000 (HTTP)

### Access Pages
- Aboard pages: `https://localhost:5001/aboard`
- Liao pages: `https://localhost:5001/liao`

## File Integration Steps

1. **Analyze existing .cshtml files** in aboard and liao directories
2. **Create corresponding controller actions** for each view
3. **Copy and organize views** into the MVC structure
4. **Integrate existing CSS and JavaScript** into wwwroot
5. **Update routing** if custom URLs are needed
6. **Test all pages** to ensure proper rendering

## Development Workflow

1. **Start the application**: `dotnet run`
2. **Make changes** to .cshtml files in Views directories
3. **Refresh browser** to see changes (hot reload enabled)
4. **Add new pages** by creating controller actions and corresponding views

## Additional Configuration

### For Production Deployment
- Configure HTTPS certificates
- Set up proper error handling
- Configure logging
- Optimize static file caching
- Set up application insights (optional)

### For Development
- Enable detailed error pages
- Configure auto-refresh for view changes
- Set up debugging breakpoints

## Troubleshooting

### Common Issues
1. **Views not found**: Ensure controller names match directory names
2. **CSS not loading**: Check file paths in wwwroot
3. **Routing issues**: Verify controller and action names match URLs

### Debug Commands
```bash
# Check .NET version
dotnet --version

# Restore packages
dotnet restore

# Build application
dotnet build

# Run with specific environment
dotnet run --environment Development
```

## Next Steps
1. Create the .NET application structure
2. Copy existing .cshtml files to appropriate Views directories
3. Integrate existing CSS/JS assets
4. Test all pages for proper rendering
5. Configure any additional routing or functionality as needed