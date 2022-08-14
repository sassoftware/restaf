!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@sassoftware/restaflib"),require("@sassoftware/restaf")):"function"==typeof define&&define.amd?define(["exports","@sassoftware/restaflib","@sassoftware/restaf"],t):t((e||self).restafedit={},e.restaflib,e.restaf)}(this,function(e,t,n){function r(){return r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},r.apply(this,arguments)}var o=function(e,t,n,r){try{var o=r.appControl.editControl.handlers;return null==o[e]?Promise.resolve([t,{statusCode:0,msg:null}]):Promise.resolve(o[e](t,n,r,e)).then(function(e){return[e[0],e[1]]})}catch(e){return Promise.reject(e)}},a=function(e,n){try{var r,o="cas"===n.source?Promise.resolve(function(e,n){try{var r=n.store,o=n.session,a=n.appControl,s=a.table,u=a.byvars,i=n.state.columns;if(null===u||0===u.length)return Promise.resolve(null);var l={};for(var c in e)"_index_"!==c&&!1===i[c].custom&&(l[c]=e[c]);var f={};return u.forEach(function(e){f[e]=l[e]}),Promise.resolve(t.casUpdateData(r,o,{table:s,data:l,where:f})).then(function(){return{statusCode:0,msg:"Save successful"}})}catch(e){return Promise.reject(e)}}(e,n)).then(function(e){r=e}):Promise.resolve(function(e,t){try{var n=t.store,r=t.session,o=t.appControl,a=o.table,u=o.byvars,i=t.state.columns;if(null===u||0===u.length)return Promise.resolve(null);var l="proc sql; update "+a.libref+"."+a.name,c="SET ",f=" ";for(var m in e)!1===i[m].custom&&(c=c+f+m+"="+s(e[m])),f=", ";l=l+" "+c;var h=" WHERE ",v=" ";u.forEach(function(t){h=h+v+t+"="+s(e[t]),v="AND "});var p={data:{code:(l=l+" "+h+";run;").split(/\r?\n/)}};return Promise.resolve(n.apiCall(r.links("execute"),p)).then(function(e){return Promise.resolve(n.jobState(e,{qs:{newState:"Completed",timeout:1}})).then(function(e){return{statusCode:"completed"===e.data?0:1,msg:e.data}})})}catch(e){return Promise.reject(e)}}(e,n)).then(function(e){r=e});return Promise.resolve(o&&o.then?o.then(function(){return r}):r)}catch(e){return Promise.reject(e)}};function s(e){return null==e?".":"string"==typeof e?JSON.stringify(e):e.toString()}function u(e,t,n){if(!e.s){if(n instanceof l){if(!n.s)return void(n.o=u.bind(null,e,t));1&t&&(t=n.s),n=n.v}if(n&&n.then)return void n.then(u.bind(null,e,t),u.bind(null,e,2));e.s=t,e.v=n;var r=e.o;r&&r(e)}}var i=function(e,t){try{var n=function(){var e={};if(a.forEach(function(t,n){var r=t.Column.toLowerCase();t.name=r,t.Label=null==t.Label||0===t.Label.length?t.Column:t.Label,t.custom=!1,e[r]=t}),null!=i)for(var t in i){var n=r({},i[t]);n.name=t,n.custom=!0,e[t]=n}return{columns:e,data:c}},a=e.schema,s=e.rows,i=t.appControl.customColumns,c=[],f=(m=s,h=function(e){var n=function(e,t){var n={};if(t.forEach(function(t,r){var o=e[r],a=o.Column.toLowerCase();null==o.Label&&(o.Label=o.Column),n[a]=t}),null!=i)for(var r in i){var o=i[r],a=o.Column.toLowerCase();n[a]=o.value}return n}(a,s[e]);return Promise.resolve(o("init",n,e,t)).then(function(e){var t=e[0],n=e[1];0!==n.code&&console.log(JSON.stringify(n,null,4)),c.push(t)})},d=-1,function e(t){try{for(;++d<m.length;)if((t=h(d))&&t.then){if(!((n=t)instanceof l&&1&n.s))return void t.then(e,p||(p=u.bind(null,v=new l,2)));t=t.v}v?u(v,1,t):v=t}catch(e){u(v||(v=new l),2,e)}var n}(),v);return Promise.resolve(f&&f.then?f.then(n):n())}catch(e){return Promise.reject(e)}var m,h,v,p,d};const l=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(t,n){const r=new e,o=this.s;if(o){const e=1&o?t:n;if(e){try{u(r,1,e(this.v))}catch(e){u(r,2,e)}return r}return this}return this.o=function(e){try{const o=e.v;1&e.s?u(r,1,t?t(o):o):n?u(r,1,n(o)):u(r,2,o)}catch(e){u(r,2,e)}},r},e}();var c=function(e,n){try{var o=null,a="cas"===n.source?Promise.resolve(function(e,n){try{var o=n.store,a=n.session,s=r({},e);return null==s.table&&(s.table=n.appControl.table),null==s.where&&(s.where={}),s.from<=0||-1===s.next?Promise.resolve(null):Promise.resolve(t.casFetchRows(o,a,s)).then(function(e){var t=null,o=function(){if(null!==e)return Promise.resolve(i(e.data,n)).then(function(o){t=o,n.state={modified:[],pagination:r({},e.pagination),currentPage:s,data:[],columns:[]},!0===n.appControl.cachePolicy&&(n.state.data=t.data,n.state.columns=t.columns),t.pagination=r({},e.pagination)})}();return o&&o.then?o.then(function(){return t}):t})}catch(e){return Promise.reject(e)}}(e,n)).then(function(e){o=e}):Promise.resolve(function(e,n){try{var r=n.store,o=n.tableSummary,a=n.appControl.table,s=(a.libref+"."+a.name).toLowerCase();return Promise.resolve(t.computeFetchData(r,o,s,null,{qs:{start:e.from-1,limit:e.count,format:null==e.format&&e.format}})).then(function(e){var t=null,r=function(){if(null!==e)return Promise.resolve(i(e,n)).then(function(e){n.state={modified:[],pagination:{},currentPage:{},data:(t=e).data,columns:t.columns}})}();return r&&r.then?r.then(function(){return t}):t})}catch(e){return Promise.reject(e)}}(e,n)).then(function(e){o=e});return Promise.resolve(a&&a.then?a.then(function(){return o}):o)}catch(e){return Promise.reject(e)}};e.cellEdit=function(e,t,n,s,u){try{var i,l=function(e){return i?e:Promise.resolve(o("main",c,n,u)).then(function(e){var t;function r(r){return t?r:(c=e[0],v.msg=v.msg+" / "+e[1],!0===u.appControl.cachePolicy&&(u.state.data[n]=c),{data:c,status:v})}var s=function(){if(!0===h)return Promise.resolve(o("term",e[0],n,u)).then(function(n){return 2===(v=(e=n)[1]).statusCode?(t=1,{data:e[0],status:v}):Promise.resolve(a(c,u)).then(function(){})})}();return s&&s.then?s.then(r):r(s)})},c=r({},null!==s?s:u.state.data[n]),f=u.appControl.editControl,m=f.handlers,h=f.autoSave;c[e]=function(e,t){var n=e;return"string"!=typeof n||"decimal"!==t.Type&&"number"!==t.Type&&"double"!==t.Type||(n=parseFloat(1*e),!0===isNaN(e)&&(e=0)),n}(t,u.state.columns[e]);var v={statusCode:0,msg:""},p=function(){if(null!=m[e])return Promise.resolve(m[e](c,e,n,u)).then(function(e){if(c=e[0],2===(v=e[1]).statusCode)return i=1,{data:e[0],status:v}})}();return Promise.resolve(p&&p.then?p.then(l):l(p))}catch(e){return Promise.reject(e)}},e.commonHandler=o,e.fetchTableRows=c,e.scrollTable=function(e,n){try{var o,a="cas"===n.source?Promise.resolve(function(e,t){try{var n,o=t.appControl,a=o.table;if("first"===e)(n=r({},o.initialFetch)).table=a;else if(-1===(n=t.state.pagination[e]).next)return Promise.resolve(null);return Promise.resolve(c(n,t))}catch(e){return Promise.reject(e)}}(e,n)).then(function(e){o=e}):Promise.resolve(function(e,n){try{var r=n.store,o=n.tableSummary,a=n.appControl.table,s=(a.libref+"."+a.name).toLowerCase();return Promise.resolve(t.computeFetchData(r,o,s,e,{qs:{limit:n.appControl.initialFetch.count}})).then(function(e){var t=null,r=function(){if(null!==e)return Promise.resolve(i(e,n)).then(function(e){n.state={modified:[],pagination:{},currentPage:{},data:(t=e).data,columns:t.columns}})}();return r&&r.then?r.then(function(){return t}):t})}catch(e){return Promise.reject(e)}}(e,n)).then(function(e){o=e});return Promise.resolve(a&&a.then?a.then(function(){return o}):o)}catch(e){return Promise.reject(e)}},e.setup=function(e,r,o){try{var a,s=n.initStore();null==e.authType&&(e.authType="code");var u="cas"===r.source?Promise.resolve(function(e,n,r){try{return Promise.resolve(t.casSetup(e,n)).then(function(t){return{source:r.source,store:e,session:t.session,servers:t.servers,restaflib:null,logonPayload:n,appControl:r,state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}},id:Date()}})}catch(e){return Promise.reject(e)}}(s,e,r)).then(function(e){a=e}):Promise.resolve(function(e,n,r,o){try{return Promise.resolve(t.computeSetup(e,r.computeContext,n)).then(function(a){return Promise.resolve(t.computeSetupTables(e,a,r.table,o)).then(function(t){return{source:r.source,store:e,session:a,tableSummary:t,servers:null,restaflib:null,logonPayload:n,appControl:r,state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}},id:Date()}})})}catch(e){return Promise.reject(e)}}(s,e,r,o)).then(function(e){a=e});return Promise.resolve(u&&u.then?u.then(function(){return a}):a)}catch(e){return Promise.reject(e)}},e.updateTableRows=a});
//# sourceMappingURL=index.umd.js.map
