(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("restafCommons", [], factory);
	else if(typeof exports === 'object')
		exports["restafCommons"] = factory();
	else
		root["restafCommons"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../node_modules/jwt-decode/lib/atob.js":
/*!*****************************************************************!*\
  !*** C:/Public/gen2/restaf/node_modules/jwt-decode/lib/atob.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The code was extracted from:\n * https://github.com/davidchambers/Base64.js\n */\n\nvar chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';\n\nfunction InvalidCharacterError(message) {\n  this.message = message;\n}\n\nInvalidCharacterError.prototype = new Error();\nInvalidCharacterError.prototype.name = 'InvalidCharacterError';\n\nfunction polyfill (input) {\n  var str = String(input).replace(/=+$/, '');\n  if (str.length % 4 == 1) {\n    throw new InvalidCharacterError(\"'atob' failed: The string to be decoded is not correctly encoded.\");\n  }\n  for (\n    // initialize result and counters\n    var bc = 0, bs, buffer, idx = 0, output = '';\n    // get next character\n    buffer = str.charAt(idx++);\n    // character found in table? initialize bit storage and add its ascii value;\n    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,\n      // and if not first of each 4 characters,\n      // convert the first 8 bits to one ascii character\n      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0\n  ) {\n    // try to find character in table (0-63, not found => -1)\n    buffer = chars.indexOf(buffer);\n  }\n  return output;\n}\n\n\nmodule.exports = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;\n\n\n//# sourceURL=webpack://restafCommons/C:/Public/gen2/restaf/node_modules/jwt-decode/lib/atob.js?");

/***/ }),

/***/ "../../../node_modules/jwt-decode/lib/base64_url_decode.js":
/*!******************************************************************************!*\
  !*** C:/Public/gen2/restaf/node_modules/jwt-decode/lib/base64_url_decode.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var atob = __webpack_require__(/*! ./atob */ \"../../../node_modules/jwt-decode/lib/atob.js\");\n\nfunction b64DecodeUnicode(str) {\n  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {\n    var code = p.charCodeAt(0).toString(16).toUpperCase();\n    if (code.length < 2) {\n      code = '0' + code;\n    }\n    return '%' + code;\n  }));\n}\n\nmodule.exports = function(str) {\n  var output = str.replace(/-/g, \"+\").replace(/_/g, \"/\");\n  switch (output.length % 4) {\n    case 0:\n      break;\n    case 2:\n      output += \"==\";\n      break;\n    case 3:\n      output += \"=\";\n      break;\n    default:\n      throw \"Illegal base64url string!\";\n  }\n\n  try{\n    return b64DecodeUnicode(output);\n  } catch (err) {\n    return atob(output);\n  }\n};\n\n\n//# sourceURL=webpack://restafCommons/C:/Public/gen2/restaf/node_modules/jwt-decode/lib/base64_url_decode.js?");

/***/ }),

/***/ "../../../node_modules/jwt-decode/lib/index.js":
/*!******************************************************************!*\
  !*** C:/Public/gen2/restaf/node_modules/jwt-decode/lib/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar base64_url_decode = __webpack_require__(/*! ./base64_url_decode */ \"../../../node_modules/jwt-decode/lib/base64_url_decode.js\");\n\nfunction InvalidTokenError(message) {\n  this.message = message;\n}\n\nInvalidTokenError.prototype = new Error();\nInvalidTokenError.prototype.name = 'InvalidTokenError';\n\nmodule.exports = function (token,options) {\n  if (typeof token !== 'string') {\n    throw new InvalidTokenError('Invalid token specified');\n  }\n\n  options = options || {};\n  var pos = options.header === true ? 0 : 1;\n  try {\n    return JSON.parse(base64_url_decode(token.split('.')[pos]));\n  } catch (e) {\n    throw new InvalidTokenError('Invalid token specified: ' + e.message);\n  }\n};\n\nmodule.exports.InvalidTokenError = InvalidTokenError;\n\n\n//# sourceURL=webpack://restafCommons/C:/Public/gen2/restaf/node_modules/jwt-decode/lib/index.js?");

/***/ }),

/***/ "./casSetup.js":
/*!*********************!*\
  !*** ./casSetup.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\n *  ------------------------------------------------------------------------------------\n *  * Copyright (c) SAS Institute Inc.\n *  *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  * you may not use this file except in compliance with the License.\n *  * You may obtain a copy of the License at\n *  *\n *  * http://www.apache.org/licenses/LICENSE-2.0\n *  *\n *  *  Unless required by applicable law or agreed to in writing, software\n *  * distributed under the License is distributed on an \"AS IS\" BASIS,\n *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  * See the License for the specific language governing permissions and\n *  limitations under the License.\n * ----------------------------------------------------------------------------------------\n *\n */\n\n\nasync function casSetup(store, logonPayload) {\n  if (logonPayload !== null) {\n    await store.logon(logonPayload);\n  }\n\n  let {\n    casManagement\n  } = await store.addServices('casManagement');\n  let servers = await store.apiCall(casManagement.links('servers'));\n  let casserver = servers.itemsList(0);\n  let session = await store.apiCall(servers.itemsCmd(casserver, 'createSession'));\n  return {\n    servers: servers,\n    session: session\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (casSetup);\n\n//# sourceURL=webpack://restafCommons/./casSetup.js?");

/***/ }),

/***/ "./casTableToJson.js":
/*!***************************!*\
  !*** ./casTableToJson.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\n * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\n * SPDX-License-Identifier: Apache-2.0\n*/\n\n/**\n * Converts a cas table to form needed by graphql\n * @module casTableToJson\n * @param {object} result - the raf object retrned from a call to cas\n * @param {string} table - the name of the table\n * \n * @returns {object} - the new json version\n */\n\nfunction casTableToJson(result, table) {\n  let data = result.items('tables', table);\n  let itemRows = data.get('rows');\n  let columns = [];\n  data.get('schema').map(s => {\n    columns.push(s.get('name'));\n  });\n  let allResults = [];\n  itemRows.map(r => {\n    let row = {};\n    r.map((value, j) => {\n      row[columns[j]] = value;\n    });\n    allResults.push(row);\n  });\n  return allResults;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (casTableToJson);\n\n//# sourceURL=webpack://restafCommons/./casTableToJson.js?");

/***/ }),

/***/ "./caslBase.js":
/*!*********************!*\
  !*** ./caslBase.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\n * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\n * SPDX-License-Identifier: Apache-2.0\n*/\n\n/** \n * lib\n */\n\n/**\n *\n * Calls cas server and returns the results(async)\n * \n * @async\n * @module caslBase\n * \n * @param {object} store    - restaf store\n * @param {object} session  - cas session\n * @param {object} src      - casl src statements\n * @param {object} args     - user input args\n * @param {object} env      - app specific vales\n * \n * @returns {object}  standard return value from apiCall\n */\n\n\nlet jsonToDict = __webpack_require__(/*! ./jsonToDict */ \"./jsonToDict.js\"); //\n// Notes: Function to call cas \n// See README file for notes on REUSECASSESSION\n//\n\n\nasync function caslBase(store, session, src, args, env) {\n  //\n  // create casl statements for arguments and appenv\n  //\n  let _args_ = jsonToDict(args, '_args_');\n\n  let _appEnv_ = jsonToDict(env, '_appEnv_');\n\n  let code = _args_ + ' ' + _appEnv_ + ' ' + src; // Patch for issues with sccasl.runcasl via REST API\n\n  code = code.replace(/\\r/g, ''); // setup payload for runAction\n\n  let payload = {\n    action: 'sccasl.runcasl',\n    data: {\n      code: code\n    }\n  };\n  let result = await store.runAction(session, payload);\n  return result;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (caslBase);\n\n//# sourceURL=webpack://restafCommons/./caslBase.js?");

/***/ }),

/***/ "./computeSummary.js":
/*!***************************!*\
  !*** ./computeSummary.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\n * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\n * SPDX-License-Identifier: Apache-2.0\n*/\n\n/**\n *  Reduce the job information into consummable form(async)\n * \n * @async\n * @module computeSummary\n * \n * @param {object} store - restaf store\n * @param {object} job - rafObject representing the compute service job\n * \n * @returns {object} - the computeSmmary object\n */\nasync function computeSummary(store, job) {\n  let cResult = {\n    log: null,\n    listing: null,\n    ods: null,\n    tables: {}\n  };\n  cResult.log = job.links('log');\n  cResult.listing = job.links('listing');\n  let reportLink = job.links('results');\n\n  if (reportLink !== null) {\n    let results = await store.apiCall(reportLink);\n    let size = results.itemsList().size;\n    /* How many results: ods, table1, table2, ... */\n\n    if (size > 0) {\n      for (let i = 0; i < size; i++) {\n        let resultItem = results.itemsList(i);\n        let type = results.items(resultItem, 'data', 'type').toLowerCase();\n\n        if (type === 'ods') {\n          cResult.ods = results.itemsCmd(resultItem, 'self');\n        } else if (type === 'table') {\n          cResult.tables[resultItem] = results.itemsCmd(resultItem, 'self');\n        } else {\n          console.log(`what is ${type} ?`);\n        }\n      }\n    }\n  }\n\n  debugger;\n  return cResult;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (computeSummary);\n\n//# sourceURL=webpack://restafCommons/./computeSummary.js?");

/***/ }),

/***/ "./decodeJwt.js":
/*!**********************!*\
  !*** ./decodeJwt.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\n* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\n* SPDX-License-Identifier: Apache-2.0\n*/\n\n\nconst jwtDecode = __webpack_require__(/*! jwt-decode */ \"../../../node_modules/jwt-decode/lib/index.js\");\n\nfunction decodeJwt(token) {\n  return token === null ? {} : jwtDecode(token);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (decodeJwt);\n\n//# sourceURL=webpack://restafCommons/./decodeJwt.js?");

/***/ }),

/***/ "./findReport.js":
/*!***********************!*\
  !*** ./findReport.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\n * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\n * SPDX-License-Identifier: Apache-2.0\n*/\n\n/**\n *  Search for a named report(async)\n * @async\n * @module findReport\n * \n * @param {object} store - restaf store\n * @param {string} name - name of the VA report \n * \n * @returns {object} - either null or rafObject for the report\n */\n\nasync function findReport(store, name) {\n  let reports = store.getService('reports');\n  let payload = {\n    qs: {\n      filter: `eq(name,'${name}')`\n    } // call the reports service\n\n  };\n  let reportsList = await store.apiCall(reports.links('reports'), payload); // check to see if atleast one report was found(hopefully one only)\n\n  return reportsList.itemsList().size === 0 ? null : reportsList;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (findReport);\n\n//# sourceURL=webpack://restafCommons/./findReport.js?");

/***/ }),

/***/ "./getReportImage.js":
/*!***************************!*\
  !*** ./getReportImage.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\n * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\n * SPDX-License-Identifier: Apache-2.0\n*/\n\n/**\n *  Return the svg of the specified report(async)\n * \n * @module getReportImage\n * @param {object} store - restaf store\n * @param {string} name  - name of the report\n * \n * @returns {string} - the svg of the report\n * \n */\n\nlet findReport = __webpack_require__(/*! ./findReport */ \"./findReport.js\");\n\nasync function getReportImage(store, name) {\n  let reportImages = store.rafObject('reportImages');\n  let reportsList = await findReport(store, name);\n\n  if (reportsList === null) {\n    return `${name} was not found`;\n  }\n\n  let uri = reportsList.itemsCmd(reportsList.itemsList(0), 'self', 'link', 'uri');\n  let data = {\n    reportUri: uri,\n    sectionIndex: 0,\n    layoutType: 'entireSection',\n    size: \"400x400\"\n  };\n  let p = {\n    data: data\n  };\n  let job = await store.apiCall(reportImages.links('createJob'), p);\n  let status = await store.jobState(job, {\n    qs: {\n      wait: 1.5\n    }\n  }, 10, 2);\n\n  if (status.data !== 'completed') {\n    return `Job failed ${status.data}`;\n  }\n\n  let image = await store.apiCall(status.job.itemsCmd(status.job.itemsList(0), 'image'));\n  return image.items();\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (getReportImage);\n\n//# sourceURL=webpack://restafCommons/./getReportImage.js?");

/***/ }),

/***/ "./getReportUrl.js":
/*!*************************!*\
  !*** ./getReportUrl.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\n * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\n * SPDX-License-Identifier: Apache-2.0\n*/\n\n/**\n * Generate url for report(async)\n * @module getReportUrl\n * \n * @param {object} store  - restaf store\n * @param {string} name - name of report\n * \n * @returns {string} url for the report\n */\n\nlet findReport = __webpack_require__(/*! ./findReport */ \"./findReport.js\");\n\nasync function getReportUrl(store, name) {\n  let reportsList = await findReport(store, name);\n\n  if (reportsList === null) {\n    return `${name} was not found`;\n  }\n\n  let uri = reportsList.itemsCmd(name, 'self', 'link', 'uri');\n  let options = \"&appSwitcherDisabled=true&reportViewOnly=true&printEnabled=true&sharedEnabled=true&informationEnabled=true&commentEnabled=true&reportViewOnly=true\";\n  let url = `${process.env.VIYA_SERVER}/SASReportViewer/?reportUri=${uri}${options}`;\n  return url;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (getReportUrl);\n\n//# sourceURL=webpack://restafCommons/./getReportUrl.js?");

/***/ }),

/***/ "./getSasTableRows.js":
/*!****************************!*\
  !*** ./getSasTableRows.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\n * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\n * SPDX-License-Identifier: Apache-2.0\n*/\n//\n// Notes: Retrieve a SAS table and convert to a json\n// convert table to object of the form [{var1: value, var2: value,...},....]\n// ex: [{merlot:10, twobit:20}, {merlot: 20, twobit:30}]\n\n/**\n * Convert table to object of the form [{var1: value, var2: value,...},....](async)\n * @async\n * @module getSASTableRows\n *                  \n * @param {object} store - restaf store\n * @param {object} computeSummary - computeSummary\n * @param {string} tableName - name of the table\n * \n * @returns {object} - resulting json\n */\n\nasync function getSasTableRows(store, computeSummary, tableName) {\n  let tableSelf = computeSummary.tables[tableName];\n  let t1 = await store.apiCall(tableSelf);\n  let table = await store.apiCall(t1.links('rowSet'));\n  let columns = table.items('columns');\n  let rows = table.items('rows');\n  let result = [];\n  debugger;\n  let count = rows.size;\n\n  for (let i = 0; i < count; i++) {\n    let row = rows.get(i);\n    let r = {};\n    columns.map((c, i) => {\n      let varx = c.toLowerCase();\n      r[varx] = row.get(i);\n    });\n    result.push(r);\n  }\n\n  return result;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (getSasTableRows);\n\n//# sourceURL=webpack://restafCommons/./getSasTableRows.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: caslBase, casSetup, casTableToJson, computeSummary, findReport, getReportImage, getReportUrl, getSasTableRows, jsonToDict, logLines, runCompute, spBase, decodeJwt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _caslBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./caslBase */ \"./caslBase.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"caslBase\", function() { return _caslBase__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _casTableToJson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./casTableToJson */ \"./casTableToJson.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"casTableToJson\", function() { return _casTableToJson__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _computeSummary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computeSummary */ \"./computeSummary.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"computeSummary\", function() { return _computeSummary__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _casSetup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./casSetup */ \"./casSetup.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"casSetup\", function() { return _casSetup__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _findReport__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./findReport */ \"./findReport.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"findReport\", function() { return _findReport__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var _getReportImage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getReportImage */ \"./getReportImage.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getReportImage\", function() { return _getReportImage__WEBPACK_IMPORTED_MODULE_5__[\"default\"]; });\n\n/* harmony import */ var _getReportUrl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getReportUrl */ \"./getReportUrl.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getReportUrl\", function() { return _getReportUrl__WEBPACK_IMPORTED_MODULE_6__[\"default\"]; });\n\n/* harmony import */ var _getSasTableRows__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./getSasTableRows */ \"./getSasTableRows.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getSasTableRows\", function() { return _getSasTableRows__WEBPACK_IMPORTED_MODULE_7__[\"default\"]; });\n\n/* harmony import */ var _jsonToDict__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./jsonToDict */ \"./jsonToDict.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"jsonToDict\", function() { return _jsonToDict__WEBPACK_IMPORTED_MODULE_8__[\"default\"]; });\n\n/* harmony import */ var _logLines__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./logLines */ \"./logLines.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"logLines\", function() { return _logLines__WEBPACK_IMPORTED_MODULE_9__[\"default\"]; });\n\n/* harmony import */ var _runCompute__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./runCompute */ \"./runCompute.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"runCompute\", function() { return _runCompute__WEBPACK_IMPORTED_MODULE_10__[\"default\"]; });\n\n/* harmony import */ var _spBase__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./spBase */ \"./spBase.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"spBase\", function() { return _spBase__WEBPACK_IMPORTED_MODULE_11__[\"default\"]; });\n\n/* harmony import */ var _decodeJwt__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./decodeJwt */ \"./decodeJwt.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"decodeJwt\", function() { return _decodeJwt__WEBPACK_IMPORTED_MODULE_12__[\"default\"]; });\n\n/*\n* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\n* SPDX-License-Identifier: Apache-2.0\n*/\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://restafCommons/./index.js?");

/***/ }),

/***/ "./jsonToDict.js":
/*!***********************!*\
  !*** ./jsonToDict.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\n * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\n * SPDX-License-Identifier: Apache-2.0\n*/\n\n/**\n * Produce a string with casl dictionary suitable for inclsion in casl code\n * \n * @module jsonToDict\n * @param {object} obj - the JS object of interest\n * @param {string} name - the name to assign to the dictionary\n * \n * @returns {string} returns the string containing the casl dictionary\n * \n * @example\n * \n *  obj = {x: 1, b:2, c: ['a','b']};\n *  name ='_appEnv_';\n *  result is a string _appEnv_ = {x=2, b=3, c={\"a', \"b\"}}\n */\n\nfunction jsonToDict(obj, name) {\n  let o1;\n\n  if (obj === null) {\n    o1 = `{}`;\n  } else {\n    o1 = Array.isArray(obj) === true ? handleArray(obj) : handleObject(obj);\n  }\n\n  return `${name} = ${o1};`;\n}\n\nfunction handleObject(obj) {\n  let r = '{ ';\n  let sep = ' ';\n\n  for (let k in obj) {\n    if (Array.isArray(obj[k]) === true) {\n      let o = handleArray(obj[k]);\n      r = r + sep + `${k}=` + o;\n    } else {\n      let type = typeof obj[k];\n\n      if (type === 'object') {\n        let o = handleObject(obj[k]);\n        r = r + sep + `${k}=` + o;\n      } else {\n        r = r + sep + `${k}=` + (type === 'string' ? ` \"${obj[k]}\" ` : `${obj[k]}  `);\n      }\n    }\n\n    sep = ',';\n  }\n\n  r = r + '} ';\n  return r;\n}\n\nfunction handleArray(obj) {\n  let r = '{';\n  let sep = ' ';\n  let size = obj.length;\n\n  for (let k = 0; k < size; k++) {\n    if (Array.isArray(obj[k]) === true) {\n      let o = handleArray(obj[k]);\n      r = r + sep + `${k}=` + o;\n    } else {\n      let type = typeof obj[k];\n\n      if (type === 'object') {\n        let o = handleObject(obj[k]);\n        r = r + sep + o;\n      } else {\n        r = r + sep + (type === 'string' ? ` \"${obj[k]}\" ` : `${obj[k]}  `);\n      }\n\n      sep = ',';\n    }\n  }\n\n  r = r + '}';\n  return r;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (jsonToDict);\n\n//# sourceURL=webpack://restafCommons/./jsonToDict.js?");

/***/ }),

/***/ "./logLines.js":
/*!*********************!*\
  !*** ./logLines.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\n * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\n * SPDX-License-Identifier: Apache-2.0\n*/\n //\n// Notes: Convert Loglines to html\n//\n\n/**\n * Return log lines as html(async)\n * @module logLines\n * @param {object} folder - raf Object for log lines\n * \n * @returns {string} log lines as HTML\n * \n */\n\nfunction logLines(folder) {\n  let dataL = folder.items();\n  let outAll = '';\n  dataL.map(data => {\n    let out;\n    let line = data.get('line').replace(/(\\r\\n|\\n|\\r)/gm, \"\");\n\n    if (line.length === 0) {\n      line = '  ';\n    }\n\n    let type = data.get('type');\n\n    if (type === 'title') {\n      out = `<h2 className=\"${type}\"> ${line} </h2>`;\n    } else {\n      out = `<p class=\"${type}\"> ${line} </p>`;\n    }\n\n    outAll = outAll + out;\n  });\n  return outAll;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (logLines);\n\n//# sourceURL=webpack://restafCommons/./logLines.js?");

/***/ }),

/***/ "./runCompute.js":
/*!***********************!*\
  !*** ./runCompute.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\n * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\n * SPDX-License-Identifier: Apache-2.0\n*/\n //\n// Notes: Run compute service \n//\n\n/**\n * Reduce compute service to an consummable form(async)\n * @module runCompute\n * \n * @param {object} sore - restaf store\n * @param {code} code - SAS code to be executed\n * \n * @returns {object} rafobject of the results from a sas compute job\n * \n */\n\nlet computeSummary = __webpack_require__(/*! ./computeSummary */ \"./computeSummary.js\");\n\nasync function runCompute(store, session, code) {\n  let payload = {\n    data: {\n      code: code\n    }\n  }; // Now execute the data step and wait for completion\n\n  let job = await store.apiCall(session.links('execute'), payload);\n  let status = await store.jobState(job, null, 5, 2);\n\n  if (status.data === 'running') {\n    throw `ERROR: Job did not complete in allotted time`;\n  } else {\n    let results = await computeSummary(store, status.job);\n    return results;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (runCompute);\n\n//# sourceURL=webpack://restafCommons/./runCompute.js?");

/***/ }),

/***/ "./spBase.js":
/*!*******************!*\
  !*** ./spBase.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\n * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\n * SPDX-License-Identifier: Apache-2.0\n*/\n\n/**\n * Prepare data for runCompute(@async)\n * @module spBase\n * \n * @param {object} store - restaf store\n * @param {object} args - args from graphql server(enhanced)\n * @param {string} src  - code to execute\n * \n * @returns {object} computeSummary object\n * \n */\n\nlet runCompute = __webpack_require__(/*! ./runCompute */ \"./runCompute.js\");\n\nasync function spBase(store, args, src) {\n  // generate macro variables\n  let code = [];\n\n  for (let arg in args) {\n    let c = `%let ${arg} = ${args[arg]};`;\n    code.push(c);\n  } // Concat macro to code\n\n\n  let asrc = src.split(/\\r?\\n/);\n  code = code.concat(asrc); // run code and get results\n\n  let resultSummary = await runCompute(store, code);\n  return resultSummary;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (spBase);\n\n//# sourceURL=webpack://restafCommons/./spBase.js?");

/***/ }),

/***/ 0:
/*!*********************!*\
  !*** multi ./index ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! C:\\Public\\gen2\\restaf\\packages\\commons\\src/index */\"./index.js\");\n\n\n//# sourceURL=webpack://restafCommons/multi_./index?");

/***/ })

/******/ });
});