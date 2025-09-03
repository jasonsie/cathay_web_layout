# Routing System Setup - Complete

## Overview
The routing system has been configured to correspond with the Views folder structure in the ASP.NET Core application. The system supports multilingual content with clean URL patterns.

## Folder Structure Mapping
The routing system maps URLs to the following Views folder structure:

```
Views/
├── AboutUs/              -> /zh-hant/about-us/, /en/about-us/, /km/about-us/
├── App/                  -> /zh-hant/app/, /en/app/, /km/app/
├── Business copy/        -> /zh-hant/business/, /en/business/, /km/business/
├── Careers/              -> /zh-hant/careers/, /en/careers/, /km/careers/
├── Contact/              -> /zh-hant/contact/, /en/contact/, /km/contact/
├── Download/             -> /zh-hant/download/, /en/download/, /km/download/
├── Error/                -> /zh-hant/error/, /en/error/, /km/error/
├── EthicalManagement/    -> /zh-hant/ethical-management/, /en/ethical-management/, /km/ethical-management/
├── Event/                -> /zh-hant/event/, /en/event/, /km/event/
├── Feedback/             -> /zh-hant/feedback/, /en/feedback/, /km/feedback/
├── Home/                 -> /zh-hant/, /en/, /km/
├── JobOpenings/          -> /zh-hant/job-openings/, /en/job-openings/, /km/job-openings/
├── Personal/             -> /zh-hant/personal/, /en/personal/, /km/personal/
├── Privacy/              -> /zh-hant/privacy/, /en/privacy/, /km/privacy/
└── Shared/               -> (Layout templates)
```

## URL Patterns

### 1. Language Root URLs
- Pattern: `/{language}/`
- Examples:
  - `/zh-hant/` → Home Index view
  - `/en/` → Home Index view  
  - `/km/` → Home Index view

### 2. Section Index URLs
- Pattern: `/{language}/{path}/`
- Examples:
  - `/zh-hant/business/` → Business copy/zh-hant/index.cshtml
  - `/en/personal/` → Personal/en/index.cshtml
  - `/km/about-us/` → AboutUs/km/index.cshtml

### 3. Specific Page URLs
- Pattern: `/{language}/{path}/{page}/`
- Examples:
  - `/zh-hant/business/current-account/` → Business copy/zh-hant/current-account.cshtml
  - `/en/personal/credit-cards/` → Personal/en/credit-cards.cshtml
  - `/km/event/promotion/` → Event/km/promotion.cshtml

## Supported Languages
- `zh-hant` (Traditional Chinese) - Default
- `en` (English)
- `km` (Khmer/Cambodian)

## Controller Implementation

### SiteController Actions
1. **LanguageRoot** - Handles language root URLs (e.g., `/zh-hant/`)
2. **LanguagePath** - Handles section index URLs (e.g., `/zh-hant/business/`)
3. **LanguagePathPage** - Handles specific page URLs (e.g., `/zh-hant/business/current-account/`)
4. **TestRouting** - Debug endpoint to test routing functionality

### View Resolution Priority
1. **Standard Views** - Checks Views/{Section}/{Language}/{Page}.cshtml first
2. **Reference Views** - Falls back to Reference/liao/Views structure if needed
3. **Home Redirect** - Redirects to home if no view is found

## Key Features

### Automatic Path Mapping
- URL-friendly paths (kebab-case) are automatically mapped to folder names (PascalCase)
- Example: `about-us` → `AboutUs`, `job-openings` → `JobOpenings`

### Flexible Routing
- Supports both trailing slash and non-trailing slash URLs
- Automatic language validation with fallback to default
- Graceful handling of missing views with home page redirect

### Debug Support
- `/site/testrouting` endpoint provides route debugging information
- Shows available views and current route data

## Example URLs That Should Work

After the application starts, these URLs should be accessible:

1. **Home Pages:**
   - `http://localhost:5000/zh-hant/`
   - `http://localhost:5000/en/`
   - `http://localhost:5000/km/`

2. **Section Pages:**
   - `http://localhost:5000/zh-hant/business/`
   - `http://localhost:5000/en/personal/`
   - `http://localhost:5000/km/about-us/`

3. **Specific Pages:**
   - `http://localhost:5000/zh-hant/business/current-account/`
   - `http://localhost:5000/en/personal/credit-cards/`
   - `http://localhost:5000/km/event/promotion/`

4. **Debug Endpoint:**
   - `http://localhost:5000/site/testrouting`

## Files Modified

1. **SiteController.cs** - Updated routing logic to map to Views folder structure
2. **Program.cs** - Enhanced route patterns with proper constraints
3. **BaseController.cs** - (No changes needed, already supports multilingual setup)

## Next Steps

1. Start the application with `dotnet run`
2. Test the URLs listed above
3. Use the debug endpoint to troubleshoot any routing issues
4. Verify that all existing views load correctly
5. Add any missing index.cshtml files if needed

The routing system is now fully set up and ready for testing!
