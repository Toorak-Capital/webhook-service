const Schemas = require('../common/schemas');
const logger = require('../common/logger');
const mapper = require('../providers/provider-mapper');
const authenticators = require('../providers/provider-authentication');
const controllers = require('../controllers');

module.exports = [
  {
    method: 'POST',
    url: '/:provider',
    schema: {
      description: 'webhook ingestion',
      tags: ['webhook', 'ingestion'],
      response: {
        200: Schemas.generic200,
        400: Schemas.generic400,
        403: Schemas.generic403,
        500: Schemas.generic500,
      },
    },
    preHandler: async (request, reply) => {
      const { provider } = request.params;
      const providerMap = mapper[provider];

      request.providerMap = providerMap;

      if (!providerMap) {
        return reply.code(400).send(`Provider '${provider}' not found`);
      }
      const authenticator = authenticators[providerMap.authenticatorName];

      try {
        return authenticator(request);
      } catch (err) {
        if (err.name === 'WebhookVerificationError') {
          return reply.code(403).send(err.message);
        }
        return reply.code(500).send(err);
      }
    },
    handler: async (request, reply) => {
      try {
        await controllers.publishMessage(request);
        return reply.code(200).send();
      } catch (err) {
        logger.error(err);
        return reply.code(500).send(err);
      }
    },
  },
];
