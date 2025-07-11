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
    let atmInfo;
    let currentType;
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
        // let name = elm.attr('data-zh-name');
        // let latitude = elm.attr('data-latitude');
        // let longitude = elm.attr('data-longitude');

        let map = elm.attr('data-map');
        $('#branchMap',scope).attr('src',map);
    }

    let filter = function(){
        $('.branchListItem',scope).each(function(){
            let elm = $(this);
            let type = elm.attr('data-type');

            if(type == currentType){
                elm.show();
            }else{
                elm.hide();
            }
        })

        $('.branchListItem[data-type="'+currentType+'"]',scope).eq(0).trigger('click');
    }

    let addEventListener = function(){     

        // $('.branchSearchInput',scope).unbind().bind('keyup',function(e){
        //     let value = $(this).val().trim();
        //     searchKeyword = value.toLowerCase();
        //     filter();
        // })

        // $('.branchItemAddress',scope).unbind()
        // .bind('click',function(e){
        //     let elm = $(this).parents('.branchListItem');
        //     clickItem(elm);
        // })
        // .eq(0).trigger('click');



        $('.branchListItem ',scope).unbind()
        .bind('click',function(e){
            let elm = $(this);
            clickItem(elm);
        });

        
        $('.type',scope).bind('change',function(){
            var elm = $(this);
            currentType = elm.val().trim();
            filter();
        }).eq(0).trigger('click');
        
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
      
            html = html.replace(/%IDX%/gi,i);
            html = html.replace(/%type%/gi,'branch');
            html = html.replace(/%city%/gi,data.city);
            html = html.replace(/%url%/gi,data.url);
            html = html.replace(/%map%/gi,data.map);

            htmlAry.push(html);
        }

        total = atmInfo.length;
        for(i=0;i<total;i++){
            let data = atmInfo[i];
            let html = templateHTML;
      
            html = html.replace(/%IDX%/gi,i);
            html = html.replace(/%type%/gi,'atm');
            html = html.replace(/%city%/gi,data.city);
            html = html.replace(/%url%/gi,data.url);
            html = html.replace(/%map%/gi,data.map);

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
                branchInfo = (resp.branch);
                atmInfo = (resp.atm);
                
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