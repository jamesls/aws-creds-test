#!/bin/bash

export TEST_KEY=$(python -c 'import os; print(os.urandom(40).encode("base64").strip())')
echo "Testing python..."
python pycreds.py
echo "Testing javasript..."
node jscreds.js
