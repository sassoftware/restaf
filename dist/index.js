var e=require("@sassoftware/restaflib"),t=require("@sassoftware/restaf");function r(){return r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},r.apply(this,arguments)}var n=function(e,t,r,n){try{var o=n.appControl.editControl.handlers;return null==o[e]?Promise.resolve([t,{statusCode:0,msg:null}]):Promise.resolve(o[e](t,r,n,e)).then(function(e){return[e[0],e[1]]})}catch(e){return Promise.reject(e)}},o=function(t,r){try{var n,o="cas"===r.source?Promise.resolve(function(t,r){try{var n=r.store,o=r.session,s=r.appControl,a=s.table,u=s.byvars,i=r.state.columns;if(null===u||0===u.length)return Promise.resolve(null);var l={};for(var c in t)"_index_"!==c&&!1===i[c].custom&&(l[c]=t[c]);var f={};return u.forEach(function(e){f[e]=l[e]}),Promise.resolve(e.casUpdateData(n,o,{table:a,data:l,where:f})).then(function(e){var t={statusCode:0,msg:"Save successful"};return"Normal"!==e.items().toJS().disposition.severity&&(t.statusCode=2,t.msg=l.disposition.severity.reason),t})}catch(e){return Promise.reject(e)}}(t,r)).then(function(e){n=e}):Promise.resolve(function(e,t){try{var r=t.store,n=t.session,o=t.appControl,a=o.table,u=o.byvars,i=t.state.columns;if(null===u||0===u.length)return Promise.resolve(null);var l="proc sql; update "+a.libref+"."+a.name,c="SET ",f=" ";for(var m in e)!1===i[m].custom&&(c=c+f+m+"="+s(e[m])),f=", ";l=l+" "+c;var v=" WHERE ",h=" ";u.forEach(function(t){v=v+h+t+"="+s(e[t]),h="AND "});var p={data:{code:(l=l+" "+v+";run;").split(/\r?\n/)}};return Promise.resolve(r.apiCall(n.links("execute"),p)).then(function(e){return Promise.resolve(r.jobState(e,{qs:{newState:"Completed",timeout:1}})).then(function(e){return{statusCode:"completed"===e.data?0:1,msg:e.data}})})}catch(e){return Promise.reject(e)}}(t,r)).then(function(e){n=e});return Promise.resolve(o&&o.then?o.then(function(){return n}):n)}catch(e){return Promise.reject(e)}};function s(e){return null==e?".":"string"==typeof e?JSON.stringify(e):e.toString()}function a(e,t,r){if(!e.s){if(r instanceof i){if(!r.s)return void(r.o=a.bind(null,e,t));1&t&&(t=r.s),r=r.v}if(r&&r.then)return void r.then(a.bind(null,e,t),a.bind(null,e,2));e.s=t,e.v=r;var n=e.o;n&&n(e)}}var u=function(e,t){try{var o=function(){var e={};if(s.forEach(function(t,r){var n=t.Column.toLowerCase();t.name=n,t.Label=null==t.Label||0===t.Label.length?t.Column:t.Label,null==t.type&&(t.type=t.Type),t.custom=!1,e[n]=t}),null!=l)for(var t in l){var n=r({},l[t]);n.name=t,n.custom=!0,e[t]=n}return{columns:e,data:f,status:c}},s=e.schema,u=e.rows,l=t.appControl.customColumns,c={statusCode:0,msg:"Initialization was successful"},f=[],m=(v=u,h=function(e){var r=function(e,t){var r={};if(t.forEach(function(t,n){var o=e[n],s=o.Column.toLowerCase();null==o.Label&&(o.Label=o.Column),r[s]=t}),null!=l)for(var n in l){var o=l[n],s=o.Column.toLowerCase();r[s]=o.value}return r}(s,u[e]);return Promise.resolve(n("init",r,e,t)).then(function(e){c=e[1],f.push(e[0])})},P=-1,function e(t){try{for(;++P<v.length;)if((t=h(P))&&t.then){if(!((r=t)instanceof i&&1&r.s))return void t.then(e,d||(d=a.bind(null,p=new i,2)));t=t.v}p?a(p,1,t):p=t}catch(e){a(p||(p=new i),2,e)}var r}(),p);return Promise.resolve(m&&m.then?m.then(o):o())}catch(e){return Promise.reject(e)}var v,h,p,d,P};const i=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(t,r){const n=new e,o=this.s;if(o){const e=1&o?t:r;if(e){try{a(n,1,e(this.v))}catch(e){a(n,2,e)}return n}return this}return this.o=function(e){try{const o=e.v;1&e.s?a(n,1,t?t(o):o):r?a(n,1,r(o)):a(n,2,o)}catch(e){a(n,2,e)}},n},e}();var l=function(t,n){try{var o=null,s="cas"===n.source?Promise.resolve(function(t,n){try{var o=n.store,s=n.session,a=r({},t);return null==a.table&&(a.table=n.appControl.table),null==a.where&&(a.where={}),a.from<=0||-1===a.next?Promise.resolve(null):Promise.resolve(e.casFetchRows(o,s,a)).then(function(e){var t=null,o=function(){if(null!==e)return Promise.resolve(u(e.data,n)).then(function(o){t=o,n.state={modified:[],pagination:r({},e.pagination),currentPage:a,data:[],columns:[]},!0===n.appControl.cachePolicy&&(n.state.data=t.data,n.state.columns=t.columns),t.pagination=r({},e.pagination)})}();return o&&o.then?o.then(function(){return t}):t})}catch(e){return Promise.reject(e)}}(t,n)).then(function(e){o=e}):Promise.resolve(function(t,r){try{var n=r.store,o=r.tableSummary,s=r.appControl.table,a=(s.libref+"."+s.name).toLowerCase();return Promise.resolve(e.computeFetchData(n,o,a,null,{qs:{start:t.from-1,limit:t.count,format:null==t.format&&t.format}})).then(function(e){var t=null,n=function(){if(null!==e)return Promise.resolve(u(e,r)).then(function(e){r.state={modified:[],pagination:{},currentPage:{},data:(t=e).data,columns:t.columns}})}();return n&&n.then?n.then(function(){return t}):t})}catch(e){return Promise.reject(e)}}(t,n)).then(function(e){o=e});return Promise.resolve(s&&s.then?s.then(function(){return o}):o)}catch(e){return Promise.reject(e)}};exports.cellEdit=function(e,t,s,a,u){try{var i,l=function(e){return i?e:Promise.resolve(n("main",c,s,u)).then(function(e){var t;function r(r){return t?r:(c=e[0],h.msg=h.msg+" / "+e[1],!0===u.appControl.cachePolicy&&(u.state.data[s]=c),{data:c,status:h})}var a=function(){if(!0===v)return Promise.resolve(n("term",e[0],s,u)).then(function(r){return 2===(h=(e=r)[1]).statusCode?(t=1,{data:e[0],status:h}):Promise.resolve(o(e[0],u)).then(function(e){h=e})})}();return a&&a.then?a.then(r):r(a)})},c=r({},null!==a?a:u.state.data[s]),f=u.appControl.editControl,m=f.handlers,v=f.autoSave;c[e]=function(e,t){var r=e,n=t.type.toLowerCase();return"string"!=typeof r||"decimal"!==n&&"number"!==n&&"double"!==n&&"float"!==n||(r=parseFloat(1*e),!0===isNaN(e)&&(e=0)),r}(t,u.state.columns[e]);var h={statusCode:0,msg:""},p=function(){if(null!=m[e])return Promise.resolve(m[e](c,e,s,u)).then(function(e){if(c=e[0],2===(h=e[1]).statusCode)return i=1,{data:e[0],status:h}})}();return Promise.resolve(p&&p.then?p.then(l):l(p))}catch(e){return Promise.reject(e)}},exports.commonHandler=n,exports.fetchTableRows=l,exports.scrollTable=function(t,n){try{var o,s="cas"===n.source?Promise.resolve(function(e,t){try{var n,o=t.appControl,s=o.table;if("first"===e)(n=r({},o.initialFetch)).table=s;else if(-1===(n=t.state.pagination[e]).next)return Promise.resolve(null);return Promise.resolve(l(n,t))}catch(e){return Promise.reject(e)}}(t,n)).then(function(e){o=e}):Promise.resolve(function(t,r){try{var n=r.store,o=r.tableSummary,s=r.appControl.table,a=(s.libref+"."+s.name).toLowerCase();return Promise.resolve(e.computeFetchData(n,o,a,t,{qs:{limit:r.appControl.initialFetch.count}})).then(function(e){var t=null,n=function(){if(null!==e)return Promise.resolve(u(e,r)).then(function(e){r.state={modified:[],pagination:{},currentPage:{},data:(t=e).data,columns:t.columns}})}();return n&&n.then?n.then(function(){return t}):t})}catch(e){return Promise.reject(e)}}(t,n)).then(function(e){o=e});return Promise.resolve(s&&s.then?s.then(function(){return o}):o)}catch(e){return Promise.reject(e)}},exports.setup=function(r,n,o){try{var s,a=t.initStore();null==r.authType&&(r.authType="code");var u="cas"===n.source?Promise.resolve(function(t,r,n){try{return Promise.resolve(e.casSetup(t,r)).then(function(e){return{source:n.source,store:t,session:e.session,servers:e.servers,restaflib:null,logonPayload:r,appControl:n,state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}},id:Date()}})}catch(e){return Promise.reject(e)}}(a,r,n)).then(function(e){s=e}):Promise.resolve(function(t,r,n,o){try{return Promise.resolve(e.computeSetup(t,n.computeContext,r)).then(function(s){return Promise.resolve(e.computeSetupTables(t,s,n.table,o)).then(function(e){return{source:n.source,store:t,session:s,tableSummary:e,servers:null,restaflib:null,logonPayload:r,appControl:n,state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}},id:Date()}})})}catch(e){return Promise.reject(e)}}(a,r,n,o)).then(function(e){s=e});return Promise.resolve(u&&u.then?u.then(function(){return s}):s)}catch(e){return Promise.reject(e)}},exports.updateTableRows=o;
//# sourceMappingURL=index.js.map
