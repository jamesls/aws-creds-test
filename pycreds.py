import hashlib
import getpass

import botocore.session
import botocore.exceptions


def main():
    access_key = getpass.getpass("Access Key: ").strip()
    secret_access_key = getpass.getpass("Secret Access Key: ").strip()
    print("AKID sha256: %s" % hashlib.sha256(access_key).hexdigest())
    print("AKID length: %s" % len(access_key))
    print("SAK  sha256: %s" % hashlib.sha256(secret_access_key).hexdigest())
    print("SAK  length: %s" % len(secret_access_key))
    session = botocore.session.get_session()
    sts = session.create_client('sts', aws_access_key_id=access_key,
                                aws_secret_access_key=secret_access_key)
    try:
        response = sts.get_caller_identity()
        print("Successfuly made an AWS request with the "
              "provided credentials.")
    except botocore.exceptions.ClientError as e:
        print("Error making AWS request: %s" % e)


if __name__ == '__main__':
    main()
