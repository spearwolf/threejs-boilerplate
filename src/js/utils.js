'use strict';

const preventDefault = function (event) {
    event.preventDefault();
};

export function preventDefaultTouchEvents (elem) {
    if (!elem) elem = document.body;
    //elem.addEventListener('touchstart', preventDefault, false);
    elem.addEventListener('touchmove', preventDefault, false);
}

