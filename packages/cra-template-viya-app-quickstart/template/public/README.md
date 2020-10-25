# A Quick Start SAS Viya Application Builder



This Quick Start new SAS Viya applications with minimal setup. Once you have setup your local development enviroment you can add new applications. The following key libraries are installed by default:

<img src="./quickstart.png">

---

## Supporting cast

---

1. [restaf and restaflib to make REST API calls to Viya](https://github.com/sassoftware/restaf)

2. [restaf-server for the application server](https://github.com/sassoftware/restaf-server)

3. [Material-ui for react components](https://material-ui.com)

You can replace and/or add other react component libraries.

## Adding your own applications

---

It is a simple process to get your application appearing in the application menu. This menu is acccessed via the hamburger menu in the application's banner. The default app takes care of all the routing and passing the correct props to your application's main component.



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
        text: 'Total of two numbers',
        n1: 10,
        b2: 20
    },
}
```

The component name must match the name of the component you will create in Step 2.
The props are specific to your component. Typically these are configuration information to make your application work correctly.

The text in props will appear as the selection in the menu displayed by Home.js

At times you want to hide an application from users while you are working on it. Set hide to true in the menu. It defaults to false if not specified.

There are two sets of props your application will receive when selected from the menu.

`Group 1 Props`

1. All the prop that were passed to App.js in your index.js

2. This list is enhanced with the following:

    - store -- restaf store object
    - host  -- your current SAS Viya url
    - appName -- the name of your application
    - appOptions -- this information is set in appenv.js in your root directory and the logonpayload. {appEnv: <info from appenv,.js>, logonPayload: < viya-server related information>} More on this later in this document

The content of appOptions is:

```json
{
    appEnv:  < the object returned from appenv.js in the root directory. Used for passing application configuration information>
    logonPayoad: < This has information related to logging on to Viya - used for implicit flow authentication >
}

These are accessed as usual:

```js
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

As an example the props for the "ComputeService" application item is defined in App.js as shown below

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

When you run the application your menu will appear on the home page. Selecting it will display your application.

---

### Step 2

---

Develop your main app component in the viewers directory. You can use any react library. By default this project installs @material-ui.

```js
import React from 'react';
import { useLocation } from 'react-router-dom';

function MyApp(props) {
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

## **Conclusion**

That is all there is to adding new components.
