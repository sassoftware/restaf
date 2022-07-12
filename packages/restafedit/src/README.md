# Explanation of the arguments used in this library

Please see [this for thr motivation for this library](../../README.md)

## appEnv

This object houses all the information needed access Viya, edit handlers, etc...
It also has a place for application writers to save application specific information.

The schema is below with sample values. While the library only supports cas server at this point, the plan is to add support for compute service.

appEnv is passed to all user defined handlers and functions in this library. Makes for a more flexible programming.

Do not change any of the values in this object. Use appControl object to store/read your information.

```js
{
    store       : <this is the control object for restaf library>,
    session     : <cas session object>,
    restaflib   : <object to access functions in restaflib>,
    logonPayload: <information to connect to Viya -see below>,
    appControl  : appControl /* see below */
    id          : <A unique id for this invocation>
}
    
```

## logonPayload

The logonPayload is designed to handle many situations. See this link for all the options <https://github.com/sassoftware/restaf/wiki/authentication>

However for the use cases this library is designed for the following two are probably sufficient

### Authenticated browser

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

## AppControl

This is passed to setup by the user to start the app session.

The schema is below with sample values. While the library only supports cas server at this point, the plan is to add support for compute service.

```js
{
      description: 'Simple Example',
      dataControl: {
        source: 'cas',
        table : {caslib: 'casuser', name: 'testdata'},
        access: {},
        byVars: ['key'],
        where : {},

        cachePolicy: true,

        initialFetch: {
          count : 1,
          from  : 1,
          format: false
        },

        customColumns: {
          total: {
            Column         : "Total",
            Label          : "Grand Total",
            FormattedLength: 12,
            Type           : "double"
            }
        },
        customRows: [] /* pace holder */
      },
       editControl: {
        handlers: {},
        save    : true,  
        autoSave: true, 
    
      },
      state: {
        modified  : [],
        pagination: {}.
        data      : [],
        columns   : {}
      },
      appData: {
        layout  : {},
        formName: 'testdata',
        getViewer: 

        uiControl: {
          defaultComponent: "InputEntry",
          show            : ['id', 'total', 'x2', 'x1', 'x3'],
          visuals         : {
            x2: {
              component: "Slider",
              props    : {
              min  : 0,
              max  : 50,
              steps: 1,
              },
            },
            total: {
              props: {
              disabled: true,
              },
            }
          }
        }
      
      }
      
   }
```

### Notes on appControl

Only the not-so obvious keys are explained below.

- from: The record number where the read starts(table.fetch action)
- count: Number of records to read
- cachePolicy: If true the data is stored in appEnv.state. You should set this to false if you want to manage the data. The pagination information will always be saved in appEnv to enable easy scrolling.
- handlers:  This is an object with functions for init, main, term and indiviual columns. Set to {} if you do not plan to make use of this feature.
- byVars: An array of by variables. At this time, one has to use key fields to update a record in CAS. ex: ['firstname', 'lastname']

- appData - this is where the  app writer can save information and retrieve it from appEnv. appEnv is passed to all handlers. So it is available in functions like init, main etc. The example above shows what I use in my generic DataEditor component.

#### Sample appData

In the quick start React component(viyaedit) that uses this library, the appData is used to hold some UI related information as shown below. So it can be anything you want.

```js
Content of appData is entirely upto the developer. Sample below
    appData: {
        formName: 'testdata',
        viewer  : {
            selectViewer: 'a function to return a react component',
            props       : {editor: 'DataFormMulti'}
            },
        defaultComponent: "InputEntry",
        show   : ['id', 'total', 'x2', 'x1', 'x3'],
        visuals: {
            x2: {
            component: "Slider",
            props    : {
                min  : 0,
                max  : 50,
                steps: 1,
            },
            },
            total: {
            props: {
                disabled: true,
            },
            }
        }
        }
```

## rowObject

The rows in the table(be it cas tables or SAS tables) are reduced to this form

{x1: 20, x2: 'abc',....}.

The keys are lower-cased column names.

If you added computed columns they will also be in this object. This allows the custom handlers like init, main and term to access these.

When updating the data on the server, the custom columns are dropped.

## eSchema

The schema returned from the server is reduced to this form:
{x1: {detail4-x1}, x2: {details4-x2},...}

An extra key 'custom" is added to each of the details. This is set to "true" if the column is a custom column.

This additional key is useful

- Save operations can drop these columns
- Can be used by UI to apply a different style to custom columns

## byVars

At the current time, we have to use key columns to identify the row to be updated. So byVars is an array of the key fields.

ex: ['X1', 'X2']

## rowIndex

When editing in a table form, it might be useful to know which row the current data array is being processed in the handlers. So this is purely informational

## fetch Results

The results from the fetch of records has the following schema

```js
{
  columns: <this is the ecolumns>
  data   : <this is an array of rowObjects>
  pagination: < obhect with information for scrolling to prev or next>
}
```
