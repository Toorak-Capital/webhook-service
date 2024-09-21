# Toorak Capital Partners - Webhook Service
A Fastify-based webhook gateway designed to securely receive, validate, and process incoming webhook events. It supports signature validation through configurable secret keys and integrates seamlessly with Pub/Sub systems to publish validated data

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

## Environment Setup
Variable | Example | Description | Requirement for Local
--- | --- | --- | ---
NODE_ENV | 'dev' | Working Environment | Required
PORT | 3000 | Port on which the service will run | Optional (defaults to 3000)
PROJECT_ID | 'projectname' | GCP project name | Required
SITEWIRE_SECRET | 'your-secret-key' | Secret key used for validating Sitewire webhooks | Required
SITEWIRE_TOPIC | 'sitewire-topic-name' | GCP Pub/Sub topic name for publishing Sitewire webhook events | Required