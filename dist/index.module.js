import{casUpdateData as e,computeFetchData as t,casFetchRows as n,computeSetup as r,computeSetupTables as o,casSetup as s,caslRun as a,casUpload as i}from"@sassoftware/restaflib";import{initStore as u}from"@sassoftware/restaf";import l from"deepmerge";function c(){return c=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c.apply(this,arguments)}var f=function(e,t,n,r){try{var o=r.appControl.editControl.handlers;return null==o[e]?Promise.resolve([t,{statusCode:0,msg:null}]):Promise.resolve(o[e](t,n,r,e)).then(function(e){return[e[0],e[1]]})}catch(e){return Promise.reject(e)}},m=function(t,n){try{var r,o="cas"===n.source?Promise.resolve(function(t,n){try{var r=n.store,o=n.session,s=n.appControl,a=s.table,i=s.byvars,u=n.state.columns;if(null===i||0===i.length)return Promise.resolve(null);var l={};for(var c in t)"_index_"!==c&&"_rowIndex"!==c&&!1===u[c].custom&&(l[c]=t[c]);var f={};return i.forEach(function(e){f[e]=l[e]}),Promise.resolve(e(r,o,{table:a,data:l,where:f})).then(function(e){var t={statusCode:0,msg:"Save successful"};return"Normal"!==e.items().toJS().disposition.severity&&(t.statusCode=2,t.msg=l.disposition.severity.reason),t})}catch(e){return Promise.reject(e)}}(t,n)).then(function(e){r=e}):Promise.resolve(function(e,t){try{var n=t.store,r=t.session,o=t.appControl,s=o.table,a=o.byvars,i=t.state.columns;if(null===a||0===a.length)return Promise.resolve(null);var u="proc sql; update "+s.libref+"."+s.name,l="SET ",c=" ";for(var f in e)!1===i[f].custom&&(l=l+c+f+"="+v(e[f])),c=", ";u=u+" "+l;var m=" WHERE ",h=" ";a.forEach(function(t){m=m+h+t+"="+v(e[t]),h="AND "});var d={data:{code:(u=u+" "+m+";run;").split(/\r?\n/)}};return Promise.resolve(n.apiCall(r.links("execute"),d)).then(function(e){return Promise.resolve(n.jobState(e,{qs:{newState:"Completed",timeout:1}})).then(function(e){return{statusCode:"completed"===e.data?0:1,msg:e.data}})})}catch(e){return Promise.reject(e)}}(t,n)).then(function(e){r=e});return Promise.resolve(o&&o.then?o.then(function(){return r}):r)}catch(e){return Promise.reject(e)}};function v(e){return null==e?".":"string"==typeof e?JSON.stringify(e):e.toString()}var h=function(e,t,n,r,o){try{var s,a=function(e){return s?e:Promise.resolve(f("main",i,n,o)).then(function(e){var t;function s(n){return t?n:(i=e[0],!0===o.appControl.cachePolicy&&(o.state.data[r._rowIndex]=i),{data:i,status:h})}var a=function(){if(!0===v)return Promise.resolve(f("term",e[0],n,o)).then(function(n){return 2===(h=(e=n)[1]).statusCode?(t=1,{data:e[0],status:h}):Promise.resolve(m(e[0],o)).then(function(e){h=e})})}();return a&&a.then?a.then(s):s(a)})},i=c({},r),u=o.appControl.editControl,l=u.handlers,v=u.autoSave;i[e]=function(e,t){var n=e,r=t.Type.toLowerCase();return"string"!=typeof n||"decimal"!==r&&"number"!==r&&"double"!==r&&"float"!==r||(n=parseFloat(1*e),!0===isNaN(e)&&(e=0)),n}(t,o.state.columns[e]);var h={statusCode:0,msg:""},d=function(){if(null!=l[e])return Promise.resolve(l[e](i,e,n,o)).then(function(e){if(i=e[0],2===(h=e[1]).statusCode)return s=1,{data:e[0],status:h}})}();return Promise.resolve(d&&d.then?d.then(a):a(d))}catch(e){return Promise.reject(e)}};function d(e,t,n){if(!e.s){if(n instanceof p){if(!n.s)return void(n.o=d.bind(null,e,t));1&t&&(t=n.s),n=n.v}if(n&&n.then)return void n.then(d.bind(null,e,t),d.bind(null,e,2));e.s=t,e.v=n;var r=e.o;r&&r(e)}}var P=function(e,t){try{var n=function(){var e={};if(r.forEach(function(t,n){var r=t.Column.toLowerCase();t.name=r,t.Label=null==t.Label||0===t.Label.length?t.Column:t.Label,null==t.Type&&(t.Type=null==t.type?"double":t.type),t.custom=!1,e[r]=t}),null!=s)for(var t in s){var n=c({},s[t]);n.name=t,n.custom=!0,e[t]=n}return{columns:e,data:i,status:a}},r=e.schema,o=e.rows,s=t.appControl.customColumns,a={statusCode:0,msg:"Initialization was successful"},i=[],u=(l=o,m=function(e){var n=function(e,t,n){var r={_rowIndex:n};if(t.forEach(function(t,n){var o=e[n].Column.toLowerCase();r[o]=t}),null!=s)for(var o in s){var a=s[o],i=a.Column.toLowerCase();r[i]=a.value}return r}(r,o[e],e);return Promise.resolve(f("init",n,e,t)).then(function(e){a=e[1],i.push(e[0])})},P=-1,function e(t){try{for(;++P<l.length;)if((t=m(P))&&t.then){if(!((n=t)instanceof p&&1&n.s))return void t.then(e,h||(h=d.bind(null,v=new p,2)));t=t.v}v?d(v,1,t):v=t}catch(e){d(v||(v=new p),2,e)}var n}(),v);return Promise.resolve(u&&u.then?u.then(n):n())}catch(e){return Promise.reject(e)}var l,m,v,h,P};const p=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(t,n){const r=new e,o=this.s;if(o){const e=1&o?t:n;if(e){try{d(r,1,e(this.v))}catch(e){d(r,2,e)}return r}return this}return this.o=function(e){try{const o=e.v;1&e.s?d(r,1,t?t(o):o):n?d(r,1,n(o)):d(r,2,o)}catch(e){d(r,2,e)}},r},e}();var g=function(e,r){try{var o=null,s="cas"===r.source?Promise.resolve(function(e,t){try{var r=t.store,o=t.session,s=c({},e);return s.from<=0||-1===s.next?Promise.resolve(null):(null==s.where&&(s.where=" "),Promise.resolve(n(r,o,s)).then(function(e){var n=null,r=function(){if(null!==e)return Promise.resolve(P(e.data,t)).then(function(r){n=r,t.state={modified:[],pagination:c({},e.pagination),currentPage:s,data:[],columns:[]},!0===t.appControl.cachePolicy&&(t.state.data=n.data,t.state.columns=n.columns),n.pagination=c({},e.pagination)})}();return r&&r.then?r.then(function(){return n}):n}))}catch(e){return Promise.reject(e)}}(e,r)).then(function(e){o=e}):Promise.resolve(function(e,n){try{var r=n.store,o=n.tableSummary,s=n.appControl.table,a=(s.libref+"."+s.name).toLowerCase();return Promise.resolve(t(r,o,a,null,{qs:{start:e.from-1,limit:e.count,format:null==e.format&&e.format}})).then(function(e){var t=null,r=function(){if(null!==e)return Promise.resolve(P(e,n)).then(function(e){n.state={modified:[],pagination:{},currentPage:{},data:(t=e).data,columns:t.columns}})}();return r&&r.then?r.then(function(){return t}):t})}catch(e){return Promise.reject(e)}}(e,r)).then(function(e){o=e});return Promise.resolve(s&&s.then?s.then(function(){return o}):o)}catch(e){return Promise.reject(e)}},y=function(e,r,o){try{var s,a="cas"===r.source?Promise.resolve(function(e,t,r){try{var o,s=t.store,a=t.session,i=t.appControl,u=i.table;if("first"===e)o=c({},i.initialFetch);else if(null!==e&&(-1===(o=c({},t.state.pagination[e])).next||o.from<=0))return Promise.resolve(null);return null!=r&&(o=c({},r)),o.table=u,Promise.resolve(n(s,a,o)).then(function(e){var n=null;return function(){if(null!==e)return Promise.resolve(P(e.data,t)).then(function(r){return n=r,t.state={modified:[],pagination:c({},e.pagination),currentPage:o,data:[],columns:[]},!0===t.appControl.cachePolicy&&(t.state.data=n.data,t.state.columns=n.columns),n.pagination=c({},e.pagination),n})}()})}catch(e){return Promise.reject(e)}}(e,r,o)).then(function(e){s=e}):Promise.resolve(function(e,n,r){try{var o=n.store,s=n.tableSummary,a=n.appControl,i=a.table,u=a.initialFetch,l=null,f=(i.libref+"."+i.name).toLowerCase();return null==r?"first"===e&&(l=c({},u)):l=c({},r),Promise.resolve(t(o,s,f,e,l)).then(function(e){var t=null,r=function(){if(null!==e)return Promise.resolve(P(e,n)).then(function(e){n.state={modified:[],pagination:{},currentPage:{},data:(t=e).data,columns:t.columns}})}();return r&&r.then?r.then(function(){return t}):t})}catch(e){return Promise.reject(e)}}(e,r,o)).then(function(e){s=e});return Promise.resolve(a&&a.then?a.then(function(){return s}):s)}catch(e){return Promise.reject(e)}},b=function(e,t,n){try{var a,i=u();null==e.authType&&(e.authType="code");var c="cas"===t.source?Promise.resolve(function(e,t,n){try{return Promise.resolve(s(e,t)).then(function(r){return{source:n.source,store:e,session:r.session,servers:r.servers,restaflib:null,logonPayload:t,appControl:n,state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}},id:Date()}})}catch(e){return Promise.reject(e)}}(i,e,t)).then(function(e){a=e}):Promise.resolve(function(e,t,n,s){try{return Promise.resolve(r(e,n.computeContext,t)).then(function(r){return Promise.resolve(o(e,r,n.table,s)).then(function(o){return{source:n.source,store:e,session:r,tableSummary:o,servers:null,restaflib:null,logonPayload:t,appControl:l(n),state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}},id:Date()}})})}catch(e){return Promise.reject(e)}}(i,e,t,n)).then(function(e){a=e});return Promise.resolve(c&&c.then?c.then(function(){return a}):a)}catch(e){return Promise.reject(e)}},C=function(e,t,n,r){try{var o,s="cas"===n.source?Promise.resolve(function(e,t,n,r){try{return Promise.resolve(a(n.store,n.session,"\n  results = selectionLists(_args_.column,_args_.table.caslib, _args_.table.name);\n  send_response({casResults = {data=results}});\n  ",{table:e,column:t},!0)).then(function(e){if(0!==e.results.casResults.data.statusCode)throw"Failed to create unique list";return e.results.casResults.data.data})}catch(e){return Promise.reject(e)}}(e,t,n)).then(function(e){o=e}):Promise.resolve(function(e,t,n){try{var r={};return r[e]=[],Promise.resolve(r)}catch(e){return Promise.reject(e)}}(e)).then(function(e){o=e});return Promise.resolve(s&&s.then?s.then(function(){return o}):o)}catch(e){return Promise.reject(e)}},j=function(e,t,n,r,o){try{console.log("calling casUpload");var s=n.caslib+"."+n.name;return Promise.resolve(i(e,t,null,s,!0,r)).then(function(n){console.log("end of casUpload"),console.log(n.items().toJS()),console.log(o);var r=function(){if(null!=o){var r="action datastep.runCode/ code='data "+o.caslib+"."+o.name+" (append=YES);set "+s+";run;'";return console.log(r),Promise.resolve(a(e,t,r)).then(function(e){n=e,console.log(n.items().toJS())})}}();if(r&&r.then)return r.then(function(){})})}catch(e){return Promise.reject(e)}},w=function(e,t,n,r,o,s){try{for(var a=function(){return console.log(v.items().toJS()),v},u=o.store,l=o.session,f=t[0],m=0;m<n.length;m++)delete f[n[m]];f=c({},r,f);for(var v,h=Object.keys(f),d=h.join(",")+"\n",P=function(e){var n=t[e];n=c({},n,r);var o=[];h.forEach(function(e,t){var r=n[e];"string"==typeof r&&(r=r.trim()),o[t]=r}),d=d+o.join(",")+"\n"},p=0;p<t.length;p++)P(p);console.log(d),console.log(i),console.log(j);var g=function(){if("cas"===o.source)return Promise.resolve(j(u,l,e,d,s)).then(function(e){v=e});v={}}();return Promise.resolve(g&&g.then?g.then(a):a())}catch(e){return Promise.reject(e)}},S=function(e,t,n){return Promise.resolve([])};export{h as cellEdit,f as commonHandler,C as distinctValues,g as fetchTableRows,y as scrollTable,b as setup,S as sort,m as updateTableRows,w as uploadData};
//# sourceMappingURL=index.module.js.map
