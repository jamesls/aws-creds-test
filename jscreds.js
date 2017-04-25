var AWS = require('aws-sdk');
var crypto = require('crypto');
var prompt = require('password-prompt');
var hmacKey = process.env.TEST_KEY;
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
        var akidHex = crypto.createHmac('sha256', hmacKey).update(accessKeyId).digest('hex');
        var sha1Hex = crypto.createHmac('sha256', hmacKey).update(secretAccessKey).digest('hex');
        console.log("AKID   hash: " + akidHex);
        console.log("AKID length: " + accessKeyId.length);
        console.log("\n");
        console.log("SAK    hash: " + sha1Hex);
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
        console.log("Sucessfully made an AWS request with the provided credentials.");
        process.exit(0);
    }).catch(function(err) {
        console.error("Error making AWS request");
        console.error(err);
        process.exit(1);
    });
