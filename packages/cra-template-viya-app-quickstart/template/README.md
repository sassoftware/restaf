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

## Docker and K8s

The project includes the necessary Dockerfile and docker-compose to create docker images and run.

Please see this link for a set of kustomize yaml files to deploy to Kubernetes.<https://github.com/sassoftware/restaf-uidemos/tree/k8s>

---

## Getting started

---

Do the 3 steps - **Ready, Set and Go** as described below

## **Ready**

Setup the development environment as follows:

1. Issue this command

```sh

npx create-react-app somename --template viya-app-quickstart

Ex:
npx create-react-app reactapp --template viya-app-quickstart

```

This will create a sub-directory called myapp and install a starter application that is ready for execution once you complete the VIYA_SERVER related configurations.

## **Set**

The required configurations are explained at this [link](https://github.com/sassoftware/restaf/wiki/usefulTips).

The default clientId information are:

- Oauth flow: authorization_code
- clientid: same as the webapp option to the cli
- secret: secret
- redirect_uri: <http://your-app-server:8080/your-webapp-name>.

Once the server setup is completed, complete the setup of your development environment:

1. Set an environment variable as follows

```sh
set VIYA_SERVER=<your viya server: ex: <http://myviyaserver.com>
```

Alternatively you can edit the .env file and add this information to it.

The last step is to build the default application.

```sh
yarn buildapp
```

> The buildapp script does some necessary housekeeping before running the standard start script of create-react-app. So use buildapp to build the application

## **Go**

Now you are ready to run the default application.

Enter the following commands

```sh
yarn app
```

At this point you should visit <http://localhost:8080/your-webapp>. If webapp value is viyademo then visit

```text
http://localhost:8080/viyademo

```

## Default Applications

These are default applications that you can access from the hamburger menu in the banner.

1. Run a casl program in Cas

2. Run a SAS program in spre

3. View the props these applications (and the new ones you will write) will have access to.

These are good examples for learning how to use restaf to make REST API calls to SAS Viya. Feel free to remove or update all the default components.

> You are also free to replace the Header.js and Home.js to suit your needs. Both of these components receive the appMenu as a prop - this allows you to display the menu as you see fit.

---

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
    appEnv:  < the object returned from appenv.js in the root directory. Used for passing application configuration information>
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

## **Conclusion**

That is all there is to adding new application - no wiring of routes, servers, code for authentication etc...
Use your extra free time doing other interesting stuff.

---

## Using your own templates

---

You can create a template that meets your corporate needs using the following steps.

1. In a git repository create a project.

2. In that project create one more branches. Each branch represents a template.

3. Use the quickstart branch in <https://github.com/sassoftware/restaf> as a template

## Creating clientids

---

Most folks create clientid's using shell scripts run on the Viya server or using POSTMAN scripts. Here is a even simpler way.
You must have admin privledges. The example below uses the default values for this repo. Feel free to change it to suite your needs.

Step 1: Issue this command in a shell on your local machine

```sh
npx @sassoftware/registerclient --host=your-viya-server-url
```

Example:

npx @sassoftware/registerclient --host=<http://mytestserver.com>

Step 2: You will get a prompt on your shell. Enter "logon" as a command. You will be promoted for your userid and password

Step 3: After successful logon enter the following(replace viyademo with the value of webapp)

> add alldemos -t authorization_code -s secret -r <http://localhost:8080/viyademo,https://localhost/viyademo>

Step 4: Enter help to explore other features or enter exit to get out of the application

---

## Other information

---

## Standard create-react-app Scripts

---

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: <https://facebook.github.io/create-react-app/docs/code-splitting>

### Analyzing the Bundle Size

This section has moved here: <https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size>

### Making a Progressive Web App

This section has moved here: <https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app>

### Advanced Configuration

This section has moved here: <https://facebook.github.io/create-react-app/docs/advanced-configuration>

### Deployment

This section has moved here: <https://facebook.github.io/create-react-app/docs/deployment>

### `yarn build` fails to minify

This section has moved here: <https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify>
