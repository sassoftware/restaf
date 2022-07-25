import { casUpdateData, casFetchRows, casSetup } from '@sassoftware/restaflib';
import { initStore } from '@sassoftware/restaf';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function text2Float(value, f) {
  var svalue = value;

  if (typeof svalue === 'string' && (f.Type === 'decimal' || f.Type === 'number' || f.Type === 'double')) {
    svalue = parseFloat(value * 1.0);

    if (isNaN(value) === true) {
      value = 0;
    }
  }

  return svalue;
}

var commonHandler = function commonHandler(type, data, rowIndex, appEnv) {
  try {
    var handlers = appEnv.appControl.editControl.handlers;

    if (handlers[type] == null) {
      return Promise.resolve([data, {
        status: 0,
        msg: null
      }]);
    } else {
      return Promise.resolve(handlers[type](data, rowIndex, appEnv, type)).then(function (_ref) {
        var newDataRow = _ref[0],
            status = _ref[1];
        return [newDataRow, status];
      });
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

var updateTableRows = function updateTableRows(data, appEnv) {
  try {
    var store = appEnv.store,
        session = appEnv.session;
    var _appEnv$appControl$da = appEnv.appControl.dataControl,
        table = _appEnv$appControl$da.table,
        byvars = _appEnv$appControl$da.byvars;
    var columns = appEnv.state.columns;

    if (byvars === null || byvars.length === 0) {
      return Promise.resolve();
    }

    var t = {};

    for (var k in data) {
      if (k !== '_index_' && columns[k].custom === false) {
        t[k] = data[k];
      }

      ;
    }

    ;
    var w = {};
    byvars.forEach(function (k) {
      w[k] = t[k];
    });
    var payload = {
      table: table,
      data: t,
      where: w
    };
    return Promise.resolve(casUpdateData(store, session, payload));
  } catch (e) {
    return Promise.reject(e);
  }
};

var cellEdit = function cellEdit(name, value, rowIndex, data, appEnv) {
  try {
    var _temp5 = function _temp5() {
      return Promise.resolve(commonHandler("main", newDataRow, rowIndex, appEnv)).then(function (r) {
        function _temp2() {
          return {
            data: newDataRow,
            status: status
          };
        }

        newDataRow = r[0];
        status.msg = status.msg + ' / ' + r[1];

        if (appEnv.appControl.dataControl.cachePolicy === true) {
          appEnv.state.data[rowIndex] = newDataRow;
        }

        var _temp = function () {
          if (autoSave === true) {
            return Promise.resolve(updateTableRows(newDataRow, appEnv)).then(function () {});
          }
        }();

        return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
      });
    };

    var newDataRow = data !== null ? _extends({}, data) : _extends({}, appEnv.state.data[rowIndex]);
    var columns = appEnv.state.columns;
    var _appEnv$appControl$ed = appEnv.appControl.editControl,
        handlers = _appEnv$appControl$ed.handlers,
        autoSave = _appEnv$appControl$ed.autoSave;
    newDataRow[name] = text2Float(value, columns[name]);
    var status = {
      status: 0,
      msg: ''
    };

    var _temp6 = function () {
      if (handlers[name] != null) {
        return Promise.resolve(handlers[name](newDataRow, name, rowIndex, appEnv)).then(function (r) {
          newDataRow = r[0];
          status = r[1];
        });
      }
    }();

    return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(_temp5) : _temp5(_temp6));
  } catch (e) {
    return Promise.reject(e);
  }
};

// A type of promise-like that resolves synchronously and supports only one observer
const _Pact = /*#__PURE__*/(function() {
	function _Pact() {}
	_Pact.prototype.then = function(onFulfilled, onRejected) {
		const result = new _Pact();
		const state = this.s;
		if (state) {
			const callback = state & 1 ? onFulfilled : onRejected;
			if (callback) {
				try {
					_settle(result, 1, callback(this.v));
				} catch (e) {
					_settle(result, 2, e);
				}
				return result;
			} else {
				return this;
			}
		}
		this.o = function(_this) {
			try {
				const value = _this.v;
				if (_this.s & 1) {
					_settle(result, 1, onFulfilled ? onFulfilled(value) : value);
				} else if (onRejected) {
					_settle(result, 1, onRejected(value));
				} else {
					_settle(result, 2, value);
				}
			} catch (e) {
				_settle(result, 2, e);
			}
		};
		return result;
	};
	return _Pact;
})();

// Settles a pact synchronously
function _settle(pact, state, value) {
	if (!pact.s) {
		if (value instanceof _Pact) {
			if (value.s) {
				if (state & 1) {
					state = value.s;
				}
				value = value.v;
			} else {
				value.o = _settle.bind(null, pact, state);
				return;
			}
		}
		if (value && value.then) {
			value.then(_settle.bind(null, pact, state), _settle.bind(null, pact, 2));
			return;
		}
		pact.s = state;
		pact.v = value;
		const observer = pact.o;
		if (observer) {
			observer(pact);
		}
	}
}

function _isSettledPact(thenable) {
	return thenable instanceof _Pact && thenable.s & 1;
}

// Asynchronously iterate through an object that has a length property, passing the index as the first argument to the callback (even as the length property changes)
function _forTo(array, body, check) {
	var i = -1, pact, reject;
	function _cycle(result) {
		try {
			while (++i < array.length && (!check || !check())) {
				result = body(i);
				if (result && result.then) {
					if (_isSettledPact(result)) {
						result = result.v;
					} else {
						result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
						return;
					}
				}
			}
			if (pact) {
				_settle(pact, 1, result);
			} else {
				pact = result;
			}
		} catch (e) {
			_settle(pact || (pact = new _Pact()), 2, e);
		}
	}
	_cycle();
	return pact;
}

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

var prepFormData = function prepFormData(result, appEnv) {
  try {
    var _temp3 = function _temp3() {
      var eColumns = {};
      schema.forEach(function (s, i) {
        var name = s.Column.toLowerCase();
        s.name = name;
        s.Label = s.Label == null || s.Label.length === 0 ? s.Column : s.Label;
        s.custom = false;
        eColumns[name] = s;
      });

      if (customColumns != null) {
        for (var k in customColumns) {
          var c = _extends({}, customColumns[k]);

          c.name = k;
          c.custom = true;
          eColumns[k] = c;
        }
      }

      return {
        columns: eColumns,
        data: newRows
      };
    };

    var schema = result.schema,
        rows = result.rows;
    var customColumns = appEnv.appControl.dataControl.customColumns;

    var makeRowObject = function makeRowObject(columns, row) {
      var rowObj = {};
      row.forEach(function (r, i) {
        var s = columns[i];
        var name = s.Column.toLowerCase();

        if (s.Label == null) {
          s.Label = s.Column;
        }

        rowObj[name] = r;
      });

      if (customColumns != null) {
        for (var k in customColumns) {
          var c = customColumns[k];
          var name = c.Column.toLowerCase();
          rowObj[name] = c.value;
        }
      }

      return rowObj;
    };

    var newRows = [];

    var _temp4 = _forTo(rows, function (i) {
      var t = makeRowObject(schema, rows[i]);
      return Promise.resolve(commonHandler('init', t, i, appEnv)).then(function (_ref) {
        var t1 = _ref[0],
            status = _ref[1];

        if (status.code !== 0) {
          console.log(JSON.stringify(status, null, 4));
        }

        newRows.push(t1);
      });
    });

    return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
  } catch (e) {
    return Promise.reject(e);
  }
};

var fetchTableRows = function fetchTableRows(control, appEnv) {
  try {
    var store = appEnv.store,
        session = appEnv.session;

    var c = _extends({}, control);

    if (c.table == null) {
      c.table = appEnv.appControl.dataControl.table;
    }

    if (c.where == null) {
      c.where = {};
    }

    if (c.from <= 0 || c.next === -1) {
      return Promise.resolve(null);
    }

    return Promise.resolve(casFetchRows(store, session, c)).then(function (r) {
      return Promise.resolve(prepFormData(r.data, appEnv)).then(function (t) {
        appEnv.state = {
          modified: [],
          pagination: _extends({}, r.pagination),
          currentPage: c,
          data: [],
          columns: []
        };

        if (appEnv.appControl.dataControl.cachePolicy === true) {
          appEnv.state.data = t.data;
          appEnv.state.columns = t.columns;
        }

        t.pagination = _extends({}, r.pagination);
        return t;
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

var scrollTable = function scrollTable(direction, appEnv) {
  try {
    var _appEnv$appControl$da = appEnv.appControl.dataControl,
        initialFetch = _appEnv$appControl$da.initialFetch,
        table = _appEnv$appControl$da.table;
    var control;

    if (direction === 'first') {
      control = _extends({}, initialFetch);
      control.table = table;
    } else {
      control = appEnv.state.pagination[direction];

      if (control.next === -1) {
        return Promise.resolve(null);
      }
    }

    console.log(control);
    return Promise.resolve(fetchTableRows(control, appEnv));
  } catch (e) {
    return Promise.reject(e);
  }
};

var setup = function setup(logonPayload, appControl) {
  try {
    var store = initStore();

    if (logonPayload.authType == null) {
      logonPayload.authType = 'code';
    }

    return Promise.resolve(casSetup(store, logonPayload)).then(function (r) {
      var appEnv = {
        store: store,
        session: r.session,
        servers: r.servers,
        restaflib: null,
        logonPayload: logonPayload,
        state: {
          modified: [],
          pagination: {},
          currentPage: {},
          data: {},
          columns: {}
        }
      };
      appEnv.appControl = appControl;
      appEnv.id = Date();
      return appEnv;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

var index = {
  cellEdit: cellEdit,
  commonHandler: commonHandler,
  fetchTableRows: fetchTableRows,
  scrollTable: scrollTable,
  updateTableRows: updateTableRows,
  setup: setup
};

export default index;
//# sourceMappingURL=index.modern.js.map
