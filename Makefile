test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
	--harmony \
	--reporter spec \
	--require should \
	build/*/test.js
