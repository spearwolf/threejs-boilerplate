'use strict';

const preventDefault = function (event) {
    event.preventDefault();
};

export function preventDefaultTouchEvents (element = document.body) {
    //element.addEventListener('touchstart', preventDefault, false);
    element.addEventListener('touchmove', preventDefault, false);
}

