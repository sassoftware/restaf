# viyacaddy

An utility cli for some common scenarios when setting up a Viya Server

## Usage

```script

From the root directory of the repo:

npm run viyacaddy


From the packages/viyacaddy

npm start

```

For batch mode enter

```script

viyacaddy --file cmdfile

```

## Current commands

- upload --file input-file --output caslib.name
- logon

Examples

```script

upload --file ./data/Cluster_SDOH1.sas --output public.MODEL_CLUSTER_SDOH1
upload --file ./data/Cluster_SDOH6.sas --output public.MODEL_CLUSTER_SDOH6
upload --file ./data/NeuralNetwork_High_med.sas --output public.MODEL_NEURALNETWORK_HIGH_MED
upload --file ./data/SDOH1.sas7bdat --output public.SDOH1

```

The following file extensions for the source files are recognized:

- sasb7dat, sashdat, csv, astore, sas, ds2

In batch mode the uploads occur in parallel