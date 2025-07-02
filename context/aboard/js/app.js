var fraudModal = fraudModal || {};
fraudModal.prototype = {
    scope: null,
    cookie_live_hour: 0,
    cookie_name: "fraud_notification",
    cookie_value: "Y",
    show: function () {

        if (this.getCookies(this.cookie_name) != this.cookie_value) {
            $('.modal', this.scope).addClass('show');
            $('html').addClass('has-modal');
            this.setCookies(this.cookie_name, this.cookie_value, this.cookie_live_hour);
        }

    },
    getCookies: function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    setCookies: function (cname, cvalue, hours) {
        var d = new Date();
        d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    addEventListener: function () {
        $('[role="close-com-modal"]', this.scope).unbind('click.comModal').on('click.comModal', function () {
            $('.modal', this.scope).removeClass('show');
            $('html').removeClass('has-modal');
        });
    },
    init: function (a_scope) {
        this.scope = a_scope;
        this.addEventListener();
    }
}

var modal = modal || {};
modal.prototype = {
    show: function (a_url) {
        let scope = $('.component-oversea-modal--exit');
        $('[role="confirm-com-modal"]', scope).attr('href', a_url);
        $('.modal', scope).addClass('show');
        $('html').addClass('has-modal');
    },
    addEventListener: function () {
        let scope = $('.component-oversea-modal--exit');
        $('[role="close-com-modal"]', scope).unbind('click.comModal').on('click.comModal', function () {
            $('.modal', scope).removeClass('show');
            $('html').removeClass('has-modal');
        });

        $('[role="confirm-com-modal"]', scope).on('click.comModal', function (e) {
            $('.modal', scope).removeClass('show');
            $('html').removeClass('has-modal');
        })
    },
    init: function () {
        let scope = $('.component-oversea-modal--exit');
        this.addEventListener();
    }
}


let faq_title = window.faq_title;
var faq = faq || {};
faq.prototype = {
    hideAll: function () {
        let scope = $('.component-oversea-faq');
        scope.hide();
    },
    show: function (a_str) {
        let scope = $('.component-oversea-faq');
        $(scope).each(function () {
            let o = $(this);
            let section = o.attr('section');
            if (section == a_str) {
                o.show();
                //$(o).removeClass('component--slim-bottom');
                //$(o).removeClass('component--slim');
            }
        });
    },
    getData: function (a_str) {
        let scope = $('.component-oversea-faq');

        let window_w = $(window).width();
        switch (a_str) {
            case 'all':
                $(scope).each(function () {
                    let o = $(this);
                    let length = $('.cof-tab', o).length;
                    if (length == 0) {
                        o.remove();
                    }
                    let tab_length = $('.cof-tab-item', o).length;
                    if (tab_length == 1) {
                        $('.cof-tab', o).hide();
                    }
                });
                break;

            case 'account-opening':
            case 'depository-remittance':
            case 'corporate-finance':
            case 'online-banking':
            case 'information-security':
            case 'derivatives':
                $(scope).each(function () {
                    let o = $(this);
                    let section = o.attr('section');
                    let tab_length = $('.cof-tab-item', o).length;
                    console.log(section, a_str, section == a_str);
                    if (section != a_str) {
                        o.hide();
                    }
                    if (tab_length == 1) {
                        $('.cof-tab', o).hide();
                    }
                    $('.cof-subtitle', o).html(faq_title);
                    $(o).removeClass('component--slim-bottom');
                    $(o).removeClass('component--slim');
                });
                break;

            default:
                break;
        }
    },
    addEventListener: function () {

        let scope = $('.component-oversea-faq');
        $('.cof-item-answer', scope).hide();
        $('.cof-item-link', scope).on('click.faq', function (e) {
            //e.preventDefault();
            let o = $(this);
            $('.cof-item-question', o).toggleClass('cof-item-question--active');
            $('.cof-item-answer', o).slideToggle('fast');
            //return false;
        });


        $('.cof-tab-item-link', scope).on('click.tab', function (e) {
            e.preventDefault();
            let o = $(this);
            let category = o.attr('category');
            let active_tab_content = $('.cof-tab-content[category="' + category + '"]');
            let current_faq_scope = o.parents('.component-oversea-faq');
            $('.cof-tab-content', current_faq_scope).hide();
            active_tab_content.show();
            $('.cof-tab-item-link', current_faq_scope).removeClass('cot-item-link--active')
            o.addClass('cot-item-link--active');
            return false;
        });


        $('.cof-tab', scope).each(function () {
            let o = $(this);
            let tab_length = $('.cof-tab-item', o).length;
            if (tab_length == 1) {
                $('.cof-tab', o).hide();
            } else {

                $('.cof-tab-item-link', o).eq(0).trigger('click.tab');
            }
        })

        $('.cof-tab-content', scope).each(function () {
            let o = $(this);
            $('.cof-item', o).each(function (i) {
                let elm = $(this);
                var txt = $('.cof-item-question', elm).html();
                $('.cof-item-question', elm).html('Q' + (i + 1) + '. ' + txt);

            })
        })

        $(window).resize(function () {
            let scope = $('.component-oversea-faq');
            window_w = $(window).width();
            $('.cof-tab', scope).each(function () {
                let o = $(this);
                let w = 0;
                $('.cof-tab-list', o).css('width', 5000);
                $('.cof-tab-item-link', o).each(function () {
                    w += $(this).outerWidth();
                })
                if (w > window_w) {
                    $('.cof-tab-list', o).css('width', w);
                } else {
                    $('.cof-tab-list', o).css('width', '100%');
                }
            })
        }).trigger('resize');
    },
    init: function () {
        let scope = $('.component-oversea-faq');
        $(scope).each(function () {
            let o = $(this);
            let tab_length = $('.cof-tab-item', o).length;
            if (tab_length == 1) {
                $('.cof-tab', o).hide();
            }
        });
        this.addEventListener();
    }
}

let download_title = window.download_title;
var download = download || {};
download.prototype = {
    getData: function (a_str) {
        let scope = $('.component-oversea-downloads');
        switch (a_str) {
            case 'all':
                break;

            case 'depository-remittance':
            case 'online-banking':
            case 'fatca':
            case 'crs':
                $(scope).each(function () {
                    let o = $(this);
                    let section = o.attr('section');
                    if (section != a_str) {
                        o.hide();
                    }
                    $('.cod-title', o).html(download_title);
                    $(o).removeClass('component--slim-bottom');
                    $(o).removeClass('component--slim');
                });
                break;

            default:
                break;
        }
    },
    addEventListener: function () {
    },
    init: function () {
        this.addEventListener();
    }
}




$(function () {


    let white_domain_ary = [];

    white_domain_ary.push('https://www.cathaybk.com.tw');

    white_domain_ary.push('https://www.globalmyb2b.com');
    
    white_domain_ary.push('https://www.cathayholdings.com');

    white_domain_ary.push('https://www.vn.cathaybk.com');

    white_domain_ary.push('https://hk.cathaydev.com.tw');

    white_domain_ary.push('https://hk.cathaybkdev.com.tw');

    white_domain_ary.push('https://dxhkweb01');

    white_domain_ary.push('http://dxhkweb01:82');

    white_domain_ary.push('https://txhkweb01');

    white_domain_ary.push('https://newgeb.cathaybkdev.com.tw');

    white_domain_ary.push('https://www.cathaybk.com.kh');

    white_domain_ary.push('https://www.cathaybk.com.cn');



    white_domain_ary.push('https://www.cathayholdings.com');

    white_domain_ary.push('https://www.cathaylife.com.tw');

    white_domain_ary.push('https://www.cathay-ins.com.tw');

    white_domain_ary.push('https://www.cathaysec.com.tw');

    white_domain_ary.push('https://www.cathaysite.com.tw');

    white_domain_ary.push('https://www.cathayconsult.com.tw');


    //
    var myModal = modal.prototype;
    myModal.init();
    var validDomain = function (a_url) {
        if (a_url == undefined || a_url == 'javascript:;') {
            return true;
        }
        if (a_url.indexOf('http') != -1) {
            for (var i in white_domain_ary) {
                if (a_url.indexOf(white_domain_ary[i]) != -1) {
                    return true;
                }
            }
            return false;
        } else {
            return true;
        }
    }

    $("a").each(function () {
        let o = $(this);
        var url = o.attr('href')
        
        if (!validDomain(url)) {
            o.attr('role', 'outer-link');
        }
    })
    $('a[role="outer-link"]').unbind('click.comModal').on('click.comModal', function (e) {
        e.preventDefault();
        let o = $(this);
        var url = o.attr('href');

        myModal.show(url);
    })

    //language
    $('select[role="language-select"]').unbind('change.setLanguage').on('change.setLanguage', function (e) {
        e.preventDefault();
        let val = $(this).val();
        location.href = val;
    })
})