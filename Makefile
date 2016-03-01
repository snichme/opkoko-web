help:  ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


clean:
	rm -rf opkoko-schedule/dist
	rm -rf public

install: ## Install all dependencies
	npm install
	(cd opkoko-schedule; npm install)

build-site:
	@node_modules/node-sass/bin/node-sass --output-style compressed sass/styles.scss public/css/styles.css
	@hugo

build-schedule:
	(cd opkoko-schedule;  NODE_ENV=production webpack -p --config webpack.config-prod.js)
	mkdir -p static/schedule
	cp opkoko-schedule/dist/bundle.js static/schedule/
	cp -rf opkoko-schedule/public/* static/schedule/

build: clean build-schedule build-site ## Build the project

sass:
	./node_modules/node-sass/bin/node-sass -w --output-style nested sass/styles.scss public/css/styles.css

watch: ## Start a watch that rebuild the site on changes
	hugo server -v -w

deploy: build ## Build and deploy the site to amazon S3
	aws s3 sync public s3://opkoko.landerblom.se --delete --region=eu-central-1

.PHONY: all clean build sass watch deploy help
