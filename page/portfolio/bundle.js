/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
function animate(){
    console.log('from anmate');
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = each;
/* unused harmony export Utils */
/* unused harmony export selection */
/* unused harmony export state */
/* harmony export (immutable) */ __webpack_exports__["b"] = scrollTo;
/* harmony export (immutable) */ __webpack_exports__["c"] = slideToggle;
/* unused harmony export slideDown */
/* unused harmony export slideUp */
/* unused harmony export slide */
/* unused harmony export animate */
/* unused harmony export ease */
/* unused harmony export tween */
function isElement(ele) {
    return ele.nodeType && ele.nodeType === Node.DOCUMENT_NODE;
}
function each(list, cb) {
    if (!isArrayLike(list)) {
        cb(list, 0, list);
        return;
    }
    for (var i = 0; i < list.length; i++) {
        cb(list[i], i, list);
    }
}
function isInteger(value) {
    return typeof value === 'number' &&
        !isNaN(value) &&
        value % 1 === 0 || value === 0;
}
function isArrayLike(arr) {
    return typeof arr === 'object' &&
        isInteger(arr.length) &&
        arr.length === 0 ||
        arr.length > 0 &&
            arr.length - 1 in arr;
}
var Utils = {
    isArrayLike: isArrayLike,
    isInteger: isInteger,
    each: each,
    isElement: isElement
};

function selection(items, state, initNum) {
    var stateClass = state;
    var current = initNum || 0;
    var menus = items;
    each(items, function (v, i, li) {
        console.log(li, i, v);
        v.addEventListener('click', function (e) {
            var preEle = li[current];
            preEle.classList.remove(stateClass);
            v.classList.add(stateClass);
            current = i;
        });
    });
}
function state(i) {
    var init = i;
    return {
        get state() { return init; },
        set state(s) { init = s; }
    };
}
function scrollTo(ele, callback) {
    var start = document.body.scrollTop;
    var end = start + ele.getBoundingClientRect().top;
    animate(function (now) {
        document.body['scrollTop'] = start + Math.round((end - start) * now);
    }, callback);
}
function slideToggle(ele, cb) {
    var disp = ele.style.display;
    if (!disp || disp === 'none') {
        slideDown(ele, cb);
    }
    else {
        slideUp(ele, cb);
    }
}
function slideDown(ele, cb, display) {
    var styleHeight = ele.style.height;
    ele.style.display = display || 'block';
    var h = window.getComputedStyle(ele).height;
    ele.style.height = 0;
    slide(ele, 0, parseInt(h), function () {
        ele.style.height = styleHeight;
        if (cb instanceof Function)
            cb();
    });
}
function slideUp(ele, cb) {
    var originHeight = window.getComputedStyle(ele).height;
    var styleHeight = ele.style.height;
    var start = parseInt(originHeight);
    var end = 0;
    slide(ele, start, end, function () {
        ele.style.display = 'none';
        ele.style.height = styleHeight;
        if (cb instanceof Function)
            cb();
    });
}
function slide(ele, start, end, cb) {
    animate(function (now) {
        ele.style.height = start + (end - start) * now + 'px';
    }, cb);
}
function animate(setp, complete) {
    var current = 0;
    var duart = 300;
    tween(function () {
        var next = getNext(current);
        setp(next);
        current += 16 / duart;
        if (current > 0.98) {
            if (complete instanceof Function)
                complete();
            return false;
        }
        return true;
    });
    function getNext(now) {
        var x = now + 16 / duart;
        return ease(x > 1 ? 1 : x);
    }
}
function ease(x) {
    return Math.cos(x * Math.PI + Math.PI) / 2 + 1.0 / 2;
}
function tween(cb) {
    var handler;
    if (window.requestAnimationFrame) {
        handler = function () {
            if (cb())
                window.requestAnimationFrame(handler);
        };
        window.requestAnimationFrame(handler);
    }
    else {
        handler = function () {
            if (cb())
                setTimeout(handler, 16);
        };
        setTimeout(handler, 16);
    }
    ;
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_animate__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_app__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__css_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_component__ = __webpack_require__(1);



// const component = require('../lib/component');

(function(){
    //actin button
    var actButton=document.querySelectorAll('.action-button');
     
    var menuState='action-button-state';

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib_component__["a" /* each */])(actButton,(e,i,li)=>{
        e.addEventListener('click',(event)=>{
            event.preventDefault();
            let targetId=e.href;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib_component__["b" /* scrollTo */])(document.getElementById(targetId.split('#')[1]));
        });
    });
    //TODO:on body scroll
    //     find a target element on screen top
    //     if scroll up to end, choose the last element
    //     change the choose element state
    let lastPosition=0;
    let actButtonState=menuState;
    document.body.onscroll=function(){
        let targetEles=getTargetEle(actButton);
        let currentPosition=0;
        for(let i=0;i<targetEles.length;i++){
            let react=targetEles[i].getBoundingClientRect();
            let top=react.top;
            let height=react.height;
             //TODO:if scroll end,chosse the last Ele
            if(top<=0&&Math.abs(top)<height) {
               currentPosition=i;
                break;
            }
        }
        if(currentPosition!==lastPosition){
           
            actButton[lastPosition].classList.remove(actButtonState);
            actButton[currentPosition].classList.add(actButtonState);
            lastPosition=currentPosition;
        }
    };

    function getTargetEle(list){
        let tg=[];
        for(let i=0;i<list.length;i++){
            let id=list[i].href.split('#')[1];
            tg.push(document.getElementById(id));
        }
        return tg;
    }

   // selection(actButton,menuState);

    var menu=document.getElementsByClassName('action-menus')[0];
    var menuToggle=document.getElementsByClassName('action-toggle')[0];
    menuToggle.addEventListener('click',(e)=>{
        // var display=menu.style.display;
        // if(display===''||display==='none') menu.style.display='flex';
        // else menu.style.display='none';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib_component__["c" /* slideToggle */])(menu);
    });

    var queryMedia=window.matchMedia("(max-width:600px)");
    queryMedia.addListener((qml)=>{
        if(qml.matches) menu.style.display='none';
        else menu.style.display='flex';
    });
    
})()

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map