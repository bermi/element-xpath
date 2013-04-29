test:
	@NODE_ENV=test ./node_modules/.bin/mocha-phantomjs test.html

lint:
	./node_modules/.bin/grunt lint

build:
	./node_modules/.bin/grunt build


.PHONY: test build lint
