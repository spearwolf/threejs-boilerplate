'use strict';

import eventize from './custom_event';

const DEFAULT_OPTIONS = {
    dragGravity: 1.0
};

export default class PointerPositionTracker {

    constructor (element, options) {

        let opts = Object.assign({}, DEFAULT_OPTIONS, options);

        this.element = element || document;

        this.isTapMove = false;
        this.touchIdentifier = null;

        this.pos = {
            x: 0,
            y: 0,
            onTapStart: {
                x: 0,
                y: 0,
            }
        };

        this.drag = {
            x: 0,
            y: 0,
            gravity: opts.dragGravity
        };

        this._onMouseDown = this.onMouseDown.bind(this);
        this._onTouchStart = this.onTouchStart.bind(this);
        this._onTouchMove = this.onTouchMove.bind(this);
        this._onTouchEnd = this.onTouchEnd.bind(this);
        this._onMouseMove = this.onMouseMove.bind(this);
        this._onMouseUp = this.onMouseUp.bind(this);

        this.element.addEventListener('mousedown', this._onMouseDown, false);
        this.element.addEventListener('touchstart', this._onTouchStart, false);
        this.element.addEventListener('touchmove', this._onTouchMove, false);
        this.element.addEventListener('touchend', this._onTouchEnd, false);

        eventize(this);

        this.on(opts, {
            onTapStart: 'tapStart',
            onTapMove: 'tapMove',
            onTapEnd: 'tapEnd'
        });

    }

    tick (deltaSeconds) {

        let gravity = this.drag.gravity * deltaSeconds;

        if (this.isTapMove) return;

        if (this.drag.x > 0) {
            this.drag.x -= gravity;
            if (this.drag.x < 0) {
                this.drag.x = 0;
            }
        } else if (this.drag.x < 0) {
            this.drag.x += gravity;
            if (this.drag.x > 0) {
                this.drag.x = 0;
            }
        }
        if (this.drag.y > 0) {
            this.drag.y -= gravity;
            if (this.drag.y < 0) {
                this.drag.y = 0;
            }
        } else if (this.drag.y < 0) {
            this.drag.y += gravity;
            if (this.drag.y > 0) {
                this.drag.y = 0;
            }
        }

    }

    tapStart (clientX, clientY) {

        this.isTapMove = true;

        let w = this.element.clientWidth;
        let h = this.element.clientHeight;

        this.pos.onTapStart.x = (clientX - w / 2.0) / w;
        this.pos.onTapStart.y = (clientY - h / 2.0) / h;

        this.emit('tapStart', this);

    }

    tapMove (clientX, clientY) {

        let w = this.element.clientWidth;
        let h = this.element.clientHeight;

        this.pos.x = (clientX - w / 2.0) / w;
        this.pos.y = (clientY - h / 2.0) / h;

        this.drag.x = this.pos.x - this.pos.onTapStart.x;
        this.drag.y = this.pos.y - this.pos.onTapStart.y;

        this.emit('tapMove', this);

    }

    tapEnd () {

        this.pos.x = 0;
        this.pos.y = 0;

        this.pos.onTapStart.x = 0;
        this.pos.onTapStart.y = 0;

        this.isTapMove = false;
        this.touchIdentifier = null;

        this.emit('tapEnd', this);

    }

    onMouseDown (event) {

        //event.preventDefault();

        this.element.addEventListener('mousemove', this._onMouseMove, false);
        this.element.addEventListener('mouseup', this._onMouseUp, false);
        this.element.addEventListener('mouseout', this._onMouseUp, false);

        this.tapStart(event.clientX, event.clientY);

    }

    onMouseMove (event) {

        if (this.isTapMove) this.tapMove(event.clientX, event.clientY);

    }

    onMouseUp (/*event*/) {

        this.element.removeEventListener('mousemove', this._onMouseMove, false);
        this.element.removeEventListener('mouseup', this._onMouseUp, false);
        this.element.removeEventListener('mouseout', this._onMouseUp, false);

        this.tapEnd();

    }


    onTouchStart (event) {

        event.preventDefault();

        if (this.isTapMove) return;
        this.isTapMove = true;

        let touch = event.touches[0];
        this.touchIdentifier = touch.identifier;

        this.tapStart(touch.clientX, touch.clientY);

    }

    onTouchMove (event) {

        event.preventDefault();

        if (!this.isTapMove) return;

        findTouch(event, this.touchIdentifier, (touch) => {
            this.tapMove(touch.clientX, touch.clientY);
        });

    }

    onTouchEnd (/* event */) {

        //event.preventDefault();

        this.tapEnd();

    }

}

function findTouch (event, touchIdentifier, callback) {
    if (event.touches && event.touches.length) {
        for (let i = 0; i < event.touches.length; i++) {
            let touch = event.touches[i];
            if (touch.identifier === touchIdentifier) {
                if (typeof callback === 'function') {
                    callback(touch);
                }
                return touch;
            }
        }
    }
}

