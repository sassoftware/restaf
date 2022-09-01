import{casUpdateData as t,computeUpdateData as n,casFetchRows as a,computeFetchData as e,casSetup as o,caslRun as s,computeSetup as l,computeSetupTables as r,computeRun as i,casUpload as u,casAppendTable as c}from"@sassoftware/restaflib";import{initStore as f}from"@sassoftware/restaf";import m from"deepcopy";function d(){return d=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&(t[e]=a[e])}return t},d.apply(this,arguments)}async function p(t,n,a,e){const{handlers:o}=e.appControl.editControl;if(null==o[t])return[n,{statusCode:0,msg:null}];{const[s,l]=await o[t](n,a,e,t);return[s,l]}}async function w(t,n){let a;const e=n.appControl.byvars;if(null===e||0===e.length)return[null,{msg:"Error: Please specify a by variable",statusCode:1}];if(!0===Array.isArray(t))for(let e=0;e<t.length;e++)a=await y(t[e],n);else a=await y(t,n);return a}async function y(a,e){const{store:o,session:s}=e,l="cas"===e.source?t:n,r=function(t,n){const{table:a,byvars:e}=n.appControl,o=n.state.columns,s={};for(const n in t)"_index_"!==n&&"_rowIndex"!==n&&!1===o[n].custom&&(s[n]=t[n]);const l={};return e.forEach(t=>{l[t]=s[t]}),{table:a,data:s,where:l}}(a,e);return await l(o,s,r)}async function g(t,n,a,e,o){let s=d({},e);const l=o.state.columns,{handlers:r,autoSave:i}=o.appControl.editControl;s[t]=function(t,n){let a=t;const e=n.Type.toLowerCase();return"string"!=typeof a||"decimal"!==e&&"number"!==e&&"double"!==e&&"float"!==e||(a=parseFloat(1*t),!0===isNaN(t)&&(t=0)),a}(n,l[t]);let u={statusCode:0,msg:""};if(null!=r[t]){const n=await r[t](s,t,a,o);if(s=n[0],u=n[1],2===u.statusCode)return{data:n[0],status:u}}let c=await p("main",s,a,o);if(!0===i){if(c=await p("term",c[0],a,o),u=c[1],2===u.statusCode)return{data:c[0],status:u};u=await w(c[0],o)}return s=c[0],!0===o.appControl.cachePolicy&&(o.state.data[e._rowIndex]=s),{data:s,status:u}}async function C(t,n){const{schema:a,rows:e}=t,o=n.appControl.customColumns;let s={statusCode:0,msg:"Initialization was successful"};const l=(t,n,a)=>{const e={_rowIndex:a};if(n.forEach((n,a)=>{const o=t[a].Column.toLowerCase();e[o]=n}),null!=o)for(const t in o){const n=o[t],a=n.Column.toLowerCase();e[a]=n.value}return e},r=[];for(let t=0;t<e.length;t++){const o=l(a,e[t],t),[i,u]=await p("init",o,t,n);s=u,r.push(i)}const i={};if(a.forEach((t,n)=>{const a=t.Column.toLowerCase();t.name=a,t.Label=null==t.Label||0===t.Label.length?t.Column:t.Label,null==t.Type&&(t.Type=null==t.type?"double":t.type),t.custom=!1,i[a]=t}),null!=o)for(const t in o){const n=d({},o[t]);n.name=t,n.custom=!0,i[t]=n}return{columns:i,data:r,status:s}}async function b(t,n){let o=null;return o="cas"===n.source?await async function(t,n){const{store:e,session:o}=n,s=d({},t);if(s.from<=0||-1===s.next)return null;null==s.where&&(s.where=" ");const l=await a(e,o,s);let r=null;return null!==l&&(r=await C(l.data,n),n.state={modified:[],pagination:d({},l.pagination),currentPage:s,data:[],columns:[]},!0===n.appControl.cachePolicy&&(n.state.data=r.data,n.state.columns=r.columns),r.pagination=d({},l.pagination)),r}(t,n):await async function(t,n){const{store:a,tableSummary:o}=n,{table:s}=n.appControl,l=`${s.libref}.${s.name}`.toLowerCase();let r={qs:{start:t.from-1,limit:t.count,format:null==t.format&&t.format}};const i=await e(a,o,l,null,r);let u=null;return null!==i&&(u=await C(i,n),n.state={modified:[],pagination:{},currentPage:{},data:u.data,columns:u.columns}),u}(t,n),o}async function h(t,n,o){let s;return s="cas"===n.source?await async function(t,n,e){const{store:o,session:s}=n,{initialFetch:l,table:r}=n.appControl;let i;if("first"===t)i=d({},l);else if(null!==t&&(i=d({},n.state.pagination[t]),-1===i.next||i.from<=0))return null;null!=e&&(i=d({},e)),i.table=r;const u=await a(o,s,i);let c=null;if(null!==u)return c=await C(u.data,n),n.state={modified:[],pagination:d({},u.pagination),currentPage:i,data:[],columns:[]},!0===n.appControl.cachePolicy&&(n.state.data=c.data,n.state.columns=c.columns),c.pagination=d({},u.pagination),c}(t,n,o):await async function(t,n,a){const{store:o,tableSummary:s}=n,{table:l,initialFetch:r}=n.appControl;let i=null;const u=`${l.libref}.${l.name}`.toLowerCase();null==a?"first"===t&&(i=d({},r)):i=d({},a);const c=await e(o,s,u,t,i);let f=null;return null!==c&&(f=await C(c,n),n.state={modified:[],pagination:{},currentPage:{},data:f.data,columns:f.columns}),f}(t,n,o),s}async function _(t,n,a){const e=f();let s;return null==t.authType&&(t.authType="code"),s="cas"===n.source?await async function(t,n,a,e){const s=await o(t,n);return{source:a.source,store:t,session:s.session,servers:s.servers,restaflib:null,logonPayload:n,appControl:m(a),state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}},id:Date()}}(e,t,n):await async function(t,n,a,e){let o=await l(t,a.computeContext,n),s=await r(t,o,a.table,e);return{source:a.source,store:t,session:o,tableSummary:s,servers:null,restaflib:null,logonPayload:n,appControl:m(a),state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}},id:Date()}}(e,t,n,a),s}async function P(t,n,a,e){let o;return o="cas"===a.source?await async function(t,n,a,e){const{store:o,session:l}=a,r={table:t,column:n},i=await s(o,l,"\n  results = selectionLists(_args_.column,_args_.table.caslib, _args_.table.name);\n  send_response({casResults = {data=results}});\n  ",r,!0);if(0!==i.results.casResults.data.statusCode)throw"Failed to create unique list";return i.results.casResults.data.data}(t,n,a):await async function(t,n,a){const e={};return e[t]=[],e}(t),o}async function L(t,n,a,e,o,s,l){const{store:r,session:f}=o;let m=Object.keys(n[0]),p=["_index_","_rowIndex"];null!==a&&(p=p.concat(a));const w=m.filter(t=>!(p.indexOf(t)>=0)),y={};w.forEach(t=>{y[t]=o.state.columns[t]});let g,C=null;"cas"===o.source&&(C=w.join(",")+"\n");for(let t=0;t<n.length;t++){let a=n[t];a=d({},a,e);const o=[];w.forEach((t,n)=>{let e=a[t];"string"==typeof e&&(e=e.trim()),o[n]=e}),C=null===C?o.join(",")+"\n":C+o.join(",")+"\n"}return g="cas"===o.source?await async function(t,n,a,e,o,s){const l=`${a.caslib}.${a.name}`;let r=await u(t,n,null,l,!0,e);return null!=o?(r=await c(t,n,a,o,s),r):r}(r,f,t,C,s,l):await async function(t,n,a,e,o){let s=`data ${e.libref}.${e.name}; INFILE datalines delimiter=',' ;\n`,l="",r="INPUT ";for(const t in a){const n=a[t];r=r+n.Column+" ","CHAR"===n.Type&&(l=l+" "+` ${n.Column} $ ${n.length} \n`)}return l.length>0&&(l="LENGTH "+l+";\n"),r+=";\n",s=s+";\n"+l+r+"datalines;\n"+o+"\n; run; proc print;run;\n",await i(t,n,s),{msg:"done",statusCode:0}}(r,f,y,t,C),g}async function v(t,n,a){return[]}export{g as cellEdit,p as commonHandler,P as distinctValues,b as fetchTableRows,h as scrollTable,_ as setup,v as sort,w as updateTableRows,L as uploadData};
//# sourceMappingURL=index.modern.mjs.map
