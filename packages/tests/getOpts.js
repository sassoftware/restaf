let fs = require('fs');
module.exports = function getOpts() {

    if (fs.existsSync('./tls/tls.key') === true) {
        let options = {};
        options.key = fs.readFileSync('./tls/tls.key', { encoding: 'utf8' });
        options.cert = fs.readFileSync('./tls/tls.crt', { encoding: 'utf8' });
        options.ca = fs.readFileSync('./tls/ca.crt', { encoding: 'utf8' });
      
        return options;
    } else {
        console.log("No TLS files found, returning null");
        return null;
    }
}