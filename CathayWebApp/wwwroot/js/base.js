/*!@preserve 
 *
 * Cathay United Bank, Khmer
 * base.js 
 * 
 */
var base = window.base || {}; 

///////////////////////////
//    Libraries          //
///////////////////////////

/** jQuery throttle / debounce v1.1 
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);
/*! npm.im/object-fit-images 3.2.4 */
var objectFitImages=function(){"use strict";function t(t,e){return"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"+t+"' height='"+e+"'%3E%3C/svg%3E"}function e(t){if(t.srcset&&!p&&window.picturefill){var e=window.picturefill._;t[e.ns]&&t[e.ns].evaled||e.fillImg(t,{reselect:!0}),t[e.ns].curSrc||(t[e.ns].supported=!1,e.fillImg(t,{reselect:!0})),t.currentSrc=t[e.ns].curSrc||t.src}}function i(t){for(var e,i=getComputedStyle(t).fontFamily,r={};null!==(e=u.exec(i));)r[e[1]]=e[2];return r}function r(e,i,r){var n=t(i||1,r||0);b.call(e,"src")!==n&&h.call(e,"src",n)}function n(t,e){t.naturalWidth?e(t):setTimeout(n,100,t,e)}function c(t){var c=i(t),o=t[l];if(c["object-fit"]=c["object-fit"]||"fill",!o.img){if("fill"===c["object-fit"])return;if(!o.skipTest&&f&&!c["object-position"])return}if(!o.img){o.img=new Image(t.width,t.height),o.img.srcset=b.call(t,"data-ofi-srcset")||t.srcset,o.img.src=b.call(t,"data-ofi-src")||t.src,h.call(t,"data-ofi-src",t.src),t.srcset&&h.call(t,"data-ofi-srcset",t.srcset),r(t,t.naturalWidth||t.width,t.naturalHeight||t.height),t.srcset&&(t.srcset="");try{s(t)}catch(t){window.console&&console.warn("https://bit.ly/ofi-old-browser")}}e(o.img),t.style.backgroundImage='url("'+(o.img.currentSrc||o.img.src).replace(/"/g,'\\"')+'")',t.style.backgroundPosition=c["object-position"]||"center",t.style.backgroundRepeat="no-repeat",t.style.backgroundOrigin="content-box",/scale-down/.test(c["object-fit"])?n(o.img,function(){o.img.naturalWidth>t.width||o.img.naturalHeight>t.height?t.style.backgroundSize="contain":t.style.backgroundSize="auto"}):t.style.backgroundSize=c["object-fit"].replace("none","auto").replace("fill","100% 100%"),n(o.img,function(e){r(t,e.naturalWidth,e.naturalHeight)})}function s(t){var e={get:function(e){return t[l].img[e?e:"src"]},set:function(e,i){return t[l].img[i?i:"src"]=e,h.call(t,"data-ofi-"+i,e),c(t),e}};Object.defineProperty(t,"src",e),Object.defineProperty(t,"currentSrc",{get:function(){return e.get("currentSrc")}}),Object.defineProperty(t,"srcset",{get:function(){return e.get("srcset")},set:function(t){return e.set(t,"srcset")}})}function o(){function t(t,e){return t[l]&&t[l].img&&("src"===e||"srcset"===e)?t[l].img:t}d||(HTMLImageElement.prototype.getAttribute=function(e){return b.call(t(this,e),e)},HTMLImageElement.prototype.setAttribute=function(e,i){return h.call(t(this,e),e,String(i))})}function a(t,e){var i=!y&&!t;if(e=e||{},t=t||"img",d&&!e.skipTest||!m)return!1;"img"===t?t=document.getElementsByTagName("img"):"string"==typeof t?t=document.querySelectorAll(t):"length"in t||(t=[t]);for(var r=0;r<t.length;r++)t[r][l]=t[r][l]||{skipTest:e.skipTest},c(t[r]);i&&(document.body.addEventListener("load",function(t){"IMG"===t.target.tagName&&a(t.target,{skipTest:e.skipTest})},!0),y=!0,t="img"),e.watchMQ&&window.addEventListener("resize",a.bind(null,t,{skipTest:e.skipTest}))}var l="fregante:object-fit-images",u=/(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,g="undefined"==typeof Image?{style:{"object-position":1}}:new Image,f="object-fit"in g.style,d="object-position"in g.style,m="background-size"in g.style,p="string"==typeof g.currentSrc,b=g.getAttribute,h=g.setAttribute,y=!1;return a.supportsObjectFit=f,a.supportsObjectPosition=d,o(),a}();

/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
!function(a){var b=navigator.userAgent;a.HTMLPictureElement&&/ecko/.test(b)&&b.match(/rv\:(\d+)/)&&RegExp.$1<45&&addEventListener("resize",function(){var b,c=document.createElement("source"),d=function(a){var b,d,e=a.parentNode;"PICTURE"===e.nodeName.toUpperCase()?(b=c.cloneNode(),e.insertBefore(b,e.firstElementChild),setTimeout(function(){e.removeChild(b)})):(!a._pfLastSize||a.offsetWidth>a._pfLastSize)&&(a._pfLastSize=a.offsetWidth,d=a.sizes,a.sizes+=",100vw",setTimeout(function(){a.sizes=d}))},e=function(){var a,b=document.querySelectorAll("picture > img, img[srcset][sizes]");for(a=0;a<b.length;a++)d(b[a])},f=function(){clearTimeout(b),b=setTimeout(e,99)},g=a.matchMedia&&matchMedia("(orientation: landscape)"),h=function(){f(),g&&g.addListener&&g.addListener(f)};return c.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?h():document.addEventListener("DOMContentLoaded",h),f}())}(window),function(a,b,c){"use strict";function d(a){return" "===a||"	"===a||"\n"===a||"\f"===a||"\r"===a}function e(b,c){var d=new a.Image;return d.onerror=function(){A[b]=!1,ba()},d.onload=function(){A[b]=1===d.width,ba()},d.src=c,"pending"}function f(){M=!1,P=a.devicePixelRatio,N={},O={},s.DPR=P||1,Q.width=Math.max(a.innerWidth||0,z.clientWidth),Q.height=Math.max(a.innerHeight||0,z.clientHeight),Q.vw=Q.width/100,Q.vh=Q.height/100,r=[Q.height,Q.width,P].join("-"),Q.em=s.getEmValue(),Q.rem=Q.em}function g(a,b,c,d){var e,f,g,h;return"saveData"===B.algorithm?a>2.7?h=c+1:(f=b-c,e=Math.pow(a-.6,1.5),g=f*e,d&&(g+=.1*e),h=a+g):h=c>1?Math.sqrt(a*b):a,h>c}function h(a){var b,c=s.getSet(a),d=!1;"pending"!==c&&(d=r,c&&(b=s.setRes(c),s.applySetCandidate(b,a))),a[s.ns].evaled=d}function i(a,b){return a.res-b.res}function j(a,b,c){var d;return!c&&b&&(c=a[s.ns].sets,c=c&&c[c.length-1]),d=k(b,c),d&&(b=s.makeUrl(b),a[s.ns].curSrc=b,a[s.ns].curCan=d,d.res||aa(d,d.set.sizes)),d}function k(a,b){var c,d,e;if(a&&b)for(e=s.parseSet(b),a=s.makeUrl(a),c=0;c<e.length;c++)if(a===s.makeUrl(e[c].url)){d=e[c];break}return d}function l(a,b){var c,d,e,f,g=a.getElementsByTagName("source");for(c=0,d=g.length;d>c;c++)e=g[c],e[s.ns]=!0,f=e.getAttribute("srcset"),f&&b.push({srcset:f,media:e.getAttribute("media"),type:e.getAttribute("type"),sizes:e.getAttribute("sizes")})}function m(a,b){function c(b){var c,d=b.exec(a.substring(m));return d?(c=d[0],m+=c.length,c):void 0}function e(){var a,c,d,e,f,i,j,k,l,m=!1,o={};for(e=0;e<h.length;e++)f=h[e],i=f[f.length-1],j=f.substring(0,f.length-1),k=parseInt(j,10),l=parseFloat(j),X.test(j)&&"w"===i?((a||c)&&(m=!0),0===k?m=!0:a=k):Y.test(j)&&"x"===i?((a||c||d)&&(m=!0),0>l?m=!0:c=l):X.test(j)&&"h"===i?((d||c)&&(m=!0),0===k?m=!0:d=k):m=!0;m||(o.url=g,a&&(o.w=a),c&&(o.d=c),d&&(o.h=d),d||c||a||(o.d=1),1===o.d&&(b.has1x=!0),o.set=b,n.push(o))}function f(){for(c(T),i="",j="in descriptor";;){if(k=a.charAt(m),"in descriptor"===j)if(d(k))i&&(h.push(i),i="",j="after descriptor");else{if(","===k)return m+=1,i&&h.push(i),void e();if("("===k)i+=k,j="in parens";else{if(""===k)return i&&h.push(i),void e();i+=k}}else if("in parens"===j)if(")"===k)i+=k,j="in descriptor";else{if(""===k)return h.push(i),void e();i+=k}else if("after descriptor"===j)if(d(k));else{if(""===k)return void e();j="in descriptor",m-=1}m+=1}}for(var g,h,i,j,k,l=a.length,m=0,n=[];;){if(c(U),m>=l)return n;g=c(V),h=[],","===g.slice(-1)?(g=g.replace(W,""),e()):f()}}function n(a){function b(a){function b(){f&&(g.push(f),f="")}function c(){g[0]&&(h.push(g),g=[])}for(var e,f="",g=[],h=[],i=0,j=0,k=!1;;){if(e=a.charAt(j),""===e)return b(),c(),h;if(k){if("*"===e&&"/"===a[j+1]){k=!1,j+=2,b();continue}j+=1}else{if(d(e)){if(a.charAt(j-1)&&d(a.charAt(j-1))||!f){j+=1;continue}if(0===i){b(),j+=1;continue}e=" "}else if("("===e)i+=1;else if(")"===e)i-=1;else{if(","===e){b(),c(),j+=1;continue}if("/"===e&&"*"===a.charAt(j+1)){k=!0,j+=2;continue}}f+=e,j+=1}}}function c(a){return k.test(a)&&parseFloat(a)>=0?!0:l.test(a)?!0:"0"===a||"-0"===a||"+0"===a?!0:!1}var e,f,g,h,i,j,k=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,l=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(f=b(a),g=f.length,e=0;g>e;e++)if(h=f[e],i=h[h.length-1],c(i)){if(j=i,h.pop(),0===h.length)return j;if(h=h.join(" "),s.matchesMedia(h))return j}return"100vw"}b.createElement("picture");var o,p,q,r,s={},t=!1,u=function(){},v=b.createElement("img"),w=v.getAttribute,x=v.setAttribute,y=v.removeAttribute,z=b.documentElement,A={},B={algorithm:""},C="data-pfsrc",D=C+"set",E=navigator.userAgent,F=/rident/.test(E)||/ecko/.test(E)&&E.match(/rv\:(\d+)/)&&RegExp.$1>35,G="currentSrc",H=/\s+\+?\d+(e\d+)?w/,I=/(\([^)]+\))?\s*(.+)/,J=a.picturefillCFG,K="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",L="font-size:100%!important;",M=!0,N={},O={},P=a.devicePixelRatio,Q={px:1,"in":96},R=b.createElement("a"),S=!1,T=/^[ \t\n\r\u000c]+/,U=/^[, \t\n\r\u000c]+/,V=/^[^ \t\n\r\u000c]+/,W=/[,]+$/,X=/^\d+$/,Y=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,Z=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d||!1):a.attachEvent&&a.attachEvent("on"+b,c)},$=function(a){var b={};return function(c){return c in b||(b[c]=a(c)),b[c]}},_=function(){var a=/^([\d\.]+)(em|vw|px)$/,b=function(){for(var a=arguments,b=0,c=a[0];++b in a;)c=c.replace(a[b],a[++b]);return c},c=$(function(a){return"return "+b((a||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(b,d){var e;if(!(b in N))if(N[b]=!1,d&&(e=b.match(a)))N[b]=e[1]*Q[e[2]];else try{N[b]=new Function("e",c(b))(Q)}catch(f){}return N[b]}}(),aa=function(a,b){return a.w?(a.cWidth=s.calcListLength(b||"100vw"),a.res=a.w/a.cWidth):a.res=a.d,a},ba=function(a){if(t){var c,d,e,f=a||{};if(f.elements&&1===f.elements.nodeType&&("IMG"===f.elements.nodeName.toUpperCase()?f.elements=[f.elements]:(f.context=f.elements,f.elements=null)),c=f.elements||s.qsa(f.context||b,f.reevaluate||f.reselect?s.sel:s.selShort),e=c.length){for(s.setupRun(f),S=!0,d=0;e>d;d++)s.fillImg(c[d],f);s.teardownRun(f)}}};o=a.console&&console.warn?function(a){console.warn(a)}:u,G in v||(G="src"),A["image/jpeg"]=!0,A["image/gif"]=!0,A["image/png"]=!0,A["image/svg+xml"]=b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),s.ns=("pf"+(new Date).getTime()).substr(0,9),s.supSrcset="srcset"in v,s.supSizes="sizes"in v,s.supPicture=!!a.HTMLPictureElement,s.supSrcset&&s.supPicture&&!s.supSizes&&!function(a){v.srcset="data:,a",a.src="data:,a",s.supSrcset=v.complete===a.complete,s.supPicture=s.supSrcset&&s.supPicture}(b.createElement("img")),s.supSrcset&&!s.supSizes?!function(){var a="data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==",c="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",d=b.createElement("img"),e=function(){var a=d.width;2===a&&(s.supSizes=!0),q=s.supSrcset&&!s.supSizes,t=!0,setTimeout(ba)};d.onload=e,d.onerror=e,d.setAttribute("sizes","9px"),d.srcset=c+" 1w,"+a+" 9w",d.src=c}():t=!0,s.selShort="picture>img,img[srcset]",s.sel=s.selShort,s.cfg=B,s.DPR=P||1,s.u=Q,s.types=A,s.setSize=u,s.makeUrl=$(function(a){return R.href=a,R.href}),s.qsa=function(a,b){return"querySelector"in a?a.querySelectorAll(b):[]},s.matchesMedia=function(){return a.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?s.matchesMedia=function(a){return!a||matchMedia(a).matches}:s.matchesMedia=s.mMQ,s.matchesMedia.apply(this,arguments)},s.mMQ=function(a){return a?_(a):!0},s.calcLength=function(a){var b=_(a,!0)||!1;return 0>b&&(b=!1),b},s.supportsType=function(a){return a?A[a]:!0},s.parseSize=$(function(a){var b=(a||"").match(I);return{media:b&&b[1],length:b&&b[2]}}),s.parseSet=function(a){return a.cands||(a.cands=m(a.srcset,a)),a.cands},s.getEmValue=function(){var a;if(!p&&(a=b.body)){var c=b.createElement("div"),d=z.style.cssText,e=a.style.cssText;c.style.cssText=K,z.style.cssText=L,a.style.cssText=L,a.appendChild(c),p=c.offsetWidth,a.removeChild(c),p=parseFloat(p,10),z.style.cssText=d,a.style.cssText=e}return p||16},s.calcListLength=function(a){if(!(a in O)||B.uT){var b=s.calcLength(n(a));O[a]=b?b:Q.width}return O[a]},s.setRes=function(a){var b;if(a){b=s.parseSet(a);for(var c=0,d=b.length;d>c;c++)aa(b[c],a.sizes)}return b},s.setRes.res=aa,s.applySetCandidate=function(a,b){if(a.length){var c,d,e,f,h,k,l,m,n,o=b[s.ns],p=s.DPR;if(k=o.curSrc||b[G],l=o.curCan||j(b,k,a[0].set),l&&l.set===a[0].set&&(n=F&&!b.complete&&l.res-.1>p,n||(l.cached=!0,l.res>=p&&(h=l))),!h)for(a.sort(i),f=a.length,h=a[f-1],d=0;f>d;d++)if(c=a[d],c.res>=p){e=d-1,h=a[e]&&(n||k!==s.makeUrl(c.url))&&g(a[e].res,c.res,p,a[e].cached)?a[e]:c;break}h&&(m=s.makeUrl(h.url),o.curSrc=m,o.curCan=h,m!==k&&s.setSrc(b,h),s.setSize(b))}},s.setSrc=function(a,b){var c;a.src=b.url,"image/svg+xml"===b.set.type&&(c=a.style.width,a.style.width=a.offsetWidth+1+"px",a.offsetWidth+1&&(a.style.width=c))},s.getSet=function(a){var b,c,d,e=!1,f=a[s.ns].sets;for(b=0;b<f.length&&!e;b++)if(c=f[b],c.srcset&&s.matchesMedia(c.media)&&(d=s.supportsType(c.type))){"pending"===d&&(c=d),e=c;break}return e},s.parseSets=function(a,b,d){var e,f,g,h,i=b&&"PICTURE"===b.nodeName.toUpperCase(),j=a[s.ns];(j.src===c||d.src)&&(j.src=w.call(a,"src"),j.src?x.call(a,C,j.src):y.call(a,C)),(j.srcset===c||d.srcset||!s.supSrcset||a.srcset)&&(e=w.call(a,"srcset"),j.srcset=e,h=!0),j.sets=[],i&&(j.pic=!0,l(b,j.sets)),j.srcset?(f={srcset:j.srcset,sizes:w.call(a,"sizes")},j.sets.push(f),g=(q||j.src)&&H.test(j.srcset||""),g||!j.src||k(j.src,f)||f.has1x||(f.srcset+=", "+j.src,f.cands.push({url:j.src,d:1,set:f}))):j.src&&j.sets.push({srcset:j.src,sizes:null}),j.curCan=null,j.curSrc=c,j.supported=!(i||f&&!s.supSrcset||g&&!s.supSizes),h&&s.supSrcset&&!j.supported&&(e?(x.call(a,D,e),a.srcset=""):y.call(a,D)),j.supported&&!j.srcset&&(!j.src&&a.src||a.src!==s.makeUrl(j.src))&&(null===j.src?a.removeAttribute("src"):a.src=j.src),j.parsed=!0},s.fillImg=function(a,b){var c,d=b.reselect||b.reevaluate;a[s.ns]||(a[s.ns]={}),c=a[s.ns],(d||c.evaled!==r)&&((!c.parsed||b.reevaluate)&&s.parseSets(a,a.parentNode,b),c.supported?c.evaled=r:h(a))},s.setupRun=function(){(!S||M||P!==a.devicePixelRatio)&&f()},s.supPicture?(ba=u,s.fillImg=u):!function(){var c,d=a.attachEvent?/d$|^c/:/d$|^c|^i/,e=function(){var a=b.readyState||"";f=setTimeout(e,"loading"===a?200:999),b.body&&(s.fillImgs(),c=c||d.test(a),c&&clearTimeout(f))},f=setTimeout(e,b.body?9:99),g=function(a,b){var c,d,e=function(){var f=new Date-d;b>f?c=setTimeout(e,b-f):(c=null,a())};return function(){d=new Date,c||(c=setTimeout(e,b))}},h=z.clientHeight,i=function(){M=Math.max(a.innerWidth||0,z.clientWidth)!==Q.width||z.clientHeight!==h,h=z.clientHeight,M&&s.fillImgs()};Z(a,"resize",g(i,99)),Z(b,"readystatechange",e)}(),s.picturefill=ba,s.fillImgs=ba,s.teardownRun=u,ba._=s,a.picturefillCFG={pf:s,push:function(a){var b=a.shift();"function"==typeof s[b]?s[b].apply(s,a):(B[b]=a[0],S&&s.fillImgs({reselect:!0}))}};for(;J&&J.length;)a.picturefillCFG.push(J.shift());a.picturefill=ba,"object"==typeof module&&"object"==typeof module.exports?module.exports=ba:"function"==typeof define&&define.amd&&define("picturefill",function(){return ba}),s.supPicture||(A["image/webp"]=e("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document);
$(function(){
	objectFitImages(null,{ watchMQ: true, skipTest: false});  
});  
!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(n="undefined"!=typeof globalThis?globalThis:n||self).LazyLoad=t()}(this,(function(){"use strict";function n(){return n=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=e[i])}return n},n.apply(this,arguments)}var t="undefined"!=typeof window,e=t&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),i=t&&"IntersectionObserver"in window,o=t&&"classList"in document.createElement("p"),a=t&&window.devicePixelRatio>1,r={elements_selector:".lazy",container:e||t?document:null,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",data_bg_hidpi:"bg-hidpi",data_bg_multi:"bg-multi",data_bg_multi_hidpi:"bg-multi-hidpi",data_poster:"poster",class_applied:"applied",class_loading:"loading",class_loaded:"loaded",class_error:"error",class_entered:"entered",class_exited:"exited",unobserve_completed:!0,unobserve_entered:!1,cancel_on_exit:!0,callback_enter:null,callback_exit:null,callback_applied:null,callback_loading:null,callback_loaded:null,callback_error:null,callback_finish:null,callback_cancel:null,use_native:!1},c=function(t){return n({},r,t)},u=function(n,t){var e,i="LazyLoad::Initialized",o=new n(t);try{e=new CustomEvent(i,{detail:{instance:o}})}catch(n){(e=document.createEvent("CustomEvent")).initCustomEvent(i,!1,!1,{instance:o})}window.dispatchEvent(e)},l="src",s="srcset",f="sizes",d="poster",_="llOriginalAttrs",g="loading",v="loaded",b="applied",p="error",h="native",m="data-",E="ll-status",I=function(n,t){return n.getAttribute(m+t)},y=function(n){return I(n,E)},A=function(n,t){return function(n,t,e){var i="data-ll-status";null!==e?n.setAttribute(i,e):n.removeAttribute(i)}(n,0,t)},k=function(n){return A(n,null)},L=function(n){return null===y(n)},w=function(n){return y(n)===h},x=[g,v,b,p],O=function(n,t,e,i){n&&(void 0===i?void 0===e?n(t):n(t,e):n(t,e,i))},N=function(n,t){o?n.classList.add(t):n.className+=(n.className?" ":"")+t},C=function(n,t){o?n.classList.remove(t):n.className=n.className.replace(new RegExp("(^|\\s+)"+t+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},M=function(n){return n.llTempImage},z=function(n,t){if(t){var e=t._observer;e&&e.unobserve(n)}},R=function(n,t){n&&(n.loadingCount+=t)},T=function(n,t){n&&(n.toLoadCount=t)},G=function(n){for(var t,e=[],i=0;t=n.children[i];i+=1)"SOURCE"===t.tagName&&e.push(t);return e},D=function(n,t){var e=n.parentNode;e&&"PICTURE"===e.tagName&&G(e).forEach(t)},V=function(n,t){G(n).forEach(t)},F=[l],j=[l,d],P=[l,s,f],S=function(n){return!!n[_]},U=function(n){return n[_]},$=function(n){return delete n[_]},q=function(n,t){if(!S(n)){var e={};t.forEach((function(t){e[t]=n.getAttribute(t)})),n[_]=e}},H=function(n,t){if(S(n)){var e=U(n);t.forEach((function(t){!function(n,t,e){e?n.setAttribute(t,e):n.removeAttribute(t)}(n,t,e[t])}))}},B=function(n,t,e){N(n,t.class_loading),A(n,g),e&&(R(e,1),O(t.callback_loading,n,e))},J=function(n,t,e){e&&n.setAttribute(t,e)},K=function(n,t){J(n,f,I(n,t.data_sizes)),J(n,s,I(n,t.data_srcset)),J(n,l,I(n,t.data_src))},Q={IMG:function(n,t){D(n,(function(n){q(n,P),K(n,t)})),q(n,P),K(n,t)},IFRAME:function(n,t){q(n,F),J(n,l,I(n,t.data_src))},VIDEO:function(n,t){V(n,(function(n){q(n,F),J(n,l,I(n,t.data_src))})),q(n,j),J(n,d,I(n,t.data_poster)),J(n,l,I(n,t.data_src)),n.load()}},W=["IMG","IFRAME","VIDEO"],X=function(n,t){!t||function(n){return n.loadingCount>0}(t)||function(n){return n.toLoadCount>0}(t)||O(n.callback_finish,t)},Y=function(n,t,e){n.addEventListener(t,e),n.llEvLisnrs[t]=e},Z=function(n,t,e){n.removeEventListener(t,e)},nn=function(n){return!!n.llEvLisnrs},tn=function(n){if(nn(n)){var t=n.llEvLisnrs;for(var e in t){var i=t[e];Z(n,e,i)}delete n.llEvLisnrs}},en=function(n,t,e){!function(n){delete n.llTempImage}(n),R(e,-1),function(n){n&&(n.toLoadCount-=1)}(e),C(n,t.class_loading),t.unobserve_completed&&z(n,e)},on=function(n,t,e){var i=M(n)||n;nn(i)||function(n,t,e){nn(n)||(n.llEvLisnrs={});var i="VIDEO"===n.tagName?"loadeddata":"load";Y(n,i,t),Y(n,"error",e)}(i,(function(o){!function(n,t,e,i){var o=w(t);en(t,e,i),N(t,e.class_loaded),A(t,v),O(e.callback_loaded,t,i),o||X(e,i)}(0,n,t,e),tn(i)}),(function(o){!function(n,t,e,i){var o=w(t);en(t,e,i),N(t,e.class_error),A(t,p),O(e.callback_error,t,i),o||X(e,i)}(0,n,t,e),tn(i)}))},an=function(n,t,e){!function(n){n.llTempImage=document.createElement("IMG")}(n),on(n,t,e),function(n){S(n)||(n[_]={backgroundImage:n.style.backgroundImage})}(n),function(n,t,e){var i=I(n,t.data_bg),o=I(n,t.data_bg_hidpi),r=a&&o?o:i;r&&(n.style.backgroundImage='url("'.concat(r,'")'),M(n).setAttribute(l,r),B(n,t,e))}(n,t,e),function(n,t,e){var i=I(n,t.data_bg_multi),o=I(n,t.data_bg_multi_hidpi),r=a&&o?o:i;r&&(n.style.backgroundImage=r,function(n,t,e){N(n,t.class_applied),A(n,b),e&&(t.unobserve_completed&&z(n,t),O(t.callback_applied,n,e))}(n,t,e))}(n,t,e)},rn=function(n,t,e){!function(n){return W.indexOf(n.tagName)>-1}(n)?an(n,t,e):function(n,t,e){on(n,t,e),function(n,t,e){var i=Q[n.tagName];i&&(i(n,t),B(n,t,e))}(n,t,e)}(n,t,e)},cn=function(n){n.removeAttribute(l),n.removeAttribute(s),n.removeAttribute(f)},un=function(n){D(n,(function(n){H(n,P)})),H(n,P)},ln={IMG:un,IFRAME:function(n){H(n,F)},VIDEO:function(n){V(n,(function(n){H(n,F)})),H(n,j),n.load()}},sn=function(n,t){(function(n){var t=ln[n.tagName];t?t(n):function(n){if(S(n)){var t=U(n);n.style.backgroundImage=t.backgroundImage}}(n)})(n),function(n,t){L(n)||w(n)||(C(n,t.class_entered),C(n,t.class_exited),C(n,t.class_applied),C(n,t.class_loading),C(n,t.class_loaded),C(n,t.class_error))}(n,t),k(n),$(n)},fn=["IMG","IFRAME","VIDEO"],dn=function(n){return n.use_native&&"loading"in HTMLImageElement.prototype},_n=function(n,t,e){n.forEach((function(n){return function(n){return n.isIntersecting||n.intersectionRatio>0}(n)?function(n,t,e,i){var o=function(n){return x.indexOf(y(n))>=0}(n);A(n,"entered"),N(n,e.class_entered),C(n,e.class_exited),function(n,t,e){t.unobserve_entered&&z(n,e)}(n,e,i),O(e.callback_enter,n,t,i),o||rn(n,e,i)}(n.target,n,t,e):function(n,t,e,i){L(n)||(N(n,e.class_exited),function(n,t,e,i){e.cancel_on_exit&&function(n){return y(n)===g}(n)&&"IMG"===n.tagName&&(tn(n),function(n){D(n,(function(n){cn(n)})),cn(n)}(n),un(n),C(n,e.class_loading),R(i,-1),k(n),O(e.callback_cancel,n,t,i))}(n,t,e,i),O(e.callback_exit,n,t,i))}(n.target,n,t,e)}))},gn=function(n){return Array.prototype.slice.call(n)},vn=function(n){return n.container.querySelectorAll(n.elements_selector)},bn=function(n){return function(n){return y(n)===p}(n)},pn=function(n,t){return function(n){return gn(n).filter(L)}(n||vn(t))},hn=function(n,e){var o=c(n);this._settings=o,this.loadingCount=0,function(n,t){i&&!dn(n)&&(t._observer=new IntersectionObserver((function(e){_n(e,n,t)}),function(n){return{root:n.container===document?null:n.container,rootMargin:n.thresholds||n.threshold+"px"}}(n)))}(o,this),function(n,e){t&&window.addEventListener("online",(function(){!function(n,t){var e;(e=vn(n),gn(e).filter(bn)).forEach((function(t){C(t,n.class_error),k(t)})),t.update()}(n,e)}))}(o,this),this.update(e)};return hn.prototype={update:function(n){var t,o,a=this._settings,r=pn(n,a);T(this,r.length),!e&&i?dn(a)?function(n,t,e){n.forEach((function(n){-1!==fn.indexOf(n.tagName)&&function(n,t,e){n.setAttribute("loading","lazy"),on(n,t,e),function(n,t){var e=Q[n.tagName];e&&e(n,t)}(n,t),A(n,h)}(n,t,e)})),T(e,0)}(r,a,this):(o=r,function(n){n.disconnect()}(t=this._observer),function(n,t){t.forEach((function(t){n.observe(t)}))}(t,o)):this.loadAll(r)},destroy:function(){this._observer&&this._observer.disconnect(),vn(this._settings).forEach((function(n){$(n)})),delete this._observer,delete this._settings,delete this.loadingCount,delete this.toLoadCount},loadAll:function(n){var t=this,e=this._settings;pn(n,e).forEach((function(n){z(n,t),rn(n,e,t)}))},restoreAll:function(){var n=this._settings;vn(n).forEach((function(t){sn(t,n)}))}},hn.load=function(n,t){var e=c(t);rn(n,e)},hn.resetStatus=function(n){k(n)},t&&function(n,t){if(t)if(t.length)for(var e,i=0;e=t[i];i+=1)u(n,e);else u(n,t)}(hn,window.lazyLoadOptions),hn}));

//____require ./libs/intersection-observer.min.js
 
  
///////////////////////////  
//    Content            //
/////////////////////////// 
 
 /** Dimension helpers */
 base.getPageY = function() { return window.pageYOffset || ((('clientHeight' in document.documentElement))?document.documentElement:document.body).scrollTop; };
 base.getWinW = function() { return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||$(window).width(); };
 base.getWinH = function() { var h = window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||$(window).height(); return h; };
 
 
 /** Touch device */
 base.isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
 document.documentElement.className = document.documentElement.className + (base.isTouch?' touch': ' no-touch');
 
 
 // Legacy IE
 base.IE = (document.documentMode <= 11);
 
 
 /** Avoid touchmove event propagating from scrollable child (overflow:scroll) to window.
  * Support touch device only
  * and can't be tested on Chrome developer simulator.
  * 
  * @see https://github.com/lazd/iNoBounce
  * @version 20191220 
  */
 $.fn.blockTouchmove = function(exclude) {
 	return this.each(function(){
 		$(this)
 			.off('touchstart.btm touchmove.btm')
 			.on('touchstart.btm', function(e) {
 				this.btm_y = e.originalEvent.touches ? e.originalEvent.touches[0].screenY : e.originalEvent.screenY;
 			})
 			.on('touchmove.btm', function(e) {
 				if(exclude!=undefined && $(exclude).find(e.target)[0]) {
 					return true;
 				}
 				if(this.scrollHeight > this.offsetHeight) {
 					var y = e.originalEvent.touches ? e.originalEvent.touches[0].screenY : e.originalEvent.screenY;
 					var atTop = (this.btm_y <= y && this.scrollTop <= 0);
 					var atBottom = (this.btm_y >= y && this.scrollHeight - this.scrollTop <= /*this.offsetHeight*/$(this).innerHeight());
 	
 					if(atTop || atBottom) {
 						e.preventDefault();
 					}
 				}
 				else {
 					e.preventDefault();
 				}
 			});
 	});
 };
 
 
 /** 頁面scroll狀態
  *************************/
 $(function() {
 	$(window).on('scroll resize orientationchange load touchmove', $.debounce(5, true, update));
 	//$(window).on('scroll resize orientationchange load touchmove', update);
 	
 	var html = $('html'),
 		isFixed = html.hasClass('header--fixed');
 	
 	function update() {
 		var scrollY = base.getPageY(),
 			vh = base.getWinH(),
 			top = (base.getWinW() <= 922 ? 60 : 80) - 1,
 			bottom = html.outerHeight() - vh - 60,
 			state;
 		
 		
 		// Header 置頂狀態 
 		if(!isFixed) {
 			state = 'header--fixed';
 			
 			if(scrollY >= top && !html.hasClass(state)) {
 				html.addClass(state);
 			}
 			else if(scrollY < top && html.hasClass(state)) {
 				html.removeClass(state);
 			}
 		}
 		
 		// 頁面已scroll離開置頂
 		html.toggleClass('leave-top', scrollY >= vh*.3 );
 		
 		// 頁面已scroll到底狀態 	
 		/*state = 'reach-bottom';
 		
 		if(scrollY >= bottom && !html.hasClass(state)) {
 			html.addClass(state);
 		}
 		else if(scrollY < bottom && html.hasClass(state)) {
 			html.removeClass(state);
 		}*/
 	}
 	
 	update();
 	setTimeout(update, 31);
 	setTimeout(update, 300);
 });
 
 
 /**
  * Correct 100vh
  */
 (function(){
 	function resize() {
 		document.documentElement.style.setProperty('--vh', window.innerHeight + 'px');
 	}
 	window.addEventListener('resize', resize);
 	resize();
 })();
  
  

/** Header & panel
 * 
 * [js-panel], [js-panel-btn]
 * base.openPanel
 * base.closePanel
 * 
 * @version 20220219 Add Keyboard support. Revise event delegation. Comment out level sliding related script.
 * @version 20220222 Revise fix to overflow chaining due to iOS 15+ furthur manipulation of Safari address bar
 *************************/


/** PC navigation
 *************************/
$(function(){
	
	var	timer;
	
	// Mouse
	if(!base.isTouch) {
		
		// pc主選單 [js-panel-btn] 
		// 各自對應的 panel 子選單
		$(document).on('mouseenter mouseleave click focusin keydown', '.navbar [js-panel-btn]', function(e){
			var el = this,
				btn = $(el),
				id = btn.attr('js-panel-btn'),
				panel = $('[js-panel="'+id+'"]');
			
			if(!panel[0]) { return true; }
				
			switch(e.type) {
				case 'mouseenter':
				case 'focusin':
					clearTimeout(timer);
					timer = setTimeout(function(){
						
						toggleBtn(btn, true);
						
						el.mouseDisabled = true;
						timer = setTimeout(function(){ el.mouseDisabled = false; }, 350);
					}, !base.activePanelId?150:1);
					break;
				
				// 避免一離開按鈕 panel就關閉
				case 'mouseleave':
					delayClosePanel();
					break;
				
				case 'click':
					if(el.mouseDisabled) { return true; } // Avoid immediate click and close an opened panel
					
					toggleBtn(btn);
					break;
				
				case 'keydown':
					if(e.keyCode == 40) {
						toggleBtn(btn, true);
						var child = panel.find('[tabindex], a, button, [role="button"]')[0];
						!!child && child.focus();
						e.preventDefault();
					}
					break;
			}
		});
		
		
		// 避免一離開按鈕 panel就關閉
		$(document).on('mouseenter', '[js-panel]', function(e){
			clearTimeout(timer);
		});
		
		// Mouse out 子選單
		$(document).on('mouseleave', '[js-panel^="subnav-"]', function(e){
			delayClosePanel();
		});
		
		// Mouse over 沒有子選單的主項關閉 active panel
		/*$('.navbar-link').not('[js-panel-btn]').on('mouseenter', function(e){
			delayClosePanel();
		});*/
		
		$(document).on('keydown', '.masthead', function(e){ 
			if(e.keyCode == 27) {
				base.closePanel();
			}
		});
	}
	
	// Touch
	else {
		$(document).on('click', '.navbar [js-panel-btn]', function(e){
			var btn = $(this); 
			switch(e.type) {
				case 'click':
					toggleBtn(btn);
					e.stopPropagation();
					e.preventDefault();
					break;
			}
		});
	}
	
	
	
	function delayClosePanel() {
		clearTimeout(timer);
		timer = setTimeout(function(){
			base.closePanel();
		}, 300);
	};
	
	function toggleBtn(btn, forceOpen) {
		var id = btn.attr('js-panel-btn');
						
		if(!btn.hasClass('opened') || forceOpen == true) { // revised @20210515
			btn.addClass('opened');
			
			// Set subnav position
			var panel = $('[js-panel="'+id+'"]');
			var left = btn.parent().position().left - (panel.outerWidth() - btn.outerWidth())*.5;
			//var left = btn.parent().position().left - 20;
			panel.css({ left: left });
			
			base.openPanel(id, btn);
			
			panel.one('close', function(e) {
				btn.removeClass('opened');
			});
		}
		else {
			btn.removeClass('opened');
			base.closePanel();
		}
	};
	
});


/** Mobile navigation
 *************************/
$(function(){
	var scrollY;
	
	// Hamburger button
	$(document).on('click', '.masthead-toggle', function(){
		if(!$('html').hasClass('mbpanel--open')) {
			base.openPanel('mbpanel');
		}
		else {
			base.closePanel();
		}
	});

	
	// Event callback
	$(document).on('open close', '[js-panel="mbpanel"]', function(e){
		
		if(e.type == 'open') {
			// Avoid touchmove body content, @20220222 mostly still works today 
			$('.mbpanel-col').blockTouchmove();
			
			// https://github.com/willmcpo/body-scroll-lock
			// Had tried but surpisely found not work on iOS 15+ Safari!
			//bodyScrollLock.disableBodyScroll($('.mbpanel')[0]);
			//bodyScrollLock.enableBodyScroll($('.mbpanel')[0]);
			
			scrollY = window.scrollY;  
			//alert('window.scrollY='+window.scrollY); // IE does support `window.scrollY`
			
			
			// @20220222
			// Issue: https://stackoverflow.com/questions/69310544/ios-15-safari-toolbar-now-hides-when-scrolling-within-an-element
			// Prevent iOS 15+ Safari from hiding address bar when .mbpanel is visible
			// https://pqina.nl/blog/how-to-prevent-scrolling-the-page-on-ios-safari/
			
			// Lock window height and then store scroll position for later restore
			$('html').addClass('mbpanel--open');
			
			if(scrollY != undefined) { 
				$('html')[0].scrollTo(0, scrollY);
				$('body')[0].scrollTo(0, scrollY);
				window.scrollTo(0, scrollY);
			}
		}
		
		// 'close'
		else {
			
			$('[js-panel="mbpanel"]').addClass('animate-out');
			setTimeout(function(){
				$('[js-panel="mbpanel"]').removeClass('animate-out');
			}, 250);
			
			
			$('html').removeClass('mbpanel--open');
			
			if(scrollY != undefined) {
				window.scrollTo(0, scrollY);
			}
		}
	});
	
	
});


/** Click anywhere to close panel
 *************************/ 
$(function(){
	document.documentElement.addEventListener(!base.isTouch?'click':'touchend', clickAnywhere, true); // Fire event on capturing phase
	
	function clickAnywhere(e) {
		if($('.panel--active').length == 0) {
			return true;
		}
		if(!$('.masthead').find(e.target)[0] || $(e.target).is('[js-panel]')) {
			base.closePanel();
			e.stopPropagation();
			e.stopImmediatePropagation();
			return false;
		}
	}
});


/** Panel controller
 *************************/

base.activePanelId = undefined;

base.openPanel = function(id) {
	var panel = $('[js-panel="'+id+'"]');
	if(!panel[0]) { return false;}
	
	if(base.activePanelId == id) { 
		//base.closePanel();
		return;
	}
	
	base.closePanel();
	
	base.activePanelId = id;
	//console.log('%c openPanel id= ' + base.activePanelId, 'font-weight:700;color:#fff;background:#24BCDC'); 
	
	panel.addClass('panel--active');
	
	panel.trigger('open');
}
	
base.closePanel = function() {
	var panel = $('.panel--active[js-panel]');
	if(!panel[0]) { return false;}
	
	base.activePanelId = undefined;
	//console.log('%c closePanel '+ panel.attr('js-panel'), 'font-weight:700;color:#fff;background:#24BCDC'); 
	
	panel.removeClass('panel--active');
	
	panel.trigger('close');
}



/** Foldable
 * @version 20220105
 *************************/
$(function(){
	var state = 'foldable--expanded';
	
	$(document).on('click.foldable keydown.foldable', '[js-foldable-head]', function(e){
		
		var holder = $(this).closest('[js-foldable-group]'),
			id = holder.attr('js-foldable-group'),
			head = $(this),
			body = holder.find('[js-foldable-body]').first();
		
		if(e.type == 'click' || (e.type == 'keydown' && e.keyCode == 13)) {
			e.preventDefault();
			
			if(holder.hasClass(state)) { // close
				body.slideUp(300, function(){
					head.trigger('foldAfterClose', [head, body, id]);
				});
				holder.removeClass(state);
				head.trigger('foldBeforeClose', [head, body, id]);
			}
			
			else { // open
				body.slideDown(300, function(){
					head.trigger('foldAfterOpen', [head, body, id]);
				});
				holder.addClass(state);
				head.trigger('foldBeforeOpen', [head, body, id]);
			}
			
			// Bind identical ID to the group of `js-foldable-group` foldable items
			// to behave like accordian UI
			if(!!id) {
				$('[js-foldable-group="'+ id +'"]').not(holder).each(function(){
					$(this).removeClass(state)
						.find('[js-foldable-body]').first().slideUp(300);
				});
			}
		}
	});
	
	// Initially expanded `foldable--expanded` foldable item
	$('.foldable--expanded[js-foldable-group]').each(function(){
		$(this).find('[js-foldable-body]').first().show();
	});
});
/**
 * Developer only
 * Turn on to debug CSS layout with outline helper*/
//document.querySelector('body').classList.add('debug');


/**
 * Developer only
 * A helper to warn 0x2028 invisible character existed in content pasted from FIGMA
 * https://stackoverflow.com/questions/39603446/why-is-this-lsep-symbol-showing-up-on-chrome-and-not-firefox-or-edge
 */
(function(){
	if(!/file:/.test(location.protocol) && !/127\./.test(location.host)) { return; }
	var text = $('.mastbody').text(),
		entity = String.fromCharCode(0x2028),
		//found = text.indexOf(String.fromCharCode(0x2028)),
		founds = text.split(entity),
		len = founds.length;
	if(len > 1) {
		for(var i=1;i<len;i++){
			console.warn('Found 0x2028 at: ' + founds[i-1].substr(-20) + '%c0x2028%c' + founds[i].substr(0,20), 'padding:2px;background:black;color:white', 'backgroound:none;color:inherit');
		}
	}
})();
 
 
/**
 * Developer only
 * A helper to add current location path to option value of `.masthead-lang`
 */
$(function(){
	var path = location.pathname
	if(!/dist\//.test(path)) { // Support demo url only
		return;
	}
	path = path.split('dist/')[1].replace(/(kh|zh-tw)\//,'');
	//console.log('path=', path);
	$('.masthead-lang option').each(function(){
		if(!isIE()) {
			this.value += path;
		} else {
			var basePath = $('base').attr('href')
			if(basePath) {
				this.value = basePath + this.value + path;
			}
			else {
				this.value += path;
			}
		}
		//console.log(this.value);
	});
	function isIE() {
		var ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
		var msie = ua.indexOf('MSIE '); // IE 10 or older
		var trident = ua.indexOf('Trident/'); //IE 11
		return (msie > 0 || trident > 0);
	}
});


/**
 * Lazyload all <img> set `class="lazy"` and `data-src`
 */
var llSite = new LazyLoad({
    threshold: base.isTouch?250:175,
	//callback_error: function() {},
	callback_loaded: function(el) {
		//console.log('\t' + el.srcset); 
		!!window.picturefill && picturefill({ reevaluate: true });
	}
});


/**
 * .kvslider
 * Swiper v6 docs: http://web.archive.org/web/20210202114227/https://swiperjs.com/swiper-api 
 */
$(function(){
	if($('.kvslider .swiper-slide').length > 1) {
		$('.kvslider-control').removeClass('d-none');
	}
	else {
		return;
	}
	
	var swiper = new Swiper('.kvslider', {
		autoHeight: true,
		loop: true,
		spaceBetween: 0,
		slidesPerView: 1,
		threshold: 0,
		touchAngle: 30, // Set smaller touch angle to avoid user conflicts with browsing downwards.
		simulateTouch: false,
		updateOnWindowResize: !base.isTouch, // Set `false` to solve naughty Safari toolbar on iOS 15+ that constantly trigger window resize event
		autoplay: {
			disableOnInteraction: false,
			delay: 10000
		},
		pagination: {
			el: '.kvslider-menu',
			clickable: true,
			bulletClass: 'kvslider-menu-btn',
			bulletActiveClass: 'active',
			bulletElement: 'div',
			renderBullet: function(index, className) {
				return '<div class="kvslider-menu-btn"><span><b></b></span></div>';
			}
		},
		navigation: {
			prevEl: '.kvslider-prev',
			nextEl: '.kvslider-next'
		}
	});
	
	// Need an update due to `updateOnWindowResize = false` 
	base.isTouch && swiper.on('slideChange', function(){
		swiper.update();
	});
});


/**
 *  Add state to `.topkv` when background image is loaded 
 */
$(function(){
	var img = $('.topkv:not(.kvslider) .kv-bg-img img')[0];
	if(!img) { return; }
	
	// http://otischou.tw/notes/2017/01/01/detect-is-image-loaded.html
	if(img.complete) {
		onload();
		//console.log('image cached');
	}
	else {
		img.onload = onload;
		//console.log('image native onload');
	}
	function onload() {
		$('.topkv.kv').addClass('kv--bg-loaded'); 
	};
});


/**
 * Auto scroll tabmenu to the position of active button
 */
$(function(){
	setTimeout(function(){
		$('.tabmenu-inner').each(function(){
			var btn = $('.tabmenu-btn.active', this);
			if(btn[0]) {
				var x = Math.max(0, btn.get(0).offsetLeft/* - btn.outerWidth()*/);
				$(this).scrollLeft(x);
			}
		});
	}, 500);
});


/**
 * Keep window scroll position after change page by clicking tabmenu item
 */
(function(){
	var ss = window.sessionStorage,
		key = 'tabmenuScrollY',
		scrollY = ss.getItem(key) || 0,
		btns = document.querySelectorAll('.tabmenu-btn');
		
	Array.prototype.forEach.call(btns, function(btn, i){
		btn.addEventListener('click', function(e){
			if(window.scrollY != undefined){
				ss.setItem(key, window.scrollY || 0);
			}
		});
	});
	
	if(!!scrollY) {
		scrollY = parseInt(scrollY);
		window.scrollTo(0, scrollY);
		ss.removeItem(key);
	}
})();

$(function(){

	switch($('html').attr('lang').toLowerCase()){
		case 'km':
		case 'km-kh':
			$('html').addClass('km');
		break;
	}
})