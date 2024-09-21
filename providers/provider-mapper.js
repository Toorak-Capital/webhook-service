const {
  OP_SITEWIRE_TOPIC,
  OP_SITEWIRE_SECRET,
} = process.env;

module.exports = {
  "op-sitewire": {
    authenticatorName: 'verifySitewireSignature',
    topicName: OP_SITEWIRE_TOPIC,
    secret: OP_SITEWIRE_SECRET,
  },
};
