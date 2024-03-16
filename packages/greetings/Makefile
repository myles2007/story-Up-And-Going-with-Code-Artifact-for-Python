clean:
	rm -rf dist/

package:
	@echo "Upgrading 'build' to the latest version..."
	python3 -m pip install --upgrade build
	@echo "Building distributable for package..."
	python3 -m build

publish: check-env
	@echo "Upgrading 'twine' to the latest version.from PyPA.."
	python3 -m pip install --upgrade twine
	@echo "Refreshing CodeArtifact credentials (assumes AWS credentials present)"
	aws codeartifact login --tool twine --domain up-and-going-with-code-artifact --domain-owner ${CODE_ARTIFACT_DOMAIN_OWNER} --repository my-private-repo
	@echo "Publishing package"
	python3 -m twine upload --repository codeartifact ./dist/*

check-env:
	@echo "Checking environment variables..."
	@echo "CODE_ARTIFACT_DOMAIN_OWNER=${CODE_ARTIFACT_DOMAIN_OWNER}"
ifndef CODE_ARTIFACT_DOMAIN_OWNER
	$(error CODE_ARTIFACT_DOMAIN_OWNER is undefined and must be defined in the environment)
endif