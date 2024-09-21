/* eslint-disable no-console */
const service = require('../services/publish-service');

/**
 * Publishes a message object to a PubSub topic
 *
 * @param {object} request fastify request object
 * @example publishMessage(request)
 * @returns {Promise} pubsub success object
 */
function publishMessage(request) {
  const { body } = request;
  const { topicName } = request.providerMap;

  return service.publishMessageToPubSub(body, topicName);
}

module.exports = {
  publishMessage,
};
