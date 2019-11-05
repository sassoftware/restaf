// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://aws.amazon.com/developers/getting-started/nodejs/

// Load the AWS SDK
var AWS = require('aws-sdk');
    
module.exports = function getSecrets(inParms) {
    return new Promise((resolve, reject) => {
        let secretName = process.env.MAINKEY;
        let region = process.env.MAINREGION;
        if ( inParms.hasOwnProperty('key') === true) {
            secretName = inParms.key;
        };
    
        if (secretName == null) {
            let secrets = {
                authType    : 'password',
                host        : '',
                user        : '',
                password    : '',
                clientID    : '',
                clientSecret: ''
            };
        resolve(secrets);
        };

        let secret;
        let decodedBinarySecret;
        // Create a Secrets Manager client
        var client = new AWS.SecretsManager({
            region: region
        });

        // In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
        // See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        // We rethrow the exception by default.

        client.getSecretValue({SecretId: secretName}, function(err, data) {
            if (err) {
                console.log('error');
                console.log(err);
                reject(err);
            }
            else {
                // Decrypts secret using the associated KMS CMK.
                // Depending on whether the secret is a string or binary, one of these fields will be populated.
                if ('SecretString' in data) {
                    secret = data.SecretString;
                    let s = JSON.parse(secret);
                    resolve(s);
                } else {
                    let buff = new Buffer(data.SecretBinary, 'base64');
                    decodedBinarySecret = buff.toString('ascii');
                    resolve(decodedBinarySecret);
                }
            }
            // Your code goes here. 
        });
    })
}