import{casUpdateData as t,casFetchRows as n,computeFetchData as a,casSetup as e,computeSetup as o,computeSetupTables as s,caslRun as l,casUpload as r}from"@sassoftware/restaflib";import{initStore as i}from"@sassoftware/restaf";import c from"deepmerge";function u(){return u=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&(t[e]=a[e])}return t},u.apply(this,arguments)}async function f(t,n,a,e){const{handlers:o}=e.appControl.editControl;if(null==o[t])return[n,{statusCode:0,msg:null}];{const[s,l]=await o[t](n,a,e,t);return[s,l]}}async function m(n,a){let e;return e="cas"===a.source?await async function(n,a){const{store:e,session:o}=a,{table:s,byvars:l}=a.appControl,r=a.state.columns;if(null===l||0===l.length)return null;const i={};for(const t in n)"_index_"!==t&&"_rowIndex"!==t&&!1===r[t].custom&&(i[t]=n[t]);const c={};l.forEach(t=>{c[t]=i[t]});const u={table:s,data:i,where:c},f={statusCode:0,msg:"Save successful"};return"Normal"!==(await t(e,o,u)).items().toJS().disposition.severity&&(f.statusCode=2,f.msg=i.disposition.severity.reason),f}(n,a):await async function(t,n){const{store:a,session:e}=n,{table:o,byvars:s}=n.appControl,l=n.state.columns;if(null===s||0===s.length)return null;let r=`proc sql; update ${o.libref}.${o.name}`,i="SET ",c=" ";for(const n in t)!1===l[n].custom&&(i=i+c+n+"="+d(t[n])),c=", ";r=r+" "+i;let u=" WHERE ",f=" ";s.forEach(n=>{u=u+f+n+"="+d(t[n]),f="AND "}),r=r+" "+u+";run;";const m={data:{code:r.split(/\r?\n/)}},p=await a.apiCall(e.links("execute"),m),g=await a.jobState(p,{qs:{newState:"Completed",timeout:1}});return{statusCode:"completed"===g.data?0:1,msg:g.data}}(n,a),e}function d(t){let n;return n=null==t?".":"string"==typeof t?JSON.stringify(t):t.toString(),n}async function p(t,n,a,e,o){let s=u({},e);const l=o.state.columns,{handlers:r,autoSave:i}=o.appControl.editControl;s[t]=function(t,n){let a=t;const e=n.Type.toLowerCase();return"string"!=typeof a||"decimal"!==e&&"number"!==e&&"double"!==e&&"float"!==e||(a=parseFloat(1*t),!0===isNaN(t)&&(t=0)),a}(n,l[t]);let c={statusCode:0,msg:""};if(null!=r[t]){const n=await r[t](s,t,a,o);if(s=n[0],c=n[1],2===c.statusCode)return{data:n[0],status:c}}let d=await f("main",s,a,o);if(!0===i){if(d=await f("term",d[0],a,o),c=d[1],2===c.statusCode)return{data:d[0],status:c};c=await m(d[0],o)}return s=d[0],!0===o.appControl.cachePolicy&&(o.state.data[e._rowIndex]=s),{data:s,status:c}}async function g(t,n){const{schema:a,rows:e}=t,o=n.appControl.customColumns;let s={statusCode:0,msg:"Initialization was successful"};const l=(t,n,a)=>{const e={_rowIndex:a};if(n.forEach((n,a)=>{const o=t[a].Column.toLowerCase();e[o]=n}),null!=o)for(const t in o){const n=o[t],a=n.Column.toLowerCase();e[a]=n.value}return e},r=[];for(let t=0;t<e.length;t++){const o=l(a,e[t],t),[i,c]=await f("init",o,t,n);s=c,r.push(i)}const i={};if(a.forEach((t,n)=>{const a=t.Column.toLowerCase();t.name=a,t.Label=null==t.Label||0===t.Label.length?t.Column:t.Label,null==t.Type&&(t.Type=null==t.type?"double":t.type),t.custom=!1,i[a]=t}),null!=o)for(const t in o){const n=u({},o[t]);n.name=t,n.custom=!0,i[t]=n}return{columns:i,data:r,status:s}}async function w(t,e){let o=null;return o="cas"===e.source?await async function(t,a){const{store:e,session:o}=a,s=u({},t);if(s.from<=0||-1===s.next)return null;null==s.where&&(s.where=" ");const l=await n(e,o,s);let r=null;return null!==l&&(r=await g(l.data,a),a.state={modified:[],pagination:u({},l.pagination),currentPage:s,data:[],columns:[]},!0===a.appControl.cachePolicy&&(a.state.data=r.data,a.state.columns=r.columns),r.pagination=u({},l.pagination)),r}(t,e):await async function(t,n){const{store:e,tableSummary:o}=n,{table:s}=n.appControl,l=`${s.libref}.${s.name}`.toLowerCase();let r={qs:{start:t.from-1,limit:t.count,format:null==t.format&&t.format}};const i=await a(e,o,l,null,r);let c=null;return null!==i&&(c=await g(i,n),n.state={modified:[],pagination:{},currentPage:{},data:c.data,columns:c.columns}),c}(t,e),o}async function y(t,e,o){let s;return s="cas"===e.source?await async function(t,a,e){const{store:o,session:s}=a,{initialFetch:l,table:r}=a.appControl;let i;if("first"===t)i=u({},l);else if(null!==t&&(i=u({},a.state.pagination[t]),-1===i.next||i.from<=0))return null;null!=e&&(i=u({},e)),i.table=r;const c=await n(o,s,i);let f=null;if(null!==c)return f=await g(c.data,a),a.state={modified:[],pagination:u({},c.pagination),currentPage:i,data:[],columns:[]},!0===a.appControl.cachePolicy&&(a.state.data=f.data,a.state.columns=f.columns),f.pagination=u({},c.pagination),f}(t,e,o):await async function(t,n,e){const{store:o,tableSummary:s}=n,{table:l,initialFetch:r}=n.appControl;let i=null;const c=`${l.libref}.${l.name}`.toLowerCase();null==e?"first"===t&&(i=u({},r)):i=u({},e);const f=await a(o,s,c,t,i);let m=null;return null!==f&&(m=await g(f,n),n.state={modified:[],pagination:{},currentPage:{},data:m.data,columns:m.columns}),m}(t,e,o),s}async function C(t,n,a){const l=i();let r;return null==t.authType&&(t.authType="code"),r="cas"===n.source?await async function(t,n,a){const o=await e(t,n);return{source:a.source,store:t,session:o.session,servers:o.servers,restaflib:null,logonPayload:n,appControl:a,state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}},id:Date()}}(l,t,n):await async function(t,n,a,e){let l=await o(t,a.computeContext,n),r=await s(t,l,a.table,e);return{source:a.source,store:t,session:l,tableSummary:r,servers:null,restaflib:null,logonPayload:n,appControl:c(a),state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}},id:Date()}}(l,t,n,a),r}async function b(t,n,a,e){let o;return o="cas"===a.source?await async function(t,n,a,e){const{store:o,session:s}=a,r={table:t,column:n},i=await l(o,s,"\n  results = selectionLists(_args_.column,_args_.table.caslib, _args_.table.name);\n  send_response({casResults = {data=results}});\n  ",r,!0);if(0!==i.results.casResults.data.statusCode)throw"Failed to create unique list";return i.results.casResults.data.data}(t,n,a):await async function(t,n,a){const e={};return e[t]=[],e}(t),o}async function h(t,n,a,e,o){const{store:s,session:l}=o;let i=n[0];for(let t=0;t<a.length;t++)delete i[a[t]];i=u({},e,i);const c=Object.keys(i);let f,m=c.join(",")+"\n";for(let t=0;t<n.length;t++){let a=n[t];a=u({},a,e);const o=[];c.forEach((t,n)=>{let e=a[t];"string"==typeof e&&(e=e.trim()),o[n]=e}),m=m+o.join(",")+"\n"}return console.log(m),console.log(r),console.log(v),f="cas"===o.source?await v(s,l,0,m):{},console.log(f.items().toJS()),f}async function v(t,n,a,e){console.log("calling casUpload");const o=await r(t,n,null,"casuser.temp",!0,e);console.log("end of casUpload"),console.log(o.items().toJS())}async function S(t,n,a){return[]}export{p as cellEdit,f as commonHandler,b as distinctValues,w as fetchTableRows,y as scrollTable,C as setup,S as sort,m as updateTableRows,h as uploadData};
//# sourceMappingURL=index.modern.mjs.map