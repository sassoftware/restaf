
# restAF - Making development of Viya Apps a snap


**restAF** is a small library to do the following:

   - Provide an easy-to-use API to accomplish the following:
      - UI framework agnostics
      - Manage connections to a Viya Server
      - Manage and execute links returned by the REST calls using a simple API
      - Provides a UMD library for use with browser-based apps
      - Can also be used in nodejs applications

## Install
Install from the npm registry
```
npm install restaf
```
### Install from repo
```
npm install https://github.com/sassoftware/restaf
```

## UMD
Use the following url's to get UMD version.

```
unpkg.com/restaf/restaf.min.js
```

##To build the library locally

Clone the repository and do the npm install
```
git clone https://github.com/sassoftware/restaf
npm install
```

To build all the versions do the following

```
cd restaf
npm run build
```
This will build the nodejs library in the lib directory and the UMD libraries in dist directory


##Documentation
Please see the doc.md in this repository.

## Trying it out

   1. Make a copy of restaf.env file to some directory (for the purpose of this document
   we will assume you named is myenv.env)
   2. Edit myenv.env as instructed in the file.
   3. Run the demos in the examples directory as follows:

```
node examples\<examplename> <path to myenv>
ex:
node examples/logon ../myenv.env
```

# Other examples using restAF

## restaf-uidemos repository
[restaf-uidemos](https://github.com/sassoftware/restaf-uidemos)
Clone the restaf-uidemos repository to see how to use restAF in web applications.

## restaf-apiexplorer repository

[restaf-apiexplorer](https://github.com/sassoftware/restaf-apiexplorer)
Clone the restaf-apiexplorer repository and explore the SAS APIs interactively. This is a good example of how to build complex
applications with relative ease using restAF.



