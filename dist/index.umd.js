!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@sassoftware/restaflib"),require("@sassoftware/restaf"),require("deepmerge")):"function"==typeof define&&define.amd?define(["exports","@sassoftware/restaflib","@sassoftware/restaf","deepmerge"],t):t((e||self).restafedit={},e.restaflib,e.restaf,e.deepmerge)}(this,function(e,t,n,r){function o(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var s=/*#__PURE__*/o(r);function a(){return a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a.apply(this,arguments)}var u=function(e,t,n,r){try{var o=r.appControl.editControl.handlers;return null==o[e]?Promise.resolve([t,{statusCode:0,msg:null}]):Promise.resolve(o[e](t,n,r,e)).then(function(e){return[e[0],e[1]]})}catch(e){return Promise.reject(e)}},i=function(e,n){try{var r,o="cas"===n.source?Promise.resolve(function(e,n){try{var r=n.store,o=n.session,s=n.appControl,a=s.table,u=s.byvars,i=n.state.columns;if(null===u||0===u.length)return Promise.resolve(null);var l={};for(var c in e)"_index_"!==c&&"_rowIndex"!==c&&!1===i[c].custom&&(l[c]=e[c]);var f={};return u.forEach(function(e){f[e]=l[e]}),Promise.resolve(t.casUpdateData(r,o,{table:a,data:l,where:f})).then(function(e){var t={statusCode:0,msg:"Save successful"};return"Normal"!==e.items().toJS().disposition.severity&&(t.statusCode=2,t.msg=l.disposition.severity.reason),t})}catch(e){return Promise.reject(e)}}(e,n)).then(function(e){r=e}):Promise.resolve(function(e,t){try{var n=t.store,r=t.session,o=t.appControl,s=o.table,a=o.byvars,u=t.state.columns;if(null===a||0===a.length)return Promise.resolve(null);var i="proc sql; update "+s.libref+"."+s.name,c="SET ",f=" ";for(var m in e)!1===u[m].custom&&(c=c+f+m+"="+l(e[m])),f=", ";i=i+" "+c;var h=" WHERE ",v=" ";a.forEach(function(t){h=h+v+t+"="+l(e[t]),v="AND "});var d={data:{code:(i=i+" "+h+";run;").split(/\r?\n/)}};return Promise.resolve(n.apiCall(r.links("execute"),d)).then(function(e){return Promise.resolve(n.jobState(e,{qs:{newState:"Completed",timeout:1}})).then(function(e){return{statusCode:"completed"===e.data?0:1,msg:e.data}})})}catch(e){return Promise.reject(e)}}(e,n)).then(function(e){r=e});return Promise.resolve(o&&o.then?o.then(function(){return r}):r)}catch(e){return Promise.reject(e)}};function l(e){return null==e?".":"string"==typeof e?JSON.stringify(e):e.toString()}function c(e,t,n){if(!e.s){if(n instanceof m){if(!n.s)return void(n.o=c.bind(null,e,t));1&t&&(t=n.s),n=n.v}if(n&&n.then)return void n.then(c.bind(null,e,t),c.bind(null,e,2));e.s=t,e.v=n;var r=e.o;r&&r(e)}}var f=function(e,t){try{var n=function(){var e={};if(r.forEach(function(t,n){var r=t.Column.toLowerCase();t.name=r,t.Label=null==t.Label||0===t.Label.length?t.Column:t.Label,null==t.Type&&(t.Type=null==t.type?"double":t.type),t.custom=!1,e[r]=t}),null!=s)for(var t in s){var n=a({},s[t]);n.name=t,n.custom=!0,e[t]=n}return{columns:e,data:l,status:i}},r=e.schema,o=e.rows,s=t.appControl.customColumns,i={statusCode:0,msg:"Initialization was successful"},l=[],f=(h=o,v=function(e){var n=function(e,t,n){console.log(n);var r={_rowIndex:n};if(t.forEach(function(t,n){var o=e[n].Column.toLowerCase();r[o]=t}),null!=s)for(var o in s){var a=s[o],u=a.Column.toLowerCase();r[u]=a.value}return console.log(r),r}(r,o[e],e);return Promise.resolve(u("init",n,e,t)).then(function(e){i=e[1],l.push(e[0])})},P=-1,function e(t){try{for(;++P<h.length;)if((t=v(P))&&t.then){if(!((n=t)instanceof m&&1&n.s))return void t.then(e,p||(p=c.bind(null,d=new m,2)));t=t.v}d?c(d,1,t):d=t}catch(e){c(d||(d=new m),2,e)}var n}(),d);return Promise.resolve(f&&f.then?f.then(n):n())}catch(e){return Promise.reject(e)}var h,v,d,p,P};const m=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(t,n){const r=new e,o=this.s;if(o){const e=1&o?t:n;if(e){try{c(r,1,e(this.v))}catch(e){c(r,2,e)}return r}return this}return this.o=function(e){try{const o=e.v;1&e.s?c(r,1,t?t(o):o):n?c(r,1,n(o)):c(r,2,o)}catch(e){c(r,2,e)}},r},e}();e.cellEdit=function(e,t,n,r,o){try{var s,l=function(e){return s?e:Promise.resolve(u("main",c,n,o)).then(function(e){var t;function s(n){return t?n:(c=e[0],!0===o.appControl.cachePolicy&&(o.state.data[r._rowIndex]=c),{data:c,status:v})}var a=function(){if(!0===h)return Promise.resolve(u("term",e[0],n,o)).then(function(n){return 2===(v=(e=n)[1]).statusCode?(t=1,{data:e[0],status:v}):Promise.resolve(i(e[0],o)).then(function(e){v=e})})}();return a&&a.then?a.then(s):s(a)})},c=a({},r),f=o.appControl.editControl,m=f.handlers,h=f.autoSave;c[e]=function(e,t){var n=e,r=t.Type.toLowerCase();return"string"!=typeof n||"decimal"!==r&&"number"!==r&&"double"!==r&&"float"!==r||(n=parseFloat(1*e),!0===isNaN(e)&&(e=0)),n}(t,o.state.columns[e]);var v={statusCode:0,msg:""},d=function(){if(null!=m[e])return Promise.resolve(m[e](c,e,n,o)).then(function(e){if(c=e[0],2===(v=e[1]).statusCode)return s=1,{data:e[0],status:v}})}();return Promise.resolve(d&&d.then?d.then(l):l(d))}catch(e){return Promise.reject(e)}},e.commonHandler=u,e.distinctValues=function(e,n,r){try{var o,s="cas"===n.source?Promise.resolve(function(e,n,r){try{return Promise.resolve(t.caslRun(n.store,n.session,"\n  results = selectionLists(_args_.column,_args_.table.caslib, _args_.table.name);\n  send_response({casResults = {data=results}});\n  ",{table:n.appControl.table,column:e},!0)).then(function(e){if(0!==e.results.casResults.data.statusCode)throw"Failed to create unique list";return e.results.casResults.data.data})}catch(e){return Promise.reject(e)}}(e,n)).then(function(e){o=e}):Promise.resolve(function(e,t,n){try{var r={};return r[e]=[],Promise.resolve(r)}catch(e){return Promise.reject(e)}}(e)).then(function(e){o=e});return Promise.resolve(s&&s.then?s.then(function(){return o}):o)}catch(e){return Promise.reject(e)}},e.fetchTableRows=function(e,n){try{var r=null,o="cas"===n.source?Promise.resolve(function(e,n){try{var r=n.store,o=n.session,s=a({},e);return s.from<=0||-1===s.next?Promise.resolve(null):(null==s.where&&(s.where=" "),Promise.resolve(t.casFetchRows(r,o,s)).then(function(e){var t=null,r=function(){if(null!==e)return Promise.resolve(f(e.data,n)).then(function(r){t=r,n.state={modified:[],pagination:a({},e.pagination),currentPage:s,data:[],columns:[]},!0===n.appControl.cachePolicy&&(n.state.data=t.data,n.state.columns=t.columns),t.pagination=a({},e.pagination)})}();return r&&r.then?r.then(function(){return t}):t}))}catch(e){return Promise.reject(e)}}(e,n)).then(function(e){r=e}):Promise.resolve(function(e,n){try{var r=n.store,o=n.tableSummary,s=n.appControl.table,a=(s.libref+"."+s.name).toLowerCase();return Promise.resolve(t.computeFetchData(r,o,a,null,{qs:{start:e.from-1,limit:e.count,format:null==e.format&&e.format}})).then(function(e){var t=null,r=function(){if(null!==e)return Promise.resolve(f(e,n)).then(function(e){n.state={modified:[],pagination:{},currentPage:{},data:(t=e).data,columns:t.columns}})}();return r&&r.then?r.then(function(){return t}):t})}catch(e){return Promise.reject(e)}}(e,n)).then(function(e){r=e});return Promise.resolve(o&&o.then?o.then(function(){return r}):r)}catch(e){return Promise.reject(e)}},e.scrollTable=function(e,n,r){try{var o,s="cas"===n.source?Promise.resolve(function(e,n,r){try{var o,s=n.store,u=n.session,i=n.appControl,l=i.table;if("first"===e)o=a({},i.initialFetch);else if(null!==e&&(-1===(o=a({},n.state.pagination[e])).next||o.from<=0))return Promise.resolve(null);return null!=r&&(o=a({},r)),o.table=l,Promise.resolve(t.casFetchRows(s,u,o)).then(function(e){var t=null;return function(){if(null!==e)return Promise.resolve(f(e.data,n)).then(function(r){return t=r,n.state={modified:[],pagination:a({},e.pagination),currentPage:o,data:[],columns:[]},!0===n.appControl.cachePolicy&&(n.state.data=t.data,n.state.columns=t.columns),t.pagination=a({},e.pagination),t})}()})}catch(e){return Promise.reject(e)}}(e,n,r)).then(function(e){o=e}):Promise.resolve(function(e,n,r){try{var o=n.store,s=n.tableSummary,u=n.appControl,i=u.table,l=u.initialFetch,c=null,m=(i.libref+"."+i.name).toLowerCase();return null==r?"first"===e&&(c=a({},l)):c=a({},r),Promise.resolve(t.computeFetchData(o,s,m,e,c)).then(function(e){var t=null,r=function(){if(null!==e)return Promise.resolve(f(e,n)).then(function(e){n.state={modified:[],pagination:{},currentPage:{},data:(t=e).data,columns:t.columns}})}();return r&&r.then?r.then(function(){return t}):t})}catch(e){return Promise.reject(e)}}(e,n,r)).then(function(e){o=e});return Promise.resolve(s&&s.then?s.then(function(){return o}):o)}catch(e){return Promise.reject(e)}},e.setup=function(e,r,o){try{var a,u=n.initStore();null==e.authType&&(e.authType="code");var i="cas"===r.source?Promise.resolve(function(e,n,r){try{return Promise.resolve(t.casSetup(e,n)).then(function(t){return{source:r.source,store:e,session:t.session,servers:t.servers,restaflib:null,logonPayload:n,appControl:r,state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}},id:Date()}})}catch(e){return Promise.reject(e)}}(u,e,r)).then(function(e){a=e}):Promise.resolve(function(e,n,r,o){try{return Promise.resolve(t.computeSetup(e,r.computeContext,n)).then(function(a){return Promise.resolve(t.computeSetupTables(e,a,r.table,o)).then(function(t){return{source:r.source,store:e,session:a,tableSummary:t,servers:null,restaflib:null,logonPayload:n,appControl:s.default(r),state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}},id:Date()}})})}catch(e){return Promise.reject(e)}}(u,e,r,o)).then(function(e){a=e});return Promise.resolve(i&&i.then?i.then(function(){return a}):a)}catch(e){return Promise.reject(e)}},e.sort=function(e,t,n){return Promise.resolve([])},e.updateTableRows=i});
//# sourceMappingURL=index.umd.js.map