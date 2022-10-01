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

/***/ "./casTableUnique.js":
/*!***************************!*\
  !*** ./casTableUnique.js ***!
  \***************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/*\r\n * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n/**\r\n * @description Get unique values for a specific column\r\n * @async\r\n * @private\r\n * @module casTableUnique\r\n * @category restafedit/core\r\n * @param {object} table object\r\n * @param {string} columnName    column name\r\n * @param {appEnv} appEnv   app Environment from setup\r\n * @returns {promise}       {an array of unique values }\r\n * @example\r\n *  let selectList = await casTableUnique('company, appEnv))\r\n *  This is useful to get a list of unique values for selected columns.\r\n *  {columnName:[ array of unque values] }\r\n */\n\nasync function casTableUnique(table, columnName, appEnv) {\n  const {\n    store,\n    session\n  } = appEnv;\n  const src = `\n  results = selectionLists(_args_.column,_args_.table.caslib, _args_.table.name);\n  send_response({casResults = {data=results}});\n  `;\n  const args = {\n    table,\n    column: columnName\n  };\n  const result = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"caslRun\"])(store, session, src, args, true);\n\n  if (result.results.casResults.data.statusCode !== 0) {\n    // eslint-disable-next-line no-throw-literal\n    throw 'Failed to create unique list';\n  }\n\n  const data = result.results.casResults.data.data;\n  return data;\n}\n\n;\n/* harmony default export */ __webpack_exports__[\"a\"] = (casTableUnique);\n\n//# sourceURL=webpack://restafedit/./casTableUnique.js?");

/***/ }),

/***/ "./cellEdit.js":
/*!*********************!*\
  !*** ./cellEdit.js ***!
  \*********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _text2Float__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text2Float */ \"./text2Float.js\");\n/* harmony import */ var _commonHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commonHandler */ \"./commonHandler.js\");\n/* harmony import */ var _updateTableRows__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updateTableRows */ \"./updateTableRows.js\");\n/*\r\n * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n\n\n/**\r\n * @description Process edit of a cell and optionally save the data\r\n * @async\r\n * @module cellEdit\r\n * @category restafedit/core\r\n * @param {string} name     - name of the field (lower case)\r\n * @param {*} value         - the new value for name field\r\n * @param {number} rowIndex - row Index ( index in the data array on client)\r\n * @param {rowObject} currentData  - RowObject for the entire row prior to change\r\n * @param {appEnv} appEnv   - app Environment from setup\r\n * @returns {promise}       - {data: updated data, status: status }\r\n * @example\r\n * data schema {column1: value, column2, value,...}\r\n * status schema {statusCode: 0|1|2, msg: some string}\r\n * The currentData object is also updated with the latest values.\r\n *\r\n * const r = await cellEdit'x1',100, 1, d, appEnv)\r\n    - If the column has an handler it will be called.\r\n    - If 'main\" handler is specified, it will be called.\r\n    - If autoSave is true\r\n      - The 'term' handler(if specified) will be called\r\n      - The data for that row will be persisted to the server\r\n */\n\nasync function cellEdit(name, value, rowIndex, currentData, appEnv) {\n  /* do not modify the data directly. caller will probably do a setState */\n  let newDataRow = { ...currentData\n  };\n  const columns = appEnv.state.columns;\n  const {\n    handlers,\n    autoSave\n  } = appEnv.appControl.editControl;\n  const iautoSave = autoSave == null ? true : autoSave;\n  const cachePolicy = appEnv.appControl.cachePolicy == null ? true : appEnv.appControl.cachePolicy;\n  newDataRow[name] = Object(_text2Float__WEBPACK_IMPORTED_MODULE_0__[/* default */ \"a\"])(value, columns[name]);\n  let status = {\n    statusCode: 0,\n    msg: ''\n  };\n\n  if (handlers[name] != null) {\n    const r = await handlers[name](newDataRow, name, rowIndex, appEnv);\n    newDataRow = r[0];\n    status = r[1];\n\n    if (status.statusCode === 2) {\n      return {\n        data: r[0],\n        status\n      };\n    }\n  }\n\n  let r = await Object(_commonHandler__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"])('main', newDataRow, rowIndex, appEnv);\n\n  if (iautoSave === true) {\n    r = await Object(_commonHandler__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"])('term', r[0], rowIndex, appEnv);\n    status = r[1];\n\n    if (status.statusCode === 2) {\n      return {\n        data: r[0],\n        status\n      };\n    }\n\n    status = await Object(_updateTableRows__WEBPACK_IMPORTED_MODULE_2__[/* default */ \"a\"])(r[0], appEnv);\n  }\n\n  newDataRow = r[0];\n\n  if (cachePolicy === true) {\n    appEnv.state.data[currentData._rowIndex] = newDataRow;\n  }\n\n  return {\n    data: newDataRow,\n    status\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (cellEdit);\n\n//# sourceURL=webpack://restafedit/./cellEdit.js?");

/***/ }),

/***/ "./commonHandler.js":
/*!**************************!*\
  !*** ./commonHandler.js ***!
  \**************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/*\r\n * Copyright © 2022, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n/**\r\n * @description Run init, main or term handlers\r\n * @async\r\n * @private\r\n * @module commonHandler\r\n * @category restafedit/core\r\n * @param {string} type   - type of exit (init|main|term)\r\n * @param {rowObject} data        - rowObject\r\n * @param {number} rowIndex    - client-side Row Index\r\n * @param {appEnv} appEnv      - app Environment from setup\r\n * @returns {promise}     - [data, status]\r\n * @example\r\n * The function returns the updated data and the status.\r\n * This function is called by cellEdit, so there is probably little reason\r\n * to call this directly\r\n * Please see the restafeditExample in the Tutorial pulldown\r\n */\nasync function commonHandler(type, data, rowIndex, appEnv) {\n  const {\n    handlers\n  } = appEnv.appControl.editControl;\n\n  if (handlers[type] == null) {\n    return [data, {\n      statusCode: 0,\n      msg: null\n    }];\n  } else {\n    const [newDataRow, status] = await handlers[type](data, rowIndex, appEnv, type);\n    return [newDataRow, status];\n  }\n}\n\n;\n/* harmony default export */ __webpack_exports__[\"a\"] = (commonHandler);\n\n//# sourceURL=webpack://restafedit/./commonHandler.js?");

/***/ }),

/***/ "./computeTableUnique.js":
/*!*******************************!*\
  !*** ./computeTableUnique.js ***!
  \*******************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/*\r\n * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n/**\r\n * @description Get unique values for a specific column(sas table)\r\n * @async\r\n * @private\r\n * @module sasTableUnique\r\n * @category restafedit/core\r\n * @param {string} columnName    column name\r\n * @param {appEnv} appEnv   app Environment from setup\r\n * @returns {promise}       {an array of unique values }\r\n * @example\r\n *  let selectList = await casTableUnique('company, appEnv))\r\n *  This is useful to get a list of unique values for selected columns.\r\n *  {columnName:[ array of unquew values] }\r\n */\n\nasync function computeTableUnique(table, columnName, appEnv) {\n  const {\n    store,\n    session\n  } = appEnv;\n  const t = `${table.libref}.${table.name}`;\n  const code = `\n    PROC SQL;\n    CREATE TABLE WORK.QUERY\n    AS\n    SELECT distinct(${columnName}) as utype FROM ${t};\n   QUIT;`;\n  const computeSummary = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"computeRun\"])(store, session, code);\n  const values = {};\n  let dir = 'first';\n  const res = [];\n  let data;\n\n  do {\n    data = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"computeFetchData\"])(store, computeSummary, 'QUERY', dir);\n    const r = data.rows.map(r1 => r1[0]);\n    res.push(...r);\n    dir = 'next';\n  } while (data.scrollOptions.indexOf('next') >= 0);\n\n  values[columnName] = res;\n  return values;\n}\n\n;\n/* harmony default export */ __webpack_exports__[\"a\"] = (computeTableUnique);\n\n//# sourceURL=webpack://restafedit/./computeTableUnique.js?");

/***/ }),

/***/ "./distinctValues.js":
/*!***************************!*\
  !*** ./distinctValues.js ***!
  \***************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _casTableUnique__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./casTableUnique */ \"./casTableUnique.js\");\n/* harmony import */ var _computeTableUnique__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./computeTableUnique */ \"./computeTableUnique.js\");\n/*\r\n * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n\n/**\r\n * @description Get unique values for a specific column\r\n * @async\r\n * @module distinctValues\r\n * @category restafedit/core\r\n * @param {string} columnName    column name\r\n * @param {appEnv} appEnv   - app Environment from setup\r\n * @param {casTable|computeTable=} table Optionally point to a different table\r\n * @returns {promise}       - {an array of unique values }\r\n * @example\r\n *  let selectList = await distinctValues('company', appEnv))\r\n *  This is useful to get a list of unique values for selected columns.\r\n *  {company:['IBM', 'Microsoft', 'SAS'] }\r\n */\n\nasync function distinctValues(columnName, appEnv, table) {\n  let data;\n  const t = table != null ? table : appEnv.appControl.table;\n\n  if (appEnv.source === 'cas') {\n    data = await Object(_casTableUnique__WEBPACK_IMPORTED_MODULE_0__[/* default */ \"a\"])(t, columnName, appEnv);\n  } else {\n    data = await Object(_computeTableUnique__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"])(t, columnName, appEnv);\n  }\n\n  return data;\n}\n\n;\n/* harmony default export */ __webpack_exports__[\"a\"] = (distinctValues);\n\n//# sourceURL=webpack://restafedit/./distinctValues.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: cellEdit, commonHandler, distinctValues, scrollTable, updateTableRows, saveTable, setup, setWhere, uploadData, termApp */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cellEdit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cellEdit */ \"./cellEdit.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"cellEdit\", function() { return _cellEdit__WEBPACK_IMPORTED_MODULE_0__[\"a\"]; });\n\n/* harmony import */ var _commonHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commonHandler */ \"./commonHandler.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"commonHandler\", function() { return _commonHandler__WEBPACK_IMPORTED_MODULE_1__[\"a\"]; });\n\n/* harmony import */ var _updateTableRows__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updateTableRows */ \"./updateTableRows.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"updateTableRows\", function() { return _updateTableRows__WEBPACK_IMPORTED_MODULE_2__[\"a\"]; });\n\n/* harmony import */ var _scrollTable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scrollTable */ \"./scrollTable.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"scrollTable\", function() { return _scrollTable__WEBPACK_IMPORTED_MODULE_3__[\"a\"]; });\n\n/* harmony import */ var _setup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./setup */ \"./setup.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"setup\", function() { return _setup__WEBPACK_IMPORTED_MODULE_4__[\"a\"]; });\n\n/* harmony import */ var _setWhere__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./setWhere */ \"./setWhere.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"setWhere\", function() { return _setWhere__WEBPACK_IMPORTED_MODULE_5__[\"a\"]; });\n\n/* harmony import */ var _distinctValues__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./distinctValues */ \"./distinctValues.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"distinctValues\", function() { return _distinctValues__WEBPACK_IMPORTED_MODULE_6__[\"a\"]; });\n\n/* harmony import */ var _uploadData__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./uploadData */ \"./uploadData.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"uploadData\", function() { return _uploadData__WEBPACK_IMPORTED_MODULE_7__[\"a\"]; });\n\n/* harmony import */ var _saveTable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./saveTable */ \"./saveTable.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"saveTable\", function() { return _saveTable__WEBPACK_IMPORTED_MODULE_8__[\"a\"]; });\n\n/* harmony import */ var _termApp__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./termApp */ \"./termApp\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"termApp\", function() { return _termApp__WEBPACK_IMPORTED_MODULE_9__[\"a\"]; });\n\n/*\r\n * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://restafedit/./index.js?");

/***/ }),

/***/ "./prepFormData.js":
/*!*************************!*\
  !*** ./prepFormData.js ***!
  \*************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _commonHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commonHandler */ \"./commonHandler.js\");\n/*\r\n * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n/*\r\n* output\r\n* extended columns and data ready for use in dataform and table\r\n*/\n\n/**\r\n * @description reduce fetch results\r\n * @private\r\n * @async\r\n * @module prepFormData\r\n * @param {object} result - result from casFetchRow(rows and schema)\r\n * @param {object} appEnv - app Environment from setup\r\n * @returns {promise}     - {columns: eColumns, rowsObject: newRows}\r\n */\n\nasync function prepFormData(result, appEnv) {\n  const {\n    schema,\n    rows\n  } = result;\n  const customColumns = appEnv.appControl.customColumns;\n  let status = {\n    statusCode: 0,\n    msg: 'Initialization was successful'\n  };\n\n  const makeRowObject = (columns, row, rown) => {\n    const rowObj = {\n      _rowIndex: rown\n    };\n    row.forEach((r, i) => {\n      const s = columns[i];\n      const name = s.Column.toLowerCase();\n      rowObj[name] = r;\n    });\n\n    if (customColumns != null) {\n      for (const k in customColumns) {\n        const c = customColumns[k];\n        const name = c.Column.toLowerCase();\n        rowObj[name] = c.value;\n      }\n    }\n\n    return rowObj;\n  };\n\n  const newRows = [];\n\n  for (let i = 0; i < rows.length; i++) {\n    const t = makeRowObject(schema, rows[i], i);\n    const [t1, statusi] = await Object(_commonHandler__WEBPACK_IMPORTED_MODULE_0__[/* default */ \"a\"])('init', t, i, appEnv);\n    status = statusi;\n    newRows.push(t1);\n  }\n\n  ; // extend column and make it an object\n\n  const eColumns = {};\n  schema.forEach((s, i) => {\n    const name = s.Column.toLowerCase();\n    s.name = name;\n    s.Label = s.Label == null || s.Label.length === 0 ? s.Column : s.Label;\n\n    if (s.Type == null) {\n      s.Type = s.type == null ? 'double' : s.type;\n    }\n\n    if (s.Type === 'varchar') {\n      s.Type = 'char';\n    }\n\n    s.custom = false;\n    eColumns[name] = s;\n  }); // add computed columns to the array.\n\n  if (customColumns != null) {\n    for (const k in customColumns) {\n      const c = { ...customColumns[k]\n      };\n      c.name = k;\n      c.custom = true;\n      eColumns[k] = c;\n    }\n  }\n\n  return {\n    columns: eColumns,\n    data: newRows,\n    status\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (prepFormData);\n\n//# sourceURL=webpack://restafedit/./prepFormData.js?");

/***/ }),

/***/ "./saveTable.js":
/*!**********************!*\
  !*** ./saveTable.js ***!
  \**********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/*\r\n * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n/**\r\n * @description Save the current table to disk\r\n * @async\r\n * @module saveTable\r\n * @category restafedit/core\r\n * @param {appEnv} appEnv\r\n * @param {object=} table - save the table to disk\r\n * @returns {promise}  Status object\r\n * @example\r\n * Saves the current cas table and leaves the inmemory table intact.\r\n * If you want to save some other inmemory table pass the optional second parameter\r\n * This is a noop for SAS Tables\r\n **/\n\n\nasync function saveTable(appEnv, table) {\n  const {\n    store,\n    session\n  } = appEnv;\n\n  if (appEnv.source === 'compute') {\n    return {\n      msg: 'Action does not apply to SAS 9 tables',\n      statusCode: 0\n    };\n  }\n\n  const t = table != null ? table : appEnv.appControl.table;\n  await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"casSaveTable\"])(store, session, t);\n  return {\n    msg: 'Table saved',\n    statusCode: 0\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (saveTable);\n\n//# sourceURL=webpack://restafedit/./saveTable.js?");

/***/ }),

/***/ "./scrollTable.js":
/*!************************!*\
  !*** ./scrollTable.js ***!
  \************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _prepFormData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prepFormData */ \"./prepFormData.js\");\n/*\r\n * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n\n/**\r\n * @description Simplify scrolling using next|prev|top\r\n * @async\r\n * @module scrollTable\r\n * @category restafedit/core\r\n * @param {string} direction direction(next|prev|first)\r\n * @param {appEnv} appEnv\r\n * @param {object=} payload  override pogination with custom scrolling\r\n * @returns {promise}  result ready for display or null if it did not scroll\r\n * @example\r\n *  let r = await scrollTable('next', appEnv);\r\n *    r=== { data:data, columns: ecolumns}\r\n *\r\n *  if ( r === null) {\r\n *     handle when no data was retrieved\r\n *  } else {\r\n *     handle new data\r\n * }\r\n *\r\n * init handler(if specified) will be executed for each row.\r\n *\r\n * Make sure you handle exceptions that are thrown.The library does not handle those and\r\n * assumes some higher level code will have a catch\r\n *\r\n * For custom scrolling, pass the scrolling information in the optional third parameter.\r\n * The content of the payload depends on whether the source is cas or compute.\r\n * For compute see the documentation for rowset in compute service.<https://developer.sas.com/apis/rest/Compute/#get-a-row-set-from-a-data-set>\r\n * CAS payload is not as rich the rowset for compute service\r\n * At this time the cas is handled thru custom casl code.\r\n * Future: use rowset from data management API.\r\n * The payload for CAS is as follows\r\n *  { qs: {\r\n *       start: <number>\r\n *       limit: <number>\r\n *       format: true|false,\r\n *       where: <where string>\r\n * };\r\n *\r\n * Please see the restafeditExample in the Tutorial pulldown\r\n */\n\nasync function scrollTable(direction, appEnv, payload) {\n  const useEntry = appEnv.source === 'cas' ? icasScroll : icomputeScroll;\n  const fetchResults = await useEntry(direction, appEnv, payload);\n  return fetchResults;\n}\n\nasync function icasScroll(direction, appEnv, payload) {\n  const {\n    store,\n    session\n  } = appEnv;\n  const {\n    initialFetch,\n    table\n  } = appEnv.appControl;\n  const cachePolicy = appEnv.appControl.cachePolicy == null ? true : appEnv.appControl.cachePolicy;\n  let control;\n\n  if (payload != null) {\n    control = { ...payload\n    };\n  } else {\n    if (direction === 'first') {\n      control = { ...initialFetch\n      };\n    } else if (direction !== null) {\n      control = { ...appEnv.state.pagination[direction]\n      };\n\n      if (control.next === -1 || control.from <= 0) {\n        return null;\n      }\n    }\n  } // Need to do this until we change resaflib..\n\n\n  let c = {};\n\n  if (control.qs != null) {\n    c = { ...control.qs\n    };\n    c.from = c.start + 1;\n    c.count = c.limit;\n  } else {\n    c = { ...control\n    };\n  }\n\n  if (c.from <= 0 || c.next === -1) {\n    return null;\n  }\n\n  if (c.where == null) {\n    c.where = ' ';\n  }\n\n  if (appEnv.activeWhere !== null) {\n    c.where = appEnv.activeWhere;\n  }\n\n  c.table = table;\n  const r = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"casFetchRows\"])(store, session, c);\n  let t = null;\n\n  if (r !== null) {\n    t = await Object(_prepFormData__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"])(r.data, appEnv);\n    appEnv.state = {\n      modified: [],\n      pagination: { ...r.pagination\n      },\n      currentPage: control,\n      data: [],\n      columns: []\n    };\n\n    if (cachePolicy === true) {\n      appEnv.state.data = t.data;\n      appEnv.state.columns = t.columns;\n    }\n\n    t.pagination = { ...r.pagination\n    };\n    return t;\n  }\n}\n\nasync function icomputeScroll(direction, appEnv, payload) {\n  const {\n    store,\n    tableSummary\n  } = appEnv;\n  const {\n    table,\n    initialFetch\n  } = appEnv.appControl;\n  const cachePolicy = appEnv.appControl.cachePolicy == null ? true : appEnv.appControl.cachePolicy;\n  let control = null;\n  const tname = `${table.libref}.${table.name}`.toLowerCase();\n\n  if (payload == null) {\n    if (direction === 'first') {\n      control = { ...initialFetch\n      };\n    }\n  } else {\n    control = { ...payload\n    };\n  }\n\n  if (appEnv.activeWhere != null) {\n    if (control != null) {\n      control.qs.where = appEnv.activeWhere;\n    } else {\n      control = {\n        qs: {\n          where: appEnv.activeWhere\n        }\n      };\n    }\n  } // eslint-disable-next-line prefer-const\n\n\n  const data = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"computeFetchData\"])(store, tableSummary, tname, direction, control);\n  let result = null;\n\n  if (data !== null) {\n    result = await Object(_prepFormData__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"])(data, appEnv);\n    appEnv.state = {\n      modified: [],\n      pagination: {},\n      currentPage: {},\n      data: [],\n      columns: []\n    };\n\n    if (cachePolicy === true) {\n      appEnv.state.data = result.data;\n      appEnv.state.columns = result.columns;\n    }\n  }\n\n  return result;\n}\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (scrollTable);\n\n//# sourceURL=webpack://restafedit/./scrollTable.js?");

/***/ }),

/***/ "./setWhere.js":
/*!*********************!*\
  !*** ./setWhere.js ***!
  \*********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/*\r\n * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n/**\r\n * @description set a where clause for all subsequent fetches\r\n * @module setWhere\r\n * @category restafedit/core\r\n * @param {string} where  where expression(SAS Standard).Set to null to clear\r\n * @param {appEnv} appEnv   app Environment from setup\r\n * @returns {string} returns the current where\r\n * @example\r\n *  let oldwhere = setWhere('x>10', appEnv);\r\n *\r\n */\nfunction setWhere(where, appEnv) {\n  const c = appEnv.activeWhere;\n  appEnv.activeWhere = where;\n  return c;\n}\n\n;\n/* harmony default export */ __webpack_exports__[\"a\"] = (setWhere);\n\n//# sourceURL=webpack://restafedit/./setWhere.js?");

/***/ }),

/***/ "./setup.js":
/*!******************!*\
  !*** ./setup.js ***!
  \******************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaf */ \"@sassoftware/restaf\");\n/* harmony import */ var _sassoftware_restaf__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaf__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_1__);\n/* eslint-disable prefer-const */\n\n\n/**\r\n * @description Setup an Edit session\r\n * @async\r\n * @module setup\r\n * @category restafedit/core\r\n * @param {logonPayload} logonPayload  -information for connecting to Viya\r\n * @param {appControl} appControl       control information\r\n * @param {string=} sessionID if specified, this session will be used.Must match source\r\n *\r\n * @returns {promise}  returns appEnv to control the flow\r\n * @alias module: setup\r\n * @example\r\n *  const appEnv = await setup(logonPayload, appControl);\r\n *\r\n * Please see the restafeditExample in the Tutorial pulldown\r\n *\r\n */\n\nasync function setup(logonPayload, appControl, sessionID) {\n  let storeOptions = logonPayload.storeOptions != null ? logonPayload.storeOptions : {\n    casProxy: true\n  };\n  const store = Object(_sassoftware_restaf__WEBPACK_IMPORTED_MODULE_0__[\"initStore\"])(storeOptions);\n  const useEntry = appControl.source === 'cas' ? icasSetup : icomputeSetup;\n  let appEnv = {\n    source: appControl.source,\n    table: appControl.table,\n    byvars: appControl.byvar,\n    store,\n    session: null,\n    servers: null,\n    restaflib: null,\n    sessionID: null,\n    userSessionID: null,\n    logonPayload,\n    appControl,\n    activeWhere: ' ',\n    state: {\n      modified: [],\n      pagination: {},\n      currentPage: {},\n      data: {},\n      columns: {}\n    },\n    id: Date()\n  };\n\n  try {\n    if (logonPayload.host == null) {\n      // eslint-disable-next-line no-throw-literal\n      throw 'ERROR: Please specify a Viya host';\n    }\n\n    appEnv = await useEntry(store, logonPayload, appControl, appEnv, sessionID); // do the equivalent of fseinit\n\n    if (appControl.editControl.handlers.initApp != null) {\n      const r = await appControl.editControl.handlers.initApp(appEnv, 'initApp');\n      appEnv.session = r.session;\n      appEnv.servers = r.servers;\n\n      if (r.statusCode === 2) {\n        console.log(JSON.stringify(r, null, 4)); // eslint-disable-next-line no-throw-literal\n\n        throw 'ERROR: initApp failed. Please see console for messages';\n      }\n    }\n  } catch (err) {\n    console.log(err); // eslint-disable-next-line no-throw-literal\n\n    throw 'ERROR: Setup failed. Please see console for error messages';\n  }\n\n  appEnv.sessionID = appEnv.session.items('id');\n  appEnv.userSessionID = sessionID;\n  return appEnv;\n} // cas server\n\n\nasync function icasSetup(store, logonPayload, appControl, appEnv, sessionID) {\n  const preamble = appControl.editControl.handlers.initApp != null ? null : appControl.preamble;\n  let r;\n\n  try {\n    r = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_1__[\"casSetup\"])(store, logonPayload, sessionID);\n    appEnv.session = r.session;\n    appEnv.servers = r.servers;\n  } catch (err) {\n    console.log(err); // eslint-disable-next-line no-throw-literal\n\n    throw 'ERROR: cassetup failed. Please see console for messages';\n  }\n\n  if (preamble != null) {\n    try {\n      const rx = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_1__[\"caslRun\"])(store, r.session, preamble);\n\n      if (rx.disposition.statusCode !== 0) {\n        console.log(JSON.stringify(rx, null, 4)); // eslint-disable-next-line no-throw-literal\n\n        throw 'ERROR: Preamble failed. Please see console for messages';\n      }\n    } catch (err) {\n      console.log(err); // eslint-disable-next-line no-throw-literal\n\n      throw 'caslRun failed. Please see console';\n    }\n  }\n\n  ;\n  return appEnv;\n}\n\n; // Compute server\n\nasync function icomputeSetup(store, logonPayload, appControl, appEnv, sessionID) {\n  // eslint-disable-next-line prefer-const\n  const preamble = appControl.editControl.handlers.initApp != null ? null : appControl.preamble;\n  let session = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_1__[\"computeSetup\"])(store, appControl.computeContext, logonPayload, sessionID);\n  appEnv.session = session; // eslint-disable-next-line no-useless-catch\n\n  let tableSummary;\n\n  try {\n    tableSummary = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_1__[\"computeSetupTables\"])(store, session, appControl.table, preamble);\n  } catch (err) {\n    console.log(err);\n    throw err;\n  }\n\n  appEnv.tableSummary = tableSummary;\n  return appEnv;\n}\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (setup);\n\n//# sourceURL=webpack://restafedit/./setup.js?");

/***/ }),

/***/ "./termApp":
/*!*****************!*\
  !*** ./termApp ***!
  \*****************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/*\r\n * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\r\n\r\n/**\r\n * @description Run termapp handler(if specified) and delete the cas|compute session(optional)\r\n * @async\r\n * @module termSession\r\n * @category restafedit/core\r\n * @param {appEnv} appEnv   app Environment from setup\r\n * \r\n * @returns {promise}       status object\r\n * @example\r\n *  let r  = await termSession(appEnv)\r\n *  This is a good option for doing some post processing of the edited data.\r\n *  If the post processing is done on the Viya Server, recommend using restaf and restafedit to make\r\n *  the REST calls.\r\n */\r\n\r\nasync function termApp (appEnv) {\r\n  const { store, session } = appEnv;\r\n  const handlers = appEnv.appControl.editControl.handlers;\r\n  if (handlers.termapp != null) {\r\n    await handlers.termapp(appEnv);\r\n  }\r\n\r\n  // Setup for user supplied session which we do not want to delete\r\n  if (appEnv.userSessionID == null) {\r\n    await store.apiCall(session.links('delete'));\r\n  };\r\n\r\n  return { msg: 'Session terminated', statusCode: 0 };\r\n};\r\n/* harmony default export */ __webpack_exports__[\"a\"] = (termApp);\r\n\n\n//# sourceURL=webpack://restafedit/./termApp?");

/***/ }),

/***/ "./text2Float.js":
/*!***********************!*\
  !*** ./text2Float.js ***!
  \***********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/*\r\n * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\nfunction text2Float(value, f) {\n  let svalue = value;\n  const t = f.Type.toLowerCase();\n\n  if (typeof svalue === 'string' && (t === 'decimal' || t === 'number' || t === 'double' || t === 'float')) {\n    svalue = parseFloat(value * 1.0);\n\n    if (isNaN(value) === true) {\n      value = 0;\n    }\n  }\n\n  return svalue;\n}\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (text2Float);\n\n//# sourceURL=webpack://restafedit/./text2Float.js?");

/***/ }),

/***/ "./updateTableRows.js":
/*!****************************!*\
  !*** ./updateTableRows.js ***!
  \****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n\n/**\r\n * @description Update the row on the server\r\n * @async\r\n * @private\r\n * @module updateTableRows\r\n * @category restafedit/core\r\n * @param {rowObjectArray|rowObject} data  - data as a rowObject or Array of rowObjects\r\n * @param {appEnv} appEnv   - app Environment object from setup\r\n * @returns {promise}       - {msg: string, statusCode: 0|1|2}\r\n * @example\r\n *\r\n * Please see the restafeditExample in the Tutorial pulldown\r\n */\n\nasync function updateTableRows(data, appEnv) {\n  let result;\n  const byvars = appEnv.appControl.byvars;\n\n  if (byvars === null || byvars.length === 0) {\n    return [null, {\n      msg: 'Error: Please specify a by variable',\n      statusCode: 1\n    }];\n  }\n\n  if (Array.isArray(data) === true) {\n    for (let i = 0; i < data.length; i++) {\n      result = await _updateData(data[i], appEnv);\n    }\n  } else {\n    result = await _updateData(data, appEnv);\n  }\n\n  return result;\n}\n\nfunction makePayload(data, appEnv) {\n  const {\n    table,\n    byvars\n  } = appEnv.appControl;\n  const columns = appEnv.state.columns;\n  const t = {};\n\n  for (const k in data) {\n    if (!(k === '_index_' || k === '_rowIndex') && columns[k].custom === false) {\n      t[k] = data[k];\n    }\n\n    ;\n  }\n\n  ;\n  const w = {};\n  byvars.forEach(k => {\n    w[k] = t[k];\n  });\n  const payload = {\n    table,\n    data: t,\n    where: w\n  };\n  return payload;\n}\n\nasync function _updateData(data, appEnv) {\n  const {\n    store,\n    session\n  } = appEnv;\n  const handler = appEnv.source === 'cas' ? _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"casUpdateData\"] : _computeUpdateData;\n  const payload = makePayload(data, appEnv);\n  const status = await handler(store, session, payload);\n  return status;\n} // TBD: Move to restaflib\n\n\nasync function _computeUpdateData(store, session, payload) {\n  const {\n    data,\n    table,\n    where\n  } = payload;\n  let src = `proc sql; update ${table.libref}.${table.name}`;\n  let set = 'SET ';\n  let comma = ' ';\n\n  for (const k in data) {\n    set = set + comma + k + '=' + value2String(data[k]);\n    comma = ', ';\n  }\n\n  ;\n  src = src + ' ' + set;\n  let swhere = ' WHERE ';\n  let andbit = ' ';\n\n  for (const k in where) {\n    const v = where[k];\n    swhere = swhere + andbit + k + `= ${value2String(v)} `;\n    andbit = ' AND ';\n  }\n\n  src = src + ' ' + swhere + ';run;';\n  const asrc = src.split(/\\r?\\n/); // TBD: switch to computeRun on next pass\n\n  const p = {\n    data: {\n      code: asrc\n    }\n  };\n  const job = await store.apiCall(session.links('execute'), p);\n  const qs = {\n    qs: {\n      newState: 'Completed',\n      timeout: 1\n    }\n  };\n  const status = await store.jobState(job, qs);\n  const c = status.data === 'completed' ? 0 : 1;\n  return {\n    statusCode: c,\n    msg: status.data\n  };\n}\n\nfunction value2String(value) {\n  let valueString;\n\n  if (value == null) {\n    valueString = '.';\n  } else if (typeof value === 'string') {\n    valueString = JSON.stringify(value);\n  } else {\n    valueString = value.toString();\n  }\n\n  return valueString;\n}\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (updateTableRows);\n\n//# sourceURL=webpack://restafedit/./updateTableRows.js?");

/***/ }),

/***/ "./uploadData.js":
/*!***********************!*\
  !*** ./uploadData.js ***!
  \***********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sassoftware/restaflib */ \"@sassoftware/restaflib\");\n/* harmony import */ var _sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__);\n/* eslint-disable no-tabs */\n\n/*\r\n * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\r\n * SPDX-License-Identifier: Apache-2.0\r\n */\n\n/**\r\n * @description Upload client data to a new table on server\r\n * @async\r\n * @module uploadData\r\n * @category restafedit/core\r\n * @param {object} output table\r\n * @param {array}  data if null, data from appEnv.state will be uploded.\r\n * @param {array}  drop fields to drop from the output\r\n * @param {object} addon columns additional columns(useful for adding key fields)\r\n * @param {appEnv} appEnv   - app Environment from setup\r\n * @returns {promise}       - {an array of unique values }\r\n * @example\r\n *  await uploadData(outputTable, data, drop, {},appEnv)\r\n *  This is useful to get a list of unique values for selected columns.\r\n *  {company:['IBM', 'Microsoft', 'SAS'] }\r\n */\n\nasync function uploadData(table, data, drop, addon, appEnv, masterTable, saveFlag) {\n  const {\n    store,\n    session\n  } = appEnv; // eslint-disable-next-line prefer-const\n\n  if (data === null) {\n    data = appEnv.state.data;\n  }\n\n  ;\n  const t = Object.keys(data[0]);\n  let dropArray = ['_index_', '_rowIndex'];\n\n  if (drop !== null) {\n    dropArray = dropArray.concat(drop);\n  }\n\n  const columns = t.filter(c => {\n    return !(dropArray.indexOf(c) >= 0);\n  });\n  const tempCols = {};\n  columns.forEach(k => {\n    tempCols[k] = appEnv.state.columns[k];\n  });\n  let csvArray = null;\n\n  if (appEnv.source === 'cas') {\n    csvArray = columns.join(',') + '\\n';\n  }\n\n  ;\n\n  for (let i = 0; i < data.length; i++) {\n    let temp = data[i];\n    temp = { ...temp,\n      ...addon\n    };\n    const valArray = [];\n    columns.forEach((c, l) => {\n      let v = temp[c];\n\n      if (typeof v === 'string') {\n        v = v.trim();\n      }\n\n      valArray[l] = v;\n    });\n\n    if (csvArray === null) {\n      csvArray = valArray.join(',') + '\\n';\n    } else {\n      csvArray = csvArray + valArray.join(',') + '\\n';\n    }\n  }\n\n  let result;\n\n  if (appEnv.source === 'cas') {\n    result = await _casTableUpload(store, session, table, csvArray, masterTable, saveFlag);\n  } else {\n    result = await _computeUpload(store, session, tempCols, table, csvArray);\n  }\n\n  return result;\n} // TBD: switch to a datastep with arrays for each column. More reliable\n\n\nasync function _computeUpload(store, session, columns, table, csvArray) {\n  let src = `data ${table.libref}.${table.name}; INFILE datalines delimiter=',' ;\\n`;\n  let l = '';\n  let inx = 'INPUT ';\n\n  for (const k in columns) {\n    const c = columns[k];\n    inx = inx + c.Column + ' ';\n\n    if (c.Type === 'CHAR') {\n      const x = ` ${c.Column} $ ${c.length} \\n`;\n      l = l + ' ' + x;\n    }\n  }\n\n  if (l.length > 0) {\n    l = 'LENGTH ' + l + ';\\n';\n  }\n\n  ;\n  inx = inx + ';\\n';\n  src = src + ';\\n' + l + inx + 'datalines;\\n' + csvArray + '\\n; run; proc print;run;\\n';\n  await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"computeRun\"])(store, session, src);\n  return {\n    msg: 'done',\n    statusCode: 0\n  };\n}\n\nasync function _casTableUpload(store, session, table, csvArray, masterTable, saveFlag) {\n  const t = `${table.caslib}.${table.name}`;\n  let r = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"casUpload\"])(store, session, null, t, true, csvArray);\n\n  if (masterTable != null) {\n    r = await Object(_sassoftware_restaflib__WEBPACK_IMPORTED_MODULE_0__[\"casAppendTable\"])(store, session, table, masterTable, saveFlag);\n    return r;\n  } else {\n    return r;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (uploadData);\n\n//# sourceURL=webpack://restafedit/./uploadData.js?");

/***/ }),

/***/ 0:
/*!*********************!*\
  !*** multi ./index ***!
  \*********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! C:\\restafedit\\src/index */\"./index.js\");\n\n\n//# sourceURL=webpack://restafedit/multi_./index?");

/***/ }),

/***/ "@sassoftware/restaf":
/*!**************************************!*\
  !*** external "@sassoftware/restaf" ***!
  \**************************************/
/*! no static exports found */
/*! exports used: initStore */
/***/ (function(module, exports) {

eval("module.exports = require(\"@sassoftware/restaf\");\n\n//# sourceURL=webpack://restafedit/external_%22@sassoftware/restaf%22?");

/***/ }),

/***/ "@sassoftware/restaflib":
/*!*****************************************!*\
  !*** external "@sassoftware/restaflib" ***!
  \*****************************************/
/*! no static exports found */
/*! exports used: casAppendTable, casFetchRows, casSaveTable, casSetup, casUpdateData, casUpload, caslRun, computeFetchData, computeRun, computeSetup, computeSetupTables */
/***/ (function(module, exports) {

eval("module.exports = require(\"@sassoftware/restaflib\");\n\n//# sourceURL=webpack://restafedit/external_%22@sassoftware/restaflib%22?");

/***/ })

/******/ });
});