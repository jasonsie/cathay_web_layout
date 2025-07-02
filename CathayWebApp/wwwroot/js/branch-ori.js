function branch() {
    let scope;
    let mode;
    let windowW;
    let windowH;
    let name;
    let breakPoint = 1024;
    let idx = 0;
    let compName = 'branch';
    let map;
    let searchKeyword;
    let branchInfo;
    //let jsonURL = "./assets/json/branch.json";
    //
    ///////////////////////////////////////////////////////////////////////
    let resize = function(){
        windowW = $(window).width();
        windowH = $(window).height();

        if(windowW>=breakPoint){
            if(mode!="lg"){
                mode = "lg";
            }
        }else{
            if(mode!="s"){
                mode = "s";
            }
        }
    }

    let clickItem = function(elm){
        $('.branchItemName',scope).removeClass('active'); 
        $('.branchItemName',elm).addClass('active');
        $('.branchListItem',scope).removeClass('p-3 bg-white rounded-lg');
        elm.addClass('p-3 bg-white rounded-lg');

        let idx = parseInt(elm.attr('data-idx'));
        let name = elm.attr('data-zh-name');
        let latitude = elm.attr('data-latitude');
        let longitude = elm.attr('data-longitude');
        let map = branchInfo[idx].map;
        $('#branchMap',scope).attr('src',map);
    }

    let filter = function(){
        if(searchKeyword != ""){
            $('.branchListItem',scope).each(function(){
                let elm = $(this);
                let content = elm.attr('data-keyword').toLowerCase();
                let match = content.indexOf(searchKeyword);
                if(match!=-1){
                    elm.fadeIn('fast');
                }else{
                    elm.fadeOut('fast');
                }
            })
        }else{
            $('.branchListItem',scope).fadeIn();
        }
    }

    let addEventListener = function(){     

        $('.branchSearchInput',scope).unbind().bind('keyup',function(e){
            let value = $(this).val().trim();
            searchKeyword = value.toLowerCase();
            filter();
        })

        $('.branchItemAddress',scope).unbind()
        .bind('click',function(e){
            let elm = $(this).parents('.branchListItem');
            clickItem(elm);
        })
        .eq(0).trigger('click');


        $('.branchItemName',scope).unbind()
        .bind('click',function(e){
            let elm = $(this).parents('.branchListItem');
            clickItem(elm);
        });

        $(window).off('resize.'+name).on('resize.'+name,resize);
        resize();

    };
    
    let generateResultItem = function(){
        let templateHTML = $('#branchListItemTemplate').text();
        
        let total = branchInfo.length;
        let htmlAry = [];
        for(i=0;i<total;i++){
            let data = branchInfo[i];
            let html = templateHTML;

            console.log(data.map == 'https://google.com');
            if(data.map == 'https://google.com'){
                html = html.replace(/%NAME_ZH%/gi,data.name_zh +'(補地圖)');
            }else{
                html = html.replace(/%NAME_ZH%/gi,data.name_zh);
            }
            html = html.replace(/%IDX%/gi,i);
            html = html.replace(/%NAME%/gi,data.name_zh);
            html = html.replace(/%NAME_EN%/gi,data.name_en);
            html = html.replace(/%NAME_KH%/gi,data.name_kh);
            html = html.replace(/%ADDRESS%/gi,data.address);
            html = html.replace(/%LATITUDE%/gi,data.latitude);
            html = html.replace(/%LONGITUDE%/gi,data.longitude);

            let listHTML = ''
            if(data.address != undefined){
                listHTML += '<li><a class="hover-green text-dark text-underline branchItemAddress" href="javascript:;">'+data.address+'</a></li>'
            }
            if(data.tel != undefined){
                listHTML += '<li>'+data.tel+'</li>'
            }
            if(data.tel2 != undefined){
                listHTML += '<li>'+data.tel2+'</li>'
            }
            if(data.business_day != undefined){
                listHTML += '<li>'+data.business_day;
                
                if(data.business_hour != undefined){
                    listHTML += ' ('+data.business_hour+')'
                }
                listHTML +='</li>';
            }
            // if(data.latitude != undefined){
            //     listHTML += '<li>'+data.latitude+'</li>'
            // }
            // if(data.longitude != undefined){
            //     listHTML += '<li>'+data.longitude+'</li>'
            // }
            html = html.replace(/%INFO%/gi,listHTML);
            htmlAry.push(html);
        }

        let holder = $('[role="branchListHolder"]',scope);
        holder.html(htmlAry.join(''));
        addEventListener();
    } 

    let loadData = function(){
        $.ajax({
            dataType: "json",
            url: jsonURL,
            data: {},
            success: function(resp){
                branchInfo = (resp.list);
                generateResultItem();
            }
          });

    }
    let main = function(){
        setTimeout(function(){
            loadData();
        },10);
    }

    let init = function(a_scope, a_url){
        //
        idx = Math.random().toString(36).substr(2, 9);
        scope = $(a_scope);
        jsonURL = a_url;
        if(!jsonURL) {
            console.log('jsonURL not provided');
        }
        name = compName+'-'+idx;
        main();
    };
        
    return {
        init: function (scope, jsonURL) {
            init(scope, jsonURL);
        }
    }
}