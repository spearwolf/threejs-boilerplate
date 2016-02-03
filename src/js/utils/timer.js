'use strict';

import eventize from './custom_event';

export default class Timer {

    constructor (time, parentTimer) {

        eventize(this);

        this.parentTimer = parentTimer;
        this.paused = false;
        this.pausedAtTime = .0;
        this.millis = .0;
        this.seconds = .0;
        this.deltaSeconds = .0;
        this.lastSeconds = .0;
        this.timeAtStartup = .0;
        this.timeLostByPause = .0;

        this.tick(time || performance.now());

    }

    createTimer () {
        let timer = new Timer(null, this);
        timer._tick = timer.tick;
        timer.tick = function (_, time) { timer._tick(time); };
        this.bind(timer);
        return timer;
    }

    destroy () {
        this.emit('destroy');
        if (this.parentTimer) {
            this.parentTimer.off(this);
            this.parentTimer = null;
        }
    }

    tick (time) {  // ms

        this.currentTime = time;

        if (!this.paused) {

            if (this.timeAtStartup > .0) {
                // normal behaviour (not paused)
                this.millis = time - this.timeAtStartup - this.timeLostByPause;
                this.seconds = this.millis / 1000.0;
                if (this.lastSeconds > .0) {
                    this.deltaSeconds = this.seconds - this.lastSeconds;
                    this.lastSeconds = this.seconds;
                } else {
                    this.lastSeconds = this.seconds;
                }
            } else {
                // first tick ever
                this.timeAtStartup = time;
            }

        }

        this.emit('tick', this.millis);

    }

    pause () {
        if (!this.paused) {
            this.paused = true;
            this.pausedAtTime = this.currentTime;
        }
    }

    play () {
        if (this.paused) {
            this.paused = false;
            this.timeLostByPause += this.currentTime - this.pausedAtTime;
        }
    }

}

