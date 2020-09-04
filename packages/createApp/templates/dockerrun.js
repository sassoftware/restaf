module.exports = function dockerrun () {
    let code =
        " let shelljs = require('shelljs');\n let dkrrun = `docker run -e VIYA_SERVER=${process.env.VIYA_SERVER} --env-file ./.env -p 8080:8080 -t nova-app`;\n shelljs.exec(dkrrun);";
    return code;
};

