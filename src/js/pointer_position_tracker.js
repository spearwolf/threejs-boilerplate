'use strict';

export default class PointerPositionTracker {

    constructor (element) {

        this.element = element || document;

        this.isTapMove = false;

        this.pos = {
            x: 0,
            y: 0,
            drag: {
                x: 0,
                y: 0,
                gravity: 0.01
            },
            onTapStart: {
                x: 0,
                y: 0,
            }
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

    }

    tick () {
        if (this.isTapMove) return;

        if (this.pos.drag.x > 0) {
            this.pos.drag.x -= this.pos.drag.gravity;
            if (this.pos.drag.x < 0) {
                this.pos.drag.x = 0;
            }
        } else if (this.pos.drag.x < 0) {
            this.pos.drag.x += this.pos.drag.gravity;
            if (this.pos.drag.x > 0) {
                this.pos.drag.x = 0;
            }
        }
        if (this.pos.drag.y > 0) {
            this.pos.drag.y -= this.pos.drag.gravity;
            if (this.pos.drag.y < 0) {
                this.pos.drag.y = 0;
            }
        } else if (this.pos.drag.y < 0) {
            this.pos.drag.y += this.pos.drag.gravity;
            if (this.pos.drag.y > 0) {
                this.pos.drag.y = 0;
            }
        }
    }

    onMouseDown (event) {

        event.preventDefault();

        this.isTapMove = true;

        this.element.addEventListener('mousemove', this._onMouseMove, false);
        this.element.addEventListener('mouseup', this._onMouseUp, false);
        this.element.addEventListener('mouseout', this._onMouseUp, false);

        let w = this.element.clientWidth;
        let h = this.element.clientHeight;

        this.pos.onTapStart.x = (event.clientX - w / 2.0) / w;
        this.pos.onTapStart.y = (event.clientY - h / 2.0) / h;

        if (typeof this.onTapMoveStart === 'function') this.onTapMoveStart(this);

    }

    onMouseMove (event) {

        let w = this.element.clientWidth;
        let h = this.element.clientHeight;

        this.pos.x = (event.clientX - w / 2.0) / w;
        this.pos.y = (event.clientY - h / 2.0) / h;
        this.pos.drag.x = this.pos.x - this.pos.onTapStart.x;
        this.pos.drag.y = this.pos.y - this.pos.onTapStart.y;

        if (typeof this.onTapMove === 'function') this.onTapMove(this);

    }

    onMouseUp (/*event*/) {

        this.pos.x = 0;
        this.pos.y = 0;
        this.pos.onTapStart.x = 0;
        this.pos.onTapStart.y = 0;

        this.isTapMove = false;

        this.element.removeEventListener('mousemove', this._onMouseMove, false);
        this.element.removeEventListener('mouseup', this._onMouseUp, false);
        this.element.removeEventListener('mouseout', this._onMouseUp, false);

    }

    onTouchStart (event) {
        event.preventDefault();
        if (event.touches && event.touches.length) {

            this.isTapMove = true;

            this.pos.onTapStart.x = event.touches[0].clientX - this.element.clientWidth / 2.0;
            this.pos.onTapStart.y = event.touches[0].clientY - this.element.clientHeight / 2.0;

            if (typeof this.onTapMoveStart === 'function') this.onTapMoveStart(this);

        }
    }

    onTouchMove (event) {
        event.preventDefault();
        if (event.touches && event.touches.length) {
            if (this.isTapMove) {

                this.pos.x = event.touches[0].clientX - this.element.clientWidth / 2.0;
                this.pos.y = event.touches[0].clientY - this.element.clientHeight / 2.0;

                if (typeof this.onTapMove === 'function') this.onTapMove(this);

            }
        }
    }

    onTouchEnd (/*event*/) {
        event.preventDefault();
        if (event.touches && event.touches.length) {

            this.pos.x = 0;
            this.pos.y = 0;
            this.pos.onTapStart.x = 0;
            this.pos.onTapStart.y = 0;

            this.isTapMove = false;

        }
    }

}

