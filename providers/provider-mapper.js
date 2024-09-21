const {
  SITEWIRE_TOPIC,
  SITEWIRE_SECRET,
} = process.env;

module.exports = {
  sitewire: {
    authenticatorName: 'verifySitewireSignature',
    topicName: SITEWIRE_TOPIC,
    secret: SITEWIRE_SECRET,
  },
};
