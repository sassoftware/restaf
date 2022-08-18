import{casUpdateData as t,casFetchRows as a,computeFetchData as n,casSetup as e,computeSetup as o,computeSetupTables as s}from"@sassoftware/restaflib";import{initStore as l}from"@sassoftware/restaf";function r(){return r=Object.assign?Object.assign.bind():function(t){for(var a=1;a<arguments.length;a++){var n=arguments[a];for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e])}return t},r.apply(this,arguments)}async function i(t,a,n,e){const{handlers:o}=e.appControl.editControl;if(null==o[t])return[a,{statusCode:0,msg:null}];{const[s,l]=await o[t](a,n,e,t);return[s,l]}}async function u(a,n){let e;return e="cas"===n.source?await async function(a,n){const{store:e,session:o}=n,{table:s,byvars:l}=n.appControl,r=n.state.columns;if(null===l||0===l.length)return null;const i={};for(const t in a)"_index_"!==t&&!1===r[t].custom&&(i[t]=a[t]);const u={};l.forEach(t=>{u[t]=i[t]});const c={table:s,data:i,where:u},f={statusCode:0,msg:"Save successful"};return"Normal"!==(await t(e,o,c)).items().toJS().disposition.severity&&(f.statusCode=2,f.msg=i.disposition.severity.reason),f}(a,n):await async function(t,a){const{store:n,session:e}=a,{table:o,byvars:s}=a.appControl,l=a.state.columns;if(null===s||0===s.length)return null;let r=`proc sql; update ${o.libref}.${o.name}`,i="SET ",u=" ";for(const a in t)!1===l[a].custom&&(i=i+u+a+"="+c(t[a])),u=", ";r=r+" "+i;let f=" WHERE ",m=" ";s.forEach(a=>{f=f+m+a+"="+c(t[a]),m="AND "}),r=r+" "+f+";run;";const p={data:{code:r.split(/\r?\n/)}},d=await n.apiCall(e.links("execute"),p),w=await n.jobState(d,{qs:{newState:"Completed",timeout:1}});return{statusCode:"completed"===w.data?0:1,msg:w.data}}(a,n),e}function c(t){let a;return a=null==t?".":"string"==typeof t?JSON.stringify(t):t.toString(),a}async function f(t,a,n,e,o){let s=r({},null!==e?e:o.state.data[n]);const l=o.state.columns,{handlers:c,autoSave:f}=o.appControl.editControl;s[t]=function(t,a){let n=t;const e=a.type.toLowerCase();return"string"!=typeof n||"decimal"!==e&&"number"!==e&&"double"!==e&&"float"!==e||(n=parseFloat(1*t),!0===isNaN(t)&&(t=0)),n}(a,l[t]);let m={statusCode:0,msg:""};if(null!=c[t]){const a=await c[t](s,t,n,o);if(s=a[0],m=a[1],2===m.statusCode)return{data:a[0],status:m}}let p=await i("main",s,n,o);if(!0===f){if(p=await i("term",p[0],n,o),m=p[1],2===m.statusCode)return{data:p[0],status:m};m=await u(p[0],o)}return s=p[0],m.msg=m.msg+" / "+p[1],!0===o.appControl.cachePolicy&&(o.state.data[n]=s),{data:s,status:m}}async function m(t,a){const{schema:n,rows:e}=t,o=a.appControl.customColumns;let s={statusCode:0,msg:"Initialization was successful"};const l=(t,a)=>{const n={};if(a.forEach((a,e)=>{const o=t[e],s=o.Column.toLowerCase();null==o.Label&&(o.Label=o.Column),n[s]=a}),null!=o)for(const t in o){const a=o[t],e=a.Column.toLowerCase();n[e]=a.value}return n},u=[];for(let t=0;t<e.length;t++){const o=l(n,e[t]),[r,c]=await i("init",o,t,a);s=c,u.push(r)}const c={};if(n.forEach((t,a)=>{const n=t.Column.toLowerCase();t.name=n,t.Label=null==t.Label||0===t.Label.length?t.Column:t.Label,null==t.type&&(t.type=t.Type),t.custom=!1,c[n]=t}),null!=o)for(const t in o){const a=r({},o[t]);a.name=t,a.custom=!0,c[t]=a}return{columns:c,data:u,status:s}}async function p(t,e){let o=null;return o="cas"===e.source?await async function(t,n){const{store:e,session:o}=n,s=r({},t);if(null==s.table&&(s.table=n.appControl.table),null==s.where&&(s.where={}),s.from<=0||-1===s.next)return null;const l=await a(e,o,s);let i=null;return null!==l&&(i=await m(l.data,n),n.state={modified:[],pagination:r({},l.pagination),currentPage:s,data:[],columns:[]},!0===n.appControl.cachePolicy&&(n.state.data=i.data,n.state.columns=i.columns),i.pagination=r({},l.pagination)),i}(t,e):await async function(t,a){const{store:e,tableSummary:o}=a,{table:s}=a.appControl,l=`${s.libref}.${s.name}`.toLowerCase();let r={qs:{start:t.from-1,limit:t.count,format:null==t.format&&t.format}};const i=await n(e,o,l,null,r);let u=null;return null!==i&&(u=await m(i,a),a.state={modified:[],pagination:{},currentPage:{},data:u.data,columns:u.columns}),u}(t,e),o}async function d(t,a){let e;return e="cas"===a.source?await async function(t,a){const{initialFetch:n,table:e}=a.appControl;let o;if("first"===t)o=r({},n),o.table=e;else if(o=a.state.pagination[t],-1===o.next)return null;return await p(o,a)}(t,a):await async function(t,a){const{store:e,tableSummary:o}=a,{table:s}=a.appControl,l=`${s.libref}.${s.name}`.toLowerCase(),r={qs:{limit:a.appControl.initialFetch.count}},i=await n(e,o,l,t,r);let u=null;return null!==i&&(u=await m(i,a),a.state={modified:[],pagination:{},currentPage:{},data:u.data,columns:u.columns}),u}(t,a),e}async function w(t,a,n){const r=l();let i;return null==t.authType&&(t.authType="code"),i="cas"===a.source?await async function(t,a,n){const o=await e(t,a);return{source:n.source,store:t,session:o.session,servers:o.servers,restaflib:null,logonPayload:a,appControl:n,state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}},id:Date()}}(r,t,a):await async function(t,a,n,e){let l=await o(t,n.computeContext,a),r=await s(t,l,n.table,e);return{source:n.source,store:t,session:l,tableSummary:r,servers:null,restaflib:null,logonPayload:a,appControl:n,state:{modified:[],pagination:{},currentPage:{},data:{},columns:{}},id:Date()}}(r,t,a,n),i}export{f as cellEdit,i as commonHandler,p as fetchTableRows,d as scrollTable,w as setup,u as updateTableRows};
//# sourceMappingURL=index.modern.mjs.map
