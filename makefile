.PHONY: prepare-environment

prepare-environment:
	npm ci
	npm run hooks:install
