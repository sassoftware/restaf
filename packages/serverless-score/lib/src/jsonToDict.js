/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
 'use strict';

/**
 * Produce a string with casl dictionary suitable for inclsion in casl code
 * 
 * @module jsonToDict
 * @param {object} obj - the JS object of interest
 * @param {string} name - the name to assign to the dictionary
 * 
 * @returns {string} returns the string containing the casl dictionary
 * 
 * @example
 * 
 *  obj = {x: 1, b:2, c: ['a','b']};
 *  name ='_appEnv_';
 *  result is a string _appEnv_ = {x=2, b=3, c={"a', "b"}}
 */
 
module.exports = function jsonToDict (obj, name) {
    let o1;
    if (obj === null) {
        o1 = `{}`;
    } else {
        o1 = (Array.isArray(obj) === true)? handleArray(obj) : handleObject(obj);
    }
    return `${name} = ${o1};`
}
function handleObject(obj) {
    let r    = '{ ';
    let sep =  ' ';
    for (let k in obj) {
        if (Array.isArray(obj[k]) === true) {
            let o = handleArray(obj[k]);
            r = r + sep +  `${k}=` + o ;
        } else {
            let type = typeof obj[k] ;
            if (type === 'object') {
                let o = handleObject(obj[k]);
                r = r + sep +  `${k}=` + o ;
            } else {
                r = r + sep + `${k}=` + ((type === 'string') ? ` "${obj[k]}" ` : `${obj[k]}  `) ;
            }
        }
        sep = ',';
    }
   r = r + '} ';
   return r;
}

function handleArray(obj) {
    let r    = '{';
    let sep =  ' ';
    let size = obj.length;
    for (let k=0; k<size; k++) {
        if (Array.isArray(obj[k]) === true) {
            let o = handleArray(obj[k]);
            r = r + sep +  `${k}=` + o;
        } else {
            let type = typeof obj[k] ;
            if (type === 'object') {
                let o = handleObject(obj[k]);
                r = r + sep  + o ;
            } else {
                r = r + sep +  ((type === 'string') ? ` "${obj[k]}" ` : `${obj[k]}  `) ;
            }
            sep = ',';
        }
    }
   r = r + '}';
   return r;
}
