var screenHeight = window.screen.height;
function sideBarResizer() {
    'use strict';
    var viewPortHeight = 0;
    var DEFAULTSIDEBARPADDING = 0.4;
    var DEFAULTSIDEBARIMAGE = 127;

    function getRatio() {
        viewPortHeight = window.innerHeight;
        return viewPortHeight/screenHeight;
    }

    function resizeByRatio(original, ratio) {
        return original * ratio();
    }
    var sideBarLogo = document.querySelector('.logo-title');
    var sideBarImage = document.querySelector('.sidebar-image');
    sideBarImage.style.width = resizeByRatio(DEFAULTSIDEBARIMAGE, getRatio)*1.2+'px';
    sideBarLogo.style.paddingTop = resizeByRatio(DEFAULTSIDEBARPADDING, getRatio)*100+'%';
}

sideBarResizer();
window.onresize = sideBarResizer;