// Language selector functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle language select dropdown in header
    const languageSelect = document.querySelector('select[role="language-select"]');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            if (this.value) {
                window.location.href = this.value;
            }
        });
    }

    // Handle language preference storage
    const currentPath = window.location.pathname;
    const languageMatch = currentPath.match(/^\/?(zh-hant|en|km)\//);
    if (languageMatch) {
        const language = languageMatch[1];
        // Store language preference in cookie
        document.cookie = `preferred-language=${language}; path=/; max-age=${60 * 60 * 24 * 365}`; // 1 year
    }

    // Handle language links in footer
    const languageLinks = document.querySelectorAll('.cf-list-wrap--lang .cf-item-link');
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href) {
                window.location.href = href;
            }
        });
    });
});
