'use strict';
/**
 * promisify-event.js
 * ------------------
 *
 * @flow
 */

//const EventEmitter = require('events');
const Promise = require('bluebird');
const uniq = require('lodash/uniq');

const isPlainObject = require('./isPlainObject');
const once = require('./once');



function promisifyEvent(emitter/*: EventEmitter*/, event/*: string|Array<string>*/, options/*: object?*/) /*: Promise*/ {

    let events/*:Array<string>*/ = [];
    if (arguments.length > 1) {
        for (const i = 1, arg = arguments[i]; i < arguments.length; i++) {
            if (isPlainObject(arg)) {
                options = arg;
                break;
            } else if (Array.isArray(arg)) {
                events.push(...arg);
            } else {
                events.push(arg);
            }
        }
    }
    events = uniq(events);

    options = isPlainObject(options) ? options : {};
    // defaults
    options = Object.assign({}, {
        multiArgs: false,  // if event emits with multiple args, should Promise resolve as an array of args (multiArgs: true) or just resolve the first arg (multiArgs: false)?
        rejectError: true,  // if emitter emits 'error' event, should Promise be rejected?
    }, options || {});

    if (options.rejectError && !~events.indexOf('error')) {
        //events.push('error');
        events.unshift('error');
    }

    let listener, addListeners, removeListeners,
        promise, resolvePromise, rejectPromise;
    const listeners = {};

    addListeners = once(() => {
        for (const i = 0; i < events.length; i++) {
            const eventName = events[i];
            //emitter.once(eventName, listener.bind(null, eventName));
            listeners[eventName] = listener.bind(null, eventName);
            emitter.once(eventName, listeners[eventName]);
        }
    });
    removeListeners = once(() => {
        for (const eventName in listeners) {
            if (listeners.hasOwnProperty(eventName)) {
                emitter.removeListener(eventName, listeners[eventName]);
            }
        }
    });

    promise = new Promise((resolve, reject) => {
        [ resolvePromise, rejectPromise ] = [ resolve, reject ];

        if (events.length === 0) {
            return reject(new Error('No `event` args supplied to `promisifyEvent()`'));
        } else if (!events.every((evt) => typeof evt === 'string')) {
            return reject(new Error('All `event` args to `promisifyEvent()` must be strings!'));
        }

        listener = function(eventName/*:string*/, ...args) {
            removeListeners();
            if (!promise.isPending()) return;
            if (!args || args.length === 0) {
                args = undefined;
            } else if (args.length >= 1 && (!options.multiArgs || (options.rejectError && eventName === 'error'))) {
                args = args[0];
            }
            // reject/resolve Promise
            if (eventName === 'error' && options.rejectError) {
                reject(args);
            } else {
                resolve(args);
            }
        }
        addListeners();

    });
    promise.cancel = (reason/*:?Error|string|boolean*/) => {
        removeListeners();
        if (!promise.isPending()) return;
        else if (reason.constructor === Error) reason = reason;
        else if (typeof reason === 'string') reason = new Error(reason);
        else if (reason === true) reason = null;  // `(undefined === void 0) // true` but `(null === void 0) // false`
        else reason = undefined;
        if (reason !== void 0)
            rejectPromise(reason);
    }

    return promise;

}

module.exports = promisifyEvent;
