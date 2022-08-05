import{casUpdateData as t,casFetchRows as e,casSetup as n}from"@sassoftware/restaflib";import{initStore as r}from"@sassoftware/restaf";function o(){return o=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},o.apply(this,arguments)}var a=function(t,e,n,r){try{var o=r.appControl.editControl.handlers;return null==o[t]?Promise.resolve([e,{statusCode:0,msg:null}]):Promise.resolve(o[t](e,n,r,t)).then(function(t){return[t[0],t[1]]})}catch(t){return Promise.reject(t)}},s=function(e,n){try{var r=n.store,o=n.session,a=n.appControl.dataControl,s=a.table,i=a.byvars,u=n.state.columns;if(null===i||0===i.length)return Promise.resolve();var l={};for(var c in e)"_index_"!==c&&!1===u[c].custom&&(l[c]=e[c]);var f={};return i.forEach(function(t){f[t]=l[t]}),Promise.resolve(t(r,o,{table:s,data:l,where:f}))}catch(t){return Promise.reject(t)}},i=function(t,e,n,r,i){try{var u,l=function(t){return u?t:Promise.resolve(a("main",c,n,i)).then(function(t){var e;function r(r){return e?r:(c=t[0],h.msg=h.msg+" / "+t[1],!0===i.appControl.dataControl.cachePolicy&&(i.state.data[n]=c),{data:c,status:h})}var o=function(){if(!0===m)return Promise.resolve(a("term",t[0],n,i)).then(function(n){return 2===(h=(t=n)[1]).statusCode?(e=1,{data:t[0],status:h}):Promise.resolve(s(c,i)).then(function(){})})}();return o&&o.then?o.then(r):r(o)})},c=o({},null!==r?r:i.state.data[n]),f=i.appControl.editControl,v=f.handlers,m=f.autoSave;c[t]=function(t,e){var n=t;return"string"!=typeof n||"decimal"!==e.Type&&"number"!==e.Type&&"double"!==e.Type||(n=parseFloat(1*t),!0===isNaN(t)&&(t=0)),n}(e,i.state.columns[t]);var h={statusCode:0,msg:""},d=function(){if(null!=v[t])return Promise.resolve(v[t](c,t,n,i)).then(function(t){if(c=t[0],2===(h=t[1]).statusCode)return u=1,{data:t[0],status:h}})}();return Promise.resolve(d&&d.then?d.then(l):l(d))}catch(t){return Promise.reject(t)}};function u(t,e,n){if(!t.s){if(n instanceof l){if(!n.s)return void(n.o=u.bind(null,t,e));1&e&&(e=n.s),n=n.v}if(n&&n.then)return void n.then(u.bind(null,t,e),u.bind(null,t,2));t.s=e,t.v=n;var r=t.o;r&&r(t)}}const l=/*#__PURE__*/function(){function t(){}return t.prototype.then=function(e,n){const r=new t,o=this.s;if(o){const t=1&o?e:n;if(t){try{u(r,1,t(this.v))}catch(t){u(r,2,t)}return r}return this}return this.o=function(t){try{const o=t.v;1&t.s?u(r,1,e?e(o):o):n?u(r,1,n(o)):u(r,2,o)}catch(t){u(r,2,t)}},r},t}();var c=function(t,n){try{var r=n.store,s=n.session,i=o({},t);return null==i.table&&(i.table=n.appControl.dataControl.table),null==i.where&&(i.where={}),i.from<=0||-1===i.next?Promise.resolve(null):Promise.resolve(e(r,s,i)).then(function(t){return Promise.resolve(function(t,e){try{var n=function(){var t={};if(r.forEach(function(e,n){var r=e.Column.toLowerCase();e.name=r,e.Label=null==e.Label||0===e.Label.length?e.Column:e.Label,e.custom=!1,t[r]=e}),null!=i)for(var e in i){var n=o({},i[e]);n.name=e,n.custom=!0,t[e]=n}return{columns:t,data:c}},r=t.schema,s=t.rows,i=e.appControl.dataControl.customColumns,c=[],f=(v=s,m=function(t){var n=function(t,e){var n={};if(e.forEach(function(e,r){var o=t[r],a=o.Column.toLowerCase();null==o.Label&&(o.Label=o.Column),n[a]=e}),null!=i)for(var r in i){var o=i[r],a=o.Column.toLowerCase();n[a]=o.value}return n}(r,s[t]);return Promise.resolve(a("init",n,t,e)).then(function(t){var e=t[0],n=t[1];0!==n.code&&console.log(JSON.stringify(n,null,4)),c.push(e)})},p=-1,function t(e){try{for(;++p<v.length;)if((e=m(p))&&e.then){if(!((n=e)instanceof l&&1&n.s))return void e.then(t,d||(d=u.bind(null,h=new l,2)));e=e.v}h?u(h,1,e):h=e}catch(t){u(h||(h=new l),2,t)}var n}(),h);return Promise.resolve(f&&f.then?f.then(n):n())}catch(t){return Promise.reject(t)}var v,m,h,d,p}(t.data,n)).then(function(e){return n.state={modified:[],pagination:o({},t.pagination),currentPage:i,data:[],columns:[]},!0===n.appControl.dataControl.cachePolicy&&(n.state.data=e.data,n.state.columns=e.columns),e.pagination=o({},t.pagination),e})})}catch(t){return Promise.reject(t)}},f=function(t,e){try{var n,r=e.appControl.dataControl,a=r.table;if("first"===t)(n=o({},r.initialFetch)).table=a;else if(-1===(n=e.state.pagination[t]).next)return Promise.resolve(null);return Promise.resolve(c(n,e))}catch(t){return Promise.reject(t)}},v=function(t,e){try{var o=r();return null==t.authType&&(t.authType="code"),Promise.resolve(n(o,t)).then(function(n){var r={store:o,session:n.session,servers:n.servers,restaflib:null,logonPayload:t,state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}}};return r.appControl=e,r.id=Date(),r})}catch(t){return Promise.reject(t)}};export{i as cellEdit,a as commonHandler,c as fetchTableRows,f as scrollTable,v as setup,s as updateTableRows};
//# sourceMappingURL=index.module.js.map
