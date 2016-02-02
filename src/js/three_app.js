"use strict";

export const THREE = require('../../bower_components/three.js/build/three.min');
export const Stats = require('../../bower_components/stats.js/build/stats.min');

const DEFAULT_OPTIONS = {

            alpha: true,
        antialias: true,
        autoClear: true,

        showStats: true,
    statsCssClass: 'stats',

           onInit: null,
         onResize: null,
         onRender: null

};

export function ThreeApp (options) {

    let opts = Object.assign({}, DEFAULT_OPTIONS, options);

    this.scene = new THREE.Scene();

    Object.defineProperty(this, 'renderer', {
        value: new THREE.WebGLRenderer({ alpha: opts.alpha, antialias: opts.antialias }),
        enumerable: true
    });

    this.renderer.autoClear = opts.autoClear;
    this.renderer.setPixelRatio(this.DPR);

    document.body.appendChild(this.renderer.domElement);

    if (typeof opts.onResize === 'function') this.onResize = opts.onResize;
    if (typeof opts.onRender === 'function') this.onRender = opts.onRender;
    if (typeof opts.onInit === 'function') this.onInit = opts.onInit;

    this.resize();
    window.addEventListener('resize', this.resize.bind(this), false);

    if (opts.showStats) {
        this.stats = new Stats();
        this.stats.setMode(0); // 0: fps, 1: ms

        let el = this.stats.domElement;
        if (opts.statsCssClass) el.classList.add(opts.statsCssClass);
        document.body.appendChild(el);
    }

    if (this.onInit) {
        this.onInit(this);
    }

    requestAnimationFrame(this.render.bind(this));

}

ThreeApp.prototype.resize = function () {

    let container = this.domElement.parentNode;
    let w = container.clientWidth;
    let h = container.clientHeight;

    if (!this.camera) {

        this.camera = new THREE.PerspectiveCamera(75, w / h, 1, 10000);
        this.camera.position.z = 1000;
        this.camera.createdByThreeApp = true;
        this.camera.projectionMatrixNeedsUpdate = true;

    } else if (this.camera.createdByThreeApp) {

        this.camera.aspect = w / h;
        //this.camera.updateProjectionMatrix();
        this.camera.projectionMatrixNeedsUpdate = true;

    }

    this.renderer.setSize(w, h);

    Object.defineProperties(this, {
        width: {
            configurable: true,
            enumerable: true,
            value: w
        },
        height: {
            configurable: true,
            enumerable: true,
            value: h
        }
    });

    if ('function' === typeof this.onResize) {
        this.onResize(w, h, this);
    }

};

ThreeApp.prototype.render = function (time) {

    if (this.stats) this.stats.begin();

    if (this.camera.createdByThreeApp && this.camera.projectionMatrixNeedsUpdate) {
        this.camera.updateProjectionMatrix();
        this.camera.projectionMatrixNeedsUpdate = false;
    }

    if ('function' === typeof this.onRender) {
        this.onRender(time, this);
    }

    this.renderer.render(this.scene, this.camera);

    if (this.stats) this.stats.end();

    requestAnimationFrame(this.render.bind(this));

};

Object.defineProperties(ThreeApp.prototype, {

    DPR: {
        value: window.devicePixelRatio || 1,
        enumerable: true
    },

    domElement: {
        get: function () { return this.renderer.domElement },
        enumerable: true
    }

});

