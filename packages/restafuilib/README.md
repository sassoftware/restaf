# restaf-uidemo

A collection of examples demonstrating then use of restaf in web applications.
The demos cover typical SAS software usages - running datastep, running cas actions,
accessing VA reports etc...

Please review the source code to see how restaf is used to achieve
the desired goal with minimal coding.

## Pre-requisites

Create an authorization_code flow clientid and clientsecret

- clientid     = appc
- clientsecret = secret
- redirectUri  = http://localhost:8080/viyaapp/index.html

## Install

```script
git clone https://sassoftware/restaf-uidemos
cd restaf-uidemos
npm install


example:
git clone https://github.com/sassoftware/restaf-uidemos.git
cd restaf-uidemos
npm install

```

## Running the application

set the VIYA_SERVER using your system set command.

ex:

set VIYA_SERVER=http://myviya

Then run the following command:

```script
npm start
```

Visit this site on your browser:  http://localhost:8080/viyaapp

You will be prompted for your userid and password. If logon is successful you will be presented a web page with choices for running different applications.

You can add your own apps to this list ( see index.html )
