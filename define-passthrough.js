'use strict';
/**
 * define-passthrough.js
 * ---------------------
 *
 * @flow
 */

/*:
type PropertyDescriptor = {
    configurable?: boolean,
    enumerable?: boolean,
    value?: any,
    writable?: boolean,
    //get?: () => any,
    //set?: (value: any) => void,
    get?: (value: any) => any,
    set?: (value: any) => any,
};
*/

function definePassthrough(object/*: object*/, property/*: string*/, descriptor/*: PropertyDescriptor*/) {
    if (descriptor.get || descriptor.set) {
        let { value } = descriptor;
        delete descriptor.value;
        const noop = (val) => val;
        const $get = descriptor.get || noop;
        const $set = descriptor.set || noop;
        //descriptor.get = () => $get(value)
        //descriptor.set = (val) => value = $set(val)
        descriptor.get = function() { return $get.call(this, value); }
        descriptor.set = function(val) { value = $set.call(this, val); }
    }
    Object.defineProperty(object, property, descriptor);
}

module.exports = definePassthrough;
