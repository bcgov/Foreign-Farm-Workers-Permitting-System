#!make

-include .env

export $(shell sed 's/=.*//' .env)
export COMMIT_SHA?=$(shell git rev-parse --short=7 HEAD)
export IMAGE_TAG=${COMMIT_SHA}
export PROJECT:=farm-operator-screening
.DEFAULT_GOAL:=print-status

print-status:
	@echo "Current Settings:"
	@echo "ACCOUNT ID: $(ACCOUNT_ID)"
	@echo "S3 BUCKET: $(S3_BUCKET)"
	@echo "PROJECT: $(PROJECT)"
	@echo "REGION: $(REGION)"
	@echo "PROFILE: $(PROFILE)"
	@echo "COMMIT_SHA: $(COMMIT_SHA)"
	@echo "IMAGE_TAG: $(IMAGE_TAG)"

# Local Development

build-local:
	@echo "Building local FOS image"
	@docker-compose build

run-local:
	@echo "Running local FOS container"
	@docker-compose up

run-local-db:
	@echo "Running local DB container"
	@docker-compose up mongodb

close-local:
	@echo "Stopping local FOS container"
	@docker-compose down

local-db-seed:
	@echo "Seeding local DB container"
	@docker exec -it $(PROJECT)-server npm run db:seed

local-server-tests:
	@echo "Running tests in local FOS container"
	@docker exec -it $(PROJECT)-server npm test

# Pipeline

get-latest-eb-env:
	@aws elasticbeanstalk describe-environments | jq -cr '.Environments | .[] | select(.Status == "Ready" and (.EnvironmentName | test("^fos-$(ENV_SUFFIX)(-[0-9]+)?$$"))) | .EnvironmentName' | sort | tail -n 1

build-image:
	@echo "Building image $(PROJECT):$(IMAGE_TAG)"
	@docker build -t $(PROJECT):$(IMAGE_TAG) --build-arg VERSION=$(IMAGE_TAG) .

push-image:
	@echo "Pushing image $(PROJECT):$(IMAGE_TAG) to ECR"
	@aws ecr get-login-password | docker login --username AWS --password-stdin $(ACCOUNT_ID).dkr.ecr.$(REGION).amazonaws.com
	@docker tag $(PROJECT):$(IMAGE_TAG) $(ACCOUNT_ID).dkr.ecr.$(REGION).amazonaws.com/$(PROJECT):$(IMAGE_TAG)
	@docker push $(ACCOUNT_ID).dkr.ecr.$(REGION).amazonaws.com/$(PROJECT):$(IMAGE_TAG)

validate-image:
	@echo "Ensuring $(PROJECT):$(IMAGE_TAG) is in container registry"
	@aws ecr describe-images --repository-name=$(PROJECT) --image-ids=imageTag=$(IMAGE_TAG)

promote-image:
	@echo "Creating deployment artifact for commit $(IMAGE_TAG) and promoting image to $(ENV_SUFFIX)"
	@echo '{"AWSEBDockerrunVersion": 2, "containerDefinitions": [{ "essential": true, "name": "application", "image": "$(ACCOUNT_ID).dkr.ecr.$(REGION).amazonaws.com/$(PROJECT):$(IMAGE_TAG)", "memory": 256, "portMappings": [{ "containerPort": 80, "hostPort": 80 }] }] }' > Dockerrun.aws.json
	@zip -r fos-$(ENV_SUFFIX)-$(IMAGE_TAG).zip  Dockerrun.aws.json
	@aws s3 cp fos-$(ENV_SUFFIX)-$(IMAGE_TAG).zip s3://$(S3_BUCKET)/$(PROJECT)/fos-$(ENV_SUFFIX)-$(IMAGE_TAG).zip
	@aws elasticbeanstalk create-application-version --application-name $(PROJECT) --version-label fos-$(ENV_SUFFIX)-$(IMAGE_TAG) --source-bundle S3Bucket="$(S3_BUCKET)",S3Key="$(PROJECT)/fos-$(ENV_SUFFIX)-$(IMAGE_TAG).zip"
	@aws elasticbeanstalk update-environment --application-name $(PROJECT) --environment-name $(DESTINATION_ENV) --version-label fos-$(ENV_SUFFIX)-$(IMAGE_TAG)

# Git Tagging Aliases

tag-dev:
	@echo "Deploying $(PROJECT):$(IMAGE_TAG) to dev env"
	@git tag -fa dev -m "Deploying $(PROJECT):$(IMAGE_TAG) to dev env" $(IMAGE_TAG)
	@git push --force origin refs/tags/dev:refs/tags/dev

tag-staging:
	@echo "Deploying $(PROJECT):$(IMAGE_TAG) to staging env"
	@git tag -fa staging -m "Deploying $(PROJECT):$(IMAGE_TAG) to staging env" $(IMAGE_TAG)
	@git push --force origin refs/tags/staging:refs/tags/staging

tag-prod:
	@echo "Deploying $(PROJECT):$(IMAGE_TAG) to prod env"
	@git tag -fa prod -m "Deploying $(PROJECT):$(IMAGE_TAG) to prod env" $(IMAGE_TAG)
	@git push --force origin refs/tags/prod:refs/tags/prod
