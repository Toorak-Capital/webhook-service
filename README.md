# Toorak Capital Partners - Webhook Service
A Fastify-based webhook gateway designed to securely receive, validate, and process incoming webhook events. It supports signature validation through configurable secret keys and publishes messages via Pubsub

## Status - Master Branch
[![Quality Gate Status](https://sonarqube.roemanu.io/api/project_badges/measure?project=Toorak-Capital_webhook-service_AYd6CvDVK-P1eLUtLYNc&metric=alert_status&token=sqb_ad50d4de19c40c19ee44411fa366b4c099801299)](https://sonarqube.roemanu.io/dashboard?id=Toorak-Capital_webhook-service_AYd6CvDVK-P1eLUtLYNc)
[![Coverage](https://sonarqube.roemanu.io/api/project_badges/measure?project=Toorak-Capital_webhook-service_AYd6CvDVK-P1eLUtLYNc&metric=coverage&token=sqb_ad50d4de19c40c19ee44411fa366b4c099801299)](https://sonarqube.roemanu.io/dashboard?id=Toorak-Capital_webhook-service_AYd6CvDVK-P1eLUtLYNc)
[![Bugs](https://sonarqube.roemanu.io/api/project_badges/measure?project=Toorak-Capital_webhook-service_AYd6CvDVK-P1eLUtLYNc&metric=bugs&token=sqb_ad50d4de19c40c19ee44411fa366b4c099801299)](https://sonarqube.roemanu.io/dashboard?id=Toorak-Capital_webhook-service_AYd6CvDVK-P1eLUtLYNc)
[![Code Smells](https://sonarqube.roemanu.io/api/project_badges/measure?project=Toorak-Capital_webhook-service_AYd6CvDVK-P1eLUtLYNc&metric=code_smells&token=sqb_ad50d4de19c40c19ee44411fa366b4c099801299)](https://sonarqube.roemanu.io/dashboard?id=Toorak-Capital_webhook-service_AYd6CvDVK-P1eLUtLYNc)

## Status - Develop Branch
[![Quality Gate Status](https://sonarqube.roemanu.io/api/project_badges/measure?branch=develop&project=Toorak-Capital_webhook-service_AYd6CvDVK-P1eLUtLYNc&metric=alert_status&token=sqb_ad50d4de19c40c19ee44411fa366b4c099801299)](https://sonarqube.roemanu.io/dashboard?id=Toorak-Capital_webhook-service_AYd6CvDVK-P1eLUtLYNc&branch=develop)
[![Coverage](https://sonarqube.roemanu.io/api/project_badges/measure?branch=develop&project=Toorak-Capital_webhook-service_AYd6CvDVK-P1eLUtLYNc&metric=coverage&token=sqb_ad50d4de19c40c19ee44411fa366b4c099801299)](https://sonarqube.roemanu.io/dashboard?id=Toorak-Capital_webhook-service_AYd6CvDVK-P1eLUtLYNc&branch=develop)
[![Bugs](https://sonarqube.roemanu.io/api/project_badges/measure?branch=develop&project=Toorak-Capital_webhook-service_AYd6CvDVK-P1eLUtLYNc&metric=bugs&token=sqb_ad50d4de19c40c19ee44411fa366b4c099801299)](https://sonarqube.roemanu.io/dashboard?id=Toorak-Capital_webhook-service_AYd6CvDVK-P1eLUtLYNc&branch=develop)
[![Code Smells](https://sonarqube.roemanu.io/api/project_badges/measure?branch=develop&project=Toorak-Capital_webhook-service_AYd6CvDVK-P1eLUtLYNc&metric=code_smells&token=sqb_ad50d4de19c40c19ee44411fa366b4c099801299)](https://sonarqube.roemanu.io/dashboard?id=Toorak-Capital_webhook-service_AYd6CvDVK-P1eLUtLYNc&branch=develop)

# Libraries and Technologies
*See detailed info about our tech stack [here](docs/libraries-and-technologies.md)*

Kubernetes, Istio, Docker, NodeJS, ES2021, fastify, json-schema, swagger-ui, ajv, mocha, chai, istanbul, eslint, sinon, git, vs code, devcontainer, redis, mongoDb, winston

## Build Locally
All linting and tests are executed as part of the docker build script.
``` bash
# build docker container
docker build .
```

## Running Locally
Within dev container, run using VS Code `Run and Debug`
``` bash
# from terminal
NODE_ENV=dev nodemon server.js
```

## Registering a new webhook provider
1. Add authenticator in ./providers/provider-authentication.js
2. Create config using authenticator name, secret and intended topic name within ./providers/provider-matter.js. The name of the config's parent property should be the provider's name, which is the same value that will be used in the URL's provider path param during requests.
3. Add the appropriate unit testing for any added authenticator functions.
4. Add the new topic environment variables to project environment and start project


## Environment Setup
Variable | Example | Description | Requirement for Local
--- | --- | --- | ---
NODE_ENV | 'dev' | Working Environment | Required
PORT | 3000 | Port on which the service will run | Optional (defaults to 3000)
PROJECT_ID | 'projectname' | GCP project name | Required
SITEWIRE_SECRET | 'your-secret-key' | Secret key used for validating Sitewire webhooks | Required
SITEWIRE_TOPIC | 'sitewire-topic-name' | GCP Pub/Sub topic name for publishing Sitewire webhook events | Required