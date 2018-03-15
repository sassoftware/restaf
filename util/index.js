/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */

let errColors   = require('./errColors');
let stdColors   = require('./stdColors');
let titleColors = require('./titleColors');
let prettyjson = require('prettyjson');

function printErr (msg) {
    console.log(prettyjson.render(msg, errColors)) ;
}
exports.printErr = printErr;

function print (msg){
    console.log(prettyjson.render(msg, stdColors)) ;
}
exports.print = print;
function printTitle (msg){
    console.log(prettyjson.render(msg, titleColors)) ;
}
exports.printTitle = printTitle;

