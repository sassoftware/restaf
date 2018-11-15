# Changes 

# 0.9.0

- Remove babel-polyfill as an entry point in webpack. Causing problems with serverless functions.

#0.10.0 , 0.11.0 and 0.12.0

 - Added a convenience method **runAction** to store. 
```
     let r = store.runAction(session, payload);
```
This method will return error if the cas action returns non-zero statusCode or returns severity of 'Error'. 

 - Added support for xsrf tokens used by SAS Viya - This is to allow restaf-based apps to run inside SASVisualAnalytics's web component. User need not take any action for this feature to work.

    - switched back from cas-*-http to casProxy -- have not seen any negative impacts. Had to make the change since there is no obvious way to track csrf tokens for the cas-*-http service. Needs further investigation since I really would prefer to use that service.
    



