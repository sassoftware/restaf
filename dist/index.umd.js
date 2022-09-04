!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@sassoftware/restaflib"),require("@sassoftware/restaf")):"function"==typeof define&&define.amd?define(["exports","@sassoftware/restaflib","@sassoftware/restaf"],t):t((e||self).restafedit={},e.restaflib,e.restaf)}(this,function(e,t,n){function r(){return r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},r.apply(this,arguments)}var o=function(e,t,n,r){try{var o=r.appControl.editControl.handlers;return null==o[e]?Promise.resolve([t,{statusCode:0,msg:null}]):Promise.resolve(o[e](t,n,r,e)).then(function(e){return[e[0],e[1]]})}catch(e){return Promise.reject(e)}};function s(e,t,n){if(!e.s){if(n instanceof i){if(!n.s)return void(n.o=s.bind(null,e,t));1&t&&(t=n.s),n=n.v}if(n&&n.then)return void n.then(s.bind(null,e,t),s.bind(null,e,2));e.s=t,e.v=n;var r=e.o;r&&r(e)}}var a=function(e,t,n){try{var r=n.data,o=n.table,s=n.where,a="proc sql; update "+o.libref+"."+o.name,i="SET ",u=" ";for(var c in r)i=i+u+c+"="+l(r[c]),u=", ";a=a+" "+i;var f=" WHERE ",m=" ";for(var h in s)f=f+m+h+"= "+l(s[h])+" ",m=" AND ";var v={data:{code:(a=a+" "+f+";run;").split(/\r?\n/)}};return Promise.resolve(e.apiCall(t.links("execute"),v)).then(function(t){return Promise.resolve(e.jobState(t,{qs:{newState:"Completed",timeout:1}})).then(function(e){return{statusCode:"completed"===e.data?0:1,msg:e.data}})})}catch(e){return Promise.reject(e)}};const i=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(t,n){const r=new e,o=this.s;if(o){const e=1&o?t:n;if(e){try{s(r,1,e(this.v))}catch(e){s(r,2,e)}return r}return this}return this.o=function(e){try{const o=e.v;1&e.s?s(r,1,t?t(o):o):n?s(r,1,n(o)):s(r,2,o)}catch(e){s(r,2,e)}},r},e}();var u=function(e,n){try{var r=n.store,o=n.session,s="cas"===n.source?t.casUpdateData:a,i=function(e,t){var n=t.appControl,r=n.table,o=n.byvars,s=t.state.columns,a={};for(var i in e)"_index_"!==i&&"_rowIndex"!==i&&!1===s[i].custom&&(a[i]=e[i]);var u={};return o.forEach(function(e){u[e]=a[e]}),{table:r,data:a,where:u}}(e,n);return Promise.resolve(s(r,o,i))}catch(e){return Promise.reject(e)}},c=function(e,t){try{var n,r=t.appControl.byvars;if(null===r||0===r.length)return Promise.resolve([null,{msg:"Error: Please specify a by variable",statusCode:1}]);var o=function(){if(!0!==Array.isArray(e))return Promise.resolve(u(e,t)).then(function(e){n=e});var r,o,a,c,l,f=(r=e,o=function(r){return Promise.resolve(u(e[r],t)).then(function(e){n=e})},l=-1,function e(t){try{for(;++l<r.length;)if((t=o(l))&&t.then){if(!((n=t)instanceof i&&1&n.s))return void t.then(e,c||(c=s.bind(null,a=new i,2)));t=t.v}a?s(a,1,t):a=t}catch(e){s(a||(a=new i),2,e)}var n}(),a);return f&&f.then?f.then(function(){}):void 0}();return Promise.resolve(o&&o.then?o.then(function(){return n}):n)}catch(e){return Promise.reject(e)}};function l(e){return null==e?".":"string"==typeof e?JSON.stringify(e):e.toString()}function f(e,t,n){if(!e.s){if(n instanceof h){if(!n.s)return void(n.o=f.bind(null,e,t));1&t&&(t=n.s),n=n.v}if(n&&n.then)return void n.then(f.bind(null,e,t),f.bind(null,e,2));e.s=t,e.v=n;var r=e.o;r&&r(e)}}var m=function(e,t){try{var n=function(){var e={};if(s.forEach(function(t,n){var r=t.Column.toLowerCase();t.name=r,t.Label=null==t.Label||0===t.Label.length?t.Column:t.Label,null==t.Type&&(t.Type=null==t.type?"double":t.type),t.custom=!1,e[r]=t}),null!=i)for(var t in i){var n=r({},i[t]);n.name=t,n.custom=!0,e[t]=n}return{columns:e,data:c,status:u}},s=e.schema,a=e.rows,i=t.appControl.customColumns,u={statusCode:0,msg:"Initialization was successful"},c=[],l=(m=a,v=function(e){var n=function(e,t,n){var r={_rowIndex:n};if(t.forEach(function(t,n){var o=e[n].Column.toLowerCase();r[o]=t}),null!=i)for(var o in i){var s=i[o],a=s.Column.toLowerCase();r[a]=s.value}return r}(s,a[e],e);return Promise.resolve(o("init",n,e,t)).then(function(e){u=e[1],c.push(e[0])})},P=-1,function e(t){try{for(;++P<m.length;)if((t=v(P))&&t.then){if(!((n=t)instanceof h&&1&n.s))return void t.then(e,p||(p=f.bind(null,d=new h,2)));t=t.v}d?f(d,1,t):d=t}catch(e){f(d||(d=new h),2,e)}var n}(),d);return Promise.resolve(l&&l.then?l.then(n):n())}catch(e){return Promise.reject(e)}var m,v,d,p,P};const h=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(t,n){const r=new e,o=this.s;if(o){const e=1&o?t:n;if(e){try{f(r,1,e(this.v))}catch(e){f(r,2,e)}return r}return this}return this.o=function(e){try{const o=e.v;1&e.s?f(r,1,t?t(o):o):n?f(r,1,n(o)):f(r,2,o)}catch(e){f(r,2,e)}},r},e}();e.cellEdit=function(e,t,n,s,a){try{var i,u=function(e){return i?e:Promise.resolve(o("main",l,n,a)).then(function(e){var t;function r(n){return t?n:(l=e[0],!0===a.appControl.cachePolicy&&(a.state.data[s._rowIndex]=l),{data:l,status:d})}var i=function(){if(!0===v)return Promise.resolve(o("term",e[0],n,a)).then(function(n){return 2===(d=(e=n)[1]).statusCode?(t=1,{data:e[0],status:d}):Promise.resolve(c(e[0],a)).then(function(e){d=e})})}();return i&&i.then?i.then(r):r(i)})},l=r({},s),f=a.appControl.editControl,m=f.handlers,h=f.autoSave,v=null==h||h;l[e]=function(e,t){var n=e,r=t.Type.toLowerCase();return"string"!=typeof n||"decimal"!==r&&"number"!==r&&"double"!==r&&"float"!==r||(n=parseFloat(1*e),!0===isNaN(e)&&(e=0)),n}(t,a.state.columns[e]);var d={statusCode:0,msg:""},p=function(){if(null!=m[e])return Promise.resolve(m[e](l,e,n,a)).then(function(e){if(l=e[0],2===(d=e[1]).statusCode)return i=1,{data:e[0],status:d}})}();return Promise.resolve(p&&p.then?p.then(u):u(p))}catch(e){return Promise.reject(e)}},e.commonHandler=o,e.distinctValues=function(e,n,r,o){try{var s,a="cas"===r.source?Promise.resolve(function(e,n,r,o){try{return Promise.resolve(t.caslRun(r.store,r.session,"\n  results = selectionLists(_args_.column,_args_.table.caslib, _args_.table.name);\n  send_response({casResults = {data=results}});\n  ",{table:e,column:n},!0)).then(function(e){if(0!==e.results.casResults.data.statusCode)throw"Failed to create unique list";return e.results.casResults.data.data})}catch(e){return Promise.reject(e)}}(e,n,r)).then(function(e){s=e}):Promise.resolve(function(e,t,n){try{var r={};return r[e]=[],Promise.resolve(r)}catch(e){return Promise.reject(e)}}(e)).then(function(e){s=e});return Promise.resolve(a&&a.then?a.then(function(){return s}):s)}catch(e){return Promise.reject(e)}},e.fetchTableRows=function(e,n){try{return Promise.resolve("cas"===n.source?function(e,n){try{var o=n.store,s=n.session,a={};return null!=e.qs?((a=r({},e.qs)).from=a.start+1,a.count=a.limit):a=r({},e),a.from<=0||-1===a.next?Promise.resolve(null):(null==a.where&&(a.where=" "),Promise.resolve(t.casFetchRows(o,s,a)).then(function(e){var t=null,o=function(){if(null!==e)return Promise.resolve(m(e.data,n)).then(function(o){t=o,n.state={modified:[],pagination:r({},e.pagination),currentPage:a,data:[],columns:[]},!0===n.appControl.cachePolicy&&(n.state.data=t.data,n.state.columns=t.columns),t.pagination=r({},e.pagination)})}();return o&&o.then?o.then(function(){return t}):t}))}catch(e){return Promise.reject(e)}}(e,n):function(e,n){try{var r=n.store,o=n.tableSummary,s=n.appControl.table,a=(s.libref+"."+s.name).toLowerCase();return Promise.resolve(t.computeFetchData(r,o,a,null,{qs:{start:e.from-1,limit:e.count,format:null==e.format&&e.format}})).then(function(e){var t=null,r=function(){if(null!==e)return Promise.resolve(m(e,n)).then(function(e){n.state={modified:[],pagination:{},currentPage:{},data:(t=e).data,columns:t.columns}})}();return r&&r.then?r.then(function(){return t}):t})}catch(e){return Promise.reject(e)}}(e,n))}catch(e){return Promise.reject(e)}},e.saveTable=function(e,n){try{var r=e.store,o=e.session;return"compute"===e.source?Promise.resolve({msg:"Action does not apply to SAS 9 tables",statusCode:0}):Promise.resolve(t.casSaveTable(r,o,null!=n?n:e.appControl.table)).then(function(){return{msg:"Table saved",statusCode:0}})}catch(e){return Promise.reject(e)}},e.scrollTable=function(e,n,o){try{var s,a="cas"===n.source?Promise.resolve(function(e,n,o){try{var s,a=n.store,i=n.session,u=n.appControl,c=u.initialFetch,l=u.table,f=null==n.appControl.cachePolicy||n.appControl.cachePolicy;if(null!=o)s=r({},o);else if("first"===e)s=r({},c);else if(null!==e&&(-1===(s=r({},n.state.pagination[e])).next||s.from<=0))return Promise.resolve(null);var h={};return null!=s.qs?((h=r({},s.qs)).from=h.start+1,h.count=h.limit):h=r({},s),h.from<=0||-1===h.next?Promise.resolve(null):(null==h.where&&(h.where=" "),h.table=l,Promise.resolve(t.casFetchRows(a,i,h)).then(function(e){var t=null;return function(){if(null!==e)return Promise.resolve(m(e.data,n)).then(function(o){return t=o,n.state={modified:[],pagination:r({},e.pagination),currentPage:s,data:[],columns:[]},!0===f&&(n.state.data=t.data,n.state.columns=t.columns),t.pagination=r({},e.pagination),t})}()}))}catch(e){return Promise.reject(e)}}(e,n,o)).then(function(e){s=e}):Promise.resolve(function(e,n,o){try{var s=n.store,a=n.tableSummary,i=n.appControl,u=i.table,c=i.initialFetch,l=null==n.appControl.cachePolicy||n.appControl.cachePolicy,f=null,h=(u.libref+"."+u.name).toLowerCase();return null==o?"first"===e&&(f=r({},c)):f=r({},o),Promise.resolve(t.computeFetchData(s,a,h,e,f)).then(function(e){var t=null,r=function(){if(null!==e)return Promise.resolve(m(e,n)).then(function(e){t=e,n.state={modified:[],pagination:{},currentPage:{},data:[],columns:[]},!0===l&&(n.state.data=t.data,n.state.columns=t.columns)})}();return r&&r.then?r.then(function(){return t}):t})}catch(e){return Promise.reject(e)}}(e,n,o)).then(function(e){s=e});return Promise.resolve(a&&a.then?a.then(function(){return s}):s)}catch(e){return Promise.reject(e)}},e.setup=function(e,r,o){try{var s,a=n.initStore();null==e.authType&&(e.authType="code");var i="cas"===r.source?Promise.resolve(function(e,n,r,o){try{return Promise.resolve(t.casSetup(e,n)).then(function(s){var a={source:r.source,store:e,session:s.session,servers:s.servers,restaflib:null,logonPayload:n,appControl:r,state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}},id:Date()},i=function(){if(null!=o)return Promise.resolve(t.caslRun(e,s.session,o)).then(function(e){if(0!==e.details.statusCode)throw console.log(e),"Preamble failed. Please see console"})}();return i&&i.then?i.then(function(e){return a}):a})}catch(e){return Promise.reject(e)}}(a,e,r,o)).then(function(e){s=e}):Promise.resolve(function(e,n,r,o){try{return Promise.resolve(t.computeSetup(e,r.computeContext,n)).then(function(s){return Promise.resolve(t.computeSetupTables(e,s,r.table,o)).then(function(t){return{source:r.source,store:e,session:s,tableSummary:t,servers:null,restaflib:null,logonPayload:n,appControl:r,state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}},id:Date()}})})}catch(e){return Promise.reject(e)}}(a,e,r,o)).then(function(e){s=e});return Promise.resolve(i&&i.then?i.then(function(){return s}):s)}catch(e){return Promise.reject(e)}},e.updateTableRows=c,e.uploadData=function(e,n,o,s,a,i,u){try{var c=a.store,l=a.session,f=Object.keys(n[0]),m=["_index_","_rowIndex"];null!==o&&(m=m.concat(o));var h=f.filter(function(e){return!(m.indexOf(e)>=0)}),v={};h.forEach(function(e){v[e]=a.state.columns[e]});var d=null;"cas"===a.source&&(d=h.join(",")+"\n");for(var p,P=function(e){var t=n[e];t=r({},t,s);var o=[];h.forEach(function(e,n){var r=t[e];"string"==typeof r&&(r=r.trim()),o[n]=r}),d=null===d?o.join(",")+"\n":d+o.join(",")+"\n"},y=0;y<n.length;y++)P(y);var b="cas"===a.source?Promise.resolve(function(e,n,r,o,s,a){try{return Promise.resolve(t.casUpload(e,n,null,r.caslib+"."+r.name,!0,o)).then(function(o){return null!=s?Promise.resolve(t.casAppendTable(e,n,r,s,a)).then(function(e){return o=e}):o})}catch(e){return Promise.reject(e)}}(c,l,e,d,i,u)).then(function(e){p=e}):Promise.resolve(function(e,n,r,o,s){try{var a="data "+o.libref+"."+o.name+"; INFILE datalines delimiter=',' ;\n",i="",u="INPUT ";for(var c in r){var l=r[c];u=u+l.Column+" ","CHAR"===l.Type&&(i=i+"  "+l.Column+" $ "+l.length+" \n")}return i.length>0&&(i="LENGTH "+i+";\n"),a=a+";\n"+i+(u+=";\n")+"datalines;\n"+s+"\n; run; proc print;run;\n",Promise.resolve(t.computeRun(e,n,a)).then(function(){return{msg:"done",statusCode:0}})}catch(e){return Promise.reject(e)}}(c,l,v,e,d)).then(function(e){p=e});return Promise.resolve(b&&b.then?b.then(function(){return p}):p)}catch(e){return Promise.reject(e)}}});
//# sourceMappingURL=index.umd.js.map
