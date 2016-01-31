"use strict";

//====================================================================//
// require
//====================================================================//

const THREE = require('./lib/three-r73');
const dat = require('./lib/dat.gui');

import { preventDefaultTouchEvents } from './utils';
import ThreeApp from './ThreeApp';


//====================================================================//
// globals
//====================================================================//

const DEBUG = true;

var app, gui;
var params = { scaleX: 1.0, scaleY: 1.0, scaleZ: 1.0 }


//====================================================================//
// main()
//====================================================================//

export function main () {

    app = new ThreeApp({ onRender: animate, onInit: init });

    if (DEBUG) {
        window.THREE = THREE;
        window.threeApp = app;
        console.debug("hello from threejs-boilerplate");
    }

    init_dat_gui();
    preventDefaultTouchEvents();

}


//====================================================================//
// more functions
//====================================================================//

function init (app) {

    let geometry = new THREE.BoxGeometry(400, 400, 400);
    let material = new THREE.MeshBasicMaterial({
        color: 0xffffaa,
        wireframe: true,
        wireframeLinewidth: 2*app.DPR
    });

    app.mesh = new THREE.Mesh(geometry, material);
    app.scene.add(app.mesh);

}

function animate (time) {

    app.mesh.scale.x = params.scaleX;
    app.mesh.scale.y = params.scaleY;
    app.mesh.scale.z = params.scaleZ;

    app.mesh.rotation.x += 0.01;
    app.mesh.rotation.y += 0.02;

}

function init_dat_gui () {

    gui = new dat.GUI({
        height: 3 * 32 - 1
    });

    gui.add(params, 'scaleX').min(0.1).max(5.0).name('Scale X');
    gui.add(params, 'scaleY').min(0.1).max(5.0).name('Scale Y');
    gui.add(params, 'scaleZ').min(0.1).max(5.0).name('Scale Z');

}

