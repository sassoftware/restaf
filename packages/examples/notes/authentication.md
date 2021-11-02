# Authentication in restaf

There are 4 scenarios supported by restaf

1. Password flow
2. Implicit flow
3. Authorization_code flow
4. With user-suppliedauthorization token

## Logon method

Every restaf session must call the logon method to connect restaf to the Viya server. This enables restaf to make API calls to that server.

     To obtain clientid and clientsecret see the registerclient app in this repository. 

## Usage

    ```js

        let msg = await store.logon(payload);

        or

        store.logon(payload)
        .then (msg => console.log(msg))
        .catch (err => alert(err))

    ```

The payload object will depend on the use-case as described below

## Password flow

This is typically used in cli and nodejs applications.

The payload has the following schema:

    ```js
        let logonPayload = {
            authType    : "password",
            host        : {your viys server - http://cooluser.viya.com},
            user        : {username},
            password    : {user password},
            clientID    : {password flow clientID},
            clientSecret: {client secret}
        }
    ```


## Implicit flow

In the logon window use this payload
<pre>
        let payload = {
            authType    : "implicit",
            host        : {your viys server - http://cooluser.viya.com}},
            clientID    : {password flow clientID},
            clientSecret: ""{client secret},
            redirect    : {same redirect associated with the clientID}
        }
        </pre>

For simplicity of programming pass the same payload to logon in the redirected html. restaf will parse the incoming url for token.

    @sassoftware/restaf-server users: Please see that repo README file for more information.

<h2> Authorization_code flow</h2>

<blockquote>

<strong>Do not use this option until the release of a maintenance for Viya 3.5 </blockquote></strong>

</blockquote>

This is designed for use by your app server to authenticate the session. @sassoftware/restaf-server supports this.
If you are using some other app server look for documentation on Oauth support for that app server.

Assuming that your session is authenticated, pass the following to store.logon in your HTML 


<pre>
        let payload = {
            authType : "server",
            host     : {your viya server - http://cooluser.viya.com}},
            keepAlive: null
   
        }
        </pre>

The keepAlive is a place holder. Once testing is completed this will be enabled. This option is intended to keepAlive
your browser session authenticated for longer than 30 mins(or whatever the default was set to when Viya was installed). This is similar to
how Viya microservices work.


<h2> With authorization token</h2>



If you already have a valid Oauth token then use this payload.

<pre>
     
        let payload = {
            authType : "server",
            host     : {your viya server - http://cooluser.viya.com}},
            token    : {your token},
            tokenType: 'bearer'
        }
               
        

</pre>
</html>