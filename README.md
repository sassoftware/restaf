# restafedit - library for browsing and editing CAS tables and SAS Tables

Going back in history, SAS had products like SAS/FSP and SAS/AF that allowed users to create simple or complex interactive applications. As SAS moved to the Viya platform these products were dropped. SAS provided REST API (application programming interfaces) as an industry standard way for creating applications.

The key component of these applications is entering data. Common destinations of the modified data are:

- The client application
- Custom code on a Viya
  - Compute server
  - CAS (Cloud Analytic Server) server
  - MAS (Micro Analytic Score)
  - Other SAS services that can be accessed via REST API
- Some external servers
  - Azure App running a SAS Decision using SAS Container Runtime (SCR)
  - Others...

The goal of this project is to create a small reusable library to simplify the  data entry in SAS Viya.

## Sample Applications

- [Simple Editor Application](https://github.com/sassoftware/restaf-uidemos/tree/editorapp) - Demonstrates the use of this library using basic javascript and html to edit a cas table.

- [React Component for Editing-@sassoftware/viyaedit](https://github.com/sassoftware/restaf-uidemos/tree/viyaedit) - Demonstrates the use of this library with React. @sassoftware/viyaedit is a resuable component.
  - See [this application](https://github.com/sassoftware/restaf-uidemos/tree/editorappreact) on how to use this component library in a react application.

---

## Quick Start

---

## Installation

The library can be installed using npm, yarn.
It can also be accessed via script tags in your browser.

### Script Tags

restafedit depends on restaf and restaflib

```html
 <script src="https://unpkg.com/@sassoftware/restaf@next"></script>
 <script src="https://unpkg.com/@sassoftware/restaflib@next"></script>
 <script src="https://unpkg.com/@sassoftware/restafedit@next"></script>

 ```

### nodejs

```sh
npm install @sassoftware/restaf@next @sassoftware/restaflib@next @sassoftware/restafedit@next
```

### Writing your first editor

Below is a typical edit session. You can try this in a simple nodejs application or a web application.

#### Import the library

Use the syntax appropriate to your setup

```js
const { setup, scrollTable, cellEdit } = require('@sassoftware/restafedit');
or
import { setup, scrollTable, cellEdit } from '@sassoftware/restafedit';

```

<blockquote>
Step 0: password flow and authorization_code flow are supported.

```js
    const payload = {
      host        : 'Your viya server'
    };

    // If you want to experiment using password flow  use this.

  const payload = {
      host        : 'Your viya server',
      authType    : 'password',
      clientID    : 'sas.ec',
      clientSecret: '',
      user        : 'your id',
      password    : 'your password'
    };

    Tip: If you are running in the SAS VA DDC, you can set the host to window.location.origin
```

</blockquote>

<blockquote>
Step 1: Read/set control information to be passed to setup.

```js
  const appControl = getAppControl();/*see this function below */
```

</blockquote>

<blockquote>
// Step 2: Initialize the edit session.

```js
const appEnv = await setup(payload, appControl);
```

</blockquote>

<blockquote>
// Step 3: Read in first set of records

```js
let result = await scrollTable('first', appEnv);
/* result.data= [{column1: value, column2: value}]}*/
```

</blockquote>

<blockquote>
// Step 4: Edit data in the first row and save on server

```js
const x1 = result.data[0].x1 + 1000;/* modify a column value*/
await cellEdit('x1', x1, 0, result.data[0], appEnv);
```

</blockquote>
  
<blockquote>
//Step 5: Scroll to next or previous set of records

```js
let dir = 'first'|next'|'prev'
result = await scrollTable(dir, appEnv);
```

<blockquote>
  // Step 6: Repeat step 3 and 5 as often as you want.

</blockquote>

## Table versus Form for data entry<a name="t3"></a>

There are significant differences in how the user interacts with an application which uses a Table versus a custom form.

However, at the lowest level both require the same functionality - Accessing data, verifying the entered data, saving the modified records, executing additional processing on the server.

One of the key goals of this project is to create a single code base to handle both scenarios.

## Currently Supported Features of the library<a name="t4"></a>

- Creation and management of CAS session or Compute Session

- Reading one or more records from a cas table or SAS table

- Update the records based on a key

- Scrolling through the table

- Allow users to specify calculations on modifying a value. The current options are:
  - On the client using JavaScript
  - On the server
    - On the cas server using casl  or any cas action
    - Using procs and datasteps
  - On an external destination(ex: An Azure App for a SAS Decisioning Flow)

## Basic Flow<a name="t5"></a>

The Table Editor in the picture below is supplied by the user.
![viyaedit](DataEditorFlow.png)

---

### getAppControl

// AppControl with sample data

```js
function getAppControl () {
  return {
    description: 'Simple Example',
    source: 'compute', /* set to cas if data is in cas */
    table : { libref: 'TEST', name: 'TESTDATA' },  /* change libref to caslib if using cas */
    byvars: ['key'],
    cachePolicy: true,
    initialFetch: {
      count : 1,
      from  : 1,
      format: false
    },
    customColumns: {},
    editControl: {
      handlers: {}
      autoSave: true
    },
    computeContext: null, /* optional - defaults to Job Execution Service */
    appData: {}

  };
}
```

</blockquote>

## Usage

### **setup - Initialize and setup and edit session**

[setup](https://sassoftware.github.io/restaf/module-setup.html) will do an initial fetch and return it in the appEnv.state object.

```js

let appEnv = await setup(logonPayload, appControl)

```

- logonPayload - used to establish connection with Viya and create cas session.

- appControl - Information needed to control the session.

- appEnv - this is the control object for the edit session

### Notes on AppControl

Use this argument to setup the edit session. AppControl has the following schema with some sample values.

```js
  {

      source: 'cas', /* cas | compute */
      table : {caslib: 'casuser', name: 'testdata'},/* for compute: {libref: xxx , name: yyy}
      byvars: ['id'], /* used a key when updating records. */
      cachePolicy: true, /* data will be managed for you. */

      initialFetch: { /* what to read on initialization */
        count : 1, /* number of records read on each fetch */
        from  : 1, /* record to start the read from */
        format: false  /* return formatted or unformatted results */
      },

      customColumns: {  /* custom columns for use during the session */
         total: { /* sample */
         Column         : "Total",
         Label          : "Grand Total",
         FormattedLength: 12,
         Type           : "double"
      }
    },
   editControl: {
     handlers  : {}, /* handlers for init, main, term and columns. See below */
     autoSave  : true /* celledit will save to server on each edit*/
   },
   appData: {} /* place for user specified information
 }
   
```

#### Notes

- source:  (cas|compute) - The data is a cas table or SAS V9 table.
- initialFetch:  the first set of records to read
  - from: The record number where the read starts(table.fetch action(not an offset)
  - count: Number of records to read. On every fetch this many records will be read.

- cachePolicy: If true the data is stored in appEnv.state. You should set this to false if you want to manage the data. The pagination information will always be saved in appEnv to enable easy scrolling. The initial set of records wille be persisted in appEnv(see below).
- handlers:  This is an object with functions for init, main, term and indiviual columns. Set to {} if you do not plan to make use of this feature. Use the handlers that make sense to you. See below for the samples
- byvars: An array of by variables. At this time, one has to use this as key to update a record in CAS. ex: ['firstname', 'lastname']
- customColumns: You can add additional columns(temporary) to be used during the session. These columns are not persisted to the server. These variables are available to the handlers. A typical example might be to display some row totals. If none, set this value to {}
- editControl: This object specifies the handlers for INIT, MAIN and TERM. Also specify the handlers for individual columns. All of these are optiona. See example below.

- appData - this is where the  app writer can save information and retrieve it from appEnv. appEnv is passed to all handlers. So it is available in functions like init, main etc. The example above shows what I use in my generic DataEditor component

### appEnv

This object houses all the information needed access Viya, edit handlers, etc...
It also has a place for application writers to save application specific information.

The schema is below with sample values. While the library only supports cas server at this point, the plan is to add support for compute service.

appEnv is passed to all user defined handlers and functions in this library. Makes for a more flexible programming.

Do not change any of the values in this object. Use appControl object to store/read your information.

```js
{
    store       : <this is the control object for restaf library>,
    session     : <cas session object or compute session>
    restaflib   : <object to access functions in restaflib>,
    logonPayload: <information to connect to Viya -see below>,
    appControl  : appControl /* passed in by user to setup -see below */
    state       : {
       modified   : [], /* future - keep track of modified rows */
       pagination : {}, /* internal use to help with pagination */
       data       : {}, /* array of currrent rowObjects(see below) */
       columns    : {}  /* columns in eschema form (see below) */
    }
}
    
```

### Notes on appEnv

This is designed to make it convenient to track all relevant information by the library and the user of the library.

- **store** This is created by [restaf](https://sassoftware.github.io/restaf/module-runAction.html) library that makes the final calls to Viya REST APIs. The methods in restafedit makes use of restaf.

- **session** This is the current cas session or compute session. It is stored here to allow users to run additional actions in the same session.

- **restaflib** Use this to make calls to [restaflib](https://sassoftware.github.io/restaf/module-runAction.html) methods.

- **logonPayload**  This is used connect to Viya. Passed in by user to setup. See below for more information

- **appControl** This is the information passed in by the user to setup. See below

- **state** This holds the data retrieved from the server. You can override this behaviour with the cachePolicy(see below). Feel free to cache the data in other ways, especially if you want this source of truth to be available in other parts of your application. See below for details on state.

## Details on state

### data

state.data is an array of rowObjects. A rowObject has the form

```js

{x1: 20, x2: 'abc',....}


```

The keys are lower-cased column names.

If you added computed columns they will also be in this object. This allows the custom handlers like init, main and term to access these.

When updating the data on the server, the custom columns are dropped.

### Columns

The schema returned from the server is reduced to this form(eschema) and enhanced with information on custom columns.

```js
{x1: {schema for x1}, x2: {schema for x2},...}
```

An extra key 'custom" is added to each of the details. This is set to "true" if the column is a custom column.

This additional key is useful

- Save operations can drop these columns
- Can be used by UI to apply a different style to custom columns

### byvars

At the current time, we have to use key columns to identify the row to be updated. So byVars is an array of the key fields.

ex: ['X1', 'X2']

---

#### Notes on logonPayload

The logonPayload is designed to handle many situations. See this [link](<https://github.com/sassoftware/restaf/wiki/authentication>) for all the options.

Some common cases are described below

#### Authenticated browser

If the browser is authenticated(authorization_code flow) then the following is recommend

```js
{ host: <url for your Viya server>}
```

If you use the authentication token, then use the following:

```js
{ 
    host: <url for your Viya server>,
    token: <your authentication token>
}
```

### **cellEdit - Handles changes to a specific cell**

A cell is defined a the intersection of a column and a data row. The cellEdit does the following:

- If the column has an handler it will be called.
- If 'main" handler is specified, it will be called.
- If autoSave is true
  - The 'term' handler(if specified) will be called
  - The data for that row will be persisted to the server

```js
  let r = await cellEdit(columnName, newvalue, rowIndex, currentRow, appEnv);
```

The function returns the following:

```js

{ data: <the updated data>,
  status: {statusCode: 0|1|2, msg: <some string>

}
```

### **scrollTable - scroll either to prev or next set of records**

```js
 let r = await scrollTable(direction, appEnv);
```

The result has the following schema

```js
{
  data: <array of data rows>,
  columns: <object with enhanced column information>
}

```

If the cachePolicy is set to true, appEnv.state has this information also and you do not have to persist the results.

### **fetchTableRows  - fetch rows**

If for some reason you want to fetch data without using scrollTable, you can use fetchTableRows.

```js
let r = await fetchTableRows(control, appEnv);

The schema for control is:

{
  from: <record to start the read from>,
  count: <how many records to read>
  format: <true if you want formatted data>
}

```

The result is the same as scrollTable. If cachePolicy is true, then the results will be persisted in appEnv.state.

> For SAS tables (from - 1) is used as the offset. See compute service document for notes on this.

## Sample handlers

### init, main and term handlers

A sample code is below. init, main and term all have the similar pattern

The handlers for columns has an additional argument - the name of the column.

- data - the current row
- row  - rowIndex
- type - init|main}|term}|name of the column

```js

async function init (data,row,appEnv,type) {
    let status = {statusCode: 0, msg: `${type} processing completed`};
    data.total = data.x1 + data.x2 + data.x3 ;
    return [data, status];
};

async function x1 (data, name, row, appEnv) {

  let msg = {code: 0, msg: `${name} handler executed.`};
  if (data.x1 > 10) {
      data.x1 = 10;
      msg = {statusCode: 1, msg: "Exceeded Max. Value reset to max"};
  }

  return [data, msg];
};

```

### Accessing Viya from the handlers

The appEnv has the necessary information to access SAS Viya and in particular the cas session used by the edit session.

Note that you can use restaf and restaflib in the handlers(with store) to access any Viya REST API. You are not restricted to the current cas session.

The example below doing some calculations on the cas server

```js

import calculate from './calculate.js';
async function main (data, _rowIndex, appEnv,_type) {
    let {store, restaflib, session} = appEnv;
    let status = {code: 0 , msg: "Main processing completed"};

    // create casl statements
    let code = `
        send_response({total= _args_.x1 + _args_.x2 + _args_.x3});
    `;

    // run the code and return results - data is tranformed to _args_ by caslRun

    let r = await restaflib.caslRun(store, session, code, data);
    data.total = r.results.total;

    return [data, status];
};
export default main;


## Future

- Support where clause for reading records
