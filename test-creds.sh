#!/bin/bash

export TEST_KEY=$(cat /dev/urandom | env LC_CTYPE=C tr -cd 'a-f0-9' | head -c 40)
echo "Testing python..."
python pycreds.py
echo "Testing javasript..."
node jscreds.js
