# create-react-restaf-viya-app

[create-react-app](https://create-react-app.dev/) is a very popular cli to jump start the development of react-based applications.

This cli is an extension of create-react-app. It is designed to help developer's building react apps using restaf library and its companions:

1. [restaf](https://github.com/sassoftware/restaf/wiki)
2. [restaflib](https://github.com/sassoftware/restaf/wiki)
3. [restaf-server](https://github.com/sassoftware/restaf-server/wiki)

## App Creation

```sh
npx create-react-restaf-viya-app react-appname --webapp webapp-name  --title webapp-title --script scriptTags-file


ex:
npx create-react-restaf-viya-app mycoolapp


```

Only the react-appname is required.
The optional parameters are:

- webapp  -- this is the user-friendly application name. Defaults to **viyademo**

- title   -- The text for the title tag in index.html. Defaults to **SAS/Viya Application**

- script  -- a file which has some HTML script tags to be inserted into index.html - defaults is a comment line

---

## Using the Generated Application

---

Once the app has been created you can start your development.

## Key Assumption

The application is authenticated using authorization_code flow.

## Configuration

Set the following in the .env file:

- CLIENTID  -- the default value is viyademo
- CLIENTSECRET -- the default value is secret
- VIYA_SERVER  -- no defaults.You must specify this(ex: <http://myviya.com>)

### Some defaults

1. The app server runs on localhost:5000/viyademo
2. The clientid redirect is <http://localhost:5000/viyademo>
3. The create-react-app server runs on its standard port(3000)

For more detailed configuration options see
See <https://github.com/sassoftware/restaf-server/wiki>

## App Development

1. Modify App.js to suit your needs
2. Install any additional packages your app might need.

## Running in Development Mode

Run this command to have HMR enabled

```sh
cd to-the-app-directory
yarn dev
```

The flow of the application on the yarn dev command is show below. Note that the application is accessing
your Viya Server during development.

![create-react-restaf-viya](create-react-restaf-viya-app.png)

## Running in Application mode

Run this command( no HMR)

```sh
cd to-the-app-directory
yarn build
yarn app
```

## React Context - AppContext

By default a react context named AppContext is created.

To access the data code something like this:

```js

import React,{useContext} from 'react';
import AppContext from '../providers/AppContext';

let appContext = useContext(AppContext);

let {store, appOptions} = appContext;

let {appenv, logonPayload} = appOptions;

```

The store is the restaf store object that you will use to make the API calls.

## Requiring restaf and restaflib in your application

These two libraries are part of the installed dependencies. To access them in your react components do these as follows:

```js
let restaf = require('@sassoftware/restaf/dist/restaf.js');
let restaflib = require('@sassoftware/restaflib/dist/restaflib.js');

or

import * as restaf from '@sassoftware/restaf/dist/restaf.js';
import * as restaflib from '@sassoftware/restaf/dist/restaflib.js';

```

In all probablity you will not refer directly to restaf in your code. You will use the store object in the AppContext(see above). This value is set as part of the application startup.
