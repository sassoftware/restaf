
# Introduction

One of the common activities is to import and export different contents in a Viya Server. The [viyacaddy package](https://github.com/sassoftware/restaf/tree/main/packages/viyacaddy) is make this job a little easier for a select set of data.

This cli is useful for:

1. Exporting selected VA reports as json files.

2. Importing Va reports stored as json files

3. Importing hdat, sas7bat, csv files into CAS

4. Importing .sas and .ds2 files into sashdat (for use with scoring actions)

5. Importing .astore and .sasast files into sashdat

## Installing the cli

You can install the cli as follows:

     npm install -g @sassoftware/viyacaddy

### Notes

1. If you do not have nodejs installed on your system you can use  

## Usage

The cli can be run in interactive mode or in "batch" mode.

### Interactive mode

```sh
npx @sassoftware/viyacaddy --env <your-env-file>
```

You will get prompt to enter commands.

The env file has the following format

```ini
VIYA_SERVER=http://your-viya-server
CLIENTID=<a password client>
CLIENTSECRET=<a client secret>
```

Note that the default clientid sas.ec (no secret)can be used (consult your SAS Administrator).

### Batch mode

```sh
npx @sassoftware/viyacaddy --env <your-env-file> -- file <cmdfile>
```

The env file is now augmented with an userid and password as follows:

```ini
VIYA_SERVER=http://your-viya-server
CLIENTID=<a password client>
CLIENTSECRET=<a client secret>
USER=username
PASSWORD=password
```

You can use a previously generated token instead of userid and password. Create a token and save it in some file (say mytoken) and modify the env file as follows

```ini
VIYA_SERVER=http://your-viya-server
CLIENTID=<a password client>
CLIENTSECRET=<a client secret>
TOKEN_FILE=mytoken
```

The cmdfile is a text file with a list of valid viyacaddy commands. These commands are executed in parallel.

## Current commands

When data or report is imported, the cli will delete any existing file and create the new one.
Also the new data will not be loaded into memory. That task is left to the applications that will use the tables and reports that are imported.

### Basic commands

- logon - to logon to Viya. This command will prompt for username and password
- exit  - to exit the cli
- help  - get help on commands

### Utility

- caslibs  -- lists the names of all caslibs

### Tables command

- tables import   -- to import hdat, b7dat,csv, astore, ds2 and sas files into cas tables in a caslib

        tables import <input directory> <list of files|*> -c <caslib>

- tables list -- to list the names of the tables in a specific caslib

        tables list <caslib>

### Reports command

- Import VA reports from specified directory into a SAS Viya folder

         reports import <input directory> <list of names|*> -f <folder>

- Export VA reports in json format to specified directory

         reports export  <list of reports> -d <directory-to-store-reports>

- List reports in VA

         reports list   -- list the names of all the reports

### Notes on imported tables

- sasb7dat,sashdat,csv -- sashdat file
- astore -- sashdata file (schema: _index_ , _state_)
- sas, ds2 -- sashdat - "model" table that can be executed with datastep.runCodeTable and ds2.runModel actions.(schema: modelName, dataStepsrc|ds2Src)

## Examples

1. *Import a.json and b.json from reportfiles directory into Public folder*  
    - **reports import** ./reportfiles a.json b.json -f Public 

2. *Import all files from reportfiles directory into Public folder*
    - **reports import** ./reportfiles * -f Public 

3. *Import files with spaces in name
    - **reports import** ./reportfiles 'a report with spaces'  -f Public

4. *Export reports a and b as json files into the reportsfiles directory*
    - **reports export** a b -d ./reportfiles

5. *List all the reports available to the user*
    - **reports list**

6. *Import the two files from data directory into Public caslib*
    - **tables import**  ./data  iris.csv retails.sas7bdat -c Public

7. *Import all the files in data directory into Public caslib*
    - **tables import**  ./data  *  -c Public

8. *List names of tables in the public caslib*
    - **tables list** public 

## Sample cmdfile

Here is a sample command file

    # import all report in the specificed directory
    reports import c:/public/dev/reports * -f Public

    # Import a sas program
    tables import ../../data Cluster_SDOH6.sas -c public

    # Import all data in a directory
    tables import c:/public/dev/data * -c casuser
