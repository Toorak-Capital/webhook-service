# Libraries and Technologies
## Poly Repo
### Why polyrepo over monorepo?
- *Have a look at [this](https://medium.com/@mattklein123/monorepos-please-dont-e9a279be011b) article*
- To be able to deploy changes for a single micro service independently
- To reduce complexity of git activities and repo maintenance
- To reduce scope and complexity of qa operations
## Containers
- [Kubernetes](https://kubernetes.io/)
  - [docs](https://kubernetes.io/)
- [Itio](https://istio.io/)
  - [docs](https://istio.io/latest/docs/)
  - routing engine, proxy, ingeress, egress for kubernetes cluster
- [Docker](https://www.docker.com/)
  - Use [podman](https://podman.io/) via wsl (windows subssytem for linux) or podman-machine (macos); don't use docker-desktop as it requires a paid licnese.
## Runtime
- [NodeJS](https://nodejs.org/)
  - [docs](https://nodejs.org/docs/latest/api/)
- ES2021
  - [docs](https://262.ecma-international.org/12.0/)
  - No shims for libraries which aren't written in TS or have no typings
  - No source maps
  - No compiling
  - Debugging simplified without source maps
  - Natively supported by nodejs
- TypeScript
  - This tech stack is mostly compatible with typescript
  - Typescript can be picked up later if necessary.
## Server
- [fastify](https://www.fastify.io/)
  - [docs](https://www.fastify.io/docs/latest/Reference/)
  - a framework that combines the best things from hapi and express
  - faster than express and hapi; see [bencmarks](https://medium.com/@onufrienkos/express-vs-fastify-performance-4dd5d73e08e2)
- [json-schema](https://json-schema.org/)
  - [docs]()
  - schema spec used to describe api's
  - schema spec used for validation of api requests
- [fastify-swagger](https://github.com/fastify/fastify-swagger)
  - [docs](https://swagger.io/docs/)
  - auto-generated docs available at the /docs route
- [ajv](https://ajv.js.org/)
  - [docs](https://ajv.js.org/api.html)
  - api request validator
## Documentation
- [jsdoc](https://github.com/jsdoc/jsdoc)
  - [docs](https://jsdoc.app/index.html)
- [swagger-ui](https://swagger.io/tools/swagger-ui/)
  - [docs](https://swagger.io/docs/)
  - auto-generated docs via [fastify-swagger](https://github.com/fastify/fastify-swagger)
## IDE
- [Visual Studio Code](https://code.visualstudio.com/)
  - [docs](https://code.visualstudio.com/Docs)
  - Free and open source
  - Large community with good documentation
- [devcontainer](https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/configuring-codespaces-for-your-project)
  - [docs](https://code.visualstudio.com/docs/remote/containers)
  - allows for consistent development experience accross team.
  - natively supported by vs code.
## Unit Testing & QA
### Unit Testing
- [mocha](https://mochajs.org/)
  - [docs](https://mochajs.org/)
  - test runner
- [chai](https://www.chaijs.com/)
  - [docs](https://www.chaijs.com/api/bdd/)
  - bdd and tdd test framework
- [istanbul](https://github.com/istanbuljs/nyc)
  - [docs](https://github.com/istanbuljs/nyc/blob/master/docs/setup-codecov.md)
  - code coverage
- [eslint](https://eslint.org/)
  - [docs](https://eslint.org/docs/user-guide/configuring/)
  - code linter
  - [airbnb style guide](https://github.com/airbnb/javascript)
- [sinon](https://sinonjs.org/)
  - [docs](https://sinonjs.org/releases/v13/)
  - mock, spy, etc. framework
### QA - E2E & Performance Testing
- Docker-Compose
  - Use Podman-Compose alterative for licenseing and cost purposes.
  - Use to orchestrate containerized prod like environment for e2e scripts
- [Artillery](https://github.com/artilleryio/artillery)
  - Perf tests
  - Derive kubernetes resource configs (mem, cpu, etc.) from tests results
- [Postman]
## Version Control
- git
  - [docs](https://git-scm.com/book/en/v2)
  - version control
  - pre-commit [hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) to force linting & testing on every commit
## Other Libraries
- [redis](https://redis.io/)
  - [docs](https://redis.io/documentation)
- [postrgres](https://www.postgresql.org/)
  - [docs](https://www.postgresql.org/docs/current/index.html)
- [winston](https://github.com/winstonjs/winston)
  - logger
