const winston = require('winston');
module.exports = function testLogger () { 
    let opts = { silent: (process.env.LOGGER !== 'ON'), prettyPrint: true };
    let logger = winston.createLogger({
        transports: [
            new winston.transports.Console(opts)
        ]
    });
    return logger;
}
