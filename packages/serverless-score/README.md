# serverless-score-models - a reusuable serverless function for scoring with Viya

---
The serverless function can be used to score when the scoring code is:

1. A datastep code deployed as a codeTable on a cas server

2. An astore that is deployed on a cas server

3. (TBD): Accessing model published to a Micro Analytic Service

---

## Repository

The code is available at <https://github.com/sassoftware/restaf-demos/packages/serverless-score>

## Configuration

1. Edit the serverless.yml and modify it for your needs.

## Securing your secrets

It is recommended that you create a AWS Secret with the following information:

```js
{
VIYA_SERVER,
USER,
PASSWORD,
CLIENTID,
CLIENTSECRET
}
```

You can use this secret in two ways;

1. Specify the MAINKEY value in the serverless.yml file
2. Pass it in the payload to the end points described below.

If you want the quick start without the hastle of setting up the secret see the section Quick Start.

## Serverless endpoint /score

Use this end point for scoring

The payload JSON has this schema

```json
{
"key": "<your secretname>", /* not required if it is specified in serverless.yml */
"model": {"caslib": "<model's caslib", "name": "model's name", "type": "<ds|astore>"},
"scenario": {
  "inputvar1": <value>,
  "inputvar2": <value>,
  ...
  }
}

## Serverless end point /describe

If you are scoring with astore then use this end point to get information on the input variables


The payload is:

```json
{
"key": "<your secretname>", /* not required if it is specified in serverless.yml */
"model": {"caslib": "<model's caslib", "name": "model's name", "type": "<ds|astore>"}
}
```

## Quick Start

In place of the "key" you can specify the values of the secret as follows:

```json
{
  "test": { "host": "<http://yourviyaserver>",
            "clientID": "<yourclientid>",
            "clientSecret": "<yourclientsecret>",
            "user": "<username>",
            "password": '<password>  
            },
  "model": {"caslib": "<model's caslib", "name": "model's name", "type": "<ds|astore>"},
  "scenario": {
  "inputvar1": <value>,
  "inputvar2": <value>,
  ...
  }
  
}
