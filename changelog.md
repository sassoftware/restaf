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

Date: 7/28/2022

- Changed the jobState call in computeRun to use the query (newState: 'Complete'). More efficient.
- Noticed that computeSetup was not using filter to find the context to be more efficient - changed it.
