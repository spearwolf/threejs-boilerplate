'use strict';

import { THREE } from 'threejs-boilerplate';

//====================================================================//
//
// init scene
//
//====================================================================//

export function init (app) {

    app.scene.fog = new THREE.Fog(0xffffff, 1, 5000);
    app.scene.fog.color.setHSL(0.6, 0, 1);

    app.mesh = createCube(400, 'textures/face.jpg');
    app.scene.add(app.mesh);

    app.scene.add(createHemisphereLight());

    // app.scene.add(createPointLight(100, 500, 500));

    let light = createDirectionalLight();
    app.scene.add(light);

    let shadowCamera = new THREE.CameraHelper(light.shadow.camera);
    app.shadowCamera = shadowCamera;
    app.scene.add(shadowCamera);

    app.scene.add(createGround(100000, -700));

    app.renderer.gammaInput = true;
    app.renderer.gammaOutput = true;

    app.renderer.shadowMap.enabled = true;
    app.renderer.shadowMap.cullFace = THREE.CullFaceBack;

}

function createDirectionalLight () {

    let dirLight = new THREE.DirectionalLight(0xffffff, 1);

    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(500);

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;

    let d = 1000;

    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    dirLight.shadow.camera.far = 4000;
    dirLight.shadow.bias = -0.0001;

    return dirLight;

}

function createHemisphereLight () {

    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);

    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 200, 0);

    return hemiLight;

}


function createPointLight (x, y, z, color = 0xffffff, intensity = 1, distance = 0) {

    let light = new THREE.PointLight(color, intensity, distance);

    light.position.set(x, y, z);

    return light;

}

function createGround (size = 10000, posY = -500, color = 0xffffff, specular = 0x050505) {

    let geometry = new THREE.PlaneBufferGeometry(size, size);
    let material = new THREE.MeshPhongMaterial({ color: color, specular: specular });

    material.color.setHSL(0.095, 1, 0.75);

    let ground = new THREE.Mesh(geometry, material);

    ground.rotation.x = -Math.PI/2;
    ground.position.y = posY;
    ground.receiveShadow = true;

    return ground;

}

function createCube (size, texture, color = 0xbbbbbb, specular = 0x333333, shininess = 20) {

    let geometry = new THREE.BoxGeometry(size, size, size);
    let material = new THREE.MeshPhongMaterial({
              map: new THREE.TextureLoader().load(texture),
            color: color,
         specular: specular,
        shininess: shininess
    });

    let mesh = new THREE.Mesh(geometry, material);

    mesh.castShadow = true;

    return mesh;

}


//====================================================================//
//
// animate scene
//
//====================================================================//

export function animate (time, app) {

    app.shadowCamera.visible = app.shadowCameraVisible;

    app.mesh.scale.x = app.scaleX;
    app.mesh.scale.y = app.scaleY;
    app.mesh.scale.z = app.scaleZ;

    app.mesh.rotation.x += 0.01 + (app.pointer.drag.y * 0.2);
    app.mesh.rotation.y += 0.02 + (app.pointer.drag.x * 0.2);

}


//====================================================================//
//
// configuration (optional)
//
// TIP: remove if you don't like or need it
//
//====================================================================//

export function configure (app) {

    //app.preventDefaultTouchEvents();
    app.enablePointerPositionTracking();

    Object.assign(app, {

        scaleX: 1.0,
        scaleY: 1.0,
        scaleZ: 1.0,
        shadowCameraVisible: false,

    });

    app.on('dat-gui', function (dat) {

        let gui = new dat.GUI({
            height: 4 * 32 - 1
        });

        gui.add(app, 'scaleX').min(0.1).max(5.0).name('Scale X');
        gui.add(app, 'scaleY').min(0.1).max(5.0).name('Scale Y');
        gui.add(app, 'scaleZ').min(0.1).max(5.0).name('Scale Z');
        gui.add(app, 'shadowCameraVisible').name('shadow camera');

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


