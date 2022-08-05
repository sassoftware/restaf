var t=require("@sassoftware/restaflib"),e=require("@sassoftware/restaf");function r(){return r=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},r.apply(this,arguments)}var n=function(t,e,r,n){try{var o=n.appControl.editControl.handlers;return null==o[t]?Promise.resolve([e,{statusCode:0,msg:null}]):Promise.resolve(o[t](e,r,n,t)).then(function(t){return[t[0],t[1]]})}catch(t){return Promise.reject(t)}},o=function(e,r){try{var n=r.store,o=r.session,a=r.appControl.dataControl,s=a.table,i=a.byvars,u=r.state.columns;if(null===i||0===i.length)return Promise.resolve();var l={};for(var c in e)"_index_"!==c&&!1===u[c].custom&&(l[c]=e[c]);var f={};return i.forEach(function(t){f[t]=l[t]}),Promise.resolve(t.casUpdateData(n,o,{table:s,data:l,where:f}))}catch(t){return Promise.reject(t)}};function a(t,e,r){if(!t.s){if(r instanceof s){if(!r.s)return void(r.o=a.bind(null,t,e));1&e&&(e=r.s),r=r.v}if(r&&r.then)return void r.then(a.bind(null,t,e),a.bind(null,t,2));t.s=e,t.v=r;var n=t.o;n&&n(t)}}const s=/*#__PURE__*/function(){function t(){}return t.prototype.then=function(e,r){const n=new t,o=this.s;if(o){const t=1&o?e:r;if(t){try{a(n,1,t(this.v))}catch(t){a(n,2,t)}return n}return this}return this.o=function(t){try{const o=t.v;1&t.s?a(n,1,e?e(o):o):r?a(n,1,r(o)):a(n,2,o)}catch(t){a(n,2,t)}},n},t}();var i=function(e,o){try{var i=o.store,u=o.session,l=r({},e);return null==l.table&&(l.table=o.appControl.dataControl.table),null==l.where&&(l.where={}),l.from<=0||-1===l.next?Promise.resolve(null):Promise.resolve(t.casFetchRows(i,u,l)).then(function(t){return Promise.resolve(function(t,e){try{var o=function(){var t={};if(i.forEach(function(e,r){var n=e.Column.toLowerCase();e.name=n,e.Label=null==e.Label||0===e.Label.length?e.Column:e.Label,e.custom=!1,t[n]=e}),null!=l)for(var e in l){var n=r({},l[e]);n.name=e,n.custom=!0,t[e]=n}return{columns:t,data:c}},i=t.schema,u=t.rows,l=e.appControl.dataControl.customColumns,c=[],f=(v=u,h=function(t){var r=function(t,e){var r={};if(e.forEach(function(e,n){var o=t[n],a=o.Column.toLowerCase();null==o.Label&&(o.Label=o.Column),r[a]=e}),null!=l)for(var n in l){var o=l[n],a=o.Column.toLowerCase();r[a]=o.value}return r}(i,u[t]);return Promise.resolve(n("init",r,t,e)).then(function(t){var e=t[0],r=t[1];0!==r.code&&console.log(JSON.stringify(r,null,4)),c.push(e)})},p=-1,function t(e){try{for(;++p<v.length;)if((e=h(p))&&e.then){if(!((r=e)instanceof s&&1&r.s))return void e.then(t,d||(d=a.bind(null,m=new s,2)));e=e.v}m?a(m,1,e):m=e}catch(t){a(m||(m=new s),2,t)}var r}(),m);return Promise.resolve(f&&f.then?f.then(o):o())}catch(t){return Promise.reject(t)}var v,h,m,d,p}(t.data,o)).then(function(e){return o.state={modified:[],pagination:r({},t.pagination),currentPage:l,data:[],columns:[]},!0===o.appControl.dataControl.cachePolicy&&(o.state.data=e.data,o.state.columns=e.columns),e.pagination=r({},t.pagination),e})})}catch(t){return Promise.reject(t)}};exports.cellEdit=function(t,e,a,s,i){try{var u,l=function(t){return u?t:Promise.resolve(n("main",c,a,i)).then(function(t){var e;function r(r){return e?r:(c=t[0],m.msg=m.msg+" / "+t[1],!0===i.appControl.dataControl.cachePolicy&&(i.state.data[a]=c),{data:c,status:m})}var s=function(){if(!0===h)return Promise.resolve(n("term",t[0],a,i)).then(function(r){return 2===(m=(t=r)[1]).statusCode?(e=1,{data:t[0],status:m}):Promise.resolve(o(c,i)).then(function(){})})}();return s&&s.then?s.then(r):r(s)})},c=r({},null!==s?s:i.state.data[a]),f=i.appControl.editControl,v=f.handlers,h=f.autoSave;c[t]=function(t,e){var r=t;return"string"!=typeof r||"decimal"!==e.Type&&"number"!==e.Type&&"double"!==e.Type||(r=parseFloat(1*t),!0===isNaN(t)&&(t=0)),r}(e,i.state.columns[t]);var m={statusCode:0,msg:""},d=function(){if(null!=v[t])return Promise.resolve(v[t](c,t,a,i)).then(function(t){if(c=t[0],2===(m=t[1]).statusCode)return u=1,{data:t[0],status:m}})}();return Promise.resolve(d&&d.then?d.then(l):l(d))}catch(t){return Promise.reject(t)}},exports.commonHandler=n,exports.fetchTableRows=i,exports.scrollTable=function(t,e){try{var n,o=e.appControl.dataControl,a=o.table;if("first"===t)(n=r({},o.initialFetch)).table=a;else if(-1===(n=e.state.pagination[t]).next)return Promise.resolve(null);return Promise.resolve(i(n,e))}catch(t){return Promise.reject(t)}},exports.setup=function(r,n){try{var o=e.initStore();return null==r.authType&&(r.authType="code"),Promise.resolve(t.casSetup(o,r)).then(function(t){var e={store:o,session:t.session,servers:t.servers,restaflib:null,logonPayload:r,state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}}};return e.appControl=n,e.id=Date(),e})}catch(t){return Promise.reject(t)}},exports.updateTableRows=o;
//# sourceMappingURL=index.js.map
