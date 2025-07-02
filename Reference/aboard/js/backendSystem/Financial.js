document.addEventListener("DOMContentLoaded", function () {
    // 除錯：記錄初始變數狀態
    console.log("🔍 開始執行 Financial.js");
    console.log("🔍 window.lang 初始值:", window.lang);
    console.log("🔍 window.branchId 初始值:", window.branchId);

    // 初始化 lang，模仿 LatestNews 的方式
    let lang = window.lang || "";
    if (lang === "") {
        lang = "zh-hant";
        console.log("🔍 lang 為空或未定義，設為預設值: zh-hant");
    } else {
        console.log("🔍 使用 window.lang 值:", lang);
    }

    // 初始化 branchId
    let branchId = window.branchId || "603"; // 預設為 hongkong
    if (!window.branchId) {
        console.log("🔍 window.branchId 未定義，設為預設值: 603 (hongkong)");
    } else {
        console.log("🔍 使用 window.branchId 值:", branchId);
    }

    // 除錯：記錄當前頁面路徑
    console.log("🔍 當前頁面路徑:", window.location.pathname);

    // 輔助函數：根據 branchId 映射資料夾名稱
    function getBranchFolder(branchId) {
        console.log("🔍 getBranchFolder 輸入 branchId:", branchId);
        let folder;
        switch (branchId) {
            case "610":
                folder = "la";
                break;
            case "614":
                folder = "ph";
                break;
            case "603":
                folder = "hongkong";
                break;
            case "604":
                folder = "vn";
                break;
            default:
                folder = "hongkong";
                console.log("🔍 branchId 未匹配，設為預設資料夾: hongkong");
        }
        console.log("🔍 getBranchFolder 輸出資料夾:", folder);
        return folder;
    }

    // 輔助函數：比對 financial 是否符合條件（無 Country 和 City，直接返回 true）
    function matchesItem(item) {
        console.log("🔍 matchesItem 檢查:", item);
        return true; // 由於資料無 Country 和 City，預設全部匹配
    }

    // 財務文件列表頁面的邏輯
    const financialList = document.querySelector(".component-oversea-list .col-list");
    if (financialList && window.location.pathname.includes('/financial-disclosure')) {
        console.log("🔍 找到 financialList 元素:", financialList);
        console.log("🔍 確認為 /financial-disclosure 頁面，開始載入 Financial.json");

        const jsonPath = `/OVSWS/Content/backendSystem/${branchId}/Financial.json`;
        console.log("🔍 JSON 請求路徑:", jsonPath);

        fetch(jsonPath)
            .then(response => {
                console.log("🔍 fetch 回應狀態:", response.status, response.statusText);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}, StatusText: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("🔍 成功載入 Financial.json，數據:", data);

                // 按 showDateTime 降序排序
                data.sort((a, b) => b.showDateTime.localeCompare(a.showDateTime));
                console.log("🔍 排序後的數據:", data);

                let financialHtml = "";
                const existingFinancial = financialList.innerHTML;
                console.log("🔍 現有 financialList 內容:", existingFinancial);

                data.forEach((item, index) => {
                    console.log(`🔍 處理第 ${index + 1} 筆資料:`, item);
                    if (matchesItem(item)) {
                        const title = lang === "zh-hant" ? item.finNameTW :
                            lang === "en" ? item.finNameEN :
                                item.finNameOther;
                        console.log(`🔍 選擇的標題 (lang=${lang}):`, title);

                        const branchFolder = getBranchFolder(item.branchId);
                        const pdfPath = `/OVSWS/Content/backendSystem/pdf/financial/${branchFolder}/${item.finId}/${item.fileName}`;
                        console.log(`🔍 生成的 PDF 路徑:`, pdfPath);

                        financialHtml += `
                    <li class='col-item'>
                        <span class='col-item-date'>${item.showDateTime}</span>
                        <span class='col-item-title'>${title}</span>
                        <a href="${pdfPath}" target="_blank" rel='noopener' class='col-item-btn'>
                            <span class='col-item-btn-text'>PDF</span>
                        </a>
                    </li>
                `;
                        console.log(`🔍 生成的 HTML 片段 (第 ${index + 1} 筆):`, financialHtml);
                    } else {
                        console.log(`🔍 第 ${index + 1} 筆資料未通過 matchesItem 檢查，跳過`);
                    }
                });

                if (financialHtml) {
                    financialList.innerHTML = financialHtml + existingFinancial;
                    console.log("🔍 已更新 financialList 內容:", financialList.innerHTML);
                } else {
                    console.log("🔍 無新 HTML 內容生成，保持現有內容");
                }
            })
            .catch(error => {
                console.error("❌ 載入財務文件失敗:", error);
                console.error("❌ 錯誤詳情:", {
                    message: error.message,
                    stack: error.stack,
                    jsonPath: jsonPath
                });
            });
    } else {
        console.log("🔍 未找到 financialList 元素或非 /financial-disclosure 頁面，跳過處理");
        console.log("🔍 financialList:", financialList);
        console.log("🔍 當前路徑是否包含 /financial-disclosure:", window.location.pathname.includes('/financial-disclosure'));
    }
});