install:
	npm install
	pip install -r requirements.txt

test:
	python pycreds.py
	node jscreds.js
