const pubsub = require('../config/pubsub');
const logger = require('../common/logger');

/**
 * Publishes a message object to a PubSub topic
 *
 * @param  {object} message a message object
 * @param {string} topicName a PubSub topic name
 * @example publishMessageToPubSub(dataObject, 'topicName')
 * @returns {Promise} pubsub success object
 */
async function publishMessageToPubSub(message, topicName) {
  const topicInstance = pubsub.getTopicInstance(topicName);

  const startTime = performance.now();
  const result = await topicInstance.publishMessage({ json: message });
  const endTime = performance.now();
  const elapsedTime = endTime - startTime;
  logger.info(`Message : ${JSON.stringify(message)} sent! Message ID: ${result} | Time taken: ${elapsedTime} ms`);

  return result;
}

module.exports = {
  publishMessageToPubSub,
};
