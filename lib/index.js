(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("restafedit", [], factory);
	else if(typeof exports === 'object')
		exports["restafedit"] = factory();
	else
		root["restafedit"] = factory();
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

/***/ "./addRows.js":
/*!********************!*\
  !*** ./addRows.js ***!
  \********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _appendRows__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./appendRows */ \"./appendRows.js\");\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n\n\n/**\r\n * @description Add new rows to current table\r\n * @async\r\n * @module addRows\r\n * @category restafedit/dataMgmt\r\n * @param {rowObjectArray=} data data to add to current table\r\n * @param {appEnv} appEnv - appEnv\r\n * @param (boolean=) save Save the table(defaultis true)\r\n * @returns {promise}  - status object\r\n * @example\r\n * To add new rows to the working table.\r\n *  let data = [{x1:1, x2: 30}, {x1:10, x2:50}];\r\n *  await addRows(data, appEnv);\r\n *  The columns must match the columns in the working table.\r\n *\r\n */\nasync function addRows(data, appEnv, save) {\n  const table = appEnv.table; /* write to current table */\n  ;\n  const drop = [];\n  for (const c in appEnv.state.columns) {\n    if (appEnv.state.columns[c].custom === true || appEnv.state.columns[c].internal != null) {\n      drop.push(c);\n    }\n  }\n  let d = Array.isArray(data) === true ? data : [data];\n  const status = await Object(_appendRows__WEBPACK_IMPORTED_MODULE_0__[/* default */ \"a\"])(d, table, drop, appEnv, save);\n  return status;\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (addRows);\n\n//# sourceURL=webpack://restafedit/./addRows.js?");

/***/ }),

/***/ "./appendRows.js":
/*!***********************!*\
  !*** ./appendRows.js ***!
  \***********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _uploadData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uploadData.js */ \"./uploadData.js\");\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n\n\n\n/**\r\n * @description Append client data to a master table other than working table\r\n * @async\r\n * @module appendRows\r\n * @category restafedit/dataMgmt\r\n * @param {rowObjectArray} data \r\n * @param {table} table master table\r\n * @param {array} columns array of column names to drop\r\n * @param {appEnv} appEnv - appEnv\r\n * @param {boolean=} save save the table after append (default=true)\r\n * @returns {promise}  - status object\r\n * @example\r\n * To append all the rows on the client:\r\n * If data is null, the data in appEnv.state will be appended\r\n *  await appendRows(mydata, {caslib: 'public, name: 'masterAccts'}, ['total', 'price'], appEnv)\r\n *  Notes:\r\n *    - Use addRows to add new rows to the working table\r\n *    - use appendTable to append working table to a master table\r\n */\nasync function appendRows(data, table, drop, appEnv, save) {\n  const handler = appEnv.source === 'cas' ? _casSQL : _computeSQL;\n  const status = await handler(table, drop, appEnv, data, save);\n  return status;\n}\nasync function _casSQL(table, drop, appEnv, addData, saveFlag) {\n  const tempTable = {\n    caslib: table.caslib,\n    name: 'restafedittemp'\n  };\n  const data = addData != null ? addData : appEnv.state.data;\n  const r = await Object(_uploadData_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"])(tempTable, data, drop, {}, appEnv, table, saveFlag);\n  return r;\n}\nasync function _computeSQL(table, drop, appEnv, addData) {\n  const {\n    store,\n    session\n  } = appEnv;\n  const {\n    columns\n  } = appEnv.state;\n  const data = addData != null ? addData : appEnv.state.data;\n  const rowCount = data.length;\n  if (rowCount === 0) {\n    return {\n      msg: 'No data to append',\n      statusCode: 1\n    };\n  }\n  const dropList = ['_index_', '_rowIndex', '_modified'].concat(drop);\n  const validCols = [];\n  ;\n  for (const c in columns) {\n    if (dropList.indexOf(c) === -1) {\n      validCols.push(c);\n    }\n  }\n  let set = ' ';\n  const ncols = validCols.length - 1;\n  data.forEach(row => {\n    let s = 'set ';\n    let i = 0;\n    validCols.forEach(c => {\n      const d = row[c];\n      s = s + c + '=' + value2String(d);\n      if (i < ncols) {\n        s = s + ', ';\n      }\n      i++;\n    });\n    set = set + s + '\\n';\n  });\n  const src = `\n    proc sql;\n    insert into ${table.libref}.${table.name}\n    ${set};\n    run;\n    proc print data=${table.libref}.${table.name};\n    run;\n  `;\n  const r = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"computeRun\"])(store, session, src);\n  const st = r.SASJobStatus;\n  // console.log('Job  ended with status of ', st);\n  // const logs = await computeResults(store, r, 'log');\n  if (st === 'failed' || st === 'running') {\n    return {\n      msg: `Job  ended with status of ${st}. See console for logs`,\n      statusCode: 2\n    };\n  }\n  return {\n    msg: 'Rows Appended',\n    statusCode: 0\n  };\n}\nfunction value2String(value) {\n  let valueString;\n  if (value == null) {\n    valueString = '.';\n  } else if (typeof value === 'string') {\n    valueString = JSON.stringify(value);\n  } else {\n    valueString = value.toString();\n  }\n  return valueString;\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (appendRows);\n\n//# sourceURL=webpack://restafedit/./appendRows.js?");

/***/ }),

/***/ "./appendTable.js":
/*!************************!*\
  !*** ./appendTable.js ***!
  \************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n\n\n/**\r\n * @description Append active table to the master table\r\n * @async\r\n * @module appendTable\r\n * @category restafedit/dataMgmt\r\n * @param {table} table master table\r\n * @param {appEnv} appEnv - appEnv\r\n * @param {boolean=} save - useful only for cas.ignored for compute\r\n * @returns {promise}  - status object\r\n * @example\r\n *   const status = appendTable({caslib: 'public', 'name:'master'}, appEnv);\r\n *   Append working table to the specified master table.\r\n *\r\n */\nasync function appendTable(table, appEnv, save) {\n  const handler = appEnv.source === 'cas' ? _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"casAppendTable\"] : _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"computeAppendTable\"];\n  const saveFlag = save != null ? true : save;\n  const result = await handler(appEnv.store, appEnv.session, appEnv.table, table, saveFlag);\n  return result;\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (appendTable);\n\n//# sourceURL=webpack://restafedit/./appendTable.js?");

/***/ }),

/***/ "./builtins/casScoring.js":
/*!********************************!*\
  !*** ./builtins/casScoring.js ***!
  \********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\nasync function casScoring(model, modelName, scenario) {\n  let viyaSession = await appEnv.getViyaSession('cas');\n  if (viyaSession == null) {\n    return {\n      status: {\n        statusCode: 2,\n        msg: 'Missing logon information'\n      },\n      results: {}\n    };\n  }\n  let {\n    store,\n    session\n  } = viyaSession;\n  try {\n    let args = {\n      model: model,\n      modelName: modelName,\n      scenario: scenario\n    };\n    let output = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"caslScore\"])(store, session, args);\n    let status = {\n      statusCode: 0,\n      msg: null\n    };\n    let results = output.casResults;\n    return {\n      status,\n      results,\n      output: output\n    };\n  } catch (err) {\n    console.log(err);\n    return {\n      status: {\n        statusCode: 2,\n        msg: 'See console for error messages'\n      },\n      results: {},\n      output: null\n    };\n  }\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (casScoring);\n\n//# sourceURL=webpack://restafedit/./builtins/casScoring.js?");

/***/ }),

/***/ "./builtins/index.js":
/*!***************************!*\
  !*** ./builtins/index.js ***!
  \***************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _masScoring_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./masScoring.js */ \"./builtins/masScoring.js\");\n/* harmony import */ var _submitAction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./submitAction.js */ \"./builtins/submitAction.js\");\n/* harmony import */ var _submit_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./submit.js */ \"./builtins/submit.js\");\n/* harmony import */ var _submitCasl_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./submitCasl.js */ \"./builtins/submitCasl.js\");\n/* harmony import */ var _request_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./request.js */ \"./builtins/request.js\");\n/* harmony import */ var _loadCasTable_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./loadCasTable.js */ \"./builtins/loadCasTable.js\");\n/* harmony import */ var _casScoring_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./casScoring.js */ \"./builtins/casScoring.js\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n\n\n\n\n\n// eslint-disable-next-line import/no-anonymous-default-export\n/* harmony default export */ __webpack_exports__[\"a\"] = ({\n  masScoring: _masScoring_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ \"a\"],\n  submitAction: _submitAction_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"],\n  submit: _submit_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ \"a\"],\n  submitCasl: _submitCasl_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ \"a\"],\n  request: _request_js__WEBPACK_IMPORTED_MODULE_4__[/* default */ \"a\"],\n  loadCasTable: _loadCasTable_js__WEBPACK_IMPORTED_MODULE_5__[/* default */ \"a\"],\n  casScoring: _casScoring_js__WEBPACK_IMPORTED_MODULE_6__[/* default */ \"a\"],\n  restaflib: _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_7__\n});\n\n//# sourceURL=webpack://restafedit/./builtins/index.js?");

/***/ }),

/***/ "./builtins/loadCasTable.js":
/*!**********************************!*\
  !*** ./builtins/loadCasTable.js ***!
  \**********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\nasync function loadCasTable(appEnv, lib, name) {\n  let viyaSession = await appEnv.getViyaSession('cas');\n  if (viyaSession == null) {\n    return {\n      status: {\n        statusCode: 2,\n        msg: 'Missing logon information'\n      },\n      results: {}\n    };\n  }\n  let {\n    store,\n    session\n  } = viyaSession;\n  try {\n    //src = src;\n\n    let src = `\n  rc = checkAndLoadTable(_args_.caslib, _args_.name);\n  send_response({rc=rc});\n  `;\n    let args = {\n      caslib: lib,\n      name: name\n    };\n    let r = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"caslRun\"])(store, session, src, args, true);\n    let status = {\n      statusCode: 0,\n      msg: null\n    };\n    let results = r.results;\n    return {\n      status,\n      results,\n      output: r\n    };\n  } catch (err) {\n    console.log(err);\n    return {\n      status: {\n        statusCode: 2,\n        msg: 'See console for error messages'\n      },\n      results: {\n        rc: false\n      },\n      output: err\n    };\n  }\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (loadCasTable);\n\n//# sourceURL=webpack://restafedit/./builtins/loadCasTable.js?");

/***/ }),

/***/ "./builtins/masScoring.js":
/*!********************************!*\
  !*** ./builtins/masScoring.js ***!
  \********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n/**\r\n * @description Score a MAS model\r\n * @async\r\n * @private\r\n * @module masScoring\r\n * @category builtins\r\n * @param {string} modelName - published name\r\n * @param {object} data - data to be scored\r\n * @param {boolean} uflag - if true, remove the last character(_) from the variable name\r\n * @param {*} appEnv - appEnv\r\n * @returns {object} - {status: {statusCode: 0, msg: null}, results: masRun results}\r\n * @example\r\n * let result = await appEnv.builtins.masScoring('mycoolmodel', {x1: 1, x2: 2}, appEnv);\r\n * \r\n */\nasync function masScoring(appEnv, modelName, data, uflag) {\n  //setup once per sessison\n  // const  { masSetup, masDescribe, masRun } = appEnv.builtins.restaflib;\n  let inputs = {};\n  let masControl;\n  try {\n    masControl = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"masSetup\"])(appEnv.store, [modelName]);\n    let describe = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"masDescribe\"])(masControl, modelName);\n    inputs = {};\n    describe.forEach(d => {\n      inputs[d.name] = null;\n    });\n    // took out the optimiztion - it seems to be causing issues\n    // appEnv.appSession.masScoring = { masControl: masControl, inputs: inputs };\n    let scenario = {};\n    for (let v in inputs) {\n      let v1 = uflag === true ? v.substring(0, v.length - 1) : v;\n      //v1 = v.startsWith('_') ? v.substring(0, v.length - 1) : v;\n      scenario[v] = data[v1] == null ? null : data[v1];\n    }\n    let result = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"masRun\"])(appEnv.store, masControl, modelName, scenario);\n    return {\n      status: {\n        statusCode: 0,\n        msg: null\n      },\n      results: result\n    };\n  } catch (err) {\n    console.log(err);\n    return {\n      status: {\n        statusCode: 2,\n        msg: err\n      },\n      results: {}\n    };\n  }\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (masScoring);\n\n//# sourceURL=webpack://restafedit/./builtins/masScoring.js?");

/***/ }),

/***/ "./builtins/request.js":
/*!*****************************!*\
  !*** ./builtins/request.js ***!
  \*****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\nasync function request(appEnv, config) {\n  let r = await appEnv.store.request(config);\n  return r;\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (request);\n\n//# sourceURL=webpack://restafedit/./builtins/request.js?");

/***/ }),

/***/ "./builtins/submit.js":
/*!****************************!*\
  !*** ./builtins/submit.js ***!
  \****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n/**\r\n * @description Run code in compute server\r\n * @private\r\n * @param {string} src \r\n * @param {object} macros - will be prepended to src\r\n * @param {object} output  - {log: false, ods: true, tables: ['table1', 'table2]\r\n * @param {*} appEnv \r\n * @returns {promise} - {status: {statusCode: 0, msg: null}, results: results}\r\n * @example\r\n *   The output results will be in the results object as follows(based on the output parameter)\r\n *  {\r\n *   log: 'log output',\r\n *   ods: 'ods output',\r\n *   tableList: [array of table names from the run],\r\n *   tables: {\r\n *    table1: [array of rows],\r\n *    table2: [array of rows]\r\n *   }\r\n *  }\r\n *  let src = `ods html open;proc print data=&table; run;ods html close;`;\r\n *  let macros = {table: 'sashelp.class'};\r\n *  let outputResults = await appEnv.builtins.submit(src, macros, {ods: true}, appEnv);\r\n *  data.ods = outputResults.results.ods;\r\n *  return [data, outputResults.status];\r\n * \r\n */\nasync function submit(appEnv, src, macros, output) {\n  let viyaSession = await appEnv.getViyaSession('compute');\n  if (viyaSession == null) {\n    return {\n      status: {\n        statusCode: 2,\n        msg: 'Missing logon information'\n      },\n      results: {}\n    };\n  }\n  let {\n    store,\n    session\n  } = viyaSession;\n  try {\n    let computeSummary = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"computeRun\"])(store, session, src, macros);\n    let jobStatus = computeSummary.SASJobStatus;\n    let result = {};\n    if (jobStatus === 'failed' || jobStatus === 'error' || jobStatus === 'running') {\n      let msg = `Job  ended with status of ${jobStatus}. Please check the log for errors.`;\n      result.log = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"computeResults\"])(appEnv.store, computeSummary, 'log');\n      return {\n        status: {\n          statusCode: 2,\n          msg: msg\n        },\n        results: result\n      };\n    }\n    if (output.log === true) {\n      let log = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"computeResults\"])(appEnv.store, computeSummary, 'log');\n      let logText = '';\n      // eslint-disable-next-line array-callback-return\n      log.map(data => {\n        let line = data.line.replace(/(\\r\\n|\\n|\\r)/gm, \"\");\n        if (line.length === 0) {\n          logText = logText + '\\n';\n        } else {}\n        logText = logText + line + '\\n';\n      });\n      result.log = logText;\n    }\n    if (output.ods === true) {\n      result.ods = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"computeResults\"])(appEnv.store, computeSummary, 'ods');\n      let odsUrl = computeSummary.ods.get('link').get('uri');\n      let connection = appEnv.store.connection();\n      let host = connection.options.proxyServer == null ? appEnv.logonPayload.host : connection.options.proxyServer;\n      result.odsurl = `${host}${odsUrl}`;\n    }\n    result.tables = {};\n    result.tableList = [];\n    let tableList = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"computeResults\"])(appEnv.store, computeSummary, 'tables');\n    result.tableList = tableList;\n    if (output.tables != null) {\n      for (let i in output.tables) {\n        let t = output.tables[i];\n        let tname = t.table.toUppercase();\n        if (tableList.includes(tname) === true) {\n          let r = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"computeFetchData\"])(appEnv.store, computeSummary, tname, 'first', t.payload, 'rows');\n          result[tname] = r.data;\n        }\n      }\n    }\n    // result.computeSummary = computeSummary;\n    return {\n      status: {\n        statusCode: 0,\n        msg: \"completed\"\n      },\n      results: result\n    };\n  } catch (err) {\n    console.log(err);\n    return {\n      status: {\n        statusCode: 2,\n        msg: err\n      },\n      results: {}\n    };\n  }\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (submit);\n\n//# sourceURL=webpack://restafedit/./builtins/submit.js?");

/***/ }),

/***/ "./builtins/submitAction.js":
/*!**********************************!*\
  !*** ./builtins/submitAction.js ***!
  \**********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\nasync function submitAction(appEnv, action, args) {\n  let viyaSession = await appEnv.getViyaSession(\"cas\");\n  if (viyaSession == null) {\n    return {\n      status: {\n        statusCode: 2,\n        msg: \"Missing logon information\"\n      },\n      results: {}\n    };\n  }\n  let {\n    store,\n    session\n  } = viyaSession;\n  let p = {\n    action: action,\n    data: args\n  };\n  try {\n    let r = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"casActionRun\"])(store, session, p);\n    return {\n      status: {\n        statusCode: 0,\n        msg: null\n      },\n      results: r\n    };\n  } catch (err) {\n    return {\n      status: {\n        statusCode: 2,\n        msg: err\n      },\n      results: {}\n    };\n  }\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (submitAction);\n\n//# sourceURL=webpack://restafedit/./builtins/submitAction.js?");

/***/ }),

/***/ "./builtins/submitCasl.js":
/*!********************************!*\
  !*** ./builtins/submitCasl.js ***!
  \********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\nasync function submitCasl(appEnv, src, args, useCommons) {\n  let viyaSession = await appEnv.getViyaSession('cas');\n  if (viyaSession == null) {\n    return {\n      status: {\n        statusCode: 2,\n        msg: 'Missing logon information'\n      },\n      results: {}\n    };\n  }\n  const {\n    store,\n    session\n  } = viyaSession;\n  try {\n    try {\n      let r = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"caslRun\"])(store, session, src, args == null ? {} : args, useCommons === true ? true : false);\n      let status = {\n        statusCode: 0,\n        msg: null\n      };\n      return {\n        status,\n        results: r\n      };\n    } catch (err) {\n      console.log(err);\n      return {\n        status: {\n          statusCode: 2,\n          msg: 'See console for error messages'\n        },\n        results: {},\n        err: err\n      };\n    }\n  } catch (err) {\n    console.log(err);\n    return {\n      status: {\n        statusCode: 2,\n        msg: 'See console for error messages'\n      },\n      results: {},\n      err: err\n    };\n  }\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (submitCasl);\n\n//# sourceURL=webpack://restafedit/./builtins/submitCasl.js?");

/***/ }),

/***/ "./casTableList.js":
/*!*************************!*\
  !*** ./casTableList.js ***!
  \*************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n/**\r\n * @description get the list of tables in a caslib\r\n * @async\r\n * @module casTableList\r\n * @private\r\n * @category restafedit/utility\r\n * @param {string} lib   - caslib of interest\r\n * @param {appEnv} appEnv   - app Environment from setup\r\n * @returns {promise}       - returns an array of table names\r\n * @example\r\n *   list = await casTableList('sashelp', appEnv);\r\n *   This method is primarily useful for UI's that want to display a table selector\r\n */\n\nasync function casTableList(lib, appEnv, payload) {\n  const {\n    store\n  } = appEnv;\n\n  // get links for the current caslib\n  let p = {\n    qs: {\n      filter: `eq(name,'${lib}')`\n    }\n  };\n  const mylib = await store.apiCall(appEnv.servers.itemsCmd(appEnv.casServerName, 'caslibs'), p);\n\n  // if caslib was not found\n  if (mylib.itemsList().size === 0) {\n    console.log('caslib not found');\n    return [];\n  }\n  p = payload;\n  if (p == null) {\n    p = {\n      qs: {\n        limit: 1000,\n        start: 0\n      }\n    };\n  }\n  const tlist = await store.apiCall(mylib.itemsCmd(lib, 'tables'), p);\n  return tlist.itemsList().toJS();\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (casTableList);\n\n//# sourceURL=webpack://restafedit/./casTableList.js?");

/***/ }),

/***/ "./casTableUnique.js":
/*!***************************!*\
  !*** ./casTableUnique.js ***!
  \***************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n\n/**\r\n * @description Get unique values for a specific column\r\n * @async\r\n * @private\r\n * @module casTableUnique\r\n * @category restafedit/utility\r\n * @param {object} table object\r\n * @param {string} columnName    column name\r\n * @param {string} where         where clause\r\n * @param {appEnv} appEnv   app Environment from setup\r\n * @returns {promise}       {an array of unique values }\r\n * @example\r\n *  let selectList = await casTableUnique('company, appEnv))\r\n *  This is useful to get a list of unique values for selected columns.\r\n *  {columnName:[ array of unque values] }\r\n */\n\nasync function casTableUnique(table, columnName, where, appEnv) {\n  const {\n    store,\n    session\n  } = appEnv;\n  if (where == null) {\n    where = '';\n  }\n  ;\n  const src = `\n  results = selectionLists(_args_.column,_args_.table.caslib, _args_.table.name, _args_.where);\n  send_response({casResults = {data=results}});\n  `;\n  const args = {\n    table,\n    column: columnName,\n    where: where\n  };\n  const result = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"caslRun\"])(store, session, src, args, true);\n  if (result.results.casResults.data.statusCode !== 0) {\n    // eslint-disable-next-line no-throw-literal\n    throw 'Failed to create unique list';\n  }\n  const data = result.results.casResults.data;\n  return data;\n}\n;\n/* harmony default export */ __webpack_exports__[\"a\"] = (casTableUnique);\n\n//# sourceURL=webpack://restafedit/./casTableUnique.js?");

/***/ }),

/***/ "./cellEdit.js":
/*!*********************!*\
  !*** ./cellEdit.js ***!
  \*********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _text2Float__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text2Float */ \"./text2Float.js\");\n/* harmony import */ var _commonHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commonHandler */ \"./commonHandler.js\");\n/* harmony import */ var _updateTableRows__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updateTableRows */ \"./updateTableRows.js\");\n/* harmony import */ var _onEditHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./onEditHandler */ \"./onEditHandler.js\");\n/* harmony import */ var _saveTable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./saveTable */ \"./saveTable.js\");\n/* harmony import */ var _validateValueType__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./validateValueType */ \"./validateValueType.js\");\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n\n\n\n\n\n\n\n/**\r\n * @description Process edit of a cell and optionally save the data\r\n * @async\r\n * @module cellEdit\r\n * @category restafedit/core\r\n * @param {string} name     - name of the field (lower case)\r\n * @param {*} value         - the new value for name field\r\n * @param {number} rowIndex - row Index ( index in the data array on client)\r\n * @param {rowObject} currentData  - RowObject for the entire row prior to change\r\n * @param {appEnv} appEnv   - app Environment from setup\r\n * @returns {promise}       - {data: updated data, status: status }\r\n * @example\r\n * data schema {column1: value, column2, value,...}\r\n * status schema {statusCode: 0|1|2, msg: some string}\r\n * The currentData object is also updated with the latest values.\r\n *\r\n * const r = await cellEdit'x1',100, 1, d, appEnv)\r\n    - If the column has an handler it will be called.\r\n    - If 'main\" handler is specified, it will be called.\r\n    - If autoSave is true\r\n      - The 'term' handler(if specified) will be called\r\n      - The data for that row will be persisted to the server\r\n */\n\nasync function cellEdit(name, value, rowIndex, _icurrentData, appEnv) {\n  /* do not modify the data directly. caller will probably do a setState */\n  ;\n  // make a copy for modification - allows for recovery if there is an error\n  let currentData = appEnv.state.data[rowIndex];\n  // all modifications in newDataRow\n  let newDataRow = Object.assign({}, currentData);\n  const columns = appEnv.state.columns;\n  const {\n    handlers,\n    autoSave\n  } = appEnv.appControl.editControl;\n  const iautoSave = autoSave == null ? true : autoSave;\n  const cachePolicy = appEnv.appControl.cachePolicy == null ? true : appEnv.appControl.cachePolicy;\n  appEnv.handlers = handlers;\n  let status = {\n    statusCode: 0,\n    msg: \"\"\n  };\n\n  // handle init and term for all types of forms\n  // user will edit newData in place.\n  let reservedLabels = [\"init\", \"term\", \"initApp\", \"termApp\", \"main\", \"_appProps\", \"_appSubmit\"];\n  if (reservedLabels.includes(name) === true) {\n    let r = await Object(_commonHandler__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"])(name, newDataRow, currentData, rowIndex, appEnv, status);\n    if (r[1].statusCode === 2) {\n      // keep state data as is and return message.\n      console.log(`Error in ${name}  handler`, r[1].msg);\n      return {\n        data: currentData,\n        status: r[1]\n      };\n    } else {\n      // update state data with new data\n      appEnv.state.data[rowIndex] = r[0];\n      if (cachePolicy !== false) {\n        appEnv.state.data[rowIndex] = r[0];\n      }\n      return {\n        data: r[0],\n        status: r[1]\n      };\n    }\n  }\n\n  // The rest of the processing for specific cell edits\n\n  // now make sure the specified name is a valid column name\n  if (columns[name] == null) {\n    return {\n      data: currentData,\n      status: {\n        statusCode: 2,\n        msg: `Column ${name} not found`\n      }\n    };\n  }\n\n  // make sure that the incoming value type matches the column type\n  if (appEnv.tableFormat !== true) {\n    // No checking if the data is from a formatted table\n    if (Object(_validateValueType__WEBPACK_IMPORTED_MODULE_5__[/* default */ \"a\"])(value, columns[name].Type) === false) {\n      console.log(`Type of value does not match ${name} type. Type of ${name} is ${columns[name].Type}`);\n      return {\n        data: currentData,\n        status: {\n          statusCode: 2,\n          msg: `Type of value does not match ${name} type`\n        }\n      };\n    }\n  }\n\n  // update the working copy with the new value\n  // Yes I know text2Float is not the best name for this function - may change it before production push\n  newDataRow[name] = Object(_text2Float__WEBPACK_IMPORTED_MODULE_0__[/* default */ \"a\"])(value, columns[name]);\n\n  // if the is onEdit(onChange) handler specified call it.\n  if (handlers[name] != null) {\n    let r = await Object(_onEditHandler__WEBPACK_IMPORTED_MODULE_3__[/* default */ \"a\"])(name, newDataRow, currentData, rowIndex, appEnv, status);\n    if (r[1].statusCode === 2) {\n      console.log(`Error in onEdit handler for ${name}`, status.msg);\n      console.log(`Bypassing main handler`);\n      return {\n        data: currentData,\n        status: r[1]\n      };\n    }\n    // update newDataRow with the result of the onEdit handler;\n    newDataRow = r[0];\n    status = r[1];\n  }\n  // now drive main handler\n  let r = await Object(_commonHandler__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"])(\"main\", newDataRow, currentData, rowIndex, appEnv, status);\n  if (r[1].statusCode === 2) {\n    // fall all the way back to the original data prior to onEdit handler\n    console.log(`Error in main handler for ${name}`, r[1].msg);\n    return {\n      data: currentData,\n      status: r[1]\n    };\n  }\n\n  // Now we have successfully edited the data, let's see if we need to save it\n  // only in the case of tables and autoSave is true\n\n  r[0]._modified = 1;\n  newDataRow = r[0];\n  status = r[1];\n  if (cachePolicy !== false) {\n    appEnv.state.data[currentData._rowIndex] = newDataRow;\n  }\n  // update state data with new data\n  appEnv.state.data[rowIndex] = newDataRow;\n  // if editing table, see if we need to save the table\n  if (iautoSave === true && appEnv.table != null) {\n    r = await Object(_commonHandler__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"])(\"term\", r[0], newDataRow, rowIndex, appEnv, status);\n    status = r[1];\n    if (status.statusCode === 2) {\n      console.log(`Error in term prior to saving data for ${name} row ${rowIndex}`, status.msg);\n      return {\n        data: newDataRow,\n        status: r[1]\n      };\n    }\n    appEnv.state.data[rowIndex] = r[0];\n\n    // Now update the table rows\n    await Object(_updateTableRows__WEBPACK_IMPORTED_MODULE_2__[/* default */ \"a\"])(r[0], appEnv);\n    // need better error handling in saveTable\n    if (appEnv.appControl.editControl.autoSaveTable === true) {\n      await Object(_saveTable__WEBPACK_IMPORTED_MODULE_4__[/* default */ \"a\"])(appEnv);\n    }\n  }\n  return {\n    data: newDataRow,\n    status\n  };\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (cellEdit);\n\n//# sourceURL=webpack://restafedit/./cellEdit.js?");

/***/ }),

/***/ "./commonHandler.js":
/*!**************************!*\
  !*** ./commonHandler.js ***!
  \**************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _isStdObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isStdObject.js */ \"./isStdObject.js\");\n/*\r\n * Copyright © 2022, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n\n/**\r\n * @description Run init, main or term handlers\r\n * @async\r\n * @private\r\n * @module commonHandler\r\n * @category restafedit/core\r\n * @param {string} type   - type of exit (init|main|term)\r\n * @param {rowObject} data        - rowObject\r\n * @param {number} rowIndex    - client-side Row Index\r\n * @param {appEnv} appEnv      - app Environment from setup\r\n * @returns {promise}     - [data, status]\r\n * @example\r\n * The function returns the updated data and the status.\r\n * This function is called by cellEdit, so there is probably little reason\r\n * to call this directly\r\n * Please see the restafeditExample in the Tutorial pulldown\r\n */\nasync function commonHandler(type, temp, currentData, rowIndex, appEnv, status) {\n  const {\n    handlers\n  } = appEnv.appControl.editControl;\n  let r = null;\n  let userFuncf = handlers[type];\n  if (userFuncf != null) {\n    try {\n      if (appEnv.apiVersion === 2) {\n        r = appEnv.table == null ? await userFuncf(temp, appEnv.appContext) : await userFuncf(temp, rowIndex, appEnv.appContext);\n      } else {\n        // for backward compatibility\n        r = await userFuncf(temp, rowIndex, appEnv.appContext);\n      }\n    } catch (err) {\n      console.log('Error in handler', type, err);\n      status = {\n        statusCode: 2,\n        msg: `Error in handler ${type}. See console`\n      };\n      return [currentData, status];\n    }\n  }\n  ;\n  /*\r\n  user MUST modify temp to reflect the changes and not a copy of temp\r\n  Now make sure the returned is compliant with the defined schema\r\n  \r\n  */\n  // temp is now modified by user code\n  // currentData is the original dat\n  let result = Object(_isStdObject_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ \"a\"])(r, temp, currentData, status, type, appEnv);\n  return result;\n}\n;\n/* harmony default export */ __webpack_exports__[\"a\"] = (commonHandler);\n\n//# sourceURL=webpack://restafedit/./commonHandler.js?");

/***/ }),

/***/ "./computeTableList.js":
/*!*****************************!*\
  !*** ./computeTableList.js ***!
  \*****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n/**\r\n * @description get the list of tables in a caslib\r\n * @async\r\n * @module computeTableList\r\n * @private\r\n * @category restafedit/utility\r\n * @param {string} lib   - libref of interest\r\n * @param {appEnv} appEnv   - app Environment from setup\r\n * @returns {promise}       - returns an array of table names\r\n * @example\r\n *  let status = await distinctValues('company', appEnv))\r\n *  This is useful to get a list of unique values for selected columns.\r\n *  {company:['IBM', 'Microsoft', 'SAS'] }\r\n */\n\nasync function computeTableList(lib, appEnv, payload) {\n  const {\n    store,\n    session\n  } = appEnv;\n  lib = lib.toUpperCase();\n  let p = {\n    qs: {\n      filter: `eq(name,'${lib}')`\n    }\n  };\n  const mylib = await store.apiCall(session.links('librefs'), p);\n  if (mylib.itemsList().size === 0) {\n    console.log('libref not found');\n    return [];\n  }\n  const selflib = await store.apiCall(mylib.itemsCmd(lib, 'self'));\n  p = payload;\n  if (p == null) {\n    p = {\n      qs: {\n        limit: 1000,\n        start: 0\n      }\n    };\n  }\n  const tables = await store.apiCall(selflib.links('tables'), p);\n  return tables.itemsList().toJS();\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (computeTableList);\n\n//# sourceURL=webpack://restafedit/./computeTableList.js?");

/***/ }),

/***/ "./computeTableUnique.js":
/*!*******************************!*\
  !*** ./computeTableUnique.js ***!
  \*******************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n\n/**\r\n * @description Get unique values for a specific column(sas table)\r\n * @async\r\n * @private\r\n * @module computeTableUnique\r\n * @category restafedit/utility\r\n * @param {string} columnName    column name\r\n * @param {appEnv} appEnv   app Environment from setup\r\n * @returns {promise}       {an array of unique values }\r\n * @example\r\n *  let selectList = await computeTableUnique('company, appEnv))\r\n *  This is useful to get a list of unique values for selected columns.\r\n *  {columnName:[ array of unquew values] }\r\n */\n\nasync function computeTableUnique(table, columnName, where, appEnv) {\n  const {\n    store,\n    session\n  } = appEnv;\n  const t = `${table.libref}.${table.name}`.toUpperCase();\n  let code = `\n    PROC SQL;\n    CREATE TABLE WORK.QUERY\n    AS\n    SELECT distinct(${columnName}) as utype FROM ${t}`;\n  if (where != null && where.length > 0) {\n    code = code + ` WHERE ${where}`;\n  }\n  code = code + '; QUIT;';\n  const computeSummary = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"computeRun\"])(store, session, code);\n  const values = {};\n  let dir = 'first';\n  const res = [];\n  let data;\n  do {\n    data = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"computeFetchData\"])(store, computeSummary, 'QUERY', dir);\n    const r = data.rows.map(r1 => r1[0]);\n    res.push(...r);\n    dir = 'next';\n  } while (data.scrollOptions.indexOf('next') >= 0);\n  values[columnName] = res;\n  return values;\n}\n;\n/* harmony default export */ __webpack_exports__[\"a\"] = (computeTableUnique);\n\n//# sourceURL=webpack://restafedit/./computeTableUnique.js?");

/***/ }),

/***/ "./deleteViyaSession.js":
/*!******************************!*\
  !*** ./deleteViyaSession.js ***!
  \******************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n/**\r\n * @description - Delete an existing Viya Session(cas or compute)\r\n * @async\r\n * @function deleteViyaSession\r\n * @param {appControl} appControl - appControl object\r\n * @param {string} source  - cas|compute\r\n * @returns {promise} - appEnv - return true\r\n * @example - Used for cleanup of app session\r\n */\n\nasync function deleteViyaSession(appEnv, source) {\n  // let {casSetup, computeSetup} = restaflib;\n  let {\n    appConfig,\n    store\n  } = appEnv;\n  // if it is already created, return it\n  if (appConfig.logonPayload == null || source == null || source.trim().length === 0) {\n    return null;\n  }\n  source = source.toLowerCase();\n  if (appEnv.currentSessions[source].session != null) {\n    let session = appEnv.currentSessions[source].session;\n    await store.apiCall(session.links('delete'));\n    let lapp = appEnv.currentSessions[source];\n    lapp.session = null;\n    lapp.servers = null;\n    lapp.serverName = null;\n    lapp.casServerName = null;\n    lapp.sessionID = null;\n  }\n  return true;\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (deleteViyaSession);\n\n//# sourceURL=webpack://restafedit/./deleteViyaSession.js?");

/***/ }),

/***/ "./distinctValues.js":
/*!***************************!*\
  !*** ./distinctValues.js ***!
  \***************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _casTableUnique__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./casTableUnique */ \"./casTableUnique.js\");\n/* harmony import */ var _computeTableUnique__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./computeTableUnique */ \"./computeTableUnique.js\");\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n\n\n\n/**\r\n * @description Get unique values for a specific column\r\n * @async\r\n * @module distinctValues\r\n * @category restafedit/utility\r\n * @param {string} columnName    column name\r\n * @param {appEnv} appEnv   - app Environment from setup\r\n * @param {casTable|computeTable=} table Optionally point to a different table\r\n * @returns {promise}       - {an array of unique values }\r\n * @example\r\n *  let selectList = await distinctValues('company', appEnv))\r\n *  This is useful to get a list of unique values for selected columns.\r\n *  {company:['IBM', 'Microsoft', 'SAS'] }\r\n */\n\nasync function distinctValues(columnName, appEnv, table, where) {\n  let data;\n  const t = table != null ? table : appEnv.appControl.table;\n  if (where == null) {\n    where = '';\n  }\n  ;\n  if (appEnv.source === 'cas') {\n    data = await Object(_casTableUnique__WEBPACK_IMPORTED_MODULE_0__[/* default */ \"a\"])(t, columnName, where, appEnv);\n  } else {\n    data = await Object(_computeTableUnique__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"])(t, columnName, where, appEnv);\n  }\n  return data;\n}\n;\n/* harmony default export */ __webpack_exports__[\"a\"] = (distinctValues);\n\n//# sourceURL=webpack://restafedit/./distinctValues.js?");

/***/ }),

/***/ "./fetchRows.js":
/*!**********************!*\
  !*** ./fetchRows.js ***!
  \**********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _scrollTable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scrollTable */ \"./scrollTable.js\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_1__);\n/*\r\n\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n\n\n/**\r\n * @description Fetch new records based on control argument\r\n * @async\r\n * @module fetchRows\r\n * @category restafedit/fetch\r\n * @param {fetchControl} control - info for records to retrieve\r\n * @param {appEnv} appEnv - appEnv\r\n * @returns {promise}  - { data:data, columns:ecolumns, pagination: pagination}\r\n * @example\r\n *    r = await fetchRows({qs:{start:0, limit: 200, format: false, where=''}, appEnv})\r\n *    Use this method for custom fetching instead of scrollTable.\r\n *\r\n */\nasync function fetchRows(icontrol, appEnv, table) {\n  let result;\n  if (table) {\n    const {\n      store,\n      session\n    } = appEnv;\n    let control = {\n      ...icontrol\n    };\n    if (appEnv.source === 'cas') {\n      control.table = table;\n      result = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_1__[\"casFetchData\"])(store, session, control);\n    } else {\n      let tableSummary = Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_1__[\"computeSetupTables\"])(store, session, table);\n      let r = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_1__[\"computeFetchData\"])(store, tableSummary, table, null, icontrol);\n      result = r.rows;\n    }\n  } else {\n    result = await Object(_scrollTable__WEBPACK_IMPORTED_MODULE_0__[/* default */ \"a\"])(null, appEnv, icontrol);\n  }\n  return result;\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (fetchRows);\n\n//# sourceURL=webpack://restafedit/./fetchRows.js?");

/***/ }),

/***/ "./getLibraryList.js":
/*!***************************!*\
  !*** ./getLibraryList.js ***!
  \***************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n/**\r\n * @description get the list of tables in a caslib\r\n * @async\r\n * @module getLibraryList\r\n * @category restafedit/utility\r\n * @param {appEnv} appEnv\r\n * @returns {promise}   returns a list of caslib or libref based on source\r\n * @example\r\n *  let list = await getLibraryList(appEnv);\r\n *  If the source is cas, the method returns a list of caslibs\r\n *  If the source is compute, the method returns a list of librefs\r\n */\n\nasync function getLibraryList(appEnv, payload) {\n  const {\n    store,\n    session,\n    servers,\n    source\n  } = appEnv;\n  const getLibrefs = async payload => {\n    const r = await store.apiCall(session.links('librefs'), payload);\n    return r.itemsList().toJS();\n  };\n  const getCaslibs = async payload => {\n    /*\r\n    const p = {\r\n      qs: {\r\n        start: 0,\r\n        limit: 1000\r\n      }\r\n    };\r\n    */\n    const rafLink = servers.itemsCmd(servers.itemsList(0), 'caslibs');\n    const r = await store.apiCall(rafLink, payload);\n    return r.itemsList().toJS();\n  };\n  let p = payload;\n  if (p == null) {\n    p = {\n      qs: {\n        limit: 1000,\n        start: 0\n      }\n    };\n  }\n  const handler = source === 'cas' ? getCaslibs : getLibrefs;\n  const libs = await handler(appEnv, p);\n  return libs;\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (getLibraryList);\n\n//# sourceURL=webpack://restafedit/./getLibraryList.js?");

/***/ }),

/***/ "./getTableColumns.js":
/*!****************************!*\
  !*** ./getTableColumns.js ***!
  \****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _igetTableColumns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./igetTableColumns */ \"./igetTableColumns.js\");\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n/**\r\n * @description get the columns for a table\r\n * @async\r\n * @module getTableColumns\r\n * @category restafedit/utility\r\n * @param {string} source   - cas or compute\r\n * @param {object} table    - table object\r\n * @param {appEnv} appEnv   - app Environment from setup\r\n *\r\n * @returns {promise}       - returns an array of table names(cas or SAS)\r\n * @example\r\n *  let list = await getTableSummary(appEnv);\r\n *  returns summary information object. The function also sets the results in appEnv.state.tableSummary\r\n *  For consistency between cas and compute, rowCount and columnCount are\r\n *  set for both cases.\r\n * { \r\n *  rowCount: number,\r\n *  columnCount: number\r\n *  ...rest...\r\n *  }\r\n */\n\nasync function getTableColumns(source, table, appEnv) {\n  let name = table.name;\n  let libname = source === 'cas' ? table.caslib : table.libref;\n  ;\n  let columns = await Object(_igetTableColumns__WEBPACK_IMPORTED_MODULE_0__[/* default */ \"a\"])(appEnv.store, appEnv.session, source, libname, name);\n  return columns;\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (getTableColumns);\n\n//# sourceURL=webpack://restafedit/./getTableColumns.js?");

/***/ }),

/***/ "./getTableList.js":
/*!*************************!*\
  !*** ./getTableList.js ***!
  \*************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _computeTableList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./computeTableList */ \"./computeTableList.js\");\n/* harmony import */ var _casTableList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./casTableList */ \"./casTableList.js\");\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n\n\n\n/**\r\n * @description get the list of tables in a specific library\r\n * @async\r\n * @module getTableList\r\n * @category restafedit/utility\r\n * @param {string} lib  - caslib or libref (must match source)\r\n * @param {appEnv} appEnv   - app Environment from setup\r\n * @returns {promise}       - returns an array of table names(cas or SAS)\r\n * @example\r\n *  let list = await getTableList('sashelp', appEnv);\r\n *  returns a list of tables - based on the value of source (cas|compute)\r\n */\n\nasync function getTableList(lib, appEnv, payload) {\n  const handler = appEnv.source === 'cas' ? _casTableList__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"] : _computeTableList__WEBPACK_IMPORTED_MODULE_0__[/* default */ \"a\"];\n  const r = await handler(lib, appEnv, payload);\n  return r;\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (getTableList);\n\n//# sourceURL=webpack://restafedit/./getTableList.js?");

/***/ }),

/***/ "./getTableSummary.js":
/*!****************************!*\
  !*** ./getTableSummary.js ***!
  \****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n\n/**\r\n * @description get the list of tables in a specific library\r\n * @async\r\n * @module getTableSummary\r\n * @category restafedit/utility\r\n * @param {appEnv} appEnv   - app Environment from setup\r\n * @returns {promise}       - returns an array of table names(cas or SAS)\r\n * @example\r\n *  let list = await getTableSummary(appEnv);\r\n *  returns summary information object. The function also sets the results in appEnv.state.tableSummary\r\n *  For consistency between cas and compute, rowCount and columnCount are\r\n *  set for both cases.\r\n * { \r\n *  rowCount: number,\r\n *  columnCount: number\r\n *  ...rest...\r\n *  }\r\n */\n\nasync function getTableSummary(appEnv) {\n  const handler = appEnv.source === 'cas' ? casTableSummary : computeTableSummary;\n  const r = await handler(appEnv);\n  appEnv.state.tableSummary = r;\n  return r;\n}\nasync function casTableSummary(appEnv) {\n  const {\n    store,\n    session,\n    table\n  } = appEnv;\n  const src = `\n  rc = checkAndLoadTable(_args_.caslib, _args_.name);\n  if (rc ne true) then do;\n    text = 'Unable to access ' ||_args_.caslib||'.'||_args_.name;   \n    rx = {severity=2,reason=6, status='error',statusCode=2, formatted=text};\n    exit(rx);  \n  end; \n  action table.tableinfo r=result/\n    caslib= _args_.caslib name=_args_.name;\n    run;\n  summary = result.tableInfo[1];\n  summary.rowCount = result.tableInfo[1, 'Rows'];\n  summary.columnCount = result.tableInfo[1, 'Columns'];\n  send_response({casResults=summary});\n`;\n  let r = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"caslRun\"])(store, session, src, table, true);\n  return r.results.casResults;\n}\nasync function computeTableSummary(appEnv) {\n  const {\n    store,\n    tableSummary,\n    table\n  } = appEnv;\n  const tname = `${table.libref}.${table.name}`.toUpperCase();\n  const tableInfo = tableSummary.tables[tname];\n  const t1 = await store.apiCall(tableInfo.self);\n  return t1.items().toJS();\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (getTableSummary);\n\n//# sourceURL=webpack://restafedit/./getTableSummary.js?");

/***/ }),

/***/ "./getViyaSession.js":
/*!***************************!*\
  !*** ./getViyaSession.js ***!
  \***************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n\n\n/**\r\n * @description - Allow functions to create a Viya session on demand(if not already created)\r\n * @async\r\n * @function getViyaSession\r\n * @param {appControl} appControl - appControl object\r\n * @param {string} source  - cas|compute\r\n * @returns {promise} - appEnv - return appEnv\r\n * @example - Delays session creation until needed\r\n */\n\nasync function getViyaSession(appEnv, source) {\n  // let {casSetup, computeSetup} = restaflib;\n  let {\n    appConfig,\n    store\n  } = appEnv;\n  // if it is already created, return it\n  ;\n  if (appConfig.logonPayload == null) {\n    return null;\n  }\n  let tappEnv = {\n    host: appConfig.logonPayload.host,\n    logonPayload: appConfig.logonPayload,\n    source: source,\n    builtins: appEnv.builtins,\n    store: store,\n    session: null,\n    servers: null,\n    serverName: null,\n    casServerName: null,\n    sessionID: null,\n    restaflib: appEnv.builtins.restaflib,\n    restafedit: appEnv.builtins.restafedit\n  };\n  if (source === null) {\n    return tappEnv;\n  }\n  source = source.toLowerCase();\n  if (source === 'sas') {\n    source = 'compute';\n  }\n  ;\n  if (['cas', 'compute'].includes(source) === false) {\n    return tappEnv;\n  }\n  if (appEnv.currentSessions[source].sessionID != null) {\n    tappEnv = setupAppEnv(appEnv, tappEnv, source);\n    return tappEnv;\n  }\n\n  // source = cas\n  if (source === \"cas\") {\n    let {\n      session,\n      servers\n    } = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"casSetup\"])(store, null);\n    let casServerName = session.links(\"execute\", \"link\", \"server\");\n    appEnv.currentSessions.cas = {\n      session: session,\n      servers: servers,\n      casServerName: casServerName,\n      serverName: casServerName\n    };\n    let ssid = await store.apiCall(session.links(\"self\"));\n    appEnv.currentSessions.cas.sessionID = ssid.items(\"id\");\n    tappEnv = setupAppEnv(appEnv, tappEnv, source);\n    return tappEnv;\n  }\n\n  // source = sas\n  if (source === 'compute') {\n    let session = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"computeSetup\"])(store, null);\n    let sid = await store.apiCall(session.links(\"self\"));\n    appEnv.currentSessions.compute = {\n      session: session,\n      servers: null,\n      serverName: null,\n      sessionID: sid.items(\"id\")\n    };\n    tappEnv = setupAppEnv(appEnv, tappEnv, source);\n    return tappEnv;\n  }\n  function setupAppEnv(appEnv, tappEnv, source) {\n    let lapp = appEnv.currentSessions[source];\n    tappEnv.source = source;\n    tappEnv.session = lapp.session;\n    tappEnv.servers = lapp.servers;\n    tappEnv.serverName = lapp.serverName;\n    tappEnv.casServerName = lapp.casServerName;\n    tappEnv.sessionID = lapp.sessionID;\n    return tappEnv;\n  }\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (getViyaSession);\n\n//# sourceURL=webpack://restafedit/./getViyaSession.js?");

/***/ }),

/***/ "./igetTableColumns.js":
/*!*****************************!*\
  !*** ./igetTableColumns.js ***!
  \*****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n\nasync function igetTableColumns(store, session, source, lib, table) {\n  const handler = source === 'cas' ? casTableColumns : computeTableColumns;\n  const r = await handler(store, session, lib, table);\n  return r;\n}\nasync function casTableColumns(store, session, caslib, table) {\n  const src = `\n  rc = checkAndLoadTable(_args_.table.caslib, _args_.table.name);\n  if (rc ne true) then do;\n    text = 'Unable to access ' ||_args_.table.caslib||'.'||_args_.table.name;   \n    rx = {severity=2,reason=6, status='error',statusCode=2, formatted=text};\n    exit(rx);  \n  end; \n  action table.columnInfo r=result/\n    table = {caslib= _args_.table.caslib,  name=_args_.table.name};\n    run;\n  summary = result; \n  send_response({casResults=summary});\n  `;\n  let args = {\n    table: {\n      caslib: caslib,\n      name: table\n    }\n  };\n  let r = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"caslRun\"])(store, session, src, args, true);\n  let columns = r.results.casResults.ColumnInfo.rows.map(r => r[0].toLowerCase());\n  return columns;\n}\nasync function computeTableColumns(store, session, libref, table) {\n  libref = libref.toUpperCase();\n  table = table.toUpperCase();\n  let p = {\n    qs: {\n      filter: `eq(name,'${libref}')`\n    }\n  };\n  const mylib = await store.apiCall(session.links('librefs'), p);\n  const selflib = await store.apiCall(mylib.itemsCmd(libref, 'self'));\n  p = {\n    qs: {\n      filter: `eq(name,'${table}')`\n    }\n  };\n  const tables = await store.apiCall(selflib.links('tables'), p);\n  if (tables.itemsList().size === 0) {\n    console.log(`Table ${table} not found in ${libref}`);\n    return [];\n  }\n  const tablesSelf = await store.apiCall(tables.links('self'));\n  const tableDetails = await store.apiCall(tablesSelf.itemsCmd(table, 'self'));\n  const columnraf = await store.apiCall(tableDetails.links('columns'));\n  const columns = columnraf.itemsList().toJS();\n  return columns;\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (igetTableColumns);\n\n//# sourceURL=webpack://restafedit/./igetTableColumns.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: cellEdit, updateValue, runControlLabel, commonHandler, distinctValues, scrollTable, fetchRows, addRows, appendTable, appendRows, getLibraryList, getTableList, getTableSummary, getTableColumns, updateTableRows, uploadData, saveTable, setup, setWhere, termApp, restaf, restaflib, prepFormData */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sassoftware_restaf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaf */ \"@sassoftware/restaf\");\n/* harmony import */ var _sassoftware_restaf__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaf__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"restaf\", function() { return _sassoftware_restaf__WEBPACK_IMPORTED_MODULE_0___default.a; });\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, \"restaflib\", function() { return _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_1___default.a; });\n/* harmony import */ var _cellEdit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cellEdit */ \"./cellEdit.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"cellEdit\", function() { return _cellEdit__WEBPACK_IMPORTED_MODULE_2__[\"a\"]; });\n\n/* harmony import */ var _updateValue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./updateValue */ \"./updateValue.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"updateValue\", function() { return _updateValue__WEBPACK_IMPORTED_MODULE_3__[\"a\"]; });\n\n/* harmony import */ var _runControlLabel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./runControlLabel */ \"./runControlLabel.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"runControlLabel\", function() { return _runControlLabel__WEBPACK_IMPORTED_MODULE_4__[\"a\"]; });\n\n/* harmony import */ var _commonHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./commonHandler */ \"./commonHandler.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"commonHandler\", function() { return _commonHandler__WEBPACK_IMPORTED_MODULE_5__[\"a\"]; });\n\n/* harmony import */ var _updateTableRows__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./updateTableRows */ \"./updateTableRows.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"updateTableRows\", function() { return _updateTableRows__WEBPACK_IMPORTED_MODULE_6__[\"a\"]; });\n\n/* harmony import */ var _scrollTable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scrollTable */ \"./scrollTable.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"scrollTable\", function() { return _scrollTable__WEBPACK_IMPORTED_MODULE_7__[\"a\"]; });\n\n/* harmony import */ var _fetchRows__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./fetchRows */ \"./fetchRows.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"fetchRows\", function() { return _fetchRows__WEBPACK_IMPORTED_MODULE_8__[\"a\"]; });\n\n/* harmony import */ var _addRows__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./addRows */ \"./addRows.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"addRows\", function() { return _addRows__WEBPACK_IMPORTED_MODULE_9__[\"a\"]; });\n\n/* harmony import */ var _setup__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./setup */ \"./setup.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"setup\", function() { return _setup__WEBPACK_IMPORTED_MODULE_10__[\"a\"]; });\n\n/* harmony import */ var _termApp__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./termApp */ \"./termApp.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"termApp\", function() { return _termApp__WEBPACK_IMPORTED_MODULE_11__[\"a\"]; });\n\n/* harmony import */ var _setWhere__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./setWhere */ \"./setWhere.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"setWhere\", function() { return _setWhere__WEBPACK_IMPORTED_MODULE_12__[\"a\"]; });\n\n/* harmony import */ var _uploadData__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./uploadData */ \"./uploadData.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"uploadData\", function() { return _uploadData__WEBPACK_IMPORTED_MODULE_13__[\"a\"]; });\n\n/* harmony import */ var _saveTable__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./saveTable */ \"./saveTable.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"saveTable\", function() { return _saveTable__WEBPACK_IMPORTED_MODULE_14__[\"a\"]; });\n\n/* harmony import */ var _appendTable__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./appendTable */ \"./appendTable.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"appendTable\", function() { return _appendTable__WEBPACK_IMPORTED_MODULE_15__[\"a\"]; });\n\n/* harmony import */ var _appendRows__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./appendRows */ \"./appendRows.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"appendRows\", function() { return _appendRows__WEBPACK_IMPORTED_MODULE_16__[\"a\"]; });\n\n/* harmony import */ var _distinctValues__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./distinctValues */ \"./distinctValues.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"distinctValues\", function() { return _distinctValues__WEBPACK_IMPORTED_MODULE_17__[\"a\"]; });\n\n/* harmony import */ var _getLibraryList__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./getLibraryList */ \"./getLibraryList.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getLibraryList\", function() { return _getLibraryList__WEBPACK_IMPORTED_MODULE_18__[\"a\"]; });\n\n/* harmony import */ var _getTableList__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./getTableList */ \"./getTableList.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getTableList\", function() { return _getTableList__WEBPACK_IMPORTED_MODULE_19__[\"a\"]; });\n\n/* harmony import */ var _getTableSummary__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./getTableSummary */ \"./getTableSummary.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getTableSummary\", function() { return _getTableSummary__WEBPACK_IMPORTED_MODULE_20__[\"a\"]; });\n\n/* harmony import */ var _getTableColumns__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./getTableColumns */ \"./getTableColumns.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getTableColumns\", function() { return _getTableColumns__WEBPACK_IMPORTED_MODULE_21__[\"a\"]; });\n\n/* harmony import */ var _prepFormData__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./prepFormData */ \"./prepFormData.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"prepFormData\", function() { return _prepFormData__WEBPACK_IMPORTED_MODULE_22__[\"a\"]; });\n\n/*\r\n\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://restafedit/./index.js?");

/***/ }),

/***/ "./isStdObject.js":
/*!************************!*\
  !*** ./isStdObject.js ***!
  \************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/*\r\n * Copyright © 2022, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n// Verify the returned data conforms to defined state data\n\nfunction isStdObject(result, temp, data, status, type, appEnv) {\n  let r1;\n  let r2;\n\n  //handle different cases\n  // ignore \"data\" returned by user. User must modify data in place\n  if (result == null) {\n    r1 = temp;\n    r2 = status;\n  } else if (Array.isArray(result) === true) {\n    r1 = temp; // start ignoring data in [data, status]\n    r2 = status;\n    if (result.length === 2) {\n      r2 = objectIsStatus(result[1], status);\n    }\n  } else if (typeof result === \"object\") {\n    r1 = temp; //ignore if data is returned\n    r2 = objectIsStatus(result, status);\n  } else {\n    r1 = temp;\n    r2 = status;\n  }\n  // abort all further processing if statusCode is 2\n  if (r2.statusCode == 2) {\n    return [r1, r2];\n  }\n  // did the user destroy temp? if so, revert to data in state\n  // one final check\n\n  if (objectIsData(r1) === false) {\n    r1 = data;\n  }\n\n  // If Data for table is formatted, then do no further processing\n  // since all the data is string.\n\n  if (appEnv.tableFormat === true) {\n    return [r1, r2];\n  }\n  debugger;\n  // first to make sure the colmuns are consistent\n  if (checkConsistency(r1, appEnv.state.columns, type) === false) {\n    console.log('Error: The returned data has inconsistencies');\n    return [data, {\n      statusCode: 2,\n      msg: 'Error: The returned data has inconsistencies'\n    }];\n  }\n  return [r1, r2];\n\n  // functions\n  function checkConsistency(a, columns, type) {\n    let r = true;\n    for (let k in a) {\n      if (columns[k] == null) {\n        console.log(`Error: Attempting to add a new column ${k} in ${type}`);\n        r = false;\n      } else if (a[k] == null) {\n        // allow null \n        r = true;\n      } else {\n        switch (columns[k].Type) {\n          case 'string':\n          case 'number':\n          case 'boolean':\n            if (typeof a[k] !== columns[k].Type) {\n              console.log(`Error: Attempting to change the typeof ${k} in ${type}`);\n              r = false;\n            }\n            break;\n          case 'object':\n            {\n              if (typeof a[k] !== 'object') {\n                console.log(`Error: Attempting to change the typeof ${k} in ${type}`);\n                r = false;\n              }\n              break;\n            }\n          case 'array':\n            {\n              if (Array.isArray(a[k]) === false) {\n                console.log(`Error: Attempting to change the type of ${k} in ${type}`);\n                r = false;\n              }\n              break;\n            }\n        }\n      }\n    }\n    return r;\n  }\n  function objectIsStatus(obj, status) {\n    let el = Object.keys(obj);\n    return el.includes(\"statusCode\") && el.includes(\"msg\") && el.length === 2 ? obj : status;\n  }\n  function objectIsData(obj) {\n    if (obj == null || typeof obj !== 'object') {\n      return false;\n    }\n    let el = Object.keys(obj);\n    return el.includes(\"_rowIndex\") && el.includes(\"_modified\") ? obj : false;\n  }\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (isStdObject);\n\n//# sourceURL=webpack://restafedit/./isStdObject.js?");

/***/ }),

/***/ "./onEditHandler.js":
/*!**************************!*\
  !*** ./onEditHandler.js ***!
  \**************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _isStdObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isStdObject */ \"./isStdObject.js\");\n/*\r\n * Copyright © 2022, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n//import handlerResult from './handlerResult';\n\n/**\r\n * @description Run init, main or term handlers\r\n * @async\r\n * @private\r\n * @module onEditHandler\r\n * @category restafedit/core\r\n * @param {string} type   - type of exit (column name)\r\n * @param {rowObject} data        - rowObject\r\n * @param {number} rowIndex    - client-side Row Index\r\n * @param {appEnv} appEnv      - app Environment from setup\r\n * @param {object} status      - status object\r\n * @returns {promise}     - [data, status]\r\n * @example\r\n * The function returns the updated data and the status.\r\n * This function is called by cellEdit, so there is probably little reason\r\n * to call this directly\r\n * Please see the restafeditExample in the Tutorial pulldown\r\n */\nasync function onEditHandler(type, temp, currentData, rowIndex, appEnv, status) {\n  const {\n    handlers\n  } = appEnv.appControl.editControl;\n  appEnv.handlers = handlers;\n  let r = null;\n  ;\n  //let temp = Object.assign({}, data);\n  if (handlers[type] != null) {\n    try {\n      if (handlers[type] != null) {\n        if (appEnv.apiVersion === 2) {\n          r = appEnv.appControl.table === null ? await handlers[type](temp, appEnv.appContext) : await handlers[type](temp, rowIndex, appEnv.appContext);\n        } else {\n          r = await handlers[type](temp, type, rowIndex, appEnv.appContext);\n        }\n      }\n    } catch (err) {\n      console.log('Error in handler', type, err);\n      status = {\n        statusCode: 2,\n        msg: `Error in handler ${type}. See console`\n      };\n      return [currentData, status];\n    }\n  }\n  return Object(_isStdObject__WEBPACK_IMPORTED_MODULE_0__[/* default */ \"a\"])(r, temp, currentData, status, type, appEnv);\n}\n;\n/* harmony default export */ __webpack_exports__[\"a\"] = (onEditHandler);\n\n//# sourceURL=webpack://restafedit/./onEditHandler.js?");

/***/ }),

/***/ "./prepFormData.js":
/*!*************************!*\
  !*** ./prepFormData.js ***!
  \*************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _commonHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commonHandler.js */ \"./commonHandler.js\");\n/* harmony import */ var _typeValidation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./typeValidation.js */ \"./typeValidation.js\");\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n\n\n/**\r\n * @description reduce fetch results\r\n * @async\r\n * @module prepFormData\r\n * @param {object} result - result from data fetch{schema: [], rows:[]}\r\n * @param {object} appEnv - app Environment from setup\r\n * @param {boolean} makerow - create initial\r\n * @returns {promise}     - {columns: eColumns, rowsObject: newRows, schema: schema, status: status}\r\n */\nasync function prepFormData(result, appEnv, makerow) {\n  const {\n    schema,\n    rows\n  } = result;\n  const source = appEnv.source;\n  const customColumns = appEnv.appControl.customColumns;\n  let status = {\n    statusCode: 0,\n    msg: 'Initialization was successful'\n  };\n\n  // set up extended columns\n  debugger;\n  const eColumns = {};\n  ;\n  //--------------------------------------------------------------------------\n  // utility functions\n  // function to make a data row object\n  debugger;\n  const makeRowObject = (columns, row, rown) => {\n    const rowObj = {\n      _rowIndex: rown,\n      _modified: 0\n    };\n    row.forEach((r, j) => {\n      const s = columns[j];\n      const name = s.Column.toLowerCase();\n      rowObj[name] = r;\n    });\n    // Now add custom columns if any\n    if (customColumns != null) {\n      addCustomColumns(customColumns, rowObj);\n    }\n    return rowObj;\n  };\n\n  // function to add custom columns to the row object\n  const addCustomColumns = (customColumns, rowObj) => {\n    for (const k in customColumns) {\n      const c = customColumns[k];\n      const name = c.Column.toLowerCase();\n      rowObj[name] = c.value;\n    }\n    return rowObj;\n  };\n  //---------------------------------------------------\n\n  schema.forEach((s, i) => {\n    const name = s.Column.toLowerCase();\n    s.name = name;\n    s.Label = s.Label == null || s.Label.length === 0 ? s.Column : s.Label;\n    let tx = s.hasOwnProperty('Type') ? s.Type : s.type;\n    s.customType = tx == null ? 'string' : tx.toLowerCase(); //keep original type\n    // convert type to valid js types\n    s.Type = Object(_typeValidation_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"])(tx == null ? 'string' : tx.toLowerCase());\n    if (source === 'compute') {\n      s.FormattedLength = s.length;\n    }\n    s.custom = false;\n    //s.customType = s.Type;\n    eColumns[name] = s;\n  });\n  debugger;\n  // add computed columns to the current column set.\n  if (customColumns != null) {\n    for (const k in customColumns) {\n      const c = {\n        ...customColumns[k]\n      };\n      c.name = k;\n      c.custom = true;\n      eColumns[k] = c;\n      c.customType = c.Type;\n      c.Type = Object(_typeValidation_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"])(c.Type == null ? 'string' : c.Type.toLowerCase());\n    }\n  }\n  let internalColumns = ['_rowIndex', '_modified'];\n  if (appEnv.table === null) {\n    internalColumns.push('_index_');\n  }\n  internalColumns.map(k => {\n    let c = {\n      Column: k,\n      Type: 'number',\n      Label: 'Internal' + k,\n      FormattedLength: 12,\n      customType: 'number',\n      internal: true\n    };\n    eColumns[k] = c;\n  });\n\n  // save it appEnv - need it in init handler for data verification\n\n  appEnv.state.columns = eColumns;\n\n  // Now create appEnv.state.data\n  // initialize the data rows with incoming data rows(table case)\n  // and add the custom columns if any\n  // if no data, then create a row object with custom columns\n\n  ;\n  let newRows = [];\n  if (rows.length > 0) {\n    for (let i = 0; i < rows.length; i++) {\n      const t = makeRowObject(schema, rows[i], i);\n      // run the init handler for each new row object\n      let currentRow = Object.assign({}, t);\n      const [t1, statusi] = await Object(_commonHandler_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ \"a\"])('init', t, currentRow, i, appEnv, status);\n      status = statusi;\n      newRows.push(t1);\n    }\n    ;\n\n    // app frame - no data to start with\n  } else {\n    let rowObj = {\n      _rowIndex: 0,\n      _modified: 0\n    };\n    let t = addCustomColumns(customColumns, rowObj);\n    // run the init handler for each new row object\n    let currentRow = Object.assign({}, t);\n    let [t1, statusi] = await Object(_commonHandler_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ \"a\"])('init', t, currentRow, 0, appEnv, status);\n    status = statusi;\n    newRows[0] = t1;\n  }\n\n  /*\r\n   if (makerow === true) {\r\n     let t = {};\r\n     for (const k in eColumns) {\r\n       let type = eColumns[k].Type;\r\n       t[k] = (type === 'string') ? ' ' \r\n          : (type === 'boolean') ? false \r\n          : (type === 'number') ? 0\r\n          : (type === 'int') ? 0\r\n          : type === 'object' ? {} \r\n          : []; \r\n         \r\n     }\r\n     newRows = [t];\r\n   }\r\n   */\n\n  ;\n  appEnv.state = {\n    cache: {\n      schema,\n      rows\n    },\n    columns: eColumns,\n    data: newRows\n  };\n  let res = {\n    cache: {\n      schema,\n      rows\n    },\n    columns: eColumns,\n    data: newRows,\n    status\n  };\n  return res;\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (prepFormData);\n\n//# sourceURL=webpack://restafedit/./prepFormData.js?");

/***/ }),

/***/ "./runControlLabel.js":
/*!****************************!*\
  !*** ./runControlLabel.js ***!
  \****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _cellEdit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cellEdit */ \"./cellEdit.js\");\n/*\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\n * SPDX-License-Identifier: Apache-2.0\n */\n\nasync function runControlLabel(...args) {\n  let name;\n  let rowIndex = 0;\n  let appEnv = args[args.length - 1];\n  if (args.length === 2) {\n    [name] = args;\n  } else {\n    [name, rowIndex] = args;\n  }\n  if (['init', 'main', 'term', '_appProps', '_appSubmit'].includes(name) === false) {\n    return {\n      data: appEnv.data,\n      status: {\n        statusCode: 1,\n        msg: '${name} is not a valid control label'\n      }\n    };\n  }\n  let {\n    _data,\n    status\n  } = await Object(_cellEdit__WEBPACK_IMPORTED_MODULE_0__[/* default */ \"a\"])(name, null, rowIndex, null, appEnv);\n  return status;\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (runControlLabel);\n\n//# sourceURL=webpack://restafedit/./runControlLabel.js?");

/***/ }),

/***/ "./saveTable.js":
/*!**********************!*\
  !*** ./saveTable.js ***!
  \**********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n/**\r\n * @description Persists the inmemory cas table.\r\n * @async\r\n * @module saveTable\r\n * @category restafedit/dataMgmt\r\n * @param {appEnv} appEnv\r\n * @param {object=} table - save the inmemory table\r\n * @returns {promise}  Status object\r\n * @example\r\n * Saves the current cas table and leave the inmemory table intact.\r\n * This is a noop if source is compute.\r\n **/\n\n\nasync function saveTable(appEnv, table) {\n  const {\n    store,\n    session\n  } = appEnv;\n  if (appEnv.source === 'compute') {\n    return {\n      msg: 'Action does not apply to SAS 9 tables',\n      statusCode: 0\n    };\n  }\n  const t = table != null ? table : appEnv.appControl.table;\n  await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"casSaveTable\"])(store, session, t, true, true);\n  return {\n    msg: 'Table saved',\n    statusCode: 0\n  };\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (saveTable);\n\n//# sourceURL=webpack://restafedit/./saveTable.js?");

/***/ }),

/***/ "./scrollTable.js":
/*!************************!*\
  !*** ./scrollTable.js ***!
  \************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _prepFormData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prepFormData */ \"./prepFormData.js\");\n/*\r\n\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n\n\n/**\r\n * @description Simplify scrolling using next|prev|top\r\n * @async\r\n * @module scrollTable\r\n * @category restafedit/fetch\r\n * @param {string} direction direction(next|prev|first)\r\n * @param {appEnv} appEnv\r\n * @returns {promise}  result ready for display or null if it did not scroll\r\n * @example\r\n *  see fetchRows for custom fetching\r\n *  let r = await scrollTable('next', appEnv);\r\n *    r=== { data:data, columns: ecolumns}\r\n *\r\n *  if ( r === null) {\r\n *     handle when no data was retrieved\r\n *  } else {\r\n *     handle new data\r\n * }\r\n *\r\n * init handler(if specified) will be executed for each row.\r\n *\r\n * Make sure you handle exceptions that are thrown.The library does not handle those and\r\n * assumes some higher level code will have a catch\r\n *\r\n * For custom scrolling, pass the scrolling information in the optional third parameter.\r\n * The content of the payload depends on whether the source is cas or compute.\r\n * For compute see the documentation for rowset in compute service.<https://developer.sas.com/apis/rest/Compute/#get-a-row-set-from-a-data-set>\r\n * CAS payload is not as rich the rowset for compute service\r\n * At this time the cas is handled thru custom casl code.\r\n * Future: use rowset from data management API.\r\n * The payload for CAS is as follows\r\n *  { qs: {\r\n *       start: <number>\r\n *       limit: <number>\r\n *       format: true|false,\r\n *       where: <where string>\r\n * };\r\n *\r\n * Please see the restafeditExample in the Tutorial pulldown\r\n */\nasync function scrollTable(direction, appEnv, payload) {\n  const useEntry = appEnv.source === 'cas' ? icasScroll : icomputeScroll;\n  const fetchResults = await useEntry(direction, appEnv, payload);\n  ;\n  return fetchResults;\n}\nasync function icasScroll(direction, appEnv, payload) {\n  const {\n    store,\n    session\n  } = appEnv;\n  const {\n    initialFetch,\n    table\n  } = appEnv.appControl;\n  const cachePolicy = appEnv.appControl.cachePolicy == null ? true : appEnv.appControl.cachePolicy;\n  let control = {\n    ...initialFetch.qs\n  };\n  if (payload != null) {\n    control = {\n      ...control,\n      ...payload.qs\n    };\n    if (control.format == null) {\n      control.format = false;\n    }\n    if (control.where == null) {\n      control.where = ' ';\n    }\n  } else {\n    if (direction === 'first') {\n      control = {\n        ...initialFetch.qs\n      };\n    } else if (direction !== null) {\n      const cs = appEnv.state.pagination[direction];\n      if (cs == null) {\n        // eslint-disable-next-line no-throw-literal\n        return null;\n      }\n      control = {\n        ...cs\n      };\n    }\n    control.where = appEnv.activeWhere;\n  }\n  control.table = table;\n  try {\n    const r = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"casFetchData\"])(store, session, control);\n    appEnv.tableFormat = control.format;\n    const result = await Object(_prepFormData__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"])(r.data, appEnv);\n    appEnv.fetchCount = result.data.length;\n    if (appEnv.fetchCount > 0) {\n      appEnv.state = {\n        cache: result.cache,\n        modified: [],\n        pagination: {\n          ...r.pagination\n        },\n        data: result.data,\n        columns: result.columns,\n        point: setPoint(r.data.scrollOptions),\n        scrollOptions: [].concat(r.data.scrollOptions)\n      };\n      if (cachePolicy === true) {\n        appEnv.state.data = result.data;\n        appEnv.state.columns = result.columns;\n      }\n    } else {\n      if (appEnv.onNoData !== 'keep') {\n        appEnv.state.data = [];\n      }\n    }\n    ;\n    return result;\n  } catch (err) {\n    console.log(err);\n    appEnv.state.data = [];\n    // eslint-disable-next-line no-throw-literal\n    throw 'ERROR: Fetch failed. See console for logs';\n  }\n}\nasync function icomputeScroll(direction, appEnv, payload) {\n  const {\n    store,\n    tableSummary\n  } = appEnv;\n  const {\n    table,\n    initialFetch\n  } = appEnv.appControl;\n  const cachePolicy = appEnv.appControl.cachePolicy == null ? true : appEnv.appControl.cachePolicy;\n  const tname = `${table.libref}.${table.name}`.toLowerCase();\n  // compute service does not remember these settings from the initial fetch. \n  let control = {\n    qs: {\n      format: initialFetch.qs.format,\n      includeIndex: true\n    }\n  };\n\n  /*Treat direction of first as a special case, ignore payload*/\n  if (direction === 'first') {\n    /*Treat direction of first as a special case, ignore payload*/\n    control = {\n      ...initialFetch\n    };\n  } else if (direction == null) {\n    /* custom scrolling */\n    control = {\n      ...payload\n    };\n  }\n  // if none of the other two cases, then direction is set.\n\n  if (appEnv.activeWhere != null) {\n    /* add where processing */\n    control.qs.where = appEnv.activeWhere;\n  }\n  control.qs.includeIndex = 1;\n  appEnv.tableFormat = control.qs.format;\n  debugger;\n  let r = null;\n  try {\n    r = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"computeFetchData\"])(store, tableSummary, tname, direction, control, 'rows');\n  } catch (err) {\n    appEnv.state.data = [];\n    // eslint-disable-next-line no-throw-literal\n    throw 'ERROR: Fetch failed. See console for logs';\n  }\n  let result = null;\n  if (r !== null) {\n    debugger;\n    result = await Object(_prepFormData__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"])(r, appEnv);\n    appEnv.fetchCount = result.data.length;\n    if (appEnv.fetchCount > 0) {\n      appEnv.state = {\n        cache: result.cache,\n        modified: [],\n        pagination: {\n          ...r.pagination\n        },\n        data: result.data,\n        columns: result.columns,\n        point: setPoint(r.scrollOptions),\n        scrollOptions: [].concat(r.scrollOptions)\n      };\n      /*\r\n      if (cachePolicy === true) {\r\n        appEnv.state.data = result.data;\r\n        appEnv.state.columns = result.columns;\r\n      }\r\n      */\n    } else {\n      appEnv.fetchCount = 0;\n      if (appEnv.onNoData !== 'keep') {\n        appEnv.state.data = [];\n      }\n    }\n  } else {\n    appEnv.fetchCount = 0;\n    if (appEnv.onNoData !== 'keep') {\n      appEnv.state.data = [];\n    }\n  }\n  return result;\n}\nfunction setPoint(scrollOptions) {\n  let point;\n  if (scrollOptions.length === 0) {\n    point = 'all';\n  } else if (scrollOptions.indexOf('prev') < 0) {\n    point = 'BOF';\n  } else if (scrollOptions.indexOf('next') < 0) {\n    point = 'EOF';\n  }\n  return point;\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (scrollTable);\n\n//make sure to pass filter setup to override the scroll options\n/*\r\nif (payload == null) {\r\n  control = { qs: qs };\r\n} else {\r\n  control = { qs: { ...qs, ...payload.qs } };\r\n}\r\n*/\n\n//# sourceURL=webpack://restafedit/./scrollTable.js?");

/***/ }),

/***/ "./setWhere.js":
/*!*********************!*\
  !*** ./setWhere.js ***!
  \*********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n/**\r\n * @description set a where clause for all subsequent fetches\r\n * @module setWhere\r\n * @category restafedit/fetch\r\n * @param {string} where  where expression(SAS Standard).Set to null to clear\r\n * @param {appEnv} appEnv   app Environment from setup\r\n * @returns {string} returns the current where\r\n * @example\r\n *  let oldwhere = setWhere('x>10', appEnv);\r\n *  DO NOT include \"where\" string in the expression\r\n *\r\n */\n\nfunction setWhere(where, appEnv) {\n  const c = appEnv.activeWhere;\n  appEnv.activeWhere = where == null ? ' ' : where;\n  return c;\n}\n;\n/* harmony default export */ __webpack_exports__[\"a\"] = (setWhere);\n\n//# sourceURL=webpack://restafedit/./setWhere.js?");

/***/ }),

/***/ "./setup.js":
/*!******************!*\
  !*** ./setup.js ***!
  \******************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaf */ \"@sassoftware/restaf\");\n/* harmony import */ var _sassoftware_restaf__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaf__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _getViyaSession__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getViyaSession */ \"./getViyaSession.js\");\n/* harmony import */ var _deleteViyaSession__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deleteViyaSession */ \"./deleteViyaSession.js\");\n/* harmony import */ var _wrapBuiltins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./wrapBuiltins */ \"./wrapBuiltins.js\");\n/* harmony import */ var _builtins__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./builtins */ \"./builtins/index.js\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _prepFormData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./prepFormData */ \"./prepFormData.js\");\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n/* eslint-disable prefer-const */\n\n\n\n\n\n\n\n\n\n/*\r\nimport getTableSummary from './getTableSummary';\r\nimport termApp from './termApp';\r\n*/\n\n/**\r\n * @description Setup an Edit session\r\n * @async\r\n * @module setup\r\n * @category restafedit/core\r\n * @param {logonPayload} logonPayload  -information for connecting to Viya\r\n * @param {appControl} appControl       control information\r\n * @param {string=} sessionID if specified, this session will be used.Must match source\r\n * @param {object=} ubuiltins  builtins functions extensions from user\r\n * @param {string=} user  user name\r\n * @param {object=} userData  user data\r\n * @param {object=} storeConfig  store configuration - passed to initStore\r\n *\r\n *\r\n * @returns {promise}  returns appEnv to control the flow\r\n * @alias module: setup\r\n * @example\r\n *  const appEnv = await setup(logonPayload, appControl);\r\n *  The setup method does the following:\r\n *    1. Create a session based on the source\r\n *       - Specify the sessionID if you want to use a session you have created.\r\n *    2. Optionally run the appInit handler (if specified)\r\n *    3. Optionally run the preamble code (if specified)\r\n *    4. Return the appEnv object.\r\n *\r\n *    The appInit handler and the preamble code can be used to setup related information, create\r\n *    temporary tables etc...\r\n *\r\n */\nasync function setup(logonPayload, appControl, sessionID, uBuiltins, user, userData, storeConfig) {\n  const {\n    source\n  } = appControl;\n  const getViyaSessionf = appEnv => async source => {\n    let r = Object(_getViyaSession__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"])(appEnv, source);\n    return r;\n  };\n  const delViyaSessionf = appEnv => async source => {\n    let r = Object(_deleteViyaSession__WEBPACK_IMPORTED_MODULE_2__[/* default */ \"a\"])(appEnv, source);\n    return r;\n  };\n  ;\n  if (storeConfig == null) {\n    storeConfig = {\n      casProxy: true,\n      options: {\n        ns: null,\n        proxyServer: null\n      }\n    };\n  }\n  // Note: that each setup creates its own store\n\n  let store = Object(_sassoftware_restaf__WEBPACK_IMPORTED_MODULE_0__[\"initStore\"])(storeConfig);\n  if (logonPayload !== null && logonPayload.authType !== \"none\") {\n    let msg = await store.logon(logonPayload);\n  }\n  const useEntry = source === \"cas\" ? icasSetup : source === \"compute\" ? icomputeSetup : nosource;\n  if (sessionID == undefined) {\n    sessionID = null;\n  }\n  const _verify = (field, value) => {\n    if (appControl[field] == null) {\n      appControl[field] = value;\n    }\n  };\n  // check\n  _verify(\"source\", \"none\");\n  _verify(\"apiVersion\", 1);\n  _verify(\"table\", null);\n  _verify(\"byvars\", []);\n  _verify(\"customColumns\", {});\n  _verify(\"editControl\", {\n    handlers: {},\n    autoSave: true\n  });\n  _verify(\"initialFetch\", {\n    qs: {\n      start: 0,\n      limit: 10,\n      format: false,\n      where: \" \"\n    }\n  });\n  ;\n  // default to version 1\n  if (appControl.apiVersion == null) {\n    appControl.apiVersion = 1;\n  }\n  let appEnv = {\n    source: source,\n    apiVersion: appControl.apiVersion,\n    table: appControl.table,\n    byvars: appControl.byvar,\n    userData: {},\n    tableFormat: false,\n    onNoData: appControl.onNoData != null ? appControl.onNoData : \"clear\",\n    user: user,\n    fetchCount: 0,\n    store,\n    storeConfig: storeConfig,\n    session: null,\n    servers: null,\n    sessionID: null,\n    userSessionID: null,\n    userData: userData != null ? userData : {},\n    casServerName: appControl.casServerName,\n    computeContext: appControl.computeContext,\n    serverContext: appControl.source === \"cas\" ? appControl.casServerName : appControl.computeContext,\n    logonPayload,\n    appControl,\n    currentSessions: {\n      cas: {\n        sessionID: null\n      },\n      compute: {\n        sessionID: null\n      }\n    },\n    activeWhere: appControl.initialFetch.qs.where != null ? appControl.initialFetch.qs.where : \" \",\n    builtins: {},\n    state: {\n      cache: {\n        rows: [],\n        schema: []\n      },\n      modified: [],\n      pagination: {},\n      scrollOptions: [],\n      data: [],\n      columns: {},\n      tableSummary: {}\n    },\n    appContext: {\n      userData: userData,\n      logonPayload: logonPayload,\n      store: store\n    },\n    id: Date()\n  };\n  appEnv.appContext.getViyaSession = getViyaSessionf(appEnv);\n  appEnv.appContext.deleteViyaSession = delViyaSessionf(appEnv);\n  appEnv.getViyaSession = appEnv.appContext.getViyaSession;\n  appEnv.deleteViyaSession = appEnv.appContext.deleteViyaSession;\n  let fullBuiltins = uBuiltins != null ? Object.assign({}, _builtins__WEBPACK_IMPORTED_MODULE_4__[/* default */ \"a\"], uBuiltins) : _builtins__WEBPACK_IMPORTED_MODULE_4__[/* default */ \"a\"];\n  appEnv.appContext.builtins = Object(_wrapBuiltins__WEBPACK_IMPORTED_MODULE_3__[/* default */ \"a\"])(fullBuiltins, appEnv.appContext);\n  /*\r\n  if (logonPayload && logonPayload.host == null) {\r\n    // eslint-disable-next-line no-throw-literal\r\n    throw \"ERROR: Please specify a Viya host\";\r\n  }\r\n    */\n  appEnv = await useEntry(store, null /*logonPayload*/, appControl, appEnv, sessionID);\n  if (appControl.source !== 'none') {\n    let ssid = await store.apiCall(appEnv.session.links(\"self\"));\n    let id = ssid.items(\"id\");\n    appEnv.sessionID = id;\n    appEnv.userSessionID = sessionID;\n  }\n  ;\n  return appEnv;\n}\n\n// _nosource\nasync function nosource(_store, _logonPayload, appControl, appEnv, _sessionID) {\n  let r = await Object(_prepFormData__WEBPACK_IMPORTED_MODULE_6__[/* default */ \"a\"])(appEnv.state.cache, appEnv, true);\n  // TBD: Need to handle preamble for this case.\n  if (appControl.editControl.handlers.initApp != null) {\n    try {\n      await _initApp(appEnv);\n    } catch (err) {\n      console.log(err);\n      // eslint-disable-next-line no-throw-literal\n      // await termApp(appEnv, true);\n      throw \"ERROR: initApp failed. Please see console for messages\";\n    }\n  }\n  appEnv.state.data = r.data;\n  appEnv.state.columns = r.columns;\n  appEnv.state.cache = r.cache;\n  return appEnv;\n}\nasync function _initApp(appEnv) {\n  try {\n    const r = await appEnv.appControl.editControl.handlers.initApp(appEnv, \"initApp\");\n    if (r.statusCode === 2) {\n      console.log(JSON.stringify(r, null, 4));\n      // eslint-disable-next-line no-throw-literal\n      // await termApp(appEnv, true);\n      throw \"ERROR: initApp failed. Please see console for messages\";\n    }\n  } catch (err) {\n    console.log(err);\n    // eslint-disable-next-line no-throw-literal\n    // await termApp(appEnv, true);\n    throw \"ERROR: Setup failed. Please see console for error messages\";\n  }\n}\n// cas server\nasync function icasSetup(store, logonPayload, appControl, appEnv, sessionID) {\n  let r;\n  try {\n    ;\n    r = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_5__[\"casSetup\"])(store, logonPayload, sessionID, appEnv.casServerName);\n    appEnv.session = r.session;\n    appEnv.servers = r.servers;\n    appEnv.casServerName = appEnv.session.links(\"execute\", \"link\", \"server\");\n  } catch (err) {\n    // eslint-disable-next-line no-throw-literal\n    throw \"ERROR: Unable to create session. Please see console for messages\";\n  }\n  appEnv.serverName = appEnv.session.links(\"execute\", \"link\", \"server\");\n  if (appControl.editControl.handlers.initApp != null) {\n    await _initApp(appEnv);\n  }\n  if (appControl.preamble != null) {\n    try {\n      const rx = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_5__[\"caslRun\"])(store, r.session, appControl.preamble, {}, true);\n      if (rx.disposition.statusCode !== 0) {\n        console.log(JSON.stringify(rx, null, 4));\n        // eslint-disable-next-line no-throw-litera\n        // await termApp(appEnv, true);\n        throw \"ERROR: Preamble  code failed. Please see console for messages\";\n      }\n    } catch (err) {\n      console.log(err);\n      // eslint-disable-next-line no-throw-literal\n      throw \"Preamble failed.Please see console\";\n    }\n  }\n  return appEnv;\n}\n\n// Compute server\nasync function icomputeSetup(store, logonPayload, appControl, appEnv, sessionID) {\n  // eslint-disable-next-line prefer-const\n  let session;\n  session = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_5__[\"computeSetup\"])(store, appControl.computeContext, logonPayload, null, sessionID);\n  debugger;\n  appEnv.session = session;\n  if (sessionID != null) {\n    appEnv.userSessionID = sessionID;\n  }\n  try {\n    debugger;\n    if (appControl.editControl.handlers.initApp != null) {\n      await _initApp(appEnv);\n    }\n  } catch (err) {\n    console.log(err);\n    throw \"ERROR: initApp failed. Please see console for messages\";\n  }\n  if (appControl.preamble != null) {\n    console.log('running preamble', appControl.preamble);\n    const result = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_5__[\"computeRun\"])(store, session, appControl.preamble);\n    if (result.SASJobStatus === 'error') {\n      let log = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_5__[\"computeResults\"])(store, result, 'log');\n      console.log(log);\n      throw `Error: Preamble failed with completion code of ${result.SASJobStatus}`;\n    }\n  }\n  let tableSummary = {};\n  if (appControl.table != null) {\n    try {\n      debugger;\n      tableSummary = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_5__[\"computeSetupTables\"])(store, session, appControl.table, null /*appControl.preamble -- do preamble here */);\n    } catch (err) {\n      debugger;\n      console.log(err);\n      // await termApp(appEnv, true);\n      throw err;\n    }\n  }\n  appEnv.tableSummary = tableSummary;\n  return appEnv;\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (setup);\n\n//# sourceURL=webpack://restafedit/./setup.js?");

/***/ }),

/***/ "./termApp.js":
/*!********************!*\
  !*** ./termApp.js ***!
  \********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n/**\r\n * @description Run termapp handler and delete session\r\n * @async\r\n * @module termApp\r\n * @category restafedit/core\r\n * @param {appEnv} appEnv   appEnv\r\n * @returns {promise} returns status object\r\n * @alias module: termApp\r\n * @example\r\n *  let r  = await termSession(appEnv)\r\n *  This is a good option for some post processing at the end of edit session\r\n *  If the post processing is done on the Viya Server, recommend using restaf and restafedit to make\r\n *  the REST calls.\r\n *  Note: If sessionID was specified in the call to setup, the session will not be deleted.\r\n */\n\nasync function termApp(appEnv, setup) {\n  const {\n    store,\n    session\n  } = appEnv;\n  const handlers = appEnv.appControl.editControl.handlers;\n  if (handlers.termapp != null && setup == null) {\n    await handlers.termapp(appEnv);\n  }\n\n  // If user supplied session do not delete session.\n\n  if (appEnv.userSessionID == null && appEnv.session != null) {\n    await store.apiCall(session.links('delete'));\n  }\n  ;\n  console.log('Application terminated successfully');\n  return {\n    msg: 'Session terminated',\n    statusCode: 0\n  };\n}\n;\n/* harmony default export */ __webpack_exports__[\"a\"] = (termApp);\n\n//# sourceURL=webpack://restafedit/./termApp.js?");

/***/ }),

/***/ "./text2Float.js":
/*!***********************!*\
  !*** ./text2Float.js ***!
  \***********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _typeValidation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeValidation */ \"./typeValidation.js\");\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\nfunction text2Float(value, f) {\n  let svalue = value;\n  if (typeof value === \"string\") {\n    let t = Object(_typeValidation__WEBPACK_IMPORTED_MODULE_0__[/* default */ \"a\"])(f.Type.toLowerCase());\n    if (t == \"int\") {\n      svalue = parseInt(value);\n      if (isNaN(value) === true) {\n        value = 0;\n      }\n    } else if (t === \"number\") {\n      svalue = parseFloat(value * 1.0);\n      if (isNaN(value) === true) {\n        value = 0;\n      }\n    } else if (t === \"boolean\") {\n      let vals = [\"true\", \"yes\", 1];\n      let v = value.toLowerCase();\n      if (vals.includes(v)) {\n        svalue = true;\n      } else {\n        svalue = false;\n      }\n    } else if (t === 'array' || t === 'object') {\n      svalue = value;\n    }\n  }\n  return svalue;\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (text2Float);\n\n//# sourceURL=webpack://restafedit/./text2Float.js?");

/***/ }),

/***/ "./typeValidation.js":
/*!***************************!*\
  !*** ./typeValidation.js ***!
  \***************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\nfunction typeValidation(type) {\n  const stringTypes = [\"char\", \"string\", \"varchar\", \"varbinary\"];\n  const numberTypes = [\"decimal\", \"number\", \"double\", \"float\"];\n  const intTypes = [\"int\", \"integer\", 'int64'];\n  const booleanTypes = ['boolean'];\n  const objectTypes = ['object', 'array'];\n  let r = type;\n  if (type == null) {\n    r = 'number';\n  } else if (stringTypes.includes(type)) {\n    r = 'string';\n  } else if (numberTypes.includes(type)) {\n    r = 'number';\n  } else if (intTypes.includes(type)) {\n    r = 'int';\n  } else if (booleanTypes.includes(type)) {\n    r = 'boolean';\n  } else if (objectTypes.includes(type)) {\n    r = type;\n  } else {\n    r = 'number';\n  }\n  return r;\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (typeValidation);\n\n//# sourceURL=webpack://restafedit/./typeValidation.js?");

/***/ }),

/***/ "./updateTableRows.js":
/*!****************************!*\
  !*** ./updateTableRows.js ***!
  \****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n/**\r\n * @description Update the row on the server using byvars as key\r\n * @async\r\n * @module updateTableRows\r\n * @category restafedit/dataMgmt\r\n * @param {rowObjectArray|rowObject} data  - data as a rowObject or Array of rowObjects\r\n * @param {appEnv} appEnv   - app Environment object from setup\r\n * @returns {promise}       - {msg: string, statusCode: 0|1|2}\r\n * @example\r\n *    let r = await updateTableRows(data, appEnv);\r\n *    To append new rows see appendRows\r\n */\nasync function updateTableRows(data, appEnv, altTable, altByvars) {\n  let result;\n  const byvars = appEnv.appControl.byvars;\n  if (altByvars == null || altByvars.length === 0) {\n    if (byvars === null || byvars.length === 0) {\n      return [null, {\n        msg: 'Error: Please specify a by variable',\n        statusCode: 1\n      }];\n    }\n    ;\n  }\n  if (Array.isArray(data) === true) {\n    for (let i = 0; i < data.length; i++) {\n      result = await _updateData(data[i], appEnv, altTable, altByvars);\n    }\n  } else {\n    result = await _updateData(data, appEnv, altTable, altByvars);\n  }\n  return result;\n}\nfunction makePayload(data, appEnv, altTable, altByvars) {\n  const {\n    table,\n    byvars\n  } = appEnv.appControl;\n  const columns = appEnv.state.columns;\n  const t = {};\n  let byvarset = altByvars != null ? altByvars : byvars;\n  if (altTable != null) {\n    for (const k in data) {\n      if (byvarset.includes(k) === false) {\n        t[k] = data[k];\n      }\n    }\n  } else {\n    for (const k in data) {\n      // if (!(k === '_index_' || k === '_rowIndex' || k === '_modified') || columns[k].custom === true /*|| byvars.includes(k)*/) {\n\n      if (!(columns[k].internal != null || columns[k].custom === true || k === '_index_')) {\n        if (byvarset.includes(k) === false) {\n          t[k] = data[k];\n        }\n      }\n      ;\n    }\n    ;\n  }\n  const w = {};\n  byvarset.forEach(k => {\n    w[k] = data[k];\n  });\n  const payload = {\n    table: altTable != null ? altTable : table,\n    data: t,\n    where: w\n  };\n  return payload;\n}\nasync function _updateData(data, appEnv, altTable, altByVars) {\n  const {\n    store,\n    session\n  } = appEnv;\n  const handler = appEnv.source === 'cas' ? _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"casUpdateData\"] : _computeUpdateData;\n  const payload = makePayload(data, appEnv, altTable, altByVars);\n  const status = await handler(store, session, payload);\n  return status;\n}\n// TBD: Move to restaflib\n\nasync function _computeUpdateData(store, session, payload) {\n  const {\n    data,\n    table,\n    where\n  } = payload;\n  let src = `proc sql; update ${table.libref}.${table.name}`;\n  let set = 'SET ';\n  let comma = ' ';\n  for (const k in data) {\n    set = set + comma + k + '=' + value2String(data[k]);\n    comma = ', ';\n  }\n  ;\n  src = src + ' ' + set;\n  let swhere = ' WHERE ';\n  let andbit = ' ';\n  for (const k in where) {\n    const v = where[k];\n    swhere = swhere + andbit + k + `= ${value2String(v)} `;\n    andbit = ' AND ';\n  }\n  src = src + ' ' + swhere + ';run;';\n  const asrc = src.split(/\\r?\\n/);\n\n  // TBD: switch to computeRun on next pass\n  const p = {\n    data: {\n      code: asrc\n    }\n  };\n  const job = await store.apiCall(session.links('execute'), p);\n  const qs = {\n    qs: {\n      newState: 'Completed',\n      timeout: 1\n    }\n  };\n  const status = await store.jobState(job, qs);\n  const c = status.data === 'completed' ? 0 : 1;\n  return {\n    statusCode: c,\n    msg: status.data\n  };\n}\nfunction value2String(value) {\n  let valueString;\n  if (value == null) {\n    valueString = '.';\n  } else if (typeof value === 'string') {\n    valueString = JSON.stringify(value);\n  } else {\n    valueString = value.toString();\n  }\n  return valueString;\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (updateTableRows);\n\n//# sourceURL=webpack://restafedit/./updateTableRows.js?");

/***/ }),

/***/ "./updateValue.js":
/*!************************!*\
  !*** ./updateValue.js ***!
  \************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _cellEdit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cellEdit */ \"./cellEdit.js\");\n/*\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\n * SPDX-License-Identifier: Apache-2.0\n */\n\nasync function updateValue(...args) {\n  let name;\n  let value;\n  let rowIndex = 0;\n  let appEnv;\n  ;\n  if (args.length === 3) {\n    [name, value, appEnv] = args;\n  } else {\n    [name, value, rowIndex, appEnv] = args;\n    rowIndex = rowIndex || 0;\n  }\n  let result = await Object(_cellEdit__WEBPACK_IMPORTED_MODULE_0__[/* default */ \"a\"])(name, value, rowIndex, null, appEnv);\n  return result.status;\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (updateValue);\n\n//# sourceURL=webpack://restafedit/./updateValue.js?");

/***/ }),

/***/ "./uploadData.js":
/*!***********************!*\
  !*** ./uploadData.js ***!
  \***********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/* eslint-disable no-tabs */\n/*\r\n * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n\n\n/**\r\n * @description Upload client data to a new table on server\r\n * @async\r\n * @module uploadData\r\n * @category restafedit/dataMgmt\r\n * @param {object} output table\r\n * @param {array}  data if null, data from appEnv.state will be uploded.\r\n * @param {array}  drop fields to drop from the output\r\n * @param {object} addon columns additional columns(useful for adding key fields)\r\n * @param {appEnv} appEnv   - app Environment from setup\r\n * @returns {promise}       - returns status object\r\n * @example\r\n *  let r = await uploadData({caslib:...}, null, ['total], {version: 10}, appEnv)\r\n */\n\nasync function uploadData(table, data, drop, addon, appEnv, masterTable, saveFlag) {\n  const {\n    store,\n    session\n  } = appEnv;\n  // eslint-disable-next-line prefer-const\n  if (data === null) {\n    data = appEnv.state.data;\n  }\n  ;\n  ;\n  const t = Object.keys(data[0]);\n  let dropArray = ['_index_', '_rowIndex', '_modified'];\n  if (drop !== null && drop.length > 0) {\n    dropArray = dropArray.concat(drop);\n  }\n  const columns = t.filter(c => {\n    return !(dropArray.indexOf(c) >= 0);\n  });\n  const tempCols = {};\n  columns.forEach(k => {\n    tempCols[k] = appEnv.state.columns[k];\n  });\n  let csvArray = null;\n  if (appEnv.source === 'cas') {\n    csvArray = columns.join(',') + '\\n';\n  }\n  ;\n  for (let i = 0; i < data.length; i++) {\n    let temp = data[i];\n    temp = {\n      ...temp,\n      ...addon\n    };\n    const valArray = [];\n    columns.forEach((c, l) => {\n      let v = temp[c];\n      if (typeof v === 'string') {\n        v = v.trim();\n      }\n      valArray[l] = v;\n    });\n    if (csvArray === null) {\n      csvArray = valArray.join(',') + '\\n';\n    } else {\n      csvArray = csvArray + valArray.join(',') + '\\n';\n    }\n  }\n  let result;\n  if (appEnv.source === 'cas') {\n    result = await _casTableUpload(store, session, table, csvArray, masterTable, saveFlag);\n  } else {\n    result = await _computeUpload(store, session, tempCols, table, csvArray);\n  }\n  return result;\n}\n\n// TBD: switch to a datastep with arrays for each column. More reliable\nasync function _computeUpload(store, session, columns, table, csvArray) {\n  let src = `data ${table.libref}.${table.name}; INFILE datalines delimiter=',' ;\\n`;\n  let l = '';\n  let inx = 'INPUT ';\n  for (const k in columns) {\n    const c = columns[k];\n    inx = inx + c.Column + ' ';\n    if (c.Type === 'string') {\n      const x = ` ${c.Column} $ ${c.length} \\n`;\n      l = l + ' ' + x;\n    }\n  }\n  if (l.length > 0) {\n    l = 'LENGTH ' + l + ';\\n';\n  }\n  ;\n  inx = inx + ';\\n';\n  src = src + ';\\n' + l + inx + 'datalines;\\n' + csvArray + '\\n; run; proc print;run;\\n';\n  await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"computeRun\"])(store, session, src);\n  return {\n    msg: 'done',\n    statusCode: 0\n  };\n}\nasync function _casTableUpload(store, session, table, csvArray, masterTable, saveFlag) {\n  const t = `${table.caslib}.${table.name}`;\n  let r = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"casUpload\"])(store, session, null, t, true, csvArray);\n  await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"casLoadTable\"])(store, session, table);\n  if (masterTable != null) {\n    r = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"casAppendTable\"])(store, session, table, masterTable, saveFlag);\n    return r;\n  } else {\n    return r;\n  }\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (uploadData);\n\n//# sourceURL=webpack://restafedit/./uploadData.js?");

/***/ }),

/***/ "./validateValueType.js":
/*!******************************!*\
  !*** ./validateValueType.js ***!
  \******************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("function validateValueType(value, colType) {\n  if (value == null) {\n    return true;\n  }\n  if (colType === 'array') {\n    return Array.isArray(value);\n  }\n  if (colType === 'object') {\n    return typeof value === 'object';\n  }\n  return typeof value === colType;\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (validateValueType);\n\n//# sourceURL=webpack://restafedit/./validateValueType.js?");

/***/ }),

/***/ "./wrapBuiltins.js":
/*!*************************!*\
  !*** ./wrapBuiltins.js ***!
  \*************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/*\r\n* Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n* SPDX-License-Identifier: Apache-2.0\r\n*/\nfunction wrapBuiltins(builtins, appEnv) {\n  const wrap = (appEnv, builtin) => async (...args) => {\n    let r = await builtin(appEnv, ...args);\n    return r;\n  };\n  let wrappedBuiltins = {};\n  for (let key in builtins) {\n    if (key === 'restafedit' || key === 'restaflib') {\n      wrappedBuiltins[key] = builtins[key];\n    } else {\n      wrappedBuiltins[key] = wrap(appEnv, builtins[key]);\n    }\n  }\n  return wrappedBuiltins;\n}\n/* harmony default export */ __webpack_exports__[\"a\"] = (wrapBuiltins);\n\n//# sourceURL=webpack://restafedit/./wrapBuiltins.js?");

/***/ }),

/***/ 0:
/*!*********************!*\
  !*** multi ./index ***!
  \*********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! C:\\sassoftware\\restafedit\\src/index */\"./index.js\");\n\n\n//# sourceURL=webpack://restafedit/multi_./index?");

/***/ }),

/***/ "@sassoftware/restaf":
/*!**************************************!*\
  !*** external "@sassoftware/restaf" ***!
  \**************************************/
/*! no static exports found */
/*! exports used: default, initStore */
/***/ (function(module, exports) {

eval("module.exports = require(\"@sassoftware/restaf\");\n\n//# sourceURL=webpack://restafedit/external_%22@sassoftware/restaf%22?");

/***/ }),

/***/ "@sassoftware/restaflib":
/*!*****************************************!*\
  !*** external "@sassoftware/restaflib" ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"@sassoftware/restaflib\");\n\n//# sourceURL=webpack://restafedit/external_%22@sassoftware/restaflib%22?");

/***/ })

/******/ });
});