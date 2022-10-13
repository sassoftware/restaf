# Test streams

All the test code is in testFunctions directory

1. **basics.test.js** -- Obtains the root links for the services listed below

        ```json
            [
            "reports",
            "reportImages",
            "reportTransforms",
            "compute",
            "files",
            "casManagement",
            "modelPublish",
            "modelRepository",
            "jobExecution"
            ]
        ```

2. **files.test.js** -- tests basic POST and GET of content

   - scroll and list all the files in the system

   - create a new file and then retrieve its content

3. **compute.test.js** - test the basic functionality of compute service

    - run a datastep, retrieve log and ods output, retrieve the records from the table.

4. **cas.actions.test.js** - test a few common cas actions

    - create a sas session
    - run echo action
    - run datastep.runcode action and fetch the resulting table
    - run fileInfo action
    - list tables in Public caslib

5. **cas.score.test.js** - upload an astore using astore action
    - upload a sasast and score a simple scenario
    - upload a model(sashdat format) and score a simple scenario

6. **cas.upload.test.js** - upload csv, bdat,hdat, sas, ds2

    - uploads a csv
    - uploads a sasb7dat
    - uploads a sashdat
    - uploads a sas program into a model sashdat
    - uploads a ds2 program into a model sashdat
