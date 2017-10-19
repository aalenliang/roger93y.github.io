var SIDELOCATOR = document.querySelector('.side-locator');
var CATEGORYSELECTOR = document.querySelector('.category');
var scrollRange = document.body.scrollHeight - window.innerHeight;
var elementArray = [].slice.call(CATEGORYSELECTOR.children);
var heightGroup = [];
var heightSum = 0;
var viewPostion = 0;
var hashGroup = [];

elementArray.forEach(function (item) {
  heightSum += item.scrollHeight;
  heightGroup.push(heightSum);
});


function calcPosition () {
  viewPostion = window.scrollY / scrollRange * document.body.scrollHeight;
  for (var i=0; i < heightGroup.length; i++) {
    if (viewPostion >= heightGroup[i]) {
      cateHashChangeHandler(hashGroup[i])
    }
  }
}

window.addEventListener('scroll', calcPosition, true);

function getCategoeryList() {
    var hashList = document.querySelectorAll('.category-title');
    var hashElmArray = [];
    var hashLetter = [];
    hashList.forEach(function (hashObj) {
        // var indexLetter = hashObj.id.slice(0,1);
        // for (var i=0; i<hashLetter.length; i++){
        //     if (hashLetter[i] == indexLetter) {
        //         return;
        //     }
        // }
        hashLetter.push(hashObj.id.slice(0,1));
        hashGroup.push(hashObj.id);
        hashElmArray.push(createSideLocatorItem(hashObj.id));
    });
    return hashElmArray;
}

function createSideLocatorItem (hashTag) {
    var listElm = document.createElement('li');
    listElm.setAttribute('class', 'side-locator-item');
    var linkElm = document.createElement('a');
    linkElm.setAttribute('href', '#'+hashTag);
    linkElm.textContent = hashTag //.slice(0,1);
    listElm.append(linkElm);
    return listElm;
}
getCategoeryList().forEach(function (liObj) {
    SIDELOCATOR.appendChild(liObj);
});

function cateHashChangeHandler(viewHash) {
    var taglist = document.querySelectorAll('.side-locator-item a')
    taglist.forEach(function (liObj) {
        liObj.style.color = "#828282"
    })
    // var WINDOWHASH = window.location.hash
    // if (!WINDOWHASH) {
    //     return false;
    // }

    var highligtitem = document.querySelector('a[href=\"#' + viewHash + '\"]')
    highligtitem.style.color = "#2a7ae2"
}