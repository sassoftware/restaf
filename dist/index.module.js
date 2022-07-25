import{casUpdateData as t,casFetchRows as n,casSetup as r}from"@sassoftware/restaflib";import{initStore as e}from"@sassoftware/restaf";function o(){return o=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e])}return t},o.apply(this,arguments)}var a=function(t,n,r,e){try{var o=e.appControl.editControl.handlers;return null==o[t]?Promise.resolve([n,{status:0,msg:null}]):Promise.resolve(o[t](n,r,e,t)).then(function(t){return[t[0],t[1]]})}catch(t){return Promise.reject(t)}},s=function(n,r){try{var e=r.store,o=r.session,a=r.appControl.dataControl,s=a.table,i=a.byvars,l=r.state.columns;if(null===i||0===i.length)return Promise.resolve();var u={};for(var c in n)"_index_"!==c&&!1===l[c].custom&&(u[c]=n[c]);var f={};return i.forEach(function(t){f[t]=u[t]}),Promise.resolve(t(e,o,{table:s,data:u,where:f}))}catch(t){return Promise.reject(t)}},i=function(t,n,r,e,i){try{var l=function(){return Promise.resolve(a("main",u,r,i)).then(function(t){function n(){return{data:u,status:m}}u=t[0],m.msg=m.msg+" / "+t[1],!0===i.appControl.dataControl.cachePolicy&&(i.state.data[r]=u);var e=function(){if(!0===v)return Promise.resolve(s(u,i)).then(function(){})}();return e&&e.then?e.then(n):n()})},u=o({},null!==e?e:i.state.data[r]),c=i.appControl.editControl,f=c.handlers,v=c.autoSave;u[t]=function(t,n){var r=t;return"string"!=typeof r||"decimal"!==n.Type&&"number"!==n.Type&&"double"!==n.Type||(r=parseFloat(1*t),!0===isNaN(t)&&(t=0)),r}(n,i.state.columns[t]);var m={status:0,msg:""},h=function(){if(null!=f[t])return Promise.resolve(f[t](u,t,r,i)).then(function(t){u=t[0],m=t[1]})}();return Promise.resolve(h&&h.then?h.then(l):l())}catch(t){return Promise.reject(t)}};function l(t,n,r){if(!t.s){if(r instanceof u){if(!r.s)return void(r.o=l.bind(null,t,n));1&n&&(n=r.s),r=r.v}if(r&&r.then)return void r.then(l.bind(null,t,n),l.bind(null,t,2));t.s=n,t.v=r;var e=t.o;e&&e(t)}}const u=/*#__PURE__*/function(){function t(){}return t.prototype.then=function(n,r){const e=new t,o=this.s;if(o){const t=1&o?n:r;if(t){try{l(e,1,t(this.v))}catch(t){l(e,2,t)}return e}return this}return this.o=function(t){try{const o=t.v;1&t.s?l(e,1,n?n(o):o):r?l(e,1,r(o)):l(e,2,o)}catch(t){l(e,2,t)}},e},t}();var c=function(t,r){try{var e=r.store,s=r.session,i=o({},t);return null==i.table&&(i.table=r.appControl.dataControl.table),null==i.where&&(i.where={}),i.from<=0||-1===i.next?Promise.resolve(null):Promise.resolve(n(e,s,i)).then(function(t){return Promise.resolve(function(t,n){try{var r=function(){var t={};if(e.forEach(function(n,r){var e=n.Column.toLowerCase();n.name=e,n.Label=null==n.Label||0===n.Label.length?n.Column:n.Label,n.custom=!1,t[e]=n}),null!=i)for(var n in i){var r=o({},i[n]);r.name=n,r.custom=!0,t[n]=r}return{columns:t,data:c}},e=t.schema,s=t.rows,i=n.appControl.dataControl.customColumns,c=[],f=(v=s,m=function(t){var r=function(t,n){var r={};if(n.forEach(function(n,e){var o=t[e],a=o.Column.toLowerCase();null==o.Label&&(o.Label=o.Column),r[a]=n}),null!=i)for(var e in i){var o=i[e],a=o.Column.toLowerCase();r[a]=o.value}return r}(e,s[t]);return Promise.resolve(a("init",r,t,n)).then(function(t){var n=t[0],r=t[1];0!==r.code&&console.log(JSON.stringify(r,null,4)),c.push(n)})},d=-1,function t(n){try{for(;++d<v.length;)if((n=m(d))&&n.then){if(!((r=n)instanceof u&&1&r.s))return void n.then(t,p||(p=l.bind(null,h=new u,2)));n=n.v}h?l(h,1,n):h=n}catch(t){l(h||(h=new u),2,t)}var r}(),h);return Promise.resolve(f&&f.then?f.then(r):r())}catch(t){return Promise.reject(t)}var v,m,h,p,d}(t.data,r)).then(function(n){return r.state={modified:[],pagination:o({},t.pagination),currentPage:i,data:[],columns:[]},!0===r.appControl.dataControl.cachePolicy&&(r.state.data=n.data,r.state.columns=n.columns),n.pagination=o({},t.pagination),n})})}catch(t){return Promise.reject(t)}},f=function(t,n){try{var r,e=n.appControl.dataControl,a=e.table;if("first"===t)(r=o({},e.initialFetch)).table=a;else if(-1===(r=n.state.pagination[t]).next)return Promise.resolve(null);return console.log(r),Promise.resolve(c(r,n))}catch(t){return Promise.reject(t)}},v=function(t,n){try{var o=e();return null==t.authType&&(t.authType="code"),Promise.resolve(r(o,t)).then(function(r){var e={store:o,session:r.session,servers:r.servers,restaflib:null,logonPayload:t,state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}}};return e.appControl=n,e.id=Date(),e})}catch(t){return Promise.reject(t)}};export{i as cellEdit,a as commonHandler,c as fetchTableRows,f as scrollTable,v as setup,s as updateTableRows};
//# sourceMappingURL=index.module.js.map
