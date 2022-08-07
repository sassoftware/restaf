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

The concepts and usage of restAF are explained through examples. Additional examples can be found in these repositories.

* [A collection of nodejs based examples](https://github.com/sassoftware/restaf-demos)
* [A collection of web apps using restAF](https://github.com/sassoftware/restaf-uidemos)
* [a SAS API explorer built with restAF](https://github.com/sassoftware/restaf-apiexplorer)
* [react components using restAF](https://github.com/sassoftware/restaf-uicomponents)

restAF makes writing applications with SAS REST API simple
* A small set of methods to make API calls
* Reduces the information to readily useable parts
* Manages the data for the application in a central store for one version of truth
* Short learning curve
* Results in productive application developers

With restAF, you focus on your application and not on the nitty-gritty details of setting up HTTP calls, processing the
returned results and HTTP codes, parsing the returned payload, managing the data, and so on.


## Key technologies
restAF uses three key libraries(among others) that you are probably familiar with.

1. [redux-saga](https://redux-saga.js.org/)
2. [immutable-js](https://facebook.github.io/immutable-js/docs/#/)
3. [axios](https://github.com/axios/axios)


## Accessing restAF

### web Application

In your web application you can access restaf with the following script tag.

```
 <script src="https://unpkg.com/restaf/dist/restaf.min.js"></script>
 
```
A global variable called restaf is available for use in your javascript programs.

### nodejs application

```
npm install restaf
```

and then your program

```
let restaf = require('restaf')

```

### Cloning and modifying restAF
You can clone as follows

```
clone https://github.com/sassoftware/restaf
cd restaf
npm install
```
To build the code run this command

```
npm run build
```

## Background

restAF reduces the hypermedia returned from the REST API calls to a form that is suitable for rapid application development.
THe next few sections will explain the reduction through examples and how you would use it to write your applications.

REST API response is an hypermedia. In practical terms a hypermedia has the following:

* Links to
  - What you can do to with this resource

  - Where you can go next
     - Examples:  Get a list of items, create a new resource etc...
     - Optionally information(links) on paginating through the data

* Data
  - A collection of items
  - String
  - arrays, objects etc...
     - Optionally links to operate on the returned data( delete, copy, etc...)


restAF stores all the response and returns an object referred to as **rafObject***. The application will use this object
to retrieve information from it use as it sees fit. The methods correspond to the various component parts of the
response discussed above.

### Links 
A link has several key  parts:
   1.	A URI for the next step (edit, delete, and so on).
   2.	An identification of the link to indicate what this next step is. This is referred to as **rel**  – short for “link relationship.”
You can discern the purpose of that link based on the rel. Some examples are:

- If the rel is “content,” you will guess that that this end point  returns the content.
- If the rel is “execute,” you will guess that this end point is associated with some type of execution that is appropriate for that context.
- If the rel is “create,” you will rightly assume that the call will result in something being created.

3. Media Types
   - The media type used for the payload if the end point needs a payload.
   - The media type of the returned data. This information can be used by applications to determine programmatically how to deal with the data either for
   processing or display.

The links are reduced to an object called **rafLink**. You will use rel to locate a rafLink in the rafObject. The primary use of rafLink is as a parameter
to the api calls to the server.

### Items
Items are the data. Items can be a collection of items, a text string, an array, SVG, and so on.
Some examples are as follows:

- A collection of items: Each item has some data and links to indicate what you can do with this item (delete for example).
- A string (examples: SVG, status of a job, and so on).
- An array (example: SAS logs).
- Some object.
- And, in some cases, no data only http return codes.

restAF manages the links and data for the application.

## Basic flow of an application

The flow of an application using restAF is as follows:

1.  Initialize restAF - you can have only one instance of restAF per application. The initialization creates a **store** to maintain the data and handle asynchronous calls
    to the server.
2.  Logon to the server - setups connection to the Viya Server
3.  Register the services - Inform restAF to setup structures(called folders)to handle data for each of the services your application will be using.
4.  In the main loop of your application make calls to the server thru store. The calls will return an object that the application will interact with to
    retrieve the data(read-only) as and when they are needed in the application.


### Introductory Example for a nodejs application

Here is a simple example running data step with compute service. In the example below ignore the following for now:

*   prtUtil - some utility functions to dump information to console
*   logonPayload - data for logging on to Viya Server - discussed later in this document

```javascript
let restaf   = require('restaf');
```

Preamble: Application specific code to get configuration information
You might do it differently

```javascript
let config = require('./config');
let logonPayload = config('raf.env');
```


Step 1: Initialize the store
```javascript
let store = restaf.initStore();
```

Steps 2 and 3: Logon to the server and tell restAF which services you want to use
```javascript
async function setup (store, logonPayload){
    let msg       = await store.logon(logonPayload);
    let {compute} = await store.addServices('compute');
    return compute;
}
```

// Step 4: The main program

```javascript
async function mainLoop (store, compute, code) {

    // get the list of contexts for compute server
    // This of contexts as your SAS configs
    let contexts = await store.apiCall(compute.links('contexts'));

    // lookup the name of the context and create a SAS session with that information
    // In the example we pick the first context that is returned.
    // the itemList function returns the list of contexts
    let context       = contexts.itemsList(0);
    let createSession = contexts.itemsCmd(context, 'createSession');
    let session       = await store.apiCall(createSession);

    // Define the payload
    // This is your SAS program
    let payload = {
            data: {code: code}
    };

    // Execute the data step and wait for completion
    // All calls to the server are managed by the store you created in step 1
    let job    = await store.apiCall(session.links('execute'), payload);
    let status = await store.jobState(job, null, 5, 2);

    // Check the final status of job and view the logs
    if (status.data === 'running') {
        throw `ERROR: Job did not complete in allotted time`;
    } else {
        let logLines = await store.apiCall(status.job.links('log'));
        // print the log
        logViewer(logLines);
    }
    return 'restAF is cool or what';
}
```

Your program

```javascript
let code =  [`data _null_; do i = 1 to 100; x=1; end; run; `];

setup (store, logonPayload)
    .then (compute => mainLoop(store, compute, code))
    .catch(err =>console.log(err));


```

**A Cool Fact** \- _Notice that in the example above you see no reference to links, content-type, accept type, url's etc... Except in some rare cases you do not have to worry about these - restAF takes care of all those house keeping activities. You just focus on what your app needs to do._

## restAF Objects and restAF Links

restAF reduces the information returned by an API call an object called rafObject. This object has several properties amd methods. 
One key reduction is the transformation of links into rafLinks objects. rafLink allows restAF to navigate its own structures and make API
 calls on behalf of the application.

## Initializing restAF

To initialize restAF you will make the following 2 calls:

###initStore

initStore must be called first to get the store object. **Only one store per application** . This call initializes the store to hold all the application data.

```javascript
let restaf = require( 'restaf' );
store = restaf.initStore();
```

_If using the umd version of the library, the global 'restaf' will be set when the umd version is brought in using the script tag._

At this point there is no data in the store and it is not attached to any Viya Server.

### logon

The next step is to associate Viya server with this instance of restAF.

```javascript
     store.logon( payload )
        .then ( msg => console.log( msg ) )
        .catch( err => console.log( err ) )
```

payload is either null or is an object with information to logon to the server. If null,
restAF assumes that your browser session has been authenticated by other means. In an non-browser environment you have to
pass in the valid payload.

Below is a typical payload for a nodejs application

```javascript

     payload = {
        authType    : 'password',
        host        : 'http://yourserver:portno',
        user        : username,
        password    : user password,
        clientID    : clientid,  /* get this from your admin */
        clientSecret: clientsecret /* get this from your admin */
        } );
```

A friendly note to protect the payload information on your client machine
since it has all the key authentication information
in plain text.

In a browser use the initial logon payload will look as follows:

```javascript
    payload = {
       authType: 'implicit',
       host    : 'http://yourserver:portno',
       clientId: clientId, /* get this from your admin */
       redirect: <The redirect that was specified when creating the clientId>
       }
```
In the url that is the target of the redirect you will pass a null for payload

```javascript
    payload = null
```

restAF will parse the incoming location information and set up access to the server.


##Adding Services

After the initialization steps restAF still does not know what information to manage.
Now populate restAF by registering the services you want to use in your application.

### addServices

addServices method adds a folder for the each service.
It additionally calls the root end point for that service
and populates the folder with the links returned from that call.
The addServices method returns a restAF object( rafObject) which we will discuss next.

**All service names are case-sensitive**

```javascript
 let {serviceName1, serviceName2,....} = await store.addServices( 'serviceName1', 'serviceName2', ....  );
``` 

At this point serviceName1 is a rafObject with information for the root end points of that service.
#### Example

```javascript
let {compute, casManagement} = await store.addServices( 'compute', 'casManagement' );
```


##restAF Object(rafObject)

In your application you will be dealing primarily with rafObjects and rafLinks. Every time a result is returned from an
API call(including addServices), restAF will "reduce" the information into a folder and return a rafObject

The folders are immutable objects based on [immutable.js.](https://facebook.github.io/immutable-js/) while rafObject is a
standard javaScript object.

The application will retrieve information using the methods of the rafObject.

### restAF Links ( rafLinks )


restAF extends all the links returned by the server with information it needs to navigate the store and make the final calls. 
For an application the most common use of rafLinks is as an argument to apiCall method of the store to navigate to a new resource.
The other common use is in associating links with UI components like buttons, navigators etc. This will be covered later in this document.

###apiCall - Making REST API  calls

The apiCall method on the store object is the most used method for making REST calls.

```javascript
    store.apiCall( rafLink <, payload>)
```

rafLink is obtained using the links and itemsCmd methods on rafObject.

The payload(optional parameter based on the REST end point) is an object with the following optional keys

*   data - If the REST call is a PUT or POST then specify the data payload
*   qs - Use this to specify the query parameters
*   headers - Use this to specify any special headers for this call. For example the upload action in cas requires the the JSON-Parameters header. Another example is file service's 'create' operation requires content-type to be specified
*   action - if you are running a cas action, you **must** specify the action name. Recommend that you use a fully qualified action name ( actionset.actionname )
*   All other information in the payload will be ignored silently. Since all the keys are optional restAF has no way to warn you about missing keys or
extraneous keys.


### Examples of payload

_To run sas code with compute service_
```json
    { data: { code: \[ 'data a; x=1;run;' , 'proc print;run' \] }}
```

_To run datastep in cas_

    { action: 'datastep.runCode', data: { code: 'data a; x=1;run;' } }

_To run upload action for CAS_

```javascript
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
```

_To create a file with plain text_

```javascript
    let payload = {
       data   : 'my data',
       headers: { 'content-type': 'text/plain' }
    }
```

### apiCallAll - Making api Calls in parallel

apiCall method makes a single service call. The apiCallAll method on store allows the programmer to execute multiple service calls in parallel. 
A typical use case will be running forecast actions in parallel in different cas sessions. 
Another is running jobs in multiple compute server sessions. You can mix and match services in this single call( ex: create files, run cas jobs etc... but this would be an exception rather than a rule

```javascript
    store.apiCallAll( requestArray )
```


*   requestArray is an array with each row of the following format:

```javascript
                { rafLink: <the rafLink to be called>
                  payload: <standard payload as described earlier in this document>
                }
```


The method returns when all the calls in the requestArray return successfully or when one of them fails. In that sense apiCallAll behaves like PromiseAll.
The order of the results array is the same as the requestArray. See the example for running parallel sas compute jobs


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

Most of the services that have a "state" end point recommend that you call the 'self' end point after the job completes to get the latest results from the job run. 
jobState and jobStateAll will make this additional call on 'self' if none of the jobs are still running. This saves you an additional call

At this point your code has to decide how best to proceed given these states.

### To check the status of a single job use jobState method.

```javascript
    store.jobState( rafObject-for-job <,payload> <,maxTries > )
```


Some services take a query parameter to support long polling - pass that information in the standard payload structure

maxTries is the number of times restAF will try if the job did not return a completed status

The returned object has the following form:

```json
    {
    data      : <completed|running|...|...>,
    statusCode: <http code >,
    job       : <rafObject of the final job>
    }
```

An example
```javascript
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
```json
 {
    running: <No of jobs still running >
    details: >details on the completion ( see note above and see below for the form of this object>
    jobState: [
          {
             job       : < the job rafObject. see note below >
             statusCode: < The http code from the server  >
            data      : < text returned on completion( 'complete' for example ) >
          }
       ]
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

```json
detail: {
  warning  : 2,
  completed: 1,
  error    : 1
}
```

```javascript
        store.jobStateAll( array of jobs rafObject, payload, maxTries )
        .then ( status => {
             if ( status.running !== 0 ) {
                ...handle slow running jobs...
             } else {
              ... check the detail object and make decisions...
             }

        } )
```

The payload parameter can be an array or single object. If single object then this payload will be applied to every rafObject in the first parameter. 
The primary purpose of the payload is to set timeout as a query parameter

Maxtries works the same as in jobState

### Submit and SubmitStatus methods- run api and handle results in "background".

REST APIs are great when the response to an api call is fast and instantaneous.
 In SAS it is not uncommon to have jobs that take a bit to run.
 For really long running jobs one should use our batch capabilities.
 However many solutions have applications where the user submits requests
 that can take from a few seconds to a minute or two to complete.

This presents a problem for the application writers.They have to poll the server at some intervals and
probably at many points in their application code.

The submit method is designed to handle this scenario in a more elegant way.

The parameters to submit are:

```javascript
    store.submit( rafLink, payload, delay, id , <OnCompletion exit>, <progress exit> )
```
 
 where:

- raflink - same as for apiCall 

- payload - standard payload or null

- delay - restAF will check the server after every "delay" seconds for completion and drive the callbacks if specified

- id - specify an id(string). You will use this to retrieve the information the rafObject associated with this job

- onCompletion - if non-null restAF will call this exit on completion ( success or failure) of the job.

- progress     - if non-null restAH will call this exist after every call to server to check the status.


The method signature of progress exit is

```javascript
    function progress ( data, id )
```
where

- data - the current status of the job ( running, completed, failed etc...)
- id   - the id you passed to the submit method

The function returns either true or false. If you return true, restAF will stop calling the server for the status
of the job.


The method signature of onCompletion is

```javascript
    function onCompletion( err, jobStatus, id );
```
where

- err       - if non-null then this is the error message
- jobStatus - this has the same structure as the return from jobStatus
- id        - the id that you passed to the submit method

You will retrieve the final jobStatus using the **submitStatus** method of the store

```javascript
    let jobStatus = store.submitStatus(id);
```
 where jobStatus is the same as what jobState returns.

One could write part of the introductory example as follows:

```javascript
let payload = {
        data: {code: [`data _null_; do i = 1 to 10000000; end;run; `]}
    };
store.submit( session.links('execute'), payload, 1,
             'myJob',onCompletion, progress);
```

## Details on restAF Object

###Properties


All property names are case sensitive

1.  **type:** This indicates which of the results pattern this object represent

    1.  **links:** Use the links method below to view and obtain rafLinks for further calls. If type is "links" then this object only has links for other end points.
    2.  **itemsList:** The rafObject contains an array of items with id's.
        1.  Use itemsList method to retrieve the id's of the items returned.
        2.  Use the scrollCmds method to determine whether there are more data available and for making the pagination calls.
        3.  Use the items function to retrieve specific items( or all items ) from the collection.
        4.  use the itemsCmd method torRetrieve the cmds( links) associated with specific item

    3.  **itemArray:** The returned value is an array of text. Use items methods to retrieve this data
    4.  **items:** The exact object type is not known. Use items method to get the information and also use resultType property do decide how to handle that data

3.  **resultType:** The media type of the result
4.  **route:** This is an index into the store for this specific result (see section on route later in this document). This will be useful if you want to pass a reference to a rafObject.
6.  **status:** This the http code returned from the api call
7.  **statusInfo:** An object with details of the status
8.  **host** - the fully qualified Viay host the web app is logged on to.


Methods (function properties)
-----------------------------

Use these methods to interact with rafObject. These functions return either objects or string depending on the data. Remember these objects are immutable objects. In the document below the common usage patterns are described.

If the returned value is an rafObject you can use query parameters to drill into a specific value in that object. Examples are provided below

#### links method

The links method will return an immutable object of rafLinks. You will use this method when the type of the rafObject is "links". But sometimes there will be links even when the type is not "links". In those cases the links are usually actions that operate on the whole collection

```javascript
    rafLink = rafObject.links( relName );
```


relName is the rel of the resource you are looking for. The call will return a rafLink that you can use in an apiCall as shown below

```javascript
     contentLink   = fileObject.links( 'content' );
     contentObject = store.apiCall ( contentLink );
```

Sometimes you need the entire list of links. An example is displaying buttons with the titles of the links. Below is an example of printing the titles of all the links.

```javascript
    allLinks = fileObject.links();
    allLinks.forEach( ( l, rel ) => {
       console.log(\`Title: ${rel}  rel: ${rel} \` );
    }
```

#### itemsList method

If the rafObject type is 'itemsList' use this method to get the immutable array of id's in the current result object. This is really a convenience method for UI ( ex: showing a list of the id's).

Below is an example listing all the id's

```javascript
    rafObject.itemsList().map( id => console.log(id) )
```

you can also do the following:

```javascript
    console.log( JSON.stringify(rafObject.itemsList(), null, 4) );
```


#### scrollCmds method

This method returns the rafLinks associated with pagination. This method can be used to get a rafLink associated with next, prev, last and first cmds(rel). At any given time the server may return some, all or none of these. To ensure safe programming, always check if the returned rafLink is non-null.

```javascript
    let nextCmd = rafObject.scrollCmds( 'next' );
    if ( nextCmd !== null ) {
        store.apiCall( nextCmd )
           .then ( restafobj => {...do something...} )
    } else {
        console.log( 'No more data' )
    }
```

In an UI you would want to display buttons for scrolling. A typical code will look like this

```javascript
    let cmds = rafObject.scrollCmds();

    cmds.forEach( ( c, cmd ) => {
        ...make your scrolling menu...
    } );
```

For example here is the code for creating a menubar in Reactjs

```javascript
    function ButtonMenu( props ) {
        let { cmds, onClick } = props;
        let menu = [];
        cmds.forEach( ( c, rel )  => {
            menu.push( <button key={rel} onClick={onClick(...)}
                               className="button"> {rel} </button> );
        } );

        return (
            <div>
                {menu}
            </div>
        )
    }
```

#### items method

This method gives you access to the data that might have been returned. This could be log for compute server, cas results, tables, status, ods and so on. The combination of resultType and type should give you sufficient information on how to process this data. It is possible to write an intelligent UI that determines the "viewer" to use given these pieces of information. But in a typical scenario the application knows what it is expecting at any specific point in the flow of the application.

The items method takes arguments that determines what is returned.

```javascript
    let result = rafObject.items( <query> )
```

Let us examine a few typical cases

**All Items**

```javascript
let allItems = rafObject.items();
```

If you get all the items then you need to write the code to manage the items based on the resultType

**Get a specific item using the id ( which you will get from itemsList() )**

```javascript
    let item = rafObject.items( idOfItem );
```

**Getting data for an item in a collection **

```javascript
    let data = rafObject.item( idOfItem, 'data' );
```


#### itemsCmd

Use this method to obtain the cmds associated with a particular item. Obtain the id of the item by using the itemList method.
The most common usage is to get the rafLink for a specific command for the selected item

**Get a specific command associated with a item with a specific id**

```javascript
    let item = rafObject.itemsCmd( idOfItem, 'name of command' );
    ex:
    let deleteCmd = rafObject.itemsCmd( '1234ID', 'delete' );

    store.apiCall( deleteCmd )
    .then ( f => { do whatever) }
    .catch( err => { do whatever) }
```

**Get all commands associated with a item with a specific id**

```javascript
    let rafLinks = rafObject.itemsCmd( idOfItem );
```

You can step thru this object as follows

```javascript
    rafObject.itemsCmd( idOfItem ).forEach( ( c, key) => {
    // c is the current cmd information
    // key is the name of the command( createSession, delete etc... )
    }
```

#### responseHeaders

On occasion one needs to access to the returned headers like etag. For those scenarios use the responseHeaders method.

**Get a specific header**

```javascript
    let etag = rafObject.responseHeaders( 'etag' );
```
**Get all headers**

```javascript
    let headers = rafObject.responseHeaders();
```

#### status

To get the http status returned from the call

```javascript
       let status = rafObject.status();
```

#### statusInfo

Use this to get any additional information that might have been returned for the status. Mostly useful if the job failed for some reason

        let info = rafObject.statusInfo() ;
        console.log( info );

### Less used Methods

####raw
Returns the raw response from the server

####config
The http payload sent to the server (useful for debugging)


Running CAS actions
-------------------


In restAF you will access cas actions in the following manner.

*   Add casManagement to restAF using store.addServices.
*   Look thru the list of servers returned by casManagement and pick the one you want. More often than not there is probably only one cas server.
*   Create a session on that server. restAF will add a rel named 'execute' to the session's links returned from this step.
*   Make all cas action calls thru runAction method
*   restAF collects all the returned tables under a "tables" object to make handling of returned tables a bit easier

Below is an example showing uploading of a csv to cas and then getting its info

The example below uses the nodejs file i/o. If you are running from browser you will use the File Object.

```javascript
    async function example () {
        // setup

        await store.logon(payload);
        let {casManagement} = await store.addServices('casManagement');
        let servers         = await store.apiCall(casManagement.links('servers'));
        let casserver       = servers.itemsList(0);
        let session          = await store.apiCall(servers.itemsCmd(casserver, 'createSession'),
                                          {data: {name: 'mysessionname'}});
        /
        // setup header for upload and the rest of the payload
        let JSON_Parameters = {
            casout: {
                caslib: 'casuser', /* a valid caslib */
                name  : filename /* name of output file on cas server */
            },

            importOptions: {
                fileType: fileType /* type of the file being uploaded */
            }
        };
        let p = {
            headers: {'JSON-Parameters': JSON_Parameters},
            data   : readFile(filename, fileType),/* read the csv file from somewhere */
            action : 'upload'
        };

        let actionResult = await store.runAction(session.links, payload);
        prtUtil.view(actionResult, 'Result of upload action');

        let deleteAction = await store.apiCall(session.links('delete'));
        return "All Done";
        }

        function readFile (filename, fileType) {
           return fs.readFileSync(`./data/${filename}.${fileType}`);
        }
```

#### Handling tables returned by CAS
Below is a sample program to print the rows in the CAS tables

```javascript
        let data = result.items('tables', <name of the table>);
        let itemRows = data.get('rows');
        let columns = [];
        data.get('schema').map(s => {
            columns.push(s.get('name'));
        });

        itemRows.map((r)=> {
            let row = {};
            r.map((value, j) => {
                row[columns[j]] = value;
            });
            console.log(JSON.stringify(row, null, 4));
        });

```

Handling Pagination
-------------------

restAF handles all the pagination for you. Use the scrollCmds as described above. It assumes that you will use the scrollCmds API to retrieve more information.

For example to get the next set of items do the following

```javascript
    let next = rafObject.scrollCmds( 'next' );
    if ( next === null ) {
      /\* tell user there is no more data */
    } else {
       store.apiCall( next )
       .then ( nextObj => {
         do whatever using teh rafObject methods
        } );
       .catch ( err => {
         handle error conditions
        } )
    }
```

Replace next with prev,last ans first as appropriate.

Here is an example of printing to console all the items from a collection

```javascript
    let store = restaf.initStore();

    // Pagination

    async function example (store, logonPayload, counter) {
        await store.logon(logonPayload);
        let {files} = await store.addServices('files');

        let filesList = await store.apiCall(files.links('files'));
        printList(filesList.itemsList());
        let next;
        // do this loop while the service returns the next link
        while(((next = filesList.scrollCmds('next')) !== null) )  {
            filesList = await store.apiCall(next);
            printList(filesList.itemsList());
        }

        return 'All Done';
    }

    const printList =  (itemsList) => console.log(JSON.stringify(itemsList, null, 4));

    example(store, payload, 10)
       .then (status => console.log(status))
       .catch(err => console.log(err));

```

Route property
--------------

Each rafObject has a route property. This is a string that is key to the data pointed to by rafObject.
restAF uses the route to find the data associated with this key. If for whatever reason you need to maintain a "pointer" to a
rafObject or to pass it in as a query parameter you can use this.

Route is useful if you want to pass a specific rafObject to another part of your program through some routing mechanism( ex: react-router). Given a route you can get the
associated rafObject with the **rafObject** method

```javascript
   let myObject = store.rafObject(route);
```

## Authentication

restAF relies on the Oauth2 authentication supported by SAS Viya.

There are a few use cases as described below:

### Authenticated browser session: If you session is already authenticated then pass null to logon method

```javascript
       store,logon( null)
       .then ( msg => <do your stuff> )
       .catch( err => <error handling> )
```

### Using an existing token

There are situations where a valid token might exist.  In that case use the following payload to store.logon

```javascript
        store.logon( {
            host: "your viya server',
            token: "your token
        });
```

### nodejs applications

For nodejs applications you will need to use the password flow authentication method

```javascript
       let  payload = {
            authType    : 'password',
            host        : 'http://yourserver:portno',
            user        : username,
            password    : user password,
            clientID    : clientid,  /* get this from your admin */
            clientSecret: clientsecret /* get this from your admin */
            } );
        store.logon  ( payload )
            .then ( () => ...do whatever your app does ...)
            .catch( err => ...do recovery ... )
```

### Web Applications

#### Implicit flow
For web applications it is recommended that you use implicit flow authentication.

```javascript
        let payload = {
            host        : <Viya server host (ex: http://my.example.com)
            clientID    : <clientid>
            redirect    : <your redirect>,
            authType    : 'implicit',
        };

        store.logon  ( payload )
            .then ( () => ...do whatever your app does ...)
            .catch( err => ...do recovery ... )

```
In your redirect uri pass null for the logon

```javascript
store.logon(null)
.then(...)

```


## Additional Store Methods

### connection

    let c = store.connection();
The connection method return information on the current connection.

```json
{
    "type": "trusted",
    "host": "http://your-viya-host",
    "tokenType": "bearer",
    "token": "... your Oauth token ..."
}
```


### getServices
```javascript
     let services = store.getServices();
```

This returns the list of services including "services" specific to restAF(see below)

### getService

```javascript
     let services = store.getService('name of service');
```

This returns raf object for a service that was setup using addServices. \

### setAppData and getAppData

Use this method to request restAF to store your data and to retrieve that data

```javascript
    await store.setAppData( id, data )
       where
           id   - id of this data (string)
           data - an object that you want restAF to store
```

To retrieve the data use the getAppData method

```javascript
      let mydata = store.getAppData( id );
```

To retieve a specific item pass

```javascript
      let mydata1 = store.getAppData( id, name);
```

Unlike the other store api methods getAppData returns a standard
javaScript object and not an immutable object.

See example appdata.js in the examples directory.

Lifecycle of restAF store
----------------------

**Warning** The store will be lost when you close the browser session. While technically it is possible to save and restore the store this version of restAF does not support persistence.
