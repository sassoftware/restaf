import{casUpdateData as e,computeFetchData as t,casFetchRows as r,computeSetup as n,computeSetupTables as o,casSetup as s,caslRun as a}from"@sassoftware/restaflib";import{initStore as i}from"@sassoftware/restaf";import u from"deepmerge";function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},l.apply(this,arguments)}var c=function(e,t,r,n){try{var o=n.appControl.editControl.handlers;return null==o[e]?Promise.resolve([t,{statusCode:0,msg:null}]):Promise.resolve(o[e](t,r,n,e)).then(function(e){return[e[0],e[1]]})}catch(e){return Promise.reject(e)}},f=function(t,r){try{var n,o="cas"===r.source?Promise.resolve(function(t,r){try{var n=r.store,o=r.session,s=r.appControl,a=s.table,i=s.byvars,u=r.state.columns;if(null===i||0===i.length)return Promise.resolve(null);var l={};for(var c in t)"_index_"!==c&&!1===u[c].custom&&(l[c]=t[c]);var f={};return i.forEach(function(e){f[e]=l[e]}),Promise.resolve(e(n,o,{table:a,data:l,where:f})).then(function(e){var t={statusCode:0,msg:"Save successful"};return"Normal"!==e.items().toJS().disposition.severity&&(t.statusCode=2,t.msg=l.disposition.severity.reason),t})}catch(e){return Promise.reject(e)}}(t,r)).then(function(e){n=e}):Promise.resolve(function(e,t){try{var r=t.store,n=t.session,o=t.appControl,s=o.table,a=o.byvars,i=t.state.columns;if(null===a||0===a.length)return Promise.resolve(null);var u="proc sql; update "+s.libref+"."+s.name,l="SET ",c=" ";for(var f in e)!1===i[f].custom&&(l=l+c+f+"="+m(e[f])),c=", ";u=u+" "+l;var v=" WHERE ",h=" ";a.forEach(function(t){v=v+h+t+"="+m(e[t]),h="AND "});var d={data:{code:(u=u+" "+v+";run;").split(/\r?\n/)}};return Promise.resolve(r.apiCall(n.links("execute"),d)).then(function(e){return Promise.resolve(r.jobState(e,{qs:{newState:"Completed",timeout:1}})).then(function(e){return{statusCode:"completed"===e.data?0:1,msg:e.data}})})}catch(e){return Promise.reject(e)}}(t,r)).then(function(e){n=e});return Promise.resolve(o&&o.then?o.then(function(){return n}):n)}catch(e){return Promise.reject(e)}};function m(e){return null==e?".":"string"==typeof e?JSON.stringify(e):e.toString()}var v=function(e,t,r,n,o){try{var s,a=function(e){return s?e:Promise.resolve(c("main",i,r,o)).then(function(e){var t;function n(n){return t?n:(i=e[0],!0===o.appControl.cachePolicy&&(o.state.data[r]=i),{data:i,status:h})}var s=function(){if(!0===v)return Promise.resolve(c("term",e[0],r,o)).then(function(r){return 2===(h=(e=r)[1]).statusCode?(t=1,{data:e[0],status:h}):Promise.resolve(f(e[0],o)).then(function(e){h=e})})}();return s&&s.then?s.then(n):n(s)})},i=l({},null!==n?n:o.state.data[r]),u=o.appControl.editControl,m=u.handlers,v=u.autoSave;i[e]=function(e,t){var r=e,n=t.Type.toLowerCase();return"string"!=typeof r||"decimal"!==n&&"number"!==n&&"double"!==n&&"float"!==n||(r=parseFloat(1*e),!0===isNaN(e)&&(e=0)),r}(t,o.state.columns[e]);var h={statusCode:0,msg:""},d=function(){if(null!=m[e])return Promise.resolve(m[e](i,e,r,o)).then(function(e){if(i=e[0],2===(h=e[1]).statusCode)return s=1,{data:e[0],status:h}})}();return Promise.resolve(d&&d.then?d.then(a):a(d))}catch(e){return Promise.reject(e)}};function h(e,t,r){if(!e.s){if(r instanceof P){if(!r.s)return void(r.o=h.bind(null,e,t));1&t&&(t=r.s),r=r.v}if(r&&r.then)return void r.then(h.bind(null,e,t),h.bind(null,e,2));e.s=t,e.v=r;var n=e.o;n&&n(e)}}var d=function(e,t){try{var r=function(){var e={};if(n.forEach(function(t,r){var n=t.Column.toLowerCase();t.name=n,t.Label=null==t.Label||0===t.Label.length?t.Column:t.Label,null==t.Type&&(t.Type=null==t.type?"double":t.type),t.custom=!1,e[n]=t}),null!=s)for(var t in s){var r=l({},s[t]);r.name=t,r.custom=!0,e[t]=r}return{columns:e,data:i,status:a}},n=e.schema,o=e.rows,s=t.appControl.customColumns,a={statusCode:0,msg:"Initialization was successful"},i=[],u=(f=o,m=function(e){var r=function(e,t){var r={};if(t.forEach(function(t,n){var o=e[n].Column.toLowerCase();r[o]=t}),null!=s)for(var n in s){var o=s[n],a=o.Column.toLowerCase();r[a]=o.value}return r}(n,o[e]);return Promise.resolve(c("init",r,e,t)).then(function(e){a=e[1],i.push(e[0])})},p=-1,function e(t){try{for(;++p<f.length;)if((t=m(p))&&t.then){if(!((r=t)instanceof P&&1&r.s))return void t.then(e,d||(d=h.bind(null,v=new P,2)));t=t.v}v?h(v,1,t):v=t}catch(e){h(v||(v=new P),2,e)}var r}(),v);return Promise.resolve(u&&u.then?u.then(r):r())}catch(e){return Promise.reject(e)}var f,m,v,d,p};const P=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(t,r){const n=new e,o=this.s;if(o){const e=1&o?t:r;if(e){try{h(n,1,e(this.v))}catch(e){h(n,2,e)}return n}return this}return this.o=function(e){try{const o=e.v;1&e.s?h(n,1,t?t(o):o):r?h(n,1,r(o)):h(n,2,o)}catch(e){h(n,2,e)}},n},e}();var p=function(e,n){try{var o=null,s="cas"===n.source?Promise.resolve(function(e,t){try{var n=t.store,o=t.session,s=l({},e);return s.from<=0||-1===s.next?Promise.resolve(null):(null==s.where&&(s.where=" "),Promise.resolve(r(n,o,s)).then(function(e){var r=null,n=function(){if(null!==e)return Promise.resolve(d(e.data,t)).then(function(n){r=n,t.state={modified:[],pagination:l({},e.pagination),currentPage:s,data:[],columns:[]},!0===t.appControl.cachePolicy&&(t.state.data=r.data,t.state.columns=r.columns),r.pagination=l({},e.pagination)})}();return n&&n.then?n.then(function(){return r}):r}))}catch(e){return Promise.reject(e)}}(e,n)).then(function(e){o=e}):Promise.resolve(function(e,r){try{var n=r.store,o=r.tableSummary,s=r.appControl.table,a=(s.libref+"."+s.name).toLowerCase();return Promise.resolve(t(n,o,a,null,{qs:{start:e.from-1,limit:e.count,format:null==e.format&&e.format}})).then(function(e){var t=null,n=function(){if(null!==e)return Promise.resolve(d(e,r)).then(function(e){r.state={modified:[],pagination:{},currentPage:{},data:(t=e).data,columns:t.columns}})}();return n&&n.then?n.then(function(){return t}):t})}catch(e){return Promise.reject(e)}}(e,n)).then(function(e){o=e});return Promise.resolve(s&&s.then?s.then(function(){return o}):o)}catch(e){return Promise.reject(e)}},y=function(e,n,o){try{var s,a="cas"===n.source?Promise.resolve(function(e,t,n){try{var o,s=t.store,a=t.session,i=t.appControl,u=i.table;if("first"===e)o=l({},i.initialFetch);else if(null!==e&&(-1===(o=l({},t.state.pagination[e])).next||o.from<=0))return Promise.resolve(null);return null!=n&&(o=l({},n)),o.table=u,Promise.resolve(r(s,a,o)).then(function(e){var r=null;return function(){if(null!==e)return Promise.resolve(d(e.data,t)).then(function(n){return r=n,t.state={modified:[],pagination:l({},e.pagination),currentPage:o,data:[],columns:[]},!0===t.appControl.cachePolicy&&(t.state.data=r.data,t.state.columns=r.columns),r.pagination=l({},e.pagination),r})}()})}catch(e){return Promise.reject(e)}}(e,n,o)).then(function(e){s=e}):Promise.resolve(function(e,r,n){try{var o=r.store,s=r.tableSummary,a=r.appControl,i=a.table,u=a.initialFetch,c=null,f=(i.libref+"."+i.name).toLowerCase();return null==n?"first"===e&&(c=l({},u)):c=l({},n),Promise.resolve(t(o,s,f,e,c)).then(function(e){var t=null,n=function(){if(null!==e)return Promise.resolve(d(e,r)).then(function(e){r.state={modified:[],pagination:{},currentPage:{},data:(t=e).data,columns:t.columns}})}();return n&&n.then?n.then(function(){return t}):t})}catch(e){return Promise.reject(e)}}(e,n,o)).then(function(e){s=e});return Promise.resolve(a&&a.then?a.then(function(){return s}):s)}catch(e){return Promise.reject(e)}},g=function(e,t,r){try{var a,l=i();null==e.authType&&(e.authType="code");var c="cas"===t.source?Promise.resolve(function(e,t,r){try{return Promise.resolve(s(e,t)).then(function(n){return{source:r.source,store:e,session:n.session,servers:n.servers,restaflib:null,logonPayload:t,appControl:r,state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}},id:Date()}})}catch(e){return Promise.reject(e)}}(l,e,t)).then(function(e){a=e}):Promise.resolve(function(e,t,r,s){try{return Promise.resolve(n(e,r.computeContext,t)).then(function(n){return Promise.resolve(o(e,n,r.table,s)).then(function(o){return{source:r.source,store:e,session:n,tableSummary:o,servers:null,restaflib:null,logonPayload:t,appControl:u(r),state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}},id:Date()}})})}catch(e){return Promise.reject(e)}}(l,e,t,r)).then(function(e){a=e});return Promise.resolve(c&&c.then?c.then(function(){return a}):a)}catch(e){return Promise.reject(e)}},b=function(e,t,r){try{var n,o="cas"===t.source?Promise.resolve(function(e,t,r){try{return Promise.resolve(a(t.store,t.session,"\n  results = selectionLists(_args_.column,_args_.table.caslib, _args_.table.name);\n  send_response({casResults = {data=results}});\n  ",{table:t.appControl.table,column:e},!0)).then(function(e){if(0!==e.results.casResults.data.statusCode)throw"Failed to create unique list";return e.results.casResults.data.data})}catch(e){return Promise.reject(e)}}(e,t)).then(function(e){n=e}):Promise.resolve(function(e,t,r){try{var n={};return n[e]=[],Promise.resolve(n)}catch(e){return Promise.reject(e)}}(e)).then(function(e){n=e});return Promise.resolve(o&&o.then?o.then(function(){return n}):n)}catch(e){return Promise.reject(e)}},C=function(e,t,r){return Promise.resolve([])};export{v as cellEdit,c as commonHandler,b as distinctValues,p as fetchTableRows,y as scrollTable,g as setup,C as sort,f as updateTableRows};
//# sourceMappingURL=index.module.js.map
