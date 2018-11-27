# Changes 

# 0.9.0

- Remove babel-polyfill as an entry point in webpack. Causing problems with serverless functions.

#0.10.0 , 0.11.0 and 0.12.0 and 0.13.0

 - Added a convenience method **runAction** to store. 
```
     let r = store.runAction(session, payload);
```
This method will return error if the cas action returns non-zero statusCode or returns severity of 'Error'. 

 - Added support for xsrf tokens used by SAS Viya - This is to allow restaf-based apps to run inside SASVisualAnalytics's web component. User need not take any action for this feature to work.

    - switched back from cas-*-http to casProxy -- have not seen any negative impacts. Had to make the change since there is no obvious way to track csrf tokens for the cas-*-http service. Needs further investigation since I really would prefer to use that service.     

 - Updated dependencies to latest. The big changes were Babel and Webpack. 

#0.14.0
   - There seems to be an issue in using casProxy - duplicate headers are sent to the server and it is unhappy with it. This breaks all the apps. Going back to using cas-*-http until the issue is resolved.

#0.14.1
   - Remove extraneous console logs.