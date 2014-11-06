(function(){
    "use strict";

    //====================================================================//
    // require
    //====================================================================//

    var THREE = require('./lib/three');
    //var TWEEN = require('./lib/Tween');
    var dat = require('./lib/dat.gui');
    var utils = require('./utils');
    var ThreeApp = require('./ThreeApp');

    //====================================================================//
    // globals
    //====================================================================//

    var DEBUG = true;

    var app, mesh, gui
     ,  params = { scaleX: 1.0, scaleY: 1.0, scaleZ: 1.0 }
     ;

    //====================================================================//
    // main()
    //====================================================================//

    module.exports.main = function() {

        app = new ThreeApp({ onRender: animate, onInit: init });

        if (DEBUG) {
            window.THREE = THREE;
            window.threeApp = app;
            console.debug("hello from threejs-boilerplate");
        }

        init_dat_gui();
        utils.preventDefaultTouchEvents();
    };

    //====================================================================//
    // more functions
    //====================================================================//

    function init(app) {

        var geometry = new THREE.BoxGeometry(400, 400, 400);
        var material = new THREE.MeshBasicMaterial({
            color: 0xffffaa,
            wireframe: true,
            wireframeLinewidth: 2*app.DPR
        });

        mesh = new THREE.Mesh(geometry, material);

        app.scene.add(mesh);
    }

    function animate(time) {

        mesh.scale.x = params.scaleX;
        mesh.scale.y = params.scaleY;
        mesh.scale.z = params.scaleZ;

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
    }

    function init_dat_gui() {
        gui = new dat.GUI({
            height: 3 * 32 - 1
        });

        gui.add(params, 'scaleX').min(0.1).max(5.0).name('Scale X');
        gui.add(params, 'scaleY').min(0.1).max(5.0).name('Scale Y');
        gui.add(params, 'scaleZ').min(0.1).max(5.0).name('Scale Z');
    }

})();
