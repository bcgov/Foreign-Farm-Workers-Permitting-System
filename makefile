#!make

-include .env

export $(shell sed 's/=.*//' .env)
export GIT_LOCAL_BRANCH?=$(shell git rev-parse --abbrev-ref HEAD)
export DEPLOY_DATE?=$(shell date '+%Y%m%d%H%M')
export COMMIT_SHA?=$(shell git rev-parse --short=7 HEAD)
export IMAGE_TAG=${COMMIT_SHA}
export PROJECT:=farm-operator-screening

#################
# Status Output #
#################

print-status:
	@echo " +---------------------------------------------------------+ "
	@echo " | Current Settings                                        | "
	@echo " +---------------------------------------------------------+ "
	@echo " | ACCOUNT ID: $(ACCOUNT_ID) "
	@echo " | S3 BUCKET: $(S3_BUCKET) "
	@echo " | PROJECT: $(PROJECT) "
	@echo " | REGION: $(REGION) "
	@echo " | PROFILE: $(PROFILE) "
	@echo " | DEPLOY ENV: $(DEPLOY_ENV) "
	@echo " | GIT LOCAL BRANCH: $(GIT_LOCAL_BRANCH) "
	@echo " | COMMIT_SHA: $(COMMIT_SHA) "
	@echo " | IMAGE_TAG: $(IMAGE_TAG) "
	@echo " +---------------------------------------------------------+ "

#####################
# Local Development #
#####################

build-local: ## -- Target : Builds the local development containers.
	@echo "+\n++ Make: Building local Docker image ...\n+"
	@docker-compose -f docker-compose.dev.yml build

run-local: ## -- Target : Runs the local development containers.
	@echo "+\n++ Make: Running locally ...\n+"
	@docker-compose -f docker-compose.dev.yml up

run-local-db: ## -- Target : Runs the local development containers.
	@echo "+\n++ Make: Running db locally ...\n+"
	@docker-compose -f docker-compose.dev.yml up mongodb

close-local: ## -- Target : Closes the local development containers.
	@echo "+\n++ Make: Closing local container ...\n+"
	@docker-compose -f docker-compose.dev.yml down

local-client-workspace:
	@docker exec -it $(PROJECT)-client bash

local-server-workspace:
	@docker exec -it $(PROJECT)-server bash

local-db-seed:
	@docker exec -it $(PROJECT)-server npm run db:seed

local-server-tests:
	@docker exec -it $(PROJECT)-server npm test

##########################################
# New Pipeline #
##########################################

get-latest-eb-env:
	@aws elasticbeanstalk describe-environments | jq -cr '.Environments | .[] | select(.Status == "Ready" and (.EnvironmentName | test("^fos-$(ENV_SUFFIX)(-[0-9]+)?$$"))) | .EnvironmentName' | sort | tail -n 1

build-image:
	@echo "Building image $(PROJECT):$(IMAGE_TAG)"
	@docker build -t $(PROJECT):$(IMAGE_TAG) --build-arg VERSION=$(IMAGE_TAG) .

push-image:
	@echo "+\n++ Pushing image to Dockerhub...\n+"
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
	@aws elasticbeanstalk create-application-version --application-name $(PROJECT) --version-label $(IMAGE_TAG)-$(ENV_SUFFIX) --source-bundle S3Bucket="$(S3_BUCKET)",S3Key="$(PROJECT)/fos-$(ENV_SUFFIX)-$(IMAGE_TAG).zip"
	@aws elasticbeanstalk update-environment --application-name $(PROJECT) --environment-name $(DESTINATION_ENV) --version-label $(IMAGE_TAG)-$(ENV_SUFFIX)

##########################################
# Git tagging aliases #
##########################################

tag-dev:
	@git tag -fa dev -m "Deploying $(BRANCH):$(IMAGE_TAG) to dev env" $(IMAGE_TAG)
	@git push --force origin refs/tags/dev:refs/tags/dev
