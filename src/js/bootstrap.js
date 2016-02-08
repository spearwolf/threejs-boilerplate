/* global DEBUG */
/* global Modernizr */
/* global __DATGUI__ */
/* global __PACKAGE_NAME__ */
/* global __PACKAGE_VERSION__ */
/* global __STATS__ */
/* global dat */
'use strict';

import { THREE, ThreeApp } from 'threejs-boilerplate';
import * as main from './main';

//====================================================================//
// bootstrap
//====================================================================//

export default function () {

    const ZEN_MODE = Modernizr.touchevents;

    let app = new ThreeApp({
        showStats: (__STATS__ && !ZEN_MODE),
        onRender: main.animate,
        onInit: main.init
    });

    if (typeof main.configure === 'function') {
        main.configure.call(app, app);
    }

    if (__DATGUI__ && !ZEN_MODE) init_dat_gui(app);

    if (DEBUG) {
        window.app = app;
        window.THREE = THREE;
        window.scene = app.scene;
        console.log(__PACKAGE_NAME__, 'v'+__PACKAGE_VERSION__);
    }

}

function init_dat_gui (app) {
    if (typeof dat !== 'undefined') {
        app.emit('dat-gui', dat);
    }
}

