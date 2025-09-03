# URL Routing Refactor Documentation

## Overview
The URL routing has been refactored to provide a unified structure for language-specific content mapping.

## New URL Structure

### 1. Root Language URL
**Pattern:** `domain/{language}/`
**Example:** 
- `https://example.com/zh-hant/` → Home Index view
- `https://example.com/en/` → Home Index view  
- `https://example.com/km/` → Home Index view

**Controller:** `SiteController.LanguageRoot`
**View:** `~/Views/Home/Index.cshtml`

### 2. Path-based URLs
**Pattern:** `domain/{language}/{path}/`
**Examples:**
- `https://example.com/zh-hant/business/` → Business index view
- `https://example.com/en/personal/` → Personal index view
- `https://example.com/km/about-us/` → About Us index view

**Controller:** `SiteController.LanguagePath`
**View Resolution:** 
1. Try to find view in `~/Reference/liao/Views/{Path}/{language}/Index.cshtml`
2. Fallback to `~/Views/Liao/Index.cshtml`

### 3. Page-specific URLs
**Pattern:** `domain/{language}/{path}/{page}/`
**Examples:**
- `https://example.com/zh-hant/business/current-account/` → Current Account page
- `https://example.com/en/business/commercial-loan/` → Commercial Loan page

**Controller:** `SiteController.LanguagePathPage`
**View Resolution:**
1. Try to find view in `~/Reference/liao/Views/{Path}/{language}/{page}.cshtml`
2. Fallback to path index view

## Supported Languages
- `zh-hant` (Traditional Chinese) - Default
- `en` (English)
- `km` (Khmer/Cambodian)

## Path Mappings
The system maps URL paths to corresponding folder structures:

| URL Path | Reference Folder | Description |
|----------|------------------|-------------|
| `business` | `Business` | Business banking services |
| `personal` | `Personal` | Personal banking services |
| `about-us` | `AboutUs` | About the bank |
| `careers` | `Careers` | Job opportunities |
| `contact` | `Contact` | Contact information |
| `ethical-management` | `EthicalManagement` | Ethical guidelines |
| `event` | `Event` | Bank events |
| `feedback` | `Feedback` | Customer feedback |
| `job-openings` | `JobOpenings` | Job listings |
| `privacy` | `Privacy` | Privacy policy |
| `app` | `App` | Mobile app information |

## Implementation Details

### Controllers
- **SiteController:** New unified controller handling all language-path routing
- **HomeController:** Handles main home page routes
- **LiaoController:** Handles legacy `/liao/` routes (backward compatibility)

### View Location Expander
- **ReferenceViewLocationExpander:** Extends view search to include Reference folder views

### View Data Setup
Each controller action sets up the following ViewData:
- `lang`: Current language code
- `siteLangUrl`: Language-specific URL prefix (e.g., "/zh-hant/")
- `section`: Current section (home/liao)
- `subsection`: Current subsection (path name)

### Routing Order (Program.cs)
1. `{language}/` → Site.LanguageRoot (Home)
2. `{language}/{path}/{page}/` → Site.LanguagePathPage
3. `{language}/{path}/` → Site.LanguagePath
4. Legacy routes for backward compatibility
5. Root redirect to default language

## Usage Examples

### Creating New Content
To add new content for a path like "products":

1. Create folder structure: `Reference/liao/Views/Products/{language}/`
2. Add views: `Index.cshtml`, `savings.cshtml`, etc.
3. URLs will automatically work:
   - `/zh-hant/products/` → Products index
   - `/en/products/savings/` → Savings product page

### Linking Between Pages
In views, use the `siteLangUrl` ViewData for consistent language-aware linking:

```html
<a href="@ViewData["siteLangUrl"]business/current-account/">Current Account</a>
```

### Backward Compatibility
Legacy URLs continue to work:
- `/` → Home page
- `/liao/` → Still works
- `/zh-hant/` → Home page with Traditional Chinese

## Testing the Implementation

### Test URLs
1. `http://localhost:5000/zh-hant/` → Should show Home index
2. `http://localhost:5000/en/business/` → Should show Business index in English
3. `http://localhost:5000/km/business/` → Should show Business index in Khmer
4. `http://localhost:5000/zh-hant/business/current-account/` → Should show Current Account page (if exists)

### Debug Information
The system logs which views it attempts to find, making it easy to debug missing views or routing issues.
