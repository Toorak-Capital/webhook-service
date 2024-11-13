const {
  OP_SITEWIRE_TOPIC,
  OP_SITEWIRE_SECRET,
  TC_SITEWIRE_TOPIC,
  TC_SITEWIRE_SECRET,
} = process.env;

module.exports = {
  'op-sitewire': {
    authenticatorName: 'verifySitewireSignature',
    topicName: OP_SITEWIRE_TOPIC,
    secret: OP_SITEWIRE_SECRET,
  },
  'tc-sitewire': {
    authenticatorName: 'verifySitewireSignature',
    topicName: TC_SITEWIRE_TOPIC,
    secret: TC_SITEWIRE_SECRET,
  },
};
