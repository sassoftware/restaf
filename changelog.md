# Changes

> Removed all the old changes

## 4.4.0

Date: 07/26/2022

- updates to support PuP in VSCode Plugin
- computeRun was not handling undefined maxTries properly.

## 4.4.1

Date: 7/26/2022

- Change all references to computeDirect to computeServerId

## 4.4.2

Date: 7/27/2022

- Change the default delay 0.25 in apiCall

## 4.4.5

Date: 7/31/2022

- Since compute service implements long polling, change the jobState call in computeRun to use the query {newState: 'Complete', timeout:5). More efficient.

  - Changed timeout argument to accept seconds to override default.
  - Added support for 304 in sagas/httpCallWait and serverCalls/request to handle long polling

- Updated computeSetup to use filter(contains) to find context. This handles the case where there are a large number of contexts. Previously the code only searched the first 10.

- Added an optional argument to computeSetup to be used as payload to createSession.

## 4.4.11

Date: 8/7/2022

- Issue85
  - For long polling in computeRun, remove newState and set ['If-None-Match'] to etag of job.
  - make corrresponding changes in httpwCallWait to update etag on each call to state.

- Others
  - Documented checkStatus param to computeRun.
