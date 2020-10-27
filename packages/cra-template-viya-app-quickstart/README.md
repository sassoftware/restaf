# Quick Start tool for Building SAS Viya Applications

---

## Key Feature

---

This Quick Start tool allows you to build new SAS Viya applications with minimal setup. Once you have setup your local development enviroment you can add new applications as shown in the diagram below:

![Quick start](https://github.com/sassoftware/restaf/blob/2.0.0/images/quickstart.png)

Please see the details below.

The following key libraries are installed by default:

1. [restaf and restaflib to make REST API calls to Viya](https://github.com/sassoftware/restaf)

2. [restaf-server for the application server](https://github.com/sassoftware/restaf-server)

3. [Material-ui for react components](https://material-ui.com)

You can replace and/or add other react component libraries.

---

## Create the applicationn using create-react-app

---

Issue these command

```sh
npx create-react-app <projectName>  --template @sassoftware/viya-app-quickstart


ex:
npx create-react-app myapp  --template @sassoftware/viya-app-quickstart

```

---

## Configuration of SAS Viya

---

The required configurations are explained at this [link](https://github.com/sassoftware/restaf/wiki/usefulTips).

The default clientId information is:

- Oauth flow: authorization_code
- clientid: viyaapp
- secret: secret
- redirect_uri: <http://localhost:5000/viyaapp>

---

## Configuration of the application

---

Edit the .env file and set the following values:

VIYA_SERVER=your viya server url: ex: <http://acme.viya.com>

---

## Build the application

---

```sh
yarn buildapp
```

> The buildapp script does some necessary housekeeping before running the standard start script of create-react-app. So use buildapp to build the application

---

## Run the application

---

Issue this command

```sh
yarn app
```

At this point you should visit <http://localhost:5000/viyaapp>.

---

## Default Applications

---

These are default applications that you can access from the hamburger menu in the banner.

1. Run a casl program in Cas

2. Run a SAS program in spre

3. View the props these applications (and the new ones you will write) will have access to.

These are good examples for learning how to use restaf to make REST API calls to SAS Viya. Feel free to remove or update all the default components.

> You are also free to replace the Header.js and Home.js to suit your needs. Both of these components receive the appMenu as a prop - this allows you to display the menu as you see fit.

---

## Running in Docker

1. Edit docker-compose.yml and set the value of VIYA_SERVER.
2. Run the command 'yarn compose'. This will run 'docker-compose build' followed by 'docker-compose up'
3. Then visit the  site. If you used defaults the site would be <http://localhost:5000/viyaapp>

## Adding your own applications

---

It is a simple process to get your application appearing in the application menu. This menu is acccessed via the hamburger menu in the application's banner. The default app takes care of all the routing and passing the correct props to your application's main component.

![Quick start](https://github.com/sassoftware/restaf/blob/2.0.0/images/viya-app.png)

---

### Step 1

---

 Edit appMenus.js and add your application as a menu item. Your application will be displayed in the order it appears in the menu. The format of a menu item is:  

Let us assume that your new component is called Mydemo.js

```atom
{
    component: 'MyDemo',
    hide: false,  /* if not specified it defaults to false */
    props    : {
        text: 'Total of two numbers',/* text used in the application menu */
        n1: 10,
        b2: 20
    },
}
```

The component name must match the name of the component you will create in Step 2.
The props are specific to your component. Typically these are configuration information to make your application work correctly.

The text will appear as the selection in the menu displayed by Home.js

At times you want to hide an application from users while you are working on it. Set hide to true in the menu. It defaults to false if not specified.

There are two sets of props your application will receive when selected from the menu.

`Group 1 Props`

1. All the prop that were passed to App.js in your index.js

2. This list is enhanced with the following:

    - store -- restaf store object
    - host  -- your current SAS Viya url -- useful if you are using Viya VA SDK
    - appName -- the name of your application
    - appOptions -- this information is set in appenv.js in your root directory and the logonpayload. {appEnv: <info from appenv,.js>, logonPayload: < viya-server related information>} More on this later in this document

The content of appOptions is:

```json
{
    appEnv:  <the object returned from appenv.js in the root directory. Used for passing application configuration information>
    logonPayoad: < This has information related to logging on to Viya - used for implicit flow authentication >
}

These are accessed as usual:

 let {store, host, appName,appOptions} = props;
 ```

`Group 2 props`

The props provided in the menu defintion are available thru history as follows:

```atom
import { useLocation } from 'react-router-dom';
    <snip>
let location = useLocation();
let appProps = location.state;

```

appProps now has the props specified in the appMenu.js for this component

As an example the props for the "ComputeService" application item is defined in appMenu.js as shown below

```js
{
    component: 'ComputeService',
    props: {
        text: 'Import and Run SAS Program',
        initialTab: 0,
        tabs: [
                { label: 'ODS', component: 'ODS' },
                { label: 'Log', component: 'LogList' },
            ],
    },
},
```

The value of appProps for this example is:

```js
let appProps = {
        text: 'Import and Run SAS Program',
        initialTab: 0,
        tabs: [
                { label: 'ODS', component: 'ODS' },
                { label: 'Log', component: 'LogList' },
            ],
};
```

---

### Step 2

---

Develop your main app component in the viewers directory. You can use any react library. By default this project installs @material-ui.

```js
import React from 'react';
import { useLocation } from 'react-router-dom';

function MyDemo(props) {
    let {n1,n2,label} = useLocation().state;  

    let total = n1 + n2;
    return <div>
     <h1> {label} <h1>
     <p> {total} </p>
     </div>;
}
default export MyApp;
```

`Notes

1. Everytime you change appMenus.js or add a new viewer you must restart the app with the commands below. But normal editing of existing application will do a hot replacement of the app.

2. Recommendation: Clone one of the default examples and modify the code to suit your needs.

3. During development you should use the following command to have Hot Module Replacement enabled

> yarn dev

4.To create production build issue the command

> yarn buildapp

5.You can also run the application in docker(but first run yarn buildapp)

Run this command to create an image

> yarn dkrbuild

Run this command to run the application

> yarn dkrrun

---

## Project Organization

---

The src directory has 3 key sbu directories

1. viewers -- this directory has the main entry of the applications selectable in the menu

2. helpers  -- this directory is designed to hold react components used by the viewers

3. lib      -- this directory is for code that is not UI related: Example: code to access Viya, data manipulations etc...

yarn dev and yarn buildapp will scan the viewers and helpers directory and create the indexx.js in each of these directories.
For every entry in viewers directory the application will create a route that can be referenced in the appMenu.js

---

## Styles

---

Edit defaultStyles.json to set the styles to use with material-ui.

---

### TLS

---

Please see the .env file for notes on setting up tls.

## **Conclusion**

That is all there is to adding new application - no wiring of routes, servers, code for authentication etc...
Use your extra free time doing other interesting stuff.
