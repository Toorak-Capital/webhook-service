const { expect } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const path = require('path');

const pubsub = require('../../config/pubsub');
const logger = require('../../common/logger');
const service = require('../../services/publish-service');

require('chai').use(chaiAsPromised);

describe(`${path.basename(__filename)} - Test Suite`, () => {
  let getTopicInstanceStub;
  let publishMessageStub;
  let loggerStub;
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    getTopicInstanceStub = sandbox.stub(pubsub, 'getTopicInstance');
    publishMessageStub = sandbox.stub();
    loggerStub = sandbox.stub(logger, 'info');

    getTopicInstanceStub.returns({
      publishMessage: publishMessageStub,
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should publish the message to the correct topic and log the result', async () => {
    const data = { key: 'value' };
    const topicName = 'test-topic';

    publishMessageStub.resolves('mockMessageId');

    const result = await service.publishMessageToPubSub(data, topicName);

    expect(getTopicInstanceStub.calledOnceWithExactly(topicName)).to.be.true;
    expect(publishMessageStub.calledOnceWithExactly({ json: data })).to.be.true;
    expect(loggerStub.calledOnce).to.be.true;

    const logMessage = loggerStub.getCall(0).args[0];
    expect(logMessage).to.contain('Message : {"key":"value"} sent! Message ID: mockMessageId');

    expect(result).to.equal('mockMessageId');
  });

  it('should calculate and log the elapsed time for publishing a message', async () => {
    const data = { key: 'value' };
    const topicName = 'test-topic';

    publishMessageStub.resolves('mockMessageId');

    const startTime = sinon.stub(performance, 'now');
    startTime.onFirstCall().returns(1000);
    startTime.onSecondCall().returns(2000);

    await service.publishMessageToPubSub(data, topicName);

    expect(loggerStub.calledOnce).to.be.true;

    const logMessage = loggerStub.getCall(0).args[0];
    expect(logMessage).to.contain('Time taken: 1000 ms');

    startTime.restore();
  });

  it('should throw an error if publishing fails', async () => {
    const data = { key: 'value' };
    const topicName = 'test-topic';

    const error = new Error('Publishing failed');
    publishMessageStub.rejects(error);

    await expect(service.publishMessageToPubSub(data, topicName)).to.be.rejectedWith(error);

    expect(loggerStub.called).to.be.false;
  });
});
