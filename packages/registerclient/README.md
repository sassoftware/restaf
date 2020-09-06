# registerclient

Application to manange clientids. The application runs as a cli.
It can be run in interactive mode or in batch mode.
The user of this app must have admin rights.

---
---

## **Install**

---

```script
npm install -g @sassoftware/registerclient
```

---

This installs the registerclient as a global command.

---

## Quick start

---

The simplest way to use this cli is as follows:

```cmd
npx @sassoftware/registerclient --host <your viya server url>  
```

## **Configuration**

---

Create an env file ( call it register.env) with the following content

```env
VIYA_SERVER=http://<your viyaserver>
AUTHTYPE=password
CLIENTID=sas.ec or a valid clientid( appears that sas.ec is shipped as a default clientid)
CLIENTSECRET=
```

Now add this enviroment variable

SET RESTAFENV=register.env

---

## **Interactive mode**

---
Start the interactive session with this command:

```script

registerclient

```

This will put you into an interactive session where you can issue commands. Use the exit command to end the session.

---

## **Batch mode**

---

This mode is useful when you want to run these commands as part of some process. I use them to setup all my clientids when I am configuring a new server

Create a version of the register.env file with two additional keys - USER and PASSWORD

```env
VIYA_SERVER=http://<your viyaserver>
AUTHTYPE=password
CLIENTID=sas.ec or a valid clientid( appears that sas.ec is shipped as a default clientid)
CLIENTSECRET=
USER=<username>
PASSWORD=<password>
```

Run the following command

```script

registerclient --file yourcmdfile

```

The cmd file is a list of the commands(see below). They are executed in order.

```text
list
add app1 -t implicit -r http://localhost:5000/app1
add app2 -t authorization_code -s mysecret -r http://localhost:5000/callback
list
```

## List of commands

- logon - logon on to Viya server
- list \<all\> - list current clientid. Use all option to include system clientids
- delete clientid - delete the specified clientid( always returns 404 but work - no idea why)
- add clientid \< options \> - add a new clientid
- details clientid - print details of selected clientid

### Options for the add command

- -t  == grant type ==  typically one of these: password | implicit | authorization_code)
- -s  == secret whatever you want(valid for password and authorization_code)
- -r  == redirect_uri == valid for implicit and authorization_code(if multiple redirects seperate them by comma(,))

## Notes

The current configuration for all clientids is shown below:

```js
scope: ['openid', '*'],
resource_ids: 'none',
autoapprove: true,
access_token_validity: 86400,
'use-session': true

```
