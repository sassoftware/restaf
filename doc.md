# Undergoing change

# restAF- Building Applications with SAS REST API made simple 

SAS® Viya® is like a Swiss Army knife when it comes to allowing all types of
clients to talk to it—Java, Python, Lua, R, and, of course, SAS®.
In addition to using these language-based APIs, SAS also publishes APIs that
conform to REST best practices. The well-designed APIs in SAS Viya make it relatively
easy to build complex web and non-web applications with SAS Viya as the engine of your application.
The applications can be solely based on SAS Viya capabilities or users can do a
mashup of the advanced SAS Viya analytics with their other products and capabilities.
restAF is a light-weight, UI-framework agnostic, JavaScript library designed to be
easy-to-use for app developers. restAF takes advantage of the consistency of the REST APIs
to reduce the responses from the server into a standard form, and it also manages the data on
 the client side. This reduction enables developers to interact with the server in a repeating pattern
 regardless of which service the application is using.

Use restAF to exploit SAS® Cloud Analytic Services (CAS), compute server, SAS® Visual Analytics,
and other key capabilities of SAS Viya in a very consistent manner with minimal coding.




## Introduction

The concepts and usage of restAF are explained through examples. Addtional examples can be found in these repositories.

* [A collection of nodejs based examples](https://github.com/sassoftware/restaf-demos)
* [A collection of web apps using restAF](https://github.com/sassoftware/restaf-uidemos)
*   [a SAS API explorer built with restAF](https://github.com/sassoftware/restaf-apiexplorer)
*   [react components using restAF](https://github.com/sassoftware/restaf-uicomponents)

restAF provides a simple programming model to build applications using SAS Viya REST APIs.
1.	restAF provides a small set of promise-based methods to make the API calls.
2.	restAF automatically “reduces” the returned information to a form that is suitable for writing web applications.
3.	restAF manages the application data that can be accessed anywhere in your application as the single version of the truth.

With restAF, you focus on your application and not on the nitty-gritty details of setting up HTTP calls, processing the returned results and HTTP codes, parsing the returned payload, managing the data, and so on.
Note: A far more detailed document is available in the https://github.com/sassoftware/restaf repository.

## Key technologies
restAF uses three key libraries that you are probably familiar with.

1.	[redux-saga](https://redux-saga.js.org/)
2.	[immutable-js](https://facebook.github.io/immutable-js/docs/#/)
3.	[axios](https://github.com/axios/axios)

I am extremely grateful to the developers of these packages for their wonderful contributions.

## Background

restAF reduces the hypermedia returned from the REST API calls to a form that is suitable for rapid application development.
THe next few sections will explain the reduction through examples and how you would use it to write your applications.

All responses from SAS REST API calls have the following pattern:

1.  The REST call returns links to other resources. This happens when one makes a call to the root resource.
    Another scenario is when a new resource is created - the server returns a link to the newly created resource(s).
    Examples are post to create a new file(files service) and a execute in compute server( returns links to created job ).
    If the resource supports pagination the links will also have pagination links.

2.  The REST callsmight return data as 'items'. These are usually one of these types

    1.  Plain text - An example is the call to check the status of a job
    2.  HTML output - An example is ODS output from a compute server
    3.  Array - An example is log and listing output from compute server.
    4.  Array of items with id's - An example is the list of files, folders etc...
    5.  An object - a standard json that is not one of the above. CAS Actions is an example of this.

restAF uses this pattern to reduce your interaction with the server and the data to a few simple calls.

## Basic flow of an application

The flow of an application using restAF is as follows:

1.  Initialize restAF - you can have only one instance of retAF per application. The initialization creates a **store** to maintain the data and handle asynchronous calls
    to the server.
2.  Logon to the server - setups connection to the Viya Server
3.  Register the services - Inform restAF to setup structures(called folders)to handle data for each of the services your application will be using.
4.  In the main loop of your application make calls to the server thru store. The calls will return a object that the application with interact with to
    retrieve the data(read-only) as and when they are needed in the application.

### Introductory Example

Here is a simple example running data step in CAS. In the example below ignore the following for now:

*   prtUtil - some utility functions to dump information to console
*   logonPayload - data for logging on to Viya Server - discussed later in this document

```
let restaf      = require('restaf');
```

Initialize restaf and create the store
```
let store = restaf.initStore();
```

The rest of the code will be housed inside an async function so that we can use the await capabilities. For discussiobn purposes
the function declaration is omitted.

The first step is to logon toe Viya Server. For now accept as a fact that the logonPayload parameter has information on
how to authenticate the user with the server. The logoon method returns a promise

```
let msg     = await store.logon(logonPayload);
```

Next let restaf know which service(s) you plan to use. restAF will create folders to hold the information for these
services. And it will initialize these folders with the links(transitions) from the root end point of the service. AddService returns
an object whose keys are the name of the service and the values are an object called rafObject. This rafObject is the
waht you will use to access the data returned from the server. In this example we are using the CasManagement service.

```
let {casManagement} = await store.addServices('casManagement');
```

Based on the documentation we know that we need to create a session on the CAS server.

To get the list of cas servers we will use the link associated with the 'servers' rel and make an api call to get the list of
servers. To get the link (called rafLink) for 'servers' use the links method on the rafObject

```
let serverLink = casManagement.links('servers');
```

Next make an api call to get the list of servers
```
let servers = await store.apiCall(serverLink);
```

This call returns another rafObject with information about servers.
//Get list of current servers
// the links method is used to return the a restaf version of link(called rafLink) associated with a given rel.
// this is then used to make a call to the end point using the apiCall method to get a list of cas Servers

    let servers = await store.apiCall(casManagement.links('servers'));

    // Since the call resulted in a list of servers, restaf created an array of server id's that is accessed
    // via the itemsList method

    let casserver = servers.itemsList(0);

    // Create a session on the first server(in Viya 3.3 that is your only option)
    let createSessionCmd = servers.itemsCmd( casserver, 'createSession');

    let session = await store.apiCall(servers.itemsCmd(casserver, 'createSession'), {data: {name: sessionName}});

    //Now run a simple data step in that session
    let p = {
        action: 'datastep.runCode',
        data  : { code: 'data casuser.score; x1=10;x2=20;x3=30; score1 = x1+x2+x3;run; '  }
    };
    let actionResult = await store.apiCall(session.links('execute'), p);

    //Check the status of the result
    let statusCode = actionResult.items('disposition', 'statusCode');
    if (statusCode !== 0) {
        throw actionResult.items('disposition');
    } else {
        prtUtil.view(actionResult, 'DataStep action');
    }

    // delete session
    actionResult = await store.apiCall(session.links('delete'));

    return 'Success';
}

// Run the example
example1(store, payload, 'example1')
    .then  (msg => console.log(msg))
    .catch (err => prtUtil.printErr(err));

```

**A Cool Fact** \- _Notice that in the example above you see no reference to links, content-type, accept type, url's etc... Except in some rare cases you do not have to worry about these - restAF takes care of all those house keeping activities. You just focus on what your app needs to do._

## restAF Objects and restAF Links


restAF reduces the information returned by an API call into a form that makes it convenient for the application to consume. One key reduction is the transformation of links into a restafLinks object. This allows restAF to navigate its own structures and make API calls on behalf of the application.

## Initializing restAF


To initialize restAF you will make the following 2 calls:

###initStore

initStore must be called first to get the store object. **Only one store per application<** . This call initializes the store to hold all the application data.

let restaf = require( 'restaf' );
store = restaf.initStore();

_If using the umd version of the library, the global 'restaf' will be set when the umd version is brought in using the script tag._ At this point there is no data in the store and it is not attached to any Viya Server.

### logon

The next step is to associate Viya server with this instance of restAF.

 store.logon( payload )
    .then ( msg => console.log( msg ) )
    .catch( err => console.log( err ) )

payload is either null or is an object with information to logon to the server. If null, restAF assumes that your browser session has been authenticated by other means.

 payload = {
    host        : 'http://yourserver:portno',
    user        : username,
    password    : user password,
    clientID    : clientid,  /* get this from your admin */
    clientSecret: clientsecret /* get this from your admin */
    } );

restAF also supports implicit flow as described [here](#auth) .

##Adding Services


After the initialization steps restAF still does not know what information to manage. Now populate restAF by registering the services you want to use in your application by using the addServices method of the store object we got earlier.

### addServices


addServices method adds a folder for the each service. It additionally calls the root end point for that service and populates the folder with the links returned from that call. The addServices method returns a restAF object( restafObj) which we will discuss next.

**All service names are case-sensitive**

 store.addServices( serviceName  )
    .then ( restafObj => {
          //you app does what it needs to do
    } )
    .catch ( err => {
      //handle error condition
    } )

### Adding multiple services


If your application uses more than one of the services you can add all of them by passing a list of services to the addServices method. If you pass more than one service, the returned value is an object with restafObjects representing the services that were started. For example if you wish to add casManagement and compute service then the code will look as follows:

    store.addServices( 'casManagement', 'compute' )
    .then ( restafObjects => {
         casManagement = restafObjects.casManagement;
         compute       = restafObjects.compute;
    } )
    .catch( err => { ...do something } );

##restAF Object(restafObj)


In your application you will be dealing primarily with restafObjects and restafLinks. Every time a result is returned from an API call, restAF will "reduce" it to an internal object called folders. The folders are immutable objects based on [immutable.js.](https://facebook.github.io/immutable-js/). restAF returns a standard JS object called restafObject which encapsulates the data returned from the server. The application will retrieve information using the methods of the restafObject.

### restAF Links ( restafLinks )


restAF extends all the links returned by the server with information it needs to navigate the store and make the final calls. The most common use of restafLinks is as an argument to apiCall method of the store to navigate to a new resource. The other use is in associating links with UI components like buttons, navigators etc. This will be covered later in this document.

###apiCall - Making api/REST calls

the apiCall method on teh store object is the key method for making REST calls.

    store.apiCall( restafLink <, payload>, <, delay>  )

restafLink is obtained using the methods on restafObj as described below.

The payload(optional parameter) is an object with the following optional keys

*   data - If the REST call is a PUT or POST then specify the data payload
*   qs - Use this to specify the query parameters
*   headers - Use this to specify any special headers for this call. For example the upload action in cas requires the the JSON-Parameters header. Another example is file service's 'create' operation requires content-type to be specified
*   action - if you are running a cas action, you **must** specify the action name. Recommend that you use a fully qualified action name ( actionset.actionname )
*   Any other key that is specified will be ignored silently.

The delay parameter( in seconds) is the delay ( in seconds) before the apiCall is made. You might need this only for some edge cases. The default value is 0.

### Examples of payload

_To run sas code with compute service_

    { data: { code: \[ 'data a; x=1;run;' , 'proc print;run' \] }}

_To run datastep in cas_

    { action: 'datastep.runCode', data: { code: 'data a; x=1;run;' } }

_To run upload action for CAS_

    let JSON_Parameters = {
                 casout: {
                     caslib: 'casuser', /* a valid caslib */
                     name  : 'iris' /* name of output file on cas server */
                 },

                 importOptions: {
                     fileType: 'csv' /* type of the file being uploaded */
                 }
         };
    let payload = {
         action : 'table.upload',
         headers: { 'JSON-Parameters': JSON_Parameters },
         data   : readFile( 'iris', 'csv' )
     }

_To create a file with plain text_

    let payload = {
       data   : 'my data',
       headers: { 'content-type': 'text/plain' }
    }

### apiCallAll - Making api Calls in parallel

apiCall method makes a single service call. The apiCallAll method on store allows the programmer to execute multiple service calls in parallel. A typical use case will be running forecast actions in parallel in different cas sessions. Another is running jobs in multiple compute server sessions. You can mix and match services in this single call( ex: create files, run cas jobs etc... but this would be an exception rather than a rule

    store.apiCallAll( requestArray, < delay > )


*   requestArray is an array with each row of the following format:

                { restafLink: <the restaflink to be called>
                  payload: <standard payload as described earlier in this document>
                }


*   delay is the wait time in seconds before each apiCall. Default is 0

The method returns when all the calls in the requestArray return successfully or when one of them fails. In that sense apiCallAll behaves like PromiseAll. The order of the results array is the same as the requestArray. See the example for running parallel sas compute jobs

### jobState and jobStateAll

Some services might take a long time to run. Typically these services support a "state" link to query the state of the job. Note that not all services support the 'state' link. Services like compute service and JobExecution support this

In SAS API the state end point returns could be in one of these states.

*   **running or pending** \- This means the job did not complete and is still running or pending.
*   **Completed** The job completed but the actual state of the job will vary based on the service. Some possible completed states are:

*   Job completed with no additional clarification(completed)
*   Job completed with warnings(warning)
*   Job failed or completed with errors(errors)
*   Job failed(failed) - similar to the previous item but some services have chosen to return failed
*   probably other completed states now or in later releases

Most of the services that have a "state" end point recommend that you call the 'self' end point after the job completes to get the latest results from the job run. jobState and jobStateAll will make this additional call on 'self' if none of the jobs are still running. This saves you an additional call

At this point your code has to decide how best to proceed given these states.

### To check the status of a single job use jobState method.

    store.jobState( restafObject-for-job <,payload> <,maxTries > )


Some services take a query parameter to support long polling - pass that information in the standard payload structure

maxTries is the number of times restAF will try if the job did not return a completed status

The returned object has the following form:

{
  data      : <completed|running|...|...>,
  statusCode: <http code >,
  job       : <restafObject of the final job>
}


An example
```
    /* pass a timeout of 2 seconds and try a max of 5 times */
    let status = await store.jobState( job, {qs: { timeout: 2} }, 5 );
    if (status.data === 'running') {
       throw \`ERROR: Job did not complete in allotted time\`;
    } else {
      viewer(status.job); /* some viewer of results results */
      switch(status.data) {
        case 'warning': console.log(\`Warning: check your log for warnings\`); break;
        case 'error':
            throw \`Please correct errors and rerun program\`;
        default:
           break;
      }
    }

```
### jobStateAll

jobStateAll method to check the status of multiple jobs the jobs with a single call

The returned value has the form
```
 {
    running: <No of jobs still running >
    details: >details on the completion ( see note above and see below for the form of this object>
    jobState: {
          job       : < the job restafObject. see note below >
          statusCode: < The http code from the server  >
          data      : < text returned on completion( 'complete' for example ) >
       }
}
```

Some notes

*   'running' will be 0 if all jobs completed and >0 if one or more jobs are still running
*   jobState will be an array for jobStateAll

The details object gives you a summary of the returned state. It is easier to explain its structure with some examples

For jobState the detail will have a single key/value. The key will be the state returned from the call. For example if the job returned "failed" then the detail object will be as follows

detail: {
   failed: 1
}

For jobStateAll the detail could have multiple key/values. For example if you ran 4 jobs in parallel and 2 completed with state of 'warning' , 1 completed with state of 'completed' and one completed with state of 'error', then the detail will look as follows:

detail: {
  warning  : 2,
  completed: 1,
  error    : 1
}

        store.jobStateAll( array of jobs restafObject, payload, maxTries )
        .then ( status => {
             if ( status.running !== 0 ) {
                ...handle slow running jobs...
             } else {
              ... check the detail object and make decisions...
             }

        } )


The payload parameter can be an array or single object. If single object then this payload will be applied to every restafObject in the first parameter. The primary purpose of the payload is to set timeout as a query parameter

Maxtries works the same as in jobState

## Details on restAF Object

###Properties


All property names are case sensitive

1.  **type:** This indicates which of the results pattern this object represent

1.  **links:** Use the links method below to view and obtain restafLinks for further calls. If type is "links" then this object only has links for other end points.
2.  **itemsList:** The restafObj contains an array of items with id's.
    1.  Use itemsList method to retrieve the id's of the items returned.
    2.  Use the scrollCmds method to determine whether there are more data available and for making the pagination calls.
    3.  Use the items function to retrieve specific items( or all items ) from the collection.

    *   Additionally you can retrieve the cmds( links) associated with specific item(ex: delete, copy, content etc...)

3.  **itemArray:** The returned value is an array of text. Use items methods to retrieve this data
4.  **items:** The exact object type is not known. Use items method to get the information and also use resultType property do decide how to handle that data

3.  **resultType:** The media type of the result
4.  **route:** This is an index into the store for this specific result (see section on route later in this document
5.  **folder:** This is the actual folder in the store - only for advanced users
6.  **status:** This the http code returned from the api call
7.  **statusInfo:** An object with details of the status

Methods (function properties)
-----------------------------

Use these methods to interact with restafObj. These functions return either objects or string depending on the data. Remember these objects are immutable objects. In the document below the common usage patterns are described.

If the returned value is an restafObj you can use query parameters to drill into a specific value in that object. Examples are provided below

#### links method

The links method will return an immutable object of restafLinks. You will use this method when the type of the restafObj is "links". But sometimes there will be links even when the type is not "links". In those cases the links are usually actions that operate on the whole collection

    restafLink = restafObj.links( relName );


relName is the rel of the resource you are looking for. The call will return a restafLink that you can use in an apiCall as shown below

     contentLink   = fileObject.links( 'content' );
     contentObject = store.apiCall ( contentLink );

Sometimes you need the entire list of links. An example is displaying buttons with the titles of the links. Below is an example of printing the titles of all the links.

    allLinks = fileObject.links();
    allLinks.forEach( ( l, rel ) => {
       console.log(\`Title: ${l.get( 'title' ) }  rel: ${rel} \` );
    }

**What is this l.get stuff?**

The returned object is an immutable map and you can gets its properties using the get method on that map. If you are uncomfortable dealing with immutable objects you can convert it to a standard JS object as shown below:

    allLinks = fileObject.links();
    allLinks.forEach( ( l, rel ) => {
       let ljs = l.toJS();
       console.log(\`Title: ${ljs.title }  rel: ${rel} \` );
    }

Any immutable object can be converted to a standard JS object using the toJS() method. However this will result in more objects being created, garbage collected and so on. Recommend you stay with the immutable object representation.

#### itemsList method

If the restafObj type is 'itemsList' use this method to get the immutable array of id's in the current result object. This is really a convenience method for UI ( ex: showing a list of the id's).

Below is an example listing all the id's

    let idList = restafObj.itemsList();
    for ( i = i ; i < id.size; i++ ) {
       console.log( idList.get( i ) );
    }

#### scrollCmds method

This method returns the restafLinks associated with pagination. This method can be used to get a restafLink associated with next, prev, last and first cmds(rel). At any given time the server may return some, all or none of these. To ensure safe programming, always check if the returned restafLink is non-null.

    let nextCmd = restafObj.scrollCmds( 'next' );
    if ( nextCmd !== null ) {
        store.apiCall( nextCmd )
           .then ( restafobj => {...do something...} )
    } else {
        console.log( 'No more data' )
    }

In an UI you would want to display buttons for scrolling. A typical code will look like this

    let cmds = restafObj.scrollCmds();

    cmds.forEach( ( c, cmd ) => {
        ...make your scrolling menu...
    } );

For example here is the code for creating a menubar in Reactjs

    import React from 'react';

    function ButtonMenu( props ) {
        let { cmds, onClick } = props;
        let menu = \[\];
        cmds.forEach( ( c, rel )  => {
            let title = c.get( 'link' ).get( 'title' );
            menu.push( <button key={title} onClick={onClick\[rel\]}
                               className="button"> {title} </button> );
        } );

        return (
            <div>
                {menu}
            </div>
        )
    }

export { ButtonMenu } ;

#### items method

This method gives you access to the data that might have been returned. This could be log for compute server, cas results, tables, status, ods and so on. The combination of resultType and type should give you sufficient information on how to process this data. It is possible to write an intelligent UI that determines the "viewer" to use given these pieces of information. But in a typical scenario the application knows what it is expecting at any specific point in the flow of the application.

The items method takes arguments that determines what is returned.

    let result = restafObj.items( what-you-want )

Let us examine a few typical cases

**All Items**

let allItems = restafObj.items();

If you get all the items then you need to write the code to manage the items based on the resultType

**Get a specific item using the id ( which you will get from itemsList() )**

    let item = restafObj.items( idOfItem );

#### itemsCmd

Use this method to obtain the cmds associated with a particular item. Obtain the id of the item by using the itemList method.

**Get all commands associated with a item with a specific id**

    let item = restafObj.itemsCmd( idOfItem );

You can step thru this object as follows

    restafObj.itemsCmd( idOfItem ).forEach( ( c, key) => {
    // c is the current cmd information
    // key is the name of the command( createSession delete etc... )
    }

**Get a specific command associated with a item with a specific id**

    let item = restafObj.itemsCmd( idOfItem, 'name of command' );
    ex:
    let deleteCmd = restafObj.itemsCmd( '1234ID', 'delete' );

    store.apiCall( deleteCmd )
    .then ( f => { do whatever) }
    .catch( err => { do whatever) }

#### responseHeaders

On occasion one needs to access to the returned headers like etag. For those scenarios use the responseHeaders method.

**Get a specific header**

    let etag = restafObj.responseHeaders( 'etag' );

**Get all headers**

    let headers = restafObj.responseHeaders();

#### status

To get the http status returned from the call

        let status = restafObj.status();


#### statusInfo

Use this to get any additional information that might have been returned for the status. Mostly useful if the job failed for some reason

        let info = restafObj.statusInfo() ;
        console.log( info );


Running CAS actions
-------------------

In restAF you will access cas actions in the following manner.

*   Add casManagement to restAF using store.addServices.
*   Look thru the list of servers returned by casManagement and pick the one you want. More often than not there is probably one cas server
*   Create a session in that server. restAF will add a rel named 'execute' to the session returned from this step.
*   Make all cas action calls thru this rel
*   restAF collects all the returned tables under a "tables" object to make handling of returned tables a bit easier

Below is an example showing uploading of a csv to cas and then getting its info

The example below uses the nodejs file i/o. If you are running from browser you will use the File Object.

store.logon( payload )  /* assuming payload has been defined */
     .then( msg  => store.addServices( 'casManagement' ) )
     .then( root => store.apiCall( root.links( 'servers' ) ) )
     .then ( server => {
         // Assume that you know that there is a cas server named 'cas'
         let createSession = server.itemsCmd( 'cas', 'createSession'  );
         let payload = { data: { name: sessionName } };
         return store.apiCall( createSession, payload );
     } )

     .then ( session => {
         // Begin Execute Action Section
         casSession = session;
         let casAction = session.links( 'upload' );

         // setup header for upload
         let JSON_Parameters = {
                 casout: {
                     caslib: 'casuser', /* a valid caslib */
                     name  : filename /* name of output file on cas server */
                 },

                 importOptions: {
                     fileType: fileType /* type of the file being uploaded */
                 }
         };
         let payload = {
             headers: { 'JSON-Parameters': JSON.stringify( JSON_Parameters ) },
             data   : readFile( filename, fileType )
         }
         return store.apiCall( casAction, payload );
         // End of Execute Action section
     } )

     .then ( () => {
         let payload = {
             action: 'table.fetch',
             data  : { table: { caslib: 'casuser', name: filename } }
         };
         let casAction = casSession.links( 'execute'  );
         return store.apiCall( casAction, payload  )
     } )

     .then ( actionResult  => {
         console.log( JSON.stringify( actionResult.items(), null, 4 ) );
         let deleteCmd = casSession.links( 'delete' );
         return store.apiCall( deleteCmd );
     } )
     .then( ( f ) => {
         console.log( JSON.stringify( f.status ) );
         console.log( 'session closed' );
     } )
     .catch ( err => {
         console.log( \`ERROR: ${JSON.stringify( err, null , 4 )}\`  );
     } )

function readFile( filename, fileType ) {
    let data = fs.readFileSync( `./data/${filename}.${fileType}` );
    return data;
}

Handling Pagination
-------------------

restAF handles all the pagination for you. Use the scrollCmds as described above. It assumes that you will use the scrollCmds API to retrieve more information.

For example to get the next set of items do the following

    let next = restafObj.scrollCmds( 'next' );
    if ( next === null ) {
      /\* tell user there is no more data */
    } else {
       store.apiCall( next )
       .then ( nextObj => {
         do whatever using teh restafObj methods
        } );
       .catch ( err => {
         handle error conditions
        } )
    }

Replace next with prev,last ans first as appropriate.

Route property
--------------

Each restafObject has a route property. This is a string that is key to the data pointed to by restafObj. restAF uses the route to find the data associated with this key. If for whatever reason you need to maintain a "pointer" to a restafObj( or pass it in as a query parameter you can use this. In the call to store.apiCall you can use the route value as a substitute for the restafLink object.

More on Authentication in restAF
-----------------------------

In Viya you will be authenticated via Oauth2. To do this you must obtain client and client secret from your SAS Viya admin.

You can use restafregister tool to obtain these credentials if you are the admin. Note that not all admin accounts have the rights to create clientID.

### Password flow

In a line mode job you will have authenticate the user by passing the payload described below the store.logon method. You an slso use this in a browser if the Viya server is CORS enabled.

       let  payload = {
            host        : 'http://yourserver:portno',
            user        : username,
            password    : user password,
            clientID    : clientid,  /* get this from your admin */
            clientSecret: clientsecret /* get this from your admin */
            } );
        store.logon  ( payload )
            .then ( () => ...do whatever your app does ...)
            .catch( err => ...do recovery ... )

### If the session is authorized by other means

Your browser session might already be authenticated to the Viya Server - typically this means there is an active cookie for the server in your browser cache. You can then use the snippet of code below

        store.logon  ( null )
            .then ( () => ...do whatever your app does ...)
            .catch( err => ...do recovery ... )


### Implicit Flow.

This is a scenario where all the authentication is handled on the client. This will require a clientID that is acquired specifically for Implicit flow. Implicit flow authentication requires a redirect page that the user will be redirected to.

**Two step process**

1.  When the user does some action (say users clicks on a logon button )that will cause access to a protected app/page do the following code snippet

            function onClick() {
                 let store = restaf.initStore();
                 let payload = {
                     host        : 'your-viya-server:portno', /\*ex: vi.com:7980 \*/
                     clientID    : implicit-client-id, /* get this from your Viya Administrator */
                     authType    : 'implicit',
                     clientSecret: ''
                 }
                 store.logon( payload )
                     .then ( msg =>  console.log( msg ) )
                     .catch( err => console.log( err ) )
        }


3.  In the html that is the target of the redirect use this snippet of code

            let payload = {
                 host        : 'your-viya-server:portno', /\*ex: vi.com:7980 \*/
                 authType    : 'implicit'
                 }
             store.logon( payload )
            .then ...



#### A note on redirect url

Sometimes during development it is convenient to specify the redirect at runtime. In that case do not specify the redirect uri when generating the clientID. Then in step 1 above specify the payload as follows:

         function onClick() {
             let store = restaf.initStore();
             let payload = {
                 host        : 'your-viya-server:portno', /\*ex: vi.com:7980 \*/
                 clientID    : implicit-client-id, /* get this from your Viya Administrator */
                 redirect    : some-html in your app (ex: callback.html )
                 authType    : 'implicit',
                 clientSecret: ''
             }
             store.logon( payload )
                 .then ( msg =>  console.log( msg ) )
                 .catch( err => console.log( err ) )
        }


In the callback have the same code as shown in step 2 above.

Lifecycle of restAF store
----------------------

**Warning** The store will be lost when you close the browser session. While technically it is possible to save and restore the store this version of restAF does not support persistence.
