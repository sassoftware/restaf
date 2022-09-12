var e=require("@sassoftware/restaflib"),n=require("@sassoftware/restaf");function t(){return t=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},t.apply(this,arguments)}var r=function(e,n,t,r){try{var o=r.appControl.editControl.handlers;return null==o[e]?Promise.resolve([n,{statusCode:0,msg:null}]):Promise.resolve(o[e](n,t,r,e)).then(function(e){return[e[0],e[1]]})}catch(e){return Promise.reject(e)}};function o(e,n,t){if(!e.s){if(t instanceof i){if(!t.s)return void(t.o=o.bind(null,e,n));1&n&&(n=t.s),t=t.v}if(t&&t.then)return void t.then(o.bind(null,e,n),o.bind(null,e,2));e.s=n,e.v=t;var r=e.o;r&&r(e)}}var s=function(e,n,t){try{var r=t.data,o=t.table,s=t.where,i="proc sql; update "+o.libref+"."+o.name,a="SET ",u=" ";for(var c in r)a=a+u+c+"="+l(r[c]),u=", ";i=i+" "+a;var f=" WHERE ",h=" ";for(var v in s)f=f+h+v+"= "+l(s[v])+" ",h=" AND ";var m={data:{code:(i=i+" "+f+";run;").split(/\r?\n/)}};return Promise.resolve(e.apiCall(n.links("execute"),m)).then(function(n){return Promise.resolve(e.jobState(n,{qs:{newState:"Completed",timeout:1}})).then(function(e){return{statusCode:"completed"===e.data?0:1,msg:e.data}})})}catch(e){return Promise.reject(e)}};const i=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(n,t){const r=new e,s=this.s;if(s){const e=1&s?n:t;if(e){try{o(r,1,e(this.v))}catch(e){o(r,2,e)}return r}return this}return this.o=function(e){try{const s=e.v;1&e.s?o(r,1,n?n(s):s):t?o(r,1,t(s)):o(r,2,s)}catch(e){o(r,2,e)}},r},e}();var a=function(n,t){try{var r=t.store,o=t.session,i="cas"===t.source?e.casUpdateData:s,a=function(e,n){var t=n.appControl,r=t.table,o=t.byvars,s=n.state.columns,i={};for(var a in e)"_index_"!==a&&"_rowIndex"!==a&&!1===s[a].custom&&(i[a]=e[a]);var u={};return o.forEach(function(e){u[e]=i[e]}),{table:r,data:i,where:u}}(n,t);return Promise.resolve(i(r,o,a))}catch(e){return Promise.reject(e)}},u=function(e,n){try{var t,r=n.appControl.byvars;if(null===r||0===r.length)return Promise.resolve([null,{msg:"Error: Please specify a by variable",statusCode:1}]);var s=function(){if(!0!==Array.isArray(e))return Promise.resolve(a(e,n)).then(function(e){t=e});var r,s,u,l,c,f=(r=e,s=function(r){return Promise.resolve(a(e[r],n)).then(function(e){t=e})},c=-1,function e(n){try{for(;++c<r.length;)if((n=s(c))&&n.then){if(!((t=n)instanceof i&&1&t.s))return void n.then(e,l||(l=o.bind(null,u=new i,2)));n=n.v}u?o(u,1,n):u=n}catch(e){o(u||(u=new i),2,e)}var t}(),u);return f&&f.then?f.then(function(){}):void 0}();return Promise.resolve(s&&s.then?s.then(function(){return t}):t)}catch(e){return Promise.reject(e)}};function l(e){return null==e?".":"string"==typeof e?JSON.stringify(e):e.toString()}function c(e,n,t){if(!e.s){if(t instanceof h){if(!t.s)return void(t.o=c.bind(null,e,n));1&n&&(n=t.s),t=t.v}if(t&&t.then)return void t.then(c.bind(null,e,n),c.bind(null,e,2));e.s=n,e.v=t;var r=e.o;r&&r(e)}}var f=function(e,n){try{var o=function(){var e={};if(s.forEach(function(n,t){var r=n.Column.toLowerCase();n.name=r,n.Label=null==n.Label||0===n.Label.length?n.Column:n.Label,null==n.Type&&(n.Type=null==n.type?"double":n.type),n.custom=!1,e[r]=n}),null!=a)for(var n in a){var r=t({},a[n]);r.name=n,r.custom=!0,e[n]=r}return{columns:e,data:l,status:u}},s=e.schema,i=e.rows,a=n.appControl.customColumns,u={statusCode:0,msg:"Initialization was successful"},l=[],f=(v=i,m=function(e){var t=function(e,n,t){var r={_rowIndex:t};if(n.forEach(function(n,t){var o=e[t].Column.toLowerCase();r[o]=n}),null!=a)for(var o in a){var s=a[o],i=s.Column.toLowerCase();r[i]=s.value}return r}(s,i[e],e);return Promise.resolve(r("init",t,e,n)).then(function(e){u=e[1],l.push(e[0])})},P=-1,function e(n){try{for(;++P<v.length;)if((n=m(P))&&n.then){if(!((t=n)instanceof h&&1&t.s))return void n.then(e,p||(p=c.bind(null,d=new h,2)));n=n.v}d?c(d,1,n):d=n}catch(e){c(d||(d=new h),2,e)}var t}(),d);return Promise.resolve(f&&f.then?f.then(o):o())}catch(e){return Promise.reject(e)}var v,m,d,p,P};const h=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(n,t){const r=new e,o=this.s;if(o){const e=1&o?n:t;if(e){try{c(r,1,e(this.v))}catch(e){c(r,2,e)}return r}return this}return this.o=function(e){try{const o=e.v;1&e.s?c(r,1,n?n(o):o):t?c(r,1,t(o)):c(r,2,o)}catch(e){c(r,2,e)}},r},e}();function v(e,n,t){if(!e.s){if(t instanceof m){if(!t.s)return void(t.o=v.bind(null,e,n));1&n&&(n=t.s),t=t.v}if(t&&t.then)return void t.then(v.bind(null,e,n),v.bind(null,e,2));e.s=n,e.v=t;var r=e.o;r&&r(e)}}const m=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(n,t){const r=new e,o=this.s;if(o){const e=1&o?n:t;if(e){try{v(r,1,e(this.v))}catch(e){v(r,2,e)}return r}return this}return this.o=function(e){try{const o=e.v;1&e.s?v(r,1,n?n(o):o):t?v(r,1,t(o)):v(r,2,o)}catch(e){v(r,2,e)}},r},e}();function d(e){return e instanceof m&&1&e.s}exports.cellEdit=function(e,n,o,s,i){try{var a,l=function(e){return a?e:Promise.resolve(r("main",c,o,i)).then(function(e){var n;function t(t){return n?t:(c=e[0],!0===d&&(i.state.data[s._rowIndex]=c),{data:c,status:p})}var a=function(){if(!0===m)return Promise.resolve(r("term",e[0],o,i)).then(function(t){return 2===(p=(e=t)[1]).statusCode?(n=1,{data:e[0],status:p}):Promise.resolve(u(e[0],i)).then(function(e){p=e})})}();return a&&a.then?a.then(t):t(a)})},c=t({},s),f=i.appControl.editControl,h=f.handlers,v=f.autoSave,m=null==v||v,d=null==i.appControl.cachePolicy||i.appControl.cachePolicy;c[e]=function(e,n){var t=e,r=n.Type.toLowerCase();return"string"!=typeof t||"decimal"!==r&&"number"!==r&&"double"!==r&&"float"!==r||(t=parseFloat(1*e),!0===isNaN(e)&&(e=0)),t}(n,i.state.columns[e]);var p={statusCode:0,msg:""},P=function(){if(null!=h[e])return Promise.resolve(h[e](c,e,o,i)).then(function(e){if(c=e[0],2===(p=e[1]).statusCode)return a=1,{data:e[0],status:p}})}();return Promise.resolve(P&&P.then?P.then(l):l(P))}catch(e){return Promise.reject(e)}},exports.commonHandler=r,exports.distinctValues=function(n,t,r){try{var o,s=null!=r?r:t.appControl.table,i="cas"===t.source?Promise.resolve(function(n,t,r){try{return Promise.resolve(e.caslRun(r.store,r.session,"\n  results = selectionLists(_args_.column,_args_.table.caslib, _args_.table.name);\n  send_response({casResults = {data=results}});\n  ",{table:n,column:t},!0)).then(function(e){if(0!==e.results.casResults.data.statusCode)throw"Failed to create unique list";return e.results.casResults.data.data})}catch(e){return Promise.reject(e)}}(s,n,t)).then(function(e){o=e}):Promise.resolve(function(n,t,r){try{var o=r.store;return Promise.resolve(e.computeRun(o,r.session,"\n    PROC SQL;\n    CREATE TABLE WORK.QUERY\n    AS\n    SELECT distinct("+t+") as utype FROM "+n.libref+"."+n.name+";\n   QUIT;")).then(function(n){function r(){return i[t]=u,i}var s,i={},a="first",u=[],l=function(e,n){var t;do{var r=e();if(r&&r.then){if(!d(r)){t=!0;break}r=r.v}var o=n();if(d(o)&&(o=o.v),!o)return r}while(!o.then);var s=new m,i=v.bind(null,s,2);return(t?r.then(a):o.then(u)).then(void 0,i),s;function a(t){for(r=t;d(o=n())&&(o=o.v),o;){if(o.then)return void o.then(u).then(void 0,i);if((r=e())&&r.then){if(!d(r))return void r.then(a).then(void 0,i);r=r.v}}v(s,1,r)}function u(t){if(t){do{if((r=e())&&r.then){if(!d(r))return void r.then(a).then(void 0,i);r=r.v}if(d(t=n())&&(t=t.v),!t)return void v(s,1,r)}while(!t.then);t.then(u).then(void 0,i)}else v(s,1,r)}}(function(){return Promise.resolve(e.computeFetchData(o,n,"QUERY",a)).then(function(e){var n=(s=e).rows.map(function(e){return e[0]});u.push.apply(u,n),a="next"})},function(){return s.scrollOptions.indexOf("next")>=0});return l&&l.then?l.then(r):r()})}catch(e){return Promise.reject(e)}}(s,n,t)).then(function(e){o=e});return Promise.resolve(i&&i.then?i.then(function(){return o}):o)}catch(e){return Promise.reject(e)}},exports.saveTable=function(n,t){try{var r=n.store,o=n.session;return"compute"===n.source?Promise.resolve({msg:"Action does not apply to SAS 9 tables",statusCode:0}):Promise.resolve(e.casSaveTable(r,o,null!=t?t:n.appControl.table)).then(function(){return{msg:"Table saved",statusCode:0}})}catch(e){return Promise.reject(e)}},exports.scrollTable=function(n,r,o){try{var s,i="cas"===r.source?Promise.resolve(function(n,r,o){try{var s,i=r.store,a=r.session,u=r.appControl,l=u.initialFetch,c=u.table,h=null==r.appControl.cachePolicy||r.appControl.cachePolicy;if(null!=o)s=t({},o);else if("first"===n)s=t({},l);else if(null!==n&&(-1===(s=t({},r.state.pagination[n])).next||s.from<=0))return Promise.resolve(null);var v={};return null!=s.qs?((v=t({},s.qs)).from=v.start+1,v.count=v.limit):v=t({},s),v.from<=0||-1===v.next?Promise.resolve(null):(null==v.where&&(v.where=" "),v.table=c,Promise.resolve(e.casFetchRows(i,a,v)).then(function(e){var n=null;return function(){if(null!==e)return Promise.resolve(f(e.data,r)).then(function(o){return n=o,r.state={modified:[],pagination:t({},e.pagination),currentPage:s,data:[],columns:[]},!0===h&&(r.state.data=n.data,r.state.columns=n.columns),n.pagination=t({},e.pagination),n})}()}))}catch(e){return Promise.reject(e)}}(n,r,o)).then(function(e){s=e}):Promise.resolve(function(n,r,o){try{var s=r.store,i=r.tableSummary,a=r.appControl,u=a.table,l=a.initialFetch,c=null==r.appControl.cachePolicy||r.appControl.cachePolicy,h=null,v=(u.libref+"."+u.name).toLowerCase();return null==o?"first"===n&&(h=t({},l)):h=t({},o),Promise.resolve(e.computeFetchData(s,i,v,n,h)).then(function(e){var n=null,t=function(){if(null!==e)return Promise.resolve(f(e,r)).then(function(e){n=e,r.state={modified:[],pagination:{},currentPage:{},data:[],columns:[]},!0===c&&(r.state.data=n.data,r.state.columns=n.columns)})}();return t&&t.then?t.then(function(){return n}):n})}catch(e){return Promise.reject(e)}}(n,r,o)).then(function(e){s=e});return Promise.resolve(i&&i.then?i.then(function(){return s}):s)}catch(e){return Promise.reject(e)}},exports.setup=function(t,r){try{var o,s=function(){console.log(r.editControl.handlers.fseinit);var e=function(){if(null!=r.editControl.handlers.fseinit)return Promise.resolve(r.editControl.handlers.fseinit(o,"fseinit")).then(function(e){if(2===e.statusCode)throw console.log(JSON.stringify(e,null,4)),"fseinit failed. Please see console"})}();return e&&e.then?e.then(function(e){return o}):o},i=n.initStore();null==t.authType&&(t.authType="code");var a="cas"===r.source?Promise.resolve(function(n,t,r){try{return Promise.resolve(e.casSetup(n,t)).then(function(o){var s=null!=r.editControl.handlers.fseinit?null:r.preamble,i={source:r.source,store:n,session:o.session,servers:o.servers,restaflib:null,logonPayload:t,appControl:r,state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}},id:Date()},a=function(){if(null!==s)return Promise.resolve(e.caslRun(n,o.session,s)).then(function(e){if(0!==e.disposition.statusCode)throw console.log(JSON.stringify(e,null,4)),"Preamble failed. Please see console"})}();return a&&a.then?a.then(function(e){return i}):i})}catch(e){return Promise.reject(e)}}(i,t,r)).then(function(e){o=e}):Promise.resolve(function(n,t,r){try{var o=null!=r.editControl.handlers.fseinit?null:r.preamble;return Promise.resolve(e.computeSetup(n,r.computeContext,t)).then(function(s){function i(t){return Promise.resolve(e.computeSetupTables(n,s,r.table,o)).then(function(e){return a.tableSummary=e,a})}var a={source:r.source,store:n,session:s,servers:null,restaflib:null,logonPayload:t,appControl:r,state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}},id:Date()},u=function(){if(null!=r.editControl.handlers.fseinit)return Promise.resolve(r.editControl.handlers.fseinit(a,"fseinit")).then(function(e){if(2===e.statusCode)throw console.log(JSON.stringify(e,null,4)),"fseinit failed. Please see console"})}();return u&&u.then?u.then(i):i()})}catch(e){return Promise.reject(e)}}(i,t,r)).then(function(e){o=e});return Promise.resolve(a&&a.then?a.then(s):s())}catch(e){return Promise.reject(e)}},exports.termSession=async function(e,n){const{store:t,session:r}=e,o=e.appControl.editControl.handlers;return null!=o.fseterm&&await o.fseterm(e),!1!==n&&await t.apiCall(r.links("delete")),{msg:"Session terminated",statusCode:0}},exports.updateTableRows=u,exports.uploadData=function(n,r,o,s,i,a,u){try{var l=i.store,c=i.session;null===r&&(r=i.state.data);var f=Object.keys(r[0]),h=["_index_","_rowIndex"];null!==o&&(h=h.concat(o));var v=f.filter(function(e){return!(h.indexOf(e)>=0)}),m={};v.forEach(function(e){m[e]=i.state.columns[e]});var d=null;"cas"===i.source&&(d=v.join(",")+"\n");for(var p,P=function(e){var n=r[e];n=t({},n,s);var o=[];v.forEach(function(e,t){var r=n[e];"string"==typeof r&&(r=r.trim()),o[t]=r}),d=null===d?o.join(",")+"\n":d+o.join(",")+"\n"},y=0;y<r.length;y++)P(y);var b="cas"===i.source?Promise.resolve(function(n,t,r,o,s,i){try{return Promise.resolve(e.casUpload(n,t,null,r.caslib+"."+r.name,!0,o)).then(function(o){return null!=s?Promise.resolve(e.casAppendTable(n,t,r,s,i)).then(function(e){return o=e}):o})}catch(e){return Promise.reject(e)}}(l,c,n,d,a,u)).then(function(e){p=e}):Promise.resolve(function(n,t,r,o,s){try{var i="data "+o.libref+"."+o.name+"; INFILE datalines delimiter=',' ;\n",a="",u="INPUT ";for(var l in r){var c=r[l];u=u+c.Column+" ","CHAR"===c.Type&&(a=a+"  "+c.Column+" $ "+c.length+" \n")}return a.length>0&&(a="LENGTH "+a+";\n"),i=i+";\n"+a+(u+=";\n")+"datalines;\n"+s+"\n; run; proc print;run;\n",Promise.resolve(e.computeRun(n,t,i)).then(function(){return{msg:"done",statusCode:0}})}catch(e){return Promise.reject(e)}}(l,c,m,n,d)).then(function(e){p=e});return Promise.resolve(b&&b.then?b.then(function(){return p}):p)}catch(e){return Promise.reject(e)}};
//# sourceMappingURL=index.js.map
