## Credentials Testing

This is used to test credentials across the SDKs.
It helps troubleshoot if there's an issue with a specific
SDK or an issue with the actual credentials.

The idea is to recreate the same script in multiple languages.
This script does the following:

* Prompt for access key
* Prompt for secret access key
* Make a call to sts GetCallerIdentity with the provided credentials


## Usage

First, install the node and python packages:

```
$ pip install -r requirements.txt
Requirement already satisfied: botocore<2.0.0,>=1.5.0 in /usr/local/lib/python2.7/site-packages (from -r requirements.txt (line 1))
Requirement already satisfied: python-dateutil<3.0.0,>=2.1 in /usr/local/lib/python2.7/site-packages (from botocore<2.0.0,>=1.5.0->-r requirements.txt (line 1))
Requirement already satisfied: docutils>=0.10 in /usr/local/lib/python2.7/site-packages (from botocore<2.0.0,>=1.5.0->-r requirements.txt (line 1))
Requirement already satisfied: jmespath<1.0.0,>=0.7.1 in /usr/local/lib/python2.7/site-packages (from botocore<2.0.0,>=1.5.0->-r requirements.txt (line 1))
Requirement already satisfied: six>=1.5 in /usr/local/lib/python2.7/site-packages (from python-dateutil<3.0.0,>=2.1->botocore<2.0.0,>=1.5.0->-r requirements.txt (line 1))
$ npm install
$
```

Next, you can run the pycreds and jscreds scripts to test.
If everything is successful you should see similar output:


```
$ python pycreds.py
Access Key:
Secret Access Key:
AKID sha256: 8348193876c4aacbd53d2cb0f7df11c41d8d7a587f1b637a6f279852983bc987
AKID length: 20
SAK  sha256: fc5f836d35c6aed8ba8767afe356c8d9918d0d36708bd0e75a51f8d080a362da
SAK  length: 40
Successfuly made an AWS request with the provided credentials.
~/Source/scratch/aws-creds-test $ node jscreds.js
Access Key: ********************
Secret Access Key: ****************************************
AKID sha256: 8348193876c4aacbd53d2cb0f7df11c41d8d7a587f1b637a6f279852983bc987
AKID length: 20


SAK  sha256: fc5f836d35c6aed8ba8767afe356c8d9918d0d36708bd0e75a51f8d080a362da
SAK  length: 40
Sucessfully made an AWS request with the provided credentials
```

Note in the above output the sha256 of the access key in python matches the
sha256 of the access key in node.  Same for secret access key.
