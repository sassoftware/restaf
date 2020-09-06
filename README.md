
# restaf - An Easy Button To Access SAS Viya Using SAS Viya REST APIs

> A Note To Current Users of restaf:
> As time permits recommend you switch to this scoped version. New features will be added to the scoped versions described here. However we will continue to fix any issues that arise in the current non-scoped version of restaf.

## Documentation

Please see <https://github.com/sassoftware/restaf/wiki> for more detailed documentation and notes.

## Libraries

### restaf - An easy button to access SAS Viya using REST API

---

#### Usage notes for restaf

1: _nodejs_

```js
let restaf = require('@sassoftware/restaf');
```

2: _Browser_

```html
 <script src="https://unpkg.com/@sassoftware/restaf/dist/restaf.min.js"></script>
 ```

### restaflib - A library of convenience functions to address common use cases

---

#### Usage notes for restaflib

1: _nodejs_

```js
let restaflib = require('@sasoftware/restaflib');
```

2: _browser_

- restaflib   - A library of convenience functions to address common use cases

## Examples using restaf and restaflib

These are in this repository.

- restafuilib - Examples of ui components based on react,material-ui and restaf
- examples    - Examples showing the use of restaf and restaflib for writing nodejs programs
- uidemos     - Examples of web apps using restaf, restaflib and uilibrary
- serverless-score - Scoring using AWS serverless functionality
- registerclient - create clientid and client secrets
- viyacaddy - upload tables, score code and astore to cas
- vaBasedApps - example of using restaf in SAS Visual Analytics  web content and Data Driven Content components

## Other examples using restaf

- [SAS® Optimization Web App Using REST APIs with Embedded SAS® Visual Analytics Reports](https://blogs.sas.com/content/operations/2020/03/11/sas-optimization-web-app-using-rest-apis-with-embedded-sas-visual-analytics-reports/)

- [CAS Stored Process" with my Favorite Action Hero runCasl](https://blogs.sas.com/content/sgf/2019/06/25/cas-stored-process-runcasl/)

- [GraphQL and SAS Viya applications - a good match](https://blogs.sas.com/content/sgf/2019/05/16/graphql-and-sas-viya-applications/)

- [Serverless functions and SAS Viya - a good match](https://blogs.sas.com/content/sgf/2019/03/26/serverless-functions-for-scoring-with-sas-viya/)

- [SAS REST APIs: a sample application](https://blogs.sas.com/content/sgf/2018/12/21/sas-rest-apis-sample-application/)

## Setup to run the examples in this repository)

1: The main package.json has scripts to build and run code in the packages.

2: To access SAS Viya you need to establish the following clientids. You can use the interactive utility registerclient to create these(or use your favorite script)

- A password flow clientid(raf) and clientsecret(raf) to run the samples in the packages/examples directory and for packages/viyacaddy.

- An implicit flow clientid(callback) with a redirect(<http://localhost:8080/callback>) to run the samples in packages/uidemos. Make sure you have set the CORS values appropriately using SAS Environment Manager.

3: Some of the examples need data to be loaded into the SAS Viya Server. The sample data is the the data subdirectory.  Use the viyacaddy to upload these into your Viya Server(or use SAS Studio if that is your preferred mode of operation).

### Running examples in packages/examples

1: Edit packages/examples/env/restaf.env and set the value indicated there. Note that you have the option of setting these values thru your system SET /EXPORT commands.If you prefer the latter leave the fields as name= in the env file.

2: To run a test example use this command

```script
npm test testname

Example:

npm test casEcho

```

### Running examples in packages/uidemos

After creating the clientid 'callback' do the following:

```script
set VIYA_SERVER=<your viya server: ex http://acme.com/viya>
npm run uidemos:implicit
```

And then visit the url indicated in the log( <http://localhost:8080/viyaapp>)

### Running registerclient

Run the following script

```script
set VIYA_SERVER=<your viya server: ex http://acme.com/viya>
npm run registerclient
```

To get started enter 'logon' and answer the prompts.

Once successfully logged on issue the appropiate commands (issue help to see the available commands).

### Running viyacaddy

Run the following script

```script
set VIYA_SERVER=<your viya server: ex http://acme.com/viya>
npm run  viyacaddy
```

To get started enter 'logon' and answer the prompts.

Once successfully logged on issue the appropiate commands (issue help to see the available commands).
