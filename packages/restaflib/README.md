<a name="module_casActionRun"></a>

## casActionRun ⇒ <code>object</code>
Calls cas server and returns the results(async)

**Returns**: <code>object</code> - returns results from cas

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| session | <code>object</code> | cas session |
| parameters | <code>object</code> | parameters for the action |

<a name="module_casFetchData"></a>

## casFetchData ⇒ <code>object</code>
Fetch rows from cas Tables

**Returns**: <code>object</code> - see doc. {pagination: {prev: pagePrev, next: pageNext, count: count},  data:  {schema: co The prev and next are as follows:  Either it is -1 to indicate EOF or a number to start the next obs no to start the fetc from

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| session | <code>object</code> | cas session |
| table | <code>object</code> | table {caslib: x, name: y} to read from |
| control | <code>object</code> | what to read {from: n, count:n , format: true|false} |

<a name="module_caslRunBase"></a>

## caslRunBase ⇒ <code>object</code>
Calls cas server and returns the results(async)

**Returns**: <code>object</code> - returns results from cas

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| session | <code>object</code> | cas session |
| src | <code>object</code> | casl src statements |
| args | <code>object</code> | user input args |

<a name="module_caslRunBase"></a>

## caslRunBase ⇒ <code>object</code>
Calls cas server and returns the results(async)

**Returns**: <code>object</code> - standard return value from apiCall

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| session | <code>object</code> | cas session |
| src | <code>object</code> | casl src statements |
| args | <code>object</code> | arguments to pass to on to CAS as _args_ |

<a name="module_caslScore"></a>

## caslScore ⇒ <code>object</code>
Score data in casl

**Returns**: <code>object</code> - returns the scores as an object

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| session | <code>object</code> | cas session |
| scenario | <code>object</code> | scenario values |

<a name="module_casSetup"></a>

## casSetup ⇒ <code>object</code>
Calls cas server and returns the results(async)

**Returns**: <code>object</code> - returns an object {session: xxx, servers: yyy}

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| logonPayload | <code>object</code> | if not null, then use this logon to Viya |

<a name="module_casTableToJson"></a>

## casTableToJson ⇒ <code>object</code>
Converts a cas table to JSON

**Returns**: <code>object</code> - - the new json version

| Param | Type | Description |
| --- | --- | --- |
| result | <code>object</code> | the raf object retrned from a call to cas |
| table | <code>string</code> | the name of the table |

<a name="module_computeFetchData"></a>

## computeFetchData ⇒ <code>object</code>
Fetch data from a SAS Table

**Returns**: <code>object</code> - - {columns: <columnames>, rows: <data for rows> , scrollOptions: <available scroll directions>}

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| computeSummary | <code>object</code> | Summary object created by computeSummary method |
| table | <code>string</code> | name of the table |
| direction | <code>string</code> | null|next|prev|first|last |

<a name="module_computeResults"></a>

## computeResults ⇒ <code>object</code> \| <code>string</code>
Return Log|listing|ODS|list of tables in the compute service job

**Returns**: <code>object</code> \| <code>string</code> - - string for all except tables(array)

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| computeSummary | <code>object</code> | computeSummary object |
| type | <code>string</code> | type of result( log|listing|ods\tables) |

<a name="module_computeRun"></a>

## computeRun ⇒ <code>object</code>
Prepare data for runCompute(@async)

**Returns**: <code>object</code> - computeSummary object

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| session | <code>object</code> | current compute service session |
| src | <code>string</code> | code to execute |
| args | <code>object</code> | args to be passed on as macros |

<a name="module_computeRunBase"></a>

## computeRunBase ⇒ <code>object</code>
Reduce compute service to an consummable form(async)

**Returns**: <code>object</code> - computeSummary Object

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| session | <code>object</code> | compute service session |
| code | <code>code</code> | SAS code to be executed |

<a name="module_computeSetup"></a>

## computeSetup ⇒ <code>object</code>
Setup access to compute service

**Returns**: <code>object</code> - - returns a compute session

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| contextName | <code>string</code> | name of the context( if null the first context in the list is used) |
| payload | <code>object</code> | logon payload - If null assumes that logon was done earlier. |

<a name="module_computeSummary"></a>

## computeSummary ⇒ <code>object</code>
Reduce the job information into consummable form(async)

**Returns**: <code>object</code> - - the computeSummary object for easy handling of logs,listing,ods, tables

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| job | <code>object</code> | rafObject representing the compute service job |

<a name="module_findReport"></a>

## findReport ⇒ <code>object</code>
Search for a named report(async)

**Returns**: <code>object</code> - - either null or rafObject for the report

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| name | <code>string</code> | name of the VA report |

<a name="module_getReportImage"></a>

## getReportImage ⇒ <code>string</code>
Return the svg of the specified report(async)

**Returns**: <code>string</code> - - the svg of the report

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| name | <code>string</code> | name of the report |

<a name="module_getReportUrl"></a>

## getReportUrl ⇒ <code>string</code>
Generate url for report(async)

**Returns**: <code>string</code> - url for the report

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| name | <code>string</code> | name of report |

<a name="module_getSASTableRows"></a>

## getSASTableRows ⇒ <code>object</code>
Convert table to object of the form [{var1: value, var2: value,...},....](async)

**Returns**: <code>object</code> - - resulting json

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| computeSummary | <code>object</code> | computeSummary |
| tableName | <code>string</code> | name of the table |

<a name="module_jsonToDict"></a>

## jsonToDict ⇒ <code>string</code>
Produce a string with casl dictionary suitable for inclusion in casl code

**Returns**: <code>string</code> - returns the string containing the casl dictionary

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | the JS object of interest |
| name | <code>string</code> | the name to assign to the dictionary |

**Example**
```js
obj = {x: 1, b:2, c: ['a','b']};
 name ='_appEnv_';
 result is a string _appEnv_ = {x=2, b=3, c={"a', "b"}}
```
<a name="module_masRun"></a>

## masRun ⇒ <code>object</code>
Score using MAS

**Returns**: <code>object</code> - - return results {name: value, name: value}

| Param | Type | Description |
| --- | --- | --- |
| restaf | <code>store</code> | store |
| masControl | <code>object</code> | object from masSetup |
| modelName | <code>string</code> | name of model to be executed |
| stepName | <code>string</code> | if not specified it will default to the first step |

<a name="module_masSetup"></a>

## masSetup ⇒ <code>object</code>
setup access to MAS

**Returns**: <code>object</code> - - masControl used in masRun

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| models | <code>object</code> | an array of model names |
| logonPayload | <code>object</code> | null|restaf logon payload |