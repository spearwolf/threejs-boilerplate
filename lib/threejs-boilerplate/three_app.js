/* global __STATS__ */
'use strict';

export const THREE = require('three.js/build/three.min');
const eventize = require('eventize-js');

var Stats;
if (__STATS__) {
    Stats = require('stats.js/build/stats.min');
}

import PointerPositionTracker from './pointer_position_tracker';
import Timer from './timer';


const EVENT_PRIO_HIGH = 100000;

const DEFAULT_OPTIONS = {

            alpha: true,
        antialias: true,
        autoClear: true,

        showStats: __STATS__,
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

    this.timer = new Timer();

    eventize(this).connect(opts, {
        onInit: 'init',
        onResize: 'resize',
        onRender: 'render',
    });

    this.resize();
    //window.addEventListener('resize', this.resize.bind(this), false);

    if (__STATS__) {
        if (opts.showStats) {
            this.stats = new Stats();
            this.stats.setMode(0); // 0: fps, 1: ms

            let el = this.stats.domElement;
            if (opts.statsCssClass) el.classList.add(opts.statsCssClass);
            document.body.appendChild(el);
        }
    }

    this.emit('init', this);

    requestAnimationFrame(this.render.bind(this));

}

ThreeApp.prototype.resize = function () {

    let container = this.domElement.parentNode;
    let w = container.clientWidth;
    let h = container.clientHeight;

    if (this.width === w && this.height === h) return;

    if (!this.camera) {

        this.camera = new THREE.PerspectiveCamera(75, w / h, 1, 10000);
        this.camera.position.z = 1000;
        this.camera.createdByThreeApp = true;
        this.camera.projectionMatrixNeedsUpdate = true;

    } else if (this.camera.createdByThreeApp) {

        this.camera.aspect = w / h;
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

    this.emit('resize', w, h, this);

};

ThreeApp.prototype.render = function (time) {

    if (__STATS__) {
        if (this.stats) this.stats.begin();
    }

    this.timer.tick(time);

    this.resize();

    if (this.camera.createdByThreeApp && this.camera.projectionMatrixNeedsUpdate) {
        this.camera.updateProjectionMatrix();
        this.camera.projectionMatrixNeedsUpdate = false;
    }

    this.emit('render', this.timer.seconds, this);

    this.renderer.render(this.scene, this.camera);

    if (__STATS__) {
        if (this.stats) this.stats.end();
    }

    requestAnimationFrame(this.render.bind(this));

};

ThreeApp.prototype.enablePointerPositionTracking = function (options) {

    this.pointer = new PointerPositionTracker(this.domElement, options);

    this.on('render', EVENT_PRIO_HIGH, () => this.pointer.tick(this.timer.deltaSeconds));

};

ThreeApp.prototype.preventDefaultTouchEvents = function () {
    document.body.addEventListener('touchmove', (event) => { event.preventDefault() }, false);
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

