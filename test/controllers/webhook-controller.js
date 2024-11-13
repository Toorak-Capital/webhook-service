const { expect } = require('chai');
const sinon = require('sinon');
const path = require('path');
const chaiAsPromised = require('chai-as-promised');
const service = require('../../services/publish-service');
const controller = require('../../controllers/webhook-controller');

require('chai').use(chaiAsPromised);

describe(`${path.basename(__filename)} - Test Suite`, async () => {
  let pubSubStub;
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    pubSubStub = sandbox.stub(service, 'publishMessageToPubSub');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should publish the message to the correct topic', async () => {
    const request = {
      body: { data: 'test data' },
      providerMap: { topicName: 'test-topic' },
      params: { provider: 'test-provider' },
    };

    pubSubStub.resolves('mockMessageId');

    const result = await controller.publishMessage(request);

    expect(pubSubStub.calledOnce).to.be.true;
    expect(pubSubStub.calledWith({
      body: request.body,
      params: request.params,
    }, 'test-topic')).to.be.true;
    expect(result).to.equal('mockMessageId');
  });

  it('should handle errors from the pubSub service', async () => {
    const request = {
      body: { data: 'test data' },
      params: { provider: 'test-provider' },
      providerMap: { topicName: 'test-topic' },
    };

    const error = new Error('Publishing failed');
    pubSubStub.rejects(error);

    await expect(controller.publishMessage(request)).to.be.rejectedWith(error);

    expect(pubSubStub.calledOnce).to.be.true;
    expect(pubSubStub.calledWith({
      body: request.body,
      params: request.params,
    }, 'test-topic')).to.be.true;
  });
});
