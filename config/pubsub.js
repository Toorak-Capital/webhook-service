const { PubSub } = require('@google-cloud/pubsub');

const projectId = process.env.PROJECT_ID;

const pubsub = new PubSub({
  projectId,
});

module.exports = {
  getTopicInstance: (topic) => pubsub.topic(topic),
};
