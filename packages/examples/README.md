# Viya ruthere test container

        ruthere - pronounced " Viya Are You There"

The container docker.sas.com/kumar/viyaruthere:latest container is designed to test SAS Viya usin REST APIs.

This is a collection of tests that can be used to verify that a Viya is up and can do some very common tasks.
It is written from an end-users viewpoint.

The tests can be extended easily for more services, application scenarios, handling of errors etc...

The origin of these tests is the test suite for the [restaf](https://github.com/sassoftware/restaf) java script library. This library is an easy-button for writing REST API based applications.

## Execution

Setup a docker-compose file as follows:

    ```yaml
    viyaruthere:
    image: docker.sas.com/kumar/viyaruthere:latest
    restart: always
    environment:
        - VIYA_SERVER=<your viya server>
        - USER=<your userid -- defaults to omitest>
        - PASSWORD=<your password - defaults to metadata1$>
        - TESTS=<list of tests - see below - if blank or not specified it will run all the tests>
    ```

### To run the tests

        ```sh
        docker-compose up
        ```

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
    - upload a model in datastep and score a simple scenario

6. **cas.upload.test.js** - upload csv, bdat,hdat, sas, ds2

    - uploads a csv
    - uploads a sasb7dat
    - uploads a sashdat
    - uploads a sas program into a model sashdat
    - uploads a ds2 program into a model sashdat

## Extending tests

- I will be repurposing more of my apps to be part of this test suite.
- Would be happy to help anyone interested in cloning these tests and extending it for their own use
