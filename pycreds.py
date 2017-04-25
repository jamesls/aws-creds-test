import os
import hashlib
import getpass
import hmac

import botocore.session
import botocore.exceptions


def _hash(value):
    return hmac.new(os.environ['TEST_KEY'], value,
                    digestmod=hashlib.sha256).hexdigest()


def main():
    access_key = getpass.getpass("Access Key: ").strip()
    secret_access_key = getpass.getpass("Secret Access Key: ").strip()
    print("AKID   hash: %s" % _hash(access_key))
    print("AKID length: %s" % len(access_key))
    print("\nSAK    hash: %s" % _hash(secret_access_key))
    print("SAK  length: %s" % len(secret_access_key))
    session = botocore.session.get_session()
    sts = session.create_client('sts', aws_access_key_id=access_key,
                                aws_secret_access_key=secret_access_key)
    try:
        response = sts.get_caller_identity()
        print("Successfuly made an AWS request with the "
              "provided credentials.\n")
    except botocore.exceptions.ClientError as e:
        print("Error making AWS request: %s\n" % e)


if __name__ == '__main__':
    main()
