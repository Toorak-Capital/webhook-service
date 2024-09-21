const {
  SITEWIRE_TOPIC,
} = process.env;

module.exports = {
  sitewire: {
    authenticatorName: 'verifySitewireSignature',
    topicName: SITEWIRE_TOPIC,
  },
};
