# Changes 

# 0.9.0

- Remove babel-polyfill as an entry point in webpack. Causing problems with serverless functions.

#0.10.0 

 - Added a convenience method **runAction** to store. 
```
     let r = store.runAction(session, payload);
```
This method will return error if the cas action returns non-zero statusCode or returns severity of 'Error'. 

