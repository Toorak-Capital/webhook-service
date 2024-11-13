#!/usr/bin/env node

const Fastify = require('fastify');
const metricsPlugin = require('fastify-metrics');
const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUI = require('@fastify/swagger-ui');
const info = require('./package.json');
const common = require('./common');
const Routes = require('./routes');

const { Schemas, logger } = common;
const baseName = '/webhook';
const basePath = `/api/v1${baseName}`;

logger.info(`Initializing ${info.name} v${info.version} with "${process.env.NODE_ENV}" environment param`);

let fastify;
const buildFastify = async () => {
  if (fastify) return fastify;

  fastify = Fastify({
    logger: true,
    ajv: {
      customOptions: {
        removeAdditional: false,
        strict: true,
        keywords: ['unevaluatedProperties'],
        coerceTypes: false,
      },
    },
  });

  await fastify.register(metricsPlugin, { endpoint: `${baseName}/metrics` });

  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: `${info.name} - Swagger`,
        description: info.description,
        version: info.version,
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: info.name, description: info.description },
      ],
      definitions: Schemas,
    },
  });

  await fastify.register(fastifySwaggerUI, {
    routePrefix: `${baseName}/docs`,
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    staticCSP: true,
    transformSpecificationClone: true,
  });

  Routes.forEach((route) => {
    const nRoute = route;
    nRoute.url = `${basePath}${nRoute.url}`;
    fastify.route(nRoute);
    logger.info(`Loaded route: ${nRoute.method}: ${nRoute.url}`);
  });

  fastify.get(`${baseName}/health`, (request, reply) => {
    reply.code(200).send();
  });

  fastify.get('/', (request, reply) => {
    reply.send({ api: info.name, version: info.version });
  });

  return fastify;
};

const startServer = async () => {
  const app = await exports.buildFastify();

  app.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    logger.info(`Server is now listening on ${address}`);
  });
};

module.exports = {
  buildFastify,
  startServer,
};

exports = module.exports;

(async () => {
  if (require.main === module) {
    await startServer();
  }
})();
