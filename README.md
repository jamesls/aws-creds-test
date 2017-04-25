## Credentials Testing

This is used to test credentials across the SDKs.
It helps troubleshoot if there's an issue with a specific
SDK or an issue with the actual credentials.

The idea is to recreate the same script in multiple languages.
This script does the following:

* Prompt for access key
* Prompt for secret access key
* Make a call to sts GetCallerIdentity with the provided credentials

Ideally, everything passes in every language.  However, in the case
of failure, we have more info on what went wrong:

* If the script passes in one language but fails in another, assuming
  the same credentials were provided, then this suggests an issue
  with a specific languages credentials/signer code.  A hash is
  printed to stdout to verify the same values are passed to each
  language specific script.
* If the script fails in every language this suggests there's an
  issue with the credentials and not with the SDKs.


## Usage

First, install the node and python packages.  You can use pip/npm
directly or you can just run `make install`.

```
$ make install
npm install
pip install -r requirements.txt
Requirement already satisfied: botocore<2.0.0,>=1.5.0 in /usr/local/lib/python2.7/site-packages (from -r requirements.txt (line 1))
Requirement already satisfied: python-dateutil<3.0.0,>=2.1 in /usr/local/lib/python2.7/site-packages (from botocore<2.0.0,>=1.5.0->-r requirements.txt (line 1))
Requirement already satisfied: docutils>=0.10 in /usr/local/lib/python2.7/site-packages (from botocore<2.0.0,>=1.5.0->-r requirements.txt (line 1))
Requirement already satisfied: jmespath<1.0.0,>=0.7.1 in /usr/local/lib/python2.7/site-packages (from botocore<2.0.0,>=1.5.0->-r requirements.txt (line 1))
Requirement already satisfied: six>=1.5 in /usr/local/lib/python2.7/site-packages (from python-dateutil<3.0.0,>=2.1->botocore<2.0.0,>=1.5.0->-r requirements.txt (line 1))
```

Next, you can run the test script by running `make test`.
If everything is successful you should see similar output:


```
$ make test
./test-creds.sh
Testing python...
Access Key:
Secret Access Key:
AKID   hash: 1b94fb49749540691da15efedd6c991d949e492e0102fcc56bf15846cd4d1ba7
AKID length: 20

SAK    hash: 1bb74946861076203ef2d31e08c464c2eb9932e761114336d2a4f64ec7987667
SAK  length: 40
Successfuly made an AWS request with the provided credentials.

Testing javasript...
Access Key: ********************
Secret Access Key: ****************************************
AKID   hash: 1b94fb49749540691da15efedd6c991d949e492e0102fcc56bf15846cd4d1ba7
AKID length: 20


SAK    hash: 1bb74946861076203ef2d31e08c464c2eb9932e761114336d2a4f64ec7987667
SAK  length: 40
Sucessfully made an AWS request with the provided credentials.
```

Note in the above output the hmac of the access key in python matches the
hmac of the access key in node.  Same for secret access key.
