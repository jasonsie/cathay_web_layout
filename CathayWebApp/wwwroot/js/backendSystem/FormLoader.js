const translations = {
    "603": {
        "HK_DR": {
            "zh-hant": "存匯服務",
            "other": "Deposits and Remittance",
            "en": "Deposits and Remittance"
        },
        "HK_IB": {
            "zh-hant": "網上銀行",
            "other": "Internet Banking",
            "en": "Internet Banking"
        },
        "HK_FATCA": {
            "zh-hant": "FATCA 相關表格",
            "other": "FATCA IRS Forms",
            "en": "FATCA IRS Forms"
        },
        "HK_CRS": {
            "zh-hant": "CRS自我證明表格",
            "other": "CRS Self-Certification Form",
            "en": "CRS Self-Certification Form"
        },
        "HK_IB_G": {
            "zh-hant": "全球企業網路銀行服務",
            "other": "CRS Global MyB2B",
            "en": "Global MyB2B"
        },
        "HK_IB_P": {
            "zh-hant": "私人銀行網路銀行",
            "other": "Private Banking",
            "en": "Private Banking"
        },
        "HK_FATCA_I": {
            "zh-hant": "個人",
            "other": "Individual",
            "en": "Individual"
        },
        "HK_FATCA_E": {
            "zh-hant": "法人實體",
            "other": "Entity",
            "en": "Entity"
        }
    },
    "604": {
        "VN_CM": {
            "zh-hant": "現金管理",
            "other": "Quản lý tiền tệ",
            "en": "Cash Management"
        },
        "VN_OD": {
            "zh-hant": "其他",
            "other": "Tài liệu khác",
            "en": "Other Documents"
        },
        "VN_CB": {
            "zh-hant": "Consumer Banking",
            "other": "Khách Hàng Cá Nhân",
            "en": "Consumer Banking"
        }
    },
    "605": {
        "SGP_CB": {
            "zh-hant": "企業金融",
            "other": "企业金融",
            "en": "Corporate Banking"
        },
        "SGP_TF": {
            "zh-hant": "貿易融資",
            "other": "贸易融资",
            "en": "Trade Finance"
        },
        "SGP_TM": {
            "zh-hant": "金融商品",
            "other": "金融商品",
            "en": "Treasury Marketing"
        },
        "SGP_GA": {
            "zh-hant": "常規協議",
            "other": "常规协议",
            "en": "General Agreement"
        },
        "SGP_PB": {
            "zh-hant": "私人銀行",
            "other": "私人银行",
            "en": "Private Banking"
        },
        "SGP_PP": {
            "zh-hant": "隱私權保護政策",
            "other": "隐私权保护政策",
            "en": "Privacy Policy"
        },
        "SGP_CB_AO": {
            "zh-hant": "帳戶申請",
            "other": "账户申请",
            "en": "Account Opening"
        },
        "SGP_CB_G": {
            "zh-hant": "全球企網銀",
            "other": "全球企网银",
            "en": "Global my B2B"
        },
        "SGP_TF_IB": {
            "zh-hant": "進口貿易",
            "other": "进口贸易",
            "en": "Import Business"
        },
        "SGP_TF_EB": {
            "zh-hant": "出口貿易",
            "other": "出口贸易",
            "en": "Export Business"
        },
        "SGP_TF_TB": {
            "zh-hant": "轉讓業務",
            "other": "转让业务",
            "en": "Transfer Business"
        },
        "SGP_TF_GB": {
            "zh-hant": "保證業務",
            "other": "保证业务",
            "en": "Guarantee Business"
        },
        "SGP_TF_OTHER": {
            "zh-hant": "其他",
            "other": "其他",
            "en": "Others"
        },
        "SGP_GA_F": {
            "zh-hant": "授信額度",
            "other": "授信额度",
            "en": "Facilities"
        },
        "SGP_GA_RD": {
            "zh-hant": "存匯服務",
            "other": "存汇服务",
            "en": "Remittance & Deposits"
        }
    }
};

document.addEventListener("DOMContentLoaded", function () {
    //console.log("開始載入表單資料...");

    // 若 lang 為空，預設為 zh-hant
    if (typeof lang === 'undefined' || lang === "") {
        lang = "zh-hant";
    }
    //console.log("當前語言設定：", lang);

    // 語言檢查邏輯修正
    if (lang !== "en" && lang !== "zh-hant") {
        lang = "other";
    }

    // 開始載入表單資料（帶重試機制）
    loadFormsWithRetry();
});

// 解析時間戳 - 支援數字和字串格式
function parseTimestamp(timestampValue) {
    if (!timestampValue && timestampValue !== 0) {
        return 0;
    }

    // 如果已經是數字，直接返回
    if (typeof timestampValue === 'number') {
        return timestampValue;
    }

    // 如果是字串，嘗試轉換為數字
    if (typeof timestampValue === 'string') {
        const parsed = parseInt(timestampValue, 10);
        return isNaN(parsed) ? 0 : parsed;
    }

    return 0;
}

// 雙重保護：對表單資料進行時間戳排序
function sortFormsByTimestamp(forms) {
    return forms.sort((a, b) => {
        const timestampA = parseTimestamp(a.updateDateTime);
        const timestampB = parseTimestamp(b.updateDateTime);

        // 降序排列：較新的時間戳在前
        return timestampB - timestampA;
    });
}

// 帶重試機制的表單載入
function loadFormsWithRetry(retryCount = 0, maxRetries = 10, retryDelay = 3000) {
    const jsonPath = `/OVSWS/Content/backendSystem/${branchId}/Form.json`;
    //console.log(`載入 JSON 路徑：${jsonPath}，重試次數：${retryCount}/${maxRetries}`);

    fetch(jsonPath)
        .then(response => {
            //console.log("收到 JSON 回應，狀態：", response.status);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            //console.log("成功解析 JSON 資料，表單數量：", data.length);

            // 檢查是否有表單資料
            if (!data || data.length === 0) {
                if (retryCount < maxRetries) {
                    //console.log(`表單資料為空，${retryDelay}ms 後重試...`);
                    setTimeout(() => {
                        loadFormsWithRetry(retryCount + 1, maxRetries, retryDelay);
                    }, retryDelay);
                    return;
                } else {
                    throw new Error("表單資料為空");
                }
            }

            // 🔒 雙重保護第1層：在驗證PDF之前先對資料進行時間戳排序
            const sortedData = sortFormsByTimestamp(data);

            // 驗證PDF檔案是否存在
            validatePdfsAndRender(sortedData, retryCount, maxRetries, retryDelay);
        })
        .catch(error => {
            if (retryCount < maxRetries) {
                setTimeout(() => {
                    loadFormsWithRetry(retryCount + 1, maxRetries, retryDelay);
                }, retryDelay);
            } else {
                showErrorMessage();
            }
        });
}

// 驗證PDF檔案並渲染
function validatePdfsAndRender(data, retryCount, maxRetries, retryDelay) {
    //console.log("開始驗證PDF檔案是否存在...");

    const pdfCheckPromises = [];
    const validForms = [];

    data.forEach(form => {
        if (form.branchId === branchId) {
            const isExternalLink = (typeof form.fileName === 'string' &&
                (form.fileName.startsWith('http://') || form.fileName.startsWith('https://')));

            if (isExternalLink) {
                // 外部連結直接添加到有效表單
                validForms.push(form);
            } else {
                // 內部PDF檔案需要驗證
                const pdfPath = `/OVSWS/Content/backendSystem/pdf/form/${getBranchFolder(branchId)}/${form.formType}/${form.formId}/${form.fileName}`;

                const checkPromise = fetch(pdfPath, { method: 'HEAD' })
                    .then(response => {
                        if (response.ok) {
                            validForms.push(form);
                            return { success: true, form: form };
                        } else {
                            //console.log(`PDF檔案不存在：${pdfPath}`);
                            return { success: false, form: form, path: pdfPath };
                        }
                    })
                    .catch(error => {
                        //console.log(`PDF檔案檢查失敗：${pdfPath}，錯誤：${error.message}`);
                        return { success: false, form: form, path: pdfPath, error: error.message };
                    });

                pdfCheckPromises.push(checkPromise);
            }
        }
    });

    // 等待所有PDF檢查完成
    Promise.all(pdfCheckPromises)
        .then(results => {
            const failedPdfs = results.filter(r => !r.success);

            if (failedPdfs.length > 0) {
                //console.log(`發現 ${failedPdfs.length} 個PDF檔案不存在`);

                if (retryCount < maxRetries) {
                    //console.log(`等待PDF檔案生成，${retryDelay}ms 後重試...`);
                    setTimeout(() => {
                        loadFormsWithRetry(retryCount + 1, maxRetries, retryDelay);
                    }, retryDelay);
                    return;
                } else {
                    console.warn(`⚠️ 達到最大重試次數，仍有 ${failedPdfs.length} 個PDF檔案不存在，將渲染現有的有效表單`);
                }
            }

            // 檢查是否有有效的表單資料
            if (validForms.length === 0) {
                showErrorMessage();
                return;
            }

            // 🔒 雙重保護第2層：對驗證通過的表單再次進行時間戳排序
            const finalSortedValidForms = sortFormsByTimestamp(validForms);

            // 按照 formType 和 formTypeKind 分組
            const groupedForms = {};

            finalSortedValidForms.forEach(form => {
                // 取得表單類型（使用當前語言）
                const formType = getLocalizedText(form.formType, lang, branchId);

                if (!groupedForms[formType]) {
                    groupedForms[formType] = {};
                }

                // 取得表單類型種類（使用當前語言）
                const formTypeKind = getLocalizedText(form.formTypeKind, lang, branchId) || "General";

                if (!groupedForms[formType][formTypeKind]) {
                    groupedForms[formType][formTypeKind] = [];
                }

                // 將表單添加到相應的分組
                groupedForms[formType][formTypeKind].push({
                    ...form,
                    formName: getLocalizedName(form, lang)
                });
            });

            // 🔒 雙重保護第3層：對每個分組內的表單也進行時間戳排序
            for (const formType in groupedForms) {
                for (const formTypeKind in groupedForms[formType]) {
                    groupedForms[formType][formTypeKind] = sortFormsByTimestamp(groupedForms[formType][formTypeKind]);
                }
            }

            // 生成 HTML
            renderForms(groupedForms);
        })
        .catch(error => {
            showErrorMessage();
        });
}


// 取得本地化的表單名稱
function getLocalizedName(form, language) {
    if (language === "zh-hant" && form.formNameTW) {
        return form.formNameTW;
    } else if (language === "en" && form.formNameEN) {
        return form.formNameEN;
    }
    return form.formNameOther;
}

// 統一處理所有本地化文字的函數
function getLocalizedText(textKey, language, branchId) {
    // 檢查是否有該分行的翻譯
    if (translations[branchId] &&
        translations[branchId][textKey] &&
        translations[branchId][textKey][language]) {
        return translations[branchId][textKey][language];
    }

    // 如果沒有找到翻譯，直接返回英文版本
    if (translations[branchId] &&
        translations[branchId][textKey] &&
        translations[branchId][textKey]["en"]) {
        return translations[branchId][textKey]["en"];
    }

    // 如果連英文版本也沒有，返回原始文字
    return textKey;
}

// 獲取排序後的鍵
function getSortedKeys(branchId, type = 'formType') {
    if (!translations[branchId]) return [];

    // 定義排序順序
    const formTypePrefixes = {
        '603': ['HK_DR', 'HK_IB', 'HK_FATCA', 'HK_CRS'],
        '604': ['VN_CM', 'VN_OD', 'VN_CB'],
        '605': ['SGP_CB', 'SGP_TF', 'SGP_TM', 'SGP_GA', 'SGP_PB', 'SGP_PP']
    };

    const formTypeKindPrefixes = {
        '603': ['HK_IB_G', 'HK_IB_P', 'HK_FATCA_I', 'HK_FATCA_E'],
        '604': [],
        '605': ['SGP_CB_AO', 'SGP_CB_G', 'SGP_TF_IB', 'SGP_TF_EB', 'SGP_TF_TB', 'SGP_TF_GB', 'SGP_TF_OTHER', 'SGP_GA_F', 'SGP_GA_RD']
    };

    const order = type === 'formType' ? formTypePrefixes[branchId] : formTypeKindPrefixes[branchId];
    return order;
}

// 渲染表單
function renderForms(groupedForms) {
    const container = document.querySelector('.forms-container');
    if (!container) {
        return;
    }

    let html = '';

    // 檢查是否有表單資料
    const formTypeCount = Object.keys(groupedForms).length;
    if (formTypeCount === 0) {
        showErrorMessage(lang);
        return;
    }

    // 獲取排序後的 formType 鍵
    const sortedFormTypes = getSortedKeys(branchId, 'formType');
    const formTypeKeys = Object.keys(groupedForms);
    // 將 groupedForms 的鍵按照 sortedFormTypes 排序，未定義的鍵放在末尾
    const orderedFormTypes = [
        ...sortedFormTypes.filter(key => formTypeKeys.includes(getLocalizedText(key, lang, branchId))),
        ...formTypeKeys.filter(key => !sortedFormTypes.some(prefix => getLocalizedText(prefix, lang, branchId) === key))
    ].map(key => getLocalizedText(key, lang, branchId));

    // 遍歷排序後的 formType (大類別)
    for (const formType of orderedFormTypes) {
        if (!groupedForms[formType]) continue;

        const categories = groupedForms[formType];
        const firstCategoryForms = Object.values(categories)[0];
        const firstForm = firstCategoryForms[0];
        const sectionName = firstForm.formType;

        const bgClass = 'component-small';

        html += `
            <div section='${sectionName}' class='component-oversea-downloads ${bgClass}'>
                <div class="cod-inner">
                    <h2 class='cod-title'>${formType}</h2>
        `;

        // 獲取排序後的 formTypeKind 鍵
        const sortedFormTypeKinds = getSortedKeys(branchId, 'formTypeKind');
        const formTypeKindKeys = Object.keys(categories);
        // 將 categories 的鍵按照 sortedFormTypeKinds 排序，未定義的鍵放在末尾
        const orderedFormTypeKinds = [
            ...sortedFormTypeKinds.filter(key => formTypeKindKeys.includes(getLocalizedText(key, lang, branchId))),
            ...formTypeKindKeys.filter(key => !sortedFormTypeKinds.some(prefix => getLocalizedText(prefix, lang, branchId) === key))
        ].map(key => getLocalizedText(key, lang, branchId));

        // 遍歷排序後的 formTypeKind (小類別)
        for (const formTypeKind of orderedFormTypeKinds) {
            if (!categories[formTypeKind]) continue;

            const forms = categories[formTypeKind];
            if (formTypeKind !== "General" && formTypeKind !== "一般業務" && formTypeKind !== "一般业务" && formTypeKind !== "") {
                html += `
                    <h3 class='cod-subtitle'>${formTypeKind}</h3>
                    <div class="cod-list-wrap">
                `;
            } else {
                html += `
                    <div class="cod-list-wrap">
                `;
            }

            html += `
                <ul class='cod-list'>
            `;

            // 🔒 雙重保護第4層：渲染前最後一次確保表單按時間戳排序
            const finalSortedForms = sortFormsByTimestamp([...forms]);

            finalSortedForms.forEach((form, index) => {
                const isExternalLink = (typeof form.fileName === 'string' &&
                    (form.fileName.startsWith('http://') || form.fileName.startsWith('https://')));

                const pdfPath = isExternalLink
                    ? form.fileName
                    : `/OVSWS/Content/backendSystem/pdf/form/${getBranchFolder(branchId)}/${form.formType}/${form.formId}/${form.fileName}`;

                const externalAttrs = isExternalLink ? `rel="noreferrer"` : '';
                const btnClass = 'cod-item-btn cod-item-btn--large';
                const specialClass = 'cod-item';

                // 為最新的表單添加視覺標記（可選）
                const timestampAttr = form.updateDateTime ? `data-timestamp="${form.updateDateTime}"` : '';

                html += `
                    <li class='${specialClass}' ${timestampAttr}>
                        <a href="${pdfPath}" target="_blank" rel="noopener" ${externalAttrs} class='${btnClass}'>
                            <span class='cod-item-btn-text'>${form.formName}</span>
                        </a>
                    </li>
                `;
            });

            // 檢查是否為 Cash Management 類別，如果是則加上 CheckSum 連結
            if (formType === "Cash Management" || formType === "現金管理" || formType === "Quản lý tiền tệ") {
                html += `
                    <li class='cod-item'>
                        <a href="/OVSWS/Content/pdf/vn/hcmc/cash-management/CheckSumCalculator_version1.0.rar" target="_blank" rel="noopener" class='cod-item-btn cod-item-btn--large'>
                            <span class='cod-item-btn-text'>
                                CheckSum
                            </span>
                        </a>
                    </li>
                `;
            }

            // 檢查是否為 Export Business 類別（新加坡分行），如果是則加上 Draft 連結
            if ((formTypeKind === "Export Business" || formTypeKind === "出口貿易" || formTypeKind === "出口贸易") && branchId === "605") {
                html += `
                    <li class='cod-item'>
                        <a href="/OVSWS/Content/pdf/sg/trade-finance/singapore-branch-ex8-draft-for-customer-use.xls" target="_blank" rel="noopener" class='cod-item-btn cod-item-btn--large'>
                            <span class='cod-item-btn-text'>Draft (For Customer Use)</span>
                        </a>
                    </li>
                `;
            }

            html += `
                    </ul>
                </div>
            `;
        }

        html += `
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}

function getBranchFolder(branchId) {
    switch (branchId) {
        case "603":
            return "hongkong";
        case "604":
            return "vn";
        case "605":
            return "sg";
        default:
            return "hongkong";
    }
}