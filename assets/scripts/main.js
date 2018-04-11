var screenHeight = window.screen.height;
var FULLSCREEN_BUTTON = document.querySelector(".reading-mode");
var SIDEBAR = document.querySelector(".sidebar.sidebar-mobile");
var PAGE_CONTENT = document.querySelector(".page-content");
var PAGE_HEADER = document.querySelector(".site-header.blur");

function activeReadingMode() {
    FULLSCREEN_BUTTON.style.backgroundImage = "url(/assets/quitfull.svg)"
    SIDEBAR.classList.add("reading-mode-empty");
    PAGE_CONTENT.classList.add("reading-mode-full");
    PAGE_HEADER.classList.add("reading-mode-full");
}

function cancelReadingMode() {
    FULLSCREEN_BUTTON.style.backgroundImage = "url(/assets/full.svg)"
    SIDEBAR.classList.remove("reading-mode-empty");
    PAGE_CONTENT.classList.remove("reading-mode-full");
    PAGE_HEADER.classList.remove("reading-mode-full");
}

function toggleReadingMode() {
    var isFullScreen = localStorage.getItem("isFullScreen");
    if(isFullScreen == null) {
        localStorage.setItem("isFullScreen", "0");
    }
    if(isFullScreen === "0" || isFullScreen == null) {
        activeReadingMode();
        localStorage.setItem("isFullScreen", "1");
    } else {
        cancelReadingMode();
        localStorage.setItem("isFullScreen", "0");
    }
}

FULLSCREEN_BUTTON.addEventListener('click', function(evt) {
    evt.preventDefault();
    toggleReadingMode()
})

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
    sideBarLogo.style.paddingTop = 0.25*window.innerHeight + 'px';
}

sideBarResizer();
function throttle(method, context) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function () {
        method.call(context);
    }, 100)
}

window.onresize = function () {
    throttle(sideBarResizer);
}

-function() {
    var isFullScreen = localStorage.getItem("isFullScreen");
    if(isFullScreen === "1") {
        activeReadingMode();
    } else {
        cancelReadingMode();
    }
}();