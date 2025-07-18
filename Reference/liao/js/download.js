!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e="undefined"!=typeof globalThis?globalThis:e||self)["@smartbear/browser-info"]=n()}(this,(function(){"use strict";var e=/^\d+/;function n(e,n){this.name=e,this.pattern=n}n.prototype.match=function(n){var r=n.match(this.pattern);if(null===r)return null;var t={name:this.name,version:null,release:null};return void 0!==r[1]&&(t.version=r[1].replace("_","."),t.release=parseInt(t.version.match(e)[0],10)),t};var r=[new n("Firefox",/Firefox\/([0-9.]+)/),new n("Edge",/Edg[AeiOS]{0,3}\/([0-9.]+)/),new n("Opera",/OPR\/([0-9.]+)/),new n("SamsungInternet",/SamsungBrowser\/([0-9.]+)/),new n("UCBrowser",/UCBrowser\/([0-9.]+)/),new n("Chrome",/Chrome\/([0-9.]+)/),new n("Safari",/Version\/([0-9.]+)(?: .*)? Safari\//),new n("ie",/(?:MSIE |IEMobile\/|Trident\/.*rv:)([0-9.]+)/)],t=[new n("Windows",/Windows NT ([0-9.]+)/),new n("Windows Phone",/Windows Phone ([0-9.]+)/),new n("MacOS",/OS X ([0-9._]+)/),new n("iOS",/iPhone OS ([0-9_.]+)/),new n("iPadOS",/iPad.+?OS ([0-9_,]+)/),new n("ChromeOS",/CrOS [^ ]+ ([0-9.]+)/),new n("Android",/(?:Android|Adr) ([0-9.]+)/),new n("BlackBerry",/BlackBerry|BB10/),new n("webOS",/webOS\/([0-9.]+)/),new n("Linux",/Linux/)],i={os:"?",name:"?",release:"?",version:"?",detect:function(e){var n,i,o="string"==typeof e?e:window.navigator.userAgent,s=!1;for(i=0;i<r.length;i++)if(null!==(n=r[i].match(o))){this.name=n.name,this.release=n.release,this.version=n.version,s=!0;break}for(i=0;i<t.length;i++)if(null!==(n=t[i].match(o))){this.os=n.name;break}return s},toString:function(){return this.name+" "+this.version}};return Object.defineProperty(i,"versionAsNumber",{get:function(){return parseInt(this.version.replace(/\./g,""))}}),window.navigator.browserInfo=i,i.detect(),i}));

var root = document.documentElement;
root.className += ' '+navigator.browserInfo['os'].toLowerCase();
root.className += ' '+navigator.browserInfo['name'].toLowerCase();
root.className += ' '+navigator.browserInfo['os'].toLowerCase()+'-'+navigator.browserInfo['name'].toLowerCase();
root.className += ' '+navigator.browserInfo['name'].toLowerCase()+navigator.browserInfo['release'];

let redirectURL;
switch(navigator.browserInfo['os'].toLowerCase()){
    case 'ios':
        redirectURL = 'https://apps.apple.com/kh/app/cubc-mbanking/id489736801';
        location.href = redirectURL;
    break;

    case 'android':
        redirectURL = 'https://play.google.com/store/apps/details?id=com.mbanking.cubc';
        location.href = redirectURL;
    break;

    case 'windows':
    break;

    case 'macos':
    break;
}