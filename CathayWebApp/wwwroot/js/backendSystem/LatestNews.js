document.addEventListener("DOMContentLoaded", function () {
    // 若 lang 為空，預設為 zh-hant
    if (lang === "") {
        lang = "zh-hant";
    }

    // 從 URL 取得 news id（例如 /LatestNews?id=2）
    const urlParams = new URLSearchParams(window.location.search);
    let newsId = urlParams.get('id');
    if (newsId) {
        newsId = Number(newsId);
        localStorage.setItem('LatestNewsId', newsId);
    } else {
        newsId = Number(localStorage.getItem('LatestNewsId'));
    }
    // 輔助函數：比對 news 是否符合 country 與 city（country 或 city 為空時則略過該比對）
    function matchesNews(news) {
        let matchCountry = true;
        let matchCity = true;
        if (country && country.trim() !== "") {
            matchCountry = news.Country.toLowerCase() === country.toLowerCase();
        }
        if (city && city.trim() !== "") {
            matchCity = news.City.toLowerCase() === city.toLowerCase();
        }
        return matchCountry && matchCity;
    }

    // 檢查是否是詳情頁面（假設網址包含 '/LatestNews'）
    const isDetailPage = window.location.pathname.includes('/LatestNews');

    if (isDetailPage) {
        const jsonPath = `/OVSWS/Content/backendSystem/${branchId}/LatestNews.json`;
        fetch(jsonPath)
            .then(response => response.json())
            .then(data => {
                let newsData;
                if (newsId) {
                    newsData = data.find(news =>
                        news.id === newsId && matchesNews(news)
                    );
                } else {
                    newsData = data.find(news =>
                        matchesNews(news)
                    );
                }

                if (!newsData) {
                    console.error('找不到對應的新聞數據');
                    return;
                }

                // 根據不同語系取得 title 與 content
                const title = lang === "zh-hant" ? newsData.titleTW :
                    lang === "en" ? newsData.titleEN :
                        newsData.titleOther;

                const content = lang === "zh-hant" ? newsData.contentTW :
                    lang === "en" ? newsData.contentEN :
                        newsData.contentOther;

                // 更新頁面內容
                const newsTitleEl = document.querySelector('.component-newsview-title');
                if (newsTitleEl) {
                    newsTitleEl.textContent = title;
                } else {
                    console.error("找不到 .component-newsview-title");
                }

                const newsBodyEl = document.querySelector('.component-newsview-body');
                if (newsBodyEl) {
                    newsBodyEl.innerHTML = `<p>${content}</p>`;
                } else {
                    console.error("找不到 .component-newsview-body");
                }

                document.title = title;
            })
            .catch(error => console.error("❌ 載入新聞失敗:", error));
        return;
    }

    // 新聞列表頁面的邏輯
    const newsListCol = document.querySelector(".component-newslist-col");
    if (!newsListCol) {
        console.error("❌ 錯誤: 找不到 `.component-newslist-col`，無法插入新聞");
        return;
    }

    const jsonPath = `/OVSWS/Content/backendSystem/${branchId}/LatestNews.json`;

    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            let newsHtml = "";
            const existingNews = newsListCol.innerHTML;

            // 定義工具函數
            function buildUrl(...segments) {
                return '/' + segments.filter(segment => segment && segment.trim() !== '').join('/');
            }

            data.forEach(news => {
                if (matchesNews(news)) {
                    let title = lang === "zh-hant" ? news.titleTW :
                        lang === "en" ? news.titleEN :
                            news.titleOther;

                    let href = "";
                    // 當 country 為 hongkong 時，根據語系決定 URL 格式
                    if (country.toLowerCase() === "hongkong") {
                        if (lang.toLowerCase() === "zh-hant") {
                            // 繁體不加入語系參數，生成 /hongkong/LatestNews?id=1
                            href = buildUrl(country, 'LatestNews') + `?id=${news.id}`;
                        } else {
                            // 其他語系則加入語系參數，例如 /hongkong/en/LatestNews?id=1
                            href = buildUrl(country, lang, 'LatestNews') + `?id=${news.id}`;
                        }
                    } else {
                        // 其他 country 按原邏輯處理
                        if (lang === "zh-hant") {
                            href = buildUrl(country, city, 'news', 'LatestNews') + `?id=${news.id}`;
                        } else {
                            href = buildUrl(country, city, lang, 'news', 'LatestNews') + `?id=${news.id}`;
                        }
                    }

                    newsHtml += `
                <a class="component-newsitem" href="${href}">
                    <div class="component-newsitem-inner">
                        <div class="component-newsitem-date">${news.uploadDate}</div>
                        <div class="component-newsitem-cont">
                            <h4 class="component-newsitem-title">${title}</h4>
                        </div>
                    </div>
                </a>
                    `;
                }
            });

            if (newsHtml) {
                newsListCol.innerHTML = newsHtml + existingNews;
            }
        })
        .catch(error => console.error("❌ 載入新聞失敗:", error));
});

// 全域工具函數（若需要多處使用）
function buildUrl(...segments) {
    // 過濾掉空的或只包含空白字元的片段
    return '/' + segments.filter(segment => segment && segment.trim() !== '').join('/');
}
