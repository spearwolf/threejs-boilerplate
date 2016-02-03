/* global DEBUG */
/* global Modernizr */
/* global __DATGUI__ */
/* global __PACKAGE_NAME__ */
/* global __PACKAGE_VERSION__ */
/* global __STATS__ */
/* global dat */
'use strict';

import { THREE, ThreeApp } from 'threejs-boilerplate';
import demo from './demo';

//====================================================================//
// main
//====================================================================//

export function main () {

    const ZEN_MODE = Modernizr.touchevents;

    let app = new ThreeApp({
        showStats: (__STATS__ && !ZEN_MODE),
        onRender: demo.animate,
        onInit: demo.init
    });

    if (typeof demo.configure === 'function') {
        demo.configure.call(app, app);
    }

    if (__DATGUI__ && !ZEN_MODE) init_dat_gui(app);

    if (DEBUG) {
        window.app = app;
        window.THREE = THREE;
        console.log(__PACKAGE_NAME__, __PACKAGE_VERSION__);
    }

}

function init_dat_gui (app) {

    if (typeof dat === 'undefined') return;

    app.emit('dat-gui', dat);

}

