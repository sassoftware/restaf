let shelljs = require('shelljs');
let yargs = require('yargs');

let argv = yargs.argv;

let source = yargs.source;

shelljs.cp('-R', `../../dist/${source}`, `../public/shared/${source}`);

