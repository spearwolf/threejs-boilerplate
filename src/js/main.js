(function(){
    "use strict";

    //====================================================================//
    // require
    //====================================================================//

    var DEBUG = true;
    var DPR = window.devicePixelRatio || 1;

    var THREE = require('./lib/three');
    var Stats = require('./lib/Stats');
    var dat = require('./lib/dat.gui');

    //====================================================================//
    // globals
    //====================================================================//

    var camera
     ,  scene
     ,  renderer
     ,  stats
     ,  geometry
     ,  material
     ,  mesh
     ,  gui
     ,  params = { scaleX: 1.0, scaleY: 1.0, scaleZ: 1.0 }
     ;

    //====================================================================//
    // main()
    //====================================================================//

    module.exports.main = function() {

        if (DEBUG) {
            window.THREE = THREE;
            console.debug("hello from threejs-boilerplate");
        }

        init();
        init_stats();
        init_dat_gui();
        animate();
    };

    //====================================================================//
    // more functions
    //====================================================================//

    function resize() {
        var w = window.innerWidth
          , h = window.innerHeight;

        document.body.style.height = h + "px";

        camera = new THREE.PerspectiveCamera(75, w / h, 1, 10000);
        camera.position.z = 1000;

        renderer.setSize(w, h);
    }

    function init() {
        scene = new THREE.Scene();

        geometry = new THREE.BoxGeometry( 400, 400, 400 );
        material = new THREE.MeshBasicMaterial( { color: 0xffffaa, wireframe: true, wireframeLinewidth: 2*DPR } );

        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        // http://threejs.org/docs/#Reference/Renderers/WebGLRenderer
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.autoClear = true;

        resize();
        window.addEventListener('resize', resize, false);

        document.body.appendChild(renderer.domElement);
    }

    function animate() {

        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( animate );

        if (stats) stats.begin();

        //mesh.scale = new THREE.Vector3(params.scaleX, params.scaleY, params.scaleZ);
        mesh.scale.x = params.scaleX;
        mesh.scale.y = params.scaleY;
        mesh.scale.z = params.scaleZ;

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render(scene, camera);

        if (stats) stats.end();
    }

    function init_stats() {
        stats = new Stats();
        stats.setMode(0); // 0: fps, 1: ms

        var el = stats.domElement;
        el.classList.add('stats');
        document.body.appendChild(el);
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
