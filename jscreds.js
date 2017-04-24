var AWS = require('aws-sdk');
var crypto = require('crypto');
var prompt = require('password-prompt');
var accessKeyId;
var secretAccessKey;


prompt('Access Key: ')
    .then(function(input) {
        accessKeyId = input;
    })
    .then(function() {
        return prompt('Secret Access Key: ');
    })
    .then(function(input) {
        secretAccessKey = input;
        var akidHex = crypto.createHash('sha256').update(accessKeyId).digest('hex');
        var sha1Hex = crypto.createHash('sha256').update(secretAccessKey).digest('hex');
        console.log("AKID sha256: " + akidHex);
        console.log("AKID length: " + accessKeyId.length);
        console.log("\n");
        console.log("SAK  sha256: " + sha1Hex);
        console.log("SAK  length: " + secretAccessKey.length);
    })
    .then(function() {
        var config = new AWS.Config({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            region: 'us-east-1'
        });
        var sts = new AWS.STS(config);
        return sts.getCallerIdentity().promise();
    }).then(function(data) {
        console.log("Sucessfully made an AWS request with the provided credentials");
        process.exit(0);
    }).catch(function(err) {
        console.error("Error making AWS request");
        console.error(err);
        process.exit(1);
    });
