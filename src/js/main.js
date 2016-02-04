'use strict';

import { THREE } from 'threejs-boilerplate';

//====================================================================//
// configuration (optional)
//====================================================================//

export function configure (app) {

    //app.preventDefaultTouchEvents();
    app.enablePointerPositionTracking();

    Object.assign(app, {

        scaleX: 1.0,
        scaleY: 1.0,
        scaleZ: 1.0

    });

    app.on('dat-gui', function (dat) {

        let gui = new dat.GUI({
            height: 3 * 32 - 1
        });

        gui.add(app, 'scaleX').min(0.1).max(5.0).name('Scale X');
        gui.add(app, 'scaleY').min(0.1).max(5.0).name('Scale Y');
        gui.add(app, 'scaleZ').min(0.1).max(5.0).name('Scale Z');

    });

    app.pointer.on('tapStart', () => {
        app.renderer.setClearColor( 0xffffff, 0.25);
        app.domElement.style.cursor = 'move';
    });

    app.pointer.on('tapEnd', () => {
        app.renderer.setClearColor( 0xffffff, 0.0);
        app.domElement.style.cursor = 'default';
    });

}

//====================================================================//
// init scene
//====================================================================//

export function init (app) {

    let geometry = new THREE.BoxGeometry(400, 400, 400);
    let material = new THREE.MeshBasicMaterial({
                     color: 0xffffcc,
                 wireframe: true,
        wireframeLinewidth: 2
    });

    app.mesh = new THREE.Mesh(geometry, material);
    app.scene.add(app.mesh);

}

//====================================================================//
// animate scene
//====================================================================//

export function animate (time, app) {

    app.mesh.scale.x = app.scaleX;
    app.mesh.scale.y = app.scaleY;
    app.mesh.scale.z = app.scaleZ;

    app.mesh.rotation.x += 0.01 + (app.pointer.drag.x * 0.2);
    app.mesh.rotation.y += 0.02 + (app.pointer.drag.y * 0.2);

}

