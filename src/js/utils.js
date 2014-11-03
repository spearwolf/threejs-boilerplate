(function(){
    "use strict";

    var preventDefault = function(event) {
        event.preventDefault();
    };

    module.exports.preventDefaultTouchEvents = function(elem) {
        if (!elem) elem = document.body;
        //elem.addEventListener('touchstart', preventDefault, false);
        elem.addEventListener('touchmove', preventDefault, false);
    };

})();
