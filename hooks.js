'use strict';
/**
 * hooks.js
 * --------
 *
 * @flow
 */

const Promise = require('bluebird');

const isPromise = require('./isPromise');
const once = require('./once');

/*::
type Hook$handler = (object: object, next: (error:?Error) => void, reschedule: (reason:?string) => void) => ?Promise
//type Hook$handler<T> = (object: T, next: (error:?Error) => void, reschedule: (reason:?string) => void) => ?Promise
*/

class Hooks/*:<T>*/ {

    /*: handlers: { pre: {[key:string]:Hook$handler<T>}, post: {[key:string]:Hook$handler<T>} } = { pre: {}, post: {} }*/

    constructor() {
        this.handlers = { pre: {}, post: {} }
        this.pre = this.pre.bind(this);
        this.post = this.post.bind(this);
        this.removePre = this.removePre.bind(this);
        this.removePost = this.removePost.bind(this);
        this.execPre = this.execPre.bind(this);
        this.execPost = this.execPost.bind(this);
    }

    pre(event/*: string*/, handler/*: Hook$handler*/) {
        if (!event) throw new Error(`Failed to register #pre hook for undefined event!`);
        if (!handler) throw new Error(`Failed to register #pre hook for event: ${event} because handler was undefined!`);
        if (this.handlers.pre[event] == void 0)
            this.handlers.pre[event] = [];
        const handlers = this.handlers.pre[event];
        if (!handlers.includes(handler))
            handlers.push(handler);
        return this;
    }
    post(event/*: string*/, handler/*: Hook$handler*/) {
        if (!event) throw new Error(`Failed to register #post hook for undefined event!`);
        if (!handler) throw new Error(`Failed to register #post hook for event: ${event} because handler was undefined!`);
        if (this.handlers.post[event] == void 0)
            this.handlers.post[event] = [];
        const handlers = this.handlers.post[event];
        if (!handlers.includes(handler))
            handlers.push(handler);
        return this;
    }

    removePre(event/*: string*/, handler/*: Hook$handler*/) {
        if (!event) throw new Error(`Failed to remove #pre hook for undefined event!`);
        if (!handler) throw new Error(`Failed to remove #pre hook for event: ${event} because handler was undefined!`);
        const handlers = this.handlers.pre[event] || [];
        const idx = handlers.indexOf(handler);
        if (~idx) handlers.splice(idx, 1);
        return;
    }
    removePost(event/*: string*/, handler/*: Hook$handler*/) {
        if (!event) throw new Error(`Failed to remove #post hook for undefined event!`);
        if (!event) throw new Error(`Failed to remove #post hook for event: ${event} because handler was undefined!`);
        const handlers = this.handlers.post[event] || [];
        const idx = handlers.indexOf(handler);
        if (~idx) handlers.splice(idx, 1);
        return;
    }

    execPre(event/*: string*/, object/*: T*/) /*: Promise*/ {
        if (!event) throw new Error(`Failed to exec #pre hook for undefined event!`);
        return execHandlers(this.handlers.pre[event], object);
    }
    execPost(event/*: string*/, object/*: T*/) /*: Promise*/ {
        if (!event) throw new Error(`Failed to exec #post hook for undefined event!`);
        return execHandlers(this.handlers.post[event], object);
    }

}

module.exports = Hooks;



function execHandlers(handlers/*: Array<Hook$handler>*/, arg/*: ?any*/) /*: Promise*/ {
    if (handlers == void 0 || handlers.length === 0)
        return Promise.resolve();
    if (!Array.isArray(args))
        args = (args == void 0) ? [] : [ args ];
    const asyncPromises = [], rescheduledHandlers = [];
    return Promise
        .each(handlers, (handler) => {
            console.log(handler.name);
            let next, reschedule;
            const next$promise = Promise.fromCallback((callback) => next = once(callback));
            //const reschedule$promise = new Promise((resolve) => reschedule = once(resolve));
            //    //.then(() => rescheduledHandlers.push(handler))
            //    .then(() =>
            //        (handler.length === 1)
            //        ? Promise.reject(new Error('Cannot reschedule hook handler if it is the only handler left to execute!'))
            //        : rescheduledHandlers.push(handler)
            //    )
            const reschedule$promise = new Promise((resolve, reject) => {
                reschedule = once((reason/*: ?string*/) => {
                    console.log(`reschedule() ${handler.name}: ${reason}`);
                    if (handler.length === 1) {
                        reject(new Error(`Cannot reschedule hook handler if it is the only handler left to execute! ${handler.name || '<<Anonymous Handler>>'}` + (reason ? `: ${reason}` : '')));
                    } else {
                        rescheduledHandlers.push(handler);
                        resolve();
                    }
                });
            })
            const promise = handler(arg, next, reschedule);
            if (isPromise(promise)) {
                asyncPromises.push(promise);
                return Promise.race([ promise, next$promise, reschedule$promise ]);
            } else return;
        })
        .then(() => Promise.all(asyncPromises))
        .then(() => execHandlers(rescheduledHandlers, args))
        .return()
}
