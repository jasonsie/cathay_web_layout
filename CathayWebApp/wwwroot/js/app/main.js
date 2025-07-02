var HeaderFooter = (function (window) {
   console.log(`the main.js is working`);
   $(function () {
      //constant
      var CLASS_PREFIX = 'component-';
      var DEVICE_BREAK_POINT = 992;
      var MOBILE_HEADER_H = 50;
      var MOBILE_FOOTER_H = 130;
      var HEADER_STICKY_CLASS = 'component-header--sticky';
      var OPEN_MASK_CLASS = 'mask-on';
      var OPEN_NAV_CLASS = 'menu-on';
      var OPEN_LOGIN_NAV_CLASS = 'login-menu-on';
      var LOCK_BODY_CLASS = 'body-lock';
      var FOOTER_GO_TOP = $('[role="page-go-top"]');
      var GO_TOP_DISPLAY_Y = 80;
      var lastScrollTop = 0;
      //variables
      var mobileMode;
      var windowScrollTop = $(window).scrollTop();

      //element
      const scope_class = '.component-header';
      var scope = $(scope_class);
      var html = $('html');
      var body = $('body');
      var navbar = $('.ch-navbar', scope);
      var login_navbar = $('.ch-login-nav', scope);
      var toggler = $('.ch-toggler', scope);
      var login_toggler = $('.ch-login-toggler', scope);
      var window_w = $(window).outerWidth();
      var window_h = $(window).outerHeight();

      var checkDevice = function () {
         var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
         );

         window_w = $(window).outerWidth();
         window_h = $(window).outerHeight();
         if (window_w < DEVICE_BREAK_POINT) {
            GO_TOP_DISPLAY_Y = 50;
            if (mobileMode != true) {
               mobileMode = true;
               switchMode();
            }
         } else {
            GO_TOP_DISPLAY_Y = 80;
            if (mobileMode != false) {
               mobileMode = false;
               switchMode();
            }
         }
      };

      var reset = function () {
         console.time('reset');
         let els;
         let i;
         var container = document.querySelector(scope_class);
         container.classList.remove('component-header--shadow-on');
         container.classList.remove('component-header--sticky');
         //
         els = container.querySelectorAll('.ch-nav-lv2--show');
         for (i = 0; i < els.length; ++i) {
            els[i].classList.remove('ch-nav-lv2--show');
         }
         //
         els = container.querySelectorAll('.ch-nav-item');
         for (i = 0; i < els.length; ++i) {
            els[i].classList.remove('ch-nav-item--hover');
         }
         //
         els = container.querySelectorAll('.ch-nav-link');
         for (i = 0; i < els.length; ++i) {
            els[i].setAttribute('aria-expanded', 'false');
         }
         //
         els = container.querySelectorAll('.ch-nav');
         for (i = 0; i < els.length; ++i) {
            els[i].style.removeProperty('display');
         }

         els = container.querySelectorAll('.ch-login-nav');
         for (i = 0; i < els.length; ++i) {
            els[i].style.removeProperty('display');
         }

         console.timeEnd('reset');
      };

      var initMobileMode = function () {
         reset();
         console.time('initMobileMode');
         MOBILE_HEADER_H = $('.' + CLASS_PREFIX + 'header').height();
         MOBILE_FOOTER_H = $('.' + CLASS_PREFIX + 'footer').height();

         var initDropdown = function () {
            $('.ch-nav-link', scope)
               .unbind('click.toggleMobileSubnav')
               .on('click.toggleMobileSubnav', function (e) {
                  var o = $(this);
                  var hasSibling = $(o).siblings('.ch-nav-lv2').length;

                  if (hasSibling) {
                     var submenu = $(o).siblings('.ch-nav-lv2');
                     e.preventDefault();
                     e.stopPropagation();

                     // $('.ch-nav-link', scope).attr("aria-expanded", 'false');
                     // $('.ch-nav-lv2.ch-nav-lv2--show', scope).removeClass('ch-nav-lv2--show');

                     if (o.attr('aria-expanded') == 'true') {
                        o.attr('aria-expanded', 'false');
                        submenu.removeClass('ch-nav-lv2--show');
                     } else {
                        o.attr('aria-expanded', 'true');
                        submenu.addClass('ch-nav-lv2--show');
                     }
                     return false;
                  }
               });
            console.timeEnd('initMobileMode');
         };

         var initToggler = function () {
            console.time('initToggler');
            toggler.unbind().on('click', function (e) {
               e.preventDefault();
               e.stopPropagation();
               if ($(this).hasClass('moving')) {
                  return false;
               }
               if (!$(this).hasClass('ch-toggler--active')) {
                  lastScrollTop = $(window).scrollTop();

                  toggler.attr('aria-expanded', true);
                  $('.ch-nav', navbar).show();
                  toggler.addClass('moving');
                  setTimeout(function () {
                     toggler.removeClass('moving');
                  }, 10);

                  if (!html.hasClass(OPEN_NAV_CLASS)) {
                     html.addClass(OPEN_MASK_CLASS);
                     html.addClass(OPEN_NAV_CLASS);
                     html.addClass(LOCK_BODY_CLASS);
                     $('.ch-img').attr('src', $('.ch-img').attr('active-src'));
                     body.css('top', -lastScrollTop);
                  }

                  body.off('click.hideHeaderNav');

                  body.on('click.hideHeaderNav', function (e) {
                     toggler.trigger('click');
                  });
               } else {
                  html.removeClass(OPEN_MASK_CLASS);
                  html.removeClass(OPEN_NAV_CLASS);
                  html.removeClass(LOCK_BODY_CLASS);
                  $('.ch-img').attr('src', $('.ch-img').attr('normal-src'));
                  body.css('top', 'auto');
                  $(window).scrollTop(lastScrollTop);
                  toggler.addClass('moving');
                  setTimeout(function () {
                     $('.ch-nav', navbar).hide();
                     toggler.removeClass('moving');
                     toggler.attr('aria-expanded', false);
                  }, 500);

                  body.off('click.hideHeaderNav');
               }
               $(this).toggleClass('ch-toggler--active');
               return false;
            });
            console.timeEnd('initToggler');

            console.time('initLoginToggler');
            login_toggler.unbind().on('click', function (e) {
               e.preventDefault();
               e.stopPropagation();
               if ($(this).hasClass('moving')) {
                  return false;
               }

               if (!$(this).hasClass('ch-login-toggler--active')) {
                  lastScrollTop = $(window).scrollTop();

                  login_toggler.attr('aria-expanded', true);
                  $('.ch-login-nav', navbar).show();
                  login_toggler.addClass('moving');
                  setTimeout(function () {
                     login_toggler.removeClass('moving');
                  }, 10);

                  if (!html.hasClass(OPEN_LOGIN_NAV_CLASS)) {
                     html.addClass(OPEN_MASK_CLASS);
                     html.addClass(OPEN_LOGIN_NAV_CLASS);
                     html.addClass(LOCK_BODY_CLASS);

                     body.css('top', -lastScrollTop);
                  }

                  body.off('click.hideHeaderNav');

                  body.on('click.hideHeaderNav', function (e) {
                     login_toggler.trigger('click');
                  });
               } else {
                  html.removeClass(OPEN_MASK_CLASS);
                  html.removeClass(OPEN_LOGIN_NAV_CLASS);
                  html.removeClass(LOCK_BODY_CLASS);
                  body.css('top', 'auto');
                  $(window).scrollTop(lastScrollTop);
                  login_toggler.addClass('moving');
                  setTimeout(function () {
                     $('.ch-login-nav', navbar).hide();
                     login_toggler.removeClass('moving');
                     login_toggler.attr('aria-expanded', false);
                  }, 500);

                  body.off('click.hideHeaderNav');
               }
               $(this).toggleClass('ch-login-toggler--active');
               return false;
            });
            console.timeEnd('initLoginToggler');
         };

         var init = function () {
            initDropdown();
            initToggler();
         };
         init();
      };
      var initDefaultMode = function () {
         reset();
         console.time('initDefaultMode');
         html.removeClass(OPEN_MASK_CLASS);
         html.removeClass(OPEN_NAV_CLASS);
         html.removeClass(LOCK_BODY_CLASS);
         html.removeClass(HEADER_STICKY_CLASS);

         body.css('top', 'auto');
         html.removeClass('safari-addressbar-off');
         toggler.removeClass('moving');
         toggler.attr('aria-expanded', false);
         toggler.addClass('collapsed');

         body.off('click.hideHeaderNav');

         $('.ch-nav-item', scope).unbind();
         $('.ch-nav-item', scope)
            .unbind()
            .on('mouseover', function (e) {
               $(this).addClass('ch-nav-item--hover');
            });

         $('.ch-nav-item', scope).on('mouseout', function (e) {
            $(this).removeClass('ch-nav-item--hover');
         });
         console.timeEnd('initDefaultMode');
      };

      var switchMode = function () {
         if (mobileMode) {
            initMobileMode();
         } else {
            initDefaultMode();
         }
      };

      var init = function () {
         if (
            navigator.userAgent.indexOf('MSIE') !== -1 ||
            navigator.appVersion.indexOf('Trident/') > -1
         ) {
            $('html').addClass('ie11');
            var _elm = $('.component-header .ch-figure');
            $('source', _elm).each(function () {
               var file = $(this).attr('srcset');
               file = file.replace(/.svg/i, '.png');
               $(this).attr('srcset', file);
            });
            $('.ch-img', _elm).each(function () {
               var file = $(this).attr('normal-src');
               file = file.replace(/.svg/i, '.png');
               $(this).attr('normal-src', file);

               var file = $(this).attr('active-src');
               file = file.replace(/.svg/i, '.png');
               $(this).attr('active-src', file);

               var file = $(this).attr('src');
               file = file.replace(/.svg/i, '.png');
               $(this).attr('src', file);

               var file = $(this).attr('data-original-src');
               file = file.replace(/.svg/i, '.png');
               $(this).attr('data-original-src', file);

               var file = $(this).attr('srcset');
               file = file.replace(/.svg/i, '.png');
               $(this).attr('srcset', file);
            });
         }

         FOOTER_GO_TOP.on('click', function () {
            $('html,body').animate(
               {
                  scrollTop: 0,
               },
               500
            );
         });

         $('.ch-nav-lv2', scope).each(function () {
            var o = $(this);
            if ($('.ch-nav-lv2-item', o).length > 1) {
               o.addClass('ch-nav-lv2--align-right');
            }
         });
         $('.ch-nav-lv2', scope).last().addClass('ch-nav-lv2--align-right');
         $('.ch-nav-list .ch-nav-lv3').each(function () {
            var o = $(this);
            if ($('li', o).length > 16) {
               o.addClass('ch-nav-lv3--row3');
            } else if ($('li', o).length > 8) {
               o.addClass('ch-nav-lv3--row2');
            }
         });

         $(window)
            .on('resize', function () {
               checkDevice();
            })
            .trigger('resize');

         $(window)
            .scroll(function () {
               windowScrollTop = $(this).scrollTop();

               if (mobileMode) {
                  //     var pos = $(this).scrollTop();
                  //     if(pos>GO_TOP_DISPLAY_Y){
                  //         if(!html.hasClass('mask-on')){
                  //             FOOTER_GO_TOP.fadeIn();
                  //         }
                  //     }else{
                  //         FOOTER_GO_TOP.fadeOut();
                  //     }
               } else {
                  if (windowScrollTop > 10) {
                     scope.addClass('component-header--shadow-on');
                  } else {
                     scope.removeClass('component-header--shadow-on');
                  }
                  if (windowScrollTop >= 58) {
                     if ($('.ch-nav', scope).length > 0) {
                        scope.addClass(HEADER_STICKY_CLASS);
                     }
                  } else {
                     scope.removeClass(HEADER_STICKY_CLASS);
                  }
               }

               if (windowScrollTop >= 50) {
                  FOOTER_GO_TOP.addClass('component-gototop--active');
               } else {
                  FOOTER_GO_TOP.removeClass('component-gototop--active');
               }
            })
            .trigger('scroll');
      };

      init();
   });
})(window);
