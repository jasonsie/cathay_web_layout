using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CathayWebApp.Models;

namespace CathayWebApp.Controllers;

public class HomeController : BaseController
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index(string language = "zh-hant")
    {
        // Setup language and common view data
        SetupLanguageViewData(language);
        SetupCommonViewData("home/");
        SetupSiteLangUrl(language);
        
        return View();
    }

    public IActionResult Privacy(string language = "zh-hant")
    {
        SetupLanguageViewData(language);
        SetupCommonViewData("home/", "privacy");
        SetupSiteLangUrl(language);
        
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
