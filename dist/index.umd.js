!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@sassoftware/restaflib"),require("@sassoftware/restaf")):"function"==typeof define&&define.amd?define(["exports","@sassoftware/restaflib","@sassoftware/restaf"],t):t((e||self).restafedit={},e.restaflib,e.restaf)}(this,function(e,t,n){function r(){return r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},r.apply(this,arguments)}var o=function(e,t,n,r){try{var o=r.appControl.editControl.handlers;return null==o[e]?Promise.resolve([t,{status:0,msg:null}]):Promise.resolve(o[e](t,n,r,e)).then(function(e){return[e[0],e[1]]})}catch(e){return Promise.reject(e)}},a=function(e,n){try{var r=n.store,o=n.session,a=n.appControl.dataControl,s=a.table,i=a.byvars,l=n.state.columns;if(null===i||0===i.length)return Promise.resolve();var u={};for(var c in e)"_index_"!==c&&!1===l[c].custom&&(u[c]=e[c]);var f={};return i.forEach(function(e){f[e]=u[e]}),Promise.resolve(t.casUpdateData(r,o,{table:s,data:u,where:f}))}catch(e){return Promise.reject(e)}};function s(e,t,n){if(!e.s){if(n instanceof i){if(!n.s)return void(n.o=s.bind(null,e,t));1&t&&(t=n.s),n=n.v}if(n&&n.then)return void n.then(s.bind(null,e,t),s.bind(null,e,2));e.s=t,e.v=n;var r=e.o;r&&r(e)}}const i=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(t,n){const r=new e,o=this.s;if(o){const e=1&o?t:n;if(e){try{s(r,1,e(this.v))}catch(e){s(r,2,e)}return r}return this}return this.o=function(e){try{const o=e.v;1&e.s?s(r,1,t?t(o):o):n?s(r,1,n(o)):s(r,2,o)}catch(e){s(r,2,e)}},r},e}();var l=function(e,n){try{var a=n.store,l=n.session,u=r({},e);return null==u.table&&(u.table=n.appControl.dataControl.table),null==u.where&&(u.where={}),u.from<=0||-1===u.next?Promise.resolve(null):Promise.resolve(t.casFetchRows(a,l,u)).then(function(e){return Promise.resolve(function(e,t){try{var n=function(){var e={};if(a.forEach(function(t,n){var r=t.Column.toLowerCase();t.name=r,t.Label=null==t.Label||0===t.Label.length?t.Column:t.Label,t.custom=!1,e[r]=t}),null!=u)for(var t in u){var n=r({},u[t]);n.name=t,n.custom=!0,e[t]=n}return{columns:e,data:c}},a=e.schema,l=e.rows,u=t.appControl.dataControl.customColumns,c=[],f=(v=l,h=function(e){var n=function(e,t){var n={};if(t.forEach(function(t,r){var o=e[r],a=o.Column.toLowerCase();null==o.Label&&(o.Label=o.Column),n[a]=t}),null!=u)for(var r in u){var o=u[r],a=o.Column.toLowerCase();n[a]=o.value}return n}(a,l[e]);return Promise.resolve(o("init",n,e,t)).then(function(e){var t=e[0],n=e[1];0!==n.code&&console.log(JSON.stringify(n,null,4)),c.push(t)})},p=-1,function e(t){try{for(;++p<v.length;)if((t=h(p))&&t.then){if(!((n=t)instanceof i&&1&n.s))return void t.then(e,d||(d=s.bind(null,m=new i,2)));t=t.v}m?s(m,1,t):m=t}catch(e){s(m||(m=new i),2,e)}var n}(),m);return Promise.resolve(f&&f.then?f.then(n):n())}catch(e){return Promise.reject(e)}var v,h,m,d,p}(e.data,n)).then(function(t){return n.state={modified:[],pagination:r({},e.pagination),currentPage:u,data:[],columns:[]},!0===n.appControl.dataControl.cachePolicy&&(n.state.data=t.data,n.state.columns=t.columns),t.pagination=r({},e.pagination),t})})}catch(e){return Promise.reject(e)}};e.cellEdit=function(e,t,n,s,i){try{var l=function(){return Promise.resolve(o("main",u,n,i)).then(function(e){function t(){return u=e[0],h.msg=h.msg+" / "+e[1],!0===i.appControl.dataControl.cachePolicy&&(i.state.data[n]=u),{data:u,status:h}}var r=function(){if(!0===v)return Promise.resolve(o("term",e[0],n,i)).then(function(t){return e=t,Promise.resolve(a(u,i)).then(function(){})})}();return r&&r.then?r.then(t):t()})},u=r({},null!==s?s:i.state.data[n]),c=i.appControl.editControl,f=c.handlers,v=c.autoSave;u[e]=function(e,t){var n=e;return"string"!=typeof n||"decimal"!==t.Type&&"number"!==t.Type&&"double"!==t.Type||(n=parseFloat(1*e),!0===isNaN(e)&&(e=0)),n}(t,i.state.columns[e]);var h={status:0,msg:""},m=function(){if(null!=f[e])return Promise.resolve(f[e](u,e,n,i)).then(function(e){u=e[0],h=e[1]})}();return Promise.resolve(m&&m.then?m.then(l):l())}catch(e){return Promise.reject(e)}},e.commonHandler=o,e.fetchTableRows=l,e.scrollTable=function(e,t){try{var n,o=t.appControl.dataControl,a=o.table;if("first"===e)(n=r({},o.initialFetch)).table=a;else if(-1===(n=t.state.pagination[e]).next)return Promise.resolve(null);return Promise.resolve(l(n,t))}catch(e){return Promise.reject(e)}},e.setup=function(e,r){try{var o=n.initStore();return null==e.authType&&(e.authType="code"),Promise.resolve(t.casSetup(o,e)).then(function(t){var n={store:o,session:t.session,servers:t.servers,restaflib:null,logonPayload:e,state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}}};return n.appControl=r,n.id=Date(),n})}catch(e){return Promise.reject(e)}},e.updateTableRows=a});
//# sourceMappingURL=index.umd.js.map